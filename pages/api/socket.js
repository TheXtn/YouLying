import { Server } from 'Socket.IO'
let table=[]
let cards = [
  { id: 1, suit: 'hearts', value: '1' },
  { id: 2, suit: 'hearts', value: '2' },
  { id: 3, suit: 'hearts', value: '3' },
  { id: 4, suit: 'hearts', value: '4' },
  { id: 5, suit: 'hearts', value: '5' },
  { id: 6, suit: 'hearts', value: '6' },
  { id: 7, suit: 'hearts', value: '7' },
  { id: 8, suit: 'hearts', value: '8' },
  { id: 9, suit: 'hearts', value: '9' },
  { id: 10, suit: 'hearts', value: '10' },
  { id: 11, suit: 'hearts', value: '11' },
  { id: 12, suit: 'hearts', value: '12' },
  { id: 13, suit: 'hearts', value: '13' },
  { id: 14, suit: 'spades', value: '1' },
  { id: 15, suit: 'spades', value: '2' },
  { id: 16, suit: 'spades', value: '3' },
  { id: 17, suit: 'spades', value: '4' },
  { id: 18, suit: 'spades', value: '5' },
  { id: 19, suit: 'spades', value: '6' },
  { id: 20, suit: 'spades', value: '7' },
  { id: 21, suit: 'spades', value: '8' },
  { id: 22, suit: 'spades', value: '9' },
  { id: 23, suit: 'spades', value: '10' },
  { id: 24, suit: 'spades', value: '11' },
  { id: 25, suit: 'spades', value: '12' },
  { id: 26, suit: 'spades', value: '13' },
  { id: 27, suit: 'clubs', value: '1' },
  { id: 28, suit: 'clubs', value: '2' },
  { id: 29, suit: 'clubs', value: '3' },
  { id: 30, suit: 'clubs', value: '4' },
  { id: 31, suit: 'clubs', value: '5' },
  { id: 32, suit: 'clubs', value: '6' },
  { id: 33, suit: 'clubs', value: '7' },
  { id: 34, suit: 'clubs', value: '8' },
  { id: 35, suit: 'clubs', value: '9' },
  { id: 36, suit: 'clubs', value: '10' },
  { id: 37, suit: 'clubs', value: '11' },
  { id: 38, suit: 'clubs', value: '12' },
  { id: 39, suit: 'clubs', value: '13' },
  { id: 40, suit: 'diamonds', value: '1' },
  { id: 41, suit: 'diamonds', value: '2' },
  { id: 42, suit: 'diamonds', value: '3' },
  { id: 43, suit: 'diamonds', value: '4' },
  { id: 44, suit: 'diamonds', value: '5' },
  { id: 45, suit: 'diamonds', value: '6' },
  { id: 46, suit: 'diamonds', value: '7' },
  { id: 47, suit: 'diamonds', value: '8' },
  { id: 48, suit: 'diamonds', value: '9' },
  { id: 49, suit: 'diamonds', value: '10' },
  { id: 50, suit: 'diamonds', value: '11' },
  { id: 51, suit: 'diamonds', value: '12' },
  { id: 52, suit: 'diamonds', value: '13' },
];
var connectedPlayers = []
function getRandomCard() {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  cards.splice(cards.indexOf(randomCard), 1);
  return randomCard;
}
function getCards(players) {
  while (cards.length > 0) {
    players.forEach(player => {
      const card = getRandomCard()
      if (card) {
        player.cards.push(card);
      }
    });
  }
  cards= [
    { id: 1, suit: 'hearts', value: '1' },
    { id: 2, suit: 'hearts', value: '2' },
    { id: 3, suit: 'hearts', value: '3' },
    { id: 4, suit: 'hearts', value: '4' },
    { id: 5, suit: 'hearts', value: '5' },
    { id: 6, suit: 'hearts', value: '6' },
    { id: 7, suit: 'hearts', value: '7' },
    { id: 8, suit: 'hearts', value: '8' },
    { id: 9, suit: 'hearts', value: '9' },
    { id: 10, suit: 'hearts', value: '10' },
    { id: 11, suit: 'hearts', value: '11' },
    { id: 12, suit: 'hearts', value: '12' },
    { id: 13, suit: 'hearts', value: '13' },
    { id: 14, suit: 'spades', value: '1' },
    { id: 15, suit: 'spades', value: '2' },
    { id: 16, suit: 'spades', value: '3' },
    { id: 17, suit: 'spades', value: '4' },
    { id: 18, suit: 'spades', value: '5' },
    { id: 19, suit: 'spades', value: '6' },
    { id: 20, suit: 'spades', value: '7' },
    { id: 21, suit: 'spades', value: '8' },
    { id: 22, suit: 'spades', value: '9' },
    { id: 23, suit: 'spades', value: '10' },
    { id: 24, suit: 'spades', value: '11' },
    { id: 25, suit: 'spades', value: '12' },
    { id: 26, suit: 'spades', value: '13' },
    { id: 27, suit: 'clubs', value: '1' },
    { id: 28, suit: 'clubs', value: '2' },
    { id: 29, suit: 'clubs', value: '3' },
    { id: 30, suit: 'clubs', value: '4' },
    { id: 31, suit: 'clubs', value: '5' },
    { id: 32, suit: 'clubs', value: '6' },
    { id: 33, suit: 'clubs', value: '7' },
    { id: 34, suit: 'clubs', value: '8' },
    { id: 35, suit: 'clubs', value: '9' },
    { id: 36, suit: 'clubs', value: '10' },
    { id: 37, suit: 'clubs', value: '11' },
    { id: 38, suit: 'clubs', value: '12' },
    { id: 39, suit: 'clubs', value: '13' },
    { id: 40, suit: 'diamonds', value: '1' },
    { id: 41, suit: 'diamonds', value: '2' },
    { id: 42, suit: 'diamonds', value: '3' },
    { id: 43, suit: 'diamonds', value: '4' },
    { id: 44, suit: 'diamonds', value: '5' },
    { id: 45, suit: 'diamonds', value: '6' },
    { id: 46, suit: 'diamonds', value: '7' },
    { id: 47, suit: 'diamonds', value: '8' },
    { id: 48, suit: 'diamonds', value: '9' },
    { id: 49, suit: 'diamonds', value: '10' },
    { id: 50, suit: 'diamonds', value: '11' },
    { id: 51, suit: 'diamonds', value: '12' },
    { id: 52, suit: 'diamonds', value: '13' },
  ];
}

