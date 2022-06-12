// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Game modes
var DICE_ROLL_GAME_MODE = "diceRollGameMode";
var ORDER_OF_DICE_GAME_MODE = "orderOfDiceGameMode";

// Initialise the game to start with the dice roll game mode by default - to update later in game
var currentGameMode = DICE_ROLL_GAME_MODE;

// There are 2 players and players take turns.
// The game starts with Player 1 by default - to update later in game
var currentPlayer = 1;

// Storing dice rolls
var player1DiceRolls = [];
var player2DiceRolls = [];

// Storing each player's chosen numbers
var player1CombinedNumber = null;
var player2CombinedNumber = null;

// Generate random dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Generate dice rolls and add to respective lists
var getDiceRolls = function () {
  var currentDiceRolls = [rollDice(), rollDice()];

  if (currentPlayer === 1) {
    player1DiceRolls = currentDiceRolls;
  } else {
    player2DiceRolls = currentDiceRolls;
  }

  return currentDiceRolls;
};

// Obtain combined number - convert to string and then back to number type
var getCombinedNumber = function (number1, number2) {
  return Number(String(number1) + String(number2));
};

// Check player number, storing combined number
var getPlayerNumber = function (diceNumberChosen) {
  // Check current list and assign to access accordingly
  var diceList = null;
  var chosenNumber = null;

  if (currentPlayer === 1) {
    diceList = player1DiceRolls;
  } else {
    diceList = player2DiceRolls;
  }
  // Check and assign chosen number - accessing index respectively
  if (diceNumberChosen === 1) {
    chosenNumber = getCombinedNumber(diceList[0], diceList[1]);
  } else {
    chosenNumber = getCombinedNumber(diceList[1], diceList[0]);
  }

  // Store player num in the relevant global player num variable
  if (currentPlayer === 1) {
    player1CombinedNumber = chosenNumber;
  } else {
    player2CombinedNumber = chosenNumber;
  }

  // Return generated player num to parent function
  return chosenNumber;
};

// Check who wins
var checkWinner = function () {
  if (player1CombinedNumber > player2CombinedNumber) {
    return 1;
  }
  return 2;
};

// Welcome Player 1.
// You rolled 3 for Dice 1 and 6 for Dice 2.
// Choose the order of the dice.

// Player 1, you chose Dice 2 first.
// Your number is 63.
// It is now Player 2's turn.

var main = function (input) {
  // When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
  if (currentGameMode === DICE_ROLL_GAME_MODE) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var getCurrentDiceRolls = getDiceRolls();
    // After generating, proceed to order of dice
    currentGameMode = ORDER_OF_DICE_GAME_MODE;
    // Output message as above
    return `Welcome Player ${currentPlayer}. <br>
      You rolled ${getCurrentDiceRolls[0]} for Dice 1 and ${getCurrentDiceRolls[1]} for Dice 2. <br>
      Choose the order of the dice.`;
  }

  // The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
  if (currentGameMode === ORDER_OF_DICE_GAME_MODE) {
    // Input validation
    var diceNumberChosen = Number(input);
    if (diceNumberChosen !== 1 && diceNumberChosen !== 2) {
      return `Please enter 1 or 2 for 1st digit of your combined number.`;
    }

    // Obtain the information for player
    var playerCombinedNumber = getPlayerNumber(diceNumberChosen);
    var playerCombinedNumberMessage = `Player ${currentPlayer}, you chose Dice ${diceNumberChosen} first. <br>
      Your number is ${playerCombinedNumber}. <br>`;

    // If Player 1, change to Player 2, reset to dice roll mode
    if (currentPlayer === 1) {
      currentPlayer = 2;
      currentGameMode = DICE_ROLL_GAME_MODE;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerCombinedNumberMessage} <br>
        It is now Player 2's turn.`;
    }
    // Else check winner and output accordingly.
    var winningPlayer = checkWinner();

    // Reset game after winner is checked
    currentPlayer = 1;
    currentGameMode = DICE_ROLL_GAME_MODE;

    // Return end of game message
    return `${playerCombinedNumberMessage} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1CombinedNumber} <br> Player 2's number: ${player2CombinedNumber} <br> <br>
      The End :) Press Submit to play again!`;
  }
};
