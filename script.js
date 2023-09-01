/*
This version allows user to input an integer > 1 as the number of dice rolls per player.
*/

var playerOneArray = [];
var playerTwoArray = [];
var playerOneFinalNumber = 0;
var playerTwoFinalNumber = 0;
var n = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  var myOutputValue = "";
  // save input as number of dice rolls
  if (n == 0) {
    numberInput = Number(input);
    if (Number.isInteger(numberInput) && input > 1) {
      n = input;
      myOutputValue = `You have chosen to play ${n} dice rolls.<br><br>Player 1, please press Submit to roll the dice.`;
    } else {
      myOutputValue = `Please enter an integer that is greater than 1.`;
    }
  }
  // if no player1 dice rolls detected
  else if (playerOneArray.length == 0) {
    var playerOneDiceRollCounter = 0;
    while (playerOneDiceRollCounter < n) {
      playerOneArray.push(rollDice());
      playerOneDiceRollCounter = playerOneDiceRollCounter + 1;
    }
    myOutputValue = `Player 1 has rolled ${playerOneArray}.`;
    playerOneArray.sort(function (a, b) {
      return b - a;
    });
    playerOneFinalNumber = Number(playerOneArray.join(""));
    myOutputValue += `<br>Player 1's number is ${playerOneFinalNumber}.
    <br><br> Player 2, please press Submit for your dice roll.`;

    // else if Player 1's number is not 0, and no player2 dice rolls detected
  } else if (playerOneFinalNumber != 0 && playerTwoArray.length == 0) {
    var playerTwoDiceRollCounter = 0;
    while (playerTwoDiceRollCounter < n) {
      playerTwoArray.push(rollDice());
      playerTwoDiceRollCounter = playerTwoDiceRollCounter + 1;
    }
    myOutputValue = `Player 2 has rolled ${playerTwoArray}.`;
    playerTwoArray.sort(function (a, b) {
      return b - a;
    });
    playerTwoFinalNumber = Number(playerTwoArray.join(""));
    myOutputValue += `<br><br>Player 2's number is ${playerTwoFinalNumber}.`;

    if (playerOneFinalNumber == playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is also ${playerOneFinalNumber}.<br><br> It's a draw!<br><br>To play again, re-enter the number of dice rolls of your choice.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
      n = 0;
    } else if (playerOneFinalNumber > playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is ${playerOneFinalNumber}.<br><br> Player 1 wins!<br><br>To play again, re-enter the number of dice rolls of your choice.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
      n = 0;
    } else if (playerOneFinalNumber < playerTwoFinalNumber) {
      myOutputValue =
        myOutputValue +
        `<br> Player 1's number is ${playerOneFinalNumber}.<br><br> Player 2 wins!<br><br>To play again, re-enter the number of dice rolls of your choice.`;
      playerOneArray = [];
      playerTwoArray = [];
      playerOneFinalNumber = 0;
      playerTwoFinalNumber = 0;
      n = 0;
    }
  }
  return myOutputValue;
};
