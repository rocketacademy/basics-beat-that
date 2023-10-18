// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

// initialise the initial gameState
var gameState = "chooseGameMode";
var chosenGameMode = "";

// global playerOne variables so we can access them throughout the different gameStates
var playerOneDiceRolls = [];
var playerOneFinalNumber;
var playerOneRunningScore = 0;

// global playerTwo variables to access throughout the different gameStates
var playerTwoDiceRolls = [];
var playerTwoFinalNumber;
var playerTwoRunningScore = 0;

var main = function (input) {
  // "refresh" myOutputValue everytime we restart the app i.e. pressing submit
  var output = "";
  console.log(gameState);
  // asks user for what gameMode they want: "normal" or "lowest"
  if (gameState == "chooseGameMode") {
    chosenGameMode = input;
    // user validation
    if (chosenGameMode != "normal" && chosenGameMode != "lowest")
      output = `Please enter only "normal" or "lowest".`;
    else {
      output = `You have chosen ${chosenGameMode} game mode. Next, enter the number of dice you want to roll and press Submit.`;
      gameState = "rollDice";
    }
    console.log(chosenGameMode);
  }
  // gameState "rollDice" which gets user to choose the amount of dice they want to roll
  else if (gameState == "rollDice") {
    numOfDice = Number(input);
    // user validation; isNaN takes care of strings because Number will conver them to NaN. The rest is for 0 and 1 because we those values do not help us generate useful numbers
    if (isNaN(numOfDice) || numOfDice == 0 || numOfDice == 1)
      output = `Please enter only a number that of minimum value 2.`;
    else {
      for (var i = 0; i < numOfDice; i++) {
        playerOneDiceRolls[i] = rollDice();
        playerTwoDiceRolls[i] = rollDice();
      }
      output = `Player One rolled ${playerOneDiceRolls} <br> Player Two rolled ${playerTwoDiceRolls} <br> Press Submit to generate the numbers`;
      gameState = "generateNums";
    }
  }
  return output;
};

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
};

// Return number in the tens position
var returnNumberInTensPosition = function (
  selectedDiceNumber,
  playerDiceRollArray
) {
  var diceNumberInTensPosition = selectedDiceNumber;
  var indexNumberInTensPosition = diceNumberInTensPosition - 1;
  var numberInTensPosition = playerDiceRollArray[indexNumberInTensPosition];
  return numberInTensPosition;
};

var returnNumberInOnesPosition = function (
  selectedDiceNumber,
  playerDiceRollArray
) {
  var indexNumberInTensPosition = selectedDiceNumber - 1;
  var indexNumberInOnesPosition;
  if (indexNumberInTensPosition == 0) {
    indexNumberInOnesPosition = 1;
  } else {
    indexNumberInOnesPosition = 0;
  }
  numberInOnesPosition = playerDiceRollArray[indexNumberInOnesPosition];
  return numberInOnesPosition;
};

// Return the two numbers concatenated
var returnFinalNumber = function (tensPositionNumber, onesPositionNumber) {
  concatenatedString = "" + tensPositionNumber + onesPositionNumber;
  convertedNumber = Number(concatenatedString);
  return convertedNumber;
};

// checkWinner
var checkResult = function (playerOneNumber, playerTwoNumber) {
  result = "";
  if (playerOneNumber > playerTwoNumber) result = "Player 1 wins";
  else if (playerTwoNumber > playerOneNumber) result = "Player 2 wins";
  else result = "draw";
  return result;
};

// updateRunningScore
var updateRunningScore = function (runningScore, finalNumber) {
  runningScore = runningScore + finalNumber;
  return runningScore;
};

// checkLeader
var checkLeader = function (runningScoreOne, runningScoreTwo) {
  var result = "";
  if (runningScoreOne > runningScoreTwo) result = "Player 1";
  else if (runningScoreTwo > runningScoreOne) result = "Player 2";
  else result = "none, scores are tied!";
  return result;
};

// checkLowest
var checkLowest = function (runningScoreOne, runningScoreTwo) {
  var lowest = "";
  if (runningScoreOne < runningScoreTwo) lowest = "Player 1";
  else if (runningScoreTwo < runningScoreOne) lowest = "Player 2";
  else lowest = "none, scores are tied!";
  return lowest;
};

// displayLeaderboard
var displayLeaderboard = function (runningScoreOne, runningScoreTwo) {
  var leaderboard = "";
  if (runningScoreOne > runningScoreTwo) {
    leaderboard = `1st Place. Player 1 --- ${runningScoreOne}<br>
    2nd Place. Player 2 --- ${runningScoreTwo}`;
  } else if (runningScoreTwo > runningScoreOne) {
    leaderboard = `1st Place. Player 2 --- ${runningScoreTwo}<br>
    2nd Place. Player 1 --- ${runningScoreOne}`;
  } else {
    leaderboard = `Tied. Player 1 --- ${runningScoreOne}<br>
    Tied. Player 2 --- ${runningScoreTwo}`;
  }
  return leaderboard;
};

// displayLowestLeaderboard
var displayLowestLeaderboard = function (runningScoreOne, runningScoreTwo) {
  var leaderboard = "";
  if (runningScoreOne < runningScoreTwo) {
    leaderboard = `1st Place. Player 1 --- ${runningScoreOne}<br>
    2nd Place. Player 2 --- ${runningScoreTwo}`;
  } else if (runningScoreTwo < runningScoreOne) {
    leaderboard = `1st Place. Player 2 --- ${runningScoreTwo}<br>
    2nd Place. Player 1 --- ${runningScoreOne}`;
  } else {
    leaderboard = `Tied. Player 1 --- ${runningScoreOne}<br>
    Tied. Player 2 --- ${runningScoreTwo}`;
  }
  return leaderboard;
};

// function to return the chosen gameState
var chooseNextGameState = function (choice) {
  if (choice == "normal") var nextGameState = "checkResultNormal";
  else nextGameState = "checkResultLowest";
  return nextGameState;
};
