var players = "player1";
var count = 1;
var dice1 = 0;
var dice2 = 0;

var rollDice = function () {
  return Math.floor(Math.random() * 6);
};

var resultNumber = function (choice, firstDice, secondDice) {
  if (choice == 1) {
    var finalNumber = firstDice.toString() + secondDice.toString();
    return finalNumber;
  } else if (choice == 2) {
    var finalNumber = secondDice.toString() + firstDice.toString();
    return finalNumber;
  }
};

var main = function (input) {
  if (count == 1) {
    dice1 = rollDice();
    dice2 = rollDice();
    count += 1;
    return `Welcome ${players}.<br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>Choose the order of the dice.`;
  } else {
    var playerResult = resultNumber(input, dice1, dice2);
    count = 1;
    return `${players}, you chose Dice ${input} first.<br>Your number is ${playerResult}.<br>It is now Player 2's turn`;
  }
};
