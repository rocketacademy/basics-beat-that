var playerRolls = [];
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var gameState = GAME_STATE_DICE_ROLL;

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(`dice roll ${diceNumber}`);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log(`Start of rollDiceForPlayer()`);
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(diceRoll());
    counter += 1;
  }
  console.log(`rollDiceForPlayer changes, playerRolls: ${playerRolls}`);
  return `Welcome! <br><br>You rolled ${playerRolls[0]} and ${playerRolls[1]}.<br>Please input 1 or 2 to pick roll 1 or roll 2 respectively as the first digit of your final result.`;
};

var getPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return `Please input 1 or 2 to choose either dice 1 or dice 2 as your first digit. Your rolls are: ${playerRolls[0]} and ${playerRolls[1]}.`;
  }
  if (playerInput == 1) {
    console.log(`player chose 1`);
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `Your chosen result is ${playerScore}`;
  }
  if (playerInput == 2) {
    console.log(`player chose 2`);
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `Your chosen result is ${playerScore}`;
  }
};

var main = function (input) {
  console.log(`Game state on submit: ${gameState}`);
  var myOutputMessage = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log(`gameState == GAME_STATE_DICE_ROLL`);
    myOutputMessage = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log(`game state: GAME_STATE_CHOOSE_DICE_ORDER`);
    return myOutputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`gamestate == GAME_STATE_CHOOSE_DICE_ORDER`);
    myOutputMessage = getPlayerScore(input);
    return myOutputMessage;
  }
};
