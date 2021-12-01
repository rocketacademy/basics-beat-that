/*======= REQUIREMENTS ========
1) There are 2 players and players take turns.
2) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4) After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

/*===== Problem breakdown and planning =======
1) First we will build a simple version that rolls 2 dice and returns the output for one player. Then we will implement choosing dice order, for one player, and return the output
2) Then we will try to re-factor the code to work for 2 players, and allow both players to choose the order and return the output
3) Then we will try to implement comparing and deciding on the winner
4) We will try to reset the game so that the players can play continually without refreshing the browser page
Tentative structure (open to changing during implementation):
GLOBAL VARIABLES:
1) Players dice roll
2) Game State
HELPER FUNCTIONS:
1) rollDice
2) playTurn(playerNumber) where playerNumber is either 1 or 2
2) Checking for winner
*/

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
    console.log('if gameState == GAME_STATE_DICE_ROLL...');
    // roll dice for player
    rollDiceForPlayer();
    
    // display dice as output message
    outputMessage = "Welcome,<br><br>You rolled " + playerRolls[0] + " and " + playerRolls[1] + ".<br><br>"

    // change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  
  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ) {
    console.log('if gameState == GAME_STATE_CHOOSE_DICE_ORDER...');
    // player input of '1' or '2' only - input validation
    if ( input != 1 && input != 2 ) {
      outputMessage = "Please only input '1' or '2'<br><br>" + "Your dice rolls are " + playerRolls[0] + " and " + playerRolls[1] + ".<br><br>";
      return outputMessage;
    }

    // '1' uses the first dice as first digit
    
    // '2' uses the second dice as first digit.
  }
};
