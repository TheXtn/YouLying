import { Heading,Button,Select } from '@chakra-ui/react'
import { useState } from 'react'

export default function Cards(props){
    const cards=props.cards
    const [card,setcard]=useState("")
    return (
        <>
            <Heading>My cards : {cards.length}</Heading>
                
                <Select placeholder='Select card' value={card} onChange={(e)=>{setcard(e.target.value)}}>
                {
                    cards.map((j) => {
                        return (<><option value={j.id} >{j.value} of {j.suit}</option></>)
                    })
                }
            </Select>
                {props.canPlay && (
<Button  onClick={()=>{props.playTurn(card)}}>Play</Button>
                ) }
        
                
        </>
   
    )
}