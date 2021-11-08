var main = function (input) {
  var myOutputValue;
  if (mode == "playerOneRoll") {
    playerOneArray = diceRoller();
    myOutputValue = `Player 1, you rolled: <br>Dice 1: ${playerOneArray[0]} <br>Dice 2: ${playerOneArray[1]}<br>Input 1 or 2 to select which dice as first numeral`;
    mode = "playerOneSelect";
  } else if (mode == "playerOneSelect") {
    results[0] = orderChooser(playerOneArray, input);
    myOutputValue = `Player 1, your score is ${results[0]}, Player 2 please roll`;
    mode = "playerTwoRoll";
  } else if (mode == "playerTwoRoll") {
    playerTwoArray = diceRoller();
    myOutputValue = `Player 2, you rolled: <br>Dice 1: ${playerTwoArray[0]} <br>Dice 2: ${playerTwoArray[1]}<br>Input 1 or 2 to select which dice as first numeral`;
    mode = "playerTwoSelect";
  } else if (mode == "playerTwoSelect") {
    results[1] = orderChooser(playerTwoArray, input);
    myOutputValue = `Player 2, your score is ${results[1]}, press enter to find the winner...`;
    mode = "winOrLose";
  } else if (mode == "winOrLose") {
    var scoreString = `Player 1's score: ${results[0]} <br> Player 2's score: ${results[1]} <br>`;

    if (results[0] > results[1]) {
      myOutputValue = scoreString + `Player one wins`;
    } else {
      myOutputValue = scoreString + "Player two wins";
    }
  }

  return myOutputValue;
};

var mode = "playerOneRoll";
var playerOneArray = [];
var playerTwoArray = [];
var results = [];

var diceRoller = function () {
  var diceArray = [];
  var randomDiceRoll = 0;
  for (i = 0; i < 2; i++) {
    randomDiceRoll = Math.floor(Math.random() * 6) + 1;
    diceArray[i] = randomDiceRoll;
  }
  return diceArray;
};

var orderChooser = function (inputArray, input) {
  var outputArray = [];
  if (input == 1) {
    outputArray = inputArray[input - 1] * 10 + inputArray[input];
  }
  if (input == 2) {
    outputArray = inputArray[input - 1] * 10 + inputArray[input - 2];
  }
  return outputArray;
};
