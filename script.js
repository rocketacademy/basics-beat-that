// 2 players, players take turns to roll 2 dice
// when a player clicks submit, the game rolls 2 dice and shows the 2 dice rolls
// the player picks the order of the dice they want, if they want the first or second dice to go
// after both players have rolled and chosen dice order

var gameStateDiceRoll = "Game State Dice Roll";
var gameStateChooseDiceOrder = "Game State Choose Dice Order";
var gameStateCompareScores = "Game State Compare Scores";
var gameState = gameStateDiceRoll;

var existingPlayerDiceRolls = [];
var existingPlayer = 1;
var allPlayersScore = [];

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
    existingPlayerDiceRolls.push(diceRoll());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer, playerRolls: ", existingPlayerDiceRolls);
  return `Welcome, Player ${existingPlayer} <br><br> You have rolled: <br> Dice 1: ${existingPlayerDiceRolls[0]}, <br> Dice 2: ${existingPlayerDiceRolls[1]}, <br> now please enter either "1" or "2" to indicate the dice to be used as the first digit of your choice.`;
};

var obtainPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation , invalid input.. Not 1 and Not 2"
    );
    return `Error! Please only input '1', or '2' to indicate the dice to be used as the first digit of your choice. Your dice Rolls are : <br> Dice 1: ${existingPlayerDiceRolls[0]}, <br> Dice 2: ${existingPlayerDiceRolls[1]}.`;
  }

  if (playerInput == 1) {
    console.log("Control flow: playerInput == 1");
    playerScore = Number(
      String(existingPlayerDiceRolls[0]) + String(existingPlayerDiceRolls[1])
    );
  }

  if (playerInput == 2) {
    console.log("Control flow: playerInput == 2");
    var playerScore = Number(
      String(existingPlayerDiceRolls[1]) + String(existingPlayerDiceRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  // clear existing player rolls array
  existingPlayerDiceRolls = [];
  return `Player ${existingPlayer}, your chosen  value is: ${playerScore}`;
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  console.log("Checking existingPlayer on submit click:", existingPlayer);
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

    if (existingPlayer == 1) {
      console.log("Control flow: end of P1's turn, it's now P2's turn");
      existingPlayer = 2;
      gameState = gameStateDiceRoll;
      return `${myOutputValue} <br><br> It is now player's 2 turn!`;
    }

    if (existingPlayer == 2) {
      gameState = gameStateCompareScores;
      return `${myOutputValue} <br><br> Please hit on submit to calculate your scores!`;
    }

    return myOutputValue;
  }
};
