/* This is a game of Beat That!, a 
Each player attempts to get the largest/smallest 2-digit number from the concatenation of two consecutive dice rolls
This game has been set up to allow between 2 to 5 players */

// global variables
var gameMode = "setup"; // initialize game mode
var winsArray = []; // array to store players' wins
var roundsPlayed = 0; // count the no. of rounds played

// rolls the dice for a value of 1 to 6
var rollDice = function () {
  var randomDecimal = Math.random() * 6; // random decimal from [0, 6)
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  // return a random number from 1 to 6
  return diceNumber;
};

// generate the 2-digit number
var combineNumber = function (gameMode, roll1, roll2) {
  // compare the two rolls - by default, assume that roll 1 is smaller...
  var smallerN = roll1;
  var largerN = roll2;
  // ...then adjust if the opposite is true
  if (roll1 > roll2) {
    largerN = roll1;
    smallerN = roll2;
  }
  var result;
  // concatenate the 2-digit number depending on game mode
  if (gameMode == "largest") {
    result = String(largerN) + String(smallerN);
  } else if (gameMode == "smallest") {
    result = String(smallerN) + String(largerN);
  }
  return Number(result);
};

// assess winner(s) of the round
var assessWinner = function (playersResultsArray) {
  var winningNumber;
  if (gameMode == "largest") {
    winningNumber = Math.max.apply(Math, playersResultsArray);
  } else if (gameMode == "smallest") {
    winningNumber = Math.min.apply(Math, playersResultsArray);
  }
  // cycle through all players to determine if they won
  var i = 0;
  while (i < playersResultsArray.length) {
    if (playersResultsArray[i] == winningNumber) {
      if (isNaN(winsArray[i])) {
        winsArray[i] = 1;
      } else {
        winsArray[i] += 1;
      }
    }
    i += 1;
  }
  console.log("winsArray:" + winsArray);
  // return an array of each player's no. of wins
  // this return statement is actually optional since the function updates the global variable directly
  return winsArray;
};

// loop thru all players and records their 2-digit number into an array
var loopThruPlayers = function (nPlayers) {
  var playersResultsArray = []; // declare an empty array for the current round
  var output = "";
  var counter = 0;
  while (counter < nPlayers) {
    var roll1 = rollDice();
    var roll2 = rollDice();
    // auto-generate the 2-digit number
    var playerResult = combineNumber(gameMode, roll1, roll2);
    // record into array
    playersResultsArray[counter] = playerResult;
    // add on to output message for this player
    output +=
      "Player " +
      (counter + 1) +
      " rolled " +
      roll1 +
      " and " +
      roll2 +
      " for a combined number of " +
      playerResult +
      ". <br>";

    counter += 1;
  }
  console.log("playersResultsArray:" + playersResultsArray);
  console.log(
    "Max:" +
      Math.max.apply(Math, playersResultsArray) +
      "<br>Min:" +
      Math.min.apply(Math, playersResultsArray)
  );
  // run the assessWinner function to update the winsArray global variable
  assessWinner(playersResultsArray);

  // return output message for all players
  return output;
};

// MAIN function
var main = function (input) {
  // setup game mode
  if (gameMode == "setup") {
    if (input == "largest" || input == "smallest") {
      gameMode = input;
      return (
        "Game mode set.<br>" +
        input.toUpperCase() +
        " number will win. <br>Input number of players (2 to 5)."
      );
    } else {
      // user did not indicate win condition as largest or smallest
      return "Please input type of win condition: 'largest' or 'smallest'.";
    }
  }
  // input validation
  if (
    // invalid no. of players, return error message
    (gameMode == "largest" || gameMode == "smallest") &&
    !(input >= 2 && input <= 5) // game is configured to allow between 2 to 5 players
  ) {
    return "Invalid number of players";
  } else {
    // valid no. of players, proceed to play a round
    var nPlayers = input;
    var currRound = "Playing game...<br>";
    currRound += loopThruPlayers(nPlayers);

    // report win rates for all players
    var winrates = "<br>Win rates: <br>";
    for (var i = 0; i < nPlayers; i += 1) {
      if (isNaN(winsArray[i])) {
        winrates += "Player " + (i + 1) + " hasn't won yet.<br>";
      } else {
        winrates +=
          "Player " +
          (i + 1) +
          " has won " +
          winsArray[i] +
          " times so far.<br>";
      }
    }

    // track the no. of rounds played
    roundsPlayed += 1;

    return (
      currRound + "<br>Total rounds played: " + roundsPlayed + "<br>" + winrates
    );
  }
};
