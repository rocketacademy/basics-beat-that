// Game modes
var GAME_MODE_DICE_ROLL = 'GAME_MODE_DICE_ROLL';
var GAME_MODE_CHOOSE_DICE_ORDER = 'GAME_MODE_CHOOSE_DICE_ORDER';

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_DICE_ROLL;

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 1;

// Keep track of each player's dice rolls
var player1Dice = [];
var player2Dice = [];

// Keep track of each player's chosen numbers
var player1Num;
var player2Num;

/**
 * Return a random number from 1 to 6
 */
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

/**
 * Get dice rolls for curr player and populate curr player's dice array
 * Return the new dice rolls
 */
var getDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

  // Assign newDiceRolls to the current player's dice array
  if (currPlayer === 1) {
    player1Dice = newDiceRolls;
  }
  // If currPlayer is not 1, assume currPlayer is 2
  else {
    player2Dice = newDiceRolls;
  }

  // Return new dice rolls to parent function
  return newDiceRolls;
};

/**
 * Return a number that is the concatenation of num1 and num2
 * @param {number} num1
 * @param {number} num2
 */
var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

/**
 * Generate and store the player's number based on his dice rolls and chosen first numeral index
 * Return the player number
 * @param {number} firstNumeralIndex
 */
var getPlayerNumber = function (firstNumeralIndex) {
  // Get the current player's dice array.
  // We use the ternary operator on the following line for more concise syntax.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // The example below is equivalent to:
  // var diceArray;
  // if (currPlayer === 1) { diceArray = player1Dice; } else { diceArray = player2Dice; }
  var diceArray = currPlayer === 1 ? player1Dice : player2Dice;
  var playerNum;
  // If the chosen first numeral index is 1, create player number starting with 1st dice
  if (firstNumeralIndex === 1) {
    playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  }
  // Otherwise, create player number starting with 2nd dice
  else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }

  // Store player num in the relevant global player num variable
  if (currPlayer === 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  // Return generated player num to parent function
  return playerNum;
};

/**
 * Compute the winner between Player 1 and Player 2.
 * Return either 1 or 2 to represent the winning player.
 * In the event of a tie, Player 2 wins.
 */
var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
};

/**
 * Play Beat That as per SWE101 game rules
 * https://swe101.rocketacademy.co/projects/project-2-dice
 * @param {string} input
 */
var main = function (input) {
  // Roll 2 dice and show the player the values
  if (gameMode === GAME_MODE_DICE_ROLL) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();
    // Switch mode to choose dice order
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    // Return the dice roll values to that player
    return `Welcome Player ${currPlayer}. <br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }

  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return 'Please choose 1 or 2 as the first numeral index for your dice rolls';
    }

    // Get player number for curr player
    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${currPlayer}, You chose Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerNum}.`;

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }
    // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    currPlayer = 1;
    gameMode = GAME_MODE_DICE_ROLL;

    // Return the game end response
    return `${playerNumResponse} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br> <br>
      Press Submit to play again.`;
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return 'An error occurred. Please refresh to start again.';
};
