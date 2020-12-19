// ------------------------------------------------
// Dice - Beat That! V1
// ------------------------------------------------

// Create 2 game modes: rolling & ordering dice number
const ROLLINGMODE = 'rolling';
const ORDERINGMODE = 'ordering';

// Set intial game default mode
var mode = 'rolling';

// Create player array
var players = ['Player 1', 'Player 2'];
// Create player id
var i = 0;

// Create an array to store scores
var scoreArr = [];

// Function to generate random dice number
var rollDice = function () {
  var randInt = Math.floor(Math.random() * 6) + 1;
  return randInt;
};

// Store dice numbers outside of main function so as not to get affected by every Submit click
var diceOne = rollDice();
var diceTwo = rollDice();

// -------------------------------------------------
// MAIN
// -------------------------------------------------

var main = function (input) {
  var myOutputValue = 'Start Game';

  // -------------------------------------------------
  // ROLLIING MODE (by default)
  // -------------------------------------------------
  if (mode == ROLLINGMODE) {
    myOutputValue = `Welcome ${players[i]}! <br><br> 
                     You rolled the following - <br>
                     Dice 1:  ${diceOne} <br> Dice 2:  ${diceTwo} <br><br> 
                     Now choose the order of the dice; select either Dice 1 or Dice 2 to be first in order. <br><br>
                     Enter 1 or 2 to continue.`;

    // Check if input is a number & either 1 or 2
    if (isNaN(Number(input)) == true) {
      myOutputValue = 'Please insert a number, either 1 or 2.';
    } else if (input > 2 || input < 0 || input === '0') {
      myOutputValue = 'Oops. Only numbers 1 or 2 allowed.';
    }

    // If the input is as expected, proceed to change game mode to let user choose dice order
    if (input > 0 && input < 3) {
      mode = ORDERINGMODE;
    }
  }
  // -------------------------------------------------
  // ORDERING MODE
  // -------------------------------------------------
  if (mode == ORDERINGMODE) {
    var currentPlayerNumber;

    if (input == 1) {
      currentPlayerNumber = `${diceOne}${diceTwo}`;
      myOutputValue = `${players[i]}, you chose Dice 1 first <br>
                      Your number is ${currentPlayerNumber}. <br><br>`;
    } else if (input == 2) {
      currentPlayerNumber = `${diceTwo}${diceOne}`;
      myOutputValue = `${players[i]}, you chose Dice 2 first <br> 
                      Your number is  ${currentPlayerNumber}. <br><br>`;
    }
    // Print extra instruction message after displaying chosen order of dice roll
    myOutputValue += `It is now ${players[i + 1]}'s turn <br><br> Click 'Submit' to continue.`;

    // Store user-ordered dice roll in an array
    scoreArr.push(currentPlayerNumber);

    // Reset game mode
    mode = ROLLINGMODE;

    // Re-run diceRoll to get new numbers for next player
    diceOne = rollDice();
    diceTwo = rollDice();
    i += 1; // Move to next player ID

    // Return winning message once we reach Player 2
    if (i == 2) {
      myOutputValue = `Player 1: ${scoreArr[0]} <br> Player 2: ${scoreArr[1]} <br><br>`;
      i = 0; // Reset player Id back to zero to start with Player 1
      if (scoreArr[0] > scoreArr[1]) {
        myOutputValue += "Player 1 Wins! 🎉 <br><br> Hit 'Submit' to play again.";
      } else if (scoreArr[1] > scoreArr[0]) {
        myOutputValue += "Player 2 Wins! 🎉 <br><br> Hit 'Submit' to play again.";
      }
      scoreArr.length = 0; // Reset score list
    }
  }
  return myOutputValue;
};
