// game mode
var gameMode1 = `user roll dice`;
var gameMode2 = `user choose dice`;
var gameMode = gameMode1;

// player mode
var playerTurn1 = `Player 1`;
var playerTurn2 = `Player 2`;
var playerTurn = playerTurn1;

// player dice array
var player1 = [];
var player2 = [];

// chosen numbers
var player1ChosenNo = ``;
var player2ChcosenNo = ``;

// number generator. 1 - 6
var genDiceRoll = function () {
  return Math.floor(Math.random() * 7);
};

// return two dice rolls
var genTwoDiceRolls = function () {
  var twoDiceNum = [genDiceRoll(), genDiceRoll()];

  if (playerTurn == playerTurn1) {
    player1 = twoDiceNum;
  } else {
    player2 = twoDiceNum;
  }

  return twoDiceNum;
};

var main = function (input) {
  var numberOrder = ``;

  if (gameMode == gameMode1) {
    var diceRoll = genTwoDiceRolls();
    gameMode == gameMode2;
    return `${playerTurn} <br><br> Dice numbers: ${diceRoll}. <br><br> Please choose the order of dice by entering 1 or 2.`;
  }

  if (gameMode == gameMode2) {
    var numberOrder = Number(input);
    player1ChosenNo = Number(player1[1], player1[0]);
    gameMode = gameMode1;
    playerTurn = playerTurn2;
  }
};
