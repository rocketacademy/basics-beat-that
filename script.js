var gameMode_DiceRoll = "gameMode_DiceRoll";
var gameMode_DiceOrder = "gameMode_DiceOrder";
var gameMode = gameMode_DiceRoll;
var player = 1;
var dice1 = [];
var dice2 = [];
var player1Choice = [];
var player2Choice = [];

var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomRoll = Math.floor(randomNumber) + 1;
  return randomRoll;
};

var diceRollTwice = function () {
  var diceRolls = [diceRoll(), diceRoll()];
  return diceRolls;
};

var joinNumber = function (digit1, digit2) {
  return Number(String(digit1) + String(digit2));
};

var numberOrder = function (firstDigit) {
  if (firstDigit == 1) {
    return `joinNumber(dice[0], dice[1])`;
  }
  return `joinNumber(dice[1], dice[0])`;
};

var main = function (input) {
  if (gameMode == gameMode_DiceRoll) {
    gameMode = gameMode_DiceOrder;
    var dice = diceRollTwice();
    return `Player ${player}! <br><br> You rolled Dice 1: ${dice[0]} and Dice 2 ${dice[1]}. <br> Choose the order by entering 1 or 2 for thr first digit.`;
  }

  if (gameMode == gameMode_DiceOrder) {
    var firstDigit = input;
    if (input != 1 && input != 2) {
      return `Please ONLY enter 1 or 2!😡`;
    }
    var number = numberOrder(firstDigit);
  }
};
