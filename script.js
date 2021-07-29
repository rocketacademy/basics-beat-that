/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NORMAL = "normal";
var LOWEST = "lowest";
var KNOCKOUT = "knockout";

/**
 * ------------------------------------------------------------------------
 * Global Variables
 * ------------------------------------------------------------------------
 */

var gameMode = NORMAL;
var numOfPlayers = 2;
var roundBoard = []; // Holds the scores for each round
var winner;
var leaderBoard = []; // Holds the scores across rounds
var numOfDice = 2;
var diceRolls = [];

/**
 * ------------------------------------------------------------------------
 * Helper Functions
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Updates the round board and leader board
 * @param   {Number}  playerNum   The number of the player.
 * @param   {Number}  playerScore The score of the player.
 * ------------------------------------------------------------------------
 */

function updatePlayerBoards(playerNum, playerScore) {
  roundBoard.push(playerScore);
  leaderBoard.find(
    ({ playerNumber }) => playerNumber === Number(playerNum) + 1
  ).score += playerScore;
}

/**
 * ------------------------------------------------------------------------
 * JavaScript does not have in-built functions for numeric sort in an array.
 * These two functions sort the leader board in ascending or descending order.
 * ------------------------------------------------------------------------
 */

function sortLeaderBoardDescend() {
  leaderBoard.sort((a, b) => b.score - a.score);
}

function sortLeaderBoardAscend() {
  leaderBoard.sort((a, b) => a.score - b.score);
}

/**
 * ------------------------------------------------------------------------
 * Get a random number for a die roll.
 * @return  {Number}  dieNumber   A random integer from 1 to 6.
 * ------------------------------------------------------------------------
 */
function rollDie() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var dieNumber = randomInteger + 1;
  return dieNumber;
}

/**
 * ------------------------------------------------------------------------
 * Generate dice rolls based on the number of dice and saves the rolls in an array.
 * @param   {Number}    numOfDice   The number of dice chosen by player.
 * ------------------------------------------------------------------------
 */
function getDiceRolls(numOfDice) {
  for (var counter = 0; counter < numOfDice; counter += 1) {
    diceRolls.push(rollDie());
  }
}

/**
 * ------------------------------------------------------------------------
 * JavaScript does not have in-built functions for getting the max. or min. in an array.
 * These two functions return the index of the max. or min. element in an array.
 * @param   {Array}   array   The array to iterate through.
 * @return  {Number}          The index of the element that is the max. or min.
 * ------------------------------------------------------------------------
 */

function getMaxOfArray(array) {
  var max = Math.max.apply(null, array);
  return array.indexOf(max);
}

function getMinOfArray(array) {
  var min = Math.min.apply(null, array);
  return array.indexOf(min);
}

/**
 * ------------------------------------------------------------------------
 * Auto generates the optimal combination depending on the mode.
 * Identify biggest or smallest number in dice rolls.
 * Add number to combination and remove that number from dice rolls using splice().
 * Repeat until there are no more numbers in dice rolls.
 * @return {Number} The optimal combination of dice depending on the mode.
 * ------------------------------------------------------------------------
 */

function generateCombi() {
  combination = "";
  for (var counter = 0; counter < numOfDice; counter += 1) {
    if (gameMode == NORMAL || gameMode == KNOCKOUT) {
      var max = getMaxOfArray(diceRolls);
      combination += String(diceRolls[max]);
      diceRolls.splice(max, 1);
    } else {
      var min = getMinOfArray(diceRolls);
      combination += String(diceRolls[min]);
      diceRolls.splice(min, 1);
    }
  }
  return Number(combination);
}

/**
 * ------------------------------------------------------------------------
 * Play Beat That.
 * Generate dice rolls.
 * Update the boards with the optimal combination.
 * Sort the leader board according to mode.
 * ------------------------------------------------------------------------
 */

function playBeatThat() {
  for (var counter = 0; counter < numOfPlayers; counter += 1) {
    getDiceRolls(numOfDice);
    updatePlayerBoards(counter, generateCombi());
  }
  if (gameMode == NORMAL) {
    sortLeaderBoardDescend();
  } else {
    sortLeaderBoardAscend();
  }
}

/**
 * ------------------------------------------------------------------------
 * Gets a random player from an array.
 * @param   {Array}     array         The array to take players out from.
 * @return  {Object}    playerObject  Object that contains player number and score.
 * ------------------------------------------------------------------------
 */

function getRandomPlayer(array) {
  var randomDecimal = Math.random() * array.length;
  var randomInteger = Math.floor(randomDecimal);
  return array.splice(randomInteger, 1)[0];
}

