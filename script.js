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
var gameStateDiceRoll = "Game State Dice Roll";
var gameStateChooseDiceOrder = "Game State Choose Dice Order";
var gameCounter = 0;
var gameState = gameStateDiceRoll;
var player1DiceRollValue = [];
var player2DiceRollValue = [];
var currentPlayer = 1;

//Generate random dice numbers
var diceRandom = function () {
  var randomDiceNo = Math.random() * 6;
  var resultInteger = Math.floor(randomDiceNo) + 1;
  var randomGenerated = resultInteger;
  return randomGenerated;
};

var player1RollDice = function () {
  var gameCounter = 0;
  while (gameCounter < 2) {
    player1DiceRollValue.push(diceRandom());
    gameCounter += 1;
  }
  return `Player 1 rolled: <br> Dice 1 : ${player1DiceRollValue[0]} <br> Dice 2 : ${player1DiceRollValue[1]} <br> Please input your choice of dice order :<br> - 1 if you want Dice 1 to be the first digit of your final value or, <br> - 2 if you want Dice 2 to be the first digit of your final value`;
};

//var player2RollDice = function () {
//  var gameCounter = 0;
//  while (gameCounter < 2) {
//    player2DiceRollValue.push(diceRandom());
//    gameCounter += 1;
//   }
//   return `Player 2 rolled: <br> Dice 1 : ${player2DiceRollValue[0]} <br> Dice 2 : ${player2DiceRollValue[1]} <br> Please input your choice of dice order :<br> - 1 if you want Dice 1 to be the first digit of your final value or, <br> - 2 if you want Dice 2 to be the first digit of your final value`;
// };

var player1Score = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return `Invalid input! Please only enter 1 or 2 to choose which dice to use as first digit of your final value. <br> Here is your dice rolled: <br> Dice 1 : ${player1RollDice[0]} <br> Dice 2 : ${player1RollDice[1]}`;
  }
  if (playerInput == 1) {
    var player1Score =
      String(player1DiceRollValue[0]) + String(player1DiceRollValue[1]);
    return `You choose Dice no. ${playerInput} as your first digit and your final value is ${player1Score}`;
  }
  if (playerInput == 2) {
    var player1Score =
      String(player1DiceRollValue[1]) + String(player1DiceRollValue[0]);
    return `You choose Dice no. ${playerInput} as your first digit and your final value is ${player1Score}`;
  }
};

var main = function (input) {
  var myOutputMessage = "";
  if (gameState == gameStateDiceRoll) {
    myOutputMessage = player1RollDice();

    gameState = gameStateChooseDiceOrder;
  }

  if (gameState == gameStateChooseDiceOrder) {
    myOutputMessage = player1Score(input);
    return myOutputMessage;
  }
};
