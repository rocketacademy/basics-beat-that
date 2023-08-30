var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_DICE_ORDER = "GAME_STATE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORE = "GAME_STATE_COMPARE_SCORE";
var modes = GAME_STATE_DICE_ROLL;
var playerRolls = [];
var currentPlayer = 1;
var trackScore = [];

// generate a random integer between 1 to 6
var randomInteger = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var randomDiceRoll = function () {
  playerRolls = [];
  var counter = 0;
  while (counter < 2) {
    var diceRoll = randomInteger();
    playerRolls.push(diceRoll);
    counter += 1;
  }
  return `welcome player ${currentPlayer}. <br><br> you rolled ${playerRolls[0]} for dice 1 and ${playerRolls[1]} for dice 2. <br><br> choose the order of the dice by inputting "1" or "2".`;
};

var numberComparison = function (playerInput) {
  var combinedNumber = "";
  if (playerInput == 1) {
    combinedNumber = Number(String(playerRolls[0]) + String(playerRolls[1]));
  }
  if (playerInput == 2) {
    combinedNumber = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }
  trackScore.push(combinedNumber);
  playerRolls = [];
  return `player ${currentPlayer} chose dice ${playerInput} first. <br><br> your combined number is ${combinedNumber}.<br><br>`;
};

var compareScore = function () {
  var myOutputValue = `player 1 score: ${trackScore[0]} | player 2 score: ${trackScore[1]}.<br>`;
  if (trackScore[0] > trackScore[1]) {
    myOutputValue = `${myOutputValue} <br> player 1 wins.`;
  }
  if (trackScore[0] < trackScore[1]) {
    myOutputValue = `${myOutputValue} <br> player 2 wins.`;
  }
  if (trackScore[0] == trackScore[1]) {
    myOutputValue = `${myOutputValue} <br> draw game. `;
  }
  return `${myOutputValue} <br><br> ${gameResetAlert()}`;
};

var gameReset = function () {
  currentPlayer = 1;
  modes = GAME_STATE_DICE_ROLL;
  trackScore = [];
};

var gameResetAlert = function () {
  return `click on "Submit" to play again.`;
};

var baseGameBeatThat = function (playerInput) {
  var myOutputValue = "";
  if (modes == GAME_STATE_DICE_ROLL) {
    myOutputValue = randomDiceRoll();
    modes = GAME_STATE_DICE_ORDER;
    return myOutputValue;
  }
  if (modes == GAME_STATE_DICE_ORDER) {
    if (playerInput != 1 && playerInput != 2) {
      return `error message. <br><br>  you rolled ${playerRolls[0]} for dice 1 and ${playerRolls[1]} for dice 2. <br><br> choose the order of the dice as the first numeral of the combined number.`;
    }
    myOutputValue = numberComparison(playerInput);
    if (currentPlayer == 1) {
      currentPlayer = 2;
      modes = GAME_STATE_DICE_ROLL;
      return `${myOutputValue} player 2's turn.`;
    }
    if (currentPlayer == 2) {
      modes = GAME_STATE_COMPARE_SCORE;
    }
    return `${myOutputValue} calculating scores . . . <br><br> click on "Submit" to continue.`;
  }
  if (modes == GAME_STATE_COMPARE_SCORE) {
    myOutputValue = compareScore();
    gameReset();
    return myOutputValue;
  }
};

var main = function (input) {
  return baseGameBeatThat(input);
};
