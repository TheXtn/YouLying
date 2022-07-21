import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from 'next/image'
import { useToast } from '@chakra-ui/react'
import { Container,HStack,VStack,Flex,Heading,Input,Button,Box,Text } from '@chakra-ui/react'

import io from 'socket.io-client'
import Table from "../../components/Table";
import Board from "../../components/Board";
import Cards from "../../components/Cards";
import Taksir from "../../components/Taksir";
let socket;

export default function Play(props) {
    const [taksir, setTaksir] = useState([]);
    const [players, setplayers] = useState([])
    const [cards, setcards] = useState([])
    const [canPlay, setcanPlay] = useState(false)
    const [connectedroom, setconnectedroom] = useState(false)
    const [table,settable]=useState([])
    const [turn,setturn]=useState("")
    const [id, setid] = useState('')
    const toast = useToast()
    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()
        socket.on('connect', () => {
            console.log("connected")

        })
        socket.on("logs",(res)=>{
            toast.closeAll
            toast({
                title: 'Notification.',
                description: res,
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
        })
        socket.on('update-player', (res) => {
            setplayers(res)
        })
        socket.on('jarya', (res) => {

            setplayers(res)
        })
        socket.on('start-game', (res) => {
            console.log("game started")
        })
        socket.on('taksir', (res) => {
            setTaksir((Prevtaksir)=>[...Prevtaksir,res])
        })
        socket.on('message', (res) => {
            alert(res)
        })
        socket.on('jaryaV2', (res) => {
            
            setcards(res)
        })
        socket.on('yourTurn', () => {
            setcanPlay(true)
        })
        socket.on('whoplaying',(res)=>{
            
            setturn(res)
        })
        socket.on("update-table", (tab) => {
            settable(tab)
        })
        socket.on('update-hand', (res) => {
            setcards(res)
        })
        socket.on('removeTurn', () => {
            setcanPlay(false)
        })
        socket.on('close-game',(res)=>{
            setconnectedroom(false)
            toast.closeAll
            toast({
                title: 'Notification.',
                description: "A player has disconnected game will finish",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
            
        })
    }
    function playTurn(cardID) {
        if (table.length==0){
            let selected=prompt("You play this card as ?")
        socket.emit('playingTurn', cardID,id,selected)
    //setcanPlay(!canPlay)
}
            
        else{
            socket.emit('playingTurn', cardID,id,table[table.length-1].as)
        }
    }
    function lie(item) {
        socket.emit('ittihem', item)
    }
    useEffect(() => { socketInitializer() }, [])
    if (connectedroom) {
        return (
            <Container  maxW='container.xl' p={0}>
                
                <Flex h={'100vh'} py={20} spacing={10} direction={['column','row']}>
                <VStack w="full" h={"full"} p={10} spacing={10} alignItems={"flex-start"} bg={"green.50"}>
                <Cards cards={cards} canPlay={canPlay} playTurn={playTurn}/>
                <Taksir taksir={taksir}/>
                </VStack>
                <Flex w={'full'}  spacing={10} direction={"column"}>
                <HStack w="full" h={"full"} p={10} spacing={10} alignItems={"flex-start"} bg={"gray.200"}>
                <Table table={table} lie={lie}/>

               
                </HStack>
                <HStack bg={'teal'} w="full" h={"30vh"} p={10} spacing={10} alignItems={"flex-start"} >

                <Heading>Turn at : {turn}</Heading>
                
                </HStack>
                </Flex>
                <VStack w="full" h={"full"} p={10} spacing={10} alignItems={"flex-start"} bg={"red.50"}>
                <Heading>I Am Player: {id}</Heading>
                <Board players={players}/>
                </VStack>
                
                
                </Flex>
                
                
               
                
            </Container>
        )
    }
    return (
        <Container >
            <Flex spacing={10}>
            <Box shadow={"xl"} spacing={20} w={"full"} margin={10}>
                <VStack w="full" h={"full"} p={10} spacing={10} alignItems={"flex-start"} >
                <Heading>Welcome to local room</Heading>
                <Text>Nickname :</Text>
                <p><Input value={id} onChange={(e)=>setid(e.target.value)} /></p>
                <Button onClick={() => { socket.emit('addplayer', id); setconnectedroom(true) }}>Play</Button>
                </VStack>            
            </Box>
            </Flex>
            
        </Container>
    )



}
export async function getServerSideProps(context) {
    return {
        props: context.query


    }
}