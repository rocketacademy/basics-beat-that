var gameMode = "p1rolldice";
var p1Number = 0;
var p2Number = 0;
var p1diceRoll1 = 0;
var p1diceRoll2 = 0;
var p2diceRoll1 = 0;
var p2diceRoll2 = 0;

//create function for rolling dice

var diceRoll = function () {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
};

//create function for getting final number based on player's chosen sequence

var getFinalNumber = function (input, diceRoll1, diceRoll2) {
  var finalNumber = 0;
  if (input == 1) {
    finalNumber = diceRoll1 * 10 + diceRoll2;
  } else if (input == 2) {
    finalNumber = diceRoll2 * 10 + diceRoll1;
  }
  return finalNumber;
};

//create function for deciding who wins the game

var getWinner = function (p1Number, p2Number) {
  var winner = "";
  if (p1Number > p2Number) {
    winner = "Player 1 wins!";
  } else if (p1Number < p2Number) {
    winner = "Player 2 wins!";
  } else {
    winner = "It's a tie!";
  }
  console.log(winner);
  return winner;
};

//create main function

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "p1rolldice") {
    p1diceRoll1 = diceRoll();
    p1diceRoll2 = diceRoll();
    myOutputValue =
      "Welcome Player 1!<br><br>You rolled " +
      p1diceRoll1 +
      " for dice one and " +
      p1diceRoll2 +
      " for dice two.<br><br>Choose the order of the dice by entering '1' or '2.";
    gameMode = "p1order";
  } else if (gameMode == "p1order") {
    p1Number = getFinalNumber(input, p1diceRoll1, p1diceRoll2);
    myOutputValue =
      "You chose Dice " +
      input +
      " first. Your number is " +
      p1Number +
      "<br><br>It is now Player 2's turn.";
    gameMode = "p2rolldice";
  } else if (gameMode == "p2rolldice") {
    p2diceRoll1 = diceRoll();
    p2diceRoll2 = diceRoll();
    myOutputValue =
      "Welcome Player 2!<br><br>You rolled " +
      p2diceRoll1 +
      " for dice one and " +
      p2diceRoll2 +
      " for dice two.<br><br>Choose the order of the dice by entering '1' or '2.";
    gameMode = "p2order";
  } else if (gameMode == "p2order") {
    p2Number = getFinalNumber(input, p2diceRoll1, p2diceRoll2);
    myOutputValue =
      "You chose Dice " +
      input +
      " first. Your number is " +
      p2Number +
      "<br><br>Now, please click the submit button to show the winner.";
    gameMode = "show results";
  } else if ((gameMode = "show results")) {
    var winner = getWinner(p1Number, p2Number);
    myOutputValue =
      winner +
      "<br><br>Player 1 score is " +
      p1Number +
      "<br><br>Player 2 score is " +
      p2Number;
  }
  return myOutputValue;
};
