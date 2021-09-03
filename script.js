// constants for game modes, number of players, and output strings
const SELECT_MODE = "select";
const NUM_DICE_MODE = "num";
const ROLL_MODE = "roll";
const NUM_PLAYERS = 2;

const INVALID_SELECTION_MSG = `Invalid selection.<br><br>Type 1 for Highest Combined Number mode.<br>Type 2 for Lowest Combined Number mode.`;
const VALID_SELECTION_MSG = `Good choice!<br><br>How many dice do you want to play with?`;
const DICE_INPUT_MSG = "Please input an integer starting from 2.";
const STARTING_GAME_MSG = `Starting game. It is Player 1's turn. Press Submit to roll.`;

// state variables
var curGameMode = SELECT_MODE;
var highestNumberMode = true;
var numDice = 0;
var diceRolls = [];
var curPlayer = 1;
var playerScores = new Array(NUM_PLAYERS).fill(0);

var setNumberMode = function (input) {
  if (input != 1 && input != 2) return INVALID_SELECTION_MSG;
  if (input == 2) {
    highestNumberMode = false;
  }
  curGameMode = NUM_DICE_MODE;
  return VALID_SELECTION_MSG;
};

var setNumberOfDice = function (num) {
  if (!Number.isInteger(Number(num)) || num < 2) return DICE_INPUT_MSG;
  numDice = num;
  curGameMode = ROLL_MODE;
  return STARTING_GAME_MSG;
};

var getDiceNumber = function () {
  // generate random integer from 1 to 6
  return Math.ceil(Math.random() * 6);
};

var getScore = function () {
  // auto calculate score
  highestNumberMode
    ? diceRolls.sort((a, b) => b - a)
    : diceRolls.sort((a, b) => a - b);
  var score = "";
  for (var i = 0; i < diceRolls.length; i += 1) {
    score += diceRolls[i];
  }
  return Number(score);
};

var rollDice = function () {
  var output = `Welcome Player ${curPlayer}.<br>`;

  for (var i = 0; i < numDice; i += 1) {
    var diceRoll = getDiceNumber();
    diceRolls.push(diceRoll);
    output += `You rolled ${diceRoll} for Dice ${i + 1}.<br>`;
  }

  // calculate score for cur player and add to playerScores array
  var score = getScore();
  playerScores[curPlayer - 1] += score;
  diceRolls = [];

  output += `<br>Your number is ${score}.`;
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
  if (curGameMode == SELECT_MODE) return setNumberMode(input);

  if (curGameMode == NUM_DICE_MODE) return setNumberOfDice(input);

  if (curGameMode == ROLL_MODE) return rollDice();
};
