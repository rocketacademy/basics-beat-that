/*
---Requirements---
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

---Problem breakdown---

1. Roll 2 dice and show output for player. Player 1 choose dice order and get his number.
2. Refactor code to include player 2.
3. Compare dice scores and declare a winner. 
4. Reset the game so that player can play continually without refreshing the browser page. 
*/

//---Global Variable---
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
//Set first state of the game
var gameState = GAME_STATE_DICE_ROLL;

//Create an array
var playerRolls = [];

//---HELPER FUNCTION #1 - DICE ROLL---
var rollDice = function () {
  console.log("Control flow: Start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output", randomInteger);
  return randomInteger;
};

//---HELPER FUNCTION 2 - ROLL DICE FOR PLAYER---
var rollDiceForPlayer = function () {
  console.log("Control flow: Start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls: " + playerRolls);
  return (
    "Welcome <br> You rolled:<br>Dice 1: " +
    playerRolls[0] +
    " Dice 2 " +
    playerRolls[1] +
    "Plase enter '1' or '2' to choose the corresponding dice to be set as your first digit of your final value"
  );
};

var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input validation, invalid input NOT1 NOR2");
    return `Error! Please only input '1' or '2' to choose which dice to use as the fisrt digit.<br>Your dice rolls are: <br>Dice 1: ${playerRolls[0]} Dice 2: ${playerRolls[1]}.`;
  }
  //input == 1
  if (playerInput == 1) {
    console.log("control flow: input == 1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `Your chosen value is: ${playerScore}`;
  }

  //input == 2
  if (playerInput == 2) {
    console.log("control flow: input == 2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `Your chosen value is: ${playerScore}`;
  }
};

//---MAIN FUNCTION----

var main = function (input) {
  console.log("Checking game state", gameState);
  var myOutputValue = "";

  if (gameState === GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gamestate = GAME_STATE_DICE_ROLL");
    //Display dice rolled as output message (Show in grey box)
    myOutputValue = rollDiceForPlayer();

    // var rollDice = randomChoice();

    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("GAME_STATE_DICE_ORDER");
  }

  // Call playerScore function

  myOutputValue = getPlayerScore(input);

  return myOutputValue;
};
