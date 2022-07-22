import { useEffect, useState } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import styles from '../styles/Custom.module.scss'

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
    
    <div className={styles.body}>
    <div className={styles.selectserver}>
      <p>Select a room:</p>
      <p><select value={id} onChange={(e)=>setid(e.target.value)}>
          <option value=""></option>
          <option value="LocalRoom">Local room</option>
      </select></p>
      <Link href={`/play/${encodeURIComponent(id)}`}><button >Play !</button></Link><br/>

      {messages.map((item)=>{
        return(
          <p key={item}>{item}</p>
        )
       
      })}
      </div>
      <div className={styles.chatbox}>
    <input
      type={"text"}
      placeholder="Type something"
      value={input}
      onChange={(e)=>{setInput(e.target.value)}}
    />
    <button onClick={onChangeHandler}>Send message</button>
    </div>
    </div>
  )
}

export default Home;