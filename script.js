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
var modeDiceRoll = "Start";
var modeDiceOrder = "Userinput";
var modeGameWinnner = "Winner";
//default game mode
var gameMode = modeDiceRoll;
// players
var playerOne = "Player One";
var playerTwo = "Player Two";
// arrays to store dice rolls
var playerOneDice = [];
var playerTwoDice = [];
// player dice order
var playerOneOrder;
var playerTwoOrder;
//win counter
var playerOneWin = 0;
var playerTwoWin = 0;
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
  } else if (currentPlayer == playerTwo) {
    playerTwoDice = diceRolls;
    console.log("player2 " + diceRolls);
  }
  return diceRolls;
};

var diceOrder = function (userInput) {
  var playerInput = Number(userInput);
  var diceArray;
  var playerOrder;
  if (currentPlayer == playerOne) {
    diceArray = playerOneDice;
  } else if (currentPlayer == playerTwo) {
    diceArray = playerTwoDice;
  }
  //player inputs dice order
  if (playerInput == 1) {
    playerOrder = Number(String(diceArray[0]) + String(diceArray[1]));
  } else if (playerInput == 2) {
    playerOrder = Number(String(diceArray[1]) + String(diceArray[0]));
  }
  if (currentPlayer == playerOne) {
    playerOneOrder = playerOrder;
    console.log("player one " + playerOneOrder);
  } else {
    playerTwoOrder = playerOrder;
    console.log("player two " + playerTwoOrder);
  }
  return `${currentPlayer} Your number is ${playerOrder}`;
};

var main = function (input) {
  // var myOutputValue = "";
  var winner;
  if (gameMode == modeDiceRoll) {
    var gameDiceRoll = storeDiceRolls();
    gameMode = modeDiceOrder;
    return `Hello ${currentPlayer}! <br> Your Dice Rolls are ${gameDiceRoll} <br> Choose your dice order: <br> 1 for First dice goes first <br> 2 for Second dice goes first `;
  }
  if (gameMode == modeDiceOrder) {
    var gameDiceOrder = diceOrder(input);
    if (currentPlayer == playerOne) {
      currentPlayer = playerTwo;
      gameMode = modeDiceRoll;
      return `${gameDiceOrder} <br> Press submit to roll Player Two's Dice`;
    } else {
      gameMode = modeGameWinnner;
      return `${gameDiceOrder} <br> Press submit for the result`;
    }
  }
  //determine winner
  if (gameMode == modeGameWinnner) {
    gameMode = modeDiceRoll;
    currentPlayer = playerOne;
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
