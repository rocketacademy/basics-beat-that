//Beat that!

/*In this game version there will be 3 settings for users
  1. Win mode
    - lowest combined -- the player with the lowest combined value is the winner
    - highest combined -- the player with the highest combined value is the winner
  2. The number of players in the game
  3. The number of dice rolled per round 
*/

// Global setting
var totalGame = 0;
var winMode = "...";
var players = 0;
var dices = 0;
var playerScores = [];
var playerRanks = [];
var diceRollResults = [];
var diceRankResults = [];
var combineResults = [];

// Sub function
// Random dice roll function
var randomRoll = function () {
  var result = 0;
  result = Math.floor(Math.random() * 6) + 1;
  return result;
};

// Results of all dice rolled by every player function
var PlayerRoll = function (numberOfDice) {
  var diceRollResult = [];
  for (j = 1; j <= numberOfDice; j += 1) {
    diceRollResult.push(randomRoll());
  }
  return diceRollResult;
};

// Rank array numbers
var rankArray = function (array) {
  var ranks = [];
  var rank = 0;
  for (i = 0; i < array.length; i += 1) {
    // Find the rank of each element
    for (j = 0; j < array.length; j += 1) {
      if (array[i] > array[j]) {
        rank += 1;
      } else if (array[i] == array[j] && i < j) {
        // Purposefully make rank unequal for the elements with same value so we can easily sort
        // no meaning is changed i.e. it doesn't matter whether which 3 and 3 comes first
        rank += 1;
      }
    }
    // Push the rank of each element into an array
    ranks.push(rank);
    // Initialize 'rank' for next elelment
    rank = 0;
  }
  return ranks;
};

// Highest rank
var highestRank = function (rank) {
  return rank == players - 1;
};
// Lowest rank
var lowestRank = function (rank) {
  return rank == 0;
};

// Combined value
var combinedValue = function (arrayValue, arrayRank, mode) {
  var value = 0;
  var numberOfElement = arrayValue.length;

  if (mode == "Highest") {
    for (i = 0; i < numberOfElement; i += 1) {
      value = value + arrayValue[i] * 10 ** arrayRank[i];
    }
  } else if (mode == "Lowest") {
    for (i = 0; i < numberOfElement; i += 1) {
      value =
        value + arrayValue[i] * 10 ** (numberOfElement - 1 - arrayRank[i]);
    }
  }
  return value;
};

var main = function (input) {
  var output = "";
  var diceRollResult = [];
  var diceRankResult = [];
  var combineResult = 0;
  var rankResult = [];
  var totalRanks = 0;

  // Choose win mode
  if (winMode == "...") {
    output = `Hello! Welcome to BEAT IT! <br><br>
              Enter 1 to beat with the highest combined rolled-dice numbers <br>
              Enter 2 to bear with the lowest combined rolled-dice numbers`;
    if (input == 1) {
      winMode = "Highest";
      output = `Got it! You will win when you got the ${winMode} combined number<br>
                How many players will be in the game then? <br><br>
                Enter only the number to specify the number of players in the game`;
      return output;
    } else if (input == 2) {
      winMode = "Lowest";
      output = `Got it! You will win when you got the ${winMode} combined number<br>
                How many players will be in the game then? <br><br>
                Enter only the number to specify the number of players in the game`;
      return output;
    } else {
      return output;
    }
  }

  // Choose the number of players
  if (players == 0) {
    output = "Please enter the number of players";

    if (input > 0) {
      players = input;
      output = `Alright! ${players} players in the game. <br>
                How many dices wil we use in the game ? <br>`;
      for (i = 0; i < players; i += 1) {
        playerScores.push(0);
      }
      return output;
    } else {
      return output;
    }
  }

  // Choose the number of dices
  if (dices == 0) {
    output = "Please enter the number of dices";

    if (input > 0) {
      dices = input;
      output = `${dices} will be used in the game <br>
                Shall we start now? <br><br>
                Submit enter to beat them all!!!`;
      return output;
    } else {
      return output;
    }
  }

  // Game start
  if (diceRollResults.length == 0) {
    for (player = 0; player < players; player += 1) {
      diceRollResult = PlayerRoll(dices);
      diceRankResult = rankArray(diceRollResult);
      combineResult = combinedValue(diceRollResult, diceRankResult, winMode);
      // Console log
      console.log(`diceRollResult: ` + diceRollResult);
      console.log(`diceRankResult: ` + diceRankResult);
      console.log(`combineResult: ` + combineResult);
      // Push value
      diceRollResults.push(diceRollResult);
      diceRankResults.push(diceRankResult);
      combineResults.push(combineResult);
      // Initialize value
      diceRollResult = [];
      diceRankResult = [];
      combineResult = 0;
    }

    // Rank combine number
    rankResult = rankArray(combineResults);
    // Increment total game by 1
    totalGame += 1;
    // Show the winner
    if (winMode == "Highest") {
      output = `The winner is ... PLAYER ${
        rankResult.findIndex(highestRank) + 1
      }!`;
      playerScores[rankResult.findIndex(highestRank)] += 1;
    } else if (winMode == "Lowest") {
      output = `The winner is ... PLAYER ${
        rankResult.findIndex(lowestRank) + 1
      }!`;
      playerScores[rankResult.findIndex(lowestRank)] += 1;
    }

    // Show each player roll
    output =
      output + `<br><br>` + `-- Each player roll: Round ${totalGame}` + `<br>`;
    for (i = 0; i < players; i += 1) {
      output =
        output +
        `<br>` +
        `Player: ${i + 1} got ${combineResults[i]} from dice rolled: ${
          diceRollResults[i]
        }`;
    }

    // Rank each player for all games
    playerRanks = rankArray(playerScores);
    totalRanks = players;
    console.log(playerRanks);
    console.log(totalRanks);

    // Function to map rank and index in descending order
    var descRank = function (rank) {
      console.log(totalRanks);
      return rank == totalRanks;
    };

    // Show leadership board
    output =
      output + `<br><br>` + `-- Leadershipboard: Round ${totalGame}` + `<br>`;
    for (i = 0; i < players; i += 1) {
      totalRanks = totalRanks - 1;
      output =
        output +
        `<br>` +
        `Rank ${i + 1}: Player ${playerRanks.findIndex(descRank) + 1} with ${
          playerScores[playerRanks.findIndex(descRank)]
        } win`;
    }

    diceRollResults = [];
    diceRankResults = [];
    combineResults = [];
    return output;
  }
};
