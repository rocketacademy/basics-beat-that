var player1Roll = [];
var player2Roll = [];

// player chooses dice order
//

//rolls 2 dice
var twoRolls = function () {
  var firstDiceroll = diceRoll();
  var secondDiceroll = diceRoll();
  var myOutputValue = "";
  myOutputValue = `You rolled ${firstDiceroll} for Dice 1 and ${secondDiceroll} for Dice 2`;
};
//dice order
var diceOrder = function () {
  myOutputValue = `Please enter which dice, first or second, to go first.`;
  if ((input = "first"))
    myOutputValue = `your number is now ${firstDiceroll} ${secondDiceroll}`;
  else if ((input = "second"))
    myOutputValue = `your number is now ${secondDiceroll} ${firstDiceroll}`;
};

// diceroll variable
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";
  // first player rolls
  var playerDice1 = [diceRoll(), diceRoll()];
  var playerDice2 = [diceRoll(), diceRoll()];
  myOutputValue = "Player 1 rolls " + playerDice1;
  console.log(`rolling dice`);
  return myOutputValue;

  
};
