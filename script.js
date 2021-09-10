//ASSIGN GLOBAL VARIABLES
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
//player score
var playerOneScore = [];
var playerTwoScore = [];

//MAIN FUNCTION
var main = function (input) {
  //Player one rolls
  if (gameMode == `player one`) {
    myOutputValue = playerOneDiceRoll();
  } //Change game mode to request for player one input
  else if (gameMode == `player one input`) {
    myOutputValue = playerOneChoice(input);
    //player two rolls two dices
  } else if (gameMode == `player two`) {
    myOutputValue = playerTwoDiceRoll();
  } //Change game mode to request for player two input
  else if (gameMode == `player two input`) {
    myOutputValue = playerTwoChoice(input);
  } else if (gameMode == `announce winner`) {
    //Announces winner for base variation of beat that
    winningNumber = largerNumber(playerOneNumber, playerTwoNumber);
    myOutputValue = chooseWinner();
  } else if (gameMode == `lowest combined number`) {
    winningNumber = smallerNumber(playerOneNumber, playerTwoNumber);
    myOutputValue = chooseWinner();
  } //Game mode score
  else if (gameMode == `score`) {
    myOutputValue = chooseWinnerScore();
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
    //push player's number into playerOneScore array to keep track of running sum
    playerOneScore.push(playerOneNumber);
    console.log(playerOneScore);
    return `Player one = ${playerOneNumber} <br><br> It's player two's turn. Press submit to roll dice.`;
  }
  //if player chooses 2
  else if (input == `2`) {
    playerOneNumber = diceTwoFirst(playerOneDiceOne, playerOneDiceTwo);
    gameMode = `player two`;
    //push player's number into playerOneScore array to keep track of running sum
    playerOneScore.push(playerOneNumber);
    console.log(playerOneScore);
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
    //push player's number into playerTwoScore array to keep track of running sum
    playerTwoScore.push(playerTwoNumber);
    console.log(playerTwoScore);
    gameMode = `score`;
    return `Player two = ${playerTwoNumber} <br><br> Press submit to find out who's the winner :)`;
  }
  //if player chooses 2
  else if (input == `2`) {
    playerTwoNumber = diceTwoFirst(playerTwoDiceOne, playerTwoDiceTwo);
    //push player's number into playerTwoScore array to keep track of running sum
    playerTwoScore.push(playerTwoNumber);
    console.log(playerTwoScore);
    gameMode = `score`;
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

//LOWEST COMBINED NUMBER MODE
//FUNCTION TO COMPARE BOTH PLAYERS' NUMBERS TO DETERMINE WHICH IS SMALLER
var smallerNumber = function (playerOneNumber, playerTwoNumber) {
  var winningNumber = Math.min(playerOneNumber, playerTwoNumber);
  return winningNumber;
};

//FUNCTION TO ANNOUNCE WINNER
var chooseWinner = function () {
  gameMode = `player one`;
  if (playerOneNumber == winningNumber) {
    return `Player 1: ${playerOneNumber} <br>Player 2: ${playerTwoNumber}<br><br>Player 1 wins with ${winningNumber}!`;
  } else {
    return `Player 1: ${playerOneNumber} <br>Player 2: ${playerTwoNumber}<br><br>Player 2 wins with ${winningNumber}!`;
  }
};

//FUNCTION FOR GAME MODE: SCORE
var chooseWinnerScore = function () {
  //change game mode to player one to restart game after announcing winner
  gameMode = `player one`;
  //initialize sum of each player's scores
  var playerOneScoreSum = 0;
  var playerTwoScoreSum = 0;
  //add up player one's score by looping through array of playerOneScore
  for (i = 0; i < playerOneScore.length; i++) {
    playerOneScoreSum += playerOneScore[i];
    console.log(`playerOneScoreSum`);
    console.log(playerOneScoreSum);
  }
  //add up player two's score by looping through array of playerTwoScore
  for (j = 0; j < playerTwoScore.length; j++) {
    playerTwoScoreSum += playerTwoScore[j];
    console.log(`playerTwoScoreSum`);
    console.log(playerTwoScoreSum);
  }
  //compare which number is larger and output leaderboard
  if (playerOneScoreSum > playerTwoScoreSum) {
    return `Player One is leading! <br><br>Score Sum <br>Player 1: ${playerOneScoreSum}<br>Player 2: ${playerTwoScoreSum}`;
  }
  if (playerTwoScoreSum > playerOneScoreSum) {
    return `Player Two is leading! <br><br>Score Sum <br>Player 2: ${playerTwoScoreSum}<br>Player 1: ${playerOneScoreSum}`;
  }
};
