import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from 'next/image'
import io from 'Socket.IO-client'
let socket;

export default function Play(props) {
    const [taksir, setTaksir] = useState([]);
    const [players, setplayers] = useState([])
    const [cards, setcards] = useState([])
    const [canPlay, setcanPlay] = useState(false)
    const [connectedroom, setconnectedroom] = useState(false)
    const [table,settable]=useState([])

    const [id, setid] = useState('')
    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()
        socket.on('connect', () => {
            console.log("connected")

        })
        socket.on('update-player', (res) => {
            setplayers(res)
        })
        socket.on('jarya', (res) => {

            setplayers(res)
        })
        socket.on('start-game', (res) => {
            console.log("game started")
        })
        socket.on('taksir', (res) => {
            setTaksir((Prevtaksir)=>[...Prevtaksir,res])
        })
        socket.on('message', (res) => {
            alert(res)
        })
        socket.on('jaryaV2', (res) => {
            
            setcards(res)
        })
        socket.on('yourTurn', () => {
            setcanPlay(true)
        })
        socket.on("update-table",(tab)=>{
            settable(tab)
        })
        
       
    }
    function playTurn(card) {
        let selected=prompt("You play this card as ?")
        socket.emit('playingTurn', card,id,selected)
        setcanPlay(!canPlay)
    }
    function lie(item){
        if (item.val!=item.selected){
            alert(item.id+" is lying")
            socket.emit("lying",item,id)
        }
    }
    useEffect(() => { socketInitializer() }, [])
    if (connectedroom) {
        return (
            <div >
                <div style={{float: 'right'}}>
                    <h1>Table</h1>
                    {table.map((item)=>{
                        return <p key={item.id}><span onClick={()=>lie(item)}>{item.id} played {item.selected}</span></p>
                    })}
                </div>
                <h2>I Am Player:</h2>{id}
                 <h1>Connected players</h1>
                
                <ul>
                    {players.map((item) => {

                        return (
                            <p key={item.name}>{item.name}</p>

                        )

                    })}
                </ul>
                <h1>My cards</h1>
                {cards.length}
                {/* jarya l qdima */}
                {/*   {players.map((item) => {
                    if (item.name == id) {
                        return (item.cards.map((j) => {
                            return (<li key={j.id}>{j.value} of {j.suit}</li>)
                        }))
                    }

                })} */}
                ---------------------------------
                {
                    cards.map((j) => {
                        return (<><li key={j.id}>{j.value} of {j.suit} <button disabled={!canPlay} onClick={()=>playTurn(j)}>play</button></li></>)
                    })
                }
                <h1>Taksir :</h1>
                ---------------------------------
                 {taksir.map((j) => { return (<li key={j}>{j}</li>) })}
                
            </div>
        )
    }
    return (
        <div>
            <div>
                <p>Nickname:</p>
                <p><input value={id} onChange={(e)=>setid(e.target.value)} /></p>
                <button onClick={() => { socket.emit('addplayer', id); setconnectedroom(true) }}>play</button>
            </div>
        </div>
    )



}
export async function getServerSideProps(context) {
    return {
        props: context.query


    }
}