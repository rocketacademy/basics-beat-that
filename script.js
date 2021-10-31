var randomRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

myOutputValue = "";

var player1 = [];
var player2 = [];
var p2Number = "";
var p1Number = "";
var gameMode = "Welcome Player 1";
var number = "";
var p1Choice = Number("");
var p2Choice = Number("");

var player1ChoiceMsg = function (input) {
  var message = "Player 1, you chose " + input + " first";
  return message;
};

var player2ChoiceMsg = function (input) {
  var message = "Player 2, you chose " + input + " first";
  return message;
};

var finalNumber = function (input, player) {
  if (input == "1") {
    var result = `${player[0]}${player[1]}`;
    console.log(result);
    return result;
  } else if (input == "2") {
    result = `${player[1]}${player[0]}`;
    return result;
  }
};

var main = function (input) {
  if (gameMode == "Welcome Player 1") {
    var diceRoll1 = randomRoll();
    var diceRoll2 = randomRoll();
    var diceRoll1Str = diceRoll1.toString();
    var diceRoll2Str = diceRoll2.toString();
    player1.push(diceRoll1Str);
    player1.push(diceRoll2Str);
    myOutputValue =
      "Welcome Player 1" +
      "<br>" +
      "you rolled " +
      diceRoll1 +
      " for dice 1" +
      " and " +
      diceRoll2 +
      " for dice 2" +
      "<br>" +
      "Choose the order of the dice";
    gameMode = "player 1 choose dice";
    return myOutputValue;
  }

  if (gameMode == "player 1 choose dice") {
    p1Choice = finalNumber(input, player1);
    myOutputValue = p1Choice;
    gameMode = "Welcome Player 2";
    return myOutputValue;
  }

  if (gameMode == "Welcome Player 2") {
    var diceRoll3 = randomRoll();
    var diceRoll4 = randomRoll();
    var diceRoll3Str = diceRoll3.toString();
    var diceRoll4Str = diceRoll4.toString();
    player2.push(diceRoll3Str);
    player2.push(diceRoll4Str);
    myOutputValue =
      "Welcome Player 2" +
      "<br>" +
      "you rolled " +
      diceRoll3 +
      " for dice 1" +
      " and " +
      diceRoll4 +
      " for dice 2" +
      "<br>" +
      "Choose the order of the dice";
    gameMode = "player 2 choose dice";
    return myOutputValue;
  }

  if (gameMode == "player 2 choose dice") {
    p2Choice = finalNumber(input, player2);
    myOutputValue = p2Choice;
    gameMode = "decision";
    return myOutputValue;
  }

  if (gameMode == "decision") {
    // this doesn't work?????
    if (p2Choice > p1Choice) {
      myOutputValue = "Player 2 wins!";
      gameMode = "Welcome Player 1";
    } else if (p1Choice > p2Choice) {
      myOutputValue = "Player 1 wins!";
      gameMode = "Welcome Player 1";
    }
    return myOutputValue;
  }
};
