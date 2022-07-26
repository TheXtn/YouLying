import { Server } from "socket.io";
import {
  cards,
  checkTaksir,
  jarya,
  moveTurnToTheNextPlayer,
  startTheGameMainFunction,
  connectedPlayers,
  currentPlayer,
  table,
  leaderBoard,
  updatecurrentPlayer,
  updatetable,
  updateleaderBoard,
  updateconnectedPlayers,
  rooms,
  allPlayers,
} from "../../helper/tekdheb";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      socket.on("playingTurn", (Cardstoplay, id, selected) => {
        //loop throuch cardstoplay
        // get room name from player in allPlayers with current socket id
        const { roomName } = allPlayers.find(
          (player) => player.player_id === socket.id
        );
        let selectedRoom = rooms.find((room) => room.name === roomName);
        Cardstoplay.forEach((carta) => {
          let card = selectedRoom.cards.find((item) => item.id == carta);
          card.as = selected;
          card.player_id = socket.id;
          card.player_name = id;
          selectedRoom.table.push(card);
          //remove card from player hand
          let p = selectedRoom.players.find(
            (item) => item.player_id == socket.id
          );
          p.cards = p.cards.filter((item) => item.id != carta);
        });

        /* table.push({ id: id, val: card.value, selected: selected }) */
        io.to(selectedRoom.name).emit("update-table", selectedRoom.table);
        //remove the card from player hand
        let player = selectedRoom.players.find(
          (player) => player.player_id === socket.id
        );
        checkTaksir(selectedRoom.players, socket);
        jarya(selectedRoom.players, io);
        io.to(socket.id).emit("update-hand", player.cards);
        updatecurrentPlayer(
          moveTurnToTheNextPlayer(
            selectedRoom.players,
            selectedRoom.currentPlayer,
            io
          ),
          selectedRoom.name
        );
        io.to(selectedRoom.name).emit(
          "whoplaying",
          selectedRoom.currentPlayer.name
        );
      });

      socket.on("ittihem", (card) => {
        //stop the function if the table is empty
        const selectedPlayer = allPlayers.find(
          (player) => player.player_id === socket.id
        );
        const selectedRoom = rooms.find(
          (room) => room.name === selectedPlayer.roomName
        );
        if (selectedRoom.table.length === 0) {
          return;
        }
        //get the last card in table
        let lastPlayedCard = selectedRoom.table[selectedRoom.table.length - 1];
        //get the player who played the last card from the table
        let player_id = lastPlayedCard.player_id;

        //loop the played cards backwards and get all the card played by the last player until you find a card not played by the last player
        let playedcards = [];
        for (let i = selectedRoom.table.length - 1; i >= 0; i--) {
          if (selectedRoom.table[i].player_id === player_id) {
            playedcards.push(selectedRoom.table[i]);
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
          io.to(socket.id).emit("logs", "You can't accuse yourself");
          return;
        }

        var player = selectedRoom.players.find(
          (player) => player.player_id === player_id
        );

        if (allEqual == false) {
          //kenou tla3 berrasmi yekdheb:
          io.to(selectedRoom.name).emit(
            "jad3lik",
            "https://audio.jukehost.co.uk/C269dCXnfM0KmdwrqusnwW7PoggQLJn0"
          );
          //push the table cards to player hand
          player.cards.push(...selectedRoom.table);
          //empty the table
          updatetable([], selectedRoom.name);

          io.to(selectedRoom.name).emit(
            "logs",
            player.name +
              " is lying he played " +
              card.value +
              " as " +
              lastPlayedCard.as +
              " All cards are going to him"
          );
          checkTaksir(selectedRoom.players, socket, io);
          jarya(selectedRoom.players, io);
          io.to(selectedRoom.name).emit("update-table", selectedRoom.table);
          let socketPlayer = selectedRoom.players.find(
            (p) => p.player_id == socket.id
          );
          io.to(socket.id).emit("yourTurn");
          updatecurrentPlayer(socketPlayer, selectedRoom.name);
          selectedRoom.players.map((p) => {
            if (p.player_id != socket.id) {
              io.to(p.player_id).emit("removeTurn");
            }
          });
          io.to(selectedRoom.name).emit(
            "whoplaying",
            selectedRoom.currentPlayer.name
          );
        } else {
          //ken tla3 mouch yekdheb:
          io.to(selectedRoom.name).emit(
            "jad3lik",
            "https://www.mboxdrive.com/jad3lik.mp3"
          );
          let sada9 = selectedRoom.players.find(
            (player) => player.player_id === player_id
          );

          io.to(sada9.player_id).emit("yourTurn");
          updatecurrentPlayer(sada9, selectedRoom.name);
          selectedRoom.players.map((p) => {
            if (p.player_id != sada9.player_id) {
              io.to(p.player_id).emit("removeTurn");
            }
          });
          if (sada9.cards.length == 0) {
            updatecurrentPlayer(
              moveTurnToTheNextPlayer(
                selectedRoom.players,
                selectedRoom.currentPlayer,
                io
              ),
              selectedRoom.name
            );
            io.to(selectedRoom.name).emit(
              "logs",
              "Player " + sada9.name + " Won"
            );
            leaderBoard.push(sada9);
            io.to(selectedRoom.name).emit("update-leaderBoard", leaderBoard);
            io.to(sada9.player_id).emit("update-win");
            updateconnectedPlayers(
              selectedRoom.players.filter((p) => p.player_id != sada9.player_id)
            );
          }
          io.to(selectedRoom.name).emit(
            "whoplaying",
            selectedRoom.currentPlayer.name
          );
          //push the table cards to the socket.id player hand
          let player = selectedRoom.players.find(
            (player) => player.player_id === socket.id
          );
          player.cards.push(...selectedRoom.table);
          io.to(selectedRoom.name).emit(
            "logs",
            "All cards are going to " + player.name
          );
          //empty the table
          updatetable([], selectedRoom.name);
          checkTaksir(selectedRoom.players, socket, io);
          jarya(selectedRoom.players, io);
          io.to(selectedRoom.name).emit("update-table", selectedRoom.table);
        }
      });
      // not working
      socket.on("lying", (item, id) => {
        connectedPlayers.map((player) => {
          if (player.name == item.id) {
            player.cards.push({ id: 9999, suit: item.suit, value: item.val });
            io.to(player.player_id).emit("jaryaV2", player.cards);
          }
        });
        updatetable([]);
        socket.emit("update-table", selectedRoom.table);
      });
      socket.on("addplayer", (data) => {
        let player = {
          id: 1,
          name: data.player,
          cards: [],
          player_id: socket.id,
          roomName: data.roomName,
        };

        rooms.find((room) => room.name == data.roomName).players.push(player);
        let selectedRoom = rooms.find((room) => room.name == data.roomName);
        allPlayers.push(player);
        socket.join(data.roomName);

        io.to(data.roomName).emit("update-player", selectedRoom.players);
        if (selectedRoom.players.length == parseInt(req.query.roomID) ) {
          updatecurrentPlayer(
            startTheGameMainFunction(
              socket,
              io,
              selectedRoom.players,
              currentPlayer
            ),
            selectedRoom.name
          );
        }

        //emit to players their turn to play
        //while all players have cards
      });
      socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        //get player from the connectedPlayers
        if (!allPlayers.map((p) => p.player_id).includes(socket.id)) {
          return;
        }

        let player = allPlayers.find(
          (player) => player.player_id === socket.id
        );
        io.to(player.roomName).emit(
          "close-game",
          player.name + " disconnected"
        );

        //delete player from connected players
        updateconnectedPlayers(
          allPlayers.filter((player) => player.player_id !== socket.id),
          player.roomName
        );
        io.to(player.roomName).emit("update-player", allPlayers);
        updatetable([], player.roomName);
        allPlayers.map((player) => {
          socket.disconnect(player.player_id);
        });
        updateconnectedPlayers([], player.roomName);
      });
    });
  }
  res.end();
};

export default SocketHandler;
