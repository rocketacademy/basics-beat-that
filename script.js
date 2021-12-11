/*Requirements
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

// Objective: Decide who wins the dice rolls by having the higher combined number
//How to get there? Input roll dice function

// Game modes
var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER = "GAME_MODE_CHOOSE_DICE_ORDER";

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

// roll dice function
var getDiceRoll = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

/**
 * Get dice rolls for curr player and populate curr player's dice array
 * Return the new dice rolls
 */

var getDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

  // Assign newDiceRolls to the current player's dice array
  if (currPlayer == 1) {
    player1Dice = newDiceRolls;
  }
  // If currPlayer is not 1, assume currPlayer is 2
  else {
    player2Dice = newDiceRolls;
  }

  // Return new dice rolls to parent function
  return newDiceRolls;
};

var getPlayerNumber = function (firstNumeralIndex) {
  // Get the current player's dice array. i.e. var diceArray
  // if (currPlayer == 1) { diceArray = player1Dice; } else { diceArray = player2Dice; }
  var diceArray = currPlayer == 1 ? player1Dice : player2Dice;
  var playerNum;
  // If the chosen first numeral index is 1, create player number starting with 1st dice
  if (firstNumeralIndex == 1) {
    playerNum = Number(String(diceArray[0]) + String(diceArray[1]));
  }
  // Otherwise, create player number starting with 2nd dice
  else {
    playerNum = Number(String(diceArray[1]) + String(diceArray[0]));
  }

  // Store player num in the relevant global player num variable
  if (currPlayer == 1) {
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

var main = function (input) {
  // Roll 2 dice and show the player the values
  if (gameMode == GAME_MODE_DICE_ROLL) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();
    // Switch mode to choose dice order
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    // Return the dice roll values to that player
    return `Welcome Player ${currPlayer}. <br>
      You rolled ${newDiceRolls[0]} and ${newDiceRolls[1]}. <br><br>
      Please input 1 or 2 for your preferred order.<br>Option 1: ${newDiceRolls[0]}${newDiceRolls[1]}<br>Option 2: ${newDiceRolls[1]}${newDiceRolls[0]}`;
  }

  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex != 1 && firstNumeralIndex != 2) {
      return "Please input 1 or 2 for your preferred order.";
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
      return `${playerNumResponse} <br><br>
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
};
