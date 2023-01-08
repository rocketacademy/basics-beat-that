var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log("Your dice roll is", diceNumber);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  }
  return (
    "Welcome to the Beat That Game Player " +
    currentPlayer +
    "! Your roll for Dice 1 is " +
    currentPlayerRolls[0] +
    ". Your roll for Dice 2 is " +
    currentPlayerRolls[1] +
    ". Now please choose which dice (either 1 or 2) you want as the first digit of your value."
  );
};

var getPlayerScore = function (input) {
  var currentPlayerScore;
  // if (input != 1 && input != 2) {
  //   return (
  //     "Error! Please input only either 1 or 2 as the dice that you want as your first digit of your value. Your rolls are Dice 1: " +
  //     currentPlayerRolls[0] +
  //     ". Dice 2: " +
  //     currentPlayerRolls[1] +
  //     "."
  //   );
  // }
  if (input == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return (
      "Your chosen value is " + playerScore + ". It is now Player 2's turn!"
    );
  }
  if (input == 2) {
    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[2])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return (
      "Your chosen value is " + playerScore + ". It is now Player 2's turn!"
    );
  }
};

var comparePlayersScore = function () {
  if (allPlayersScore[0] > allPlayersScore[1]) {
    return "Player 1 wins!";
  }
  if (allPlayersScore[0] < allPlayersScore[1]) {
    return "Player 2 wins:";
  }
  if (allPlayersScore[0] == allPlayersScore[1]) {
    return "It's a tie!";
  }
};

var main = function (input) {
  console.log(
    "The current game state is " +
      gameState +
      ". The current player is Player " +
      currentPlayer +
      "."
  );
  var myOutputValue = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    myOutputValue = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputValue = getPlayerScore(input);
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return myOutputValue;
    }
    if (currentPlayer == 2) {
      gameState = GAME_STATE_COMPARE_SCORES;
      return myOutputValue;
    }
  }

  if ((gameState = GAME_STATE_COMPARE_SCORES)) {
    myOutputValue = comparePlayersScore();
    return myOutputValue;
  }
};
