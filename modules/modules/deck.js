//
////////// КОЛОДА
//
const VALUES = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['h', 'd', 's', 'c'];
const DECK = {};

for (let i = 0; i < VALUES.length; i++) {
  for (let j = 0; j < SUITS.length; j++) {
    let card = VALUES[i] + SUITS[j];
    DECK[card] = {
      value:   VALUES[i],
      suit:    SUITS[j],
      indexV:  14 - i,
      indexD:  1 + i * SUITS.length + j,
      suitPic: SUITS[j] === 'h' ? '♥' : SUITS[j] === 'd' ? '♦' : SUITS[j] === 's' ? '♠' : '♣',
      suitName: SUITS[j] === 'h' ? 'Hearts' : SUITS[j] === 'd' ? 'Diamonds' : SUITS[j] === 's' ? 'Spades' : 'Clubs'
    };
  }
}
export {DECK, VALUES, SUITS}