// Author: Samuel Lee
// Last Updated: 03/12/2023

// =========== GLOBAL VARIABLES ==========

// GAME MODES
var DEFAULT_MODE = "default";
var PLAYER_COUNT = "playercount";
var PLAYER_NAMES = "inputplayernames";
var GAME_MODE = "gametime";
var RESULT_MODE = "results";
var TALLY_TIME = "tallyresults";
var gamemode = PLAYER_COUNT;

// GLOBAL VARIABLES
var nameCounter = 0;
var playerNames = [];
var diceResults = [];
var gameScore = [];
var numberOfPlayers = 0;
var diceRoll_1 = 0;
var diceRoll_2 = 0;
var currentPlayer = 0;
var previousPlayer = 0;

// =========== HELPER FUNCTIONS ==========
// Function that helps autogenerate the dice roll values
var diceRoll = function () {
  var diceNumber = 6;
  var randomDecimal = Math.random() * diceNumber;
  var randomInteger = Math.floor(randomDecimal);
  var diceResult = randomInteger + 1;
  return diceResult;
};

// Functions that checks for validation of name
var nameString = function (input) {
  const letterRegex = /^[a-zA-Z]+$/;
  if (letterRegex.test(input)) {
    console.log("Input contains only letters.");
    return true;
  } else {
    console.log("Input contains non-letter characters.");
    return false;
  }
};

// Initial Dice rolls for each player and determines which player is currently going through this linear journey
var playerInput = function (currentPlayer) {
  console.log("Entering PlayerInput function");
  diceRoll_1 = diceRoll();
  diceRoll_2 = diceRoll();
  gamemode = RESULT_MODE;
};

// Function that assists in calculating the player's final Dice results after selecting their Dice positions
var playerResult = function (input) {
  if (input == 1) {
    diceResults[currentPlayer] = diceRoll_1.toString() + diceRoll_2.toString();
    previousPlayer = currentPlayer;
    currentPlayer++;
    gamemode = GAME_MODE;
  } else if (input == 2) {
    diceResults[currentPlayer] = diceRoll_2.toString() + diceRoll_1.toString();
    previousPlayer = currentPlayer;
    currentPlayer++;
    gamemode = GAME_MODE;
  }
  return `${playerNames[previousPlayer]}, you chose Dice ${input} first.<br> Your number is now: <b>${diceResults[previousPlayer]}</b>.<br>Player ${playerNames[currentPlayer]} turn. <br> Please press <b>Submit</b> to start your roll`;
};

// Identifying the highest number in the array, and returns the index of the array so we can determine the winner
var playerTally = function (playerScores) {
  // Convert strings to integers
  const numericArray = playerScores.map(Number);

  // Find the maximum value in the array
  const maxValue = Math.max(...numericArray);

  // Find the index of the maximum value
  const indexOfMaxValue = numericArray.indexOf(maxValue);

  return indexOfMaxValue;
};

// =========== MAIN FUNCTION ==========
var main = function (input) {
  // Identifies the input and restarts the game if 'exit' is typed
  var usrInput = input;
  if (usrInput == "exit") {
    location.reload(true);
  }

  // Determines the number of players, playing the game
  if (gamemode == PLAYER_COUNT) {
    console.log("Entering PLAYER_COUNT gamemode");
    numberOfPlayers = usrInput;
    for (var i = 0; i < numberOfPlayers; i++) {
      gameScore[i] = 0;
    }
    gamemode = PLAYER_NAMES;

    return `Please enter the player's names. Once you add 1 player's name, press submit. Continue to do so until all player's names have been submitted.`;
  }

  // Once player types start, the game mode is switched on!
  if (usrInput.toLowerCase() == "start" && playerNames.length != 0) {
    console.log(`Entering GAME_MODE gamemode`);
    gamemode = GAME_MODE;
  }

  // If reroll is typed, then we go into the next round
  if (usrInput.toLowerCase() == "reroll" && playerNames.length != 0) {
    console.log(`Entering GAME_MODE gamemode`);
    gamemode = GAME_MODE;
    diceResults = [];
    currentPlayer = 0;
    previousPlayer = 0;
  }

  // The moment the number of turns have reached the number of players or more, we get the final results
  if (currentPlayer > numberOfPlayers) {
    console.log(`Entering TALLY_TIME gamemode`);
    gamemode = TALLY_TIME;
    var indexOfWinner = playerTally(diceResults);
    var storeOutputString = "";
    for (var i = 0; i < numberOfPlayers; i++) {
      if (i == indexOfWinner) {
        gameScore[i] += 1;
      }
      storeOutputString += `Player <b>${playerNames[i]}</b> dice roll: <b>${diceResults[i]}</b> | current score: <b>${gameScore[i]}</b><br>`;
    }
    return (
      storeOutputString +
      `<br>🎊 Player <b>${playerNames[indexOfWinner]}</b> wins!🥳<br> <br> Type <b>'reroll'</b> to play again<br>Type <b>'exit'</b> to restart this game!`
    );
  }

  // If the gamemode == GAME_MODE, operate as such:
  if (gamemode == GAME_MODE) {
    console.log(`Entering GAME_MODE gamemode - playerInput`);
    console.log(`Current Player: ${playerNames[currentPlayer]}`);
    playerInput(currentPlayer);
    return `<b>${playerNames[previousPlayer]} rolls</b>. <br>For Dice 1, you rolled: ${diceRoll_1}.<br>For Dice 2, you rolled: ${diceRoll_2}.<br> Please enter '1' for Dice 1 to be first, or '2' for Dice 2 to be the first.`;
  }

  // Gets the results based on User's selection of which Dice goes first
  if (gamemode == RESULT_MODE) {
    console.log(`Entering RESULT_MODE gamemode`);
    console.log(`Current Player: ${playerNames[currentPlayer]}`);

    var saveResult = playerResult(usrInput);
    if (currentPlayer == numberOfPlayers) {
      currentPlayer++;
      return `${playerNames[previousPlayer]}, you chose Dice ${input} first.<br> Your number is now: <b>${diceResults[previousPlayer]}</b>! <br><br>Press the <b>Submit</b> button to see who won!`;
    }
    return saveResult;
  }

  // Assuming that this is where we add the player's names.
  if (gamemode == PLAYER_NAMES) {
    var storePlayerNames = "";
    console.log("Entering PLAYER_NAMES gamemode");
    while (nameCounter <= numberOfPlayers) {
      playerNames[nameCounter] = usrInput;
      nameCounter++;
      if (nameCounter >= numberOfPlayers) {
        for (var i = 0; i < playerNames.length; i++) {
          storePlayerNames += `Player ${i + 1} name: ${playerNames[i]}<br>`;
        }
        return storePlayerNames + `Type <b>'start'</b> to begin the game!`;
      }
      return `Please add next player's name`;
    }
  }
};
