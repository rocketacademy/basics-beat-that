/*
pseudocode

dice rolls:
loop for how many dice rolls are available
for every rolls, push value into an array
return that array, use returned array to format output

score rolls:
take dice roll array as parameter
sort that array, it's fine to use default sort as of now (values are single digits only), highest or lowest
put that and stringify numbers, and add it as a string
change string to number 
push number onto score array

scorechecking:
use max or min function, depending on what dice mode
find index which is max or min
return the index of the winner

knockout game:
at init, randomize 2 players from player array to come out and play
next click is when first player rolls
next click is when the second player rolls
scorecheck the two rolls


standard game:

*/

//global constant initialisation

//mode values
const HIGHEST_MODE = "highest";
const LOWEST_MODE = "lowest";
const STANDARD_MODE = "standard";
const KNOCKOUT_MODE = "knockout";

//return messages
const RESET_MSG = "Game is reset! <br> If you want to play again, press start!";

//global variable initialisation
//values to take from the html
var playerNum = "";
var diceNum = "";
var diceMode = "";
var gameMode = "";

//game array initialisation
var playerArray = [];
var rollArray = [];
var resultArray = [];
var highscoreArray = [];

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

  //added a number in the player array to signify player counter
  //added a 0 in the highscore array to signify highscore
  for (i = 0; i < playerNum; i += 1) {
    playerArray.push(i + 1);
    highscoreArray.push(0);
  }

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

  //changes array length to 0, effectively emptying the array
  playerArray.length = 0;
  rollArray.length = 0;
  resultArray.length = 0;
  highscoreArray.length = 0;

  return RESET_MSG;
};

/***
 * Play a single round of the game, rolls dice according to how much dice are in the game
 * @returns {Array} an array of all the rolls of the round
 */
var playDice = function () {
  var diceRolls = [];
  for (i = 0; i < diceNum; i += 1) {
    diceRolls.push(randomizeDiceRoll());
  }
  return diceRolls;
};

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
