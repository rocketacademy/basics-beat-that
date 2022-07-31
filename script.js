var currentPlayerRolls = [];
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var GAME_STATE_COMPARE_SCORES = `GAME_STATE_COMPARE_SCORES`;
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayer = 1;
var allPlayersScore = [];

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(`dice roll ${diceNumber}`);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log(`Start of rollDiceForPlayer()`);
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(diceRoll());
    counter += 1;
  }
  console.log(
    `rollDiceForPlayer changes, currentPlayerRolls: ${currentPlayerRolls}`
  );
  return `You rolled ${currentPlayerRolls[0]} and ${currentPlayerRolls[1]}.<br>Please input 1 or 2 to pick roll 1 or roll 2 respectively as the first digit of your final result.`;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1's score: ${allPlayersScore[0]}, player 2's score: ${allPlayersScore[1]}.`;
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage += `Player 1 wins.`;
  }
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage += `Player 2 wins.`;
  }
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage += `Tie.`;
  }
  return compareMessage;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Please input 1 or 2 to choose either dice 1 or dice 2 as your first digit. Your rolls are: ${currentPlayerRolls[0]} and ${currentPlayerRolls[1]}.`;
  }
  if (playerInput == 1) {
    console.log(`player chose 1`);
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return `Your chosen result is ${playerScore}`;
  }
  if (playerInput == 2) {
    console.log(`player chose 2`);
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];

    return `Your chosen result is ${playerScore}`;
  }
};

var main = function (input) {
  console.log(`Game state on submit: ${gameState}`);
  console.log(`Current player: ${currentPlayer}`);
  var myOutputMessage = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log(`gameState == GAME_STATE_DICE_ROLL`);
    myOutputMessage = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log(`game state: GAME_STATE_CHOOSE_DICE_ORDER`);
    return myOutputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`gamestate == GAME_STATE_CHOOSE_DICE_ORDER`);
    myOutputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log(`player 2's turn`);
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${myOutputMessage}.<br><br> It's now player 2's turn.`;
    }
    if (currentPlayer == 2) {
      console.log(`end of player 2's turn, now comparing scores`);
      gameState = GAME_STATE_COMPARE_SCORES;
      return `${myOutputMessage} <br><br> Press submit to calculate scores.`;
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log(`gameState == GAME_STATE_COMPARE_SCORES`);
    myOutputMessage = comparePlayersScores();

    resetGame();
    console.log(`Current player after reset: ${currentPlayer}`);
    console.log(`Current state after reset: ${gameState}`);
    console.log(`Current allPlayersScore after reset: ${allPlayersScore}`);

    return myOutputMessage;
  }
};
