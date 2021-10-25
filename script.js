var AWAITING_PLAYER_ONE = "awaiting player one";
var START_PLAYER_DICE_ROLL = "start dice game for players";
var CHOOSE_COMBINATION_PLAYER = "player decides dice combination";

var currentGameMode = AWAITING_PLAYER_ONE;

/// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currentPlayer = 1;

/// Keep track of each player's dice rolls
var playerOneDice = [];
var playerTwoDice = [];

// Keep track of each player's chosen numbers
var playerOneCombination;
var playerTwoCombination;

// Create an array combinedDiceRolls with 2 independent dice roll values
// Assign combinedDiceRolls to the current player's dice array
// If currentPlayer is not 1, assume currentPlayer is 2
// Return combined dice rolls to parent function
var getDiceRolls = function () {
  var combinedDiceRolls = [diceRollOne(), diceRollTwo()];
  if (currentPlayer === 1) {
    playerOneDice = combinedDiceRolls;
  } else {
    playerTwoDice = combinedDiceRolls;
  }
  return combinedDiceRolls;
};

var concatenateTwoNumbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};
console.log("two numbers");

var getPlayerNumber = function (firstNumeralIndex) {
  var diceArray;
  if (currentPlayer === 1) {
    diceArray = playerOneDice;
  } else {
    diceArray = playerTwoDice;
  }
  console.log("diceArray: " + diceArray);

  var playerNum;
  // If the chosen first numeral index is 1, create player number starting with 1st dice
  // Otherwise, create player number starting with 2nd dice
  if (firstNumeralIndex === 1) {
    playerNum = concatenateTwoNumbers(diceArray[0], diceArray[1]);
  } else {
    playerNum = concatenateTwoNumbers(diceArray[1], diceArray[0]);
  }
  console.log("playerNum: " + playerNum);

  // Store player combination in the relevant global player combination variable
  // Return generated player num to parent function

  if (currentPlayer === 1) {
    playerOneCombination = playerNum;
  } else {
    playerTwoCombination = playerNum;
  }
  return playerNum;
};

/**
 * Compute the winner between Player 1 and Player 2.
 * Return either 1 or 2 to represent the winning player.
 * In the event of a tie, Player 2 wins.
 */
var determineWinner = function () {
  if (playerOneCombination > playerTwoCombination) {
    return 1;
  }
  return 2;
};

var main = function (input) {
  var myOutputValue = "";
  if ((input == "") & (currentGameMode == AWAITING_PLAYER_ONE)) {
    currentGameMode = START_PLAYER_DICE_ROLL;
    myOutputValue =
      "Hi Player One, welcome to the 🎲 dice 🎲 roll game! <br> <br> To start, please hit the submit button to roll the dice 🎲!";
  } else if (currentGameMode == START_PLAYER_DICE_ROLL) {
    var playerDiceRolls = getDiceRolls();
    currentGameMode = CHOOSE_COMBINATION_PLAYER;
    myOutputValue =
      "Hi Player " +
      currentPlayer +
      " , you rolled: " +
      playerDiceRolls[0] +
      " and " +
      playerDiceRolls[1] +
      "<br> Please enter ❶ or ❷ as the first numeral index for your dice rolls to get the highest combined number and hit the submit button.";
  } else if (currentGameMode == CHOOSE_COMBINATION_PLAYER) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return "Please choose ❶ or ❷ as the first numeral index for your dice rolls";
    }
    // Get combined number for current player
    console.log("firstNumeralIndex: " + firstNumeralIndex);

    var playerCombined = getPlayerNumber(firstNumeralIndex);
    console.log("playerCombined: " + playerCombined);
    var playerNumResponse = `Player ${currentPlayer}, you chose 🎲 Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerCombined}.`;
    // If currentPlayer is Player 1, change currentPlayer to Player 2, switch mode to dice roll
    if (currentPlayer === 1) {
      currentPlayer = 2;
      currentGameMode = START_PLAYER_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's 🎲 dice.`;
    }

    // Else if currentPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    currentPlayer = 1;
    currentGameMode = AWAITING_PLAYER_ONE;

    // Return the game end response
    return `${playerNumResponse} <br>
      Congrats, Player ${winningPlayer} has won 👏🏻👏🏻👏🏻. <br>
      Player 1's number: ${playerOneCombination} | Player 2's number: ${playerTwoCombination} <br> <br>
      Press Submit to play again.`;
  }

  return myOutputValue;
};

var diceRollOne = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var diceRollTwo = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Base with some help from the ref solution
// NaN when concatenating two numbers, I tried debugging but I still don't know what is the problem
//
// Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.
