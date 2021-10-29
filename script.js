var gameMode = "selectNumPlayers"; //or "playerSelectOrder" "reportResult" "playerRoll";
var playerNum = 1;
var totalPlayerNum = 2;
var totalDiceRolls = 0;
var playerChoices = [];
var playerScores = [];
var concat1 = 0;
var concat2 = 0;
var highOrLowMode = "high";

var main = function (input) {
  if (gameMode == "selectNumPlayers") {
    if (isNaN(input) || !input) {
      return "Please input number of players";
    }
    totalPlayerNum = input;

    for (var counter = 0; counter < totalPlayerNum; counter += 1) {
      playerScores[counter] = 0;
    }
    gameMode = "selectNumDice";
    return "Please input number of dice";
  }

  if (gameMode == "selectNumDice") {
    if (isNaN(input) || !input) {
      return "Please input number of dice";
    }
    totalDiceRolls = input;
    gameMode = "playerRoll";
    return "Now Player 1 goes first. Click Submit to roll the dice.";
  }

  while (playerNum < totalPlayerNum) {
    if (gameMode == "playerRoll") {
      if (totalDiceRolls != 2) {
        playerSelectionMessage = diceRollXTimes(totalDiceRolls, "high");
        playerSelectionMessage += `<br><br>It is now Player ${playerNum}'s turn. Click Submit to roll the dice`;
        return playerSelectionMessage;
      } else {
        gameMode = "playerSelectOrder";
        return rollTwoDice();
      }
    }

    if (gameMode == "playerSelectOrder") {
      var playerSelectionMessage = storePlayerChoices(input);
      playerNum += 1;
      gameMode = "playerRoll";
      playerSelectionMessage += `<br>It is now Player ${playerNum}'s turn. Click Submit to roll the dice`;
      return playerSelectionMessage;
    }
  }

  if (gameMode == "playerRoll" && playerNum == totalPlayerNum) {
    if (totalDiceRolls != 2) {
      playerSelectionMessage = diceRollXTimes(totalDiceRolls, "high");
      playerSelectionMessage += "<br>Click Submit to see the results";
      gameMode = "reportResult";
      return playerSelectionMessage;
    } else {
      gameMode = "playerSelectOrder";
      return rollTwoDice();
    }
  }

  if (gameMode == "playerSelectOrder" && playerNum == totalPlayerNum) {
    playerSelectionMessage = storePlayerChoices(input);
    gameMode = "reportResult";
    playerSelectionMessage += "<br>Click Submit to see the results";
    return playerSelectionMessage;
  }

  if (gameMode == "reportResult") {
    results = "";

    for (var playerCount = 0; playerCount < totalPlayerNum; playerCount += 1) {
      results += `Player ${playerCount + 1} current score is ${
        playerChoices[playerCount]
      }, total score is ${playerScores[playerCount]}<br>`;
    }

    playerNum = 1;
    gameMode = "playerRoll";
    results +=
      "<br> Click submit to play another round - Player 1 starts first";
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
  var diceRollsSort = [];
  var diceRolls = [];
  for (var diceCount = 0; diceCount < x; diceCount += 1) {
    diceRolls[diceCount] = diceRoll();
    diceRollsSort[diceCount] = diceRolls[diceCount];
  }

  if (highOrLowMode == "high") {
    diceRollsSort.sort(function (a, b) {
      return b - a;
    });
  } else {
    diceRollsSort.sort(function (a, b) {
      return a - b;
    });
  }
  diceConcat = "";
  for (var diceCount = 0; diceCount < x; diceCount += 1) {
    diceConcat += diceRollsSort[diceCount].toString();
  }
  playerChoices[playerNum - 1] = Number(diceConcat);
  playerScores[playerNum - 1] += playerChoices[playerNum - 1];
  playerNum += 1;
  return `Your dice rolls are ${diceRolls}, the best combination is ${Number(
    diceConcat
  )}`;
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
