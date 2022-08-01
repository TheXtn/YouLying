import { Button, Flex, SimpleGrid, Stack,useColorModeValue,chakra, LinkBox } from "@chakra-ui/react";
import Link from 'next/link'
import { useEffect, useState } from "react";
import io from "socket.io-client";
import RoomSelector from "../components/RoomSelector";

export default function Home() {
  
  
  return (
    <>
      <div style={{textAlign:'center',marginTop:'15%'}}>
        <RoomSelector />
      </div>
    </>
  );
};