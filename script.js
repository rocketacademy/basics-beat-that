//global constant initialisation
const HIGHEST_MODE = `highest`;
const LOWEST_MODE = `lowest`;
const STANDARD_MODE = `standard`;
const KNOCKOUT_MODE = `knockout`;

//global variable initialisation
var playerNum;
var diceNum;
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

/***
 * initializes game and sets global variables
 * @param {number} playerAmt the amount of players playing the game
 * @param {number} diceAmt the number of dice for the game
 * @param {string} diceSetting the string value of the dice mode (highest/lowest)
 * @param {string} gameSetting the string value of the game mode (standard/knockout)
 * @returns {string} game initialised display
 */
var gameInitialize = function (playerAmt, diceAmt, diceSetting, gameSetting) {
  playerNum = playerAmt;
  diceNum = diceAmt;
  diceMode = diceSetting;
  gameMode = gameSetting;
  return `Game is set: <br> Total Players ${playerNum} <br> Total Dice: ${diceNum} <br> Dice Mode: ${diceMode} <br> Game Mode: ${gameMode}`;
};

/***
 * resets game and erases the values of the global variables
 * @returns {string} game reset display
 */
var gameReset = function () {
  playerNum = "";
  diceNum = "";
  diceMode = "";
  gameMode = "";
  return `Game is reset! <br> If you want to play again, press start!`;
};

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
