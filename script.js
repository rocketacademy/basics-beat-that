var playerOneGuess = "";
var playerTwoGuess = "";
var diceRollOne = 0;
var diceRollTwo = 0;
var playerOneNumber = 0;
var playerTwoNumber = 0;
var gameState = "";
var myOutputValue = "";

//dice roll function
var diceRoll = function () {
  var oneToFive = Math.floor(Math.random() * 6);
  var randomNumber = oneToFive + 1;
  return randomNumber;
};
//Helper function for selecting combination which gives largest value
var playerOneCombinationGenerator = function () {
  diceRollOne = diceRoll();
  diceRollTwo = diceRoll();
  if (diceRollOne >= diceRollTwo) {
    var playerOneGuess = `${diceRollOne}${diceRollTwo}`;
    playerOneNumber = Number(playerOneGuess);
    myOutputValue = `Welcome Player One! You have rolled ${diceRollOne} for Dice One and ${diceRollTwo} for Dice Two. <br> The largest possible combination is ${playerOneGuess}.It is now Player 2\'s turn.`;
  }
  if (diceRollTwo > diceRollOne) {
    var playerOneGuess = `${diceRollTwo}${diceRollOne}`;
    playerOneNumber = Number(playerOneGuess);
    myOutputValue = `Welcome Player One! <br> You have rolled ${diceRollOne} for Dice One and ${diceRollTwo} for Dice Two. <br> The largest possible combination is ${playerOneGuess}.It is now Player 2\'s turn.`;
  }
  return myOutputValue;
};

var playerTwoCombinationGenerator = function () {
  diceRollOne = diceRoll();
  diceRollTwo = diceRoll();
  if (diceRollOne >= diceRollTwo) {
    var playerTwoGuess = `${diceRollOne}${diceRollTwo}`;
    playerTwoNumber = Number(playerTwoGuess);
    myOutputValue = `Welcome Player Two! You have rolled ${diceRollOne} for Dice One and ${diceRollTwo} for Dice Two. <br> The largest possible combination is ${playerTwoGuess}.It is now time to decide the winner.`;
  }
  if (diceRollTwo > diceRollOne) {
    var playerTwoGuess = `${diceRollTwo}${diceRollOne}`;
    playerTwoNumber = Number(playerTwoGuess);
    myOutputValue = `Welcome Player Two! <br> You have rolled ${diceRollOne} for Dice One and ${diceRollTwo} for Dice Two. <br> The largest possible combination is ${playerTwoGuess}.It is now time to decide the winner.`;
  }
  return myOutputValue;
};

var main = function (input) {
  if (input == "player 1") {
    gameState = "player 2";
    playerOneCombinationGenerator();
  }
  if (input == "player 2" && gameState == "player 2") {
    playerTwoCombinationGenerator();
    gameState = "decideWinner";
  }
  if (
    gameState == "decideWinner" &&
    input == "winner" &&
    playerOneNumber > playerTwoNumber
  ) {
    myOutputValue = `Player One\'s number is ${playerOneNumber} and Player Two\'s number is ${playerTwoNumber}. Player One wins!`;
  } else if (
    gameState == "decideWinner" &&
    input == "winner" &&
    playerTwoNumber > playerOneNumber
  ) {
    myOutputValue = `Player One\'s number is ${playerOneNumber} and Player Two\'s number is ${playerTwoNumber}. Player Two wins!`;
  }

  return myOutputValue;
};
