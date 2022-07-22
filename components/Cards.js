import { Heading,Button,Select } from '@chakra-ui/react'
import { useState } from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  import { useToast } from '@chakra-ui/react'
import ReactHowler from 'react-howler'
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
    const toast = useToast()
    const [numberas,setnumberas]=useState(1)
    const [openmodal,setopenmodal]=useState(false)
    const cards=props.cards
    const [card,setcard]=useState("")
    const [cardstoplay,setcardstoplay]=useState([])
    function handleselect(){
      if (cardstoplay.includes(card)){
        toast({
          title: 'Card Error',
          description: "Card Already Selected",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return 
      }
      if (cardstoplay.length==3){
        toast({
          title: 'Card Error',
          description: "Max 3 card",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
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
                {cardstoplay?.length!=0 && props.canPlay && props.table.length==0 && (
<Button  onClick={()=>{setopenmodal(true)}}>Play</Button>
                ) }
                
                {cardstoplay.length!=0 && props.canPlay && props.table.length!=0 && (
<Button  onClick={()=>{props.playTurn(cardstoplay,numberas);setcardstoplay([])}}>Play</Button>
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
            <Button colorScheme='blue' mr={3} onClick={()=>{props.playTurn(cardstoplay,numberas);setopenmodal(false);setcardstoplay([])}}>
              Go
            </Button>
          
          </ModalFooter>
        </ModalContent>
               
                </Modal>:""}
          {props.canPlay && <Button onClick={()=>{handleselect()}}>Select this card</Button>}
        
        <Heading>Cards to play :</Heading>
        {cardstoplay.map((card)=>{
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