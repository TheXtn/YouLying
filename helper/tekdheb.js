// array of played cards in the middle
export var cards = [
  { id: 1, suit: "hearts", value: "1", name: "A" },
  { id: 2, suit: "hearts", value: "2", name: "2" },
  { id: 3, suit: "hearts", value: "3", name: "3" },
  { id: 4, suit: "hearts", value: "4", name: "4" },
  { id: 5, suit: "hearts", value: "5", name: "5" },
  { id: 6, suit: "hearts", value: "6", name: "6" },
  { id: 7, suit: "hearts", value: "7", name: "7" },
  { id: 8, suit: "hearts", value: "8", name: "8" },
  { id: 9, suit: "hearts", value: "9", name: "9" },
  { id: 10, suit: "hearts", value: "10", name: "10" },
  { id: 11, suit: "hearts", value: "11", name: "J" },
  { id: 12, suit: "hearts", value: "12", name: "Q" },
  { id: 13, suit: "hearts", value: "13", name: "K" },
  { id: 14, suit: "spades", value: "1", name: "A" },
  { id: 15, suit: "spades", value: "2", name: "2" },
  { id: 16, suit: "spades", value: "3", name: "3" },
  { id: 17, suit: "spades", value: "4", name: "4" },
  { id: 18, suit: "spades", value: "5", name: "5" },
  { id: 19, suit: "spades", value: "6", name: "6" },
  { id: 20, suit: "spades", value: "7", name: "7" },
  { id: 21, suit: "spades", value: "8", name: "8" },
  { id: 22, suit: "spades", value: "9", name: "9" },
  { id: 23, suit: "spades", value: "10", name: "10" },
  { id: 24, suit: "spades", value: "11", name: "J" },
  { id: 25, suit: "spades", value: "12", name: "Q" },
  { id: 26, suit: "spades", value: "13", name: "K" },
  { id: 27, suit: "clubs", value: "1", name: "A" },
  { id: 28, suit: "clubs", value: "2", name: "2" },
  { id: 29, suit: "clubs", value: "3", name: "3" },
  { id: 30, suit: "clubs", value: "4", name: "4" },
  { id: 31, suit: "clubs", value: "5", name: "5" },
  { id: 32, suit: "clubs", value: "6", name: "6" },
  { id: 33, suit: "clubs", value: "7", name: "7" },
  { id: 34, suit: "clubs", value: "8", name: "8" },
  { id: 35, suit: "clubs", value: "9", name: "9" },
  { id: 36, suit: "clubs", value: "10", name: "10" },
  { id: 37, suit: "clubs", value: "11", name: "J" },
  { id: 38, suit: "clubs", value: "12", name: "Q" },
  { id: 39, suit: "clubs", value: "13", name: "K" },
  { id: 40, suit: "diamonds", value: "1", name: "A" },
  { id: 41, suit: "diamonds", value: "2", name: "2" },
  { id: 42, suit: "diamonds", value: "3", name: "3" },
  { id: 43, suit: "diamonds", value: "4", name: "4" },
  { id: 44, suit: "diamonds", value: "5", name: "5" },
  { id: 45, suit: "diamonds", value: "6", name: "6" },
  { id: 46, suit: "diamonds", value: "7", name: "7" },
  { id: 47, suit: "diamonds", value: "8", name: "8" },
  { id: 48, suit: "diamonds", value: "9", name: "9" },
  { id: 49, suit: "diamonds", value: "10", name: "10" },

  { id: 50, suit: "diamonds", value: "11", name: "J" },
  { id: 51, suit: "diamonds", value: "12", name: "Q" },
  { id: 52, suit: "diamonds", value: "13", name: "K" },
];
export let rooms = [
  {
    id: 1,
    name: "Room 1",
    cards: [...cards],
    players: [],
    brokenCards: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:4
  },
  {
    id: 2,
    name: "Room 2",
    cards: [...cards],
    brokenCards: [],
    players: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:3
  },
  {
    id: 3,
    name: "Room 3",
    cards: [...cards],
    brokenCards: [],
    players: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:2
  },
  {
    id: 4,
    name: "Room 4",
    cards: [...cards],
    brokenCards: [],
    players: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:5
  },
  {
    id: 5,
    name: "Room 5",
    cards: [...cards],
    brokenCards: [],
    players: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:6
  },
  {
    id: 6,
    name: "Room 6",
    cards: [...cards],
    brokenCards: [],
    players: [],
    table: [],
    leaderBoard: [],
    currentPlayer: null,
    requiredPlayers:7
  },
];
export let allPlayers = [];

