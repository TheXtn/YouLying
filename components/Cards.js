import { Heading,Button,Select } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'
import { motion, isValidMotionProp,AnimatePresence } from 'framer-motion'
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
    const [anim,setanim]=useState([0,0,0])
    const [xan,setxan]=useState(0)
    const toast = useToast()
    const [numberas,setnumberas]=useState(1)
    const [openmodal,setopenmodal]=useState(false)
    const [scaleLevel,setscaleLevel]=useState(0)
    const cards=props.cards
    const cardstoplay=props.cardstoplay
    function handleCardSelecting(cardOBJ){
      if (!props.canPlay){
        toast({
          title: 'Card Error',
          description: "Its not your turn !",
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
      setxan(50)
      props.setcardstoplay((prevCards)=>([...prevCards,cardOBJ]))
      props.setcards(cards.filter((c)=>(c.id!=cardOBJ.id)))
      
    }
    return (
      
        <motion.div layout  style={{textAlign:'center'}}>
          <Grid
                    h='45vh'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(1, 1fr)'
                    gap={0}
                >
                <GridItem rowSpan={1} colSpan={1}>
        <AnimatePresence>
        {cardstoplay.map((card)=>{
          return (
            
           
                
                  <motion.button  initial={{}} layout  key={card.id} whileHover={{opacity:0.3}}>
                  <Image onClick={()=>{props.setcardstoplay(cardstoplay.filter((cc)=>(cc.id!=card.id)));props.setcards((PrevCards)=>([...PrevCards,card].sort((a, b) => a.value - b.value)))}}  height={"100px"} width={"100px"} src={'/Cards/'+card.suit+"/"+card.value+'.png'}></Image>
                  </motion.button>
              
            
          )
        })}
      </AnimatePresence>
      {cardstoplay?.length!=0 && props.canPlay && props.table.length==0 &&
<div><br/><Button width={'10rem'} onClick={()=>{setopenmodal(true)}}>Play</Button></div>
                }
                
                {cardstoplay.length!=0 && props.canPlay && props.table.length!=0 ?
<div><br/><Button width={'10rem'}  onClick={()=>{props.playTurn(cardstoplay.map((card)=>(card.id)),numberas);props.setcardstoplay([]);setnumberas(1)}}>Play</Button></div>
                : <><br/></> }
                </GridItem>


                <GridItem rowSpan={1} colSpan={1} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '50px' }}>
                
                <Heading style={{color:'white'}}>My cards {cards.length}</Heading>
          <AnimatePresence>
          {
                    cards.map((j) => {
                        return (<motion.button   layout   animate={{rotate:360}} key={j.id} whileHover={{ scale: 1.5 }}   transition={{type:'spring',stiffness:300}}><Image onClick={()=>{handleCardSelecting(j)}}  height={"100px"} width={"100px"} src={'/Cards/'+j.suit+"/"+j.value+'.png'}></Image></motion.button>)
                    })
                }</AnimatePresence>
                </GridItem>
                
                
              
        
                
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
            <Button colorScheme='blue' mr={3} onClick={()=>{props.playTurn(cardstoplay.map((card)=>(card.id)),numberas);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
              Go
            </Button>
          
          </ModalFooter>
        </ModalContent>
               
                </Modal>:""}
         
        
       
      
        
          </Grid>
    
        </motion.div>
   
    )
}