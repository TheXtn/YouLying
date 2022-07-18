import { Server } from 'Socket.IO'
const cards = [
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
const connectedPlayers=[]
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
        socket.broadcast.emit('update-player', connectedPlayers)
        socket.on('addplayer', player => {
        connectedPlayers.push({ id: 1, name: player, cards: [] })
        if (connectedPlayers.length==4){
            getCards(connectedPlayers);
        console.log(connectedPlayers)
        socket.broadcast.emit('jarya', connectedPlayers)
        }
        
        socket.broadcast.emit('update-player', connectedPlayers)
      })
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    })
  }
  res.end()
}

export default SocketHandler