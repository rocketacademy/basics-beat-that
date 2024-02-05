var gameStateDiceRoll = `GAME STATE DICE ROLL`;
var gameStateChooseDiceOrder = `GAME STATE CHOOSE DICE ORDER`;
var gameState = gameStateDiceRoll;
var gameStateCompareScores = "GAME STATE COMPARE SCORES";

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayerScores = [];

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDIceForPlayer() {
  console.log(`startroll for player 1`);
  var counter = 0;

  for (counter = 0; counter < 2; counter++) {
    currentPlayerRolls.push(rollDice());
  }

  console.log(`the player1 roll` + currentPlayerRolls);
  return (
    "Welcome player " +
    currentPlayer +
    " you rolled Dice 1 : " +
    currentPlayerRolls[0] +
    " | Dice 2 : " +
    currentPlayerRolls[1] +
    " . Now please enter 1 or 2 to choose which number to be used as the first digit of ur final value"
  );
}

function getplayerScore(playerInput) {
  var playerscore;
  if (playerInput != 1 && playerInput != 2) {
    return (
      "please put in 1 or 2. Your rolls are:<br>Dice1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1]
    );
  }

  if (playerInput == 1) {
    playerscore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return "your chosen score is " + playerscore;
  }

  if (playerInput == 2) {
    playerscore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    return "your chosen score is " + playerscore;
  }

  //pushing the players score into the array
  allPlayerScores.push(playerscore);

  currentPlayerRolls = [];

  return "player " + currentPlayer + " your chosen value is: " + playerscore;
}

function main(input) {
  var myOutputMessage = "";

  if (gameState == gameStateDiceRoll) {
    myOutputMessage = rollDIceForPlayer();

    gameState = gameStateChooseDiceOrder;
    return myOutputMessage;
  }

  if (gameState == gameStateChooseDiceOrder) {
    myOutputMessage = getplayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return myOutputMessage + "<br><br> it is now player 2's turn";
    }

    if (currentPlayer == 2) {
      gameState = gameStateCompareScores;
      return myOutputMessage + "<br><br> press to calculate score";
    }
  }

  if (gameState == gameStateCompareScores) {
    console.log("The game state now : " + gameStateCompareScores);
    myOutputMessage =
      " player 1 score: " +
      allPlayerScores[0] +
      "player 2 score" +
      allPlayerScores[1];

    // if player 1 wins
    if (allPlayerScores[0] > allPlayerScores[1]) {
      myOutputMessage = myOutputMessage + "player 1 wins";
    }
    if (allPlayerScores[1] > allPlayerScores[0]) {
      myOutputMessage = myOutputMessage + "player 2 wins";
    }

    if (allPlayerScores[0] == allPlayerScores[1]) {
      myOutputMessage = "it is a tie";
    }
    return myOutputMessage;
  }
}
