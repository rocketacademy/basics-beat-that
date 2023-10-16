// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Part 1. rolls 2 dice and turns the output for 1 player. That player chooses the dice order and get the correct return output.

var gameMode1 = "players roll dice";
var gameMode2 = "players choose the order of the dice";

var gameState = gameMode1;

var playerRolls = [];

// Create a roll dice function
var rollDice = function () {
  console.log("start of dice roll");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("dice output = ", randomInteger);
  return randomInteger;
};

// Create a roll dice function for player
var rollDiceForPlayer = function () {
  console.log("start of roll dice for player");
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("roll dice for player: ", playerRolls);
  return (
    "Welcome, You rolled <br> Dice 1: " +
    playerRolls[0] +
    "<br>Dice 2: " +
    playerRolls[1] +
    "<br>Please choose between 1 or 2 to choose the corresponding dice to be used as the first digit of your final value"
  );
};

var getPlayerScore = function (playerInput) {
  // if input is not 1 or 2
  if (playerInput != 1 && playerInput != 2) {
    console.log("input is not 1 or 2");
    return (
      "Error! Please only input 1 or 2 to choose the corresponding dice to be used as the first digit of your final value<br>Your dice rolls are<br>Dice 1: " +
      playerRolls[0] +
      "<br>Dice 2: " +
      playerRolls[1]
    );
  }
  // input = 1
  if (playerInput == 1) {
    console.log("If input = 1");
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return "Your chosen score is " + playerScore;
  }

  // input = 2
  if (playerInput == 1) {
    console.log("If input = 2");
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return "Your chosen score is " + playerScore;
  }
};

var main = function (input) {
  console.log("check game state: ", gameState);
  var myOutputMessage = "";
  if (gameState == gameMode1) {
    console.log("game state = players roll dice");
    myOutputMessage = rollDiceForPlayer();
    gameState = gameMode2;
    return myOutputMessage;
  }
  if ((gameState = gameMode2)) {
    console.log("check game state: ", gameState);
    // call player score function
    myOutputMessage = getPlayerScore(input);
    return myOutputMessage;
  }
};
