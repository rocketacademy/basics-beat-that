// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

// initialise the initial gameState
// var gameState = "rollPlayerOneDice";
var gameState = "start";
var userChoice; // global userChoice so we can access in all the code blocks

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
  var myOutputValue = "";
  // gameState "start" which gets user to choose their "normal" or "lowest" game
  if (gameState == "start") {
    // "resets" userChoice to be either "normal" or "input" when we switch gameState to "start"
    userChoice = input;
    // user validation
    if (userChoice != "normal" && userChoice != "lowest")
      myOutputValue = `Please enter only "normal" or "lowest"`;
    else {
      // use fixed gameState getNumbers so we can avoid repeating codes from playerOneFinalNumber to playerTwoRunningScore
      gameState = "getNumbers";
      myOutputValue = `You chose ${userChoice} game mode. Press Submit to roll the dice for both players`;
      for (var i = 0; i < 2; i += 1) {
        playerOneDiceRolls[i] = rollDice();
        playerTwoDiceRolls[i] = rollDice();
      }
    }
  }
  // gameState "normal" for normal mode
  else if (gameState == "getNumbers") {
    // for userChoice == "normal", the first number will be the larger one in the respective array
    if (userChoice == "normal") {
      // find the max number and store in playerXFirstNum
      playerOneFirstNum = Math.max(...playerOneDiceRolls);
      playerTwoFirstNum = Math.max(...playerTwoDiceRolls);
      // find the min number and store in playerXSecondNum
      playerOneSecondNum = Math.min(...playerOneDiceRolls);
      playerTwoSecondNum = Math.min(...playerTwoDiceRolls);
    } // for userChoice == "lowest", do the opposite
    else {
      // find the min number and store in playerXFirstNum
      playerOneFirstNum = Math.min(...playerOneDiceRolls);
      playerTwoFirstNum = Math.min(...playerTwoDiceRolls);
      // find the max number and store in playerXSecondNum
      playerOneSecondNum = Math.max(...playerOneDiceRolls);
      playerTwoSecondNum = Math.max(...playerTwoDiceRolls);
    }
    // use returnFinalNumber(firstNum, secondNum) to concatenate and return as a number
    playerOneFinalNumber = returnFinalNumber(
      playerOneFirstNum,
      playerOneSecondNum
    );
    playerTwoFinalNumber = returnFinalNumber(
      playerTwoFirstNum,
      playerTwoSecondNum
    );
    // update running scores using updateRunningScore
    playerOneRunningScore = updateRunningScore(
      playerOneRunningScore,
      playerOneFinalNumber
    );
    playerTwoRunningScore = updateRunningScore(
      playerTwoRunningScore,
      playerTwoFinalNumber
    );
    myOutputValue = `Player 1 rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two. <br> Player 1 auto-gen number is ${playerOneFinalNumber}.<br> Player 1 running score is ${playerOneRunningScore}. <br> <br> Player 2 rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two <br> Player 2 auto-gen number is ${playerTwoFinalNumber}. <br> Player 2 running score is ${playerTwoRunningScore} <br> <br> Press Submit to find winner based on ${userChoice} game state`;
    // helper function to decide the. If "normal", returns checkResultNormal, else checkResultLowest
    gameState = chooseNextGameState(userChoice);
  } else if (gameState == "checkResultNormal") {
    // function to check who is the leader in terms of running score
    leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    leaderboard = displayLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on normal game state is ${leader}.<br><br>${leaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start";
  } else if (gameState == "checkResultLowest") {
    // function to check who is the "winner" in terms of lowest running score
    lowestLeader = checkLowest(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    lowestLeaderboard = displayLowestLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on lowest combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start";
  }
  return myOutputValue;
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
