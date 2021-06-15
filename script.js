// Game state to switch between players and dice roll
var gameMode = 1;

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

// Create two random numbers which do not change until after player one/two output statement is generated
var randomNum1 = diceRoll();
var randomNum2 = diceRoll();

// Tell player to choose order of numbers
var generateTwoDigitNum = function () {
  var player = 0;
  if (gameMode == 1) {
    player = 1;
  } else {
    player = 2;
  }

  return `Player ${player}: <br> You rolled ${randomNum1} & ${randomNum2}. <br> If you would like to concatenate the numbers in this order type '1'. <br> If you would like to switch the order, type '2'.`;
};

// Global variable to track each players score
var playerOneScore = 0;
var playerTwoScore = 0;
var playerScore = 0;
// Global variable for total scores
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

// Allow player to choose which number goes first
var letPlayerChooseOrder = function (input) {
  if (input == "1") {
    playerScore = `${randomNum1}${randomNum2}`;
  } else if (input == "2") {
    playerScore = `${randomNum2}${randomNum1}`;
  }
  return playerScore;
};

// Store player one's choice in global variable
// Output results for player 1
var playerChoice = "";
var playerOneResults = function (input) {
  playerChoice = letPlayerChooseOrder(input);
  if (gameMode == 2) {
    playerOneScore = Number(playerScore);
    playerOneTotalScore = playerOneTotalScore + playerOneScore;
    var playerOneOutputMessage = `Player 1: <br> You have chosen ${playerOneScore} as your score. <br> <br>It's Player 2's turn. <br> <br> Please click submit to play!`;
  }
  // Reroll dice so that player 2 has unique numbers
  randomNum1 = diceRoll();
  randomNum2 = diceRoll();
  return playerOneOutputMessage;
};

// Store player two's choice in global variable
// Output each players result
// Tell players who won
var playerTwoResults = function (input) {
  playerChoice = letPlayerChooseOrder(input);
  if (gameMode == 4) {
    playerTwoScore = Number(playerScore);
    playerTwoTotalScore = playerTwoTotalScore + playerTwoScore;
    var leader = determineLeader();
    var playerTwoOutputMessage = `Player 2: <br> You have chosen ${playerTwoScore} as your score. <br> Player one's score was ${playerOneScore}.  <br><br> ${leader}! 🎉 <br><br><br> Click submit to play again!😊`;
  }
  // Reroll dice so that player 1 has unique numbers for next turn
  randomNum1 = diceRoll();
  randomNum2 = diceRoll();
  return playerTwoOutputMessage;
};

// Determine winner
var determineLeader = function () {
  var findMaxValue = Math.max(playerOneTotalScore, playerTwoTotalScore);
  if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue != playerTwoTotalScore
  ) {
    return `Player one is in the lead with ${playerOneTotalScore} points!`;
  } else if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue == playerTwoTotalScore
  ) {
    return `Both players are level on points!`;
  } else {
    return `Player two is in the lead with  ${playerTwoTotalScore} points!`;
  }
};

// Change game state between players
var main = function (input) {
  var myOutputValue = "";
  // gameMode 1 for player 1's dice result, gameMode 3 for player 2's dice result
  if (gameMode == 1 || gameMode == 3) {
    myOutputValue = generateTwoDigitNum();
    gameMode += 1;
    return myOutputValue;
  } else if (gameMode == 2) {
    myOutputValue = playerOneResults(input);
    gameMode += 1;
    return myOutputValue;
  } else if (gameMode == 4) {
    myOutputValue = playerTwoResults(input);
    gameMode = 1;
    return myOutputValue;
  }
};
