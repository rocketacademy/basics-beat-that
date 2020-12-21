// -------------------------------------------------------------------
// Dice - Beat That! V2 (Add Variable Number of Dice)
// -------------------------------------------------------------------

// Create 3 game modes: number of dice, rolling & ordering dice number
// Made changes to naming convention of constants
const ROLLING_MODE = 'ROLLING_MODE';
const ORDERING_MODE = 'ORDERING_MODE';
const COMPARE_SCORE_MODE = 'COMPARE_SCORE_MODE';

// Set intial game default mode
var mode = ROLLING_MODE;

// Create player array
var players = [];
// Create player id
var id = 0;

// Function to generate random dice number
var rollDice = function () {
  var randInt = Math.floor(Math.random() * 6) + 1;
  return randInt;
};

// For V2, we need 2 arrays, 1 to store n variable number of dice and their respective index
var diceArray = [];
var positionOfDiceArr = [];

// Create 2 arrays: to store newly ordered dice and user input
var orderedDiceArrayScore = [];
var firstPlayerSetDiceLength = [];

// Function to reset game
var resetGame = function () {
  mode = ROLLING_MODE;
  id = 0;
  diceArray.length = 0;
  firstPlayerSetDiceLength.length = 0;
  orderedDiceArrayScore.length = 0;
  positionOfDiceArr.length = 0;
};

// -------------------------------------------------------------------
// MAIN
// -------------------------------------------------------------------

// User is asked to input the number of dice he/she wants to play with
var main = function (input) {
  var currentPlayer = `Player ${id + 1}`;
  var myOutputValue = `${currentPlayer}, please input a number greater than 1 but less than 7 to begin...`;

  if (firstPlayerSetDiceLength.length >= 1) {
    myOutputValue = `${currentPlayer}, please input same number as 1st Player`;
  }

  // -------------------------------------------------------------------
  // ROLLING MODE (by default)
  // -------------------------------------------------------------------
  if (input > 1 && input < 7) {
    if (mode == ROLLING_MODE) {
      // Initialise first/next Player
      players.push(currentPlayer);
      // Cap dice length
      firstPlayerSetDiceLength.push(input);

      // Loop to store n number of dice rolls into diceArray
      for (var n = 0; n < input; n += 1) {
        var diceRoll = rollDice();
        // Push diceRoll numbers to diceArray & indexes to indexOfDiceArr
        diceArray.push(diceRoll);
        positionOfDiceArr.push(n);
      }

      // Once diceArray has been populated, switch to ORDERING_MODE
      if (diceArray.length > 1) {
        mode = ORDERING_MODE;
        // inputArray.push(Number(input));
        myOutputValue = `${players[id]}, you rolled:<br>----Dice: ${diceArray}<br>
                      Position: ${positionOfDiceArr}<br><br>
                      Now choose the order of the dice. <br><br>
                      Enter the order of the dice positions.`;
      }
      return myOutputValue;
    }
  }

  // -------------------------------------------------------------------
  // ORDERING MODE
  // -------------------------------------------------------------------

  if (mode == ORDERING_MODE) {
    // Convert each number (String type) of the user input into Number type
    var newPositions = input.split('').map((i) => Number(i));

    // Run a check for every element of input vs index of diceArr, ensuring they match
    var inputCheckTest = positionOfDiceArr.every((i) => newPositions.includes(i));

    // Check: input is number, has correct length, or has appropriate order of indexes that match
    if (isNaN(Number(input)) == true) {
      myOutputValue = 'Please insert numbers only.';
    } else if (input.length != diceArray.length || input === '0') {
      myOutputValue = 'Oops. Please enter the order of the positions of the numbers you want.';
    } else if (inputCheckTest == false) {
      myOutputValue = 'Uh oh! You entered an invalid order.';
    } else {
      // If tests pass - push the order of the dice that user input into new array
      var orderedDiceArray = [];

      for (var i = 0; i < newPositions.length; i += 1) {
        var userIndexOrder = newPositions[i];
        orderedDiceArray.push(diceArray[userIndexOrder]);
      }

      // Once in a new array, join the newly ordered dice array together to form new number
      var userOrderedDice = orderedDiceArray.join('');
      orderedDiceArrayScore.push(userOrderedDice);

      // If the input is as expected, proceed to change game mode
      if (orderedDiceArrayScore.length < 2) {
        id += 1; // Move to next player id
        diceArray.length = 0; // Reset diceArray
        positionOfDiceArr.length = 0; // Reset positionOfDiceArr
        mode = ROLLING_MODE;
      } else {
        mode = COMPARE_SCORE_MODE;
      }

      return `${currentPlayer}, this is your new dice number: <br>${userOrderedDice} <br><br> Hit "Submit" to continue...`;
    }
  }
  // -------------------------------------------------------------------
  // COMPARE SCORES MODE
  // -------------------------------------------------------------------
  if (mode == COMPARE_SCORE_MODE) {
    if (orderedDiceArrayScore[0] > orderedDiceArrayScore[1]) {
      myOutputValue = `Player 1 Wins with dice roll with score: ${orderedDiceArrayScore[0]}! <br><br>  To play again, hit "Submit"`;
    } if (orderedDiceArrayScore[1] > orderedDiceArrayScore[0]) {
      myOutputValue = `Player 2 Wins with dice roll with score: ${orderedDiceArrayScore[1]}! <br><br>  To play again, hit "Submit"`;
    }
    resetGame();
  }
  return myOutputValue;
};
