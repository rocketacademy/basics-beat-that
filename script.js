// ===== REQUIREMENTS ==== //
//There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// ===== PROBLEN BREAKDOWN AND PLANNING ==== //
// Version 1 rolls 2 dice and turns the output for 1 player. the player chooses the dice order and get the correct return output
// Version 2 refactored code to include player 2
// - global variables for currentPlayer; allPlayerScore
// - refactor outputMessages to interact with each player, 1 and 2
// - write logic for player 1 to go first then player 2, and finally point towards comparing score
// Version 3 implement comparing dice scores and declare winner
// Version 4 resets the game so that the players can play continually without refreshing the browser page

// Global Variables
var gameState = "Instructions";
var gameStateDiceRoll = "Game_state_dice_roll";
var gameStateChooseOrder = "Game_state_choose_order";
var gameStateCompareScores = "Game_state_Compare_Score";
var gameState = gameStateDiceRoll;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayerScore = [];

// roll dice
var rollDice = function () {
  console.log("start of rollDice()");
  // random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("start rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("input validation, invalid input... NOT 1 AND NOT 2");
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as the first digit. <br><br>Your dice rolls are:<br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  }
  // input ==1
  if (playerInput == 1) {
    console.log("input==1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  // input ==2
  if (playerInput == 2) {
    console.log("input==2");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  // store playerScore in array
  allPlayerScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRolls = [];
  return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayersScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    "<br>Player 2 score: " +
    allPlayerScore[1];

  // player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  }

  // player 2 wins
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  }
  //tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>It's a tie!";
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = gameStateDiceRoll;
  allPlayerScore = [];
};

var main = function (input) {
  console.log("checking game state: ", gameState);
  console.log("checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";
  if (gameState == gameStateDiceRoll) {
    console.log("game state = gameStateDiceRoll ");
    // display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // change the game state
    gameState = gameStateChooseOrder;
    return outputMessage;
  }

  if (gameState == gameStateChooseOrder) {
    console.log("game state = gameStateChooseOrder ");
    // call playerScore function
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log("end of player 1, now player 2's turn");
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      console.log(
        "end of player 2's turn, next submit click will calculate player scores"
      );

      gameState = gameStateCompareScores;
      return outputMessage + "<br><br>Press submit to calculate scores!";
    }
  }

  if (gameState == gameStateCompareScores) {
    console.log("game state =gameStateCompareScores ");

    outputMessage = comparePlayersScores();
    resetGame();
    console.log("Current player after reset: ", currentPlayer);
    console.log("Game state after reset: ", gameState);
    console.log("allPlayerScore array: ", allPlayerScore);
    return outputMessage;
  }
};
