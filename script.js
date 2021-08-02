//game mode
var diceRollMode = "dice rolling!";
var diceOrderMode = "choose the order of dice";
var beatThatWinner = "comparing the numbers";
//default game mode
var gameMode = diceRollMode;
// players
var player1 = "Player 1";
var player2 = "Player 2";
var activePlayer = player1;
// arrays to store dice rolls
var player1Dice = [];
var player2Dice = [];
// player dice order
var player1Order;
var player2Order;
//win counter
var playerOneWin = 0;
var playerTwoWin = 0;

// random Dice Roll function
var diceRoll = function () {
  var diceRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
};

// storing dice into arrays
var dicePush = function () {
  var dicePush = [diceRoll(), diceRoll()];

  if (activePlayer == player1 && gameMode == diceRollMode) {
    player1Dice = dicePush;
    console.log("player1 " + dicePush);
  } else if (activePlayer == player2) {
    player2Dice = dicePush;
    console.log("player2 " + dicePush);
  }
  return dicePush;
};

var diceOrder = function (input) {
  var input = Number(input);
  var diceArray;
  var playerOrder;
  if (activePlayer == player1) {
    diceArray = player1Dice;
  } else if (activePlayer == player2) {
    diceArray = player2Dice;
  }
  //player inputs dice order
  if (input == 1) {
    playerOrder = Number(String(diceArray[0]) + String(diceArray[1]));
  } else if (input == 2) {
    playerOrder = Number(String(diceArray[1]) + String(diceArray[0]));
  }
  if (activePlayer == player1) {
    playerOneOrder = playerOrder;
    console.log("player one " + playerOneOrder);
  } else {
    playerTwoOrder = playerOrder;
    console.log("player two " + playerTwoOrder);
  }
  return `${activePlayer} Your number is ${playerOrder}`;
};

var main = function (input) {
  if (gameMode == diceRollMode) {
    var gameDiceRoll = dicePush();
    gameMode = diceOrderMode;
    return `Hello ${activePlayer}! <br> <br> Your Dice Rolls are ${gameDiceRoll} <br> <br> Choose your dice order: <br> Pick 1 for First dice goes first <br> Pick 2 for Second dice goes first `;
  }
  if (gameMode == diceOrderMode) {
    var gameDiceOrder = diceOrder(input);
    if (activePlayer == player1) {
      activePlayer = player2;
      gameMode = diceRollMode;
      return `${gameDiceOrder} <br> Press submit to roll Player Two's Dice`;
    } else {
      gameMode = beatThatWinner;
      return `${gameDiceOrder} <br> Press submit for the result`;
    }
  }
  //determine winner
  if (gameMode == beatThatWinner) {
    gameMode = diceRollMode;
    activePlayer = player1;
    if (
      playerOneOrder != 0 &&
      playerTwoOrder != 0 &&
      playerOneOrder > playerTwoOrder
    ) {
      playerOneWin += 1;
      return `Player One Wins the game! <br> Player One's ${playerOneOrder} > Player Two's ${playerTwoOrder} <br><br> Current Score: <br> PlayerOne: ${playerOneWin} <br> vs <br> PlayerTwo: ${playerTwoWin}`;
    }
    if (
      playerOneOrder != 0 &&
      playerTwoOrder != 0 &&
      playerTwoOrder > playerOneOrder
    ) {
      playerTwoWin += 1;
      return `Player Two Wins the game! <br> Player Two's ${playerTwoOrder} > Player One's ${playerOneOrder} <br><br> Current Score: <br> PlayerOne: ${playerOneWin} <br> vs <br> PlayerTwo: ${playerTwoWin}`;
    }
  }
};