var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_CHOOSE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var playerWins = [0, 0, 0];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome, Player ${currentPlayer}. <br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]}| Dice 2: ${currentPlayerRolls[1]}.<br><br>Now, please input '1' or '2'`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return `Player ${currentPlayer}, your chosen value is : ${playerScore}`;
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return `Player ${currentPlayer}, your chosen value is : ${playerScore}`;
  }
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1 score: ${allPlayersScore[0]}<br>Player 2 score: ${allPlayersScore[1]}`;
  if (allPlayersScore[0] > allPlayersScore[1]) {
    playerWins[0]++;
    compareMessage = compareMessage + `<br><br>Player 1 wins!`;
  }
  if (allPlayersScore[0] < allPlayersScore[1]) {
    playerWins[1]++;
    compareMessage = compareMessage + `<br><br>Player 2 wins!`;
  }
  if (allPlayersScore[0] == allPlayersScore[1]) {
    playerWins[2]++;
    compareMessage = compareMessage + `<br><br>It's a draw!`;
  }
  return compareMessage + "<br><br>" + displayLeaderboard();
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var displayLeaderboard = function () {
  return `Leaderboard:<br>Player 1: ${playerWins[0]} wins<br>Player 2: ${playerWins[1]} wins<br>Ties: ${playerWins[2]}`;
};

var main = function (input) {
  console.log(`Current Player = ${currentPlayer}`);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("game state changed to dice roll");
    outputMessage = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Game state change to choosing dice order");
    if (input != "1" && input != "2") {
      return `Error! Please enter only '1' or '2' to choose your order.<br>Your dice rolls are<br>Dice 1: ${currentPlayerRolls[0]}| Dice 2: ${currentPlayerRolls[1]}.`;
    }
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log(`End of P1 turn, P2 turn now`);
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + `<br><br>It is now player 2's turn`;
    }
    if (currentPlayer == 2) {
      console.log(`End of P2 turn. Submit will now calculate scores`);
      gameState = GAME_STATE_CHOOSE_COMPARE_SCORES;
      return outputMessage + `<br><br>Press submit to calculate scores!`;
    }
  }
  if (gameState == GAME_STATE_CHOOSE_COMPARE_SCORES) {
    console.log(`Game mode is comparing scores now `);
    outputMessage = comparePlayersScores();
    resetGame();
    return outputMessage;
  }
};
