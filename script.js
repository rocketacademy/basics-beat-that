/*======= REQUIREMENTS ========
1) There are 2 players and players take turns.
2) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.
4) After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

/*===== Problem breakdown and planning =======
1) build a simple version that rolls 2 dice and returns the output for one player. Then the player can choose the dice order and get the correct return output
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

// ===== Global Variables ===== //

// Game States
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORES = 'GAME_STAE_COMPARE_SCORES';
var gameState = GAME_STATE_DICE_ROLL;

// Players
var currentPlayer = 1;
var currentPlayerRolls = [];
var allPlayersScores = [];


// ===== Helper Functions ===== //

//* Function to simulate a dice roll, returns a number from 1 to 6 *//
var rollDice = function() {
  console.log('Start of rollDice();');

  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('Returning randomInteger: ', randomInteger);

  // Returning randomInteger
  return randomInteger;
};

//* Function to roll dice and adds to the currentPlayerRolls array *//
var rollDiceForPlayer = function() { // No input parameter because currentPlayerRolls is global
  
  // roll two dice and store in an array
  currentPlayerRolls.push(rollDice());
  currentPlayerRolls.push(rollDice());

  
  console.log(currentPlayerRolls);

  // Returning string to outputMessage
  return "Welcome, Player " + currentPlayer + "!<br><br>You rolled:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

//* Function to get player score based on player input of '1' or '2' *//
var getPlayerScore = function (playerInput) {
  var playerScore;

  // Input Validation: playerInput of '1' or '2' only - everything else is invalid
    if ( playerInput != 1 && playerInput != 2 ) {
      console.log( 'if input != 1 AND != 2... ');

      // Returning string to outputMessage
      return "Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>" + "Your dice rolls are:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".";
    }

    // '1' uses the first dice, currentPlayerRolls[0], as first digit
    if ( playerInput == 1 ) {
      console.log(' if input == 1...');
      playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    }
    // '2' uses the second dice, currentPlayerRolls[1], as first digit.
    if ( playerInput == 2 ) {
      console.log(' if input == 2...');
      playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));   
    }
    
    // Push playerScore into allPlayerScores array to store both scores for comparison
    allPlayersScores.push(playerScore);
    
    // Clear currentPlayerRolls array for next player's turn
    currentPlayerRolls = [];

    // Returning string to outputMessage
    return 'Player ' + currentPlayer + ', your chosen value is: ' + playerScore;
};

var comparePlayersScores = function() {
  // Initialize as string to show both players' scores regardless of outcome
  var compareMessage = "Player 1 score: " + allPlayersScores[0] + "<br> Player 2 score: " + allPlayersScores[1];

    // if-statements adds on the final outcome based on comparison logic
    if ( allPlayersScores[0] > allPlayersScores[1] ) {
      compareMessage = compareMessage + '<br><br>Player 1 wins!';
    }
    if ( allPlayersScores[0] < allPlayersScores[1] ) {
      compareMessage = compareMessage + '<br><br>Player 2 wins!';
    }
    if ( allPlayersScores[0] == allPlayersScores[1] ) {
      compareMessage = compareMessage + "<br><br>It's a tie!";
    }

    // Retunring compareMessage as string for outputMessage
  return compareMessage;
};

var restartGame = function () {
  // Resetting key parameters for game to start properly
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  currentPlayerRolls = [];
  allPlayersScores = [];
};


