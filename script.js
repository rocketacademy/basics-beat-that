var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMAPRE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayer = 1;
var currentPlayerRolls = [];
var allPlayerScore = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log(currentPlayerRolls);
  return (
    "Welcome Player " +
    currentPlayer +
    "! Player 1 These are the chosen dice numbers " +
    currentPlayerRolls[0] +
    " and " +
    currentPlayerRolls[1] +
    " Please choose 1 if you want the first dice number to be the first digit or choose 2 if you want the second dice number to be the second digit. Player 2 These are the chosen dice numbers " +
    currentPlayerRolls[2] +
    " and " +
    currentPlayerRolls[3] +
    " Please choose 3 if you want the first dice number to be the first digit or choose 4 if you want the second dice number to be the second digit."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  } else if (playerInput == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  } else if (playerInput == 3) {
    var playerScore = Number(
      String(currentPlayerRolls[2]) + String(currentPlayerRolls[3])
    );
  } else if (playerInput == 4) {
    var playerScore = Number(
      String(currentPlayerRolls[3]) + String(currentPlayerRolls[2])
    );
  }
  allPlayerScore.push(playerScore);
  return "You chose " + playerScore;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return (myOutputValue = rollDiceForPlayer());
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER && currentPlayer == 1) {
    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    myOutputValue = getPlayerScore(input);
    return (
      myOutputValue +
      " it is player 2's turn. Please press submit to see the dice rolls."
    );
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER && currentPlayer == 2) {
    gameState = GAME_STATE_COMPARE_SCORES;
    myOutputValue = getPlayerScore(input);
    return myOutputValue + " click submit to see who won";
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    myOutputValue =
      "player 1 chose " +
      allPlayerScore[0] +
      " player 2 chose " +
      allPlayerScore[1];
    if (allPlayerScore[0] > allPlayerScore[1]) {
      return (
        myOutputValue +
        " player 1 wins. please refresh the page to start the game again"
      );
    }
    if (allPlayerScore[0] < allPlayerScore[1]) {
      return (
        myOutputValue +
        " player 2 wins. please refresh the page to start the game again"
      );
    }
  }
};
