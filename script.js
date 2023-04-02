var gameMode = "Player One";
var numberlist = [];

var main = function () {
  var myOutputValue = "";

  if (gameMode == "Player One") {
    var diceOne = diceRoll();
    var diceTwo = diceRoll();
    var diceCombin = diceCompute(diceOne, diceTwo);

    numberlist.push(diceCombin);
    console.log(numberlist);
    gameMode = "Player Two";

    myOutputValue =
      "Welcome Player 1. <br><br> You rolled " +
      diceOne +
      " for Dice 1 and " +
      diceTwo +
      " for Dice 2.<br><br>" +
      "Your max number combination is " +
      diceCombin +
      ".<br><br>" +
      "It is now Player 2's turn.";

    return myOutputValue;
  }

  if (gameMode == "Player Two") {
    var diceOne = diceRoll();
    var diceTwo = diceRoll();
    var diceCombin = diceCompute(diceOne, diceTwo);

    numberlist.push(diceCombin);
    console.log(numberlist);

    var outcome = combinCompare();

    myOutputValue =
      "Welcome Player 2. <br><br> You rolled " +
      diceOne +
      " for Dice 1 and " +
      diceTwo +
      " for Dice 2.<br><br>" +
      "Your max number combination is " +
      diceCombin +
      ".<br><br>" +
      outcome +
      "<br><br> Press submit to play again.";

    gameMode = "Player One";
    numberlist = [];

    return myOutputValue;
  }
};

var diceRoll = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

var diceCompute = function (diceOne, diceTwo) {
  if (diceOne >= diceTwo) {
    var numCombin = "" + diceOne + diceTwo;
  } else {
    numCombin = "" + diceTwo + diceOne;
  }
  return Number(numCombin);
};

var combinCompare = function () {
  if (numberlist[0] > numberlist[1]) {
    result = "Player 1 wins!";
  } else if (numberlist[0] < numberlist[1]) {
    result = "Player 2 wins!";
  } else {
    result = "Its a draw.";
  }
  return result;
};
