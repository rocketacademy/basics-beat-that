/**
 * Beat That!
 *
 * Base: 2 players take turns.
 * When player clicks Submit, the game rolls 2 dice and shows the dice rolls.
 * The player picks the order of the dice they want, i.e. the 1st or 2nd dice goes first.
 * After both players have rolled and chosen dice order, player with the higher combined number wins.
 */

var numPlayers = 2;
// Keep track of each player's diceRolls in arrays
var player1DiceRolls = [];
var player2DiceRolls = [];
// Each player's combined number
var player1num;
var player2num;

// Start with Player 1
var currPlayer = 1;

var numDice = 2;

var GAME_MODE_ROLL_DICE = "ROLL_DICE";
var GAME_MODE_ENTER_ORDER = "ENTER_ORDER";
// game mode for roll dice mode
var gameMode = GAME_MODE_ROLL_DICE;

// Return a random number from 1 to 6
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// concatenate 2 numbers
var concatNum = function (num1, num2) {
  var combinedNum = Number(String(num1) + String(num2));
  return combinedNum;
};

var playerChosenNum = function (userChoice) {
  var combinedNumOfCurrPlayer;
  if (userChoice == 1) {
    combinedNumIndex = userChoice - 1;
    combinedNumOfCurrPlayer = concatNum(
      diceRolls[combinedNumIndex],
      diceRolls[combinedNumIndex + 1]
    );
  } // If player specify 2 as first dice, 1 is second dice
  else if (userChoice == 2) {
    combinedNumIndex = userChoice - 2;
    combinedNumOfCurrPlayer = concatNum(
      diceRolls[combinedNumIndex + 1],
      diceRolls[combinedNumIndex]
    );
  }
  if (currPlayer == 1) {
    player1num = combinedNumOfCurrPlayer;
  } else {
    player2num = combinedNumOfCurrPlayer;
  }
  return combinedNumOfCurrPlayer;
};

// check which player won
var checkWhoWon = function () {
  if (player1num > player2num) {
    return 1;
  }
  return 2;
};

// Output which player won
var generateOutputMessage = function (playerWon) {
  return `Player ${playerWon} has won! <br> Player 1's number: ${player1num} and Player 2's number: ${player2num}. <br><br> Click submit to play again.`;
};

var main = function (input) {
  if (gameMode == GAME_MODE_ROLL_DICE) {
    diceRolls = [];

    // Roll numDice number of dice
    var diceCounter = 0;
    while (diceCounter < numDice) {
      var diceRoll = rollDice();
      // Store the current dice roll in diceRolls to show the user later
      diceRolls.push(diceRoll);
      diceCounter += 1;
      console.log(`dice rolls: ${diceRolls}`);
    }

    // Assign diceRolls to the currPlayer's dice array
    if (currPlayer == 1) {
      player1DiceRolls = diceRolls;
    }
    // If currPlayer is 2
    else {
      player2DiceRolls = diceRolls;
    }

    // Change game mode to enter order of dice
    gameMode = GAME_MODE_ENTER_ORDER;
    return `Player ${currPlayer}: You have rolled ${diceRolls[0]} for Dice 1 and ${diceRolls[1]} for Dice 2. <br><br> Please enter "1" or "2" to specify Dice 1 or 2 as first digit of your combined number.`;
  }

  // following code for ENTER_ORDER game mode
  if (gameMode == GAME_MODE_ENTER_ORDER) {
    var userChoice = Number(input);

    // validate input
    if (userChoice != 1 && userChoice != 2) {
      return `Please input "1" or "2" only to select the Dice roll for first digit of combined number.`;
    }
    // get currPlayer's combined number
    var playerNum = playerChosenNum(userChoice);
    var playerNumMsg = `Player ${currPlayer}: The dice rolled ${diceRolls.join(
      " | "
    )} and you chose Dice ${userChoice} first. Your combined number is ${playerNum}.`;
    console.log(`combined num of player ${currPlayer}: ${playerNum}`);

    //if currPlayer is 1, change to player 2 and game mode to roll dice
    if (currPlayer == 1) {
      currPlayer += 1;
      gameMode = GAME_MODE_ROLL_DICE;
      return `${playerNumMsg} <br><br> It is Player ${currPlayer}'s turn. Click submit to roll dice.`;
    }
    //if currPlayer is player 2, check winner and announce
    var playerWon = checkWhoWon();

    // reset mode to enter num dice for next player's turn
    gameMode = GAME_MODE_ROLL_DICE;
    // Next player is the current player + 1, or 1 if current player is the last player.
    var nextPlayer = (currPlayer % numPlayers) + 1;
    // Generate output message based on current game state
    var myOutputValue = `${playerNumMsg} <br><br> ${generateOutputMessage(
      playerWon
    )}`;
    // Update currPlayer to nextPlayer before next turn
    currPlayer = nextPlayer;
    return myOutputValue;
  }
};
