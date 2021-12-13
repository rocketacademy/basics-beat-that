// ========================================
// CONSTANTS
// ========================================
const WAIT_DICE_ROLL = "waiting";
const PICK_STATE = "picking order";
const END_STATE = "ended";
const HIGHEST = "highest";
const LOWEST = "lowest";
// ========================================

// ========================================
// GLOBAL VARIABLES
// ========================================
// By default the highest number will win.
var gameMode = HIGHEST;
// Minimum number of players and dice rolls is 2.
var numberOfPlayers = 2;
var numberOfRolls = 2;
// Stores the dice rolls for each player.
var rolledNumbers = [];
// Stores the combined number for each player.
var combinedNumbers = [];
// Stores the scores for all players, updated after each round.
var scores = [];
// Running number from 1 to the number of players, used as identifier for scores array.
var playerList = [];
// Initilize count so that all players will get a chance to roll.
var playerCount = 0;
// ========================================

// ========================================
// FUNCTIONS
// ========================================
// Take in the paramters and prompts player to roll the dice.
var beginGame = function (numPlayers, numRolls, mode) {
  numberOfPlayers = numPlayers;
  numberOfRolls = numRolls;
  gameMode = mode;
  for (var i = 0; i < numberOfPlayers; i += 1) {
    scores.push(0);
    playerList.push(i + 1);
  }
  return `Let's Begin! Click on "Proceed" to start rolling the dice!`;
};

// All variables are reset to a clean slate, game is remade.
var remakeGame = function () {
  playerCount = 0;
  combinedNumbers = [];
  scores = [];
  playerList = [];
};

// Rolls dice and return the number of all rolls.
var rollDice = function () {
  rolledNumbers = [];
  var message = "";
  for (var roll = 0; roll < numberOfRolls; roll += 1) {
    var randomDecimal = Math.random() * 6;
    var diceRoll = Math.floor(randomDecimal) + 1;
    rolledNumbers.push(diceRoll);
    message += `Roll #${roll + 1}: ${diceRoll}<br>`;
  }
  return message;
};

// Auto generate the highest or lowest number possible for the player
var combineRolls = function () {
  rolledNumbers.sort();
  var combinedNumber = "";
  if (gameMode == HIGHEST) {
    for (var roll = rolledNumbers.length - 1; roll >= 0; roll -= 1) {
      combinedNumber += rolledNumbers[roll];
    }
  } else if (gameMode == LOWEST) {
    for (var roll = 0; roll < rolledNumbers.length; roll += 1) {
      combinedNumber += rolledNumbers[roll];
    }
  }
  combinedNumber = Number(combinedNumber);
  combinedNumbers.push(combinedNumber);
  return combinedNumber;
};

// Given the array, find the one with the highest/lowest score.
// It also serves as a method for generating the leaderboard.
var findWinner = function (array, gameMode) {
  var count = 1;
  var winningIndex = 0;
  var winningNumber = array[0];
  while (count < array.length) {
    if (gameMode == HIGHEST) {
      if (winningNumber < array[count]) {
        winningNumber = array[count];
        winningIndex = count;
      }
    } else if (gameMode == LOWEST) {
      if (winningNumber > array[count]) {
        winningNumber = array[count];
        winningIndex = count;
      }
    }
    count += 1;
  }
  return winningIndex;
};
// ========================================

// ========================================
// SUB-ROUTINES
// ========================================
// Leaderboard is updated accordingly to the latest scores.
var updateLeaderboard = function () {
  console.log("scores: " + scores);
  var leaderboard = document.querySelector("#leaderboard-scores");
  var scoresCopy = scores.slice();
  var playerListCopy = playerList.slice();
  var position = 1;
  var scoreDetails = "";
  while (scoresCopy.length > 0) {
    console.log(playerListCopy);
    playerIndex = findWinner(scoresCopy, HIGHEST);
    console.log("playerindex: " + playerIndex);
    scoreDetails += `${position}. Player ${playerListCopy[playerIndex]} --- ${scoresCopy[playerIndex]}<br>`;
    scoresCopy.splice(playerIndex, 1);
    playerListCopy.splice(playerIndex, 1);
    position += 1;
  }
  leaderboard.innerHTML = scoreDetails;
};
// ========================================

// ========================================
// MAIN
// ========================================
var main = function () {
  var myOutputValue = "";
  // Starts tracking for every player to get his turn to roll.
  while (playerCount < numberOfPlayers) {
    // Player has rolled, and details of the rolls are stored.
    var rollMessage = rollDice();
    // Game auto-generate the best number accordingly.
    var combinedNumer = combineRolls();
    myOutputValue = `<b>Hey Player ${
      playerCount + 1
    }! Here's your dice roll results</b> 🎲:<br> 
      ${rollMessage}Your best number is ${combinedNumer}!`;
    playerCount += 1;
    return myOutputValue;
  }

  // Once all players have rolled the dice, the winner is declared. Leaderboard will also be updated.
  var winningIndex = findWinner(combinedNumbers, gameMode);
  var winningNumber = combinedNumbers[winningIndex];
  scores[winningIndex] += 1;
  updateLeaderboard();
  playerCount = 0;
  combinedNumbers = [];
  return `🎉<b>Player ${
    winningIndex + 1
  } wins!</b>🎉 With the number <b>${winningNumber}</b>!<br>Click "Proceed" to continue for another round!`;
};
