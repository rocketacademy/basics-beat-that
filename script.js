var gameMode = "selectNumPlayers"; //or "playerSelectOrder" "reportResult" "playerRoll";
var playerNum = 1;
var totalPlayerNum = 0;
var playerChoices = [];
var playerScores = [];
var diceRolls = [];
var concat1 = 0;
var concat2 = 0;

var main = function (input) {
  if (gameMode == "selectNumPlayers") {
    totalPlayerNum = input;
    if (isNaN(input) || totalPlayerNum == 0) {
      return "Please input number of players";
    }

    for (var counter = 0; counter < totalPlayerNum; counter += 1) {
      playerScores[counter] = 0;
    }
    gameMode = "playerRoll";
    return "Now Player 1 goes first. Click Submit to roll the dice.";
  }

  while (playerNum < totalPlayerNum) {
    if (gameMode == "playerRoll") {
      gameMode = "playerSelectOrder";
      return rollTwoDice();
    }

    if (gameMode == "playerSelectOrder") {
      playerSelectionMessage = storePlayerChoices(input);
      playerNum += 1;
      gameMode = "playerRoll";
      playerSelectionMessage += `<br>It is now Player ${playerNum}'s turn. Click Submit to roll the dice`;
      return playerSelectionMessage;
    }
  }

  if (gameMode == "playerRoll" && playerNum == totalPlayerNum) {
    gameMode = "playerSelectOrder";
    return rollTwoDice();
  }

  if (gameMode == "playerSelectOrder" && playerNum == totalPlayerNum) {
    playerSelectionMessage = storePlayerChoices(input);
    gameMode = "reportResult";
    playerSelectionMessage += "<br>Click Submit to see the results";
    return playerSelectionMessage;
  }

  if (gameMode == "reportResult") {
    results = `${playerChoices} ${playerScores}`;
    // results = `Player 1 has ${playerChoices[0]}, Player 2 has ${playerChoices[1]}, Player 1 has total score ${playerScores[0]}, Player 2 has total score ${playerScores[1]}<br>Click Submit to play another round`;
    playerNum = 1;
    gameMode = "playerRoll";
    return results;
  }
};

var diceRoll = function () {
  var randomSixInteger = 1 + Math.floor(Math.random() * 6);
  return randomSixInteger;
};

var rollTwoDice = function () {
  var playerName = `Player ${playerNum}`;
  var dice1 = diceRoll().toString();
  var dice2 = diceRoll().toString();
  concat1 = Number(dice1 + dice2);
  concat2 = Number(dice2 + dice1);
  var rollResultMessage = `Welcome ${playerName}.<br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>Choose the order of the dice.<br><br>1. Dice1, Dice2 - ${concat1}<br>2. Dice2, Dice1 - ${concat2}`;
  return rollResultMessage;
};

var diceRollXTimes = function (x, highOrLowMode) {
  var randomSixInteger = 1 + Math.floor(Math.random() * 6);
  return randomSixInteger;
};

var storePlayerChoices = function (input) {
  var playerSelectionMessage = `Player ${playerNum}, `;
  if (input == 1) {
    playerChoices[playerNum - 1] = concat1;
    playerSelectionMessage += `you chose Dice 1 first.<br>Your number is ${concat1}.`;
    playerScores[playerNum - 1] += concat1;
  } else {
    playerChoices[playerNum - 1] = concat2;
    playerSelectionMessage += `you chose Dice 2 first.<br>Your number is ${concat2}.`;
    playerScores[playerNum - 1] += concat2;
  }
  return playerSelectionMessage;
};