function sortCards(players) {
  players.forEach(player => {
    player.cards.sort((a, b) => a.value - b.value);
  });
}

function checkIfGameIsOver(players) {
  let playersWithCards = 0;
  players.forEach(player => {
    if (player.cards.length > 0) {
      playersWithCards++;
    }
  }
  );
  if (playersWithCards < 2) {
    return true;
  }
  return false;
}

function checkTaksir(players, socket) {
  sortCards(players);
  players.forEach(player => {
    let cards = player.cards;
    let sameCardsNumber = 0;
    cards.forEach((card, index) => {
      if (cards[index + 1] && card.value === cards[index + 1].value) {
        sameCardsNumber++;
      } else {
        sameCardsNumber = 0;
      }
      if (sameCardsNumber === 3) {
        console.log(`${player.name} has 4 the same card number that starts at index ${index - 2}`);
        socket.broadcast.emit('taksir', `${card.value} Tkasrou by ${player.name}`);
        const sameCards = player.cards.splice(index - 2, 4);
        sameCards.forEach(card => {
          card.player = player.name;
          brokenCards.push(card)
        });
        sameCardsNumber = 0;
      }
    })

  })
}
//jarya
function jarya(players, io) {
  players.forEach(player => {
    io.to(player.player_id).emit('jaryaV2', player.cards)
  })
}

function pickPlayerTurn(players,currentPlayerTurnId,io){
  //get player with the index next to the current player
  let nextPlayerIndex = players.findIndex(player => player.player_id === currentPlayerTurnId) + 1;
  if(nextPlayerIndex === players.length){
    nextPlayerIndex = 0;
  }
  let nextPlayer = players[nextPlayerIndex];
  io.to(nextPlayer.player_id).emit('yourTurn')
  return nextPlayer.player_id;
}

// array of played cards in the middle
const playedCards = [];

//array of broken cards
const brokenCards = [];
function startTheGameMainFunction(socket,io,connectedPlayers){
          console.log("jaryaa !!")
          //let currentPlayerTurnId = connectedPlayers[0].player_id
          getCards(connectedPlayers);
          sortCards(connectedPlayers);
          // console.log(connectedPlayers)
          socket.broadcast.emit('jarya', connectedPlayers)
          //trying new way of jarya
          jarya(connectedPlayers, io)

          //wait 2 seconds before starting the game
          setTimeout(() => {
            socket.broadcast.emit('start-game', connectedPlayers)
            checkTaksir(connectedPlayers, socket);
            /* socket.broadcast.emit('jarya', connectedPlayers) */
            jarya(connectedPlayers, io)
           /*  io.to(connectedPlayers[0].player_id).emit('message', 'for your eyes only'); */
           /* while(checkIfGameIsOver(connectedPlayers) === false){
            currentPlayerTurnId = pickPlayerTurn(connectedPlayers,currentPlayerTurnId,io)
            console.log(currentPlayerTurnId+" is now playing")
            checkTaksir(connectedPlayers, socket);
            jarya(connectedPlayers, io)
           } */
          }, 3000);
          io.to(connectedPlayers[2].player_id).emit('yourTurn')
          
}
const SocketHandler = (req, res) => {
  //check for taksir

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      console.log("Client Connected")
      socket.broadcast.emit('update-player', connectedPlayers)
      socket.on("playingTurn",(card,id,selected)=>{
        table.push({id:id,val:card.value,selected:selected})
        socket.broadcast.emit("update-table",table)
        
      })
      socket.on("lying",(item,id)=>{
        console.log(id+" has catch "+item.id+" lying")
        connectedPlayers.map((player)=>{
          if (player.name==item.id){
            player.cards.push({id:9999,suit:"new",value:item.val})
            io.to(player.player_id).emit('jaryaV2', player.cards)
          }
        })
        table=[]
        socket.emit("update-table",table)
      })
      socket.on('addplayer', player => {
        connectedPlayers.push({ id: 1, name: player, cards: [], player_id: socket.id })
        socket.broadcast.emit('update-player', connectedPlayers)
        if (connectedPlayers.length == 4) {
          startTheGameMainFunction(socket,io,connectedPlayers)
          
        }
        
        //emit to players their turn to play
        //while all players have cards
       
      })
      socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
        //delete player from connected players
        connectedPlayers = connectedPlayers.filter(player => player.player_id !== socket.id)
        socket.broadcast.emit('update-player', connectedPlayers)
        console.log('user disconnected');
      });
    })
  }
  res.end()
}

export default SocketHandler