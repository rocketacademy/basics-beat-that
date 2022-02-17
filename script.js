//global constant initialisation
const HIGHEST_MODE = `highest`;
const LOWEST_MODE = `lowest`;
const STANDARD_MODE = `standard`;
const KNOCKOUT_MODE = `knockout`;

//global variable initialisation
var playerRolls = [];
var playerNumber;
var diceNumber;
var diceMode;
var gameMode;
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
