// Base version of Beat That
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//define global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

// Function to roll dice
var rollDice = function () {
  // produce a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // remove the decimal
  var randomInteger = Math.floor(randomDecimal);
  // add 1 to get a number between 1 and 6 inclusive
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Function to roll dice twice
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return (
    "Hi Battle Player <br><br> You rolled <br> Dice 1: " +
    playerRolls[0] +
    " & Dice 2: " +
    playerRolls[1] +
    "<br><br> Please input either '1' or '2' to choose the dice for the first digit value."
  );
};

//Function to get player's score
var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return (
      "Oops! There is an error. Please input 1 or 2 only. Your dice rolls were: <br> Dice 1: " +
      playerRolls[0] +
      " Dice 2: " +
      playerRolls[1]
    );
  }
  if (playerInput == 1) {
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: " + playerScore;
  }
  if (playerInput == 2) {
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: " + playerScore;
  }
};

//Main function
var main = function (input) {
  var myOutputValue = " ";
  if (gameState == GAME_STATE_DICE_ROLL) {
    myOutputValue = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputValue = getPlayerScore(input);
    return myOutputValue;
  }
};
