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
var gameStateDiceRoll = "Dice Roll";
var gameStateChooseDiceOrder = "Choose Dice Order";
var gameStateComparePlayerScores = "Compare Player Scores";
var gameCounter = 0;
var gameState = gameStateDiceRoll;
var playerDiceRollValue = [];
var currentPlayer = 1;
var allPlayerScores = [];

//Generate random dice numbers
var diceRandom = function () {
  var randomDiceNo = Math.random() * 6;
  var resultInteger = Math.floor(randomDiceNo) + 1;
  var randomGenerated = resultInteger;
  return randomGenerated;
};

var playerRollDice = function () {
  var gameCounter = 0;
  while (gameCounter < 2) {
    playerDiceRollValue.push(diceRandom());
    gameCounter += 1;
  }
  return `Player ${currentPlayer} rolled: <br> Dice 1 : ${playerDiceRollValue[0]} <br> Dice 2 : ${playerDiceRollValue[1]} <br> Please input your choice of dice order :<br> - 1 if you want Dice 1 to be the first digit of your final value or, <br> - 2 if you want Dice 2 to be the first digit of your final value`;
};

var recordPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Invalid input! Please only enter 1 or 2 to choose which dice to use as first digit of your final value. <br> Here is your dice rolled: <br> Dice 1 : ${playerDiceRollValue[0]} <br> Dice 2 : ${playerDiceRollValue[1]}`;
  }
  if (playerInput == 1) {
    var playerScore =
      String(playerDiceRollValue[0]) + String(playerDiceRollValue[1]);
    return `You choose Dice no. ${playerInput} as your first digit and your final value is ${playerScore}`;
  }
  if (playerInput == 2) {
    var playerScore =
      String(playerDiceRollValue[1]) + String(playerDiceRollValue[0]);
    return `You choose Dice no. ${playerInput} as your first digit and your final value is ${playerScore}`;
  }
  allPlayerScores.push(playerScore);
  playerDiceRollValue = [];
  return `Player ${currentPlayer}, you choose Dice no. ${playerInput} as your first digit and your combined dice number is ${playerScore}.`;
};

var main = function (input) {
  var myOutputMessage = "";
  if (gameState == gameStateDiceRoll) {
    myOutputMessage = playerRollDice();

    gameState = gameStateChooseDiceOrder;
  }

  if (gameState == gameStateChooseDiceOrder) {
    myOutputMessage = recordPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer == 2;
      gameState = gameStateDiceRoll;
      return `${myOutputMessage} <br> Current Player: Player ${currentPlayer}`;
    }
    if (currentPlayer == 2) {
      gameState = gameStateComparePlayerScores;
      return `${myOutputMessage} <br> Click on 'Submit' to calculate scores`;
    }
  }
};
