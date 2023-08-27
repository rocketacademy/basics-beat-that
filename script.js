/*
write function to roll dice.

main function should have 
for player 1:
a loop that rolls dice twice, and save number into array,
auto sort array
display final number to user,
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

  // if no player1 dice rolls detected
  if (playerOneArray.length == 0) {
    var playerOneDiceRollCounter = 0;
    while (playerOneDiceRollCounter < 2) {
      playerOneArray.push(rollDice());
      playerOneDiceRollCounter = playerOneDiceRollCounter + 1;
    }
    myOutputValue = `Player 1 has rolled ${playerOneArray[0]} and ${playerOneArray[1]}.`;
    playerOneArray.sort(function (a, b) {
      return b - a;
    });
    playerOneFinalNumber =
      playerOneArray[0].toString() + playerOneArray[1].toString();
    myOutputValue += `<br>Player 1's number is ${playerOneFinalNumber}.
    <br><br> Player 2, please press Submit for your dice roll.`;

    // else if Player 1's number is not 0, and no player2 dice rolls detected
  } else if (playerOneFinalNumber != 0 && playerTwoArray.length == 0) {
    var playerTwoDiceRollCounter = 0;
    while (playerTwoDiceRollCounter < 2) {
      playerTwoArray.push(rollDice());
      playerTwoDiceRollCounter = playerTwoDiceRollCounter + 1;
    }
    myOutputValue = `Player 2 has rolled ${playerTwoArray[0]} and ${playerTwoArray[1]}.`;
    playerTwoArray.sort(function (a, b) {
      return b - a;
    });
    playerTwoFinalNumber =
      playerTwoArray[0].toString() + playerTwoArray[1].toString();
    myOutputValue += `<br>Player 2's number is ${playerTwoFinalNumber}.`;

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
