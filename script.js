// constants for game modes, number of players, and output strings
const SELECT_MODE = "select";
const ROLL_MODE = "roll";
const NUM_PLAYERS = 2;

const INVALID_SELECTION_MSG = `Invalid selection.<br><br>Type 1 for Highest Combined Number mode.<br>Type 2 for Lowest Combined Number mode.`;
const VALID_SELECTION_MSG = `Good choice!<br><br>It is Player 1's turn. Press Submit to roll.`;

// state variables
var curGameMode = SELECT_MODE;
var highestNumberMode = true;
var diceRoll1 = 0;
var diceRoll2 = 0;
var curPlayer = 1;
var playerScores = new Array(NUM_PLAYERS).fill(0);

var getDiceNumber = function () {
  // generate random integer from 1 to 6
  return Math.ceil(Math.random() * 6);
};

var getScore = function (firstDie) {
  // auto calculate score
  var max = Math.max(diceRoll1, diceRoll2);
  var min = Math.min(diceRoll1, diceRoll2);
  return highestNumberMode ? max * 10 + min : min * 10 + max;
};

var rollDice = function () {
  diceRoll1 = getDiceNumber();
  diceRoll2 = getDiceNumber();

  // calculate score for cur player and add to playerScores array
  var score = getScore(diceRoll1, diceRoll2);
  playerScores[curPlayer - 1] += score;

  var output = `Welcome Player ${curPlayer}.<br>You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br><br>Your number is ${score}.`;
  curPlayer += 1;
  if (curPlayer > NUM_PLAYERS) curPlayer = 1;
  output += `<br>It is now Player ${curPlayer}'s turn.`;
  output += generateEndTurnOutput();
  return output;
};

var resetGameState = function () {
  // helper function to reset game state when one game ends
  curGameMode = ROLL_MODE;
  curPlayer = 1;
  playerScores = [];
};

var generateEndTurnOutput = function () {
  // upon each player having rolled dice and chose their order, output each player's number and the winner
  var output = "<br><br>";
  for (var j = 0; j < playerScores.length; j++) {
    output += `Player ${j + 1}'s score is ${playerScores[j]}.<br>`;
  }
  var winningScore = highestNumberMode
    ? Math.max(...playerScores)
    : Math.min(...playerScores);
  var winner = playerScores.indexOf(winningScore) + 1;
  output += `The current leader is Player ${winner}!`;
  return output;
};

var main = function (input) {
  if (curGameMode == SELECT_MODE) {
    if (input != 1 && input != 2) return INVALID_SELECTION_MSG;
    if (input == 2) {
      highestNumberMode = false;
    }
    curGameMode = ROLL_MODE;
    return VALID_SELECTION_MSG;
  }

  if (curGameMode == ROLL_MODE) return rollDice();
};
