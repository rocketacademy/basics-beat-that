/**  NOTE: Focus on code functionality, rather than design interface, due to time and daily work
 *
 * Name:  Yalun, Class #26
 *
 * **/

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currentPlayer = 1;
var currentScore = 0;
var player1Score = 0;
var player2Score = 0;

// For menu selection if necessary
var menuNum = 0;

// Keep track of each player's dice rolls
var player1Dice = [];
var player2Dice = [];

// Keep track of each player's chosen numbers
var player1Number = 0;
var player2Number = 0;
var playerCombineNum = 0;

// Game modes initialize, use dictonary to map key and value
var allGameModes = {
  1: "GAME_MODE_DICE_ROLL",
  2: "GAME_MODE_CHOOSE_DICE_ORDER",
};

// Initialise the game to start with the dice roll game mode
var gameMode = "";

// Get random dice roll
var getRandomDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

// Get the random dice rolls for the current player
var getRandomDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [getRandomDiceRoll(), getRandomDiceRoll()];

  // Assign newDiceRolls to the current player's dice array
  switch (currentPlayer) {
    case 1:
      player1Dice = newDiceRolls;
      break;
    case 2:
      player2Dice = newDiceRolls;
      break;
  }

  // Return new dice rolls to parent function
  return newDiceRolls;
};

// Combine the first 2 numerical number from 2 dice together
var combine2Numbers = function (num1, num2) {
  return parseInt(String(num1) + String(num2));
};

// Get the combined number from the current player
var getPlayerNumber = function (firstNumeralIndex) {
  // Assign a temp array to store the current player dice number
  var diceArray = currentPlayer === 1 ? player1Dice : player2Dice;

  // If the chosen first numeral index is 1, create player number starting with 1st dice
  switch (firstNumeralIndex) {
    case 1:
      playerCombineNum = combine2Numbers(diceArray[0], diceArray[1]);
      break;
    case 2:
      playerCombineNum = combine2Numbers(diceArray[1], diceArray[0]);
      break;
  }
  // Store player combined number in the relevant global player number variable
  switch (currentPlayer) {
    case 1:
      player1Number = playerCombineNum;
      break;
    case 2:
      player2Number = playerCombineNum;
      break;
  }

  // Return generated player combined number
  return playerCombineNum;
};

// Decide for the winning player
var determineWinner = function () {
  return player1Number > player2Number ? 1 : 2;
};

// Gameplay main  function
var beatThat = function (input) {
  //check for  input validation
  if (!menuNum) {
    if (!input) {
      return "Please enter menu: Y/y for Dice roll ";
    } else menuNum = input;
  }

  //set menu to correct one
  if (menuNum == "y" || menuNum == "Y") {
    gameMode = allGameModes[1];
    menuNum = "";
  }

  // Roll 2 dice and show the player the values
  if (gameMode === allGameModes[1]) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getRandomDiceRolls();
    // Switch mode to choose dice order
    gameMode = allGameModes[2];
    // Return the dice roll values to that player
    return `Welcome Player ${currentPlayer}. <br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
      Choose the order of the dice by entering 1 for dice 1 or 2 for dice 2 as the first numeral index.`;
  }

  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode === allGameModes[2]) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = parseInt(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return "Please choose dice 1 or dice 2 as the first numeral index for your dice rolls";
    }

    // Get player combined number for current player
    var playerCombineNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${currentPlayer}, You chose Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerCombineNum}.`;

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currentPlayer === 1) {
      currentPlayer = 2;
      gameMode = allGameModes[1];

      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerNumResponse} <br>
         Player 2's turn now. Press Submit to roll Player 2's dice.`;
    }

    // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    if (winningPlayer == 1) {
      player1Score += 1;
      currentScore = player1Score;
    } else if (winningPlayer == 2) {
      player2Score += 1;
      currentScore = player2Score;
    }

    // Reset the game
    currentPlayer = 1;
    gameMode = allGameModes[1];

    // Return the end game message response
    return `${playerNumResponse} <br>
      Player ${winningPlayer} win and score is ${currentScore}. <br>
      Player 1's number: ${player1Number} | Player 2's number: ${player2Number} <br> <br>
      Press Submit to play again.`;
  }

  // Return error message if not expected
  return "An error occurred. Please refresh browser to start again.";
};

var main = function (input) {
  //for gameplay main function
  return beatThat(input);
};
