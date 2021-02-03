// initialize game mode constants
var SELECT_NUMBER_OF_DICES = 'select number of dices';
var ROLL_DICES = 'roll dices';
var CHOOSE_DICE_ORDER = 'choose dice order';

// initialize variables
var playerCount = 2;
var diceCount = 0;
var playerTurn = 0;
// diceRolls will be a 2D array - an array containing 1 array of dice rolls per player
var diceRolls = [];
var orderedNumbers = [];
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
  var playerDiceRolls = [];

  while (counter < diceCount) {
    var playerDiceRoll = diceRoll();
    playerDiceRolls.push(playerDiceRoll);

    if (counter == 0) {
      output = output + '<br />You rolled <strong>' + playerDiceRoll + '</strong> for Dice ' + (counter + 1);
    } else {
      output = output + ', and <strong>' + playerDiceRoll + '</strong> for Dice ' + (counter + 1);
    }

    counter += 1;
  }

  // add dice rolls for this round and player to dice rolls for all players
  diceRolls[playerTurn] = playerDiceRolls;

  // show summarised rolls
  output = output + '.<br/><br/>To summarise, you rolled <code>[' + showCommaFormattedArrayItems(diceRolls[playerTurn]) + ']</code>.';

  // show choose dice order instructions
  output = output + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  return output;
};

// prints winner/loser/draw
var showWinner = function () {
  var output = '';
  var counter = 0;
  var biggestOrderedNumber = Math.max(...orderedNumbers);
  // find index only picks out the first index found
  var firstWinner = orderedNumbers.findIndex((number) => number == biggestOrderedNumber);
  // filter picks out the list
  var winnersList = orderedNumbers.filter((number) => number == biggestOrderedNumber);
  while (counter < playerCount) {
    // first player
    if (counter == 0) {
      output = output + '<br />Player ' + (counter + 1) + '\'s number is <strong>' + orderedNumbers[counter] + '</strong>';
    }
    // subsequent players
    else {
      output = output + ', and Player ' + (counter + 1) + '\'s number is <strong>' + orderedNumbers[counter] + '</strong>';
    }

    counter += 1;
  }
  // more than one player achieved the biggest combined/ordered number
  if (winnersList.length > 1) {
    output = output + '<br /><strong>It\'s a tie!</strong><br/>';
  } else {
    output = output + '<br /><strong>Player ' + (firstWinner + 1) + ' wins!</strong><br/>';
  }
  return output;
};

// returns string, shows both the order as submitted by user
// and the ordered/combined number based on rolls and order.
var showOrderedNumber = function (order) {
  var combinedNumber = getOrderedNumber(diceRolls[playerTurn], order);
  // set combined number within the orderedNumbers array
  orderedNumbers[playerTurn] = combinedNumber;
  var output = 'Player ' + (playerTurn + 1) + ', your order is <code>' + order + '</code>.<br/>Your number is <strong>' + combinedNumber + '</strong>.';

  // last player
  if (playerTurn == playerCount - 1) {
    output = output + showWinner();
  }
  return output;
};

var hasRepeatedCharacters = function (str) {
  // turn the string into an array
  var strArr = str.split('');
  var index = 0;

  // this loop just checks if you get the same index value
  // if you search for an item from the start vs from the back.
  // if you get different values, it means there are repeated
  // characters in the string - return true;
  while (index < strArr.length - 1) {
    if (str.indexOf(str[index]) != str.lastIndexOf(str[index])) {
      return true;
    }
    index += 1;
  }

  return false;
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

  var previousRollString = '<br/><br/>You previously rolled <code>[' + showCommaFormattedArrayItems(diceRolls[playerTurn]) + ']</code>.';

  // game mode:  select dice order
  // input validation: empty input or not a number
  if (input.trim() == '' || Number.isNaN(numberInput)) {
    myOutputValue = 'Please enter a valid number!' + previousRollString + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else if (input.length != diceCount) {
    // input validation: length of string entered > dice count
    myOutputValue = 'You have previously selected to roll ' + diceCount + ' dices. However, your number is ' + input + '. You need to Submit a number with exactly ' + diceCount + ' digits!' + previousRollString + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else if (input.split('').findIndex(getIndexOrderGreaterEqualDiceCount) > -1) {
    // input validation: any of the digits in the input is greater or equal than dice count,
    // see above else if block. if a digit is found, returns its index (0 or greater).
    // if a digit is not found, returns -1. Logic: if you have 4 dices, in the order the user
    // submits, it doesn't make sense to have a digit with 4 or larger (index 4 exceeds array
    // length of 4).
    myOutputValue = 'You have previously selected to roll ' + diceCount + ' dices. However, your number is ' + input + '. Your number cannot have any digits equal or more than ' + diceCount + '!' + previousRollString + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else if (hasRepeatedCharacters(input)) {
    // input validation: no repeated characters in setting the order of your dice rolls
    // to combine into a number. If you roll [1, 1, 6], it's cheating to input 222!
    myOutputValue = 'Your number is ' + input + '. Your number cannot have any repeated digits or characters!' + previousRollString + CHOOSE_DICE_ORDER_INSTRUCTIONS;
  } else {
    myOutputValue = showOrderedNumber(input);

    if (playerTurn < playerCount - 1) {
      // change to next player
      playerTurn += 1;
    } else {
      // last player completed, so reset states
      playerTurn = 0;
      diceRolls = [];
      orderedNumbers = [];
    }
    myOutputValue = myOutputValue + '<br /><br />It is now Player ' + (playerTurn + 1) + '\'s turn. You have previously selected to have ' + diceCount + ' dices.' + ROLL_DICES_INSTRUCTIONS;

    gameMode = ROLL_DICES;
  }

  return myOutputValue;
};
