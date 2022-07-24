var diceRoll = function () {
  return Math.ceil(Math.random() * 6) + 1;
};

var player1Result = 0;
var player2Result = 0;

var concatNum = function (firstNum, secondNum) {
  return firstNum * 10 + secondNum;
};
