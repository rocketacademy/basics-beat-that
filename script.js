// requirements
// 1. there are 2 players and players take turn
// 2. when a player clicks submit, the game rolls 2 dice and shows the dice roll, for example 1 and 2
// 3. the player picks the order of the dice they want. For example, if they want 21, they specify that Dice 2 goes 1st
// 4. After both players rolled and chose the dice order, the player with the higher combined number wins

var myOutputValue = "";
var playerTurn = 1;
var gameMode = "generate number";
var valueOfDice1 = 0;
var valueOfDice2 = 0;
var playerNumber = 0;
var player1Number = 0;
var player2Number = 0;

var main = function (input) {
  // if input isn't blank
  if (gameMode == "generate number" && input != "") {
    return "What are you doing? Please follow instructions and just click Submit without filling in anything.";
  }

  // for Player 1
  if (playerTurn == 1) {
    if (gameMode == "generate number") {
      console.log(gameMode);
      return playerGenerateTheirNumber();
    }

    if (gameMode == "pick order") {
      console.log(gameMode);
      return playerPickTheirOrder(input);
    }
  }

  // for Player 2
  if (playerTurn == 2) {
    if (gameMode == "generate number") {
      return playerGenerateTheirNumber();
    }
    if (gameMode == "pick order") {
      return playerPickTheirOrder(input);
    }
  }

  if (gameMode == "compare results") {
    if (player1Number > player2Number) {
      myOutputValue =
        "Player 1, you won.<br><br>Player 1's number: " +
        player1Number +
        "<br><br>Player 2's number: " +
        player2Number +
        resetGameMessage();
    } else if (player2Number > player1Number) {
      myOutputValue =
        "Player 2, you won.<br><br>Player 1's number: " +
        player1Number +
        "<br><br>Player 2's number: " +
        player2Number +
        resetGameMessage();
    } else {
      myOutputValue =
        "Surprise! Surprise! It's a draw.<br><br>Player 1's number: " +
        player1Number +
        "<br><br>Player 2's number: " +
        player2Number +
        resetGameMessage();
    }
    gameMode = "ready for reset";
    return myOutputValue;
  }

  if (gameMode == "ready for reset") {
    myOutputValue = "";
    playerTurn = 1;
    gameMode = "generate number";
    valueOfDice1 = 0;
    valueOfDice2 = 0;
    playerNumber = 0;
    player1Number = 0;
    player2Number = 0;
    return "Game has been reset. Player 1 can start first by clicking Submit.";
  }
};

var playerGenerateTheirNumber = function () {
  gameMode = "pick order";
  return randomDiceNumbers();
};

var randomDiceNumbers = function () {
  valueOfDice1 = generateRandomNumber();
  valueOfDice2 = generateRandomNumber();
  return (
    "Welcome Player " +
    playerTurn +
    ".<br><br>You rolled " +
    valueOfDice1 +
    " for Dice 1 and " +
    valueOfDice2 +
    " for Dice 2.<br><br>Choose the order of the dice."
  );
};

var generateRandomNumber = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 6 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var randomNumber = randomInteger + 1;

  return randomNumber;
};

var playerPickTheirOrder = function (input) {
  if (playerTurn == 1) {
    if (input != 1 && input != 2) {
      return diceOrderErrorMessage();
    } else {
      myOutputValue = sortOrder(input) + player2TurnMessage();
      player1Number = playerNumber;
      playerTurn = 2;
      gameMode = "generate number";
      return myOutputValue;
    }
  }

  if (playerTurn == 2) {
    if (input != 1 && input != 2) {
      return diceOrderErrorMessage();
    } else {
      myOutputValue = sortOrder(input) + compareResultsTurnMessage();
      player2Number = playerNumber;
      gameMode = "compare results";
      return myOutputValue;
    }
  }
};

var diceOrderErrorMessage = function () {
  return (
    "Error, Player " +
    playerTurn +
    "!<br><br>Please input only 1 or 2.<br><br>You rolled " +
    valueOfDice1 +
    " for Dice 1 and " +
    valueOfDice2 +
    " for Dice 2.<br><br>Choose the order of the dice again."
  );
};

var sortOrder = function (whichIsFirst) {
  if (whichIsFirst == 1) {
    playerNumber = valueOfDice1.toString() + valueOfDice2.toString();
  }

  if (whichIsFirst == 2) {
    playerNumber = valueOfDice2.toString() + valueOfDice1.toString();
  }
  return (
    "Player " +
    playerTurn +
    ", you chose Dice " +
    whichIsFirst +
    " first.<br><br>Your number is " +
    playerNumber +
    "."
  );
};

var player2TurnMessage = function () {
  return "<br><br>It is now Player 2's turn. Player 2, please click Submit to roll your dices.";
};

var compareResultsTurnMessage = function () {
  return "<br><br>Let's find out who won. Please click Submit to know the winner.";
};

var resetGameMessage = function () {
  return "<br><br>Want to play again? Simply click Submit for another round!";
};
