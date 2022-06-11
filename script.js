var GAME_MODE_DICE_ROLL = 'GAME MODE DICE ROLL';
var GAME_MODE_DICE_ORDER = 'GAME MODE DICE ORDER';
var gameMode = 'GAME MODE DICE ROLL';

var playerRolls = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter += 1;
  }
  return "Welcome Player 1. <br> You rolled " + playerRolls[0] + " for Dice 1 and" + playerRolls[1] + " for Dice 2. <br> Please choose the order of the dice."
};

var getPlayerResult = function () {
  var playerResult = '';
  if (input != 1 && input != 2) {
    return "Error! Please only enter 1 or 2, depending on which dice you would like to choose as the first digit of your number <br> You rolled " + playerRolls[0] + " for Dice 1 and" + playerRolls[1] + " for Dice 2.";
  } else if (input == 1) {
    playerResult = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Player 1, you chose Dice 1 first. <br> Your number is " + playerResult + "<br> It is now Player 2's turn."
  } else if (input == 2) {
    playerResult = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Player 1, you chose Dice 2 first. <br> Your number is " + playerResult + "."
  }

  var main = function (input) {
    var myOutputValue = '';
    if (gameMode == GAME_MODE_DICE_ROLL) {
      myOutputValue = rollDiceForPlayer();
      gameMode = GAME_MODE_DICE_ORDER;
    } else if (gameMode == GAME_MODE_DICE_ORDER) {
      myOutputValue = getPlayerResult(input)
    }
    return outputMessage;
  }
};
