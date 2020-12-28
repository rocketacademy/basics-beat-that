// Random Dice Roll Generator
var randomDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomDiceNum = randomInteger + 1;
  return randomDiceNum;
};

// Global Variables for Normal Dice Game
var p1DiceOne = 0;
var p1DiceTwo = 0;
var p2DiceOne = 0;
var p2DiceTwo = 0;
var player1CombinedNum = 0;
var player2CombinedNum = 0;
p1DiceOne = randomDiceRoll();
p1DiceTwo = randomDiceRoll();
p2DiceOne = randomDiceRoll();
p2DiceTwo = randomDiceRoll();

// Global Variables for Variable Dice Game
var gameMode = 'Enter Mode';
var numOfDice = 0;
var playerScore = 0;
var player1Score = 0;
var player2Score = 0;
var totalp1Score = 0;
var totalp2Score = 0;
var p1DiceValues = [];
var p1DicePosition = [];
var p2DiceValues = [];
var p2DicePosition = [];
var dicePosition = [];
var diceValues = [];

// Helper function to list the indexes in the array
var getDicePosition = function (diceLength) {
  var index = 0;
  while (index < diceLength) {
    dicePosition.push(index);
    index = index + 1;
  }
  return dicePosition;
};

// Helper function to list the random dice roll values
var getNumOfDiceAndRoll = function (diceLength) {
  var index = 0;
  while (index < diceLength) {
    diceValues.push(randomDiceRoll());
    index = index + 1;
  } return diceValues;
};

// Helper function to generate concatenated number after player's index choice
var generatePlayerScore = function (input) {
  var positions = input.split('');
  var playerNumberArray = [];
  var index = 0;
  while (index < diceValues.length) {
    playerNumberArray.push(diceValues[positions[index]]);
    index = index + 1;
  }
  playerScore = playerNumberArray.join('');
  return playerScore;
};

