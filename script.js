// Project 2: Beat That!

var PLAYER1 = 1;
var PLAYER2 = 2;
var currentPlayer = PLAYER1;
var Dice1 = "";
var Dice2 = "";
var player1Number = "";
var player2Number = "";
var player1Score = 0;
var player2Score = 0;
var ROLL_DICE_MODE = "ROLL DICE";
var CHOOSE_ORDER_MODE = "CHOOSE ORDER";
var LOWEST_NUMBER_MODE = "LOWEST NUMBER";
var gameMode = ROLL_DICE_MODE;
var winner = "";

// The game always starts with Player 1

var main = function (input) {
  var myOutputValue = "";
  myOutputValue = basicGame(input);
  return myOutputValue;
};

var basicGame = function (input) {
  // Game starts by rolling 2 dice and asks player to choose the order
  if (gameMode == ROLL_DICE_MODE) {
    Dice1 = rollDice();
    Dice2 = rollDice();
    gameMode = CHOOSE_ORDER_MODE;
    return `Player ${currentPlayer}: You have rolled ${Dice1} and ${Dice2}. <br><br> Please choose the order of the dice: "1" for ${Dice1}${Dice2} and "2" for ${Dice2}${Dice1}.`;
  }
  var currPlayerNum = 0;
  var chosenOrder = Number(input);

  // Concatenate dice rolls based on user choice
  if (chosenOrder == 1) {
    currPlayerNum = Number(`${Dice1}${Dice2}`);
  } else {
    currPlayerNum = Number(`${Dice2}${Dice1}`);
  }

  var chosenOutputMessage = `Player ${currentPlayer}: You have chosen ${currPlayerNum}`;

  if (currentPlayer == PLAYER1) {
    player1Number = currPlayerNum;
    player1Score += Number(currPlayerNum);
    myOutputValue = `${chosenOutputMessage}. It is now Player 2's turn. Please click submit to play.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = currPlayerNum;
    player2Score += Number(currPlayerNum);
    winner = generateWinner(player1Number, player2Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage}. ${winner} <br> <br> ${leader} <br> Click submit to play again.`;
  }

  // Switches to other player and restarts game
  var nextPlayer = (currentPlayer % 2) + 1;
  currentPlayer = nextPlayer;
  gameMode = ROLL_DICE_MODE;

  return myOutputValue;
};

// Higher number wins
var generateWinner = function (player1Number, player2Number) {
  if (player1Number > player2Number) {
    return `Player ${PLAYER1} wins!`;
  } else return `Player ${PLAYER2} wins!`;
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
