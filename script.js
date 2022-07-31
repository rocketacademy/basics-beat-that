// ==== REQUIREMENTS====/
//1. 2 players and players take turns.
//2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//3. The player picks the order of the dice they want.
//4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

//===Problem Breakdown==
// v1. rolls 2 dice and turns the output for one player. player chooses dice order and get return output
// v2. refactored code to include player 2
// v3. implement ocmparing dice scores and declare winner
// v4. reset the game so players can play continually without refreshing page

//Global Variables
var STATE_DICE_ROLL = "STATE_DICE_ROLL";
var STATE_DICE_ORDER = "STATE_DICE_ORDER";
var gameState = STATE_DICE_ROLL;

var playerRolls = [];

//Helper Function for dice roll
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  //random decimal between 0 and 6;
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger:", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlater()");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
    console.log("rollDiceForPlayer changes, playerRolls: ", playerRolls);
    return (
      "Welcome <br><br> You rolled: <br>Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[1] +
      ". <br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
    );
  }
};

var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input validation. input is NOT 1 and NOT 2");
    return (
      "Error! Please input only '1' or '2' to choose which dice to use as your first digit. <br><br> Your dice rolls are: <br> Dice 1: " +
      playerRolls[0] +
      " | Dice 2: " +
      playerRolls[1] +
      "."
    );
  }
  // input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = String(playerRolls[0]) + String(playerRolls[1]);
    return "Your chosen value is " + playerScore;
  }
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = String(playerRolls[1]) + String(playerRolls[0]);
    return "Your chosen value is " + playerScore;
  }
};

var main = function (input) {
  console.log("Check game state on submit click:", gameState);
  var myOutputValue = "";
  if ((gameState = STATE_DICE_ROLL)) {
    console.log("Control flow: gameState == STATE_DICE_ROLL");

    //Change the game state
    gameState = STATE_DICE_ORDER;

    //Display dice rolled as output message
    myOutputValue = rollDiceForPlayer();

    if ((gameState = STATE_DICE_ORDER)) {
      console.log("Control flow: gameState = STATE_DICE_ORDER");
      //Call platerScore function
      myOutputValue = getPlayerScore(input);
    }
  }
  return myOutputValue;
};
