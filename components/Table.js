import { Heading,Button,Flex,VStack } from '@chakra-ui/react'
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
        <br/>
        <br/>
        <br/>
        <Flex spacing={10}>
        <VStack w="full" h={"full"} p={10} spacing={10} alignItems={"center"} >
        <div style={{color:'white'}}>
       
        {table.map((item)=>{
            return(
                <p key={item.player_name} style={{display:'flex'}}>{item.player_name} played :    {item.as!=11 && item.as!=12 && item.as!=13 ? item.as:<p></p>} {item.as==11 ? <p>J</p>:<p></p>} {item.as==12 ? <p>Q</p>:<p></p>} {item.as==13 ? <p>K</p>:<p></p>}</p>
            )
        })}
        </div>
        </VStack>
        <VStack w="full" h={"full"} p={10} spacing={10} alignItems={"center"} >

        {table.length>0 && <Image src={cardOnTable} width={120} height={80} />}
    
        {(table.length>0) && props.win==false && <Button  colorScheme={"teal"} onClick={() => sleep(0).then(() => {props.lie(table[table.length-1]);
        props.setcardstoplay([])
        })}>Ya7chi fih</Button>}</VStack>
        </Flex>
    </div>
    )
}