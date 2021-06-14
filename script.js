// Constants
const PENDING_ROLL = "pending dice roll";
const PENDING_ORDER = "pending order";
const PENDING_RESULT = "pending final game results";
const PLAYER_1 = "Player 1";
const PLAYER_2 = "Player 2";

// Global variables
var gameMode = PENDING_ROLL; // Initialise game in this mode
var player1Score;
var player2Score;
var currentTurn = PLAYER_1; // Player 1 starts first in the game
var diceRoll1;
var diceRoll2;

// Generate a number between 1-6
var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var randomRoll = Math.floor(randomInteger) + 1;
  return randomRoll;
};

// First stage of player turn: roll two dice
var stage1 = function () {
  diceRoll1 = rollDice();
  diceRoll2 = rollDice();
  gameMode = PENDING_ORDER;
  return `${currentTurn} rolled two dice... 🎲🎲<br>Dice 1 rolled ${diceRoll1}.<br>Dice 2 rolled ${diceRoll2}.<br>Enter "1" to have Dice 1 be the first digit in your number, or "2" to have Dice 2 be the first digit your number.`;
};

// Second stage of player turn: select order of dice digits
var stage2 = function (orderInput) {
  let resultMessage;
  // Input validation
  if (Number(orderInput) != 1 && Number(orderInput) != 2) {
    resultMessage = `You have entered an invalid input.<br>Please enter "1" to have Dice 1 be the first digit in your number, or "2" to have Dice 2 be the first digit your number.<br> In case you have forgotten, Dice 1 rolled ${diceRoll1} and Dice 2 rolled ${diceRoll2}.`;
    return resultMessage;
  }
  // Update player's score based on their input of the order of dice digits
  if (currentTurn == PLAYER_1) {
    if (orderInput == 1) {
      player1Score = Number(`${diceRoll1}${diceRoll2}`);
    } else {
      player1Score = Number(`${diceRoll2}${diceRoll1}`);
    }
    currentTurn = PLAYER_2; // Change to Player 2's turn to play next
    gameMode = PENDING_ROLL; // Player 2 needs to roll two dice
    resultMessage = `${PLAYER_1}, your number is ${player1Score}!<br>It is now ${PLAYER_2}'s turn - click on "Submit" to roll two dice. 🎲🎲`;
    return resultMessage;
  }
  if (currentTurn == PLAYER_2) {
    if (orderInput == 1) {
      player2Score = Number(`${diceRoll1}${diceRoll2}`);
    } else {
      player2Score = Number(`${diceRoll2}${diceRoll1}`);
    }
    gameMode = PENDING_RESULT; // Both players have finished their turns, so it's time to output the final results
    resultMessage = `${PLAYER_2}, your number is ${player2Score}!<br>Click on "Submit" to find out who is the winner. Drumroll... 🥁`;
    return resultMessage;
  }
};

// Final stage of the game: publish results after both players have played their turn
var stage3 = function () {
  let resultMessage = `${PLAYER_1}'s number is ${player1Score} and ${PLAYER_2}'s number is ${player2Score}.<br>`;
  if (player1Score > player2Score) {
    resultMessage += `The winner is ${PLAYER_1}! Congratulations! 🥳🥳<br>`;
  } else if (player2Score > player1Score) {
    resultMessage += `The winner is ${PLAYER_2}! Congratulations! 🥳🥳<br>`;
  } else {
    resultMessage += `How boring, it's a draw...<br>`;
  }
  resultMessage += `If you would like to play again, click on "Submit" to roll two dice for ${PLAYER_1} as part of a new game.`;
  // Reset the game in case they want to play again
  gameMode = PENDING_ROLL;
  currentTurn = PLAYER_1;
  return resultMessage;
};

var main = function (input) {
  let myOutputValue;
  if (gameMode == PENDING_ROLL) {
    myOutputValue = stage1();
  } else if (gameMode == PENDING_ORDER) {
    myOutputValue = stage2(input);
  } else if (gameMode == PENDING_RESULT) {
    myOutputValue = stage3();
  }
  return myOutputValue;
};
