import { Server } from 'socket.io'
let currentPlayer = null;
let table = []
let leaderBoard = []
let cards = [
  { id: 1, suit: 'hearts', value: '1', name: 'A' },
  { id: 2, suit: 'hearts', value: '2', name: '2' },
  { id: 3, suit: 'hearts', value: '3', name: '3' },
  { id: 4, suit: 'hearts', value: '4', name: '4' },
  { id: 5, suit: 'hearts', value: '5', name: '5' },
  { id: 6, suit: 'hearts', value: '6', name: '6' },
  { id: 7, suit: 'hearts', value: '7', name: '7' },
  { id: 8, suit: 'hearts', value: '8', name: '8' },
  { id: 9, suit: 'hearts', value: '9', name: '9' },
  { id: 10, suit: 'hearts', value: '10', name: '10' },
  { id: 11, suit: 'hearts', value: '11', name: 'J' },
  { id: 12, suit: 'hearts', value: '12', name: 'Q' },
  { id: 13, suit: 'hearts', value: '13', name: 'K' },
  { id: 14, suit: 'spades', value: '1', name: 'A' },
  { id: 15, suit: 'spades', value: '2', name: '2' },
  { id: 16, suit: 'spades', value: '3', name: '3' },
  { id: 17, suit: 'spades', value: '4', name: '4' },
  { id: 18, suit: 'spades', value: '5', name: '5' },
  { id: 19, suit: 'spades', value: '6', name: '6' },
  { id: 20, suit: 'spades', value: '7', name: '7' },
  { id: 21, suit: 'spades', value: '8', name: '8' },
  { id: 22, suit: 'spades', value: '9', name: '9' },
  { id: 23, suit: 'spades', value: '10', name: '10' },
  { id: 24, suit: 'spades', value: '11', name: 'J' },
  { id: 25, suit: 'spades', value: '12', name: 'Q' },
  { id: 26, suit: 'spades', value: '13', name: 'K' },
  { id: 27, suit: 'clubs', value: '1', name: 'A' },
  { id: 28, suit: 'clubs', value: '2', name: '2' },
  { id: 29, suit: 'clubs', value: '3', name: '3' },
  { id: 30, suit: 'clubs', value: '4', name: '4' },
  { id: 31, suit: 'clubs', value: '5', name: '5' },
  { id: 32, suit: 'clubs', value: '6', name: '6' },
  { id: 33, suit: 'clubs', value: '7', name: '7' },
  { id: 34, suit: 'clubs', value: '8', name: '8' },
  { id: 35, suit: 'clubs', value: '9', name: '9' },
  { id: 36, suit: 'clubs', value: '10', name: '10' },
  { id: 37, suit: 'clubs', value: '11', name: 'J' },
  { id: 38, suit: 'clubs', value: '12', name: 'Q' },
  { id: 39, suit: 'clubs', value: '13', name: 'K' },
  { id: 40, suit: 'diamonds', value: '1', name: 'A' },
  { id: 41, suit: 'diamonds', value: '2', name: '2' },
  { id: 42, suit: 'diamonds', value: '3', name: '3' },
  { id: 43, suit: 'diamonds', value: '4', name: '4' },
  { id: 44, suit: 'diamonds', value: '5', name: '5' },
  { id: 45, suit: 'diamonds', value: '6', name: '6' },
  { id: 46, suit: 'diamonds', value: '7', name: '7' },
  { id: 47, suit: 'diamonds', value: '8', name: '8' },
  { id: 48, suit: 'diamonds', value: '9', name: '9' },
  { id: 49, suit: 'diamonds', value: '10', name: '10' },
  { id: 50, suit: 'diamonds', value: '11', name: 'J' },
  { id: 51, suit: 'diamonds', value: '12', name: 'Q' },
  { id: 52, suit: 'diamonds', value: '13', name: 'K' },
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
  cards = [
    { id: 1, suit: 'hearts', value: '1', name: 'A' },
    { id: 2, suit: 'hearts', value: '2', name: '2' },
    { id: 3, suit: 'hearts', value: '3', name: '3' },
    { id: 4, suit: 'hearts', value: '4', name: '4' },
    { id: 5, suit: 'hearts', value: '5', name: '5' },
    { id: 6, suit: 'hearts', value: '6', name: '6' },
    { id: 7, suit: 'hearts', value: '7', name: '7' },
    { id: 8, suit: 'hearts', value: '8', name: '8' },
    { id: 9, suit: 'hearts', value: '9', name: '9' },
    { id: 10, suit: 'hearts', value: '10', name: '10' },
    { id: 11, suit: 'hearts', value: '11', name: 'J' },
    { id: 12, suit: 'hearts', value: '12', name: 'Q' },
    { id: 13, suit: 'hearts', value: '13', name: 'K' },
    { id: 14, suit: 'spades', value: '1', name: 'A' },
    { id: 15, suit: 'spades', value: '2', name: '2' },
    { id: 16, suit: 'spades', value: '3', name: '3' },
    { id: 17, suit: 'spades', value: '4', name: '4' },
    { id: 18, suit: 'spades', value: '5', name: '5' },
    { id: 19, suit: 'spades', value: '6', name: '6' },
    { id: 20, suit: 'spades', value: '7', name: '7' },
    { id: 21, suit: 'spades', value: '8', name: '8' },
    { id: 22, suit: 'spades', value: '9', name: '9' },
    { id: 23, suit: 'spades', value: '10', name: '10' },
    { id: 24, suit: 'spades', value: '11', name: 'J' },
    { id: 25, suit: 'spades', value: '12', name: 'Q' },
    { id: 26, suit: 'spades', value: '13', name: 'K' },
    { id: 27, suit: 'clubs', value: '1', name: 'A' },
    { id: 28, suit: 'clubs', value: '2', name: '2' },
    { id: 29, suit: 'clubs', value: '3', name: '3' },
    { id: 30, suit: 'clubs', value: '4', name: '4' },
    { id: 31, suit: 'clubs', value: '5', name: '5' },
    { id: 32, suit: 'clubs', value: '6', name: '6' },
    { id: 33, suit: 'clubs', value: '7', name: '7' },
    { id: 34, suit: 'clubs', value: '8', name: '8' },
    { id: 35, suit: 'clubs', value: '9', name: '9' },
    { id: 36, suit: 'clubs', value: '10', name: '10' },
    { id: 37, suit: 'clubs', value: '11', name: 'J' },
    { id: 38, suit: 'clubs', value: '12', name: 'Q' },
    { id: 39, suit: 'clubs', value: '13', name: 'K' },
    { id: 40, suit: 'diamonds', value: '1', name: 'A' },
    { id: 41, suit: 'diamonds', value: '2', name: '2' },
    { id: 42, suit: 'diamonds', value: '3', name: '3' },
    { id: 43, suit: 'diamonds', value: '4', name: '4' },
    { id: 44, suit: 'diamonds', value: '5', name: '5' },
    { id: 45, suit: 'diamonds', value: '6', name: '6' },
    { id: 46, suit: 'diamonds', value: '7', name: '7' },
    { id: 47, suit: 'diamonds', value: '8', name: '8' },
    { id: 48, suit: 'diamonds', value: '9', name: '9' },
    { id: 49, suit: 'diamonds', value: '10', name: '10' },
    { id: 50, suit: 'diamonds', value: '11', name: 'J' },
    { id: 51, suit: 'diamonds', value: '12', name: 'Q' },
    { id: 52, suit: 'diamonds', value: '13', name: 'K' },
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

function checkTaksir(players, socket, io) {
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
        io.emit('taksir', `${card.value} Tkasrou by ${player.name}`);
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
  io.emit('update-player', connectedPlayers)
}



// array of played cards in the middle
const playedCards = [];

//array of broken cards
const brokenCards = [];
function moveTurnToTheNextPlayer(players, currentPlayer, io) {
  //get player id with the index next to the current player

  io.to(currentPlayer.player_id).emit('removeTurn')
  let nextPlayerIndex = players.findIndex(player => player.player_id === currentPlayer.player_id) + 1;
  if (nextPlayerIndex === players.length) {
    nextPlayerIndex = 0;
  }
  let nextPlayer = players[nextPlayerIndex];
  io.to(nextPlayer.player_id).emit('yourTurn')
  io.to(nextPlayer.player_id).emit('logs', `${nextPlayer.name} is your turn`)
  currentPlayer = nextPlayer;
  if (currentPlayer.cards.length <= 0) {
    io.emit("logs", "Player " + currentPlayer.name + " Won !")
    io.to(currentPlayer.player_id).emit('removeTurn')
    let nextPlayerIndex = players.findIndex(player => player.player_id === currentPlayer.player_id) + 1;
    if (nextPlayerIndex === players.length) {
      nextPlayerIndex = 0;
    }
    let nextPlayer = players[nextPlayerIndex];
    io.to(nextPlayer.player_id).emit('yourTurn')
    let old = currentPlayer
    leaderBoard.push(old)
    io.emit('update-leaderBoard', leaderBoard)
    currentPlayer = nextPlayer;
    connectedPlayers = connectedPlayers.filter((item) => (item.player_id != old.player_id))
    io.emit('update-player', connectedPlayers)


  }
  return currentPlayer;
}
function startTheGameMainFunction(socket, io, connectedPlayers, currentPlayer) {
  console.log("jaryaa !!")
  //let currentPlayerTurnId = connectedPlayers[0].player_id
  getCards(connectedPlayers);
  sortCards(connectedPlayers);
  // console.log(connectedPlayers)
  //io.emit('jarya', connectedPlayers)
  //trying new way of jarya
  jarya(connectedPlayers, io)
  io.emit("logs", "Jarya Done")
  currentPlayer = connectedPlayers[0]
  //wait 3 seconds before starting the game
  setTimeout(() => {
    io.emit('start-game', connectedPlayers)
    checkTaksir(connectedPlayers, socket, io);
    jarya(connectedPlayers, io)
    io.to(currentPlayer.player_id).emit('yourTurn')
  }, 3000);

  io.emit("whoplaying", currentPlayer.name)


  /* io.to(connectedPlayers[2].player_id).emit('yourTurn')
  io.to(connectedPlayers[3].player_id).emit('yourTurn')
  io.to(connectedPlayers[0].player_id).emit('yourTurn') */
  return currentPlayer;

}

const SocketHandler = (req, res) => {



  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', socket => {
      console.log("Client Connected")

      io.emit('update-player', connectedPlayers)

      socket.on("playingTurn", (Cardstoplay, id, selected) => {
        //loop throuch cardstoplay
        Cardstoplay.forEach(carta => {
          let card = cards.find((item) => (item.id == carta))
          card.as = selected;
          card.player_id = socket.id;
          card.player_name = id
          table.push(card);
        })

      
        /* table.push({ id: id, val: card.value, selected: selected }) */
        io.emit("update-table", table)
        //remove the card from player hand
        let player = connectedPlayers.find(player => player.player_id === socket.id)
        Cardstoplay.forEach(card => {
          let cardIndex = player.cards.findIndex(c => c.id === card.id)
          player.cards.splice(cardIndex, 1)
        })
        
        checkTaksir(connectedPlayers, socket);
        jarya(connectedPlayers, io)
        io.to(socket.id).emit('update-hand', player.cards)
        currentPlayer = moveTurnToTheNextPlayer(connectedPlayers, currentPlayer, io)
        io.emit("whoplaying", currentPlayer.name)
      })

      socket.on('ittihem', (card) => {
        //stop the function if the table is empty
        if (table.length === 0) {
          return;
        }
        //get the last card in table
        let lastPlayedCard = table[table.length - 1]
        //get the player who played the last card from the table
        let player_id = lastPlayedCard.player_id

        //loop the played cards backwards and get all the card played by the last player until you find a card not played by the last player
        let playedcards = []
        for (let i = table.length - 1; i >= 0; i--) {
          if (table[i].player_id === player_id) {
            playedcards.push(table[i])
          } else {
            break;
          }
        }
        //check if all the cards in played cards are equal the their as attribute
        let allEqual = true;
        for (let i = 0; i < playedcards.length; i++) {
          if (playedcards[i].as != playedcards[i].value) {
            allEqual = false;
            break;
          }
        }

        if (player_id == socket.id) {
          io.to(socket.id).emit("logs", "You can't accuse yourself")
          return;
        }

        var player = connectedPlayers.find(player => player.player_id === player_id)

        if (allEqual == false) {
          //kenou tla3 berrasmi yekdheb:

          //push the table cards to player hand
          player.cards.push(...table)
          //empty the table
          table = []

          io.emit("logs", player.name + " is lying he played " + card.value + " as " + lastPlayedCard.as + " All cards is going to him")
          checkTaksir(connectedPlayers, socket, io);
          jarya(connectedPlayers, io)
          io.emit("update-table", table)
          let socketPlayer = connectedPlayers.find((p) => p.player_id == socket.id)
          io.to(socket.id).emit("yourTurn")
          currentPlayer = socketPlayer
          connectedPlayers.map((p) => {
            if (p.player_id != socket.id) {
              io.to(p.player_id).emit("removeTurn")
            }
          })
          io.emit("whoplaying", currentPlayer.name)

        } else {
          //ken tla3 mouch yekdheb:
          let sada9 = connectedPlayers.find(player => player.player_id === player_id)

          io.to(sada9.player_id).emit("yourTurn")
          currentPlayer = sada9
          connectedPlayers.map((p) => {
            if (p.player_id != sada9.player_id) {
              io.to(p.player_id).emit("removeTurn")
            }
          })
          if (sada9.cards.length == 0) {
            currentPlayer = moveTurnToTheNextPlayer(connectedPlayers, currentPlayer, io)
            io.emit("logs", "Player " + sada9.name + " Won")
            leaderBoard.push(sada9)
            io.emit('update-leaderBoard', leaderBoard)
            connectedPlayers = connectedPlayers.filter((p) => (p.player_id != sada9.player_id))
          }
          io.emit("whoplaying", currentPlayer.name)
          //push the table cards to the socket.id player hand
          let player = connectedPlayers.find(player => player.player_id === socket.id)
          player.cards.push(...table)
          io.emit("logs", "All cards is going to " + player.name)
          //empty the table
          table = []
          checkTaksir(connectedPlayers, socket, io);
          jarya(connectedPlayers, io)
          io.emit("update-table", table)
        }
      })

      socket.on("lying", (item, id) => {
        console.log(id + " has catch " + item.id + " lying")

        connectedPlayers.map((player) => {
          if (player.name == item.id) {
            player.cards.push({ id: 9999, suit: item.suit, value: item.val })
            io.to(player.player_id).emit('jaryaV2', player.cards)
          }
        })
        table = []
        socket.emit("update-table", table)
      })
      socket.on('addplayer', player => {
        connectedPlayers.push({ id: 1, name: player, cards: [], player_id: socket.id })
        io.emit('update-player', connectedPlayers)
        if (connectedPlayers.length == 4) {
          currentPlayer = startTheGameMainFunction(socket, io, connectedPlayers, currentPlayer)


        }

        //emit to players their turn to play
        //while all players have cards

      })
      socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
        //get player from the connectedPlayers
        try {
          let player = connectedPlayers.find(player => player.player_id === socket.id)
          io.emit('logs', player.name + " disconnected")
        } catch (e) {
          console.log(e)
        }
        //delete player from connected players
        connectedPlayers = connectedPlayers.filter(player => player.player_id !== socket.id)
        io.emit('update-player', connectedPlayers)
        io.emit("close-game")
        table = []
        connectedPlayers.map((player) => {
          socket.disconnect(player.player_id)
        })
        connectedPlayers = []
      });
    })
  }
  res.end()
}

export default SocketHandler