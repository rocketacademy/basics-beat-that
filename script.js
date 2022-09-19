//===REQUIREMENTS===//
// 1) There are 2 players and players take turns
// 2) When a player clicks submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6
// 3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first
// 4) After both players have rolled and chosen dice order, the player with the higher combined number wins.

//===PROBLEM BREAKDOWN AND PLANNING===//
// ver 1. rolls 2 dice and returns the output for 1 player. The player chooses the dice order and get the correct return output.
// ver 2. refactor code to include player 2
//        - global variables to include current player; allPlayersScore
//        - refactor outputMessages to interact with each player, 1 and 2
//        - write logic for player 1 to go first the player 2, and finally point towards comparing score
// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page

// Global Variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES ";

// Start The Game In The Following State
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

// Helper Function
var rollDice = function () {
  console.log("5. Start of rollDice()");
  // Random decimal between 0 and 6
  // var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  // var randomInteger = Math.floor(randomDecimal) + 1;
  var randomIntegerOnDice = [1, 2, 3, 4, 5, 6];
  var randomInteger =
    randomIntegerOnDice[Math.floor(Math.random() * randomIntegerOnDice.length)];
  console.log("6. rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("4. Start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log(
    "7. rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ".<br><br>Now, please choose either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // Input validation
  // if (playerInput != 1 && playerInput != 2) {
  //   console.log("3bi. Input not 1 or 2");
  //   return (
  //     "Error! Please only input '1' or '2' to choose which dice to use as the first digit. <br><br> Your dice rolls are: <br> Dice 1: " +
  //     currentPlayerRolls[0] +
  //     " | Dice 2: " +
  //     currentPlayerRolls[1] +
  //     "."
  //   );
  // }

  // Input == 1
  if (playerInput == 1) {
    console.log("3bii. Input == 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  // Input == 2
  if (playerInput == 2) {
    console.log("3biii. Input == 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  // Store playerScore in array
  allPlayersScore.push(playerScore);

  // Clear current player rolls array
  currentPlayerRolls = [];

  return (
    "Player " + currentPlayer + ",your chosen value is: " + playerScore + "."
  );
};

var comparePlayersScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayersScore[0] +
    "<br>Player 2 score: " +
    allPlayersScore[1];

  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage =
      compareMessage +
      "<br><br>Player 1 wins! Click on the dice button to restart the game!";
  }

  // player 2 wins<
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage =
      compareMessage +
      "<br><br>Player 2 wins! Click on the dice button to restart the game!";
  }

  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage =
      compareMessage +
      "<br><br>It's a tie! Click on the dice button to restart the game!";
  }

  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var main = function (input) {
  console.log("1. Checking game state on submit click: ", gameState);
  console.log("2. Checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("3a. gameState == GAME_STATE_DICE_ROLL");
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("3b. gameState == GAME_STATE_CHOOSE_DICE_ORDER");
    // Call playerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("8. end of Player 1's turn, now player 2's turn!");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return (
        outputMessage +
        "<br><br>It is now Player 2's turn! Click on the dice button to roll the dice!"
      );
    }

    if (currentPlayer == 2) {
      console.log(
        "9. end of Player 2's turn, next click on the abacus button to calculate score!"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return (
        outputMessage +
        "<br><br>Click on the abacus button to calculate scores!"
      );
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("10. gameState == GAME_STATE_COMPARE_SCORES");

    outputMessage = comparePlayersScores();

    resetGame();
    console.log("11. Current player after reset: ", currentPlayer);
    console.log("12. Game state after reset: ", gameState);
    console.log("13. allPlayersScore array: ", allPlayersScore);

    return outputMessage;
  }
};
