/*Base
Requirements
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

/*
Welcome Player 1.
You rolled 3 for Dice 1 and 6 for Dice 2.
Choose the order of the dice.

Player 1, you chose Dice 2 first.
Your number is 63.
It is now Player 2's turn.
*/

//game mode
var modeDiceRoll = "mode1";
var modeDiceOrder = "mode2";
//default game mode
var gameMode = modeDiceRoll;
// players
var playerOne = 1;
var playerTwo = 2;
// arrays to store dice rolls
var playerOneDice = [];
var playerTwoDice = [];
// player dice order
var playerOneOrder = "";
var playerTwoOrder = "";
// random dice roll function
var generateRandomDice = function () {
  var randomDiceRoll = Math.floor(Math.random() * 6) + 1;
  return randomDiceRoll;
};
// default player = 1
var currentPlayer = playerOne;

var storeDiceRolls = function () {
  var diceRolls = [generateRandomDice(), generateRandomDice()];

  if (currentPlayer == playerOne) {
    playerOneDice = diceRolls;
    console.log("player1 " + diceRolls);
  } else {
    playerTwoDice = diceRolls;
    console.log("player2 " + diceRolls);
  }
  return diceRolls;
};

var main = function (input) {
  var myOutputValue = "";
  var diceArray = "";
  // var myOutputValue = "";
  var winner = "";

  //player inputs dice order
  if (gameMode == modeDiceOrder && input == 2 && currentPlayer == playerTwo) {
    diceArray = playerTwoDice;
    playerTwoOrder = Number(String(diceArray[1]) + String(diceArray[0]));
    myOutputValue = `Player Two! Your number is ${playerTwoOrder}`;
  } else if (
    gameMode == modeDiceOrder &&
    input == 2 &&
    currentPlayer == playerOne
  ) {
    diceArray = playerOneDice;
    playerOneOrder = Number(String(diceArray[1]) + String(diceArray[0]));
    myOutputValue = `Player One! Your number is ${playerOneOrder}`;
  }
  if (gameMode == modeDiceOrder && input == 1 && currentPlayer == playerTwo) {
    diceArray = playerTwoDice;
    playerTwoOrder = Number(String(diceArray[0]) + String(diceArray[1]));
    myOutputValue = `Player Two! Your number is ${playerTwoOrder}`;
  } else if (
    gameMode == modeDiceOrder &&
    input == 1 &&
    currentPlayer == playerOne
  ) {
    diceArray = playerOneDice;
    playerOneOrder = Number(String(diceArray[0]) + String(diceArray[1]));
    myOutputValue = `Player One! Your number is ${playerOneOrder}`;
  }

  if (gameMode == modeDiceRoll && input == 2) {
    //player inputs player's number
    currentPlayer = playerTwo;
    gameMode = modeDiceOrder;
    myOutputValue = `Hello Player Two! <br> Your Dice Rolls are ${storeDiceRolls()} <br> Choose your dice order: <br> 1 for First dice goes first <br> 2 for Second dice goes first `;
  } else if (gameMode == modeDiceRoll && input == 1) {
    gameMode = modeDiceOrder;
    myOutputValue = `Hello Player One! <br> Your Dice Rolls are ${storeDiceRolls()} <br> Choose your dice order: <br> 1 for First dice goes first <br> 2 for Second dice goes first`;
  } else if (gameMode == modeDiceRoll && input == "") {
    myOutputValue = `Welcome to Beat That! <br> Type 1 for Player One <br> Type 2 for Player Two`;
  }
  // } else {
  //   myOutputValue = `Error! PLease Try Again! <br> Type 1 for Player One <br> Type 2 for Player Two `;
  // }

  //determine winner
  if (
    playerOneOrder != 0 &&
    playerTwoOrder != 0 &&
    playerOneOrder > playerTwoOrder
  ) {
    winner = playerOne;
    myOutputValue = `Player One Wins the game! <br> Player One's number: ${playerOneOrder} > Player Two's ${playerTwoOrder}`;
    gameMode = modeDiceRoll;
  }
  if (
    playerOneOrder != 0 &&
    playerTwoOrder != 0 &&
    playerTwoOrder > playerOneOrder
  ) {
    winner = playerTwo;
    myOutputValue = `Player Two Wins the game! <br> Player One's number: ${playerOneOrder} > Player Two's ${playerTwoOrder}`;
    gameMode = modeDiceRoll;
  }
  return myOutputValue;
};
