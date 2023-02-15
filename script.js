/*
Math.random for dice rolls from 0 to 7. Then, Math.floor + 1;

Return the values and convert them into a string. Add this 2 strings together.
Before adding together, find out which value is bigger than each other using comparison
operators such as < > =
This will be the final value. Convert this value back to int or use Number()
Repeat the functions for the following player.

*/

var number = [];

var rollDice = function () {
  var generatedNumber = Math.random() * 7;
  var rolledNumber = Math.floor(generatedNumber) + 1;
  return rolledNumber;
};

var numberOfRolls = function (input) {
  var myOutputValue = "Player is rolling ...<br><br>";

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

  return (myOutputValue = myOutputValue + `<br> Your number is ${string}.`);
};

var main = function (input) {
  var rollResults = diceRolledHighest(input);

  var myOutputValue = rollResults;
  return myOutputValue;
};
