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
  //ask user to choose how many players will play
  if (gameMode == "selectNumPlayers") {
    if (isNaN(input) || !input) {
      return "Please input number of players";
    }
    totalPlayerNum = input;
    //initialise array of player total scores with size totalPlayerNum
    for (var counter = 0; counter < totalPlayerNum; counter += 1) {
      playerScores[counter] = 0;
    }
    gameMode = "selectNumDice";
    return "Please input number of dice";
  }
  //ask user to choose how many dice to be rolled
  if (gameMode == "selectNumDice") {
    if (isNaN(input) || !input) {
      return "Please input number of dice";
    }
    totalDiceRolls = input;
    gameMode = "playerRoll";
    return "Now Player 1 goes first. Click Submit to roll the dice.";
  }
  //This loop lets all players (except last player) roll and choose the dice combis. If dice rolls is not two, diceRollXTimes function will auto choose the best combi
  while (playerNum < totalPlayerNum) {
    if (gameMode == "playerRoll") {
      if (totalDiceRolls != 2) {
        var diceResult = diceRollXTimes(totalDiceRolls, "high");
        return (diceResult += `<br><br>It is now Player ${playerNum}'s turn. Click Submit to roll the dice`);
      } else {
        gameMode = "playerSelectOrder";
        return rollTwoDice();
      }
    }
    //if two dice is rolled, this will ask user to choose the combi
    if (gameMode == "playerSelectOrder") {
      var playerSelectionMessage = storePlayerChoices(input);
      playerNum += 1;
      gameMode = "playerRoll";
      return (playerSelectionMessage += `<br>It is now Player ${playerNum}'s turn. Click Submit to roll the dice`);
    }
  }
  //Let last player play then proceed to change game mode to report result
  if (gameMode == "playerRoll" && playerNum == totalPlayerNum) {
    if (totalDiceRolls != 2) {
      diceResult = diceRollXTimes(totalDiceRolls, "high");
      gameMode = "reportResult";
      return (diceResult += "<br><br>Click Submit to see the results");
    } else {
      gameMode = "playerSelectOrder";
      return rollTwoDice();
    }
  }

  if (gameMode == "playerSelectOrder" && playerNum == totalPlayerNum) {
    playerSelectionMessage = storePlayerChoices(input);
    gameMode = "reportResult";
    return (playerSelectionMessage +=
      "<br><br>Click Submit to see the results");
  }

  if (gameMode == "reportResult") {
    var results = "";
    //find the winning score of current round and overall
    var maxPlayerChoices = Math.max.apply(null, playerChoices);
    var maxPlayerScores = Math.max.apply(null, playerScores);
    console.log("maxPlayerChoices", maxPlayerChoices);
    console.log("maxPlayerScores", maxPlayerScores);

    //loop through all players and output their current and overall scores
    for (var playerCount = 0; playerCount < totalPlayerNum; playerCount += 1) {
      results += `Player ${playerCount + 1} current score is ${
        playerChoices[playerCount]
      }, total score 
      is ${playerScores[playerCount]}<br>`;
    }

    //output the winners if their scores match the max value
    for (var playerCount = 0; playerCount < totalPlayerNum; playerCount += 1) {
      if (playerChoices[playerCount] == maxPlayerChoices) {
        results += `<br>The current winner is Player ${playerCount + 1}<br>`;
      }
      if (playerScores[playerCount] == maxPlayerScores) {
        results += `<br>The overall winner is Player ${playerCount + 1}<br>`;
      }
    }
    playerNum = 1;
    gameMode = "playerRoll";
    results +=
      "<br> Click submit to play another round - Player 1 starts first";
    return results;
  }
};
//dice roll function which generates random number of 1 to 6
var diceRoll = function () {
  var randomSixInteger = 1 + Math.floor(Math.random() * 6);
  return randomSixInteger;
};
//rolls two dices and stores 2 possible number combis in global variables concat1 concat2
var rollTwoDice = function () {
  var playerName = `Player ${playerNum}`;
  var dice1 = diceRoll().toString();
  var dice2 = diceRoll().toString();
  concat1 = Number(dice1 + dice2);
  concat2 = Number(dice2 + dice1);
  var rollResultMessage = `Welcome ${playerName}.<br>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>Choose the order of the dice.<br><br>1. Dice1, Dice2 - ${concat1}<br>2. Dice2, Dice1 - ${concat2}<br>Otherwise leave blank and let computer choose for you`;
  return rollResultMessage;
};
//rolls variable number of dices and stores the best number combi to player score arrays - playerChoices and playerScores
var diceRollXTimes = function (x, highOrLowMode) {
  var diceRollsSort = [];
  var diceRolls = [];
  //rolls dice x times and store into 2 arrays. diceRolls is the raw result, diceRollsSort will have its elements sorted
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
  //concatenate the sorted elements of the array as strings
  for (var diceCount = 0; diceCount < x; diceCount += 1) {
    diceConcat += diceRollsSort[diceCount].toString();
  }
  //convert the resulting string back to number and store the player score
  playerChoices[playerNum - 1] = Number(diceConcat);
  playerScores[playerNum - 1] += playerChoices[playerNum - 1];
  playerNum += 1;
  return `Your dice rolls are ${diceRolls}, the best combination is ${Number(
    diceConcat
  )}`;
};
//if 2 dices are rolled, this function asks for user to choose the dice order
var storePlayerChoices = function (input) {
  var playerSelectionMessage = `Player ${playerNum}, `;
  if (input == 1) {
    playerChoices[playerNum - 1] = concat1;
    playerSelectionMessage += `you chose Dice 1 first.<br>Your number is ${concat1}.`;
    playerScores[playerNum - 1] += concat1;
  } else if (input == 2) {
    playerChoices[playerNum - 1] = concat2;
    playerSelectionMessage += `you chose Dice 2 first.<br>Your number is ${concat2}.`;
    playerScores[playerNum - 1] += concat2;
  } else {
    var autoSelected = Math.max(concat1, concat2);
    playerSelectionMessage += `The auto selected number is ${autoSelected}`;
    playerChoices[playerNum - 1] = autoSelected;
    playerScores[playerNum - 1] += autoSelected;
  }
  return playerSelectionMessage;
};
