// The game starts in "roll the dice" mode
var gameMode = "roll the dice";

// Player 1 goes first
var currentPlayerNumber = 1;

var myOutputValue = "";

// Store the first player's rolls in an array
var firstPlayerResult = [];

// Store the second player's rolls in an array
var secondPlayerResult = [];

// If this is first player's turn, store roll dice results into player 1's array
if (currentPlayerNumber == 1) {
  firstPlayerResult = [rollDice(), rollDice()];
}
// else, store the roll dice results in player 2's array
else {
  secondPlayerResult = [rollDice(), rollDice()];
}

// If game mode is "roll the dice", print the welcome message and the result of 1st and 2nd dice rolls
if (gameMode == "roll the dice") {
  myOutputValue =
    "Welcome to the Beat That game Player " +
    currentPlayerNumber +
    ". <br> You have rolled the following dices:" +
    firstPlayerResult +
    "<br> Choose the order of the dice by entering '1' or '2'";

  return myOutputValue;
}

var main = function (input) {
  // If game mode is "roll the dice", print the welcome message and the result of 1st and 2nd dice rolls for Player 1.
  if (gameMode == "roll the dice") {
    myOutputValue =
      "Welcome to the Beat That game Player " +
      currentPlayerNumber +
      ". <br> You have rolled " +
      firstPlayerResult[0] +
      " and " +
      firstPlayerResult[1] +
      ". <br> Choose the order of the dice by entering '1' or '2'";
  }

  return myOutputValue;
};

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};
