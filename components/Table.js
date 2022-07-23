import { Heading,Button } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'

export default function Table(props){
    const table=props.table
    let cardOnTable = "/card back side.png"
    if (table.length==0){cardOnTable ="/../public/card back side.png"}
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    return (
        <div style={{textAlign:'center'}}>
        <Heading style={{color:'white'}}>Table</Heading>
        <br/>
        <div style={{color:'white'}}>
        
        {table.map((item)=>{
            return(
                <p key={item.player_name}>{item.player_name} played {item.as}</p>
            )
        })}
        </div>
        <br/>
        <br/>
        {table.length>0 && <Image src={cardOnTable} width={120} height={80} />}
        <br/>
        <br/>
        <br/>
        <br/>
        {(table.length>0) && <Button colorScheme={"teal"} onClick={() => sleep(0).then(() => {props.lie(table[table.length-1])})}>Ya7chi fih</Button>}
        
    </div>
    )
}