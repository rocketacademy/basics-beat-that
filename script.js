//1) 2 players and player take turns
//2) when a player clicks submit, game rolls 2 dice and shows dice rolls
//3) player picks the order of the dice they want
//4) after both players rolled and dice order chosen, player with higher combined number wins

// rolls 2 dice and turns the output for 1 player. that player chooses the dice order and get the correct return output
// refactor code to include player 2
// implement comparing dice scores and declare winner
// reset game so that players can play continually

var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];
// Helper funfction

var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  //random Decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // random Integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger: ", randomInteger);
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
    ".<br><br>Now, please input either '1' or '2' to choose the corresnponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation, invalid input... NOT 1 AND NOT 2"
    );
    return (
      "Error! Please only input '1' or '' to choose which dice to use as the first digit.<br><br?Your dice rolls are:<br>Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[2] +
      "."
    );
  }
  //input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen value is: " + playerScore;
  }
  // input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen value is: " + playerScore;
  }
};

var main = function (input) {
  console.log("checking game state on submit click:", gameState);
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
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    //Call playerScore function

    outputMessage = getPlayerScore(input);
    return outputMessage;
  }
};
