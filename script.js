var diceRoll = function () {
  return Math.ceil(Math.random() * 6) + 1;
};

var player1Result = 0;
var player1Dice = [];
var player1Choice = 0;

var player2Result = 0;
var player2Dice = [];
var player2Choice = 0;
var minMode = false;

var concatNum = function (firstNum, secondNum) {
  return Number(firstNum) * 10 + Number(secondNum);
};

var winNum = function (inputArr) {
  var winNum = 0;
  var winNumIndex = 0;
  var sortedArr = [];
  var outputNum = 0;

  inputLength = inputArr.length;
  var loopCounter = 0;

  while (loopCounter < inputLength) {
    //Find winning number in remainder of input array and add it to sorted list
    if (minMode) {
      winNum = Math.min.apply(null, inputArr);
    } else {
      winNum = Math.max.apply(null, inputArr);
    }
    sortedArr.push(winNum);

    //Remove the winning number from remainder of input array list
    winNumIndex = inputArr.indexOf(winNum);
    inputArr.splice(winNumIndex, 1);

    loopCounter++;
  }

  loopCounter = 0;
  while (loopCounter < inputLength) {
    outputNum = outputNum + sortedArr.pop() * 10 ** loopCounter;

    loopCounter++;
  }

  return outputNum;
};

var userChoiceValidate = function (input) {
  if (input != 1 || input != 2) {
    return false;
  } else {
    return true;
  }
};

var main = function (input) {
  if (player1Dice1 == 0) {
    player1Dice1 = diceRoll();
    player1Dice2 = diceRoll();

    return `Welcome Player 1.<br>You rolled ${player1Dice1} for Dice 1 and ${player1Dice2} for Dice 2.<br>Choose which dice goes first.`;
  }
  if (player1Dice1 != 0 && player1Result == 0) {
    if (userChoiceValidate(input) == false) {
      return "Please choose either dice 1 or dice 2 as your first dice.";
    } else {
      if (player1Choice == 1) {
        player1Result = concatNum(player1Dice1, player1Dice2);
      } else {
        player1Result = concatNum(player1Dice2, player1Dice1);
      }
    }
  }
};
