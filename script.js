//assign global variables
var myOutputValue = ``;
//keeps track of both players score
var playerOneScore = 0;
var playerTwoScore = 0;
//dice numbers of both players
var playerOneDiceOne = 0;
var playerOneDiceTwo = 0;
var playerTwoDiceOne = 0;
var playerTwoDiceTwo = 0;
//number of players after selecting order of dice
var playerOneNumber = 0;
var playerTwoNumber = 0;
//larger number
var winningNumber = 0;
//game mode
var gameMode = `player one`;

//MAIN FUNCTION
var main = function (input) {
  //Player one rolls
  if (gameMode == `player one`) {
    myOutputValue = playerOneDiceRoll();
  } else if (gameMode == `player one input`) {
    //Player one chooses which dice goes first
    myOutputValue = playerOneChoice(input);
    //player two rolls two dices
  } else if (gameMode == `player two`) {
    myOutputValue = playerTwoDiceRoll();
  } else if (gameMode == `player two input`) {
    //change game mode to request for player two input
    myOutputValue = playerTwoChoice(input);
  } else if (gameMode == `announce winner`) {
    //Announces winner
    winningNumber = largerNumber(playerOneNumber, playerTwoNumber);
    myOutputValue = chooseWinner();
  }
  return myOutputValue;
};

//FUNCTION TO ROLL DICE, GENERATE NUMBER FROM 1-6
var rollDice = function () {
  var randomInteger = Math.ceil(Math.random() * 6);
  return randomInteger;
};

//FUNCTION TO VERIFY IF INPUT IS A VALID NUMBER
var inputNumber = function (input) {
  if (isNaN(input) || input == ``) {
    return `You did not enter a number. Please enter a valid number (1 or 2).`;
  } else {
    //verifies if input is 1 or 2
    if (input != 1 || input != 2) {
      return `Please select either dice 1 or 2.`;
    }
  }
};

//FUNCTION FOR DICE 1 FIRST
var diceOneFirst = function (diceOne, diceTwo) {
  var numberCombination = diceOne * 10 + diceTwo;
  console.log(numberCombination);
  return numberCombination;
};

//FUNCTION FOR DICE 2 FIRST
var diceTwoFirst = function (diceOne, diceTwo) {
  var numberCombination = diceTwo * 10 + diceOne;
  console.log(numberCombination);
  return numberCombination;
};

//FUNCTION FOR PLAYER ONE DICE ROLL
var playerOneDiceRoll = function () {
  //roll two dices
  playerOneDiceOne = rollDice();
  playerOneDiceTwo = rollDice();
  //change game mode to request for player one input
  gameMode = `player one input`;
  return `Player 1 - Your rolls are ${playerOneDiceOne} and ${playerOneDiceTwo}. Please choose the order of the dice`;
};

//FUNCTION FOR PLAYER TWO DICE ROLL
//roll two dices
var playerTwoDiceRoll = function () {
  playerTwoDiceOne = rollDice();
  playerTwoDiceTwo = rollDice();
  //change game mode to request for player one input
  gameMode = `player two input`;
  return `Player 2 - Your rolls are ${playerTwoDiceOne} and ${playerTwoDiceTwo}. Please choose the order of the dice`;
};

//FUNCTION FOR PLAYER ONE INPUT
//if player chooses 1
var playerOneChoice = function (input) {
  if (input == `1`) {
    playerOneNumber = diceOneFirst(playerOneDiceOne, playerOneDiceTwo);
    gameMode = `player two`;
    return `Player one = ${playerOneNumber} <br><br> It's player two's turn. Press submit to roll dice.`;
  }
  //if player chooses 2
  else if (input == `2`) {
    playerOneNumber = diceTwoFirst(playerOneDiceOne, playerOneDiceTwo);
    gameMode = `player two`;
    return `Player one = ${playerOneNumber} <br><br> It's player two's turn. Press submit to roll dice.`;
  }
  //if player does not select a number
  else {
    return inputNumber(input);
  }
};

//FUNCTION FOR PLAYER TWO INPUT
//if player chooses 1
var playerTwoChoice = function (input) {
  if (input == `1`) {
    playerTwoNumber = diceOneFirst(playerTwoDiceOne, playerTwoDiceTwo);
    gameMode = `announce winner`;
    return `Player two = ${playerTwoNumber} <br><br> Press submit to find out who's the winner :)`;
  }
  //if player chooses 2
  else if (input == `2`) {
    playerTwoNumber = diceTwoFirst(playerTwoDiceOne, playerTwoDiceTwo);
    gameMode = `announce winner`;
    return `Player two = ${playerTwoNumber} <br><br> Press submit to find out who's the winner :)`;
  }
  //if player does not select a number
  else {
    return inputNumber(input);
  }
};

//FUNCTION TO COMPARE BOTH PLAYERS' NUMBERS TO DETERMINE WHICH IS LARGER
var largerNumber = function (playerOneNumber, playerTwoNumber) {
  var winningNumber = Math.max(playerOneNumber, playerTwoNumber);
  return winningNumber;
};

//FUNCTION TO ANNOUNCE WINNER
var chooseWinner = function () {
  if (playerOneNumber == winningNumber) {
    return `Player 1: ${playerOneNumber} <br>Player 2: ${playerTwoNumber}<br><br>Player 1 wins with ${winningNumber}!`;
  } else {
    return `Player 1: ${playerOneNumber} <br>Player 2: ${playerTwoNumber}<br><br>Player 2 wins with ${winningNumber}!`;
  }
};
