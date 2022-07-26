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
    const [cardsplayed, setcardsplayed] = useState(false)
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
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    return (
      
        <motion.div layout  style={{textAlign:'center'}}>
          <Grid
                    h='40vh'
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(1, 1fr)'
                    gap={0}
                >
                <GridItem h='20vh' rowSpan={1} colSpan={1}>
        <AnimatePresence>
        {cardstoplay.map((card)=>{
          return (
            
           
                
                  <motion.button  initial={{}} layout  key={card.id} whileHover={{opacity:0.3}}>
                  <Image onClick={()=>{;props.setcardstoplay(cardstoplay.filter((cc)=>(cc.id!=card.id)));props.setcards((PrevCards)=>([...PrevCards,card].sort((a, b) => a.value - b.value)))}}  height={"80px"} width={"80px"} src={'/Cards/'+card.suit+"/"+card.value+'.png'}></Image>
                  </motion.button>
              
            
          )
        })}
      </AnimatePresence>
      {cardstoplay?.length!=0 && props.canPlay && props.table.length==0 &&
<div><br/><Button width={'10rem'} onClick={()=>{setopenmodal(true)}}>Play</Button></div>
                }
                
                {cardstoplay.length!=0 && props.canPlay && props.table.length!=0 ?
<div><br/><Button width={'10rem'}  onClick={()=>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),numberas);props.setcardstoplay([]);setnumberas(1)}}>Play</Button></div>
                : <><br/></> }
                {cardsplayed==true && <><motion.div animate={{x:160,y: -220 }} transition={{duration:.4}}> <Image  height={"80px"} width={"80px"} src={'/card back.png'}/> </motion.div></>}
                </GridItem>


                <GridItem h='20vh' rowSpan={1} colSpan={1} style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '50px' }}>
                
                
          <AnimatePresence>
          {
                    cards.map((j) => {
                        return (<motion.button   layout   animate={{rotate:360}} key={j.id} whileHover={{ scale: 1.5 }}   transition={{type:'spring',stiffness:300}}><Image onClick={()=>{handleCardSelecting(j)}}  height={"50px"} width={"50px"} src={'/Cards/'+j.suit+"/"+j.value+'.png'}></Image></motion.button>)
                    })
                }</AnimatePresence>
                </GridItem>
                
                
              
        
                
        {openmodal?<Modal isOpen={openmodal} onClose={()=>setopenmodal(false)}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={()=>{props.playTurn(cardstoplay.map((card)=>(card.id)),numberas);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
          <ModalHeader>Play Card(s) as :</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{textAlign:'center'}}>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),1);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  A
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),2);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  2
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),3);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  3
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),4);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  4
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),5);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  5
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),6);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  6
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),7);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  7
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),8);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  8
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),9);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  9
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),10);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  10
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),11);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  J
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),12);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  Q
                </Button>
                <Button colorScheme='blue' mr={3} onClick={() =>{setcardsplayed(true);props.playTurn(cardstoplay.map((card)=>(card.id)),13);setopenmodal(false);props.setcardstoplay([]);setnumberas(1)}}>
                  K
                </Button>                
          </ModalBody>
          </form>
        </ModalContent>
               
                </Modal>:""}
         
        
       
      
        
          </Grid>
    
        </motion.div>
   
    )
}