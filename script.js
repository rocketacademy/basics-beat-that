// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// GLOBAL STATES

var DICE_ROLL_GAME_STATE = "";
var ORDER_OF_DICE = "";
var gameState = DICE_ROLL_GAME_STATE;
var player = 1;
var playerRolls = [];

// roll dice functinon
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal) + 1;
  return randomInterger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter += 1;
  }
  console.log("player rolls", playerRolls);
  return `Welcome! You rolled Dice one: ${playerRolls[0]} and Dice two: ${playerRolls[1]} <br> Please enter '1' or '2' to choose the corresponding dice to be used as the fiorst digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please input only '1' or '2'. <br> Dice one value is ${playerRolls[0]} <br> Dice two value is ${playerRolls[1]} `;
  }
  // input == 1
  if (playerInput == 1) {
    var playerScore = Number(String(playerRolls[0])) + String(playerRolls[1]);
    return `You chose ${playerScore}`;
  }
  // input ==2
  if (playerInput == 1) {
    var playerScore = Number(String(playerRolls[0])) + String(playerRolls[1]);
    return `The value you chose ${playerScore}`;
  }
  if (playerInput == 2) {
    var playerScore = Number(String(playerRolls[1])) + String(playerRolls[0]);
    return `The value you chose ${playerScore}`;
  }
};

var main = function (input) {
  var myOutputValue = "";
  // diceRoll function gets called twice.
  if (gameState == DICE_ROLL_GAME_STATE) {
    myOutputValue = rollDiceForPlayer();
    // change the game state
    gameState = ORDER_OF_DICE;
  }

  if (gameState == ORDER_OF_DICE) {
    console.log(`Control flow: gameState == ORDER_OF_DICE`);

    // call playerSCore function into the gameState when it is ORDER_OF_DICE and pass in the input from the main function
    myOutputValue = getPlayerScore(input);
  }
  return myOutputValue;
};

// assign the values into a global variable
// function for an input to be collected 1 or 2
// concatanate both values and store it back in global variable
