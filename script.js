var randomRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

myOutputValue = "";

var player1 = [];
var player2 = [];

var gameMode = "Welcome Player 1";

var player1ChoiceMsg = function (input) {
  var message = "Player 1, you chose " + input + " first";
  return message;
};

var player2ChoiceMsg = function (input) {
  var message = "Player 2, you chose " + input + " first";
  return message;
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
    var p1Choice = input;
    console.log(p1Choice);
    if (p1Choice == "1") {
      var p1NumberStr = player1[0] + player1[1];
      console.log(p1NumberStr);
      var p1Number = parseInt(p1NumberStr);
      myOutputValue =
        player1ChoiceMsg(p1Choice) +
        "<br>" +
        "your number is " +
        p1Number +
        "<br>" +
        "it is now player 2 turn to choose";
      gameMode = "Welcome Player 2";
      return myOutputValue;
    } else if (p1Choice == "2") {
      p1NumberStr = player1[1] + player1[0];
      p1Number = parseInt(p1NumberStr);
      myOutputValue =
        player1ChoiceMsg(p1Choice) +
        "<br>" +
        "your number is " +
        p1Number +
        "<br>" +
        "it is now player 2 turn to choose";
      gameMode = "Welcome Player 2";
      return myOutputValue;
    } else {
      myOutputValue = "choose which dice to come first";
      return myOutputValue;
    }
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
    var p2Choice = input;
    console.log(p2Choice);
    if (p2Choice == "1") {
      var p2NumberStr = player2[0] + player2[1];
      console.log(p2NumberStr);
      var p2Number = parseInt(p2NumberStr);
      myOutputValue =
        player2ChoiceMsg(p2Choice) + "<br>" + "your number is " + p2Number;
      gameMode = "decision";
      return myOutputValue;
    } else if (p2Choice == "2") {
      p2NumberStr = player2[1] + player2[0];
      p2Number = parseInt(p2NumberStr);
      myOutputValue =
        player2ChoiceMsg(p2Choice) + "<br>" + "your number is " + p2Number;
      gameMode = "decision";
      return myOutputValue;
    } else {
      myOutputValue = "choose which dice to come first";
      return myOutputValue;
    }
  }

  if (gameMode == "decision") {
    // this doesn't work?????
    console.log(p2Number);
    console.log(p1Number);
    if (p2Number > p1Number) {
      myOutputValue = "Player 2 wins!";
    } else if (p1Number > p2Number) {
      myOutputValue = "Player 1 wins!";
    }
    return myOutputValue;
  }
};
