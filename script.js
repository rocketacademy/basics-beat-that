// initialize constants
var DICE_COUNT = 2;
var ROLL_DICES = 'roll dices';
var CHOOSE_DICE_ORDER = 'choose dice order';

// initialize variables
var playerTurn = 0;
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1OrderedNumber = 0;
var player2OrderedNumber = 0;
var gameMode = ROLL_DICES;

var diceRoll = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  console.log('dice roll called');
  return diceNumber;
};

var showPlayerDiceRolls = function () {
  var counter = 0;
  var output = 'Welcome Player ' + (playerTurn + 1) + '.';

  while (counter < DICE_COUNT) {
    var playerDiceRoll = diceRoll();
    if (playerTurn == 0) {
      player1DiceRolls.push(playerDiceRoll);
    } else {
      player2DiceRolls.push(playerDiceRoll);
    }

    if (counter == 0) {
      output = output + '<br />You rolled ' + playerDiceRoll + ' for Dice ' + (counter + 1);
    } else {
      output = output + ' and ' + playerDiceRoll + ' for Dice ' + (counter + 1);
    }

    counter += 1;
  }

  output = output + '.<br/>Choose the order of the dice.';
  return output;
};

var printNumber = function (diceRollArray, firstNumber) {
  var numberString = '';
  var number = 0;

  // adding an empty string in between concatenates the numbers
  // (eg "1" + "2" = "12") as opposed to doing mathematical
  // addition (eg 1 + 2 = 3)
  if (firstNumber == 1) {
    numberString = diceRollArray[0] + '' + diceRollArray[1];
  } else {
    numberString = diceRollArray[1] + '' + diceRollArray[0];
  }

  number = Number(numberString);

  return number;
};

// prints winner/loser/draw
var showWinner = function () {
  var output = '<br />Player 1\'s number is <strong>' + player1OrderedNumber + '</strong> and Player 2\'s number is <strong>' + player2OrderedNumber + '</strong>.';
  if (player2OrderedNumber > player1OrderedNumber) {
    output = output + ' <strong>Player 2 wins!</strong><br/>';
  } else if (player1OrderedNumber > player2OrderedNumber) {
    output = output + ' <strong>Player 1 wins!</strong><br/>';
  } else {
    output = output + ' <strong>It\'s a tie!</strong><br/>';
  }
  return output;
};

var showOrderedNumber = function (firstNumber) {
  var output = '';
  if (playerTurn == 0) {
    player1OrderedNumber = printNumber(player1DiceRolls, firstNumber);
    output = 'Player ' + (playerTurn + 1) + ', you chose Dice ' + firstNumber + ' first.<br/>Your number is <strong>' + player1OrderedNumber + '</strong>.';
  } else {
    player2OrderedNumber = printNumber(player2DiceRolls, firstNumber);
    // since player 2 is the last player, we show winner
    output = 'Player ' + (playerTurn + 1) + ', you chose Dice ' + firstNumber + ' first.<br/>Your number is <strong>' + player2OrderedNumber + '</strong>.' + showWinner();
  }
  return output;
};

var main = function (input) {
  var myOutputValue = '';
  var numberInput = Number(input);

  // game mode: roll dices
  if (gameMode == ROLL_DICES) {
    myOutputValue = showPlayerDiceRolls();
    // switch game mode
    gameMode = CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  // game mode:  select dice order
  if (input.trim() == '' || Number.isNaN(numberInput) || numberInput < 1 || numberInput > 2) {
    myOutputValue = 'Player ' + (playerTurn + 1) + ', please select a number between 1 and 2.';
  } else {
    myOutputValue = showOrderedNumber(numberInput);

    if (playerTurn == 0) {
      // change players from Player 1 to Player 2
      playerTurn = 1;
    } else {
      // last player completed, so reset states
      playerTurn = 0;
      player1DiceRolls = [];
      player2DiceRolls = [];
      player1OrderedNumber = 0;
      player2OrderedNumber = 0;
    }
    myOutputValue = myOutputValue + '<br />It is now Player ' + (playerTurn + 1) + '\'s turn.';

    gameMode = ROLL_DICES;
  }

  return myOutputValue;
};
