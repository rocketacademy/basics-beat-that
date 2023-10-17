// Basics - Beat That Rules and Brief Flow
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// Two game states
// First game state is for Player 1 to roll dice.
// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 1 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 1's final number

// Game state will change to roll Player 2's dice
//// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 2 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 2's final number

// Game state will change to compare the two Player's numbers
// final output is to compare Player 1 and Player 2's final number to see whose one is bigger

// Score
// Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.
// example, first run Player 1 41, Player 2 62, then the game needs to restart and take in the new numbers again and add them up. Then show who is the winner

// need to define two global variables to store the running scores
// after the returnFinalNumber function returns the final number, need to add it to the running score
// checkResult compares running scores now instead of final number.
// It will also output who is the current leader instead of a single winner

// Leaderboard
// input is the running scores
// program needs to compare the running scores
// after comparing, need to manipulate the output value to have the higher one on top
// return this
// output will be the higher running score on top of the lower one

// Lowest Combined Number Mode
// Add a game mode such that the player with the lowest combined number is the winner.

// initialise the initial gameState
var gameState = "rollPlayerOneDice";

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
  if (gameState == "rollPlayerOneDice") {
    // for loop to roll two dices and store the dice rolls in playerOneDiceRolls array
    for (var i = 0; i < 2; i += 1) playerOneDiceRolls[i] = rollDice();
    // reassign myOutputValue to show Player 1 their rolls and ask them to choose which dice to be first
    myOutputValue = `Welcome Player 1.<br>You rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two.<br>Choose the order of your dice by inputting 1 for Dice One first or 2 for Dice Two first`;
    gameState = "askPlayerOneChoice";
  } else if (gameState == "askPlayerOneChoice") {
    // assign input to the diceNumberChosen
    var diceNumberChosen = input;
    // input validation - if user inputs a valid diceNumberChosen
    if (diceNumberChosen == 1 || diceNumberChosen == 2) {
      // function to return the number in the tens position
      var playerOneNumberInTens = returnNumberInTensPosition(
        diceNumberChosen,
        playerOneDiceRolls
      );
      // function to return the number in the ones position
      var playerOneNumberInOnes = returnNumberInOnesPosition(
        diceNumberChosen,
        playerOneDiceRolls
      );
      // function to concatenate the numbers and then return it as a Number type
      playerOneFinalNumber = returnFinalNumber(
        playerOneNumberInTens,
        playerOneNumberInOnes
      );
      // function to update playerOneRunningScore
      playerOneRunningScore = updateRunningScore(
        playerOneRunningScore,
        playerOneFinalNumber
      );
      // reassign myOutputValue to tell playerOne the final number and their running score. And tell Player 2 to resubmit to roll the dice
      myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number this round is ${playerOneFinalNumber}.<br>Your running score is ${playerOneRunningScore}.<br> Press submit to roll Player 2's dice`;
      gameState = "rollPlayerTwoDice";
    } else {
      // user validation if the user inputs wrong diceNumberChosen
      myOutputValue = `Please enter a valid input of either 1 or 2 only. <br>You rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
    }
  } else if (gameState == "rollPlayerTwoDice") {
    for (var i = 0; i < 2; i += 1) playerTwoDiceRolls[i] = rollDice();
    myOutputValue = `Player 2,<br>You rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
    gameState = "askPlayerTwoChoice";
  } else if (gameState == "askPlayerTwoChoice") {
    var diceNumberChosen = input;
    // input validation
    if (diceNumberChosen == 1 || diceNumberChosen == 2) {
      var playerTwoNumberInTens = returnNumberInTensPosition(
        diceNumberChosen,
        playerTwoDiceRolls
      );
      var playerTwoNumberInOnes = returnNumberInOnesPosition(
        diceNumberChosen,
        playerTwoDiceRolls
      );
      playerTwoFinalNumber = returnFinalNumber(
        playerTwoNumberInTens,
        playerTwoNumberInOnes
      );
      playerTwoRunningScore = updateRunningScore(
        playerTwoRunningScore,
        playerTwoFinalNumber
      );
      myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number this round is ${playerTwoFinalNumber}.<br>Your running score is ${playerTwoRunningScore}.<br> Press submit once more to see the winner`;
      gameState = "checkResult";
    } else {
      myOutputValue = `Please enter a valid input of either 1 or 2 only.<br> You rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
    }
  } else if (gameState == "checkResult") {
    // function to check who is the leader in terms of running score
    leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    leaderboard = displayLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Player 1's number this round is ${playerOneFinalNumber}.<br>
    Player 2's final number this round is ${playerTwoFinalNumber}<br>
    Current Leader is ${leader}.<br><br>${leaderboard}<br><br>Press Submit again to reroll from Player 1`;
    gameState = "rollPlayerOneDice";
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
    Tied. --- ${runningScoreTwo}`;
  }
  return leaderboard;
};
