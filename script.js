// initialize game mode constants
var SELECT_NUMBER_OF_DICES = 'select number of dices';
var ROLL_DICES = 'roll dices';
var CHOOSE_DICE_ORDER = 'choose dice order';

// initialize variables
var diceCount = 0;
var playerTurn = 0;
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1OrderedNumber = 0;
var player2OrderedNumber = 0;
var gameMode = SELECT_NUMBER_OF_DICES;

// initialize string constants
var ROLL_DICES_INSTRUCTIONS = ' Please hit Submit to roll your dices.';
var CHOOSE_DICE_ORDER_INSTRUCTIONS = '<br /><br />Please enter a number to choose the order of the dice. For example, if you rolled <code>[2, 3, 1, 6]</code> for 4 dices, and enter <code>3102</code>, your combined number will be <code>6321</code>.';

// default dice roll function
var diceRoll = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

// returns the ordered or combined number based on
// user input `order` and the array of dice rolls `diceRollArray`
var getOrderedNumber = function (diceRollArray, order) {
  // split the order (as string)
  // turn them all into numbers,
  // to be used as indexes for diceRollArray
  var orderArray = order.split('').map(Number);
  var number = 0;

  var counter = 0;
  while (counter < orderArray.length) {
    var digitIndex = orderArray[counter];
    // ** is the power operator, Math.pow(10, (orderArray.length - 1 - counter))
    // is the equivalent. Tracing the logic:
    // say, dice roll contains [2, 3, 1, 6] and input is "3102"
    // on first iteration, it will be 0 + 6 * 10 ^ (4 - 1 - 0) = 6000;
    // on second iteration, it will be 6000 + 3 * 10 ^ (4 - 1 - 1) = 6300; etc etc
    number = number + diceRollArray[digitIndex] * 10 ** (orderArray.length - 1 - counter);
    counter += 1;
  }

  return number;
};

// checks if an individual array item (or digit)
// is greater or equal to number of dices
// to be paired with Array.findIndex()
var getIndexOrderGreaterEqualDiceCount = function (item) {
  return item >= diceCount;
};

// given an array, prints out all of its items
// neatly comma formatted with spaces after comma.
var showCommaFormattedArrayItems = function (arr) {
  var itemsText = '';
  var counter = 0;
  while (counter < arr.length) {
    itemsText = itemsText + arr[counter];
    counter += 1;
    if (counter != arr.length) {
      itemsText = itemsText + ', ';
    }
  }

  return itemsText;
};

// returns string, verbose version of using showCommaFormattedArrayItems()
// to list all the dice rolls for Player X.
var showPlayerDiceRolls = function () {
  var counter = 0;
  var output = 'Welcome Player ' + (playerTurn + 1) + '.';

  while (counter < diceCount) {
    var playerDiceRoll = diceRoll();
    if (playerTurn == 0) {
      player1DiceRolls.push(playerDiceRoll);
    } else {
      player2DiceRolls.push(playerDiceRoll);
    }

    if (counter == 0) {
      output = output + '<br />You rolled <strong>' + playerDiceRoll + '</strong> for Dice ' + (counter + 1);
    } else {
      output = output + ', and <strong>' + playerDiceRoll + '</strong> for Dice ' + (counter + 1);
    }

    counter += 1;
  }

  // show summarised rolls
  if (playerTurn == 0) {
    output = output + '.<br/><br/>To summarise, you rolled <code>[' + showCommaFormattedArrayItems(player1DiceRolls) + ']</code>.';
  } else {
    output = output + '.<br/><br/>To summarise, you rolled <code>[' + showCommaFormattedArrayItems(player2DiceRolls) + ']</code>.';
  }

  // show choose dice order instructions
  output = output + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  return output;
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

// returns string, shows both the order as submitted by user
// and the ordered/combined number based on rolls and order.
var showOrderedNumber = function (order) {
  var output = '';
  if (playerTurn == 0) {
    player1OrderedNumber = getOrderedNumber(player1DiceRolls, order);
    output = 'Player ' + (playerTurn + 1) + ', your order is <code>' + order + '</code>.<br/>Your number is <strong>' + player1OrderedNumber + '</strong>.';
  } else {
    player2OrderedNumber = getOrderedNumber(player2DiceRolls, order);
    // since player 2 is the last player, we show winner
    output = 'Player ' + (playerTurn + 1) + ', your order is <code>' + order + '</code>.<br/>Your number is <strong>' + player2OrderedNumber + '</strong>.' + showWinner();
  }
  return output;
};

var main = function (input) {
  var myOutputValue = '';
  var numberInput = Number(input);

  // game mode: select number of dices
  if (gameMode == SELECT_NUMBER_OF_DICES) {
    if (input.trim() == '' || Number.isNaN(numberInput) || numberInput < 2) {
      myOutputValue = 'You need to select 2 or more dices! Please enter the number of dices and hit Submit.';
    } else {
      diceCount = numberInput;
      myOutputValue = 'You have selected ' + diceCount + ' dices. Welcome Player ' + (playerTurn + 1) + '.' + ROLL_DICES_INSTRUCTIONS;
      // switch game mode
      gameMode = ROLL_DICES;
    }

    return myOutputValue;
  }

  // game mode: roll dices
  if (gameMode == ROLL_DICES) {
    myOutputValue = showPlayerDiceRolls();
    // switch game mode
    gameMode = CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  // game mode:  select dice order
  // input validation: empty input or not a number
  if (input.trim() == '' || Number.isNaN(numberInput)) {
    myOutputValue = 'Please enter a valid number' + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else if (input.length != diceCount) {
    // input validation: length of string entered > dice count
    myOutputValue = 'You have previously selected to roll ' + diceCount + ' dices. However, your number is ' + input + '. You need to Submit a number with exactly ' + diceCount + ' digits!' + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else if (input.split('').findIndex(getIndexOrderGreaterEqualDiceCount) > -1) {
    // input validation: any of the digits in the input is greater or equal than dice count,
    // see above else if block. if a digit is found, returns its index (0 or greater).
    // if a digit is not found, returns -1. Logic: if you have 4 dices, in the order the user
    // submits, it doesn't make sense to have a digit with 4 or larger (index 4 exceeds array
    // length of 4).
    myOutputValue = 'You have previously selected to roll ' + diceCount + ' dices. However, your number is ' + input + '. Your number cannot have any digits equal or more than ' + diceCount + '!' + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else {
    myOutputValue = showOrderedNumber(input);

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
    myOutputValue = myOutputValue + '<br /><br />It is now Player ' + (playerTurn + 1) + '\'s turn. You have previously selected to have ' + diceCount + ' dices.' + ROLL_DICES_INSTRUCTIONS;

    gameMode = ROLL_DICES;
  }

  return myOutputValue;
};
