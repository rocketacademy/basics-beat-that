// === REQUIREMENTS ===
// 1. 2 players play and they take turns
// 2. when a player clicks submit, the game rolls 2 dice and show the output of the dice rolls e.g 2 and 4
// 3. that player picks the order of the dice they want. e.g if he wanted 42, specify 2nd dice goes first
// 4. after both players rolled and chosen dice order, scores are compared and higher number wins

// === problem breakdown and planning ===
// ver 1. rolls 2 dice and returns the output for 1 player. that player chooses the dice order and gets the correct output value returned
// ver 2. refactor code to include player 2's turn
// ver 3. implement comparing dice scores and declare winner
// ver 4. reset game so that players can play again without refreshing browser page

// === code start ===
// global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

// helper function
var rollDice = function () {
  console.log("Control Flow: Start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger: " + randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control Flow: Start of rollDiceForPlayer()");
  for (let i = 0; i < 2; i += 1) {
    playerRolls.push(rollDice());
  }
  console.log("rollDiceForPlayer changes, playerRolls: " + playerRolls);
  return (
    "Welcome!<br><br>You rolled:<br>Dice 1: " +
    playerRolls[0] +
    " | Dice 2: " +
    playerRolls[1] +
    ".<br><br>Sweet! Now input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control Flow: Input validation, invalid input... INPUT NOT 1 OR 2"
    );
    return (
      "Invalid input! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[1] +
      "."
    );
  }
  // input == 1
  if (playerInput == 1) {
    console.log("Control Flow: input == 1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: '" + playerScore + "'.";
  }
  // input == 2
  if (playerInput == 2) {
    console.log("Control Flow: input == 2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: '" + playerScore + "'.";
  }
};

var main = function (input) {
  console.log("Check game state on submit click: " + gameState);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control Flow: gameState == GAME_STATE_DICE_ROLL");

    // display dice numbers rolled as output message
    outputMessage = rollDiceForPlayer();

    // change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control Flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    // call getPlayerScore function
    outputMessage = getPlayerScore(input);
    return outputMessage;
  }
};
