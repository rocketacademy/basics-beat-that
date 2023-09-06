// Base
// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
var playerRolls = [];
var playerScoreArr = [];
var gameStateTwoDiceOrder = "choose_Two Dice_Order";
var gameStateTwoDiceRoll = "two dice_Roll";
var gameStateThreeDiceOrder = "choose_Three Dice_Order";
var gameStateThreeDiceRoll = "Three dice_Roll";
var welcomePage = "welcome instructions";
var gameStatechooseNumberOfDices = " choose number of dice";
var numberOfDicePlayed = 2;
var gameState = welcomePage;

var main = function (input) {
  if (playerScoreArr.length == 2) {
    var scoreKeepingFn = scoreKeeping();
    if (playerScoreArr[1] > playerScoreArr[0]) {
      playerScoreArr = [];
      playerRolls = [];
      gameState = welcomePage;
      return scoreKeepingFn + "<br><br>Player 2 Wins!";
    }
    if (playerScoreArr[0] > playerScoreArr[1]) {
      playerScoreArr = [];
      playerRolls = [];
      gameState = welcomePage;
      return scoreKeepingFn + "<br><br>Player 1 Wins!";
    }
  }
  if (gameState == welcomePage) {
    gameState = gameStatechooseNumberOfDices;
    return "🎲WELCOME🎲 <br><br> Please choose number of dice to roll. Enter '2' or '3'.";
  }
  if (gameState == gameStatechooseNumberOfDices) {
    var chooseNumberOfDices = chooseNumberOfDicesFn(input);
    if (chooseNumberOfDices == 2) {
      gameState = gameStateTwoDiceRoll;
    }
    if (chooseNumberOfDices == 3) {
      gameState = gameStateThreeDiceRoll;
    }
    return chooseNumberOfDices;
  }
  if (gameState == gameStateTwoDiceRoll) {
    var output = rollTwoDiceFn(input);
    gameState = gameStateTwoDiceOrder;
    return output;
  }
  if (gameState == gameStateThreeDiceRoll) {
    var output = rollThreeDiceFn(input);
    gameState = gameStateThreeDiceOrder;
    return output;
  }
  if (gameState == gameStateTwoDiceOrder) {
    var output = getTwoDicePlayerScore(input);
    return output;
  }
  if (gameState == gameStateThreeDiceOrder) {
    var output = getThreeDicePlayerScore(input);
    return output;
  }
};

var chooseNumberOfDicesFn = function (input) {
  if (input != 2 && input != 3) {
    return "Error! Please return only '2' or '3'";
  }
  gameState = gameStateTwoDiceRoll;
  if (input == 3) {
    numberOfDicePlayed = 3;
    gameState = gameStateThreeDiceRoll;
    return "You chose to roll " + numberOfDicePlayed + " dice.";
  }
  return "You chose to roll " + numberOfDicePlayed + " dice.";
};

var diceFn = function () {
  var diceRandomOutput = Math.floor(Math.random() * 6) + 1;
  return diceRandomOutput;
};

var rollTwoDiceFn = function () {
  var counter = 0;
  while (counter < numberOfDicePlayed) {
    playerRolls.push(diceFn());
    counter = counter + 1;
  }
  return (
    "You rolled " +
    playerRolls[playerRolls.length - 2] +
    " for dice one and " +
    playerRolls[playerRolls.length - 1] +
    " for dice two. <br><br>Choose the order of the dice by entering '1' to start with dice one, and '2' to start with dice two."
  );
};

var rollThreeDiceFn = function () {
  var counter = 0;
  while (counter < numberOfDicePlayed) {
    playerRolls.push(diceFn());
    counter = counter + 1;
  }
  return (
    "You rolled " +
    playerRolls[playerRolls.length - 3] +
    " for dice one, " +
    playerRolls[playerRolls.length - 2] +
    " for dice two and " +
    playerRolls[playerRolls.length - 1] +
    " for dice three." +
    "<br><br> Click 'Submit to auto-generate the optimal score."
  );
};

var getTwoDicePlayerScore = function (input) {
  if (input != 1 && input != 2) {
    return "Error! Please return only '1' or '2'";
  }
  gameState = gameStateTwoDiceRoll;
  if (input == 1) {
    var playerScore =
      playerRolls[playerRolls.length - 2] * 10 +
      playerRolls[playerRolls.length - 1];
    playerScoreArr.push(playerScore);
    gameStartOrEndFn = gameStartOrEnd();
    return "You chose " + playerScore + gameStartOrEndFn;
  }
  if (input == 2) {
    var playerScore =
      playerRolls[playerRolls.length - 1] * 10 +
      playerRolls[playerRolls.length - 2];
    playerScoreArr.push(playerScore);
    gameStartOrEndFn = gameStartOrEnd();
    return "You chose " + playerScore + gameStartOrEndFn;
  }
};

var getThreeDicePlayerScore = function () {
  gameState = gameStateThreeDiceRoll;
  var largest = playerRolls[0]
  var middle = playerRolls[1]
  var smallest = playerRolls[2]
  for (var i = 0; i < playerRolls.length; i++) {
   if (playerRolls[i] > largest ) {
     largest = playerRolls[i];
  }
  var sortedPlayerRolls = playerRolls;
  var playerScore =
    playerRolls[sortedPlayerRolls.length - 1] * 100 +
    playerRolls[sortedPlayerRolls.length - 2] * 10 +
    playerRolls[sortedPlayerRolls.length - 3];
  playerScoreArr.push(playerScore);
  gameStartOrEndFn = gameStartOrEnd();
  return "You optimised score is " + playerScore + gameStartOrEndFn;
};

var scoreKeeping = function () {
  return (
    "Game ends! <br>Player 1's score = " +
    playerScoreArr[0] +
    "<br> Player 2's score =  " +
    playerScoreArr[1]
  );
};

var gameStartOrEnd = function () {
  if (playerScoreArr.length < 2) {
    return ". <br><br>Press 'Submit' for next player's turn.";
  }
  return ". <br><br>Press 'Submit' for the grand score page.";
};
