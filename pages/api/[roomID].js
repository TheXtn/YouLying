import { Server } from 'socket.io'
import {cards,checkTaksir,jarya,moveTurnToTheNextPlayer,startTheGameMainFunction,connectedPlayers,currentPlayer,table,leaderBoard,updatecurrentPlayer,updatetable,updateleaderBoard,updateconnectedPlayers} from '../../helper/tekdheb'
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
          //remove card from player hand
          let p = connectedPlayers.find((item) => (item.player_id == socket.id))
          p.cards = p.cards.filter((item) => (item.id != carta))
        })

      
        /* table.push({ id: id, val: card.value, selected: selected }) */
        io.emit("update-table", table)
        //remove the card from player hand
        let player = connectedPlayers.find(player => player.player_id === socket.id)
    
        checkTaksir(connectedPlayers, socket);
        jarya(connectedPlayers, io)
        io.to(socket.id).emit('update-hand', player.cards)
        updatecurrentPlayer(moveTurnToTheNextPlayer(connectedPlayers, currentPlayer, io)) 
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
          io.emit('jad3lik',"https://audio.jukehost.co.uk/C269dCXnfM0KmdwrqusnwW7PoggQLJn0")
          //push the table cards to player hand
          player.cards.push(...table)
          //empty the table
          updatetable([])

          io.emit("logs", player.name + " is lying he played " + card.value + " as " + lastPlayedCard.as + " All cards is going to him")
          checkTaksir(connectedPlayers, socket, io);
          jarya(connectedPlayers, io)
          io.emit("update-table", table)
          let socketPlayer = connectedPlayers.find((p) => p.player_id == socket.id)
          io.to(socket.id).emit("yourTurn")
          updatecurrentPlayer(socketPlayer) 
          connectedPlayers.map((p) => {
            if (p.player_id != socket.id) {
              io.to(p.player_id).emit("removeTurn")
            }
          })
          io.emit("whoplaying", currentPlayer.name)

        } else {
          //ken tla3 mouch yekdheb:
          io.emit('jad3lik',"https://www.mboxdrive.com/jad3lik.mp3")
          let sada9 = connectedPlayers.find(player => player.player_id === player_id)

          io.to(sada9.player_id).emit("yourTurn")
          updatecurrentPlayer(sada9)
          connectedPlayers.map((p) => {
            if (p.player_id != sada9.player_id) {
              io.to(p.player_id).emit("removeTurn")
            }
          })
          if (sada9.cards.length == 0) {
            updatecurrentPlayer(moveTurnToTheNextPlayer(connectedPlayers, currentPlayer, io)) 
            io.emit("logs", "Player " + sada9.name + " Won")
            leaderBoard.push(sada9)
            io.emit('update-leaderBoard', leaderBoard)
            io.to(sada9.player_id).emit("update-win")
            updateconnectedPlayers(connectedPlayers.filter((p) => (p.player_id != sada9.player_id))) 
          }
          io.emit("whoplaying", currentPlayer.name)
          //push the table cards to the socket.id player hand
          let player = connectedPlayers.find(player => player.player_id === socket.id)
          player.cards.push(...table)
          io.emit("logs", "All cards is going to " + player.name)
          //empty the table
          updatetable([])
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
        updatetable([])
        socket.emit("update-table", table)
      })
      socket.on('addplayer', player => {
        connectedPlayers.push({ id: 1, name: player, cards: [], player_id: socket.id })
        io.emit('update-player', connectedPlayers)
        if (connectedPlayers.length == 4) {
           updatecurrentPlayer(startTheGameMainFunction(socket, io, connectedPlayers, currentPlayer)) 


        }

        //emit to players their turn to play
        //while all players have cards

      })
      socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
        //get player from the connectedPlayers
        if (!connectedPlayers.map((p)=>p.player_id).includes(socket.id)){
          return 
        }
        try {
          let player = connectedPlayers.find(player => player.player_id === socket.id)
          io.emit('close-game', player.name + " disconnected")
        } catch (e) {
          console.log(e)
        }
        //delete player from connected players
        connectedPlayers = connectedPlayers.filter(player => player.player_id !== socket.id)
        io.emit('update-player', connectedPlayers)
        updatetable([])
        connectedPlayers.map((player) => {
          socket.disconnect(player.player_id)
        })
        updateconnectedPlayers([])
      });
    })
  }
  res.end()
}

export default SocketHandler