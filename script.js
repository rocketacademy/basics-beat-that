var myOutputValue = "";
var playerTurn = 1;
var gameMode = "generate number";
var valueOfDice1 = 0;
var valueOfDice2 = 0;
var playerNumber = 0;
var player1Number = 0;
var player2Number = 0;

var main = function (input) {
  // for Player 1
  if (playerTurn == 1) {
    console.log(gameMode);
    if (gameMode == "generate number") {
      myOutputValue = randomNumbers();
      gameMode = "pick order";
      console.log(gameMode);
      return myOutputValue;
    }

    if (gameMode == "pick order") {
      console.log(gameMode);
      myOutputValue = sortOrder(input);
      player1Number = playerNumber;
      playerTurn = 2;
      gameMode = "generate number";
      console.log(gameMode);
      return myOutputValue;
    }
  }

  // for Player 2
  if (playerTurn == 2) {
    if (gameMode == "generate number") {
      myOutputValue = randomNumbers();
      gameMode = "pick order";
      return myOutputValue;
    }
    if (gameMode == "pick order") {
      myOutputValue = sortOrder(input);
      player2Number = playerNumber;
      gameMode = "compare results";
      return myOutputValue;
    }
  }

  if (gameMode == "compare results") {
    if (player1Number > player2Number) {
      // winner is player 1
    } else {
      // winner is player 2
    }
  }
};

var randomNumbers = function () {
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
    ".<br><br>It is now Player 2's turn. Player 2, pease click Submit to roll your dices."
  );
};
