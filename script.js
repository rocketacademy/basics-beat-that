/*

hey added a comment

dice rolls:
loop for how many dice rolls are available - done
for every rolls, push value into an array - done
return that array, use returned array to format output - done

score rolls:
take dice roll array as parameter - done
sort that array, it's fine to use default sort as of now (values are single digits only), highest or lowest - done
put that and stringify numbers, and add it as a string - done
change string to number - done
push number onto score array - done

standard game:
at init, default to player 1 to play the next round - done
next click is when first player rolls - done
following clicks after that is when the other players roll - done
scorecheck all rolls - done
highest/lowest number wins, add into highscore array - done

scorechecking:
use max or min function, depending on what dice mode - done
find index which is max or min - done
return the index of the winner - done

knockout game:
at init, randomize 2 players from player array to come out and play
next click is when first player rolls
next click is when the second player rolls
scorecheck the two rolls
kick losing player off the player list
randomize another pair of players to play

*/

//global constant initialisation

//mode values
const HIGHEST_MODE = "highest";
const LOWEST_MODE = "lowest";
const STANDARD_MODE = "standard";
const KNOCKOUT_MODE = "knockout";
const NEW_MODE = "new mode";

//return messages
const RESET_MSG = "Game is reset! <br> If you want to play again, press start!";

//global variable initialisation
//values to take from the html
var playerNum = "";
var diceNum = "";
var diceMode = "";
var gameMode = "";

//game variable initialisation
var currentPlayer;

//game array initialisation
var playerArray = [];
var resultArray = [];
var highScoreArray = [];

//knockout mode array initialisation
var knockoutPlayers = [];
var currentKnockoutRound = [];

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

  var initializeOutput = `It's time to play ${gameMode} Beat That!<br><br> 
  We have ${playerNum} Players, and ${diceNum} Dice!<br>
  We determine that ${diceMode} Wins!<br>`;

  //added a number in the player array to signify player counter
  //added a 0 in the highscore array to signify highscore
  //added a 0/Infinity in the result array to symbolise the current roll score, for sorting purposes when playing knockout mode
  for (i = 0; i < playerNum; i += 1) {
    playerArray.push(i + 1);
    highScoreArray.push(0);
    if (gameMode == KNOCKOUT_MODE && diceMode == HIGHEST_MODE)
      resultArray.push(Infinity);
    else resultArray.push(0);
  }

  //sets the current player
  if (gameMode == STANDARD_MODE) currentPlayer = playerArray[0];
  // a little bit more setup required for knockout round
  else {
    knockoutPlayers = playerArray.slice();
    currentKnockoutRound = randomizeCurrentKnockoutRound();
    currentPlayer = currentKnockoutRound[0];
    initializeOutput += `It's ${currentKnockoutRound[0]} and ${currentKnockoutRound[1]}'s time to battle!<br>`;
  }

  initializeOutput += `It's now Player ${currentPlayer}'s Turn!`;

  return initializeOutput;
};

/***
 * resets Result array to their default values (0 or Infinity) all round
 * @returns {null}
 */
var resetResultArray = function () {
  for (var i = 0; i < resultArray.length; i += 1) {
    if (diceMode == HIGHEST_MODE && gameMode == KNOCKOUT_MODE)
      resultArray[i] = Infinity;
    else resultArray[i] = 0;
  }
  return;
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
  currentPlayer = "";

  //changes array length to 0, effectively emptying the array
  playerArray.length = 0;
  resultArray.length = 0;
  highScoreArray.length = 0;

  return RESET_MSG;
};

/***
 * Play a roll of the game, rolls dice according to how much dice are in the game
 * @returns {Array} an array of all the rolls of the player
 */
var rollDice = function () {
  var diceRolls = [];
  for (i = 0; i < diceNum; i += 1) {
    diceRolls.push(randomizeDiceRoll());
  }
  return diceRolls;
};

/***
 * displays all rolls the player has made and format it
 * @param {Array} diceRollArray the dice rolled for the player
 * @returns {string} player roll display
 *
 */
var scoreRolls = function (diceRollArray) {
  var rollDisplay = "";
  for (var i = 0; i < diceRollArray.length; i += 1) {
    rollDisplay += `Dice ${i + 1}: ${diceRollArray[i]}<br>`;
  }

  //sorting the array, normal string sort can be applied because values are only single digit
  //if playing with a dice of more than 2 digits, need to update this code with a compare function
  //this will sort smallest to biggest number
  diceRollArray.sort();
  //reverses the array if it's playing the highest mode, hence biggest to smallest
  if (diceMode == HIGHEST_MODE) diceRollArray.reverse();

  var playerScore = "";

  //string variable does not add the numbers, it concactenates the string
  for (var i = 0; i < diceRollArray.length; i += 1) {
    playerScore += String(diceRollArray[i]);
  }

  //assigns the current player's score to the resultArray, storing them as numbers
  var currentPlayerIndex = playerArray.indexOf(currentPlayer);
  resultArray[currentPlayerIndex] = Number(playerScore);

  rollDisplay += `<br> The ${diceMode} possible score is ${playerScore}`;

  return rollDisplay;
};

/***
 * Plays standard game and it goes on every single time the function is triggered
 * @returns {string} Result of the current roll for output
 */
