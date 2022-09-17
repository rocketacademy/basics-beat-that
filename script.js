// 2 players take turns to roll 2 dices
// Player clicks submit to roll and show the 2 dice rolls
// Player can pick the order of the dice they want
// After both players have rolled and chosen the dice order, the one with the higher combined number wins

var diceRollGameMode = "diceRollGameMode";
var chooseDiceOrderGameMode = "chooseDiceOrderGameMode";
var compareDiceRollsGameMode = "compareDiceRollsGameMode";
var gameMode = diceRollGameMode;
var randomNumberOnDice = [1, 2, 3, 4, 5, 6];

var currentPlayerDiceRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  var randomNumberGenerated =
    randomNumberOnDice[Math.floor(Math.random() * randomNumberOnDice.length)];
  console.log("random number generated", randomNumberGenerated);
  return randomNumberGenerated;
};

var rollDiceForPlayer = function () {
  var numberOfDice = 0;
  while (numberOfDice < 2) {
    currentPlayerDiceRolls.push(rollDice());
    numberOfDice = numberOfDice + 1;
  }
  return (
    "Hello Player " +
    currentPlayer +
    "!<br><br>Your dice rolls are:<br>Dice 1: " +
    currentPlayerDiceRolls[0] +
    " and Dice 2: " +
    currentPlayerDiceRolls[1] +
    ".<br><br>Please proceed to input either '1' or '2' to choose the respective dice to be used as the first digit of your final value.<br><br>Choose wisely!"
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return (
      "Invalid input! Please only input either '1' or '2' to choose the respective dice to be used as the first digit of your final value. Your dice rolls are:<br>Dice 1: " +
      currentPlayerDiceRolls[0] +
      " and Dice 2: " +
      currentPlayerDiceRolls[1] +
      " "
    );
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerDiceRolls[0]) + String(currentPlayerDiceRolls[1])
    );
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerDiceRolls[1]) + String(currentPlayerDiceRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  currentPlayerDiceRolls = [];
  return (
    "Player " +
    currentPlayer +
    " , you have chosen " +
    playerScore +
    " as your final value"
  );
};

var main = function (input) {
  console.log("Game mode when clicking submit button", gameMode);
  console.log(
    "Which current player when clicking submit button",
    currentPlayer
  );
  var myOutputMessage = "";
  if (gameMode == diceRollGameMode) {
    myOutputMessage = rollDiceForPlayer();
    gameMode = chooseDiceOrderGameMode;
    return myOutputMessage;
  }
  if (gameMode == chooseDiceOrderGameMode) {
    myOutputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = diceRollGameMode;
      return myOutputMessage + "<br><br>Time for player 2 to play!";
    }

    if (currentPlayer == 2) {
      gameMode = compareDiceRollsGameMode;
      return (
        myOutputMessage +
        "<br><br>Go ahead and click submit to calculate the scores!"
      );
    }
  }
};
