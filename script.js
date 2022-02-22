var numberOfPlayers = 2;
var numberOfDice = 2;
var diceRolls = [];
var beatThatScores1 = [];
var beatThatScores2 = [];
var beatThatTotal1 = 0;
var beatThatTotal2 = 0;
var playerCount = 0;
var diceRollCount = 0;
var winSequence = 0;

var rollSixDice = function () {
  var randomDiceRoll = Math.random() * 6;
  var randomInteger = Math.floor(randomDiceRoll) + 1;
  console.log("randomInteger", randomInteger);
  return randomInteger;
};

var beatThat = function () {
  while (diceRollCount < numberOfDice) {
    var rollDice = rollSixDice();
    console.log("rollDice", rollDice);
    diceRolls.push(rollDice);
    console.log("diceRolls", diceRolls);
    diceRollCount = diceRollCount + 1;
    console.log("diceRollCount", diceRollCount);
  }
  var myOutputValue =
    "Welcome Player " +
    (playerCount + 1) +
    "<br>You rolled " +
    diceRolls[0] +
    "  for Dice 1 and " +
    diceRolls[1] +
    " for Dice 2.<br>Choose the order of the dice.";
  return myOutputValue;
};

var winCheck = function () {
  var winMsg = "";
  console.log("beatThatScores1", beatThatScores1);
  console.log("beatThatScores2", beatThatScores2);
  if (beatThatTotal1 > beatThatTotal2) {
    winMsg =
      "Player 1 rolled:<br>" +
      beatThatScores1.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Player 2 rolled:<br>" +
      beatThatScores2.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Player 1 wins.<br>" +
      beatThatTotal1 +
      " is greater than " +
      beatThatTotal2;
  } else if (beatThatTotal1 == beatThatTotal2) {
    winMsg =
      "Player 1 rolled:<br>" +
      beatThatScores1.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Player 2 rolled:<br>" +
      beatThatScores2.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Draw! " +
      beatThatTotal1 +
      " is equals to " +
      beatThatTotal2;
  } else if (beatThatTotal1 < beatThatTotal2) {
    winMsg = winMsg =
      "Player 1 rolled:<br>" +
      beatThatScores1.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Player 2 rolled:<br>" +
      beatThatScores2.sort(function (a, b) {
        return b - a;
      }) +
      "<br>Player 2 wins.<br>" +
      beatThatTotal2 +
      " is greater than " +
      beatThatTotal1;
  }
  playerCount = 0;
  winSequence = 0;
  return winMsg;
};

var main = function (input) {
  var order = input;

  // var order = input;
  if (order == "" && winSequence == "") {
    var myGamePlay = beatThat();
    return myGamePlay;
  }
  while (playerCount < numberOfPlayers) {
    if (playerCount == 0) {
      if (order == 1) {
        var beatThatScore = "";
        beatThatScore = diceRolls[0] + "" + diceRolls[1];
        beatThatScores1.push(beatThatScore);
        beatThatTotal1 = Number(beatThatTotal1) + Number(beatThatScore);
        console.log("beatThatScores1", beatThatScores1);
        console.log("beatThatTotal1", beatThatTotal1);
      } else if (order == 2) {
        var beatThatScore = "";
        beatThatScore = diceRolls[1] + "" + diceRolls[0];
        beatThatScores1.push(beatThatScore);
        beatThatTotal1 = Number(beatThatTotal1) + Number(beatThatScore);
        console.log("beatThatScores1", beatThatScores1);
        console.log("beatThatTotal1", beatThatTotal1);
      }
      playerCount = playerCount + 1;
    } else {
      if (order == 1) {
        var beatThatScore = "";
        beatThatScore = diceRolls[0] + "" + diceRolls[1];
        beatThatScores2.push(beatThatScore);
        beatThatTotal2 = Number(beatThatTotal2) + Number(beatThatScore);
        console.log("beatThatScores2", beatThatScores2);
        console.log("beatThatTotal2", beatThatTotal2);
      } else if (order == 2) {
        var beatThatScore = "";
        beatThatScore = diceRolls[1] + "" + diceRolls[0];
        beatThatScores2.push(beatThatScore);
        beatThatTotal2 = Number(beatThatTotal2) + Number(beatThatScore);
        console.log("beatThatScores2", beatThatScores2);
        console.log("beatThatTotal2", beatThatTotal2);
      }
      playerCount = playerCount + 1;
    }
    order = "";
    diceRollCount = 0;
    diceRolls = [];
    if (playerCount == 1) {
      var myOutputValue =
        "Player 1" +
        "<br>Scores: " +
        beatThatScores1 +
        "<br><br>Press Play to Roll for Player 2";
      console.log("beatThatScores1", beatThatScores1);
    } else if (playerCount == 2) {
      var myOutputValue =
        "Player 2" +
        "<br>Score: " +
        beatThatScores2 +
        "<br><br>Click to reveal the winner";
      console.log("beatThatScores2", beatThatScores2);
      winSequence = 1;
    }
    return myOutputValue;
  }
  if (input == "" && winSequence == 1) {
    order = "";
    return winCheck();
  }
};
// keep return clean AF; double quote or sing quote is good
