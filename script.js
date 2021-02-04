// initialize game mode constants
var SELECT_COMBINED_NUMBER_MODE = 'select combined number mode';
var SELECT_NUMBER_OF_PLAYERS = 'select number of players';
var SELECT_NUMBER_OF_DICES = 'select number of dices';
var ROLL_DICES = 'roll dices';
var CHOOSE_DICE_ORDER = 'choose dice order';

// initialize string constants
var LARGEST_COMBINED_NUMBER_MODE = 'largest';
var SMALLEST_COMBINED_NUMBER_MODE = 'smallest';
var ROLL_DICES_INSTRUCTIONS = ' Please hit Submit to roll your dices.';
var CHOOSE_DICE_ORDER_INSTRUCTIONS_LARGEST = '<br /><br />Please hit Submit and we will automatically generate the <u>largest</u> combined number for you. For example, if you rolled <code>[2, 3, 1, 6]</code> for 4 dices, your <u>largest</u> combined number will be <code>6321</code>.';
var CHOOSE_DICE_ORDER_INSTRUCTIONS_SMALLEST = '<br /><br />Please hit Submit and we will automatically generate the <u>smallest</u> combined number for you. For example, if you rolled <code>[2, 3, 1, 6]</code> for 4 dices, your <u>smallest</u> combined number will be <code>1236</code>.';

// initialize variables
var playerCount = 0;
var diceCount = 0;
var playerTurn = 0;
// diceRolls will be a 2D array - an array containing 1 array of dice rolls per player
// index 0 for player 1, index 1 for player 2, etc. index ordering is the same for
// orderedNumbers and scores
var diceRolls = [];
var orderedNumbers = [];
// each individual item in scores will look like this: [playerIndex, playerScore]
// it should be ordered with Player 1 (index 0) being the first item
// for example:
//  [
//    [0, 2134],
//    [1, 3634],
//    [2, 2351]
//  ]
var scores = [];
var gameMode = SELECT_COMBINED_NUMBER_MODE;
var combinedNumberMode = LARGEST_COMBINED_NUMBER_MODE;

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
var getOrderedNumber = function (diceRollArray) {
  // initialize sorted array from largest number to smallest
  // .sort(): compared current item `currentItem` with next item `nextItem`
  // if (nextItem - currentItem) is less than 0, move `nextItem`
  // in an index lower than `currentItem`, ie. `nextItem` comes first.
  // if (nextItem - currentItem) is 0 or more, leave the current `nextItem` and
  // `currentItem` as they are.
  var sortedArray = diceRollArray.sort((currentItem, nextItem) => nextItem - currentItem);

  if (combinedNumberMode == SMALLEST_COMBINED_NUMBER_MODE) {
    // for the smallest number mode, we simply reverse the array
    sortedArray = sortedArray.reverse();
  }

  // join the items in the array together into a string
  var stringifiedArray = sortedArray.join('');
  // turn the string back into a number
  var stringToNum = Number(stringifiedArray);

  return stringToNum;
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
  if (combinedNumberMode == LARGEST_COMBINED_NUMBER_MODE) {
    output = output + CHOOSE_DICE_ORDER_INSTRUCTIONS_LARGEST;
  } else {
    output = output + CHOOSE_DICE_ORDER_INSTRUCTIONS_SMALLEST;
  }

  return output;
};

