//roll dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//2 modes in which player roll the dice, then select the order
var gameMode1 = "roll two dices";
var gameMode2 = "select the order of the dice number";

//Global variable
var gameCurrentPlayer = 1;
var gameCurrentMode = gameMode1;

//array variables
var diceArrayPlayerOne = [];
var diceArrayPlayerTwo = [];

//number store in array function
var playerDiceRolls = function () {
  var playerNewNumber = [rollDice(), rollDice()];
  if (gameCurrentPlayer == 1) {
    diceArrayPlayerOne = playerNewNumber;
  } else {
    diceArrayPlayerTwo = playerNewNumber;
  }
  return playerDiceRolls;
};

//merging dice function
var mergeDiceNumber = function (input) {
  if (gameCurrentPlayer == 1) {
    var playerMerge = diceArrayPlayerOne;
  } else {
    var playerMerge = diceArrayPlayerTwo;
  }
  if (input == 1) {
    var mergedNumber = String(playerMerge[0]) + String(playerMerge[1]);
  } else {
    var mergedNumber = String(playerMerge[1]) + String(playerMerge[0]);
  }
  if (gameCurrentPlayer == 1) {
    playerOneNumber = mergedNumber;
    return playerOneNumber;
  } else {
    playerTwoNumber = mergedNumber;
    return playerTwoNumber;
  }
  return mergeDiceNumber;
};

//winning function
function winningPlayer() {
  if (userNameOne > userNameTwo) {
    return `${userNameOne} Win`;
  } else return `${userNameTwo} Win;`;
}

//----------main function-----------

var main = function (input) {
  var rollDice1 = rollDice();
  var rollDice2 = rollDice();

  if (gameCurrentMode == gameMode1) {
    userNameOne = input;
    gameCurrentMode = gameMode2;
    return `Hello ${userNameOne}, you rolled ${rollDice1} for Dice 1 and ${rollDice2} for Dice 2. Choose the order of the dice by typing 1 (for dice 1) or 2 (for dice 2)`;
  }

  //now player will input the order; game mode change to secondMode

  if (gameCurrentMode == gameMode2) {
    var orderOfdice = mergeDiceNumber(input);
    gameCurrentMode = gameMode1;
    if (gameCurrentPlayer == 1) {
      gameCurrentPlayer = 2;
      return `${userNameOne}, you have choosen ${orderOfdice}.`;
    } else {
      //winning condition need to be added here
      var winner = winningPlayer();
      gameCurrentPlayer = 1;
      return winner;
    }
  }
};
