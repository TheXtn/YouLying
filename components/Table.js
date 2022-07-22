import { Heading,Button } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'

export default function Table(props){
    const table=props.table
    let cardOnTable = "/../public/card back side.png"
    if (table.length==0){cardOnTable ="/../public/card back side.png"}
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    return (
        <div style={{textAlign:'center'}}>
        <Heading style={{color:'white'}}>Table</Heading>
        <br/>
        <div style={{color:'white'}}>
        {table.length>1 ? <p>{table[table.length-2].player_name} played {table[table.length-2].as}</p> : <br/>}
        {table.length>0 && <b style={{fontSize:'30px'}}>{table[table.length-1].player_name} played {table[table.length-1].as}</b>}
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