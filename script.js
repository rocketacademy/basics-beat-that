var gameMode = "game in play";

diceRolls = [];

var rollDice = function () {
  var noOfDiceFaces = 6;
  var diceNumber = Math.ceil(Math.random() * noOfDiceFaces);
  return diceNumber;
};

var roll2Dices = function () {
  diceRolls = [rollDice(), rollDice()];
  gameMode = "dice order selection";
  return `Your dice rolls:<br>Dice 1: ${diceRolls[0]} | Dice 2: ${diceRolls[1]}.<br><br>Please input either '1' or '2' to choose the corresponding dice as the first digit of your final value.`;
};

var selectDiceOrder = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please input only '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls:<br> Dice 1: | Dice 2: .`;
  }

  if (playerInput == 1) {
    var playerScore = Number(String(diceRolls[0]) + String(diceRolls[1]));
    return `Your chosen value is: ${playerScore}.`;
  }

  if (playerInput == 2) {
    var playerScore = Number(String(diceRolls[1]) + String(diceRolls[0]));
    return `Your chosen value is: ${playerScore}.`;
  }
};

var main = function (input) {
  if (gameMode == "game in play") {
    myOutputValue = roll2Dices();
  } else if (gameMode == "dice order selection") {
    myOutputValue = selectDiceOrder(input);
  }
  return myOutputValue;
};
