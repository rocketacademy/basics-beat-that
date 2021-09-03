// constants for game modes and output strings
const SELECT_NUMBER_MODE = "number";
const SELECT_WINNER_MODE = "winner";
const NUM_PLAYER_MODE = "player";
const NUM_DICE_MODE = "dice";
const ROLL_MODE = "roll";

const NUMBER_MODE_INVALID_MSG = `Invalid selection.<br><br>Type 1 for Highest Combined Number mode.<br>Type 2 for Lowest Combined Number mode.`;
const NUMBER_MODE_VALID_MSG = `Good choice! Now...<br><br>Type 1 for running mode.<br>Type 2 for knockout mode.<br><br>In running mode, the game goes on indefinitely and there is no permanent winner, only a temporary leader.<br><br>In knockout mode, two players will be selected at random and the loser will be eliminated. This goes on until there is one player left, who is the ultimate winner.`;
const WINNER_MODE_INVALID_MSG = `Invalid selection.<br><br>Type 1 for running mode.<br>Type 2 for knockout mode.`;
const WINNER_MODE_VALID_MSG = `Good choice!<br><br>How many players would like to play?`;
const INPUT_DICE_MSG = "How many dice would you like to play with?";
const NUM_PLAYER_INPUT_MSG = "Please input an integer starting from 2.";
const NUM_DICE_INPUT_MSG = "Please input an integer starting from 2.";
const STARTING_GAME_MSG = `Starting game. It is Player 1's turn. Press Submit to roll.`;

// state variables
var curGameMode = SELECT_NUMBER_MODE;
var highestNumberMode = true;
var knockoutMode = false;
var numDice = 0;
var diceRolls = [];
var curPlayer = 1;
var numPlayers = 0;
var playerScores = [];

// knockout mode state variables
var playerChoices = [];
var players = [];
var scores = [];
var playerIndex = 0;

var setNumberMode = function (input) {
  // set highest combined number mode or lowest combined number mode, and return msg with instructions
  if (input != 1 && input != 2) return NUMBER_MODE_INVALID_MSG;
  if (input == 2) {
    highestNumberMode = false;
  }
  curGameMode = SELECT_WINNER_MODE;
  return NUMBER_MODE_VALID_MSG;
};

var setWinnerMode = function (input) {
  // set running mode or knockout mode, return msg with instructions
  if (input != 1 && input != 2) return WINNER_MODE_INVALID_MSG;
  if (input == 2) {
    knockoutMode = true;
  }
  curGameMode = NUM_PLAYER_MODE;
  return WINNER_MODE_VALID_MSG;
};

var setNumberOfPlayers = function (num) {
  // set number of players, return msg with instructions
  if (!Number.isInteger(Number(num)) || num < 2) return NUM_PLAYER_INPUT_MSG;
  numPlayers = Number(num);
  playerScores = new Array(numPlayers).fill(0); // create a playerScores array with numPlayers elements all set to 0

  if (knockoutMode) {
    // fill the playerChoices array with the player nums which will be used in gameplay later
    for (var i = 1; i <= numPlayers; i += 1) {
      playerChoices.push(i);
    }
  }
  curGameMode = NUM_DICE_MODE;
  return INPUT_DICE_MSG;
};

var setNumberOfDice = function (num) {
  // set number of dice, return msg with instructions which will vary depending on running/knockout mode
  if (!Number.isInteger(Number(num)) || num < 2) return NUM_DICE_INPUT_MSG;
  numDice = num;
  curGameMode = ROLL_MODE;
  return knockoutMode ? randomSelectTwoPlayers() : STARTING_GAME_MSG;
};

var getDiceRolls = function () {
  // generate a player's dice rolls and store it in diceRolls array, output msg for each roll
  var rolls = "";
  for (var i = 0; i < numDice; i += 1) {
    var diceRoll = Math.ceil(Math.random() * 6);
    diceRolls.push(diceRoll);
    rolls += `You rolled ${diceRoll} for Dice ${i + 1}.<br>`;
  }
  return rolls;
};

