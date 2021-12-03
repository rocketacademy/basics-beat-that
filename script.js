// ===== REQUIREMENTS ===== //
// 1) there are 2 players and players take turns
// 2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6
// 3) the player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first
// 4) after both players have rolled and chosen dice order, the player with the higher combined number wins

// ===== problem breakdown and planning ===== //
// ver 1. rolls 2 dice and turns the output for 1 player. That playerer chooses the dice order and get the correct return output.
// ver 2. refactored code to include player 2
//    - global variables for currentPlayer; allPlayersScore
//    - refactor outputMessages to interact with each player, 1 and 2
//    - write logic for player 1 to go first then player 2, and finally point towards comparing score

// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page
//    - helper function
//    - current player = 1
//    - gameState == GAME_MODE_DICE_ROLL;
//    - allPlayerScores = [];  

// Global Variables
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORES = 'GAME_STATE_COMPARE_SCORES';
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayer = 1;
var currentPlayerRolls = [];
var allPlayersScore = [];

// Helper Function
var rollDice = function() {
  console.log('Control flow: start of rollDice()');
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('rollDice output, randomInteger: ', randomInteger);
  return randomInteger;
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