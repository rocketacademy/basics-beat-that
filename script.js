// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.
// After both players have rolled, the player with the higher combined number wins.

// Diceroll function
var getDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
// Game modes
var gameNumberOfDice = 'gameNumberOfDice';
var gameModeDiceRoll = 'gameModeDiceRoll';
var gameModeChooseDiceOrder = 'gameModeChooseDiceOrder';
var gameMode = '';
// number of dice used and its counter
var numberOfDiceUsed = [];
var diceCounter = 0;
// start the game with the dice roll
gameMode = gameNumberOfDice;
// track the current player, with player 1 being first
var currentPlayer = 1;

// Track dice rolls for P1 and P2
var player1Dice = [];
var player2Dice = [];

// tracking diceroll value for player 1 and 2 (NH)
var player1Num;
var player2Num;

/// Get dice rolls for current player and populate curr player's dice array (rewrote)
// Return the new dice rolls
// Create a code that gets number of rolls based on user input

// if (diceCounter < numberOfDiceUsed){
// diceCounter = diceCounter+1
// }

var getDiceRolls = function () {
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

  if (currentPlayer == 1) {
    player1Dice = newDiceRolls;
  }

  else {
    player2Dice = newDiceRolls;
  }

  return newDiceRolls;
};
// Return a number that is the concatenation of num1 and num2 (NH 50-73)

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var getPlayerNumber = function (firstNumeralIndex) {
  var diceArray = currentPlayer == 1 ? player1Dice : player2Dice;
  var playerNum;
  // If the chosen first numeral index is 1, create player number starting with 1st dice
  if (firstNumeralIndex == 1) {
    playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  }
  // Otherwise, create player number starting with 2nd dice
  else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }

  // Store player num in the relevant global player num variable
  if (currentPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  // Return generated player num to parent function
  return playerNum;
};

// BeatThatGame

var main = function (input) {
  var myOutputValue = '';
  // start the game with number of dice (Not Used Yet)
  if (gameMode == 'gameNumberOfDice') {
    numberOfDiceUsed = Number(input);
    if (isNaN(Number(numberOfDiceUsed))) return 'please choose a number.';

    gameMode = 'gameModeDiceRoll';
    return 'you chose to use ' + numberOfDiceUsed + ' dice for this game. Press Submit to continue';
  }
  // Roll 2 dice and show the player the values
  if (gameMode == gameModeDiceRoll) {
    // Get dice rolls for current player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();
    // Switch mode to choose dice order
    gameMode = gameModeChooseDiceOrder;
    // Return the dice roll values to that player
    return 'Welcome Player' + currentPlayer
      + '. You rolled Dice 1: ' + newDiceRolls[0] + ' and Dice 2: ' + newDiceRolls[1] + '. Please choose whether you want the first or second dice roll to be the first numeral by submitting 1 or 2.';
  }
  console.log(player1Dice);
  console.log(player2Dice);
  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode == gameModeChooseDiceOrder) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = (input);
    if (firstNumeralIndex != 1 && firstNumeralIndex != 2) {
      console.log('wrong number');
      return 'Please choose either 1 or 2';
    }

    // Share value of dice roll.
    var playerNum = getPlayerNumber(firstNumeralIndex);
    console.log('hi');

    var playerNumResponse = 'Player' + currentPlayer + ', You chose Dice ' + firstNumeralIndex + ' to be first. Your number is ' + playerNum + '.';

    // If currentPlayer is Player 1, change currentPlayer to Player 2, switch mode to dice roll
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = gameModeDiceRoll;
      // Return player number to Player 1, let Player 2 know it is their turn (stuck)
      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }
    // Else if currentPlayer is Player 2, determine the winner and let the players know who won.

    var determineWinner = function () {
      if (player1Num > player2Num) {
        return 1;
      }
      return 2;
    };

    var winningPlayer = determineWinner();

    // Reset the game (placed wrongly at the end)
    currentPlayer = 1;
    gameMode = gameModeDiceRoll;

    // Return the game end response
    var myOutputValue = `${playerNumResponse} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br> <br>
      Press Submit to play again.`;

    return myOutputValue;
  }
};
