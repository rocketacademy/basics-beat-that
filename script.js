// REQUIREMENTS
// 1. There are 2 players and players take turns.
// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4. After both players have rolled and chosen dice order, the player with the higher combined number wins

// ===== problem breakdown and planning =====
// git commit ver 1: one player rolls 2 dice and that player chooses the dice order to get the output
// git commit ver 2: refactored code to include player 2
// - will need global variables for currentPlayer, allPlayersScore (array to store the score of all players)
// - refactor outMessages to interact with each player 1 and player 2
// - write logic for player 1 to go first then player 2, and finally point towards comparing score
// git commit ver 3: implement comparing dice scores and declare winner
// git commit ver 4: reset the game so players can play continually w/o refreshing browser page
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var GAME_STATE_COMPARE_SCORES = `GAME_STATE_COMPARE_SCORES`;
var gameState = GAME_STATE_DICE_ROLL;
// Initialize an empty array to store currentPlayerRolls
var currentPlayerRolls = [];
var currentPlayer = 1; // player 1 starts first
var allPlayersScore = [];

// Helper function
var rollDice = function () {
  console.log(`control flow: start of rollDice()`);
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log(`rollDice output is a random integer: ${randomInteger}`);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log(`Control flow: start of rollDiceForPlayer()`);
  var counter = 0;
  while (counter < 2) {
    // store the rolls in the currentParray
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  console.log(`player rolls: ${currentPlayerRolls}`);
  return `Welcome, Player ${currentPlayer}<br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]}<br>Dice 2: ${currentPlayerRolls[1]}.<br><br>For the first digit of your final value, do you want to use the value from dice 1 or dice 2? input '1' or '2'`;
};

var getPlayerScore = function (playerInput) {
  var playerScore = ``;
  // Input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      `Control flow: Input validation, invalid input... NOT 1 AND NOT 2`
    );
    return `ERROR Please input only '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}`;
  }
  // Input == 1
  if (playerInput == 1) {
    console.log(`Control flow: input == 1`);
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  // Input == 2
  if (playerInput == 2) {
    console.log(`Control flow: input == 2`);
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  currentPlayerRolls = []; // clear currentPlayerRolls array
  return `Player ${currentPlayer}, your chosen value is ${playerScore}`;
};

var main = function (input) {
  console.log(
    `Checking game state when submit button is clicked: ${gameState}`
  );
  console.log(
    `Checking current player when submit button is clicked: ${currentPlayer}`
  );
  var outputMessage = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log(`Control flow: gameState == GAME_STATE_DICE_ROLL`);
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER`);
    // Call playerScore function
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log(
        `Control flow: end of player 1's turn. Now is player 2's turn.`
      );
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${outputMessage}.<br>It is now player ${currentPlayer}'s turn.<br>Press submit when ready to roll the dice`; // return outputMessage within the if statement so that no other code below will run after this if condition is done
    }
    if (currentPlayer == 2) {
      console.log(
        `Control flow: end of player 2's turn. Next submit click will compare score`
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return `${outputMessage}.<br>Press submit to compare scores`;
    }
  }
};