/**
 * ------------------------------------------------------------------------
 * Knockout Beat That
 * Get random player from holding board into knockout board.
 * Let the two players in the knockout board fight before eliminating the first runner-up.
 * Reset the defending player's score.
 * Repeat until all players have battled.
 * @return  {String}  Outcome for all players and the ultimate winner.
 * ------------------------------------------------------------------------
 */

function playKnockout() {
  var outputMessage = "";
  var holdingBoard = [];
  var knockoutBoard = []; // Where players battle it out

  // Create holding board containing all players
  for (var counter = 1; counter <= Number(numOfPlayers); counter += 1) {
    holdingBoard.push({ playerNumber: counter, score: 0 });
  }

  // Put in 1 player into knockout board
  knockoutBoard.push(getRandomPlayer(holdingBoard));

  // Number of rounds to be played is 1 fewer than number of players
  for (
    var holdingCounter = 1;
    holdingCounter < numOfPlayers;
    holdingCounter += 1
  ) {
    // Put in 1 more player into knockout board
    knockoutBoard.push(getRandomPlayer(holdingBoard));

    // Get the combinations for each player in the knockout board
    for (player in knockoutBoard) {
      getDiceRolls(numOfDice);
      knockoutBoard[player].score += generateCombi();
    }

    // Sort the knockout board scores in descending order
    knockoutBoard.sort((a, b) => b.score - a.score);

    outputMessage += `Round ${holdingCounter}: Player ${knockoutBoard[0].playerNumber} (${knockoutBoard[0].score}) VS. Player ${knockoutBoard[1].playerNumber} (${knockoutBoard[1].score})<br>Player ${knockoutBoard[0].playerNumber} stays while Player ${knockoutBoard[1].playerNumber} is out of the competition!<br><br>`;

    // Remove player that lost
    knockoutBoard.pop();

    // Reset defending player's score
    knockoutBoard[0].score = 0;
  }

  outputMessage += `👑 After ${numOfPlayers - 1} exciting rounds, Player ${
    knockoutBoard[0].playerNumber
  } is the ultimate winner! 👑`;
  return outputMessage;
}

/**
 * ------------------------------------------------------------------------
 * Identifies winner depending on mode.
 * Generates output message and leaderboard.
 * @return {String}           The output message and leader board.
 * ------------------------------------------------------------------------
 */
function generateOutputMessage() {
  var message =
    "All players have played, here are the results for this round!<br>";
  for (player in roundBoard) {
    message += `Player ${Number(player) + 1} got ${roundBoard[player]}.<br>`;
  }
  var winner = getMaxOfArray(roundBoard) + 1;
  if (gameMode == LOWEST) {
    winner = getMinOfArray(roundBoard) + 1;
  }
  message += `The winner is Player ${winner}!<br>`;
  message += `🏆 Leader Board 🏆<br>`;
  for (var counter = 0; counter < numOfPlayers; counter += 1) {
    message += `Player ${leaderBoard[counter].playerNumber}: ${leaderBoard[counter].score}<br>`;
  }
  roundBoard = [];
  return message;
}

/**
 * ------------------------------------------------------------------------
 * Main
 * @param   {Number}  players   The number of players.
 * @param   {Number}  dice      The number of dice
 * @param   {String}  mode      The game mode for Beat That.
 * @return  {String}            The outcome and scoreboard.
 * ------------------------------------------------------------------------
 */

function main(players, dice, mode) {
  gameMode = mode;

  // Input validation for number of players
  if (isNaN(Number(players))) {
    return `Please enter a valid number.`;
  } else if (Number(players) < 3 && gameMode == KNOCKOUT) {
    // Ensure that there is a minimum number of 3 players for knockout
    return `For Knockout mode, 3 or more players are needed to play.`;
  } else {
    numOfPlayers = Number(players);
  }

  // Input validation for number of dice
  if (isNaN(Number(dice)) || Number(dice) < 2) {
    return `Please enter 2 or more for the number of dice.`;
  } else {
    numOfDice = Number(dice);
  }

  // Generate leader board with objects representing players
  if (leaderBoard.length != numOfPlayers) {
    // Resets leader board if there is a change in the number of players
    leaderBoard = [];
    for (var counter = 1; counter <= numOfPlayers; counter += 1) {
      leaderBoard.push({ playerNumber: counter, score: 0 });
    }
  }

  // Implement different modes depending on input
  switch (gameMode) {
    case NORMAL:
    case LOWEST:
      playBeatThat();
      break;
    case KNOCKOUT:
      return playKnockout();
  }

  return generateOutputMessage();
}
