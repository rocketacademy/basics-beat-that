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

var main = function (input) {
  var myOutputValue = "";
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
    gameStatus = "Start rolling"
    return myOutputValue;
  } else if (gameStatus == "Start rolling") {
    myOutputValue = numberOfPlayers(numberOfDices);
  }

  return myOutputValue;
};
