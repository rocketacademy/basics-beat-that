// ===== REQUIREMENTS ===== //
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// problem brakdown and planning //
// ver 1. rolls 2 dice and turns the output for player 1. Player 1 chooses the dice order and get the correct return output.
// ver 2. refectored code to include player 2
// ver 3. implement comparing dice scores and declare winner
// ver 4. resetnthe game to the players can play continually without refreshing the page

// Global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

// Helper function
var rollDice = function () {
  // Random integer from 1 to 6;
  return Math.floor(Math.random() * 6) + 1;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }

  return (
    "Welcome<br><br>You rolled:<br>Dice 1: " +
    playerRolls[0] +
    " | Dice 2: " +
    playerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (input) {
  // input validation
  if (input != "1" && input != "2") {
    console.log(
      "Control flow: input validation, invalid input... NOT '1' AND NOT '2'"
    );
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " +
      playerRolls[0] +
      "| Dice 2: " +
      playerRolls[1] +
      "."
    );
  }
  // input == '1'
  if (input == "1") {
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: " + playerScore;
  }
  // input == '2'
  if (input == "2") {
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: " + playerScore;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");

    // Display dice rolls as output message
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  } else if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    // Call getPlayerScore function
    outputMessage = getPlayerScore(input);

    // Reset the game for the next round
    gameState = GAME_STATE_DICE_ROLL;
    playerRolls = [];
  }

  return outputMessage;
};
