/*
This version allows user to input an integer > 1 as the number of dice rolls per player.
*/

var playerOneArray = [];
var playerTwoArray = [];
var playerOneFinalNumber = 0;
var playerTwoFinalNumber = 0;
var n = 0;
var button = document.querySelector("#submit-button");
var field = document.querySelector("#input-field");

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var enterNumberOfDiceRolls = function (input) {
  numberInput = Number(input);
  if (Number.isInteger(numberInput) && input > 1) {
    n = input;
    output = `You have chosen to play ${n} dice rolls.<br><br><span style="font-weight: 600">Player 1</span>, please roll the dice.`;
    field.style.display = "none";
    button.innerText = "Roll dice";
  } else {
    output = `Please enter an integer that is greater than 1.`;
  }
  return output;
};

var rollDiceSaveInArray = function (player) {
  if (player == 1) {
    for (var counter = 0; counter < n; counter += 1) {
      playerOneArray.push(rollDice());
    }
    return playerOneArray;
  } else if (player == 2) {
    for (var counter = 0; counter < n; counter += 1) {
      playerTwoArray.push(rollDice());
    }
    return playerTwoArray;
  }
};

var calcPlayerFinalNumber = function (player) {
  if (player == 1) {
    playerOneArray.sort(function (a, b) {
      return b - a;
    });
    playerOneFinalNumber = Number(playerOneArray.join(""));
    return playerOneFinalNumber;
  } else if (player == 2) {
    playerTwoArray.sort(function (a, b) {
      return b - a;
    });
    playerTwoFinalNumber = Number(playerTwoArray.join(""));
    return playerTwoFinalNumber;
  }
};

var generateOutcome = function () {
  var additionalString = "";
  if (playerOneFinalNumber == playerTwoFinalNumber) {
    additionalString = `<br><br>Player 1's number is also ${playerOneFinalNumber}.<br><br><span style="font-weight: 600">It's a draw!</span>`;
  } else if (playerOneFinalNumber > playerTwoFinalNumber) {
    additionalString = `<br><br>Player 1's number is ${playerOneFinalNumber}.<br><br><span style="font-weight: 600">Player 1 wins!</span>`;
  } else if (playerOneFinalNumber < playerTwoFinalNumber) {
    additionalString = `<br><br>Player 1's number is ${playerOneFinalNumber}.<br><br><span style="font-weight: 600">Player 2 wins!</span>`;
  }
  return additionalString;
};

var main = function (input) {
  var myOutputValue = "";
  // save input as number of dice rolls
  if (n == 0) {
    var myOutputValue = enterNumberOfDiceRolls(input);
  }
  // if no player1 dice rolls detected
  else if (playerOneArray.length == 0) {
    var arrayOne = rollDiceSaveInArray(1);
    myOutputValue = `Player 1 has rolled ${arrayOne}.`;
    var finalNumberPlayerOne = calcPlayerFinalNumber(1);
    myOutputValue += `<br><br>Player 1's number is ${finalNumberPlayerOne}.
    <br><br><span style="font-weight: 600">Player 2</span>, please roll the dice.`;

    // else if Player 1's number is not 0, and no player2 dice rolls detected
  } else if (playerOneFinalNumber != 0 && playerTwoArray.length == 0) {
    var arrayTwo = rollDiceSaveInArray(2);
    myOutputValue = `Player 2 has rolled ${arrayTwo}.`;
    var finalNumberPlayerTwo = calcPlayerFinalNumber(2);
    myOutputValue += `<br><br>Player 2's number is ${finalNumberPlayerTwo}.`;
    var addString = generateOutcome();
    myOutputValue += addString;
    button.innerText = "Play again";
  } else if (playerOneFinalNumber != 0 && playerTwoFinalNumber != 0) {
    playerOneArray = [];
    playerTwoArray = [];
    playerOneFinalNumber = 0;
    playerTwoFinalNumber = 0;
    n = 0;
    field.style.display = "block";
    button.innerText = "Go!";
    myOutputValue = `To start, enter the number of dice rolls to play.`;
  }

  return myOutputValue;
};
