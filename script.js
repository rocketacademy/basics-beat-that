//global constant initialisation
const HIGHEST_MODE = `highest mode`;
const LOWEST_MODE = `lowest mode`;
const STANDARD_MODE = `Standard`;
const KNOCKOUT_MODE = `Knockout`;

//global variable initialisation
var playerRolls = [];
var playerNumber = 0;
var diceNumber = 2;
var diceMode = ``;
var gameMode = ``;
var currentPlayers = [];

//helper function initialisation

/***
 * simulates a dice roll
 * @returns {number} a random number between 1-6
 */
var randomizeDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var main = function (input) {
  var blorp = "";
  var myOutputValue = "hello world";
  return myOutputValue;
};