// Start Game
var main = function (input) {
  var myOutputValue = '';
  var invalidMessage = 'Please enter a valid position number';
  // User to choose which mode to play: Normal or Variable Dice Mode
  if (gameMode == 'Enter Mode') {
    if (input == 'normal') {
      myOutputValue = 'You have chosen the normal mode. Click submit to roll dice.';
      gameMode = 'normal';
    }
    else if (input == 'variable') {
      myOutputValue = 'Please enter the qty of dice you want.';
      gameMode = 'Player 1 Variable Dice Mode';
    }
    else { myOutputValue = 'Please enter "normal" or "variable" to select mode.';
    }
    return myOutputValue;
  }

  // Ask player1 how many dice they want to play with
  if (gameMode == 'Player 1 Variable Dice Mode') {
    if (isNaN(Number(input)) == false && input != '') {
      numOfDice = input;
      // List the index position of the dice values in order using the helper function
      // Match it to Player 1
      dicePosition = getDicePosition(numOfDice);
      p1DicePosition = dicePosition;
      // List the dice values using the helper function
      // Match it to Player 1
      diceValues = getNumOfDiceAndRoll(numOfDice);
      p1DiceValues = diceValues;
      gameMode = 'Player 1 Enter Positions';
      // Output Player 1 dice values and prompt index question.
      myOutputValue = 'Player 1, you have decided to <br>play with ' + numOfDice + ' dice. <br><br>You rolled: <br>---- dice: ' + p1DiceValues + '<br>position: ' + p1DicePosition + '<br><br>Enter the positions of the numbers you want.';
    } else {
      myOutputValue = invalidMessage;
    }
    return myOutputValue;
  }

  if (gameMode == 'Player 1 Enter Positions') {
  // Check if input is a number and is not an empty string.
    if (isNaN(Number(input)) == false && input != '') {
      // Put input into helper function to generate player's score
      generatePlayerScore(input);
      player1Score = Number(playerScore);
      // Add score to accumulate total score
      totalp1Score += player1Score;
      myOutputValue = 'Player 1, your score is: ' + player1Score + ". Player 2's turn. Click submit to roll.";
      gameMode = 'Player 2 Variable Dice Mode';
    }
    else {
      myOutputValue = invalidMessage;
    }
    // Empty the global variable of helper function output to create a new value for player 2.
    diceValues = [];
    dicePosition = [];
    return myOutputValue;
  }

  if (gameMode == 'Player 2 Variable Dice Mode') {
    // List the dice index using p1DiceValues with the helper function
    // Match it to Player 2
    getDicePosition(p1DiceValues.length);
    p2DicePosition = dicePosition;
    // List the dice values using p1DiceValues with the helper function
    // Match it to Player 2
    getNumOfDiceAndRoll(p1DiceValues.length);
    p2DiceValues = diceValues;
    gameMode = 'Player 2 Enter Position';
    // Output Player 2 dice values and prompt index question.
    myOutputValue = 'Player 2, you have decided to <br>play with ' + numOfDice + ' dice. <br><br>You rolled: <br>---- dice: ' + p2DiceValues + '<br>position: ' + p2DicePosition + '<br><br>Enter the positions of the numbers you want.';
    return myOutputValue;
  }

  if (gameMode == 'Player 2 Enter Position') {
    // Check if input is a number and is not an empty string.
    if (isNaN(Number(input)) == false && input != '' && input.length == p2DiceValues.length) {
      // Put input into helper function to generate player's score
      generatePlayerScore(input);
      player2Score = Number(playerScore);
      totalp2Score += player2Score;
      myOutputValue = 'Player 2, your score is: ' + player2Score;
      // On click, auto compute the total scores to determine the winner.
      gameMode = 'Compare Scores';
    }
    else {
      myOutputValue = invalidMessage;
    }
    // Empty the global variable of helper function output to create a new value for player 1.
    diceValues = [];
    dicePosition = [];
    return myOutputValue;
  }
  // Determine the winner by comparing scores.
  if (gameMode == 'Compare Scores') {
    if (totalp1Score > totalp2Score) {
      myOutputValue = 'Player 1 score: ' + totalp1Score + '<br>Player 2 score: ' + totalp2Score + '. <br><br>Player 1 wins! Key in "normal" or "variable" to restart game.';
    }
    else if (totalp1Score < totalp2Score) {
      myOutputValue = 'Player 1 score: ' + totalp1Score + '<br>Player 2 score: ' + totalp2Score + '. <br><br>Player 2 wins! Key in "normal" or "variable" to restart game.';
    }
    else {
      myOutputValue = 'It is a draw! Key in "normal" or "variable" to restart game.';
    }
    // Change game mode to the start before returning it.
    gameMode = 'Enter Mode';
    return myOutputValue;
  }

  // Start Normal Dice Game
  // On Click, player 1 rolls 2 dice.
  if (gameMode == 'normal') {
    gameMode = 'Player 1 Choose';
    myOutputValue = 'Welcome Player 1. <br>You rolled Dice 1: ' + p1DiceOne + ' and Dice 2: ' + p1DiceTwo + '.<br>Choose the order of the dice.';
    return myOutputValue;
  }
  // On Click, player 1 chooses which dice goes first.
  if (gameMode == 'Player 1 Choose') {
    gameMode = 'Player 2 Rolls';
    // But first, check if input is 1 or 2.
    if (!(input == 1 || input == 2)) {
      gameMode = 'Player 1 Choose';
      myOutputValue = 'Please enter 1 or 2 only.';
      return myOutputValue;
    }
    // If input is 1 or 2, the numbers will be concatenated to form a 2 digit number.
    if (input == 1) {
      player1CombinedNum = p1DiceOne * 10 + p1DiceTwo;
    }
    else if (input == 2) {
      player2CombinedNum = p1DiceTwo * 10 + p1DiceOne;
    }
    myOutputValue = 'Player 1, you chose Dice ' + input + ' first. <br>Your number is ' + player1CombinedNum + ". It is now player 2's turn. Click to continue.";
    return myOutputValue;
  }
  // On Click, player 2 rolls 2 dice.
  if (gameMode == 'Player 2 Rolls') {
    gameMode = 'Player 2 Choose';
    return 'Welcome Player 2. <br>You rolled Dice 1: ' + p2DiceOne + ' and Dice 2: ' + p2DiceTwo + '.<br>Choose the order of the dice.';
    // On Click, player 2 chooses which dice goes first.
  }
  if (gameMode == 'Player 2 Choose') {
    // Check if input is 1 or 2.
    if (!(input == 1 || input == 2)) {
      return 'Please enter 1 or 2 only.';
    }
    // If input is 1 or 2, the numbers will be concatenated to form a 2 digit number.
    if (input == 1) {
      player2CombinedNum = p2DiceOne * 10 + p2DiceTwo;
    }
    else if (input == 2) {
      player2CombinedNum = p2DiceTwo * 10 + p2DiceOne;
    }
    myOutputValue = 'Player 2, you chose Dice ' + input + ' first. <br>Your number is ' + player2CombinedNum;
    gameMode = 'Determine Winner';
  }
  if (gameMode == 'Determine Winner') {
    if (player1CombinedNum > player2CombinedNum) {
      myOutputValue = myOutputValue + '. Player 1 wins! Enter "normal" or "variable" to restart game.';
    }
    else if (player1CombinedNum < player2CombinedNum) {
      myOutputValue = myOutputValue + '. Player 2 wins!  Enter "normal" or "variable" to restart game.';
    }
    else {
      myOutputValue = myOutputValue + '. It is a draw!  Enter "normal" or "variable" to restart game.';
    }
  }
  gameMode = 'Enter Mode';
  return myOutputValue;
};
