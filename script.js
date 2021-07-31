// Game modes
var gameModeDiceRoll = "game mode dice roll";
var gameModeChooseDice = "game mode choose dice";

var gameMode = gameModeDiceRoll;

// generate dice number from 1-6
var diceRoll = function () {
  var randomDiceRoll = Math.ceil(Math.random() * 6);
  return randomDiceRoll;
};

// player to get random number
var playerOne = [diceRoll(), diceRoll()];

var playerTwo = [diceRoll(), diceRoll()];

// Game mode 2

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
