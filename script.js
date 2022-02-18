/*
===== REQUIREMENTS =====
1) There are 2 players and each would take turns
2) When a player clicks submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6
3) The play picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first
4) After both players have rolled and chosen dice order, the player with the higher combined number wons

===== Problem breakdown and Planning =====
Ver 1. Rolls 2 dice and turns the output for 1 player. That player chooses the dice order and get the correct return output
Ver 2. Refactored code to include player 2
Ver 3. Implement comparing dice scores and declare winner
Ver 4. Reset the game so that players can play continually without refreshing the browser page
*/
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

// Helper Function
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  // Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter += 1;
  }

  console.log("rollDiceForPlayer changes, playerRolls: ", playerRolls);
  return `Welcome<br><br>You rolled:<br>Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}. <br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && input != 2) {
    console.log(
      "Control flow: input validation, invalid input... NOT 1 and NOT 2"
    );
    return `Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}.`;
  }
  // input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is " + playerScore;
  }

  // input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is " + playerScore;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");

    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    // Call playerScore function
    outputMessage = getPlayerScore(input);

    return outputMessage;
  }
};
