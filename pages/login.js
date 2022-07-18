import { useState } from "react"
import Link from 'next/link'
export default function Login(){
    const [id, setid] = useState('')
    return(
        <div>
            <p>Nickname:</p>
            <p><input value={id} onChange={(e)=>setid(e.target.value)} /></p>
            <Link href={`/play/${encodeURIComponent(id)}`}><button >Play !</button></Link>

            
        </div>
    )
}