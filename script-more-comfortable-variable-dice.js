// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

/* 4 game states
0. gameState = "gameMode" as the starting global variable
- user validation
- user input either "normal" or "lowest"
- store this in a global variable called gameMode to use later
- output is "Enter the number of dice you want to roll"
- change gameState = "rollDice"
1. gameState = "rollDice"
- user validation
- numOfDice = input
- for (var i = 0; i < numOfDice; i++) {
playerOneDiceRolls[i] = rollDice()
repeat for playerTwoDiceRolls array
- output the dice roll values for Player One and Player Two. Tell user to press Submit to generate numbers
- gameState = "generateNums"

2. gameState = "generateNums"
- if (chosenGameMode == "lowest")
use array.sort(compare function)
compare function is a function that takes two numbers and returns the value of a - b. This will then be passed to the sort function to determine the placing i.e. a first or b second
array will be returned in ascending order
- else (for normal)
reverse the ascending order sort

- some function to concatenate the numbers in the arrays to the final numbers
- output these are the auto-gen numbers based on the chosenGameMode. Press Submit to check result
- gameState = "checkResult"

3. gameState = "checkResult"
- if (userChoice == "normal")
 // function to check who is the leader in terms of running score
    leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    leaderboard = displayLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on normal game state is ${leader}.<br><br>${leaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start";
- else (userChoice == "lowest")
// function to check who is the "winner" in terms of lowest running score
    lowestLeader = checkLowest(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    lowestLeaderboard = displayLowestLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on lowest combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start"; */

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
  // "refresh" output everytime we restart the app i.e. pressing submit
  var output = "";
  console.log(gameState);
  // 0. asks user for what gameMode they want: "normal" or "lowest"
  if (gameState == "chooseGameMode") {
    chosenGameMode = input;
    // user validation
    if (chosenGameMode != "normal" && chosenGameMode != "lowest")
      output = `Please enter only "normal" or "lowest".`;
    else {
      output = `You have chosen ${chosenGameMode} game mode. Next, enter the number of dice you want to roll and press Submit.`;
      gameState = "rollDice";
    }
  }
  // 1. gameState "rollDice" which gets user to choose the amount of dice they want to roll
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
  // 2. gameState to generate the final numbers based on the chosenGameMode
  else if (gameState == "generateNums") {
    // sort the two arrays in descending order first
    var sortedPlayerOne = playerOneDiceRolls.sort(compare);
    var sortedPlayerTwo = playerTwoDiceRolls.sort(compare);
    // if block to reverse the order to ascending if chosenGameMode == "lowest". reassign the sorted arrays
    if (chosenGameMode == "lowest") {
      var sortedPlayerOne = sortedPlayerOne.reverse();
      var sortedPlayerTwo = sortedPlayerTwo.reverse();
    }
    playerOneFinalNumber = Number(sortedPlayerOne.join(""));
    playerTwoFinalNumber = Number(sortedPlayerTwo.join(""));
    output = `Player One final number based on ${chosenGameMode} is ${playerOneFinalNumber} <br>
    Player Two final number based on ${chosenGameMode} is ${playerTwoFinalNumber} <br>
    Press Submit to view the winner based on running score`;
    // update the running scores of both Players
    playerOneRunningScore = updateRunningScore(
      playerOneRunningScore,
      playerOneFinalNumber
    );
    playerTwoRunningScore = updateRunningScore(
      playerTwoRunningScore,
      playerTwoFinalNumber
    );
    gameState = "checkResult";
  }
  // 3. gameState to checkResult
  else if (gameState == "checkResult") {
    if (chosenGameMode == "normal") {
      // function to check who is the leader in terms of running score
      leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
      // function to display leaderboard
      leaderboard = displayLeaderboard(
        playerOneRunningScore,
        playerTwoRunningScore
      );
      output = `Current Leader based on ${chosenGameMode} game state is ${leader}.<br><br>${leaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
      gameState = "chooseGameMode";
    } else {
      // function to check who is the "winner" in terms of lowest running score
      lowestLeader = checkLowest(playerOneRunningScore, playerTwoRunningScore);
      // function to display leaderboard
      lowestLeaderboard = displayLowestLeaderboard(
        playerOneRunningScore,
        playerTwoRunningScore
      );
      output = `Current Leader based on ${chosenGameMode} combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
      gameState = "chooseGameMode";
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

// Compare Function to help sort the array in descending order
var compare = function (a, b) {
  return b - a;
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
