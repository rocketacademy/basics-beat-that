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
var playerTwoArray = [];
var playerOneFinalNumber = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  var myOutputValue = "";

  if (playerOneArray.length == 0) {
    var diceRollCounter = 0;
    while (diceRollCounter < 2) {
      playerOneArray.push(rollDice());
      diceRollCounter = diceRollCounter + 1;
    }
    myOutputValue = `Player 1 has rolled ${playerOneArray[0]} and ${playerOneArray[1]}.<br>Which dice (1 or 2) would you choose to be placed as the first digit?`;
  } else if (playerOneArray.length != 0) {
    if (input == 1) {
      var playerOneFinalNumber =
        playerOneArray[0].toString() + playerOneArray[1].toString();
      myOutputValue = `Player 1 has chosen dice 1 to be placed as the first digit.<br>Player 1's number is ${playerOneFinalNumber}.`;
    } else if (input == 2) {
      var playerOneFinalNumber =
        playerOneArray[1].toString() + playerOneArray[0].toString();
      myOutputValue = `Player 1 has chosen dice 2 to be placed as the first digit.<br>Player 1's number is ${playerOneFinalNumber}.`;
    }
  }
  return myOutputValue;
};