// ?done
export function updatecurrentPlayer(newPlayer, roomName) {
  rooms.find((room) => room.name === roomName).currentPlayer = newPlayer;
}
// ?done
export function updatetable(newtable, roomName) {
  rooms.find((room) => room.name === roomName).table = newtable;
}
// ?done
export function updateleaderBoard(newleaderBoard, roomName) {
  rooms.find((room) => room.name === roomName).leaderBoard = newleaderBoard;
}
// ?done
export function updateconnectedPlayers(newconnectedPlayers, roomName) {
  rooms.find((room) => room.name === roomName).players = newconnectedPlayers;
}
// ?done
function updateCards(newCards, roomName) {
  rooms.find((room) => room.name === roomName).cards = newCards;
}
//  ? doneeeeeeeeeeeeeeeeeeeee
function getRandomCard(roomName) {
  let selectedRoom = rooms.find((room) => room.name === roomName);
  const randomCard =
    selectedRoom.cards[Math.floor(Math.random() * selectedRoom.cards.length)];
  selectedRoom.cards.splice(selectedRoom.cards.indexOf(randomCard), 1);
  return randomCard;
}
//  ? doneeeeeeeeeeeeeeeeeeeee
function getCards(players) {
  const selectedRoom = rooms.find((room) => room.name === players[0].roomName);
  while (selectedRoom.cards.length > 0) {
    players.forEach((player) => {
      const card = getRandomCard(player.roomName);
      if (card) {
        player.cards.push(card);
      }
    });
  }
  updateCards(
    [
      { id: 1, suit: "hearts", value: "1", name: "A" },
      { id: 2, suit: "hearts", value: "2", name: "2" },
      { id: 3, suit: "hearts", value: "3", name: "3" },
      { id: 4, suit: "hearts", value: "4", name: "4" },
      { id: 5, suit: "hearts", value: "5", name: "5" },
      { id: 6, suit: "hearts", value: "6", name: "6" },
      { id: 7, suit: "hearts", value: "7", name: "7" },
      { id: 8, suit: "hearts", value: "8", name: "8" },
      { id: 9, suit: "hearts", value: "9", name: "9" },
      { id: 10, suit: "hearts", value: "10", name: "10" },
      { id: 11, suit: "hearts", value: "11", name: "J" },
      { id: 12, suit: "hearts", value: "12", name: "Q" },
      { id: 13, suit: "hearts", value: "13", name: "K" },
      { id: 14, suit: "spades", value: "1", name: "A" },
      { id: 15, suit: "spades", value: "2", name: "2" },
      { id: 16, suit: "spades", value: "3", name: "3" },
      { id: 17, suit: "spades", value: "4", name: "4" },
      { id: 18, suit: "spades", value: "5", name: "5" },
      { id: 19, suit: "spades", value: "6", name: "6" },
      { id: 20, suit: "spades", value: "7", name: "7" },
      { id: 21, suit: "spades", value: "8", name: "8" },
      { id: 22, suit: "spades", value: "9", name: "9" },
      { id: 23, suit: "spades", value: "10", name: "10" },
      { id: 24, suit: "spades", value: "11", name: "J" },
      { id: 25, suit: "spades", value: "12", name: "Q" },
      { id: 26, suit: "spades", value: "13", name: "K" },
      { id: 27, suit: "clubs", value: "1", name: "A" },
      { id: 28, suit: "clubs", value: "2", name: "2" },
      { id: 29, suit: "clubs", value: "3", name: "3" },
      { id: 30, suit: "clubs", value: "4", name: "4" },
      { id: 31, suit: "clubs", value: "5", name: "5" },
      { id: 32, suit: "clubs", value: "6", name: "6" },
      { id: 33, suit: "clubs", value: "7", name: "7" },
      { id: 34, suit: "clubs", value: "8", name: "8" },
      { id: 35, suit: "clubs", value: "9", name: "9" },
      { id: 36, suit: "clubs", value: "10", name: "10" },
      { id: 37, suit: "clubs", value: "11", name: "J" },
      { id: 38, suit: "clubs", value: "12", name: "Q" },
      { id: 39, suit: "clubs", value: "13", name: "K" },
      { id: 40, suit: "diamonds", value: "1", name: "A" },
      { id: 41, suit: "diamonds", value: "2", name: "2" },
      { id: 42, suit: "diamonds", value: "3", name: "3" },
      { id: 43, suit: "diamonds", value: "4", name: "4" },
      { id: 44, suit: "diamonds", value: "5", name: "5" },
      { id: 45, suit: "diamonds", value: "6", name: "6" },
      { id: 46, suit: "diamonds", value: "7", name: "7" },
      { id: 47, suit: "diamonds", value: "8", name: "8" },
      { id: 48, suit: "diamonds", value: "9", name: "9" },
      { id: 49, suit: "diamonds", value: "10", name: "10" },
      { id: 50, suit: "diamonds", value: "11", name: "J" },
      { id: 51, suit: "diamonds", value: "12", name: "Q" },
      { id: 52, suit: "diamonds", value: "13", name: "K" },
    ],
    players[0].roomName
  );
}
function sortCards(players) {
  players.forEach((player) => {
    player.cards.sort((a, b) => a.value - b.value);
  });
}
// ? Doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
export function checkTaksir(players, socket, io) {
  let selectedRoom=rooms.find((r)=>r.name==players[0].roomName)
  const { roomName } = players[0];
  sortCards(players);
  players.forEach((player) => {
    let cards = player.cards;
    let sameCardsNumber = 0;
    cards.forEach((card, index) => {
      if (cards[index + 1] && card.value === cards[index + 1].value) {
        sameCardsNumber++;
      } else {
        sameCardsNumber = 0;
      }
      if (sameCardsNumber === 3) {
       
        io.to(roomName).emit(
          "taksir",
          `${card.value} Tkasrou by ${player.name}`
        );
        const sameCards = player.cards.splice(index - 2, 4);
        sameCards.forEach((card) => {
          card.player = player.name;
          selectedRoom.brokenCards.push(card);
        });
        sameCardsNumber = 0;
      }
    });
  });
}
// ? Doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
export function jarya(players, io) {
  const { roomName } = players[0];
  players.forEach((player) => {
    io.to(player.player_id).emit("jaryaV2", player.cards);
  });
  io.to(roomName).emit("update-player", players);
}
export function moveTurnToTheNextPlayer(players, currentPlayer, io) {
  io.to(currentPlayer.player_id).emit("removeTurn");
  let nextPlayerIndex =
    players.findIndex(
      (player) => player.player_id === currentPlayer.player_id
    ) + 1;
  if (nextPlayerIndex === players.length) {
    nextPlayerIndex = 0;
  }
  let nextPlayer = players[nextPlayerIndex];
  io.to(nextPlayer.player_id).emit("yourTurn");
  io.to(nextPlayer.player_id).emit("logs", `${nextPlayer.name} is your turn`);
  currentPlayer = nextPlayer;
  if (currentPlayer.cards.length <= 0) {
    io.emit("logs", "Player " + currentPlayer.name + " Won !");
    io.to(currentPlayer.player_id).emit("update-win");
    io.to(currentPlayer.player_id).emit("removeTurn");
    let nextPlayerIndex =
      players.findIndex(
        (player) => player.player_id === currentPlayer.player_id
      ) + 1;
    if (nextPlayerIndex === players.length) {
      nextPlayerIndex = 0;
    }
    let nextPlayer = players[nextPlayerIndex];
    io.to(nextPlayer.player_id).emit("yourTurn");
    let old = currentPlayer;
    let selectedRoom=rooms.find((r)=>(r.name==old.roomName))
    selectedRoom.leaderBoard.push(old);
    io.emit("update-leaderBoard", selectedRoom.leaderBoard);
    currentPlayer = nextPlayer;
    selectedRoom.players = selectedRoom.players.filter(
      (item) => item.player_id != old.player_id
    );
    io.emit("update-player", selectedRoom.players);
  }
  return currentPlayer;
}
// ? Doneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
export function startTheGameMainFunction(
  socket,
  io,
  connectedPlayers,
  currentPlayer
) {
  const { roomName } = connectedPlayers[0];
  rooms.find((room) => room.name === roomName).table = [];
  rooms.find((room) => room.name === roomName).leaderBoard = [];

  getCards(connectedPlayers);
  sortCards(connectedPlayers);
  jarya(connectedPlayers, io);

  io.to(roomName).emit("logs", "Jarya Done");
  currentPlayer = connectedPlayers[0];

  setTimeout(() => {
    io.to(roomName).emit("start-game", connectedPlayers);
    checkTaksir(connectedPlayers, socket, io);
    jarya(connectedPlayers, io);
    io.to(currentPlayer.player_id).emit("yourTurn");
  }, 3000);

  io.to(roomName).emit("whoplaying", currentPlayer.name);

  return currentPlayer;
}