// prints winner/loser/draw
var showWinner = function () {
  var output = '';
  var counter = 0;
  // get the biggest combined/ordered number in the current round
  var biggestOrderedNumber = Math.max(...orderedNumbers);
  // get the smallest combined/ordered number in the current round
  var smallestOrderedNumber = Math.min(...orderedNumbers);
  // initialize first winner to be index -1 (does not exist)
  var firstWinner = -1;
  // initialize winnersList to be an empty array
  var winnersList = [];

  if (combinedNumberMode == LARGEST_COMBINED_NUMBER_MODE) {
    // identify the first individual to get the biggest combined/ordered number
    // find index only picks out the first index found
    firstWinner = orderedNumbers.findIndex((number) => number == biggestOrderedNumber);
    // identify a list of individuals (if there is more that 1)
    // with the biggest combined/ordered number
    // unlike firstIndex, filter will create a new array with all matching items
    winnersList = orderedNumbers.filter((number) => number == biggestOrderedNumber);
  } else {
    // identify the first individual to get the smallest combined/ordered number
    firstWinner = orderedNumbers.findIndex((number) => number == smallestOrderedNumber);
    // identify a list of individuals (if there is more that 1)
    // with the smallest combined/ordered number
    winnersList = orderedNumbers.filter((number) => number == smallestOrderedNumber);
  }

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

var showScores = function () {
  var output = '<br/><br/><h3><u>Leaderboard</u></h3>';

  // duplicate current scores into leaderboard as a shallow copy.
  // unlike a deep copy, a shallow copy will not make a reference
  // to the original array. to do so, we use the spread operator
  // [...scores] as opposed to just scores. because if we do
  // leaderboard = scores, any modification to leaderboard (like
  // sorting) will also modify scores.
  var leaderboard = [...scores];

  // sort leaderboard
  // each item in leaderboard is structured as [playerIndex, playerScore]
  // if (nextItem[1] - currentItem[1]) is negative, move nextItem
  // before currentItem, ie. nextItem comes first
  leaderboard = leaderboard.sort((currentItem, nextItem) => nextItem[1] - currentItem[1]);

  if (combinedNumberMode == SMALLEST_COMBINED_NUMBER_MODE) {
    // for the smallest number mode, we simply reverse the array
    leaderboard = leaderboard.reverse();
  }

  var counter = 0;
  while (counter < leaderboard.length) {
    if (counter != 0) {
      output = output + '<br/>';
    }
    output = output + '<strong>' + (counter + 1) + '.</strong> Player ' + (leaderboard[counter][0] + 1) + ': ' + leaderboard[counter][1];
    counter += 1;
  }

  return output;
};

// returns string, shows both the order as submitted by user
// and the ordered/combined number based on rolls and order.
var showOrderedNumber = function () {
  var combinedNumber = getOrderedNumber(diceRolls[playerTurn]);
  // set combined number within the orderedNumbers array
  orderedNumbers[playerTurn] = combinedNumber;
  var output = 'Player ' + (playerTurn + 1) + ', your combined number is <strong>' + combinedNumber + '</strong>.';

  // last player
  if (playerTurn == playerCount - 1) {
    output = output + showWinner();
  }
  return output;
};

var main = function (input) {
  var myOutputValue = '';
  var numberInput = Number(input);
  var trimmedInput = input.trim();

  if (gameMode == SELECT_COMBINED_NUMBER_MODE) {
    if (trimmedInput.toLowerCase() == SMALLEST_COMBINED_NUMBER_MODE) {
      combinedNumberMode = SMALLEST_COMBINED_NUMBER_MODE;
      myOutputValue = 'You have decided to play the game mode where we generate the <strong>smallest</strong> number from each players\' combined dice rolls.';
    } else {
      myOutputValue = 'You will be continuing in the default game mode where we generate the <strong>largest</strong> number from each players\' combined dice rolls.';
    }

    myOutputValue = myOutputValue + '<br /><br />Now, please enter the number of players (2 or more), and hit Submit.';
    // switch modes
    gameMode = SELECT_NUMBER_OF_PLAYERS;

    return myOutputValue;
  }

  // game mode: select number of players
  if (gameMode == SELECT_NUMBER_OF_PLAYERS) {
    if (trimmedInput == '' || Number.isNaN(numberInput) || numberInput < 2) {
      myOutputValue = 'You need to have 2 or more players! Please enter a valid number of players and hit Submit.';
    } else {
      playerCount = numberInput;
      myOutputValue = 'You have selected to have ' + playerCount + ' players. Now, please enter the number of dices (2 or more) each player will play per round.';
      // switch game mode
      gameMode = SELECT_NUMBER_OF_DICES;
    }

    return myOutputValue;
  }

  // game mode: select number of dices
  if (gameMode == SELECT_NUMBER_OF_DICES) {
    if (trimmedInput == '' || Number.isNaN(numberInput) || numberInput < 2) {
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

  // game mode:  select dice order{
  myOutputValue = showOrderedNumber();

  if (playerTurn < playerCount - 1) {
    // change to next player
    playerTurn += 1;
  } else {
    // finalize total scores for all players
    var counter = 0;
    while (counter < orderedNumbers.length) {
      // since scores is initialized as an empty array, we check
      // if an inner array stored in it. if there hasn't been any
      // (ie, scores[counter] is `undefined`), create an inner
      // array and store it with .push(). inner array will be structured
      // like this: [playerIndex, score], where the first index refers to Player
      // 1 (index 0), and the second index is the score for the player
      if (!Array.isArray(scores[counter])) {
        var playerIndex = counter;
        var playerScore = orderedNumbers[counter];
        var pair = [playerIndex, playerScore];

        scores.push(pair);
      } else {
        // if there is already an inner array, we assume it is already
        // structured like [playerIndex, playerScore]. Since index 1 (second item)
        // of the inner array is the score, we just increment it
        scores[counter][1] += orderedNumbers[counter];
      }

      counter += 1;
    }

    // show score if last player
    myOutputValue = myOutputValue + showScores();

    // last player completed, so reset states
    playerTurn = 0;
    diceRolls = [];
    orderedNumbers = [];
  }
  myOutputValue = myOutputValue + '<br /><br />It is now Player ' + (playerTurn + 1) + '\'s turn. You have previously selected to have ' + diceCount + ' dices.' + ROLL_DICES_INSTRUCTIONS;

  gameMode = ROLL_DICES;

  return myOutputValue;
};
