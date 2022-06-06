var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

var main = function (input) {
  var outputMessage = "";
  if (gameState == "GAME_STATE_DICE_ROLL") {
    outputMessage = playerDiceRoll();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  } else {
    outputMessage = getPlayerScore(input);
    // gameState = GAME_STATE_DICE_ROLL;
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
    playerRolls.push(diceRoll());
    counter += 1;
  }
  return (
    "Welcome!<br><br>Your rolled:<br>Dice 1: " +
    playerRolls[0] +
    " | Dice 2: " +
    playerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as he first digit. <br><br>Your dice rolls are: <br>Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[1] +
      "."
    );
  } else if (playerInput == 1) {
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
  } else {
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }
  return "Your chosen value is: " + playerScore;
};