var playStandardGame = function () {
  var outputMsg = `Player ${currentPlayer} has thrown the dice! <br><br>`;
  var currentPlayerRoll = rollDice();

  outputMsg += scoreRolls(currentPlayerRoll);

  //initialize next Player's index
  var nextPlayerIndex = playerArray.indexOf(currentPlayer) + 1;

  //if next player's index is still within the array range, assign the next player as the current player
  if (nextPlayerIndex < playerArray.length) {
    currentPlayer = playerArray[nextPlayerIndex];
    outputMsg += `<br><br> It's Player ${currentPlayer}'s turn now!`;
    return outputMsg;
  }

  //if it's not within the array range, means all player has taken a turn, output will reflect who win
  var winningPlayerScore = Math.max(...resultArray);
  if (diceMode == LOWEST_MODE) winningPlayerScore = Math.min(...resultArray);

  var winningPlayerIndex = resultArray.indexOf(winningPlayerScore);

  outputMsg += `<br><br>With a score of ${resultArray[winningPlayerIndex]}, Player ${playerArray[winningPlayerIndex]} Wins this round!<br><br>`;

  //win state, add the highscore of the winning player
  highScoreArray[winningPlayerIndex] += 1;

  outputMsg += leaderboardDisplay();

  //reset resultArray
  resetResultArray();

  //also resets current player to be index 0
  currentPlayer = playerArray[0];

  outputMsg += `<br><br> Press roll dice to start a new round! It's Player ${currentPlayer}'s turn now!`;

  return outputMsg;
};

/***
 * Outputs the current leaderboard string.
 * @returns {string} the leaderboard win string for display
 */
var leaderboardDisplay = function () {
  //initialise leaderboard string
  var leaderboardString = "Current Leaderboard:<br><br>";

  //copying highscore array to manipulate stuff slice is used to make new objects in the array
  var leaderboardArray = highScoreArray.slice();

  var highestScore = 0;

  for (var i = 0; i < leaderboardArray.length; i += 1) {
    var highestScore = Math.max(...leaderboardArray);
    var highestScoreIndex = leaderboardArray.indexOf(highestScore);
    leaderboardString += `Player ${playerArray[highestScoreIndex]}: ${leaderboardArray[highestScoreIndex]} wins<br>`;

    //-1 will ensure the score is not called again
    leaderboardArray[highestScoreIndex] = -1;
  }
  //deletes the leaderboardArray,
  leaderboardArray.length = 0;

  return leaderboardString;
};

var playKnockoutGame = function () {
  var outputMsg = `Player ${currentPlayer} has thrown the dice! <br><br>`;
  var currentPlayerRoll = rollDice();
  outputMsg += scoreRolls(currentPlayerRoll);

  //if the next player is still available
  var nextPlayerIndex = currentKnockoutRound.indexOf(currentPlayer) + 1;
  if (nextPlayerIndex < currentKnockoutRound.length) {
    currentPlayer = currentKnockoutRound[nextPlayerIndex];
    outputMsg += `<br><br> It's Player ${currentPlayer}'s turn now!`;
    return outputMsg;
  }

  //else it's deliberation mode, which player will be knocked out
  var losingPlayerScore = Math.min(...resultArray);
  if (diceMode == LOWEST_MODE) losingPlayerScore = Math.max(...resultArray);

  //this takes the index from the playerarray
  var losingPlayerIndexFromPlayerArray = resultArray.indexOf(losingPlayerScore);

  //what we need is to take the index from knockoutPlayers array
  var losingPlayerIndexFromKnockoutArray = knockoutPlayers.indexOf(
    playerArray[losingPlayerIndexFromPlayerArray]
  );

  //now we remove the player from the knockoutPlayers array, and update the output msg
  outputMsg += `<br><br>With a score of ${resultArray[losingPlayerIndexFromPlayerArray]}, Player ${playerArray[losingPlayerIndexFromPlayerArray]} is Eliminated!<br><br>`;

  knockoutPlayers.splice(losingPlayerIndexFromKnockoutArray, 1);

  //meaning there's only 1 player left from the knockoutplayers array, i.e. we've found a winner!
  if (knockoutPlayers.length == 1) {
    outputMsg += `Congratulations, Player ${knockoutPlayers[0]}! You win this knockout round!<br><br>`;
    var winningPlayerIndex = playerArray.indexOf(knockoutPlayers[0]);

    //add leaderboard score
    highScoreArray[winningPlayerIndex] += 1;
    outputMsg += leaderboardDisplay();

    //resets the arrays
    knockoutPlayers = playerArray.slice();
    outputMsg += `Press roll dice to start a new knockout round!<br><br>`;
  }

  //resets result array every time someone won
  resetResultArray();
  currentKnockoutRound = randomizeCurrentKnockoutRound();
  currentPlayer = currentKnockoutRound[0];
  outputMsg += `It's ${currentKnockoutRound[0]} and ${currentKnockoutRound[1]}'s time to battle!<br>`;
  outputMsg += `It's Player ${currentPlayer}'s turn now!`;
  return outputMsg;
};

/***
 * randomizes the two players selected for knockout game
 * @returns {Array} 2 players that are in the knockout game, in an array
 */
var randomizeCurrentKnockoutRound = function () {
  if (knockoutPlayers.length > 1) {
    var randomizedP1Index = Math.floor(Math.random() * knockoutPlayers.length);
    var randomizedP2Index = Math.floor(Math.random() * knockoutPlayers.length);
    while (randomizedP1Index == randomizedP2Index) {
      randomizedP2Index = Math.floor(Math.random() * knockoutPlayers.length);
    }
    var player1 = knockoutPlayers[randomizedP1Index];
    var player2 = knockoutPlayers[randomizedP2Index];
    return [player1, player2];
  }
  //this shouldn't really happen
  return [0, 0];
};

var main = function () {
  var myOutputValue;
  if (gameMode == STANDARD_MODE) myOutputValue = playStandardGame();
  else myOutputValue = playKnockoutGame();
  return myOutputValue;
};
