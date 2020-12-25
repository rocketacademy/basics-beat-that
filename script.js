// Random Dice Roll Generator
var getRandomDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomDiceNum = randomInteger + 1;
  return randomDiceNum;
};

// Global Variables Here
var gameMode = 'Player 1 Rolls';
var p1DiceOne = getRandomDiceRoll();
var p1DiceTwo = getRandomDiceRoll();
var p2DiceOne = getRandomDiceRoll();
var p2DiceTwo = getRandomDiceRoll();
var player1CombinedNum = 0;
var player2CombinedNum = 0;

// Start Game
var main = function (input) {
  var myOutputValue = '';
  // On Click, player 1 rolls 2 dice.
  if (gameMode == 'Player 1 Rolls') {
    gameMode = 'Player 1 Choose';
    return 'Welcome Player 1. <br>You rolled Dice 1: ' + p1DiceOne + ' and Dice 2: ' + p1DiceTwo + '.<br>Choose the order of the dice.';

    // On Click, player 1 chooses which dice goes first.
  } if (gameMode == 'Player 1 Choose') {
    gameMode = 'Player 2 Rolls';
    // But first, check if input is 1 or 2.
    if (!(input == 1 || input == 2)) {
      gameMode = 'Player 1 Choose';
      myOutputValue = 'Please enter 1 or 2 only.';
      return myOutputValue;
    }
    // If input is 1 or 2, the first number will be multiplied by 10 and added to the second number.
    if (input == 1) {
      player1CombinedNum = p1DiceOne * 10 + p1DiceTwo;
    }
    else if (input == 2) {
      player1CombinedNum = p1DiceTwo * 10 + p1DiceOne;
    }
    myOutputValue = 'Player 1, you chose Dice ' + input + ' first. <br>Your number is ' + player1CombinedNum + ". It is now player 2's turn.";
    return myOutputValue;
  }
  // On Click, player 2 rolls 2 dice.
  if (gameMode == 'Player 2 Rolls') {
    gameMode = 'Player 2 Choose';
    return 'Welcome Player 2. <br>You rolled Dice 1: ' + p2DiceOne + ' and Dice 2: ' + p2DiceTwo + '.<br>Choose the order of the dice.';
    // On Click, player 2 chooses which dice goes first.
  } if (gameMode == 'Player 2 Choose') {
    // Check if input is 1 or 2.
    if (!(input == 1 || input == 2)) {
      return 'Please enter 1 or 2 only.';
    }
    // If input is 1 or 2, the first number will be multiplied by 10 and added to the second number.
    if (input == 1) {
      player2CombinedNum = p2DiceOne * 10 + p2DiceTwo;
    }
    else if (input == 2) {
      player2CombinedNum = p2DiceTwo * 10 + p2DiceOne;
    }
    myOutputValue = 'Player 2, you chose Dice ' + input + ' first. <br>Your number is ' + player2CombinedNum + ". It is now player 1's turn.";
  }
  // Games restarts and Player 1 rolls again.
  gameMode = 'Player 1 Rolls';
  return myOutputValue;
};
