// Project #2 - Beat That!

// Globals
var modeRoll = "roll";
var modeChoose = "choose";
var mode = "roll";
var playerRolls = [];

// Dice Roll Function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Roll 2 Dice Function
var rollTwoDice = function () {
  for (let counter = 0; counter < 2; counter += 1) {
    playerRolls.push(rollDice());
  }
  return (
    "Player 1 rolls a " +
    playerRolls[0] +
    " and a " +
    playerRolls[1] +
    ".<br><br> Key in '1' or '2' to choose the order of your dice."
  );
};

// Choose Order Function
var chooseOrder = function (chosenNumber) {
  if (chosenNumber == 1) {
    return (
      "Player 1, you have chosen Dice 1 first.<br><br> Your combined number is " +
      Number(String(playerRolls[0]) + String(playerRolls[1])) +
      ".<br><br> It is now Player 2's turn to roll."
    );
  }
  if (chosenNumber == 2) {
    return (
      "Player 1, you have chosen Dice 2 first.<br><br> Your combined number is " +
      Number(String(playerRolls[1]) + String(playerRolls[0])) +
      ".<br><br> It is now Player 2's turn to roll."
    );
  }
  if (chosenNumber != 1 && chosenNumber != 2) {
    return (
      "You did not key in a valid order. Please key in '1' or '2' to choose the order of your dice and try again. <br><br> Your dice rolls were " +
      playerRolls[0] +
      " and " +
      playerRolls[1] +
      "."
    );
  }
};

// Main Function
var main = function (input) {
  var myOutputValue = "";

  // Roll mode + update to choose after
  if (mode == "roll") {
    myOutputValue = rollTwoDice();
    mode = "choose";
    return myOutputValue;
  }
  if (mode == "choose") {
    myOutputValue = chooseOrder(input);
    return myOutputValue;
  }

  return myOutputValue;
};
