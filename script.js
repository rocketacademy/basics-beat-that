// String Constants
var NORMAL = "normal";
var LOWEST = "lowest";
var KNOCKOUT = "knockout";

// Global Variables
var gameMode = NORMAL;
var numOfPlayers = 2;
var roundBoard = [];
var winner;
var leaderBoard = [];
var numOfDice = 2;
var diceRolls = [];

// Main
var main = function (players, dice, mode) {
  gameMode = mode;

  if (isNaN(Number(players)) || Number(players) < 2) {
    return `Please enter 2 or more for the number of players.`;
  } else {
    numOfPlayers = Number(players);
  }

  if (isNaN(Number(dice)) || Number(dice) < 2) {
    return `Please enter 2 or more for the number of dice.`;
  } else {
    numOfDice = Number(dice);
  }

  // Generate leader board
  if (leaderBoard.length != numOfPlayers) {
    for (var counter = 1; counter <= numOfPlayers; counter += 1) {
      leaderBoard.push({ playerNumber: counter, score: 0 });
    }
  }

  switch (gameMode) {
    case NORMAL:
    case LOWEST:
      playBeatThat();
      break;
    case KNOCKOUT:
      playKnockout();
      break;
  }

  return generateOutputMessage();
};

// Modules

// Update player boards
function updatePlayerBoards(playerNum, playerScore) {
  roundBoard.push(playerScore);
  leaderBoard.find(
    ({ playerNumber }) => playerNumber === Number(playerNum) + 1
  ).score += playerScore;
}

// Sort leader board in descending order of score
function sortLeaderBoardDescend() {
  leaderBoard.sort((a, b) => b.score - a.score);
}

// Sort leader board in ascending order of score
function sortLeaderBoardAscend() {
  leaderBoard.sort((a, b) => a.score - b.score);
}

// Die Roll
function rollDie() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var dieNumber = randomInteger + 1;
  return dieNumber;
}

// Dice Rolls
function getDiceRolls(numOfDice) {
  for (var counter = 0; counter < numOfDice; counter += 1) {
    diceRolls.push(rollDie());
  }
}

// Get maximum in array
function getMaxOfArray(array) {
  var max = Math.max.apply(null, array);
  return array.indexOf(max);
}

// Get minimum in array
function getMinOfArray(array) {
  var min = Math.min.apply(null, array);
  return array.indexOf(min);
}

// Generate Normal Combination
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

// Play Beat That
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

// Output Message
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
  message += `👑 Leader Board 👑<br>`;
  for (var counter = 0; counter < numOfPlayers; counter += 1) {
    message += `Player ${leaderBoard[counter].playerNumber}: ${leaderBoard[counter].score}<br>`;
  }
  roundBoard = [];
  return message;
}