var main = function (input) {
  console.log('Checking game state on submit press: ', gameState);
  console.log('Current player: ', currentPlayer);
  // Initialize output to an empty string
  var outputMessage;

  if ( gameState == GAME_STATE_DICE_ROLL ) {
    console.log('if gameState == GAME_STATE_DICE_ROLL...');
    
    // roll 2 dice for currentPlayer
    // display dice as outputMessage
    outputMessage = rollDiceForPlayer();

    // change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  
  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ) {
    console.log('if gameState == GAME_STATE_CHOOSE_DICE_ORDER...');

    // Displays currentPlayer score based on playerInput of '1' or '2'
    outputMessage = getPlayerScore(input);

    if ( currentPlayer == 1 ) {
      console.log("End of player 1's turn. Player 2's turn to roll dice")
      // Change player
      currentPlayer = 2;
      // Change game state
      gameState = GAME_STATE_DICE_ROLL;

      // Append string to inform that it is player 2's turn
      return outputMessage + '<br><br> Now, it is time for player 2 to roll the dice!';
    }

    if ( currentPlayer == 2 ) {
      console.log("End of player 2's turn. Next submit click will calculate score")
      // Change game state
      gameState = GAME_STATE_COMPARE_SCORES;

      // Append string to inform that game will next compare both players' scores
      return outputMessage + '<br><br> Press submit to calculate scores!';
    }
  }

  if ( gameState == GAME_STATE_COMPARE_SCORES) {
    console.log('if gameState == GAME_STATE_COMPARE_SCORES...');
    
    // Outputs final winning message after comparing players' scores
    outputMessage = comparePlayersScores();

    // Call function to reset game parameters
    restartGame();
    
    console.log('current player after restart: ', currentPlayer);
    console.log('game state after restart: ', gameState);
    console.log('currentPlayerRolls array: ', currentPlayerRolls);
    console.log('allPlayersScores array: ', allPlayersScores);

    return outputMessage;
  }
};

var rollDiceForPlayer = function() {
  console.log('Control flow: start of rollDiceForPlayer()');
  var counter = 0
  while( counter < 2 ){
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log('rollDiceForPlayer changes, currentPlayerRolls: ', currentPlayerRolls);
  return "Welcome, Player " + currentPlayer + "<br><br>You rolled:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

var getPlayerScore = function(playerInput) {
  var playerScore;
  // input validation
  if ( playerInput != 1 && playerInput != 2){
    console.log('Control flow: input validation, invalid input... NOT 1 AND NOT 2');
    return "Error! Please only input '1' or '' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " + currentPlayerRolls[0] + " | Dice 2: " + currentPlayerRolls[1] + ".";
  }
  // input == 1
  if ( playerInput == 1 ) {
    console.log('Control flow: input == 1');
    playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    
  }

  // input == 2
  if ( playerInput == 2 ) {
    console.log('Control flow: input == 2');
    playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
  }

  // Store playerScore in array
  allPlayersScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRolls = [];
  return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayersScores = function() {
  var compareMessage = "Player 1 score: " + allPlayersScore[0] + "<br>Player 2 score: " + allPlayersScore[1];
    // player 1 wins
    if ( allPlayersScore[0] > allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>Player 1 wins!";
    }
    // player 2 wins
    if ( allPlayersScore[0] < allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>Player 2 wins!";
    }
    // tie
    if ( allPlayersScore[0] == allPlayersScore[1]){
      compareMessage = compareMessage + "<br><br>It's a tie!";
    }

    return compareMessage;
};

var resetGame = function() {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var main = function(input) {
  console.log('Checking game state on submit click: ', gameState);
  console.log('Checking currentPlayer on submit click: ', currentPlayer);
  var outputMessage = '';

  if ( gameState == GAME_STATE_DICE_ROLL ){
    console.log('Control flow: gameState == GAME_STATE_DICE_ROLL');

    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;

    return outputMessage;
  }

  if ( gameState == GAME_STATE_CHOOSE_DICE_ORDER ){
    console.log('Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER');

    // Call playerScore function
    outputMessage = getPlayerScore(input);

    if ( currentPlayer == 1 ){
      console.log("Control flow: end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }

    if ( currentPlayer == 2 ){
      console.log("Control flow: end of player 2's turn, Next submit click will calculate score");
      gameState = GAME_STATE_COMPARE_SCORES;

      return outputMessage + "<br><br>Press submit to calculate scores!";
    }
  }

  if ( gameState == GAME_STATE_COMPARE_SCORES ){
    console.log('Control flow: gameState == GAME_STATE_COMPARE_SCORES');

    outputMessage = comparePlayersScores();

    resetGame();
    console.log("Current player after reset: ", currentPlayer);
    console.log("Game state after reset: ", gameState);
    console.log("allPlayersScore array: ", allPlayersScore);
    
    return outputMessage;
  }
}