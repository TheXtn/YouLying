console.clear();
//the array of cards
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

//the array of players
const players = [
    { id: 1, name: 'Player 1', cards: [] },
    { id: 2, name: 'Player 2', cards: [] },
];

// array of played cards in the middle
const playedCards = [];

//array of broken cards
const brokenCards = [];

//function to get a random card from the card stack and remove it 
function getRandomCard() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    cards.splice(cards.indexOf(randomCard), 1);
    return randomCard;
}

//taqsim l kwaret
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

//exectue get cards
getCards(players);



//function to show the cards of each player 
function showCards(players) {
    players.forEach(player => {
        console.log(`${player.name} has the following cards:`);
        player.cards.forEach(card => {
            console.log(`${card.value} of ${card.suit}`);
        });
    });
}
/* //execute show cards
showCards(players); */

//sort the players card by value
function sortCards(players) {
    players.forEach(player => {
        player.cards.sort((a, b) => a.value - b.value);
    });
}
//execute sort cards
sortCards(players);

//check for taksir
checkTaksir(players);

//execute show cards
showCards(players);

//check for taksir
function checkTaksir(players) {
    sortCards(players);
    players.forEach(player => {
        const cards = player.cards;
        sameCardsNumber = 0;
        cards.forEach((card, index) => {
            if (cards[index + 1] && card.value === cards[index + 1].value) {
                sameCardsNumber++;
            } else {
                sameCardsNumber = 0;
            }
            if (sameCardsNumber === 3) {
                console.log(`${player.name} has 4 the same card number that starts at index ${index - 2}`);
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

console.log(brokenCards)

//each player can choose a card to play from his cards array
function Play(players) {
    while (checkIfGameIsOver(players) === false) {
        players.forEach(player => {
            console.log(`${player.name} choose a card to play:`);
            //ask player to enter a card id until he enters a valid id that is in his cards array
            let cardId = null;
            while (!cardId || player.cards.find(card => card.id === cardId) === undefined) {
                cardId = parseInt(prompt(`${player.name} please enter a valid card id`));
            }
            //get the card from the player cards array by id and remove it from player cards array
            const card = player.cards.find(card => card.id === cardId);
            player.cards.splice(player.cards.indexOf(card), 1);

            //add the card to the played cards array
            playedCards.push(card);
        }
        );
    }
}
//player wins if he has no cards left in his cards array
function checkWinners(players) {
    players.forEach(player => {
        if (player.cards.length === 0) {
            console.log(`${player.name} wins`);
        }
    }
    );
}
//check if atleast 2 players have cards left in their cards array that returns or false
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
