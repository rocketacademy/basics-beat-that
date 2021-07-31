// Global var for gamemode
var rollDice = "rollDice";
var chooseDice = "chooseDice";

// Start with rollDice
var gameMode = "rollDice";

// Player turn

var currentPlayer = 1;

// Store rolls in array
var player1Rolls = [];
var player2Rolls = [];

//  Diceroll

var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

// Playerscore
var player1Score = 0;
var player2Score = 0;

// run diceRoll twice - generate an array
var playerRoll = function () {
  var diceArray = [diceRoll(), diceRoll()];

  if (currentPlayer === 1) {
    player1Rolls = diceArray;
  } else {
    player2Rolls = diceArray;
  }
  return diceArray;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var main = function (input) {
  // console.log("gamemode", gameMode);
  // console.log("player", currentPlayer);
  if (gameMode === "rollDice") {
    playerRoll();
    if (currentPlayer === 2) {
      gameMode = "chooseDice";
      return (
        player2Rolls +
        " are the dice rolls. Type 1 to submit the first dice and 2 for the second dice"
      );
    }
    gameMode = "chooseDice";
    // console.log("gamemode", gameMode);
    // console.log("player", currentPlayer);
    return (
      player1Rolls +
      " are the dice rolls. Type 1 to submit the first dice and 2 for the second dice"
    );
  }

  if (gameMode == "chooseDice") {
    if (currentPlayer === 1 && input == 1) {
      // console.log("gamemode", gameMode);
      // console.log("player", currentPlayer);
      gameMode = "rollDice";
      currentPlayer = 2;
      // console.log("gamemode", gameMode);
      // console.log("player", currentPlayer);
      player1Score = concatenate2Numbers(player1Rolls[0], player1Rolls[1]);
      return (
        player1Score +
        " is the player 1 score. Click submit to roll for player 2"
      );
    }

    if (currentPlayer === 1 && input == 2) {
      gameMode = "rollDice";
      currentPlayer = 2;
      player1Score = concatenate2Numbers(player1Rolls[1], player1Rolls[0]);
      return (
        player1Score +
        " is the player 1 score. Click submit to roll for player 2"
      );
    }
    if (currentPlayer === 2 && input == 1) {
      player2Score = concatenate2Numbers(player2Rolls[0], player2Rolls[1]);
      if (player2Score < player1Score)
        return (
          "Player 1 score is " +
          player1Score +
          " and player 2 score is " +
          player2Score +
          " Player 2 loses"
        );
      if (player2Score > player1Score)
        return (
          "Player 1 score is " +
          player1Score +
          " and player 2 score is " +
          player2Score +
          " Player 2 wins"
        );
    }
    if (currentPlayer === 2 && input == 2)
      player2Score = concatenate2Numbers(player2Rolls[1], player2Rolls[0]);
    gameMode = "rollDice";
    currentPlayer == 1;
    if (player2Score < player1Score)
      return (
        "Player 1 score is " +
        player1Score +
        " and player 2 score is " +
        player2Score +
        " Player 2 loses"
      );
    if (player2Score > player1Score)
      return (
        "Player 1 score is " +
        player1Score +
        " and player 2 score is " +
        player2Score +
        "Player 2 wins"
      );
  }
};
