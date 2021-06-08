var currentGameMode = "waiting for p1";
var playerOne = "";
var playerTwo = "";
var combineNumP1 = "";
var combineNumP2 = "";

// dice roll function
var rollDice = function () {
  var diceNum = Math.floor(Math.random() * 6 + 1);
  return diceNum;
};

var main = function (input) {
  if (currentGameMode == "waiting for p1") {
    // set playerOne name and switch game mode
    playerOne = input;
    currentGameMode = "waiting for p2";
    myOutputValue =
      "Welcome " + playerOne + ". Player2 please enter your username.";
  } else if (currentGameMode == "waiting for p2") {
    playerTwo = input;
    currentGameMode = "dice game p1";
    myOutputValue =
      "Welcome " + playerTwo + ". " + playerOne + " your turn starts.";
  } else if (currentGameMode == "dice game p1") {
    var dice1 = rollDice();
    var dice2 = rollDice();
    currentGameMode = "dice game p2";
    if (dice1 > dice2) {
      combineNumP1 = "" + dice1 + dice2;
      myOutputValue = playerOne + " the number you got is " + combineNumP1;
    } else {
      combineNumP1 = "" + dice2 + dice1;
      myOutputValue = playerTwo + " the number you got is " + combineNumP2;
    }
  } else if (currentGameMode == "dice game p2") {
    dice1 = rollDice();
    dice2 = rollDice();
    currentGameMode = "end game";
    if (dice1 > dice2) {
      combineNumP2 = "" + dice1 + dice2;
      myOutputValue = playerTwo + " the number you got is " + combineNumP2;
    } else {
      combineNumP2 = "" + dice2 + dice1;
      myOutputValue = playerTwo + " the number you got is " + combineNumP2;
    }
  } else if (currentGameMode == "end game") {
    if (combineNumP1 > combineNumP2) {
      myOutputValue = playerOne + " wins";
    } else {
      myOutputValue = playerTwo + " wins";
    }
  }
  return myOutputValue;
};
