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
      if (!card){
        toast({
          title: 'Card Error',
          description: "Please select a valid card",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return 
      }
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
          description: "Max 3 cards",
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
              
        
                
        {openmodal?<Modal isOpen={openmodal} onClose={()=>setopenmodal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Play Card(s) as :</ModalHeader>
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
                  <Heading color={"whatsapp.100"}>
                  {c.value} of {c.suit}
                  </Heading>
                  
                )
              }
            })
          )
        })}
          {cardstoplay?.length!=0 && props.canPlay && props.table.length==0 && (
<Button  onClick={()=>{setopenmodal(true)}}>Play</Button>
                ) }
                
                {cardstoplay.length!=0 && props.canPlay && props.table.length!=0 && (
<Button  onClick={()=>{props.playTurn(cardstoplay,numberas);setcardstoplay([])}}>Play</Button>
                ) }
        </div>
   
    )
}