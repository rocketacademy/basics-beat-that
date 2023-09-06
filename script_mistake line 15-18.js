// Base
// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
var playerRolls = [];
var gameStateDiceOrder = "choose_Dice_Order";
var gameStateDiceRoll = "dice_Roll";
gameState = gameStateDiceRoll;

var main = function (input) {
  var stringbuilder = "";
  if (gameState == gameStateDiceRoll) {
    var diceOneRandomOutput = rollDiceFn(input);
    var diceTwoRandomOutput = diceFn(input);
    playerRolls.push(diceOneRandomOutput, diceTwoRandomOutput);
    output = rollDiceFn();
    gameState = gameStateDiceOrder;
    return stringbuilder;
  }
  if (gameState == gameStateDiceOrder) {
    var playerScore = getPlayerScore(input);
    return playerScore;
  }
};

var diceFn = function () {
  var diceRandomOutput = Math.floor(Math.random() * 6) + 1;
  return diceRandomOutput;
};

var rollDiceFn = function () {
  var counter = 0;
  while (counter < 2) playerRolls.push(diceFn());
  counter = counter + 1;
  return (
    "🎲WELCOME🎲 <br> You rolled " +
    playerRolls[0] +
    " for dice one and " +
    playerRolls[1] +
    " for dice two. <br>Choose the order of the dice by entering '1' to start with dice one, and '2' to start with dice two."
  );
};

var getPlayerScore = function (input) {
  if (input != 1 && input != 2) {
    return "Error! Please return only '1' or '2'";
  }
  if (input == 1) {
    var playerScore = playerRolls[0] * 10 + playerRolls[1];
    gameState = gameStateDiceRoll;
    return "Your chose " + playerScore + ".";
  }
  if (input == 2) {
    gameState = gameStateDiceRoll;
    var playerScore = dplayerRolls[1] * 10 + playerRolls[0];
    return "Your chose " + playerScore + ".";
  }
};
