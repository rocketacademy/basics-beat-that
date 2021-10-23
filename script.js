var gameMode = "playerRoll"; //or "playerSelectOrder" "reportResult"
var playerNum = 1;
var playerOneChoice = 0;
var playerTwoChoice = 0;
var concat1 = 0;
var concat2 = 0;

var main = function (input) {
  if (gameMode == "playerRoll") {
    gameMode = "playerSelectOrder";
    return rollTwoDice();
  }

  if (gameMode == "playerSelectOrder" && playerNum == 1) {
    var playerSelectionMessage = `Player ${playerNum}, `;
    playerNum += 1;
    var nextPlayerMessage = `It is now Player ${playerNum}'s turn. Click Submit to roll the dice`;
    if (input == 1) {
      playerOneChoice = concat1;
      playerSelectionMessage += `you chose Dice 1 first.<br>Your number is ${concat1}.<br>${nextPlayerMessage}`;
    } else {
      playerOneChoice = concat2;
      playerSelectionMessage += `you chose Dice 2 first.<br>Your number is ${concat2}.<br>${nextPlayerMessage}`;
    }
    gameMode = "playerRoll";
    return playerSelectionMessage;
  }

  if (gameMode == "playerSelectOrder" && playerNum == 2) {
    var playerSelectionMessage = `Player ${playerNum}, `;
    if (input == 1) {
      playerTwoChoice = concat1;
      playerSelectionMessage += `you chose Dice 1 first.<br>Your number is ${concat1}.<br>`;
    } else {
      playerTwoChoice = concat2;
      playerSelectionMessage += `you chose Dice 2 first.<br>Your number is ${concat2}.<br>`;
    }
    gameMode = "reportResult";
    return playerSelectionMessage;
  }

  if (gameMode == "reportResult") {
    results = `Player 1 has ${playerOneChoice}, Player 2 has ${playerTwoChoice}`;
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
