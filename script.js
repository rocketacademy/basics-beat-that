//Project 2: Beat That (Base+Comfortable)

var rollDice = "ROLL DICE";
var chooseSequence = "CHOOSE SEQUENCE";
var gameMode = rollDice;
var player1;
var player2;
var currentPlayer = 1;
var player1Result = []; //player1'sDiceValues
var player2Result = []; //player2'sDiceValues

var diceRoll = function () {
  return Math.floor(Math.random() * 6 + 1);
};

var obtainDiceRolls = function () {
  var newDiceRolls = [diceRoll(), diceRoll()];

  if (currentPlayer === 1) {
    player1Result = newDiceRolls;
  } else {
    player2Result = newDiceRolls;
  }

  return newDiceRolls;
};

var concatenate2Numbers = function (randNum1, randNum2) {
  return Number(String(randNum1) + String(randNum2));
};

var obtainPlayerNumber = function (firstNumeralIndex) {
  var diceArray;
  if (currentPlayer === 1) {
    diceArray = player1Result;
  } else {
    diceArray = player2Result;
  }
  var playerNum;
  // If the chosen first numeral index is 1, create player number starting with 1st dice
  if (firstNumeralIndex === 1) {
    playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
  }
  // Otherwise, create player number starting with 2nd dice
  else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }

  if (currentPlayer === 1) {
    player1 = playerNum;
  } else {
    player2 = playerNum;
  }

  //Return generated player number
  return playerNum;
};

//Determine who wins
var determineWinner = function () {
  if (player1 > player2) {
    return 1;
  }
  return 2;
};

var main = function (input) {
  // Roll 2 dices and show the player the values
  if (gameMode === rollDice) {
    // Roll Dice mode, roll dice and then store values into array
    var newDiceRolls = obtainDiceRolls();
    // Switch mode to choosing dice sequence
    gameMode = chooseSequence;
    // Return dice roll values
    return `Welcome Player ${currentPlayer}. <br>
      Your 1st dice number is: ${newDiceRolls[0]} and 2nd dice number is: ${newDiceRolls[1]} <br>
      Choose the order of the dice by entering 1 or 2 as the first numeral index.`;
  }

  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode === chooseSequence) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return "Please choose 1 or 2 as the first numeral index for your dice rolls";
    }

    // Get player number for current player
    var playerNum = obtainPlayerNumber(firstNumeralIndex);
    var playerNumResponse = `Player ${currentPlayer}, You chose Dice ${firstNumeralIndex} first. <br>
      Your number is ${playerNum}.`;

    // Update player and switch mode to dice roll mode
    if (currentPlayer === 1) {
      currentPlayer = 2;
      gameMode = rollDice;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${playerNumResponse} <br>
        It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }
    // Determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    currentPlayer = 1;
    gameMode = rollDice;

    // Return the result for both players
    return `${playerNumResponse} <br>
      Player ${winningPlayer} has won. <br>
      Player 1's number: ${player1} | Player 2's number: ${player2} <br> <br>
      Press Submit to play again.`;
  }
};
