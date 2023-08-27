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
var playerTwoFinalNumber = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  var myOutputValue = "";

  if (playerOneArray.length == 0) {
    var playerOneDiceRollCounter = 0;
    while (playerOneDiceRollCounter < 2) {
      playerOneArray.push(rollDice());
      playerOneDiceRollCounter = playerOneDiceRollCounter + 1;
    }
    myOutputValue = `Player 1 has rolled ${playerOneArray[0]} and ${playerOneArray[1]}.<br>Which dice (1 or 2) would you choose to be placed as the first digit?`;
  } else if (playerOneArray.length != 0 && playerOneFinalNumber == 0) {
    if (input == 1) {
      playerOneFinalNumber =
        playerOneArray[0].toString() + playerOneArray[1].toString();
      myOutputValue = `Player 1 has chosen dice 1 to be placed as the first digit.<br>Player 1's number is ${playerOneFinalNumber}.`;
    } else if (input == 2) {
      playerOneFinalNumber =
        playerOneArray[1].toString() + playerOneArray[0].toString();
      myOutputValue = `Player 1 has chosen dice 2 to be placed as the first digit.<br>Player 1's number is ${playerOneFinalNumber}.`;
    }
    myOutputValue =
      myOutputValue +
      `<br><br> Player 2, please press Submit for your dice roll.`;
  } else if (playerOneFinalNumber != 0 && playerTwoArray.length == 0) {
    var playerTwoDiceRollCounter = 0;
    while (playerTwoDiceRollCounter < 2) {
      playerTwoArray.push(rollDice());
      playerTwoDiceRollCounter = playerTwoDiceRollCounter + 1;
    }
    myOutputValue = `Player 2 has rolled ${playerTwoArray[0]} and ${playerTwoArray[1]}.<br>Which dice (1 or 2) would you choose to be placed as the first digit?`;
  } else if (playerTwoArray.length != 0 && playerTwoFinalNumber == 0) {
    if (input == 1) {
      playerTwoFinalNumber =
        playerTwoArray[0].toString() + playerTwoArray[1].toString();
      myOutputValue = `Player 2 has chosen dice 1 to be placed as the first digit.<br>Player 2's number is ${playerTwoFinalNumber}.`;
    } else if (input == 2) {
      playerTwoFinalNumber =
        playerTwoArray[1].toString() + playerTwoArray[0].toString();
      myOutputValue = `Player 2 has chosen dice 2 to be placed as the first digit.<br>Player 2's number is ${playerTwoFinalNumber}.`;
    }
    if (playerOneFinalNumber == playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is also ${playerOneFinalNumber}.<br><br> It's a draw!<br><br>To play again, press Submit to roll dice for Player 1.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
    } else if (playerOneFinalNumber > playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is ${playerOneFinalNumber}.<br><br> Player 1 wins!<br><br>To play again, press Submit to roll dice for Player 1.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
    } else if (playerOneFinalNumber < playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is ${playerOneFinalNumber}.<br><br> Player 2 wins!<br><br>To play again, press Submit to roll dice for Player 1.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
    }
  }
  return myOutputValue;
};
