// The different game modes or turns
var GAME_MODE_PLAYER_ONE_ROLL = "PLAYER_ONE_ROLL";
var GAME_MODE_PLAYER_ONE_CHOOSE = "PLAYER_ONE_CHOOSE";
var GAME_MODE_PLAYER_TWO_ROLL = "PLAYER_TWO_ROLL";
var GAME_MODE_PLAYER_TWO_CHOOSE = "PLAYER_TWO_CHOOSE";

// Capture user input
var userInput = null;
var gameMode = GAME_MODE_PLAYER_ONE_ROLL;

// Arrays and variables to capture user dice rolls and number results
var player1DiceRolls = [];
var player1Number = 0;
var player2DiceRolls = [];
var player2Number = 0;

// Dice Roll function
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// Player 1's turn to roll dice
var playerOneRoll = function () {
  // Roll the dice
  var dice1 = rollDice();
  var dice2 = rollDice();

  // Add dice results to arrays
  player1DiceRolls.push(dice1);
  player1DiceRolls.push(dice2);

  // Generate output text
  var outputText = `Welcome Player 1. <br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br> Choose the order of the dice: "1" or "2".`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_ONE_CHOOSE;

  return outputText;
};

// Player 1's turn to choose dice order
var playerOneChoose = function () {
  // User input validation
  if (userInput != 1 && userInput != 2) {
    return `You have entered invalid input. Please enter either "1" or "2" to choose the dice order.`;
  } // User makes a choice
  else if (userInput == 1) {
    player1Number = Number(
      String(player1DiceRolls[0]) + String(player1DiceRolls[1])
    );
  } else {
    player1Number = Number(
      String(player1DiceRolls[1]) + String(player1DiceRolls[0])
    );
  }

  // Generate output text
  outputText = `Player 1, you chose Dice ${userInput} first. <br> Your number is ${player1Number}. <br> It is now Player 2's turn.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_TWO_ROLL;

  return outputText;
};

// Player 2's turn to roll dice
var playerTwoRoll = function () {
  // Roll the dice
  var dice1 = rollDice();
  var dice2 = rollDice();

  // Add dice results to arrays
  player2DiceRolls.push(dice1);
  player2DiceRolls.push(dice2);

  // Generate output text
  var outputText = `Welcome Player 2. <br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br> Choose the order of the dice.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_TWO_CHOOSE;

  return outputText;
};

// Player 2's turn to choose dice order
var playerTwoChoose = function () {
  // User input validation
  if (userInput != 1 && userInput != 2) {
    return `You have entered invalid input. Please enter either "1" or "2" to choose the dice order.`;
  } // User makes a choice
  else if (userInput == 1) {
    player2Number = Number(
      String(player2DiceRolls[0]) + String(player2DiceRolls[1])
    );
  } else {
    player2Number = Number(
      String(player2DiceRolls[1]) + String(player2DiceRolls[0])
    );
  }

  // Decide who the winner
  var winnerText = decideWinner();

  // Generate output text
  outputText = `Player 2, you chose Dice ${userInput} first. <br> Your number is ${player2Number}. <br><br> Since Player 1's number is ${player1Number}. <br> the winner is ${winnerText}! <br><br> Please click Submit to restart the game.`;

  // Restart the game
  gameMode = GAME_MODE_PLAYER_ONE_ROLL;

  return outputText;
};

// Decide who the winner is (i.e. whose number is higher)
var decideWinner = function () {
  if (player1Number > player2Number) {
    return "Player 1";
  } else {
    return "Player 2";
  }
};

var main = function (input) {
  userInput = input;

  if (gameMode == GAME_MODE_PLAYER_ONE_ROLL) {
    var myOutputValue = playerOneRoll();
  } else if (gameMode == GAME_MODE_PLAYER_ONE_CHOOSE) {
    var myOutputValue = playerOneChoose();
  } else if (gameMode == GAME_MODE_PLAYER_TWO_ROLL) {
    var myOutputValue = playerTwoRoll();
  } else if (gameMode == GAME_MODE_PLAYER_TWO_CHOOSE) {
    var myOutputValue = playerTwoChoose();
  } else {
    var myOutputValue = `SOMETHING WENT WRONG!`;
  }

  return myOutputValue;
};
