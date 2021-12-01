// Version 1: Simple version that rolls 2 dice and returns the output for one player

// Global Variables
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];


// Function to simulate a dice roll, returns a number from 1 to 6
var rollDice = function() {
  console.log('Start of rollDice();');

  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('Returning randomInteger: ', randomInteger);
  return randomInteger;
};

// Function to roll dice and adds to the playerRolls array
var rollDiceForPlayer = function() {
  // roll two dice and store in an array
  var counter = 0;
  while ( counter < 2 ) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  // don't need to return because dice values are stored in a global array
  console.log(playerRolls);
}

var main = function (input) {
  console.log('Checking game state on submit press: ', gameState);
  // Initialize output to an empty string
  var outputMessage;

  if ( gameState == GAME_STATE_DICE_ROLL ) {
    console.log('if gameState == dice_roll...');
    // roll dice for player
    rollDiceForPlayer();
    
    // display dice as output message
    outputMessage = "Welcome,<br><br>You rolled " + playerRolls[0] + " and " + playerRolls[1] + ".<br><br>"
    return outputMessage;
  }

};
