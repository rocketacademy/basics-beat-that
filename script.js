var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER ";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES ";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// HELPER FUNCTION
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal) + 1;
  console.log("CrollDice output, randomInterger,", randomInterger);
  return randomInterger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");

  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  console.log(
    `rollDiceForPlayer changes, currentPlayerRolls`,
    currentPlayerRolls
  );
  return `Welcome ${currentPlayer}<br><br>You rolled:<br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.<br><br>Now, select '1' or '2' to choose the corresponding dice to be used as the first digit of your final value`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: gameState = GAME_STATE_CHOOSE_DICE_ORDER");
    return `ERROR! Please only input '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.<br><br> You rolled <br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}`;
  }

  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    playerScore =
      Number(String(currentPlayerRolls[0])) + String(currentPlayerRolls[1]);

    return `Your chosen value is: ${playerScore}`;
  }

  if (playerInput == 2) {
    console.log("Control flow: input == 2");

    playerScore =
      Number(String(currentPlayerRolls[1])) + String(currentPlayerRolls[0]);
  }

  allPlayerScore.push(playerScore);
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is: ${playerScore}`;
};

var comparePlayerScores = function () {
  var compareMessage = `Player 1 score: ${allPlayerScore[0]} <br> Player 2 score: ${allPlayerScore[1]} `;
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = `${compareMessage} <br> Player 1 wins!`;
  }

  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = `${compareMessage} <br> Player 2 wins!`;
  }
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = `${compareMessage} <br> It's a tie!`;
  }
  return compareMessage;
};

var main = function (input) {
  console.log(`Checking game state on submit click: ${gameState}`);
  console.log(`Checking currentPlayer on submit click: ${currentPlayer}`);
  var myOutputValue = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState = GAME_STATE_DICE_ROLL");

    myOutputValue = rollDiceForPlayer();

    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: input validation for input not 1 and 2");
    myOutputValue = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log(`Control flow: end of player 1, now player 2`);
      currentPlayer = 2;
      gameState = gameState = GAME_STATE_DICE_ROLL;
      return myOutputValue + `<br><br> It is now player 2's turn`;
    }
    if (currentPlayer == 2) {
      console.log(
        `Control flow: end of player 2, Next submit click will calculate score`
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return myOutputValue + "<br><br>Press submit to calculate scores!";
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log(`Control flow: comparing scores`);
    myOutputValue = comparePlayerScores();
    return myOutputValue;
  }
};
