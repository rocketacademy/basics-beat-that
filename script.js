// 2 players take turns to roll 2 dices
// Player clicks submit to roll and show the 2 dice rolls
// Player can pick the order of the dice they want
// After both players have rolled and chosen the dice order, the one with the higher combined number wins

var diceRollGameMode = "diceRollGameMode";
var chooseDiceOrderGameMode = "chooseDiceOrderGameMode";
var gameMode = diceRollGameMode;
var randomNumberOnDice = [1, 2, 3, 4, 5, 6];

var playerDiceRolls = [];

var rollDice = function () {
  var randomNumberGenerated =
    randomNumberOnDice[Math.floor(Math.random() * randomNumberOnDice.length)];
  console.log("random number generated", randomNumberGenerated);
  return randomNumberGenerated;
};

var rollDiceForPlayer = function () {
  var numberOfDice = 0;
  while (numberOfDice < 2) {
    playerDiceRolls.push(rollDice());
    numberOfDice = numberOfDice + 1;
  }
  return (
    "Hello!<br><br>Your dice rolls are:<br>Dice 1: " +
    playerDiceRolls[0] +
    " and Dice 2: " +
    playerDiceRolls[1] +
    ".<br><br>Please proceed to input either '1' or '2' to choose the respective dice to be used as the first digit of your final value.<br><br>Choose wisely!"
  );
};

var main = function (input) {
  console.log("Game mode when clicking submit button", gameMode);
  var myOutputMessage = "";
  if (gameMode == diceRollGameMode) {
    gameMode = chooseDiceOrderGameMode;
    myOutputMessage = rollDiceForPlayer();
  }
  if (gameMode == chooseDiceOrderGameMode) {
    if (input != 1 && input != 2) {
      return (
        "Invalid input! Please only input either '1' or '2' to choose the respective dice to be used as the first digit of your final value. Your dice rolls are:<br>Dice 1: " +
        playerDiceRolls[0] +
        " and Dice 2: " +
        playerDiceRolls[1] +
        " "
      );
    }
    if (input == 1) {
      var playerOrderDice = Number(
        String(playerDiceRolls[0]) + String(playerDiceRolls[1])
      );
      return "You have chosen " + playerOrderDice + " as your final value";
    }
    if (input == 2) {
      var playerOrderDice = Number(
        String(playerDiceRolls[1]) + String(playerDiceRolls[0])
      );
      return "You have chosen " + playerOrderDice + " as your final value";
    }
  }
};
