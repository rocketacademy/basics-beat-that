var firstArray;
var secondArray;
var currentStatus = 0;
var countPlayer1 = 0;
var countPlayer2 = 0;

var main = function (input) {
  console.log("current status is " + currentStatus);

  if (currentStatus == 0) {
    firstArray = rollDice();
    currentStatus = currentStatus + 1;
    var myOutputValue =
      "Welcome Player 1. <br> You rolled " +
      firstArray[0] +
      "for Dice 1 and " +
      firstArray[1] +
      "for Dice 2. <br> Choose the order of the dice.";
    console.log("first number of player 1 is " + firstArray[0]);
  } else if (currentStatus == 1) {
    console.log(firstArray[0]);
    if (input == 2) {
      firstArray.reverse();
      currentStatus++;
      var myOutputValue =
        "You have flipped, now your highest number is " + firstArray[0];
    } else if (input == 1) {
      var myOutputValue = "Your highest number is " + firstArray[0];
      currentStatus++;
    } else {
      var myOutputValue = "Please key in a valid number";
    }
  } else if (currentStatus == 2) {
    secondArray = rollDice();
    var myOutputValue =
      "Welcome Player 2. <br> You rolled " +
      secondArray[0] +
      "for Dice 1 and " +
      secondArray[1] +
      "for Dice 2. <br> Choose the order of the dice.";
    currentStatus = currentStatus + 1;
    console.log(secondArray[0] + " and " + secondArray[1]);
  } else if (currentStatus == 3) {
    if (input == 2) {
      secondArray.reverse();
      currentStatus++;
      var myOutputValue =
        "You have flipped, now your highest number is " + secondArray[0];
    } else if (input == 1) {
      var myOutputValue = "Your highest number is " + secondArray[0];
      currentStatus++;
    } else {
      var myOutputValue = "Please key in the number";
    }
  } else if (currentStatus == 4) {
    var myOutputValue = compareNumbers(firstArray, secondArray);
  } else {
  }
  return myOutputValue;
};

var rollDice = function () {
  var number1 = getRandomIndex(6) + 1;
  var number2 = getRandomIndex(6) + 1;
  var arrayCreated = [number1, number2];
  return arrayCreated;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var compareNumbers = function (inputArray1, inputArray2) {
  if (inputArray1[0] > inputArray2[0]) {
    countPlayer1++;
    currentStatus = 0;

    return (
      "Player 1 wins! " +
      inputArray1[0] +
      " is greater than " +
      inputArray2[0] +
      " and the count for player 1 is " +
      countPlayer1
    );
  } else if (inputArray1[0] < inputArray2[0]) {
    countPlayer2++;
    currentStatus = 0;
    return (
      "Player 2 wins! " +
      inputArray2[0] +
      " is greater than " +
      inputArray1[0] +
      " and the count for player 2 is " +
      countPlayer2
    );
  } else {
    return "Error!";
  }
};
