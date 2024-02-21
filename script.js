var maxNumber = 21;
var dealerHitThreshold = 16;
var playerStand = false;
var gameOver = false;

var playerHand = [];
var computerHand = [];

function makeDeck() {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      deck.push(card);
      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
}

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}
function shuffleCards(cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
}

var deck = shuffleCards(makeDeck());

function dealHand(hand) {
  hand.push(deck.pop());
}

function sumOfCards(hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    if (currCard.rank === 1) {
      numAcesInHand++;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
    counter++;
  }
  if (sum > maxNumber && numAcesInHand > 0) {
    var numOfAces = 0;
    while (numOfAces < numAcesInHand) {
      sum -= 10;
      if (sum <= maxNumber) {
        break;
      }
      numOfAces += 1;
    }
  }
  return sum;
}

function checkBlackjack(hand) {
  return hand.length === 2 && sumOfCards(hand) === maxNumber;
}
function handToString(hand) {
  var cards = "";
  var handIndex = 0;
  while (handIndex < hand.length) {
    cards = cards + ", " + hand[handIndex].name;
    handIndex += 1;
  }
  return cards;
}
function getDefaultOutput() {
  return `You have: ${handToString(playerHand)} with the sum ${sumOfCards(
    playerHand
  )}. <br>
    Computer has:(${handToString(computerHand)}) with sum (${sumOfCards(
    computerHand
  )}).`;
}

function main(input) {
  if (gameOver) {
    return "The game is over. Please refresh to play again.";
  }
  if (playerHand.length === 0) {
    // First card for both the player and the computer
    dealHand(playerHand);
    dealHand(computerHand);
    // Second card for the player and the computer
    dealHand(playerHand);
    dealHand(computerHand);
    if (checkBlackjack(computerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
        Computer has Blackjack. There's always a next time 😔.`;
    }
    if (checkBlackjack(playerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
        You have Blackjack. Flawless victory!!😎😎.`;
    }
    return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand" to go ahead`;
  }
  if (!playerStand) {
    if (input !== "hit" && input !== "stand") {
      return 'Please type either "hit" or "stand" to play.';
    }
    if (input === "hit") {
      dealHand(playerHand);
      if (sumOfCards(playerHand) > maxNumber) {
        gameOver = true;
        return `${getDefaultOutput()} <br>
          You have lost. You can always try again.`;
      }
    }
    if (input === "stand") {
      playerStand = true;
    }
  }
  var computerSum = sumOfCards(computerHand);
  if (computerSum <= dealerHitThreshold) {
    dealHand(computerHand);
    computerSum = sumOfCards(computerHand);
    if (computerSum > maxNumber) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
      Computer has lost. Refresh for a new game.`;
    }
  }
  if (playerStand && computerSum > dealerHitThreshold) {
    gameOver = true;
    if (sumOfCards(playerHand) > computerSum) {
      return `${getDefaultOutput()} <br>
        Player wins! Keep playing 💪.`;
    }
    return `${getDefaultOutput()} <br>
      Computer wins! Never mind 😭.`;
  }
  return `${getDefaultOutput()} <br>
    Press Submit to see Computer's next move.`;
}

/*
SPS GAME PROJECT---------------------------------------------------------------
var scissors = "scissors";
var paper = "paper";
var stone = "stone";
var count = 0;
function compPlays() {
  var randomNumber = Math.floor(Math.random() * 3);

  if (randomNumber == 0) {
    console.log(scissors);
    return scissors;
  }

  if (randomNumber == 1) {
    console.log(paper);
    return paper;
  }

  if (randomNumber == 2) {
    console.log(stone);
    return stone;
  }
}

function playerWins(playerInput, compInput) {
  return (
    (playerInput == scissors && compInput == paper) ||
    (playerInput == paper && compInput == stone) ||
    (playerInput == stone && compInput == scissors)
  );
}

function drawGame(playerInput, compInput) {
  return playerInput == compInput;
}

function main(input) {
  if (input != scissors && input != paper && input != stone) {
    console.log(input + " is an error input.");
    return "Wrong input. Please use 'scissors', 'paper' or 'stone'.";
  }

  var playerInput = input.toLowerCase();
  var compInput = compPlays();
  var myOutputValue =
    "The computer played " + compInput + " You played " + playerInput;

  if (playerWins(playerInput, compInput)) {
    console.log("Player win");
    count++;
    return myOutputValue + " You Win. Your score is " + count;
  }

  if (drawGame(playerInput, compInput)) {
    console.log("Draw");
    return myOutputValue + " Its a Draw Game. Play again";
  }

  return myOutputValue + " You Lost. Try again.";
}
*/
