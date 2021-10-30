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
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];
  if (currPlayer === 1) {
    player1Dice = newDiceRolls;
  } else {
    player2Dice = newDiceRolls;
  }
  return newDiceRolls;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var getPlayerNumber = function (firstNumeralIndex) {
  var diceArray;
  if (currPlayer === 1) {
    diceArray = player1Dice;
  } else {
    diceArray = player2Dice;
  }
  // var diceArray = currPlayer === 1 ? player1Dice : player2Dice;
  var playerNum;
  if (firstNumeralIndex === 1) {
    playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  } else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }
  if (currPlayer === 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }
  return playerNum;
};
var determineWinner = function () {
  if (player1Num > player2Num) {
    return 1;
  }
  return 2;
};

var main = function (input) {
  if (gameMode === GAME_MODE_DICE_ROLL) {
    var newDiceRolls = getDiceRolls();

    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;

    return `<b>Welcome, Player ${currPlayer}! </b><br><br>
      You rolled Dice 1: ${newDiceRolls[0]} and Dice 2: ${newDiceRolls[1]} <br>
      Select the order of your dice rolls by entering 1 or 2 and hit the <i>GO!</i> button.`;
  }

  if (gameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return "Please choose 1 or 2 for your dice rolls";
    }

    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${currPlayer}, you chose Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerNum}.`;

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerNumResponse} <br><br>
        It is now Player 2's turn. Press <i>GO!</i> again to roll Player 2's dice.`;
    }
    // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    currPlayer = 1;
    gameMode = GAME_MODE_DICE_ROLL;

    // Return the game end response
    return `${playerNumResponse} <br>
      <br><b>Player ${winningPlayer} has won!</b><br>
      Player 1's number: ${player1Num} & Player 2's number: ${player2Num} <br> <br>
      Press <i>GO!</i> to play again.`;
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return "An error occurred. Please refresh to start again.";
};
