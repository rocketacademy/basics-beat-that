// Project 2: Beat That!

// ---players----
var PLAYER1 = 1;
var PLAYER2 = 2;
var currentPlayer = PLAYER1;
var Dice1 = "";
var Dice2 = "";
var player1Number = "";
var player2Number = "";
var currPlayerNum = 0;
var player1Score = 0;
var player2Score = 0;
var winner = "";

// ---stages for normal mode---
var ROLL_DICE_STAGE = "ROLL DICE";
var CHOOSE_ORDER_STAGE = "CHOOSE ORDER";
var gameStage = ROLL_DICE_STAGE;

// ---possible modes ---
var NORMAL_MODE = "NORMAL";
var LOWEST_NUMBER_MODE = "LOWEST NUMBER";
var gameMode = NORMAL_MODE;

// The game always starts with Player 1

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == NORMAL_MODE) {
    myOutputValue = basicGame(input);
  } else if (gameMode == LOWEST_NUMBER_MODE) {
    return lowestCombinedGame(input);
  }

  return myOutputValue;
};

var basicGame = function (input) {
  // To allow for change of modes to lowest
  if (input == "lowest") {
    gameMode = LOWEST_NUMBER_MODE;
    return `The player with the lowest number now wins!`;
  }
  // Game starts by rolling 2 dice and asks player to choose the order
  if (gameStage == ROLL_DICE_STAGE) {
    gameStage = CHOOSE_ORDER_STAGE;
    return generateDiceRolls();
  }
  if (gameStage == CHOOSE_ORDER_STAGE) {
    myOutputValue = generateResults(input);
    // Switches to other player and restarts game
    currentPlayer = generateNextPlayer();
    gameStage = ROLL_DICE_STAGE;
  }

  return myOutputValue;
};

var lowestCombinedGame = function (input) {
  if (gameStage == ROLL_DICE_STAGE) {
    gameStage = CHOOSE_ORDER_STAGE;
    return generateDiceRolls();
  }
  if (gameStage == CHOOSE_ORDER_STAGE) {
    myOutputValue = generateResultsForLowestGame(input);
    // Switches to other player and restarts game
    currentPlayer = generateNextPlayer();
    gameStage = ROLL_DICE_STAGE;
  }

  return myOutputValue;
};

// Higher number wins
var generateWinner = function (player1Number, player2Number) {
  var myOutputValue = "";
  if (player1Number > player2Number) {
    myOutputValue = `Player ${PLAYER1} wins!`;
  } else myOutputValue = `Player ${PLAYER2} wins!`;
  return myOutputValue;
};

var generateLowestNumberWinner = function (player2Number, player1Number) {
  var myOutputValue = "";
  if (player2Number < player1Number) {
    myOutputValue = `Player ${PLAYER2} wins!`;
  } else myOutputValue = `Player ${PLAYER1} wins!`;
  return myOutputValue;
};

// Lists the 2 players and their scores in decreasing order
var generateLeaderboard = function (player1Score, player2Score) {
  if (player1Score >= player2Score) {
    return `Leaderboard <br> Player 1: ${player1Score} <br> 
    Player 2: ${player2Score}`;
  } else {
    return `Leaderboard <br> Player 2: ${player2Score} <br> 
    Player 1: ${player1Score}`;
  }
};

// Output number for player dependent on choice
var generatePlayerNumber = function (input) {
  var chosenOrder = Number(input);
  // Concatenate dice rolls based on user choice
  console.log(chosenOrder);
  if (chosenOrder == 1) {
    currPlayerNum = Number(`${Dice1}${Dice2}`);
  } else {
    currPlayerNum = Number(`${Dice2}${Dice1}`);
  }
};

var generateNextPlayer = function () {
  var nextPlayer = (currentPlayer % 2) + 1;
  return nextPlayer;
};

// Results for normal game
var generateResults = function (input) {
  generatePlayerNumber(input);
  var chosenOutputMessage = `Player ${currentPlayer}, you have chosen ${currPlayerNum}.`;

  if (currentPlayer == PLAYER1) {
    player1Number = currPlayerNum;
    player1Score += Number(currPlayerNum);
    myOutputValue = `${chosenOutputMessage} <br><br> It is now Player 2's turn. Please click submit to play.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = currPlayerNum;
    player2Score += Number(currPlayerNum);
    winner = generateWinner(player1Number, player2Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage} <br> ${winner} <br> <br> ${leader} <br> Click submit to play again.`;
  }

  return myOutputValue;
};

// Results for lowest combined mode (not sure how to simplify it further cos it is quite repetitive as above function except for the way to determine the winner)
var generateResultsForLowestGame = function (input) {
  generatePlayerNumber(input);
  var chosenOutputMessage = `Player ${currentPlayer}, you have chosen ${currPlayerNum}.`;

  if (currentPlayer == PLAYER1) {
    player1Number = currPlayerNum;
    player1Score += Number(currPlayerNum);
    myOutputValue = `${chosenOutputMessage} <br><br> It is now Player 2's turn. Please click submit to play.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = currPlayerNum;
    player2Score += Number(currPlayerNum);
    winner = generateLowestNumberWinner(player2Number, player1Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage} <br> ${winner} <br> <br> ${leader} <br> Click submit to play again.`;
  }

  return myOutputValue;
};

var autoGenerateIdealNumber = function () {};

var generateDiceRolls = function () {
  Dice1 = rollDice();
  Dice2 = rollDice();
  return `Player ${currentPlayer}: You have rolled ${Dice1} and ${Dice2}. <br><br> Please choose the order of the dice: "1" for ${Dice1}${Dice2} and "2" for ${Dice2}${Dice1}.`;
};

// Simple Dice Function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// var increaseNumRoundsPlayer = function () {
//   if (currentPlayer == PLAYER1) {
//     player1NumRounds += 1;
//   } else {
//     player2NumRounds += 1;
//   }
// };

// var increaseNumWins = function () {
//   if (currentPlayer == PLAYER1) {
//     player1NumWins += 1;
//   } else {
//     player2NumWins += 1;
//   }
// };
