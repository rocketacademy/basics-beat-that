// ----------------------------------------------------
// Dice - Beat That! V3 (Keep Score, Variable No. of Players, Leaderboard)
// ----------------------------------------------------

// Game Modes
const CHOOSE_PLAYERS_MODE = 'CHOOSE_PLAYERS_MODE';
const CHOOSE_DICENUMBER_MODE = 'CHOOSE_DICENUMBER_MODE';
const ORDERING_MODE = 'ORDERING_MODE';
const SCORING_MODE = 'SCORING_MODE';

// Start game with dice rolling mode
var mode = CHOOSE_PLAYERS_MODE;
// Store every Player in array & all their scores
var players = [];
var allPlayerScoreArray = [];
// Keep track of number of dice input at the start & current game round
var noOfDice;
var trackPlayer = 0;

/**
 * Get dice rolls for curr player and populate current player's dice array
 * Return the new dice rolls
 */
var rollDice = function () {
  var randInt = Math.floor(Math.random() * 6) + 1;
  return randInt;
};

/** Create Object to store game details of each player */
class Player {
  /**
  * Tracks the initial dice roll, reordered dice & score
  * @param {Array<Number>} initialDiceArray original dice number
  * @param {Number} orderedDice store reordered dice number
  * @param {Array<Number>} scoreArray store series of orderedDice for scoring
  */
  constructor(orderedDice) {
    this.initialDiceArray = [];
    this.orderedDice = orderedDice;
    this.scoreArray = [];
  }

  /**
  * Returns a dice array for player
  * @param {String} numberOfDice user inputs number of dice to roll and store
  */
  generateDiceNumber(numberOfDice) {
    for (var i = 0; i < numberOfDice; i += 1) {
      this.initialDiceArray.push(rollDice());
    }
  }
}

/**
 * Instantiate new Players & give them a unique name
*/
var createPlayers = function (numberOfPlayers) {
  for (var i = 0; i < numberOfPlayers; i += 1) {
    window['Player' + String(i + 1)] = new Player();
    players.push(window['Player' + String(i + 1)]);
  }
};

/**
 *  Run a test to ensure input is number or not blank
 *  Return a bollean valuue
 */
var passNumberTest = function (userInput) {
  // Check: input is number, has correct length, or has appropriate order of indexes that match
  if (isNaN(Number(userInput)) === true) return 'false';
  if (userInput === '0' || userInput === '') return 'false';
  return true;
};

// Create outside of this function so can be accessed by `passDiceOrderTest()` & `rearrangeDice()`
var newPositions;
/**
* Return a boolean value that determines in input passes conditions
* @param {String} userOrder user inputs string represent new order for dice
*/
var passDiceOrderTest = function (userOrder) {
  // Create an array of indexes based on noOfDice
  var positionOfDiceArr = Array.from({ length: noOfDice }, (v, k) => k);
  // The input that user types is a string, we have to convert each one to Number
  newPositions = userOrder.split('').map((i) => Number(i));
  // Run check for every element of userOrder vs index of diceArr, ensuring they match
  var inputCheckTest = positionOfDiceArr.every((i) => newPositions.includes(i));

  // Check if input has appropriate order of indexes that match
  if (inputCheckTest == false) {
    return 'Uh oh! You entered an invalid order.';
  }
  return true;
};

/**
* Returns a new dice number after new order has been keyed
* @param {String} userOrder user inputs string represent new order for dice
* @param {Number} current tracking number for current Player in players array
*/
var rearrangeDice = function (userOrder, current) {
  // Store updated position of dice numbers to an array
  var orderedDiceArray = [];
  // If tests pass - push the order of the dice that user input into new
  var currentPlayer = players[current];

  // Check if reordered positions matches available positions
  if (passDiceOrderTest(userOrder) == true) {
    for (var i = 0; i < noOfDice; i += 1) {
      var newDiceOrderPosition = newPositions[i];
      orderedDiceArray.push(currentPlayer.initialDiceArray[newDiceOrderPosition]);
    }
    // Once in a new array, join the newly ordered dice array together to form new number
    var newDice = Number(orderedDiceArray.join(''));
    return newDice;
  }
  return 'Uh oh! You entered an invalid order.';
};

