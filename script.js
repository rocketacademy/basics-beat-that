/*
Math.random for dice rolls from 0 to 7. Then, Math.floor + 1;

Return the values and convert them into a string. Add this 2 strings together.
Before adding together, find out which value is bigger than each other using comparison
operators such as < > =
This will be the final value. Convert this value back to int or use Number()
Repeat the functions for the following player.

Array should only be used when you want to generate a list and iterate it over and over again with loops.
*/

var number = [];
var gameStatus = "Number Of Players";
var currentPlayer = 1;
var totalNumberOfPlayers = 0;
var numberOfDices = 0;
var highscore = [];
var sortedList = [];

var rollDice = function () {
  var generatedNumber = Math.random() * 6;
  var rolledNumber = Math.floor(generatedNumber) + 1;
  return rolledNumber;
};

var numberOfRolls = function (input) {
  var myOutputValue = `Player ${currentPlayer} is rolling ...<br><br>`;

  for (var counter = 1; counter <= input; counter += 1) {
    var diceRolls = rollDice();
    myOutputValue =
      myOutputValue + `Player rolled ${diceRolls} for Dice ${counter}.<br>`;
    number.push(diceRolls);
  }

  return myOutputValue;
};

var index = 0;

var diceRolledHighest = function (input) {
  var myOutputValue = numberOfRolls(input);
  var string = "";
  for (var counter = 0; counter < number.length; counter += 1) {
    //Sort function for array in a descending order with b - a
    number.sort(function (a, b) {
      return b - a;
    });
    string += number[counter];
  }

  if (totalNumberOfPlayers > index) {
    highscore[index++] = string;
  } else {
    index = 0;
    highscore[index++] = string;
  }

  number.length = 0;

  myOutputValue = myOutputValue + `<br> Your number is ${string}.`;

  return myOutputValue;
};

var numberOfPlayers = function (numberOfDices) {
  if (currentPlayer <= totalNumberOfPlayers) {
    rollResults = diceRolledHighest(numberOfDices);
    currentPlayer += 1;
  } else {
    currentPlayer = 1;
    rollResults = diceRolledHighest(numberOfDices);
    currentPlayer += 1;
  }

  return rollResults;
};

var highscoreTable = function () {
  var outputScore = "";

  for (var x = 1; x <= totalNumberOfPlayers; x++) {
    /*
    highscore.sort(function (a, b) {
      return b - a;
    });
    outputScore += `${highscore[x - 1]} </br>`;
    */
    var object = {};
    object[`Player`] = x;
    object[`Score`] = highscore[x - 1];

    sortedList.push(object);
    sortedList.sort(function (a, b) {
      return b.Score - a.Score;
    });
    var reducedList = sortedList.reduce(
      (acc, curr) => `${acc}Player ${curr.Player} : ${curr.Score}<br>`,
      ""
    );
  }

  console.log(sortedList);
  outputScore = reducedList;
  sortedList.length = 0;

  return outputScore;
};

var main = function (input) {
  var myOutputValue = "";
  var scoreOutput = "";

  if (gameStatus == "Number Of Players") {
    var NUMBEROFPLAYERS = input;
    if (NUMBEROFPLAYERS < 2) {
      myOutputValue = `Please input more than 2.`;
    } else {
      totalNumberOfPlayers = NUMBEROFPLAYERS;
      myOutputValue = `${NUMBEROFPLAYERS} players are playing.`;
    }
    gameStatus = "Number Of Dices";
    return myOutputValue;
  } else if (gameStatus == "Number Of Dices") {
    numberOfDices = input;
    myOutputValue = `Number of dices are ${numberOfDices}.`;
    gameStatus = "Start rolling";
    return myOutputValue;
  } else if (gameStatus == "Start rolling") {
    myOutputValue = numberOfPlayers(numberOfDices);
    scoreOutput = highscoreTable();
  }

  var scoreTable = document.querySelector("#scoreTable");
  scoreTable.innerHTML = scoreOutput

  return myOutputValue;
};
