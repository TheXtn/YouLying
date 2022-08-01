import React from 'react'
import { Button, Flex, SimpleGrid, Stack,useColorModeValue,chakra, LinkBox } from "@chakra-ui/react";
import Link from 'next/link'
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../styles/Custom.module.scss";

let socket
export default function RoomSelector() {
    useEffect(()=>{socketInitializer()},[])
  const [rooms,setrooms]=useState([])
  const socketInitializer = async () => {
    await fetch("/api/allrooms");
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on('allrooms',(res)=>{
      setrooms(res)
    })


  }
  const data = [
    {
      name: "Room 1",
      players: 2,
    },
    {
      name: "Room 2",
      players:4
    },
    
  ];
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  return (
    <div className={styles.body}>
    <div style={{width:'50%',marginLeft:'25%'}}>
    <SimpleGrid
                columns={{
                  base: 1,
                  md: 3,
                }}
                w={{
                  base: 120,
                  md: "full",
                }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{
                  base: 1,
                  md: 4,
                }}
                px={{
                  base: 2,
                  md: 10,
                }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Name</span>
                <span>Players</span>
                <chakra.span
                  textAlign={{
                    md: "right",
                  }}
                >
                  Actions
                </chakra.span>
              </SimpleGrid>
        {rooms?.map((room, pid) => {
          return (
            <div>
              
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 3,
                }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
                bg='white'
              >
                <span>{room.name}</span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {room.players.length}/{room.requiredPlayers} players
                </chakra.span>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  {room.players.length<room.requiredPlayers?<Link href={'/play/'+room.name}>
                  <Button variant="solid" colorScheme="red" size="sm">
                    Join
                  </Button></Link>:<Button disabled variant="solid" colorScheme="red" size="sm">
                    Full
                  </Button>}
                  
                </Flex>
              </SimpleGrid>
            </div>
          );
        })}
    </div>
    </div>
  )
}
