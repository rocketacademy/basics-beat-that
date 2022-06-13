var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var main = function (input) {
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    outputMessage = playerDiceRoll();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  } else if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1 && !outputMessage.includes("Error")) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      outputMessage =
        outputMessage +
        "<br><br>It is now Player " +
        currentPlayer +
        "'s turn!";
    } else if (currentPlayer == 2 && !outputMessage.includes("Error")) {
      gameState = GAME_STATE_COMPARE_SCORES;
      outputMessage =
        outputMessage + "<br><br>Press submit to calculate scores!";
    }
  } else if (gameState == GAME_STATE_COMPARE_SCORES) {
    outputMessage = comparePlayersScore();
    resetGame();
  }
  return outputMessage;
};

var diceRoll = function () {
  var randDecimal = Math.random() * 6;
  var randInteger = Math.floor(randDecimal);
  return randInteger + 1;
};

var playerDiceRoll = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(diceRoll());
    counter += 1;
  }
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>Your rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as he first digit. <br><br>Your dice rolls are: <br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  } else if (playerInput == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  } else {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  currentPlayerRolls = [];
  return "Your chosen value is: " + playerScore;
};

var comparePlayersScore = function () {
  compareMessage =
    "Player 1 score: " +
    allPlayersScore[0] +
    "<br>Player 2 score: " +
    allPlayersScore[1];

  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  } else if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  } else if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>It's a tie!";
  }
  compareMessage = compareMessage + "<br><br>Press submit to reset game.";
  return compareMessage;
};

var resetGame = function () {
  gameState = GAME_STATE_DICE_ROLL;
  currentPlayerRolls = [];
  currentPlayer = 1;
  allPlayersScore = [];
};
