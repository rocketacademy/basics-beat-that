//=====================Rules================================|
//There will be 2 players and 2 dice.
//The players will take turns to roll the dice.
//Both players will then pick the order of each of the two dice results in which they want their 2 digit number to form.
// After both players have rolled their dice and selected their dice sequence, the player that chooses the higher combined number wins.

// Global variables
var DICE_ROLL = "DICE_ROLL";
var DICE_ORDER = "DICE_ORDER";
var COMPARE_SCORES = "COMPARE_SCORES";

var playerRolls = [];
var currentPlayer = 1; // Initialize with player 1
var allPlayerScores = [];

var gameState = DICE_ROLL; // Initialize the game state

var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random Integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output, randomInteger: ", randomInteger);

  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls: ", playerRolls);

  return (
    "Welcome to the Beat That! Game✨<br><br>You have rolled:<br>🎲Dice One: " +
    playerRolls[0] +
    "  🎲Dice Two: " +
    playerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to select the corresponding dice to be used as the first digit of your final value."
  );
};

// Input validation
var getPlayerScore = function (input) {
  if (input !== "1" && input !== "2") {
    return (
      "❌Error Alert❌<br><br> Please only input '1' or '2' to choose the dice to use as first digit.<br><br>Your dice rolls are:<br>🎲Dice One: " +
      playerRolls[0] +
      "  🎲Dice Two: " +
      playerRolls[1] +
      "."
    );
  }

  var playerScore;
  if (input == 1) {
    playerScore = Number(playerRolls[0] + "" + playerRolls[1]);
  } else if (input == 2) {
    playerScore = Number(playerRolls[1] + "" + playerRolls[0]);
  }

  //store player score in array
  allPlayerScores.push(playerScore);

  //clear current player rolls array
  playerRolls = [];

  return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayersScores = function () {
  var compareMessage = "";

  //player 1 wins
  if (allPlayerScores[0] > allPlayerScores[1]) {
    compareMessage = "Player 1 wins!🥳";

    //player 2 wins
  } else if (allPlayerScores[0] < allPlayerScores[1]) {
    compareMessage = "Player 2 wins!🥳";

    //tie
  } else {
    compareMessage = "It's a tie!";
  }

  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = DICE_ROLL;
  allPlayerScores = [];
};

var main = function (input) {
  var outputMessage = "";

  if (gameState == DICE_ROLL) {
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    gameState = DICE_ORDER; // Change the game state
  } else if (gameState == DICE_ORDER) {
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = DICE_ROLL;
      outputMessage += "<br><br>It is Player 2's turn now!";
    } else {
      gameState = COMPARE_SCORES;
      outputMessage += "<br><br>Press submit to tabulate the scores!";
    }
  } else if (gameState == COMPARE_SCORES) {
    outputMessage =
      "Player 1 score: " +
      allPlayerScores[0] +
      "<br>Player 2 score: " +
      allPlayerScores[1];
    outputMessage += "<br><br>" + comparePlayersScores();
    resetGame();
  }

  return outputMessage;
};