var getScore = function () {
  // auto calculate score
  // sort by ascending or descending depending on the number mode
  if (highestNumberMode) diceRolls.sort((a, b) => b - a);
  else diceRolls.sort((a, b) => a - b);

  var score = "";
  for (var i = 0; i < diceRolls.length; i += 1) {
    // use the sorted dicerolls array to concatenate each roll to a string
    score += diceRolls[i];
  }
  return Number(score);
};

var getWinningScore = function (scoresArr) {
  return highestNumberMode ? Math.max(...scoresArr) : Math.min(...scoresArr);
};

var generateEndTurnOutput = function () {
  // upon each player having rolled dice, output each player's number and the leader
  var output = "<br><br>";
  for (var j = 0; j < playerScores.length; j++) {
    output += `Player ${j + 1}'s number is ${playerScores[j]}.<br>`;
  }
  var winningScore = getWinningScore(playerScores);
  var winner = playerScores.indexOf(winningScore) + 1;
  output += `The current leader is Player ${winner}!`;
  return output;
};

var playRunningMode = function () {
  var output = `Welcome Player ${curPlayer}.<br>`;

  output += getDiceRolls();

  // calculate score for cur player and add to playerScores array
  var score = getScore();
  playerScores[curPlayer - 1] += score;
  diceRolls = [];

  output += `<br>Your number is ${score}.`;
  curPlayer += 1; // next player
  if (curPlayer > numPlayers) curPlayer = 1; // go back to player 1
  output += `<br>It is now Player ${curPlayer}'s turn.`;
  output += generateEndTurnOutput();
  return output;
};

var randomSelectTwoPlayers = function () {
  var playerOne;
  var playerTwo;
  // generate two random unique players from playerChoices and store them in players array
  playerOne = playerChoices[Math.floor(Math.random() * playerChoices.length)];
  do {
    playerTwo = playerChoices[Math.floor(Math.random() * playerChoices.length)];
  } while (playerOne == playerTwo);
  players = [playerOne, playerTwo];

  return `Player ${playerOne} and Player ${playerTwo} are selected to play. Player ${playerOne}, press submit to roll.`;
};

var generateEndKnockoutRoundOutput = function () {
  var output = `<br><br>`;
  for (var j = 0; j < players.length; j++) {
    output += `Player ${players[j]}'s number is ${scores[j]}.<br>`;
  }
  var winningScore = getWinningScore(scores);
  var winner = players[scores.indexOf(winningScore)];
  var loser = players[1 - scores.indexOf(winningScore)];
  output += `The winner is player ${winner}!`;
  playerChoices = playerChoices.filter((x) => x != loser); // remove loser from playerchoices
  playerIndex = 0;
  players = [];
  scores = [];

  if (playerChoices.length == 1) {
    // knockout game over, there is a winner
    output += `<br><br>After a long fought battle, the ultimate winner of the knockout round is player ${playerChoices[0]}! Congratulations!`;
    output += `<br><br>To start a new game:<br>Type 1 for Highest Combined Number mode.<br>Type 2 for Lowest Combined Number mode.`;
    curGameMode = SELECT_NUMBER_MODE;
    playerChoices = [];
  } else {
    output += `<br><br>Remaining players: ${playerChoices}`;
  }
  return output;
};

var playKnockoutMode = function () {
  curPlayer = players[playerIndex];
  var output = `Welcome Player ${curPlayer}.<br>`;

  output += getDiceRolls();

  // calculate score for cur player and add to scores array
  var score = getScore();
  scores.push(score);
  diceRolls = [];

  output += `<br>Your number is ${score}.`;

  if (playerIndex < players.length - 1) {
    playerIndex += 1; // next player
    output += `<br>It is now Player ${players[playerIndex]}'s turn.`;
  } else {
    output += generateEndKnockoutRoundOutput();
  }
  return output;
};

var main = function (input) {
  if (curGameMode == SELECT_NUMBER_MODE) return setNumberMode(input);

  if (curGameMode == SELECT_WINNER_MODE) return setWinnerMode(input);

  if (curGameMode == NUM_PLAYER_MODE) return setNumberOfPlayers(input);

  if (curGameMode == NUM_DICE_MODE) return setNumberOfDice(input);

  if (curGameMode == ROLL_MODE) {
    if (!knockoutMode) return playRunningMode();
    if (players.length == 0) return randomSelectTwoPlayers();
    return playKnockoutMode();
  }
};
