// 2 player, each have 1 mode
// they will take turns
// when click submit, roll 2 dices
// player will pick the order they want
// whoever got the higher number won

// global variables
// player 1 first
var currentPlayer = 1;
var gameMode = 'rollDice';
var player1DiceNumbers;
var player2DiceNumbers;
var player1FinalNumber;
var player2FinalNumber;

// generate dice number
var generateRandomDiceNumber = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

// roll 2 dice, return an array of 2 dice numbers
var roll2Dice = function () {
  return [generateRandomDiceNumber(), generateRandomDiceNumber()];
};
// concatenate 2 dice number, input 2 numbers, return a concatenated number
var concatenate2Numbers = function (number1, number2) {
  return number1 * 10 + number2;
};

// determine winner, output 1 or 2, representing player 1 or player 2
var determineWinningPlayer = function () {
  if (player1FinalNumber > player2FinalNumber) {
    return 1;
  }
  return 2;
  // TODO: implement draw
};

var main = function (input) {
  if (gameMode == 'rollDice') {
    // run the roll dice function - return an array of 2 numbers
    if (currentPlayer == 1) {
      player1DiceNumbers = roll2Dice();
    } else if (currentPlayer == 2) {
      player2DiceNumbers = roll2Dice();
    }

    // game mode change to choosing order
    gameMode = 'chooseOrder';
    if (currentPlayer == 1) {
      return `Player 1, you rolled ${player1DiceNumbers}`;
    }
    if (currentPlayer == 2) {
      return `Player 2, you rolled ${player2DiceNumbers}`;
    }
  }

  // mode is choose order
  // if the player input '1', the number will be player1DiceNumbers[0] combine
  // player1DiceNumbers[1]
  if (currentPlayer == 1) {
    if (input == 1) {
      player1FinalNumber = concatenate2Numbers(player1DiceNumbers[0], player1DiceNumbers[1]);
    } else if (input == 2) {
      player2FinalNumber = concatenate2Numbers(player2DiceNumbers[1], player2DiceNumbers[0]);
    }
    // game mode change to player 2 rol dice
    currentPlayer = 2;
    gameMode = 'rollDice';
    return `your final number is ${player1FinalNumber}`;
  }

  // now current player is 2
  if (input == 1) {
    player2FinalNumber = concatenate2Numbers(player2DiceNumbers[0], player2DiceNumbers[1]);
  } else if (input == 2) {
    player2FinalNumber = concatenate2Numbers(player2DiceNumbers[1], player2DiceNumbers[0]);
  }

  // compare who has the higher number
  // winner player is either 1 or 2
  var winningPlayer = determineWinningPlayer();
  // output a winner
  if (winningPlayer == 1) {
    return `player 2 final number is ${player2FinalNumber}, player 1 number is ${player1FinalNumber}, player 1 won`;
  }
  return `player 2 final number is ${player2FinalNumber}, player 1 number is ${player1FinalNumber}, player 2 won`;
};
