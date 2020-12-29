// PLAYERS
var originalObjectArray = [
  {
    playerNumber: 1,
    combinedNum: 2,
  },
  {
    playerNumber: 2,
    combinedNum: 5,
  },
  {
    playerNumber: 3,
    combinedNum: 'waiting',
  },
];

var dynamicsort = function (property, order) {
  var sort_order = 1;
  if (order === 'descending') {
    sort_order = -1;
  }
  return function (a, b) {
    // if string put it at the top
    if (typeof a[property] === 'string') {
      return -1 * sort_order;
    }
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    }
    return 0 * sort_order;
  };
};

var statementLeaderBoard = function () {
  // Make a clone of originalObjectArray
  var cloneObjectArray = [];
  cloneObjectArray = [...originalObjectArray];
  cloneObjectArray = cloneObjectArray.sort(dynamicsort('combinedNum', 'descending'));
  return cloneObjectArray;
};

var cloneObjectArray = statementLeaderBoard();
// consolelog
console.log('originalObjectArray');
console.log(originalObjectArray);
console.log('cloneObjectArray');
console.log(cloneObjectArray);

// // Make a clone of originalObjectArray
// var cloneObjectArray = [];
// cloneObjectArray = [...originalObjectArray];
// // test if they affect each other
// cloneObjectArray.pop();
// // consolelog
// console.log('originalObjectArray');
// console.log(originalObjectArray);
// console.log('cloneObjectArray');
// console.log(cloneObjectArray);

var makeDeck = function () {
  // create the empty deck at the beginning
  deckOfCards = [];
  // Create Deck of cards with proper ranking
  // e.g. smallest card is ace if diamonds and largest card is king of spades
  var createCards = function (currentSuit, startRange) {
    var nameCounter = 1;
    var rankCounter = startRange;
    while (nameCounter <= 13) {
      var cardName = nameCounter;
      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // add the card to the deck
      deckOfCards.push(card);
      // increase counter
      nameCounter += 1;
      rankCounter += 1;
    }
  };
  // create cards
  // diamond ranks 1-13, clubs ranks 14-26, hearts ranks 27-39, spades ranks, 39-52
  createCards('diamonds', 1);
  createCards('clubs', 14);
  createCards('hearts', 27);
  createCards('spades', 39);
  return deckOfCards;
};
