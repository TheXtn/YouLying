import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "../../styles/Custom.module.scss";
import { useToast } from "@chakra-ui/react";
import {
  Container,
  HStack,
  VStack,
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Text,
  Select,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import ReactHowler from "react-howler";
import io from "socket.io-client";
import Table from "../../components/Table";
import Board from "../../components/Board";
import Cards from "../../components/Cards";
import Taksir from "../../components/Taksir";
import Leaders from "../../components/Leaders";
let socket;
const rooms = [
  {
    id: 1,
    name: "Room 1",
  },
  {
    id: 1,
    name: "Room 2",
  },
];
export default function Play(props) {
  const [taksir, setTaksir] = useState([]);
  const [players, setplayers] = useState([]);
  const [cards, setcards] = useState([]);
  const [canPlay, setcanPlay] = useState(false);
  const [connectedroom, setconnectedroom] = useState(false);
  const [table, settable] = useState([]);
  const [turn, setturn] = useState("");
  const [id, setid] = useState("");
  const [full, setfull] = useState(false);
  const [leaderBoard, setleaderBoard] = useState([]);
  const toast = useToast();
  const [cardstoplay, setcardstoplay] = useState([]);
  const [win, setwin] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Room 1");
  const roomID = props.roomID;

  const socketInitializer = async () => {
    await fetch("/api/" + roomID);
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("logs", (res) => {
      toast.closeAll;
      toast({
        title: "Notification.",
        description: res,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    });
    socket.on("update-player", (res) => {
      setplayers(res);
    });
    socket.on("jarya", (res) => {
      setplayers(res);
    });
    socket.on("start-game", (res) => {
      console.log("game started");
    });
    socket.on("taksir", (res) => {
      setTaksir((Prevtaksir) => [...Prevtaksir, res]);
    });
    socket.on("message", (res) => {
      alert(res);
    });
    socket.on("jaryaV2", (res) => {
      setcards(res);
    });
    socket.on("yourTurn", () => {
      setcanPlay(true);
    });
    socket.on("whoplaying", (res) => {
      setcardstoplay([]);
      setturn(res);
    });
    socket.on("update-win", () => {
      setwin(true);
    });
    socket.on("update-table", (tab) => {
      setcardstoplay([]);
      settable(tab);
    });
    socket.on("update-hand", (res) => {
      setcardstoplay([]);
      setcards(res);
    });
    socket.on("removeTurn", () => {
      setcardstoplay([]);
      setcanPlay(false);
    });
    socket.on("close-game", (res) => {
      setconnectedroom(false);
      toast.closeAll;
      toast({
        title: "Notification.",
        description: res,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    });
    socket.on("update-leaderBoard", (res) => {
      setleaderBoard(res);
    });
    socket.on("jad3lik", (link) => {
      const audio = new Audio(link);
      audio.play();
    });
  };
  function playTurn(Cardstoplay, numberas) {
    if (table?.length == 0) {
      socket.emit("playingTurn", Cardstoplay, id, numberas);
      //setcanPlay(!canPlay)
    } else {
      socket.emit("playingTurn", Cardstoplay, id, table[table.length - 1].as);
    }
  }
  function play() {
    if (id === "") {
      toast.closeAll;
      toast({
        title: "Notification.",
        description: "Please enter your name",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      socket.emit("addplayer", { player: id, roomName: roomID });
      setconnectedroom(true);
      const audio = new Audio("https://www.mboxdrive.com/marhbe3asba.mp3");
      audio.play();
    }
  }
  function lie(item) {
    setcardstoplay([]);
    socket.emit("ittihem", item);
  }
  useEffect(() => {
    socketInitializer();
  }, []);
  if (full) {
    return <Heading>Room is full</Heading>;
  }

  if (connectedroom) {
    return (
      <div className={styles.body}>
        <Grid
          h="100vh"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={30}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50px",
              boxShadow: "20px 1px 1vw rgba(0, 0, 0, 0.5)",
            }}
          >
            <Grid
              h="100vh"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(1, 1fr)"
              gap={0}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Board players={players} />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <div style={{ textAlign: "center", color: "white" }}>
                  ___________________________________________
                  <br />
                  <b style={{ fontSize: "50px" }}>LeaderBoard</b>
                  <Leaders leaderBoard={leaderBoard} />
                </div>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem rowSpan={2} colSpan={3}>
            <Grid
              h="0vh"
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(1, 1fr)"
              gap={10}
            >
              <GridItem
                rowSpan={4}
                colSpan={1}
                style={{
                  background: "rgba(0,255,109,0.6)",
                  borderRadius: "50px",
                  boxShadow: "30px 35px 1vw rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "40px",
                    marginTop: "5%",
                    color: "white",
                  }}
                >
                  <b>{turn} Yal3ab</b>
                </div>
              </GridItem>
              <GridItem rowSpan={8} colSpan={1}>
                <Table
                  win={win}
                  cardstoplay={cardstoplay}
                  setcardstoplay={setcardstoplay}
                  table={table}
                  lie={lie}
                />
              </GridItem>
              <GridItem
                rowSpan={10}
                colSpan={1}
                style={{
                  background: "rgba(255,255,255,0)",
                  borderRadius: "50px",
                }}
              >
                <Cards
                  cardstoplay={cardstoplay}
                  setcardstoplay={setcardstoplay}
                  table={table}
                  cards={cards}
                  canPlay={canPlay}
                  playTurn={playTurn}
                  setcards={setcards}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            rowSpan={2}
            colSpan={1}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50px",
              boxShadow: "20px 1px 1vw rgba(0, 0, 0, 0.5)",
            }}
          >
            <Taksir taksir={taksir} />
          </GridItem>
        </Grid>
      </div>
    );
  }
  return (
    <div className={styles.body}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        <form
          onSubmit={() => {
            play();
          }}
        >
          <Flex spacing={10}>
            <Box shadow={"xl"} spacing={20} w={"full"} margin={10}>
              <VStack
                w="full"
                h={"full"}
                p={10}
                spacing={10}
                alignItems={"center"}
              >
                <Heading style={{ textAlign: "center", color: "white" }}>
                  Welcome to {roomID}
                </Heading>
                <div style={{ textAlign: "center" }}>
                  
                  <Text>
                    <b style={{ fontSize: "1.5rem", color: "white" }}>
                      Nickname
                    </b>
                  </Text>
                  <p>
                    <Input value={id} onChange={(e) => setid(e.target.value)} />
                  </p>
                </div>
                <Button
                  onClick={() => {
                    play();
                  }}
                >
                  Play
                </Button>
              </VStack>
            </Box>
          </Flex>
        </form>
      </Container>
    </div>
  );
}
export async function getServerSideProps(context) {
  return {
    props: context.query,
  };
}
