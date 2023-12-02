var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER ";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

// HELPER FUNCTION
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal) + 1;
  console.log("CrollDice output, randomInterger,", randomInterger);
  return randomInterger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");

  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter += 1;
  }
  console.log(`rollDiceForPlayer changes, playerRolls`, playerRolls);
  return `Welcome<br><br>You rolled:<br> Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}.<br><br>Now, select '1' or '2' to choose the corresponding dice to be used as the first digit of your final value`;
};

var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: gameState = GAME_STATE_CHOOSE_DICE_ORDER");
    return `ERROR! Please only input '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.<br><br> You rolled <br> Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}`;
  }

  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(String(playerRolls[0])) + String(playerRolls[1]);
    return `Your chosen value is: ${playerScore}`;
  }

  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(String(playerRolls[1])) + String(playerRolls[0]);
    return `Your chosen value is: ${playerScore}`;
  }
};

var main = function (input) {
  console.log(`Checking game state on submit click: ${gameState}`);
  var myOutputValue = "";

  if ((gameState = GAME_STATE_DICE_ROLL)) {
    console.log("Control flow: gameState = GAME_STATE_DICE_ROLL");

    myOutputValue = rollDiceForPlayer();

    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: input validation for input not 1 and 2");
    myOutputValue = getPlayerScore(input);

    return myOutputValue;
  }
};
