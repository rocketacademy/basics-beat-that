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
var player1NumberList = [];
var player1Score = 0;
var player2DiceRolls = [];
var player2Number = 0;
var player2NumberList = [];
var player2Score = 0;
var diceIndex = 0;

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
  }

  // User makes a choice
  if (userInput == 1) {
    player1Number = Number(
      String(player1DiceRolls[diceIndex]) +
        String(player1DiceRolls[diceIndex + 1])
    );
  } else {
    player1Number = Number(
      String(player1DiceRolls[diceIndex + 1]) +
        String(player1DiceRolls[diceIndex])
    );
  }

  // Add number result to array
  player1NumberList.push(player1Number);

  // Generate score
  player1Score = generateScore(player1NumberList);

  // Sort the player's numbers in decreasing order
  player1NumberList.sort(function (a, b) {
    return b - a;
  });

  // Generate output text
  outputText = `Player 1, you chose Dice ${userInput} first. <br> Your number is ${player1Number}. <br> Your number(s) generated so far: ${player1NumberList}. <br> Your score is ${player1Score}. <br> It is now Player 2's turn.`;

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
      String(player2DiceRolls[diceIndex]) +
        String(player2DiceRolls[diceIndex + 1])
    );
  } else {
    player2Number = Number(
      String(player2DiceRolls[diceIndex + 1]) +
        String(player2DiceRolls[diceIndex])
    );
  }

  // Add number result to array
  player2NumberList.push(player2Number);

  // Generate score
  player2Score = generateScore(player2NumberList);

  // Decide who the winner
  var winnerText = decideWinnerByScore();

  // Sort the player's numbers in decreasing order
  player2NumberList.sort(function (a, b) {
    return b - a;
  });

  // Generate output text
  // Include leaderboard that lists the 2 players and their scores in decreasing order
  outputText = `Player 2, you chose Dice ${userInput} first. <br> Your number is ${player2Number}. <br><br> LEADERBOARD <br><br> Player 1 - Scores: ${player1NumberList} <br> Player 1 - Total Score: ${player1Score} <br><br> Player 2 - Scores: ${player2NumberList} <br> Player 2 - Total Score: ${player2Score} <br><br> The Leader: ${winnerText} <br><br> Please click 'Submit' to play again.`;

  // Restart the game or play again
  gameMode = GAME_MODE_PLAYER_ONE_ROLL;

  // Update dice index count
  diceIndex += 2;

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

// Decide who the temporary leader is by score
var decideWinnerByScore = function () {
  if (player1Score > player2Score) {
    return "Player 1";
  } else {
    return "Player 2";
  }
};

// Generate score - running sum of all numbers that player has generated so far
var generateScore = function (array) {
  var score = 0;
  var index = 0;
  while (index < array.length) {
    score = score + array[index];
    index += 1;
  }
  return score;
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
