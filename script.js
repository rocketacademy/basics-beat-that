// The game starts in "roll the dice" mode
var gameMode = "roll the dice";

// Player 1 goes first
var currentPlayerNumber = 1;

// Store an empty string for myOutputValue
var myOutputValue = "";

// Create a variable for 1st and 2nd dice rolls
var diceRollOne;
var diceRollTwo;

// Store the first player's rolls in an array
var firstPlayerResult = [];

// Store the second player's rolls in an array
var secondPlayerResult = [];

// Create a variable for player 1's and player 2's selection respectively
var firstPlayerSelection;
var secondPlayerSelection;

// Create a function for generating random dice numbers
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

// Create a function for the result based on player's selection of "1" or "2"
var getConcatenate = function (oneOrTwo) {
  if (oneOrTwo == 1) {
    concatenatedResult = diceRollOne * 10 + diceRollTwo;
  } else if (oneOrTwo == 2) {
    concatenatedResult = diceRollTwo * 10 + diceRollOne;
  }
  return concatenatedResult;
};

// Create a function for comparing player 1's and player 2's selection to identify winner
var findWinner = function () {
  var winnerResult = "";
  // Player 1 wins
  if (firstPlayerSelection > secondPlayerSelection) {
    winnerResult = "Player 1 wins!";
  }
  // Player 2 wins
  else if (firstPlayerSelection < secondPlayerSelection) {
    winnerResult = "Player 2 wins!";
  }
  // It's a tie, neither player 1 nor player 2 wins
  else {
    winnerResult = "It's a tie!";
  }
  return winnerResult;
};

var main = function (input) {
  // Check if the game mode is "roll the dice".
  if (gameMode == "roll the dice") {
    diceRollOne = rollDice();
    diceRollTwo = rollDice();
    // Print the welcome message for the player and his/her dice rolls
    var myOutputValue =
      "Welcome to the Beat That game Player " +
      currentPlayerNumber +
      ". <br> You have rolled " +
      diceRollOne +
      " and " +
      diceRollTwo +
      ". <br> Choose the order of the dice by entering '1' or '2'";
    // If this is first player's turn, store the roll dice results in an array for player 1's result
    if (currentPlayerNumber == 1) {
      firstPlayerResult = [diceRollOne, diceRollTwo];
    }
    // Else, it is second player's turn, and store the roll dice results in an array for player 2's result
    else {
      secondPlayerResult = [diceRollOne, diceRollTwo];
    }
    // Change game mode to "select the dice order"
    gameMode = "select the dice order";
  }
  // Check if the game mode is "select the dice order"
  else if (gameMode == "select the dice order") {
    // Check if player is player 1
    if (currentPlayerNumber == 1) {
      // Execute the function that prints the concatenated result of player 1's selection
      firstPlayerSelection = getConcatenate(input);
      // Change player number to 2
      currentPlayerNumber = 2;
      myOutputValue =
        "You have chosen Dice " +
        input +
        " first. Your number is " +
        firstPlayerSelection +
        ". <br> It is now Player " +
        currentPlayerNumber +
        "'s turn.";
    }
    // Check if player is player 2
    else if (currentPlayerNumber == 2) {
      //Execute the function that prints the concatenated result of player 2's selection
      secondPlayerSelection = getConcatenate(input);
      // Change player number to 1
      currentPlayerNumber = 1;
      // Execute the function to determine the winner
      findWinner();
      myOutputValue =
        "You have chosen Dice " +
        input +
        " first. Your number is " +
        secondPlayerSelection +
        ". <br> Player 1's number is " +
        firstPlayerSelection +
        ". <br> The result is " +
        findWinner();
    }
    // Switch game mode to "roll the dice" for the next player's turn.
    gameMode = "roll the dice";
  }
  return myOutputValue;
};
