// Beat That Project

// Global Variable
var player1ready = false;
var player2ready = false;
var player1dice = false;
var player2dice = false;
var dice1;
var dice2;
var player1Number;
var player2Number;

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var checkUserInput = function (userInput) {
  if (userInput === "1" || userInput === "2") {
    return false;
  }
  return true;
};

var pickOrder = function (dice1, dice2, choice) {
  if (choice === "1") {
    return "" + dice1 + dice2;
  } else {
    return "" + dice2 + dice1;
  }
};

var main = function (input) {
  let myOutputValue = '';
  if (player1ready === false) {
    dice1 = rollDice();
    dice2 = rollDice();
    myOutputValue += "Welcome Player 1.<br><br>";
    myOutputValue += `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
    player1ready = true;
    return myOutputValue;
  }
  if (player1dice === false) {
    if (checkUserInput(input)) {
      return "Please return a valid input (1 or 2).";
    }
    player1Number = pickOrder(dice1, dice2, input);
    player1Number = parseInt(player1Number);
    console.log(player1Number);
  }
  return myOutputValue;
};
