// 2 players taking turns
//player clicks submit, the game rolls 2 dice.
//output is the 2 numbers of the dice rolls (random), example 3 and 6
// the player picks the order of the dice they want (or can we automatically choose from the player?)
// player 2 turns
// winner determined (the higher combined number)

// FIRST STEP is input: submit. output: 2 numbers from random dice.

var diceRollStage = "ROLL THE DICE";
var chooseOrderStage = "CHOOSE THE DICE ORDER";
var gameState = diceRollStage;

var playerRolls = [];

// Helper function
var rollDice = function () {
  console.log("start the rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log("rollDiceForPlayer changes, playerRolls: ", playerRolls);
  return (
    "Hello Hello...<br><br>Dice #1: " +
    playerRolls[0] +
    "<br><br>Dice #2: " +
    playerRolls[1] +
    "<br><br>Next, please type in '1' to choose the first dice as the first digit of your final value or '2' to choose the second dice."
  );
};

var main = function (input) {
  console.log("Checking game state on submit click", gameState);
  var myOutputMessage = "";
  return myOutputMessage;
  if (gameState == diceRollStage) {
    console.log("gameState == diceRollStage");

    // Display dice rolled as output message
    myOutputMessage = rollDiceForPlayer();

    //change the game state
    gameState = chooseOrderStage;
  }
  return myOutputMessage;

  if (gameState == chooseOrderStage) {
    console.log("gameState == chooseOrderStage");

    // input validation
    if (input != 1 && input != 2) {
      console.log("invalid input, NOT 1 or 2");
      return (
        "OOPSIE! <>br<br>Please input ONLY '1' or '2'. <br><br> A gentle reminder, this will determine which dice to use as the first digit of your value. <br><br>Dice #1: " +
        playerRolls[0] +
        "<br><br>Dice #2: " +
        playerRolls[1] +
        "."
      );
    }
    // input == 1

    // input == 2
  }
};
