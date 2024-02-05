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
    playerRolls.push(rollDice());
    playerRolls.push(rollDice());

  // don't need to return because dice values are stored in a global array
  console.log(playerRolls);
  return "Welcome,<br><br>You rolled:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
}

var getPlayerScore = function (playerInput) {
  // player input of '1' or '2' only - input validation
    if ( playerInput != 1 && playerInput != 2 ) {
      console.log( 'if input != 1 AND != 2... ');
      return "Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>" + "Your dice rolls are:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ".";
    }

    // '1' uses the first dice as first digit
    if ( playerInput == 1 ) {
      console.log(' if input == 1...');
      var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
      return 'Your chosen value is: ' + playerScore;
    }
    // '2' uses the second dice as first digit.
    if ( playerInput == 2 ) {
      console.log(' if input == 2...');
      var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
      return 'Your chosen value is: ' + playerScore;
    }
  
};

var main = function (input) {
  console.log('Checking game state on submit press: ', gameState);
  // Initialize output to an empty string
  var outputMessage;

  if ( gameState == GAME_STATE_DICE_ROLL ) {
    console.log('if gameState == GAME_STATE_DICE_ROLL...');
    
    // roll dice for player
    // display dice as output message
    outputMessage = rollDiceForPlayer();

    // change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  
  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ) {
    console.log('if gameState == GAME_STATE_CHOOSE_DICE_ORDER...');

    outputMessage = getPlayerScore(input);

    return outputMessage;
  }
};
