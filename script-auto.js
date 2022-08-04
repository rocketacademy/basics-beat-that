// Create a helper function for dice roll
var diceRoll = function (input) {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNum = randomInteger + 1;
  return randomNum;
};

var playerNum = 1;
var allPlayersScore = [];
var playerOneScore = 0;
var playerTwoScore = 0;

var autoHighest = function () {
  num1 = diceRoll();
  num2 = diceRoll();
  var myOutputValue = `🎲 <b>PLAYER ${playerNum}</b> ROLLS... 🎲 <br><br> ${num1} for Dice 1 <br> ${num2} for Dice 2 <br><br> Your number is `;
  var number = "";
  if (num1 >= num2) {
    number = Number("" + num1 + num2);
  } else {
    number = Number("" + num2 + num1);
  }
  allPlayersScore.push(number);
  myOutputValue = myOutputValue + number;
  console.log("all players scores", allPlayersScore);
  return myOutputValue;
};

var autoLowest = function () {
  num1 = diceRoll();
  num2 = diceRoll();
  var myOutputValue = `🎲 <b>PLAYER ${playerNum}</b> ROLLS... 🎲 <br><br> ${num1} for Dice 1 <br> ${num2} for Dice 2 <br><br> Your number is `;
  var number = "";
  if (num1 >= num2) {
    number = Number("" + num2 + num1);
  } else {
    number = Number("" + num1 + num2);
  }
  allPlayersScore.push(number);
  myOutputValue = myOutputValue + number;
  console.log("all players scores", allPlayersScore);
  return myOutputValue;
};

// Create a helper function to compare which number is the biggest in the array using a while loop
// Return the corresponding winner of that biggest number

var compareNumBig = function (input) {
  var i = 0;
  var largestNum = 0;
  while (i < input.length) {
    if (input[i] > largestNum) {
      largestNum = input[i];
    }
    i += 1;
  }
  return largestNum;
};

/*
var compareNumSmall = function (input) {
  var i = 0;
  // set iniial value as 67 because the largest possible 2-digit number is 66
  var smallestNum = 67;
  while (i < input.length) {
    if (input[i] < smallestNum) {
      smallestNum = input[i];
    }
    i += 1;
  }
  return smallestNum;
};
*/

// Attempt to edit compareNumSmall function from Line 62 to line 73
var compareNumSmall = function (input) {
  var i = 0;
  // set iniial value as first number of the array to compare the other numbers against.
  var smallestNum = input[0];
  while (i < input.length) {
    if (input[i] <= smallestNum) {
      smallestNum = input[i];
    }
    i += 1;
  }
  return smallestNum;
};

var winnerBig = function (input) {
  var trackWinner = [];
  var winningScore = compareNumBig(input);
  var j = 0;
  while (j < input.length) {
    if (input[j] == winningScore) {
      trackWinner.push(j);
    }
    j += 1;
  }
  return trackWinner.map(addOne);
};

var winnerSmall = function (input) {
  var trackWinner = [];
  var winningScore = compareNumSmall(input);
  var j = 0;
  while (j < input.length) {
    if (input[j] == winningScore) {
      trackWinner.push(j);
    }
    j += 1;
  }
  return trackWinner.map(addOne);
};

var addOne = function (num) {
  return num + 1;
};

// Player 1 click submit button to roll dice
// Player 2 click submit button to roll dice
// Results are compared

var highestCombined = function () {
  var output;
  if (playerNum == 1) {
    output =
      autoHighest() +
      "<br><br> <i><b>Player 2</b></i>, your turn to roll the dice.";
    playerNum += 1;
  } else if (playerNum == 2) {
    output = autoHighest() + "<br><br>" + displayResultsHighest();
    console.log("P1 total: " + playerOneScore + " P2 total: " + playerTwoScore);
    playerNum = 1;
    allPlayersScore = [];
  }
  return output;
};

var displayResultsHighest = function () {
  playerOneScore = playerOneScore + allPlayersScore[0];
  playerTwoScore = playerTwoScore + allPlayersScore[1];
  var desc = `🥳<b>Winner(s) for this round</b>: Player ${winnerBig(
    allPlayersScore
  )} <br><br> Player 1: ${allPlayersScore[0]} <br> Player 2: ${
    allPlayersScore[1]
  } <br><br> ${leaderboardBig()} <br><br> Click 'Submit' to play again.`;
  return desc;
};

var lowestCombined = function () {
  var output;
  if (playerNum == 1) {
    output =
      autoLowest() +
      "<br><br> <i><b>Player 2</b></i>, your turn to roll the dice.";
    playerNum += 1;
  } else if (playerNum == 2) {
    output = autoLowest() + "<br><br>" + displayResultsLowest();
    console.log("P1 total: " + playerOneScore + " P2 total: " + playerTwoScore);
    playerNum = 1;
    allPlayersScore = [];
  }
  return output;
};

var displayResultsLowest = function () {
  playerOneScore = playerOneScore + allPlayersScore[0];
  playerTwoScore = playerTwoScore + allPlayersScore[1];
  var desc = `🥳<b>Winner(s) for this round</b>: Player ${winnerSmall(
    allPlayersScore
  )} <br><br> Player 1: ${allPlayersScore[0]} <br> Player 2: ${
    allPlayersScore[1]
  } <br><br> ${leaderboardSmall()} <br><br> Click 'Submit' to play again.`;
  return desc;
};

var leaderboardBig = function () {
  var outcome = "";
  if (playerOneScore >= playerTwoScore) {
    outcome = `🏆<b>Leaderboard</b>🏆 <br> Player 1: ${playerOneScore} <br> Player 2: ${playerTwoScore}`;
  } else {
    outcome = `🏆<b>Leaderboard</b>🏆 <br> Player 2: ${playerTwoScore} <br> Player 1: ${playerOneScore}`;
  }
  return outcome;
};

var leaderboardSmall = function () {
  var outcome = "";
  if (playerOneScore <= playerTwoScore) {
    outcome = `🏆<b>Leaderboard</b>🏆 <br> Player 1: ${playerOneScore} <br> Player 2: ${playerTwoScore}`;
  } else {
    outcome = `🏆<b>Leaderboard</b>🏆 <br> Player 2: ${playerTwoScore} <br> Player 1: ${playerOneScore}`;
  }
  return outcome;
};

var currentGameMode = "select game mode";

var main = function (input) {
  var gameSelect = "";

  if (currentGameMode == "select game mode") {
    if (input == 1) {
      currentGameMode = "highest combined num";
      gameSelect =
        "You have selected <b>Highest Combined Number Mode</b> <br><br> <b><i>Player 1</i></b>, hit 'Submit' to roll dice.";
    } else if (input == 2) {
      currentGameMode = "lowest combined num";
      gameSelect =
        "You have selected <b>Lowest Combined Number Mode</b> <br><br> <b><i>Player 1</i></b>, hit 'Submit' to roll dice.";
    } else {
      gameSelect = `Please key in a valid number (1 or 2) <br> Enter "1" for Highest Combined Number Mode <br> Enter "2" for Lowest Combined Number Mode`;
    }
  } else if (currentGameMode == "highest combined num") {
    gameSelect = highestCombined();
  } else if (currentGameMode == "lowest combined num") {
    gameSelect = lowestCombined();
  }
  return gameSelect;
};
