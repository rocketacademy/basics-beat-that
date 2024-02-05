var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER = "GAME_MODE_CHOOSE_DICE_ORDER";
var gameMode = GAME_MODE_DICE_ROLL;
var GAME_MODE_COMPARE_SCORES = "GAME_MODE_COMPARE_SCORES";
var currentPlayer = 1;
var allPlayerScore = [];
var currentPlayerRolls = [];

var rollDice = function () {};

var comparePlayersScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    "Player 2 score: " +
    allPlayerScore[1];
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "Player 1 Wins!";
  }
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + "Player 2 Wins!";
  }
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "its a tie!";
  }
  return compareMessage;
};
var getPlayerScore = function (playerInput) {
  var playerScore;
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER) {
    if (playerInput != 1 && playerInput != 2) {
      return (
        "error.... Please only input '1' or '2' to choose which dice to use as the first digit. Dice 1: " +
        currentPlayerRolls[0] +
        " | Dice 2: " +
        currentPlayerRolls[1] +
        "."
      );
    }

    if (playerInput == 1) {
      var playerScore = Number(
        String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
      );
    }
    if (playerInput == 2) {
      var playerScore = Number(
        String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
      );
    }
    allPlayerScore.push(playerScore);
    currentPlayerRolls = [];
    return "Player " + currentPlayer + " your final value is: " + playerScore;
  }
};

var generateDiceNumber = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(generateDiceNumber());
    counter = counter + 1;
  }
  return (
    "Welcome! Player " +
    currentPlayer +
    " You rolled: Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2 : " +
    currentPlayerRolls[1] +
    ". Now please input either '1' if you want dice 1 to be the first digit or '2' if you want dice 2 to be the first digit of your final value"
  );
};

var main = function (input) {
  var outputMessage = "";
  if (gameMode == GAME_MODE_DICE_ROLL) {
    outputMessage = rollDiceForPlayer();
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (GAME_MODE_CHOOSE_DICE_ORDER) {
    outputMessage = getPlayerScore(input);
  }

  if (currentPlayer == 1) {
    currentPlayer = 2;
    gameMode = GAME_MODE_DICE_ROLL;
    return outputMessage + "<br>It is now Player's 2 turn!";
  }

  if (currentPlayer == 2) {
    gameMode = GAME_MODE_COMPARE_SCORES;
    return outputMessage + "Press the submit button to calculate who wins!";
  }

  if (gameMode == GAME_MODE_COMPARE_SCORES) {
    outputMessage = comparePlayersScores();
    return outputMessage;
  }
};
