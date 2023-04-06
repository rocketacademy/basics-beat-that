var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;
var playerRolls = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome <br><br>You rolled:<br>Dice 1: ${playerRolls[0]}  | Dice 2: ${playerRolls[1]}`;
};

var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please input 1 or 2 to choose which dice to use as the first digit.<br><br> Your dice are:<br>Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}.`;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    if (playerInput == 1) {
      var playerScore = Number(String(playerRolls[0] + String(playerRolls[1])));
      return `Your chosen value is: ${playerScore}`;
    }
    if (playerInput == 2) {
      var playerScore = Number(String(playerRolls[1] + String(playerRolls[0])));
      return `Your chosen value is: ${playerScore}`;
    }
  }
};

var main = function (input) {
  var myOutputValue = " ";
  if (gameState == GAME_STATE_DICE_ROLL) {
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    myOutputValue = rollDiceForPlayer();
    return myOutputValue;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputValue = getPlayerScore(input);
    return myOutputValue;
  }
};
