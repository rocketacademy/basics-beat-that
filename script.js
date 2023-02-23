// 2 players, players take turns to roll 2 dice
// when a player clicks submit, the game rolls 2 dice and shows the 2 dice rolls
// the player picks the order of the dice they want, if they want the first or second dice to go
// after both players have rolled and chosen dice order

var gameStateDiceRoll = "Game State Dice Roll";
var gameStateChooseDiceOrder = "Game State Choose Dice Order";
var gameState = gameStateDiceRoll;

var playerDiceRolls = [];

// Random dice roll function
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

// Roll 2 dice for player, use loop function
var diceRollForPlayer = function () {
  console.log("Control flow: start of diceRollForPlayer()");
  var counter = 0;
  while (counter < 2) {
    playerDiceRolls.push(diceRoll());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer, playerRolls: ", playerDiceRolls);
  return `Welcome! <br><br> You have rolled: <br> Dice 1: ${playerDiceRolls[0]}, <br> Dice 2: ${playerDiceRolls[1]}, <br> now please enter either "1" or "2" to indicate the dice to be used as the first digit of your choice.`;
};

var obtainPlayerScore = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation , invalid input.. Not 1 and Not 2"
    );
    return `Error! Please only input '1', or '2' to indicate the dice to be used as the first digit of your choice. Your dice Rolls are : <br> Dice 1: ${playerDiceRolls[0]}, <br> Dice 2: ${playerDiceRolls[1]}.`;
  }

  if (playerInput == 1) {
    console.log("Control flow: playerInput == 1");
    var playerScore = Number(
      String(playerDiceRolls[0]) + String(playerDiceRolls[1])
    );
    return `Your chosen value is: ${playerScore}`;
  }

  if (playerInput == 2) {
    console.log("Control flow: playerInput == 2");
    var playerScore = Number(
      String(playerDiceRolls[1]) + String(playerDiceRolls[0])
    );
    return `Your chosen value is: ${playerScore}`;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  var myOutputValue = "";
  if (gameState == gameStateDiceRoll) {
    console.log("Control flow: gameState == Game State Dice Roll ");
    myOutputValue = diceRollForPlayer();
    gameState = gameStateChooseDiceOrder;
    return myOutputValue;
  }

  if (gameState == gameStateChooseDiceOrder) {
    console.log("Control flow: gameState == Game State Choose Dice Order ");
    myOutputValue = obtainPlayerScore(input);
    return myOutputValue;
  }
};
