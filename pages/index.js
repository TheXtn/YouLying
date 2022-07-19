import { useEffect, useState } from 'react'
import Link from 'next/link'
import io from 'Socket.IO-client'
let socket;


const Home = () => {
  const [id, setid] = useState('')
  const [messages,setmessages]=useState([])
  const [input, setInput] = useState('')
  useEffect(() => {socketInitializer()}, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('update-input',(msg)=>{
      setmessages((prev)=>[...prev,msg])
    })
  }

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', input)
  }
  
  return (
    
    <div>
      <p>Nickname:</p>
            <p><input value={id} onChange={(e)=>setid(e.target.value)} /></p>
            <Link href={`/play/${encodeURIComponent(id)}`}><button >Play !</button></Link><br/>
      {messages.map((item)=>{
        return(
          <p key={item}>{item}</p>
        )
       
      })}
    <input
      type={"text"}
      placeholder="Type something"
      value={input}
      onChange={(e)=>{setInput(e.target.value)}}
    />
    <button onClick={onChangeHandler}>Send message</button>
    </div>
  )
}

export default Home;