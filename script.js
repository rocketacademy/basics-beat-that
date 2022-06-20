// === REQUIREMENTS === //
// 1) 2 players; Players take turns
// 2) when player click submit, game rolls 2 dice and show dice rolls;
// say 1 and 5
// 3) Player pick the order of dice they want, e.g 51, they can specify second dice go first
// after both players rolled and chosen dice order, player with higher combined number wins

// === PROBLEM BREAKDOWN AND PLANNING === //
// ver 1. roll 2 dice; returns output for 1 player. Player choose dice order and get correct return output
// ver 2. Refactor code to include player 2
//-need Global variables for current player; allPleyerScore
// ver 3. Implement compaing dice scores and declare winner
// ver 4. Reset game such that players play continually without refreshing page
// Declarring Global Variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
// Setting gameState as GAME_STATE_DICE_ROLL as first state of game
var gameState = GAME_STATE_DICE_ROLL;

// Creating array called player rolls to store rolled dice value
var currentPlayerRolls = [];
var playerInput;
//Player 1 starts first
var currentPlayer = 1;
// Store all scores of both players
var allPlayerScore = [];

// == HELPER FUNCTIONS == //

// Helper function to imitate rolling dice
var rollDice = function () {
  console.log(`Control flow: start of rollDice()`);
  // Random integer from 1 to 6 (Random decimal from 0 and 6)
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  console.log(`rollDice output, randomInteger: `, randomInteger);
  return randomInteger;
};

// Helper function to roll two dice for one player
var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls: ", currentPlayerRolls);
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    "  |  Dice 2: " +
    currentPlayerRolls[1] +
    "<br><br>Now, please input either '1' or '2' to choose corresponding dice to be used as first digit of your final value."
  );
};
// Helper function for validating 1 or 2
var getPlayerScore = function (playerInput) {
  var playerScore;
  //input valdiation (if input neither 1 or 2, inform user to input 1 or 2)
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input valdiation, invalid input... not 1 and not 2"
    );
    return "error";
  }
  //input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    playerScore = Number(String(currentPlayerRolls[0]) + currentPlayerRolls[1]);
  }
  //input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    playerScore = Number(String(currentPlayerRolls[1]) + currentPlayerRolls[0]);
  }
  // Store playerScore in array
  allPlayerScore.push(playerScore);
  console.log("allPlayerScore" + allPlayerScore);

  // Clear current player rolls away
  currentPlayerRolls = [];
  return "Player " + currentPlayer + ", your chosen value is " + playerScore;
};

//Helper Function: Comparing Player's scores
var comparePlayersScores = function () {
  console.log("allPlayerScore", allPlayerScore);
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    "<br></br>Player 2 score: " +
    allPlayerScore[1];
  // if player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "<br></br>Player 1 wins";
  }
  // if player 2 wins
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + "<br></br>Player 2 wins";
  }
  //if tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "<br></br>Both Players Tie!";
  }
  return compareMessage;
};

//Helper Function: Restart game
var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScore = [];
};

//MAIN FUNCTION
var main = function (input) {
  console.log("Check game state when submit: ", gameState);
  console.log("Checking currentPlayer on submit: ", currentPlayer);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");
    //Call playerScore function
    outputMessage = getPlayerScore(input);
    if (outputMessage == "error") {
      return (
        "Error! Please only input '1' or '' to choose which dice to use as your first digit.<br><br>Your dice rolls are: <br>Dice 1: " +
        currentPlayerRolls[0] +
        " | Die 2: " +
        currentPlayerRolls[1] +
        "."
      );
    }
    if (currentPlayer == 1) {
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, next submit will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + "<br><br> Press submit to calculate scores!";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState == GAME_STATE_COMPARE_SCORES");
    //Call comparePlayersScore function
    outputMessage = comparePlayersScores();
    resetGame();
    console.log("Current player after reset", currentPlayer);
    console.log("Game state after reset", gameState);
    console.log("allPlayersScore array: ", allPlayerScore);
    // Return the game end response
    return outputMessage;
  }
};

/*
How many hours did you spend on this assignment?:
5 hours 
What part of the assignment did you spend the most time on?:
Error checking, Refactoring, developing reponses for the winning/losing conditions
How comfortable did you feel with this assignment? (1-5):
2
Is there anything in this code that you feel pleased about?:
States or modes of game play
What's one aspect of your code you would like specific, elaborate feedback on?:
How to make it to the most comfortable version
*/
