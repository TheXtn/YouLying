import { Heading,Button,Select } from '@chakra-ui/react'
import { useState } from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
export default function Cards(props){
  
    const [numberas,setnumberas]=useState(1)
    const [openmodal,setopenmodal]=useState(false)
    const cards=props.cards
    const [card,setcard]=useState("")
    const [Cardstoplay,setcardstoplay]=useState([])
    function handleselect(){
      if (Cardstoplay==3){
        alert("Max 3 cards")
        return
      }
      setcardstoplay((prevCards)=>([...prevCards,card]))
    }
    return (
        <div style={{textAlign:'center'}}>
            <Heading>My cards : {cards.length}</Heading>
                
                <Select placeholder='Select card' value={card} onChange={(e)=>{setcard(e.target.value)}}>
                {
                    cards.map((j) => {
                        return (<><option value={j.id} >{j.name} of {j.suit}</option></>)
                    })
                }
            </Select>
                {props.canPlay && props.table.length==0 && (
<Button  onClick={()=>{setopenmodal(true)}}>Play</Button>
                ) }
                
                {props.canPlay && props.table.length!=0 && (
<Button  onClick={()=>{props.playTurn(Cardstoplay,numberas)}}>Play</Button>
                ) }
        
                
        {openmodal?<Modal isOpen={openmodal} onClose={()=>setopenmodal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You play this card as :</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <NumberInput onChange={(valueString) => setnumberas(parseInt(valueString))} defaultValue={1} min={1} max={13}>

  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
          </ModalBody>

          <ModalFooter> 
            <Button colorScheme='blue' mr={3} onClick={()=>{props.playTurn(Cardstoplay,numberas);setopenmodal(false)}}>
              Go
            </Button>
          
          </ModalFooter>
        </ModalContent>
               
                </Modal>:""}
        <Button onClick={()=>{handleselect()}}>Select this card</Button>
        <Heading>Cards to play :</Heading>
        {Cardstoplay.map((card)=>{
          return (
            cards.map((c)=>{
              if (c.id==card){
                return(
                  <p>{c.value} of {c.suit}</p>
                )
              }
            })
          )
        })}
        </div>
   
    )
}