// Project 2: Beat That!

var PLAYER1 = 1;
var PLAYER2 = 2;
var currentPlayer = PLAYER1;
var Dice1 = "";
var Dice2 = "";
var player1Number = "";
var player2Number = "";
var player1Score = "";
var player2Score = "";
// var player1NumRounds = 0;
// var player2NumRounds = 0;
// var player1NumWins = 0;
// var player2NumWins = 0;
var ROLL_DICE_MODE = "ROLL DICE";
var CHOOSE_ORDER_MODE = "CHOOSE ORDER";
var gameMode = ROLL_DICE_MODE;
// var input = "";
var winner = "";

// Start with Player 1

var main = function (input) {
  var myOutputValue = "";
  myOutputValue = basicGame(input);
  return myOutputValue;
};

var basicGame = function (input) {
  // Starts off by rolling dice and asks player to choose order
  if (gameMode == ROLL_DICE_MODE) {
    Dice1 = rollDice();
    Dice2 = rollDice();
    gameMode = CHOOSE_ORDER_MODE;
    return `Player ${currentPlayer}: You have rolled ${Dice1} and ${Dice2}. <br> Please choose which dice you would like first: "1" for ${Dice1}${Dice2} and "2" for ${Dice2}${Dice1}.`;
  }

  var chosenOrder = Number(input);
  var chosenOutputMessage = `Player ${currentPlayer}: You have chosen`;
  // concatenate dice rolls based on user choice
  // immediately determines winner after player 2 chooses
  if (chosenOrder == 1) {
    if (currentPlayer == PLAYER1) {
      player1Number = Number(`${Dice1}${Dice2}`);
      myOutputValue = `${chosenOutputMessage} ${player1Number}. It is now Player 2's turn. Please click submit to play.`;
    } else if (currentPlayer == PLAYER2) {
      player2Number = Number(`${Dice1}${Dice2}`);
      winner = generateWinner(player1Number, player2Number);
      myOutputValue = `${chosenOutputMessage} ${player2Number}. Player ${winner} wins! Click submit to play again.`;
    }
  } else {
    if (currentPlayer == PLAYER1) {
      player1Number = Number(`${Dice2}${Dice1}`);
      myOutputValue = `${chosenOutputMessage} ${player1Number}. It is now Player 2's turn. Please click submit to play.`;
    } else if (currentPlayer == PLAYER2) {
      player2Number = Number(`${Dice2}${Dice1}`);
      winner = generateWinner(player1Number, player2Number);
      myOutputValue = `${chosenOutputMessage} ${player2Number}. Player ${winner} wins! Click submit to play again.`;
    }
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
    return PLAYER1;
  } else return PLAYER2;
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
