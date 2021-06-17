var REVERSE = "reverse";
var NORMAL = "normal";
var REVERSE_MODE = "reverse mode";
var NORMAL_MODE = "normal mode";
// Game type to switch between normal and reverse modes
var gameType = NORMAL_MODE;

// Game state to switch between players and dice roll
var gameMode = 1;

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

// Global variable to store diceRoll values stored as integers
var diceInt1 = 0;
var diceInt2 = 0;

// Global variable to track each players score
var playerOneScore = 0;
var playerTwoScore = 0;
var playerScore = 0;
// Global variable for total scores
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

// Auto generate highest number
var generateHighestNum = function () {
  var highestNum = Math.max(diceInt1, diceInt2);
  var lowestNum = Math.min(diceInt1, diceInt2);
  playerScore = `${highestNum}${lowestNum}`;
  return playerScore;
};

// Store player one's auto results in global variable for normal mode
// Output results for player 1
var playerHighScore = "";
var playerOneNormalResults = function () {
  diceInt1 = Number(diceRoll());
  diceInt2 = Number(diceRoll());
  playerHighScore = generateHighestNum();
  playerOneScore = Number(playerScore);
  playerOneTotalScore = playerOneTotalScore + playerOneScore;

  var playerOneOutputMessage = `Player 1: <br> The AI has chosen ${playerOneScore} as your score. <br> <br>It's Player 2's turn. <br> <br> Please click submit to play!`;

  return playerOneOutputMessage;
};

// Store player two's auto results in global variable
// Output each players result
// Tell players who won
var playerTwoNormalResults = function () {
  diceInt1 = Number(diceRoll());
  diceInt2 = Number(diceRoll());
  var playerTwoOutputMessage = "";
  playerHighScore = generateHighestNum();
  playerTwoScore = Number(playerScore);
  playerTwoTotalScore = playerTwoTotalScore + playerTwoScore;

  var leader = determineNormalLeader();
  playerTwoOutputMessage = `Player 2: <br> The AI has chosen ${playerTwoScore} as your score. <br> Player 1's score was ${playerOneScore}.  <br><br> ${leader}   <br><br><br> Click submit to play again!😊`;

  return playerTwoOutputMessage;
};

// Determine leader using overall score
var determineNormalLeader = function () {
  var findMaxValue = Math.max(playerOneTotalScore, playerTwoTotalScore);
  if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue != playerTwoTotalScore
  ) {
    return `Player 1 is in the lead with ${playerOneTotalScore} points! 🎉 <br> <br>Leaderboard: <br>Player 1: ${playerOneTotalScore} points <br>Player 2: ${playerTwoTotalScore} points`;
  } else if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue == playerTwoTotalScore
  ) {
    return `Both players are level on points! <br> <br>Leaderboard: <br>Players 1 & 2: ${playerTwoTotalScore} points`;
  } else {
    return `Player 2 is in the lead with  ${playerTwoTotalScore} points!🎉 <br> <br>Leaderboard: <br>Player 2: ${playerTwoTotalScore} points <br>Player 1: ${playerOneTotalScore} points`;
  }
};

// Determine reverse game leader using overall score
var determineReverseLeader = function () {
  var findMinValue = Math.min(playerOneTotalScore, playerTwoTotalScore);
  if (
    findMinValue == playerOneTotalScore &&
    findMinValue != playerTwoTotalScore
  ) {
    return `Leaderboard: <br>Player 1: ${playerOneTotalScore} points <br>Player 2: ${playerTwoTotalScore} points`;
  } else if (
    findMinValue == playerOneTotalScore &&
    findMinValue == playerTwoTotalScore
  ) {
    return `Leaderboard: <br>Players 1 & 2: ${playerTwoTotalScore} points`;
  } else {
    return `Leaderboard: <br>Player 2: ${playerTwoTotalScore} points <br>Player 1: ${playerOneTotalScore} points`;
  }
};

// Auto generate lowest number
var generateLowestNum = function () {
  var reverseHighestNum = Math.max(diceInt1, diceInt2);
  var reverseLowestNum = Math.min(diceInt1, diceInt2);
  reversePlayerScore = `${reverseLowestNum}${reverseHighestNum}`;
  return reversePlayerScore;
};

// Determine reverse mode player 1 auto results
var playerHighScore = "";
var determineReversePlayerOneResults = function () {
  diceInt1 = Number(diceRoll());
  diceInt2 = Number(diceRoll());
  var reverseLowestNum = "";
  reverseLowestNum = generateLowestNum();
  playerOneScore = Number(reversePlayerScore);
  playerOneTotalScore = playerOneTotalScore + playerOneScore;

  var playerOneOutputMessage = `REVERSE BEAT THAT!: <br><br><br>Player 1: <br> The AI has chosen ${playerOneScore} as your score. <br> <br>It's Player 2's turn. <br> <br> Please click submit to play!`;

  return playerOneOutputMessage;
};

// Determine reverse mode player 2 auto results
// Output results
var determineReverseWinner = function () {
  diceInt1 = Number(diceRoll());
  diceInt2 = Number(diceRoll());
  var reverseLowestNum = "";
  reverseLowestNum = generateLowestNum();
  playerTwoScore = Number(reversePlayerScore);
  playerTwoTotalScore = playerTwoTotalScore + playerTwoScore;
  var message = "";
  var reverseLeader = determineReverseLeader();
  var findMinValueRound = Math.min(playerOneScore, playerTwoScore);
  if (
    findMinValueRound == playerOneScore &&
    findMinValueRound != playerTwoScore
  ) {
    message = `Player 1 wins with ${playerOneScore} points! <br> <br>${reverseLeader} `;
  } else if (
    findMinValueRound == playerOneScore &&
    findMinValueRound == playerTwoScore
  ) {
    message = `It's a draw! <br><br> ${reverseLeader}`;
  } else {
    message = `Player 2 wins with ${playerTwoScore} points! <br> <br>${reverseLeader} `;
  }
  return `REVERSE BEAT THAT!: <br><br><br>Player 2: <br> The AI has chosen ${playerTwoScore} as your score. <br> Player 1's score was ${playerOneScore}.  <br><br> ${message}  <br><br><br> Click submit to play again!😊`;
};

// Change game state between players
var main = function (input) {
  var myOutputValue = "";
  // gameMode 1 for player 1's results and and gameMode 2 for final results
  // gameType to switch between normal and reverse rules
  if (input == REVERSE) {
    gameType = REVERSE_MODE;
    return `You have selected reverse Beat That! <br> The AI will select the lowest number to help you win! 🤖`;
  }
  if (input == NORMAL) {
    gameType = NORMAL_MODE;
    return `You have selected normal Beat That! <br> The AI will select the highest number to help you win! 🤖`;
  }
  if (gameMode == 1) {
    if (gameType == NORMAL_MODE) {
      myOutputValue = playerOneNormalResults();
    } else if (gameType == REVERSE_MODE) {
      myOutputValue = determineReversePlayerOneResults();
    }
    gameMode += 1;
    return myOutputValue;
  } else if (gameMode == 2) {
    if (gameType == NORMAL_MODE) {
      myOutputValue = playerTwoNormalResults();
    } else if (gameType == REVERSE_MODE) {
      myOutputValue = determineReverseWinner();
    }
    gameMode = 1;
    return myOutputValue;
  }
};
