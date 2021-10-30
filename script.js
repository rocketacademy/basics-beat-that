// Global variables for state
var numberOfPlayers = 2;
var firstPlayer = "";
var secondPlayer = "";
var gameStage = "how many players";
var playerTurn = 1;

var dice1 = "";
var dice2 = "";
var firstPlayerNumber = 0;
var secondPlayerNumber = 0;
var firstPlayerCount = 0;
var secondPlayerCount = 0;

// Random dice roll mechanics
var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var outputNumber = Math.floor(randomNumber) + 1;
  return String(outputNumber);
};

// Dice roll stage
var stageDiceRoll = function () {
  dice1 = diceRoll();
  dice2 = diceRoll();
  var outputReply = `Your dice rolls are as follows: ${dice1}, ${dice2}. Please select which dice to be used first.`;
  gameStage = "choose order";
  return outputReply;
};

// Decide dice order
var stageDiceOrder = function (userInput) {
  if (userInput == 1) {
    combinedNumber = dice1 + dice2;
  }
  if (userInput == 2) {
    combinedNumber = dice2 + dice1;
  }
  if (playerTurn == 1 && gameStage == "choose order") {
    firstPlayerNumber = combinedNumber;
    var outputReply1 = `Your number is ${firstPlayerNumber}. ${secondPlayer}'s turn to roll and choose a dice order!`;
  }
  if (playerTurn == 2 && gameStage == "choose order") {
    secondPlayerNumber = combinedNumber;
    outputReply1 = `Your number is ${secondPlayerNumber}. ${firstPlayer}'s turn to roll and choose a dice order!`;
  }
  return outputReply1;
};

var main = function (input) {
  if (gameStage == "how many players") {
    numberOfPlayers = input;
    gameStage = "name";
    var myOutputValue = `Please key in name of 1st player.`;
    return myOutputValue;
  }
  if (gameStage == "name" && firstPlayer == "") {
    if (input == "") {
      return "Invalid. Enter name.";
    }
    firstPlayer = input;
    var stage2out = `Welcome ${firstPlayer}! Please now key in name of 2nd player.`;
    return stage2out;
  }
  if (gameStage == "name" && firstPlayer != "" && secondPlayer == "") {
    if (input == "") {
      return "Invalid. Enter name.";
    }
    secondPlayer = input;
    stage2out = `Welcome ${secondPlayer}! ${firstPlayer}'s turn, please press submit to generate the dice roll.`;
    gameStage = "player roll";
    return stage2out;
  }
  if (gameStage == "player roll") {
    var stage3out = stageDiceRoll(input);
    return stage3out;
  }
  if (gameStage == "choose order") {
    stage3out = stageDiceOrder(input);
    gameStage = "scoring";
  }

  if (gameStage == "scoring") {
    if (playerTurn == 1) {
      firstPlayerCount = firstPlayerCount + Number(combinedNumber);
      if (firstPlayerCount > secondPlayerCount) {
        leader = firstPlayer;
      } else {
        leader = secondPlayer;
      }
      var standing = `<br><br>Current total score:<br>${firstPlayer}: ${firstPlayerCount}<br>${secondPlayer}: ${secondPlayerCount}<br>${leader} is leading!`;
      gameStage = "player roll";
      playerTurn = (playerTurn % numberOfPlayers) + 1;
    } else {
      secondPlayerCount = secondPlayerCount + Number(combinedNumber);
      if (firstPlayerCount > secondPlayerCount) {
        leader = firstPlayer;
      } else {
        leader = secondPlayer;
      }
      var standing = `<br><br>Current total score:<br>${firstPlayer}: ${firstPlayerCount}<br>${secondPlayer}: ${secondPlayerCount}<br>${leader} is leading!`;
      gameStage = "player roll";
      playerTurn = (playerTurn % numberOfPlayers) + 1;
    }
  }
  return stage3out + standing;
};