/**
* Return a log of Players' scores
*/
var showLeaderboard = function () {
  var displayMessage = 'Leaderboard: <br>';

  allPlayerScoreArray.sort();

  for (var i = 0; i < allPlayerScoreArray.length; i += 1) {
    displayMessage += allPlayerScoreArray[i] + '<br>';
  }

  //

  return displayMessage;
};

// MAIN
var main = function (input) {
  // var myOutputValue = '';
  var currentPlayer = players[trackPlayer];

  // 1
  if (mode === CHOOSE_PLAYERS_MODE) {
    if (passNumberTest(input) == true) {
    // Create n number of players
      createPlayers(input);
      // Switch mode to roll n variable number of dice
      mode = CHOOSE_DICENUMBER_MODE;
      return `We will have ${input} players for this game! <br><br> Please input the number of dice for this game.`;
    }
    return 'Woops, please enter a valid number.';
  }

  // 2
  if (mode === CHOOSE_DICENUMBER_MODE) {
    if (trackPlayer == 0 && passNumberTest(input) == true) {
      noOfDice = input;
      // Loop to store n number of dice rolls into diceArray
      for (var i = 0; i < players.length; i += 1) {
        players[i].generateDiceNumber(noOfDice);
      }
      mode = ORDERING_MODE;
      return `This is Player ${trackPlayer + 1}'s dice numbers: ${currentPlayer.initialDiceArray} <br><br> Now insert a new order for your dice...`;
    }

    if (trackPlayer > 0 && trackPlayer < players.length) {
      mode = ORDERING_MODE;

      return `This is Player ${trackPlayer + 1}'s dice numbers: ${currentPlayer.initialDiceArray} <br><br> ⌨︎ ${showLeaderboard()} <br><br> Now see if you can top the rest, insert a new order for your dice... `;
    }

    return 'Woops, please enter a valid number.';
  }

  // 3
  if (mode === ORDERING_MODE) {
    var withNewDiceOrder = input;
    // ********Execute what Akira shared in Slack here.. ************************

    if (passDiceOrderTest(withNewDiceOrder) == true) {
      // If dice order passes tests, then proceed to rearrange dice with new order
      currentPlayer.orderedDice = rearrangeDice(withNewDiceOrder, trackPlayer);
      // Push the new dice order to Player's score
      currentPlayer.scoreArray.push(currentPlayer.orderedDice);
      // Push the to an overall score list (used in `showLeaderboard()`)
      allPlayerScoreArray.push(currentPlayer);

      mode = CHOOSE_DICENUMBER_MODE;
      trackPlayer += 1;

      // Upon reaching the last player, move on to final stage
      if (trackPlayer == players.length) {
        mode = SCORING_MODE;
        return `Player ${trackPlayer}'s, this is your NEW dice: ${currentPlayer.orderedDice} <br><br> Now.. let's tabulate the scores & find out the winner! 🎉`;
      }

      return `Player ${trackPlayer}'s, this is your NEW dice: ${currentPlayer.orderedDice} <br><br>Player ${trackPlayer + 1} please click 'Submit' to get your dice number`;
    }
  }

  // 4
  if (mode === SCORING_MODE) {
    // Retrieve highest score and find matching index
    var maxScore = Math.max(...allPlayerScoreArray);
    var scoreIndex = allPlayerScoreArray.indexOf(maxScore);

    return `And the winner is... <br><br>🎉 Congrats Player ${scoreIndex + 1}, you've won with a score of ${maxScore}! 🎉 <br><br> ⌨︎ ${showLeaderboard()}`;
  }
};
