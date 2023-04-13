// *** BASE REQUIREMENTS *** //
// 1) There are 2 players and players take turns.
// 2) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4) After both players have rolled and chosen dice order, the player with the higher combined number wins.

// *** BASE PLAN ***//
// 1) Player 1 roll 2 dice that give random dice number
// 2) Player 1 choose dice order which gives highest combined dice number
// 3) player 2 roll 2 dice that give random dice number
// 4) player 2 choose dice order which gives highest combined dice number
// 5) compare dice scores of both players and declare winner
// 6) reset the game so that the players can play the game continuously

// Global variables
var gameStateDiceRoll = "Player roll dice";
var gameStateChooseDiceOrder = "Player choose Dice Order";
var gameStateComparePlayerScores = "Compare player scores";
var gameCounter = 0;
var gameState = gameStateDiceRoll;
var playerDiceRollValue = [];
var currentPlayer = 1;
var allPlayerScores = [];

// Generate random dice number from 1 to 6
var diceRandom = function () {
  var randomDiceNo = Math.random() * 6;
  var resultInteger = Math.floor(randomDiceNo) + 1;
  var randomGenerated = resultInteger;
  return randomGenerated;
};

// Player roll 2 dice and return dice number
var playerRollDice = function () {
  var gameCounter = 0;
  playerDiceRollValue = [];
  while (gameCounter < 2) {
    playerDiceRollValue.push(diceRandom());
    gameCounter += 1;
  }
  return `Player ${currentPlayer} rolled: <br><br> Dice 1 : ${playerDiceRollValue[0]} <br> Dice 2 : ${playerDiceRollValue[1]} <br><br> Please input your choice of dice order :<br> - '1' for dice no. 1 <br> - '2' for dice no. 2`;
};

// Player choose dice order and return combined dice value.
// Player score is recorded
var recordPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Invalid input!<br> Please enter '1' or '2' to choose the order of dicenb <br><br> Here is your dice rolled: <br> Dice 1 : ${playerDiceRollValue[0]} <br> Dice 2 : ${playerDiceRollValue[1]}<br>`;
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(playerDiceRollValue[0]) + String(playerDiceRollValue[1])
    );
    allPlayerScores.push(playerScore);
    return `Player ${currentPlayer} choose dice no. ${playerInput} as first digit | Combined dice number: ${playerScore}`;
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(playerDiceRollValue[1]) + String(playerDiceRollValue[0])
    );
    allPlayerScores.push(playerScore);
    return `Player ${currentPlayer} choose dice no. ${playerInput} as first digit | Combined dice number: ${playerScore}`;
  }
};

// Compare both player scores. Player with higher combined number wins
var comparePlayerScores = function () {
  var compareScore =
    "Player 1 score: " +
    allPlayerScores[0] +
    "<br>Player 2 score: " +
    allPlayerScores[1];
  if (allPlayerScores[0] > allPlayerScores[1]) {
    compareScore += "<br><br>Player 1 wins!";
  } else if (allPlayerScores[0] < allPlayerScores[1]) {
    compareScore += "<br><br>Player 2 wins!";
  } else {
    compareScore += "<br><br>It's a tie!";
  }
  return compareScore;
};

// Restart the game
var restartGame = function () {
  currentPlayer = 1;
  gameState = gameStateDiceRoll;
  allPlayerScores = [];
  playerDiceRollValue = [];
};

var main = function (input) {
  var outputMessage;
  if (gameState == gameStateDiceRoll) {
    if (currentPlayer == 1) {
      outputMessage = playerRollDice();
    } else if (currentPlayer == 2) {
      outputMessage = playerRollDice();
    }
    gameState = gameStateChooseDiceOrder;
    return outputMessage;
  }

  if (gameState == gameStateChooseDiceOrder) {
    outputMessage = recordPlayerScore(input);
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return `${outputMessage} <br><br> It's now Player 2 turn, click on 'Submit' to roll dice`;
    }
    if (currentPlayer == 2) {
      gameState = gameStateComparePlayerScores;
      return `${outputMessage} <br><br> Click on 'Submit' to calculate scores`;
    }
  }

  if (gameState == gameStateComparePlayerScores) {
    outputMessage = comparePlayerScores();
    restartGame();
    return outputMessage;
  }
};
