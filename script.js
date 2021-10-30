// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

var currentGameMode = "Waiting for players..";
console.log(currentGameMode);

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 1;

// keeping track of each player's chosen numbers
var playerOneNumber;
var playerTwoNumber;

// helper functions
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1; // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  return diceNumber;
};

var generateDiceOrder = function () {
  var diceOrder = Math.ceil() * 2; // Add 1 to get valid dice order from 1 to 2 inclusive
  return diceOrder;
};

var main = function (input) {
  var myOutputValue = `Choose 1 or 2 for the order only!`;

  if (currentGameMode == "Waiting for players..") {
    // switch the mode

    playerOneDiceRoll = [diceRoll(), diceRoll()];
    console.log("dice number for player one", playerOneDiceRoll);

    currentGameMode = "Player 1 has rolled the dice";
    console.log(currentGameMode);

    return `Welcome Player 1! You rolled ${playerOneDiceRoll[0]} for Dice 1 and ${playerOneDiceRoll[1]} for Dice 2. Choose the order of the dice.`;
  } else if (currentGameMode == "Player 1 has rolled the dice") {
    if (input == 1) {
      console.log("player 1 dice order", input);
      currentGameMode = "Player 1 has chosen dice order. Player 2 next";
      console.log(currentGameMode);
      return `You have chosen Dice 1 to go first. Your number is ${playerOneDiceRoll[0]}${playerOneDiceRoll[1]}. Now is Player 2's turn!`;
    }
    if (input == 2) {
      console.log("player 1 dice order", input);
      currentGameMode = "Player 1 has chosen dice order. Player 2 next";
      console.log(currentGameMode);

      return `You have chosen Dice 2 to go first. Your number is ${playerOneDiceRoll[1]}${playerOneDiceRoll[0]}. Now is Player 2's turn!`;
    }
  }

  if (currentGameMode == "Player 1 has chosen dice order. Player 2 next") {
    playerTwoDiceRoll = [diceRoll(), diceRoll()];
    console.log("dice number for player two", playerTwoDiceRoll);
    currentGameMode = "Player 2 has rolled the dice!";
    console.log(currentGameMode);

    return `Welcome Player 2! You rolled ${playerTwoDiceRoll[0]} for Dice 1 and ${playerTwoDiceRoll[1]} for Dice 2. Choose the order of the dice.`;
  } else if (currentGameMode == "Player 2 has rolled the dice!") {
    if (input == 1) {
      console.log("player 2 dice order", input);
      currentGameMode = "Player 2 has chosen dice order";

      console.log(currentGameMode);
      return `You have chosen Dice 1 to go first. Your number is ${playerTwoDiceRoll[0]}${playerTwoDiceRoll[1]}.`;
    }

    if (input == 2) {
      currentGameMode = "Player 2 has chosen dice order";
      console.log("player 2 dice order", input);
      return `You have chosen Dice 2 to go first. Your number is ${playerTwoDiceRoll[1]}${playerTwoDiceRoll[0]}.`;
    }
  }

  return myOutputValue;
};
