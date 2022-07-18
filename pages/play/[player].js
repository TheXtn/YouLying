import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import io from 'Socket.IO-client'
let socket;
export default function Play(props) {
    const [players, setplayers] = useState([])
    const [cards, setcards] = useState([])
    const [canPlay, setcanPlay] = useState(false)
    const [connectedroom, setconnectedroom] = useState(false)


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
            alert(res)
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
    }
    function playTurn(card_id) {
        socket.emit('play-turn', card_id)
    }
    useEffect(() => { socketInitializer() }, [])
    if (connectedroom) {
        return (
            <div> <h1>Connected players</h1>
                {id}
                <ul>
                    {players.map((item) => {

                        return (
                            <p key={item.name}>{item.name}</p>

                        )

                    })}
                </ul>
                <h1>My cards</h1>
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
                        return (<><li key={j.id}>{j.value} of {j.suit} <button disabled={!canPlay} onClick={playTurn(j.id)}>play</button></li></>)
                    })
                }

            </div>
        )
    }
    return (
        <div>

            <p>Nickname:</p>
            <p><input value={id} onChange={(e) => setid(e.target.value)} /></p>
            <button onClick={() => { socket.emit('addplayer', id); setconnectedroom(true) }}>Play !</button>

        </div>
    )



}
export async function getServerSideProps(context) {
    return {
        props: context.query


    }
}