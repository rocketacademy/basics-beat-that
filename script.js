var diceRoll = function () {
  return Math.ceil(Math.random() * 6) + 1;
};

var player1Result = 0;
var player1Dice1 = 0;
var player1Dice2 = 0;
var player1Choice = 0;
var player2Result = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var player2Choice = 0;

var concatNum = function (firstNum, secondNum) {
  return firstNum * 10 + secondNum;
};

var userChoiceValidate = function (input) {
  if (input != 1 || input != 2) {
    return false;
  } else {
    return true;
  }
};

var main = function (input) {
  if (player1Dice1 == 0) {
    player1Dice1 = diceRoll();
    player1Dice2 = diceRoll();

    return `Welcome Player 1.<br>You rolled ${player1Dice1} for Dice 1 and ${player1Dice2} for Dice 2.<br>Choose which dice goes first.`;
  }
  if (player1Dice1 != 0 && player1Result == 0) {
    if (userChoiceValidate(input) == false) {
      return "Please choose either dice 1 or dice 2 as your first dice.";
    } else {
      if (player1Choice == 1) {
        player1Result = concatNum(player1Dice1, player1Dice2);
      } else {
        player1Result = concatNum(player1Dice2, player1Dice1);
      }
    }
  }
};
