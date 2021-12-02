// Version 3: Compare players' scores and declare the winner

// Global Variables
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORES = 'GAME_STAE_COMPARE_SCORES';
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayer = 1;
var currentPlayerRolls = [];
var allPlayersScores = [];


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

// Function to roll dice and adds to the currentPlayerRolls array
var rollDiceForPlayer = function() {
  // roll two dice and store in an array
    currentPlayerRolls.push(rollDice());
    currentPlayerRolls.push(rollDice());

  // don't need to return because dice values are stored in a global array
  console.log(currentPlayerRolls);
  return "Welcome, Player " + currentPlayer + "!<br><br>You rolled:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
}

var getPlayerScore = function (playerInput) {
  var playerScore;

  // player input of '1' or '2' only - input validation
    if ( playerInput != 1 && playerInput != 2 ) {
      console.log( 'if input != 1 AND != 2... ');
      return "Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>" + "Your dice rolls are:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".";
    }

    // '1' uses the first dice as first digit
    if ( playerInput == 1 ) {
      console.log(' if input == 1...');
      playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    }
    // '2' uses the second dice as first digit.
    if ( playerInput == 2 ) {
      console.log(' if input == 2...');
      playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));   
    }
  
    allPlayersScores.push(playerScore);
    console.log( 'clear player rolls!');
    currentPlayerRolls = [];
    return 'Player ' + currentPlayer + ', your chosen value is: ' + playerScore;
};

var comparePlayersScores = function() {
  var compareMessage = "Player 1 score: " + allPlayersScores[0] + "<br> Player 2 score: " + allPlayersScores[1];

    if ( allPlayersScores[0] > allPlayersScores[1] ) {
      compareMessage = compareMessage + '<br><br>Player 1 wins!';
    }
    if ( allPlayersScores[0] < allPlayersScores[1] ) {
      compareMessage = compareMessage + '<br><br>Player 2 wins!';
    }
    if ( allPlayersScores[0] == allPlayersScores[1] ) {
      compareMessage = compareMessage + "<br><br>It's a tie!";
    }
  return compareMessage;
};

var main = function (input) {
  console.log('Checking game state on submit press: ', gameState);
  console.log('Current player: ', currentPlayer);
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

    if ( currentPlayer == 1 ) {
      console.log("End of player 1's turn. Player 2's turn to roll dice")
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage;
    }

    if ( currentPlayer == 2 ) {
      console.log("End of player 2's turn. Next submit click will calculate score")
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + '<br><br> Press submit to calculate scores!';
    }
  }

  if ( gameState == GAME_STATE_COMPARE_SCORES) {
    console.log('if gameState == GAME_STATE_COMPARE_SCORES...');
    
    outputMessage = comparePlayersScores();
    return outputMessage;
  }
};
