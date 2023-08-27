/*
write function to roll dice.

main function should have 
for player 1:
a loop that rolls dice twice, and save number into array,
call the numbers in array to display to user,
allow user to enter order of dice rolls in array,
for player 2:
same operations
then:
draw, 1>2, or 2>1
reset everything
*/

var playerOneArray = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  var myOutputValue = "hello world";
  var diceRollCounter = 0;
  while (diceRollCounter < 2) {
    playerOneArray.push(rollDice());
    diceRollCounter = diceRollCounter + 1;
  }
  myOutputValue = myOutputValue + playerOneArray;
  return myOutputValue;
};
