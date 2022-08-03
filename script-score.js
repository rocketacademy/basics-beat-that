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
console.log("P1 total: " + playerOneScore + " P2 total: " + playerTwoScore);

var firstRoll = "";
var secondRoll = "";

var rollTwoDices = function (input) {
  firstRoll = diceRoll();
  secondRoll = diceRoll();
  var myOutputValue = `🎲<b> PLAYER ${playerNum}</b> <i>ROLLS THE DICE... </i>🎲 <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
  return myOutputValue;
};

// Create a helper function to concatenate the two numbers in the order chosen by the user
// Input = 1 or 2
/*
var chooseDiceOrder = function (input) {
  if (input == 1) {
    var number = Number("" + firstRoll + secondRoll);
    var myOutputValue = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> You chose Dice 1 first. Your number is ${number}.`;
    allPlayersScore.push(number);
    return myOutputValue;
  }

  if (input == 2) {
    var number = Number("" + secondRoll + firstRoll);
    var myOutputValue = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> You chose Dice 2 first. Your number is ${number}.`;
    allPlayersScore.push(number);
    return myOutputValue;
  }
};
*/

// Refactor of chooseDiceOrder function in line 28 to line 42
var chooseDiceOrder = function (input) {
  var number = "";
  var myOutputValue = "";
  if (input == 1) {
    number = Number("" + firstRoll + secondRoll);
    myOutputValue = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> You chose Dice 1 first. Your number is ${number}.`;
    allPlayersScore.push(number);
  } else if (input == 2) {
    number = Number("" + secondRoll + firstRoll);
    myOutputValue = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> You chose Dice 2 first. Your number is ${number}.`;
    allPlayersScore.push(number);
  }
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

var addOne = function (num) {
  return num + 1;
};

var highestCombined = function (input) {
  var modeResult;

  if (currentGameMode == "roll 2 dices") {
    if (input != "") {
      modeResult = "Please click 'Submit' to roll dice";
    } else {
      currentGameMode = "choose order of 2 dices";
      modeResult = rollTwoDices(input);
    }
  } else if (currentGameMode == "choose order of 2 dices") {
    if (playerNum == 1) {
      if (!(input == 1 || input == 2)) {
        modeResult = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(input)} <br><br> It is <b>PLAYER ${
          playerNum + 1
        }</b>'s turn. Click 'Submit' to roll.`;
        playerNum += 1;
        currentGameMode = "roll 2 dices";
      }
    } else if (playerNum == 2) {
      if (!(input == 1 || input == 2)) {
        modeResult = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(
          input
        )} <br><br> Click 'Submit' for the winner!`;
        currentGameMode = "game end display winner";
      }
    }
  } else if (currentGameMode == "game end display winner") {
    if (input != "") {
      modeResult = "Told you to click 'Submit' tsk.";
    } else {
      currentGameMode = "roll 2 dices";
      console.log("array of dice rolls:" + allPlayersScore);
      playerOneScore = playerOneScore + allPlayersScore[0];
      playerTwoScore = playerTwoScore + allPlayersScore[1];
      modeResult = `🥳<b>Winner(s) for this round</b>: Player ${winnerBig(
        allPlayersScore
      )} <br><br> Player 1: ${allPlayersScore[0]} <br> Player 2: ${
        allPlayersScore[1]
      } <br><br> ${leaderboardBig()} <br><br> Click 'Submit' to play again.`;
      allPlayersScore = [];
      playerNum = 1;
    }
  }
  console.log("P1 total: " + playerOneScore + " P2 total: " + playerTwoScore);
  console.log("Player number: " + playerNum);
  return modeResult;
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

var currentGameMode = "roll 2 dices";
var main = function (input) {
  return highestCombined(input);
};

// ============== IGNORE BELOW - functions for "Lowest Combined" game mode ==============

var lowestCombined = function (input) {
  var modeResult;

  if (currentGameMode == "roll 2 dices") {
    if (input != "") {
      modeResult = "Please click 'Submit' to roll dice";
    } else {
      currentGameMode = "choose order of 2 dices";
      modeResult = rollTwoDices(input);
    }
  } else if (currentGameMode == "choose order of 2 dices") {
    if (playerNum == 1) {
      if (!(input == 1 || input == 2)) {
        modeResult = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(input)} <br><br> It is <b>PLAYER ${
          playerNum + 1
        }</b>'s turn. Click 'Submit' to roll.`;
        playerNum += 1;
        currentGameMode = "roll 2 dices";
      }
    } else if (playerNum == 2) {
      if (!(input == 1 || input == 2)) {
        modeResult = `🎲 <b>PLAYER ${playerNum}</b>'s TURN 🎲 <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(
          input
        )} <br><br> Click 'Submit' for the winner!`;
        currentGameMode = "game end display winner";
      }
    }
  } else if (currentGameMode == "game end display winner") {
    if (input != "") {
      modeResult = "Told you to click 'Submit' tsk.";
    } else {
      currentGameMode = "roll 2 dices";
      console.log("array of dice rolls:" + allPlayersScore);
      playerOneScore = playerOneScore + allPlayersScore[0];
      playerTwoScore = playerTwoScore + allPlayersScore[1];
      modeResult = `🥳<b>Winner(s) for this round</b>: Player ${winnerSmall(
        allPlayersScore
      )} <br><br> Player 1: ${allPlayersScore[0]} <br> Player 2: ${
        allPlayersScore[1]
      } <br><br> ${leaderboardSmall()} <br><br> Click 'Submit' to play again.`;
      allPlayersScore = [];
      playerNum = 1;
    }
  }
  console.log("P1 total: " + playerOneScore + " P2 total: " + playerTwoScore);
  console.log("Player number: " + playerNum);
  return modeResult;
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

// Attempt to edit compareNumSmall function from Line 244 to line 254
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
