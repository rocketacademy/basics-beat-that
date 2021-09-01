var currentPlayer = 1;
var player1Combination;
var player2Combination;
var player1Score = 0;
var player2Score = 0;
var diceOne;
var diceTwo;
var combinedNumber;
var winningPlayer;
var noOfPlayer = 2;
var result = false;
var gameMode = "diceroll";
var compareMode = "highest";

var main = function (input) {
  var myOutputValue;

  // Game Mode Selection;
  if (input == "lowest") {
    compareMode = "lowest";
    currentPlayer = 1;
    gameMode = "diceroll";
    result = false;
    return "The game winner will be the lowest ";
  }
  if (input == "highest") {
    compareMode = "highest";
    currentPlayer = 1;
    gameMode = "diceroll";
    result = false;
    return "The winner will be the highest combination";
  }

  // Winning Block Statement
  if (result == true) {
    winnerCheck();
    result = false;
    currentPlayer = 1;
    myOutputValue = generateWinningStatement();
    return myOutputValue;
  }

  if (currentPlayer <= noOfPlayer) {
    if (gameMode == "diceroll") {
      diceOne = rollDice();
      diceTwo = rollDice();
      myOutputValue = generateDiceRollOutput(currentPlayer, diceOne, diceTwo);
      gameMode = "inputorder";
    } else if (gameMode == "inputorder") {
      if (input == "1" || input == "2") {
        combineNumber(input, diceOne, diceTwo);
      } else {
        return "Please enter your dice order preference.";
      }

      if (currentPlayer == 1) {
        player1Combination = combinedNumber;
      }
      if (currentPlayer == 2) {
        player2Combination = combinedNumber;
      }

      myOutputValue = generateCombinedNumberOutput(
        currentPlayer,
        input,
        combinedNumber
      );
      gameMode = "diceroll";
      playerSwitch();
    }
  }
  return myOutputValue;
};

// This function generate the winning statement after every round
var generateWinningStatement = function () {
  var statement = `Player 1 number is ${player1Combination}. Player 2 number is ${player2Combination}. `;

  if (!isNaN(winningPlayer)) {
    statement = statement + `Player ${winningPlayer} wins. <br>`;
  }
  if (isNaN(winningPlayer)) {
    statement = statement + `Its a draw. <br>`;
  }
  if (player1Score >= player2Score) {
    statement =
      statement +
      `Player 1 score is ${player1Score} and player 2 score is ${player2Score}`;
  }
  if (player2Score > player1Score) {
    statement =
      statement +
      `Player 2 score is ${player2Score} and player 1 score is ${player1Score}`;
  }
  return statement;
};

// This function combine dice numbers based on the order selected
var combineNumber = function (diceOrder, diceOne, diceTwo) {
  if (diceOrder == 1) {
    combinedNumber = "" + diceOne + diceTwo;
  }
  if (diceOrder == 2) {
    combinedNumber = "" + diceTwo + diceOne;
  }
};

// This function generate the dice roll statement once the dice was first rolled
var generateDiceRollOutput = function (currentPlayer, diceOne, diceTwo) {
  return `Welcome Player ${currentPlayer}.<br>
    Your rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2.<br>
    Choose the order of the dice.`;
};

// This function generate the combined number statement after the dice order has been selected
var generateCombinedNumberOutput = function (
  currentPlayer,
  diceOrder,
  combinedNumber
) {
  if (currentPlayer < noOfPlayer) {
    return `Player ${currentPlayer} you choose Dice ${diceOrder} first.<br>
    Your number is ${combinedNumber}.<br>
    It is now Player ${currentPlayer + 1}s turn.`;
  }
  if (currentPlayer == noOfPlayer) {
    result = true;
    return `Player ${currentPlayer}, you choose Dice ${diceOrder} first.<br>
    Your number is ${combinedNumber}.`;
  }
};

// This function change the player. When all the player has played, this function change the result boolean to true.
// It will trigger a winning code block.
var playerSwitch = function () {
  if (currentPlayer < noOfPlayer) {
    currentPlayer = currentPlayer + 1;
  } else if (currentPlayer == noOfPlayer) {
    result = true;
  }
};

// Check for the winner, and assign the winner ID to WinningPlayer
var winnerCheck = function () {
  if (compareMode == "highest") {
    if (Number(player1Combination) > Number(player2Combination)) {
      winningPlayer = 1;
      player1Score++;
    }
    if (Number(player1Combination) < Number(player2Combination)) {
      winningPlayer = 2;
      player2Score++;
    }
  }
  if (compareMode == "lowest") {
    if (Number(player1Combination) < Number(player2Combination)) {
      winningPlayer = 1;
      player1Score++;
    }
    if (Number(player1Combination) > Number(player2Combination)) {
      winningPlayer = 2;
      player2Score++;
    }
  }
  if (Number(player1Combination) == Number(player2Combination)) {
    winningPlayer = NaN;
  }
};

// Return integer from 1 to 6 inclusive
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};
