// 2 players and players take tunrs
// when a player clicks submit, the game rolls two dice nad shows them
// the player picks the order of dice they want
// the player with the higher combine number wins

//Global Variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

//Helper Function
var rollDice = function () {
  console.log("Control flow: start of rolldice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInterger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls: ", playerRolls);
  return (
    "Welcome<br><br>You rolled:<br>Dice 1: " +
    playerRolls[0] +
    " | Dice 2: " +
    playerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value"
  );
};

var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation, invlaid input... NOT 1 AND NOT 2"
    );
    return (
      "Error! Please only input '1' or '' to choose which dice to use as the first digit.<br><br>Your dice rolls are: <br>Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[1] +
      "."
    );
  }
  // input ==1
  if (playerInput == 1) {
    console.log("Control flow: input ==1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: " + playerScore;
  }
  // input ==2
  if (playerInput == 2) {
    console.log("Control flow: input ==2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: " + playerScore;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Contol flow: gameState == GAME_STATE_CHOOSE_DEICE_ORDER");

    //call playscore function
    outputMessage = getPlayerScore(input);
    return outputMessage;
  }
};
