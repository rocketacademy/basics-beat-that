// ===== REQUIREMENTS ===== //
// 1) there are 2 players and players take turns.
// 2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.
// 4) after both players have rolled and chosen dice order, the player with the higher combined number wins.

// ===== Problem breakdown and planning ===== //
// 1) build a simple version that rolls 2 dice and returns the output for one player. Then the player chooses the dice ordfer and get the appropriate return output.
// 2) refactor the code to work for 2 players - both player rolls dice and orders them
// 3) implement comparing dice values and decide on the winner
// 4) reset the game so the players can play continually without refreshing the browser page

// Global Variables
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

var rollDice = function() {
  console.log('Start of rollDice();');
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 0 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('rollDice output randomInteger: ', randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  counter = 0;
  while ( counter < 2 ) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }

  return "Welcome,<br><br>You rolled:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

var getPlayerScore = function (playerInput) {
  // input validation - no numbers outside of 1 and 2
  if ( playerInput != 1 && playerInput != 2) {
    return "Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " + playerRolls[0] + " | Dice 2: " + playerRolls[1] + ".";
  }
  // if input == 1
  if ( playerInput == 1 ) {
    console.log('if input == 1...');
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: " + playerScore;
  }
  // if input == 2
  if ( playerInput == 2 ) {
    console.log('if input == 2...');
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: " + playerScore;
  }
};

var main = function(input) {
  console.log('gameState on submit click: ', gameState);
  var outputMessage = '';
  if ( gameState == GAME_STATE_DICE_ROLL) {
    console.log('if gameState == GAME_STATE_DICE_ROLL');
    // roll 2 dice

    outputMessage = rollDiceForPlayer();

    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ) {
    console.log('if gameState == GAME_STATE_CHOOSE_DICE_ORDER');

    outputMessage = getPlayerScore(input);
    return outputMessage;
  }
};