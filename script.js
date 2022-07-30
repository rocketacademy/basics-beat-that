var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER = "GAME_MODE_CHOOSE_DICE_ORDER";
var GAME_MODE_COMPARE_SCORES = "GAME_MODE_COMPARE_SCORES";
var gameMode = GAME_MODE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  var noOfDiceFaces = 6;
  var diceNumber = Math.ceil(Math.random() * noOfDiceFaces);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return `Welcome, Player ${currentPlayer}!<br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.<br><br>Please input either '1' or '2' to choose the corresponding dice to be the first digit of your final value.`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.`;
  }

  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  allPlayersScore.push(playerScore);
  var counter = 0;
  for (counter = 0; counter < 2; counter += 1) {
    currentPlayerRolls.shift();
  }
  return `Player ${currentPlayer}, your chosen value is: ${playerScore}`;
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1's score: ${allPlayersScore[0]}.<br>Player 2's score: ${allPlayersScore[1]}.`;

  if (allPlayersScore[0] > allPlayersScore[1]) {
    return `${compareMessage}<br><br>Player 1 wins!`;
  }

  if (allPlayersScore[0] < allPlayersScore[1]) {
    return `${compareMessage}<br><br>Player 2 wins!`;
  }

  if (allPlayersScore[0] == allPlayersScore[1]) {
    return `${compareMessage}<br><br>It's a tie!`;
  }
};

var resetGame = function () {
  currentPlayer = 1;
  gameMode = GAME_MODE_DICE_ROLL;
  var counter = 0;
  for (counter = 0; counter < 2; counter += 1) {
    allPlayersScore.shift();
  }
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == GAME_MODE_DICE_ROLL) {
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return rollDiceForPlayer();
  }

  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER) {
    myOutputValue = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      return `${myOutputValue}.<br><br>It is now Player 2's turn.`;
    }

    if (currentPlayer == 2) {
      gameMode = GAME_MODE_COMPARE_SCORES;
      return `${myOutputValue}.<br><br>Press submit to calculate scores.`;
    }
  }

  if (gameMode == GAME_MODE_COMPARE_SCORES) {
    myOutputValue = comparePlayersScores();

    resetGame();
    console.log("Current player after reset: ", currentPlayer);
    console.log("Game mode after reset: ", gameMode);
    console.log("allPlayersScore array: ", allPlayersScore);
  }
  return myOutputValue;
};
