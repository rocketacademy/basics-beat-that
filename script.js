var gameMode = "Number of players";
var numPlayers = 0;
var numDices = 0;
var numberList = [];

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "Number of players") {
    numPlayers = input;
    gameMode = "Number of dices";
    myOutputValue = "Please enter the number of dice for the play.";
    return myOutputValue;
  }

  if (gameMode == "Number of dices") {
    numDices = input;
    gameMode = "Players roll dice";
    myOutputValue = "Press submit for all players to roll dice.";
    return myOutputValue;
  }

  if (gameMode == "Players roll dice") {
    for (let i = 0; i < numPlayers; i += 1) {
      var diceList = [];
      var maxNum = "";
      for (let j = 0; j < numDices; j += 1) {
        diceNum = diceRoll();
        diceList.push(diceNum);
        console.log("dice" + j + ": " + diceNum);
      }

      diceList.sort((a, b) => b - a);
      console.log(diceList);

      for (let k = 0; k < diceList.length; k += 1) {
        maxNum = maxNum + "" + diceList[k];
      }
      console.log(maxNum);
      numberList.push(Number(maxNum));
    }
    console.log(numberList);
    gameMode = "Which player win";
    myOutputValue = "Press submit to see which player win.";
    return myOutputValue;
  }

  if (gameMode == "Which player win") {
    var playerNum = numberList.indexOf(Math.max(...numberList)) + 1;
    console.log("player " + playerNum);
    myOutputValue =
      "Player 1 to " +
      numPlayers +
      " max combination are " +
      numberList +
      " respectively.<br><br>" +
      "Player " +
      playerNum +
      " wins! <br><br> Please enter the number of players for the next round.";

    gameMode = "Number of players";
    numPlayers = 0;
    numDices = 0;
    numberList = [];
    return myOutputValue;
  }
};

var diceRoll = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};
