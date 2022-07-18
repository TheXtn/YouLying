import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import io from 'Socket.IO-client'
let socket;
export default function Play(props){
    const [players,setplayers]=useState([])
    const [cards,setcards]=useState([])
    const [connectedroom,setconnectedroom]=useState(false)
    const router=useRouter()
    const player=props["player"]
    const [id,setid]=useState('')
    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()
        socket.on('connect', () => {
            console.log("connected")
            
        })
        socket.on('update-player',(res)=>{
            setplayers(res)
        })
        socket.on('jarya',(res)=>{
            setplayers(res)
        })
        
      }
    useEffect(() => {socketInitializer()}, [])
    if (connectedroom){
        return (
            <div> <h1>Connected players</h1>
             {id}
        <ul>
        {players.map((item)=>{
            
            return(
                <p key={item.name}>{item.name}</p>
      
            )
            
        })}
        </ul>
        <h1>My cards</h1>
        {players.map((item)=>{
            if (item.name==id){
                return (item.cards.map((j)=>{
                    return (<li key={j.id}>{j.value} of {j.suit}</li>)
                }))
            }
            
        })}
       
        </div>
        )
    }
    return (
        <div>
       
        <p>Nickname:</p>
        <p><input value={id} onChange={(e)=>setid(e.target.value)} /></p>
        <button onClick={()=>{socket.emit('addplayer',id);setconnectedroom(true)}}>Play !</button>
       
    </div>
    )
    
       
    
}
export async function getServerSideProps(context){
    return {
        props: context.query
        
    
}}