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
                {props.canPlay && props.table.length==0 && (
<Button  onClick={()=>{setopenmodal(true)}}>Play</Button>
                ) }
                {props.canPlay && props.table.length!=0 && (
<Button  onClick={()=>{props.playTurn(card,numberas)}}>Play</Button>
                ) }
        
                 {console.log(numberas)}
        {openmodal?<Modal isOpen={openmodal} onClose={()=>setopenmodal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You play this card as :</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <NumberInput onChange={(valueString) => setnumberas(parseInt(valueString))} defaultValue={1} min={1} max={13}>
  {console.log(numberas)}
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
          </ModalBody>

          <ModalFooter> 
            <Button colorScheme='blue' mr={3} onClick={()=>{props.playTurn(card,numberas);setopenmodal(false)}}>
              Go
            </Button>
          
          </ModalFooter>
        </ModalContent>
               
                </Modal>:""}
        
        </>
   
    )
}