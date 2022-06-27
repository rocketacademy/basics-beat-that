// REQUIREMENTS
// 1. There are 2 players and players take turns.
// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4. After both players have rolled and chosen dice order, the player with the higher combined number wins
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var gameState = GAME_STATE_DICE_ROLL;
// Initialize an empty array to store playerRolls
var playerRolls = [];

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
    // store the rolls in the playerRolls array
    playerRolls.push(rollDice());
    counter += 1;
  }
  console.log(`player rolls: ${playerRolls}`);
  return `Welcome<br><br>You rolled:<br>Dice 1: ${playerRolls[0]}<br>Dice 2: ${playerRolls[1]}.<br><br>For the first digit of your final value, do you want to use the value from dice 1 or dice 2? input '1' or '2'`;
};

var getPlayerScore = function (playerInput) {
  // Input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      `Control flow: Input validation, invalid input... NOT 1 AND NOT 2`
    );
    return `ERROR Please input only '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}`;
  }
  // Input == 1
  if (playerInput == 1) {
    console.log(`Control flow: input == 1`);
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `Your chosen value is ${playerScore}`;
  }
  // Input == 2
  if (playerInput == 2) {
    console.log(`Control flow: input == 2`);
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `Your chosen value is ${playerScore}`;
  }
};

var main = function (input) {
  console.log(
    `checking game state when submit button is clicked: ${gameState}`
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
    return outputMessage;
  }
};
