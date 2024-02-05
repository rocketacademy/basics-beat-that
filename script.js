// Global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var INSTRUCTIONS_FOR_NEXT_GAME_STATE = `Please choose the order of the dice by inputting 1 or 2`;

var MODE_SELECTION_INSTRUCTIONS = `please choose a mode to play:<br><br>${regularMode} or ${lowestMode}`;

var currentPlayerRolls = [];

var player1ScoreCounter = 0;
var player2ScoreCounter = 0;

var currentPlayer = 1;
var allPlayersScore = [];

var mode = "";
var regularMode = "regular";
var lowestMode = "lowest";

// Helper Function
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  for (var counter = 0; counter < 2; counter += 1) {
    currentPlayerRolls.push(diceRoll());
  }
  return `Player ${currentPlayer}, your rolls are ${currentPlayerRolls[0]} and ${currentPlayerRolls[1]}<br><br>${INSTRUCTIONS_FOR_NEXT_GAME_STATE}`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  //playerInput validation
  if (playerInput != 1 && playerInput != 2) {
    return `Error! ${INSTRUCTIONS_FOR_NEXT_GAME_STATE}<br><br> Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}`;
  }
  //playerInput == 1
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  //playerInput == 2
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  // Store playerScore in array
  allPlayersScore.push(playerScore);

  //clear current player rolls array
  currentPlayerRolls = [];

  return `Player ${currentPlayer}, your chosen value is: ${playerScore}`;
};

var comparePlayersScoresLowMode = function () {
  compareMessage = `Player 1 value: ${allPlayersScore[0]}<br>Player 2 value: ${allPlayersScore[1]}`;
  // player 1 wins
  if (allPlayersScore[0] < allPlayersScore[1]) {
    player1ScoreCounter = player1ScoreCounter + 1;
    compareMessage = `${compareMessage}<br><br>Player 1 wins!`;
  }
  //player 2 wins
  if (allPlayersScore[1] < allPlayersScore[0]) {
    player2ScoreCounter = player2ScoreCounter + 1;
    compareMessage = `${compareMessage}<br><br>Player 2 wins!`;
  }
  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = `${compareMessage}<br><br>It's a tie!`;
  }
  return compareMessage;
};

var comparePlayersScores = function () {
  compareMessage = `Player 1 value: ${allPlayersScore[0]}<br>Player 2 value: ${allPlayersScore[1]}`;
  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    player1ScoreCounter = player1ScoreCounter + 1;
    compareMessage = `${compareMessage}<br><br>Player 1 wins!`;
  }
  //player 2 wins
  if (allPlayersScore[1] > allPlayersScore[0]) {
    player2ScoreCounter = player2ScoreCounter + 1;
    compareMessage = `${compareMessage}<br><br>Player 2 wins!`;
  }
  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = `${compareMessage}<br><br>It's a tie!`;
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var regularBeatThat = function (input) {
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    // Display Dice rolled as output message
    outputMessage = rollDiceForPlayer();
    // Change the gamestate
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    //Call playerScore Function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${outputMessage}<br><br> It is now player 2's turn!`;
    }
    if (currentPlayer == 2) {
      gameState = GAME_STATE_COMPARE_SCORES;

      return `${outputMessage}<br><br> Press submit to calculate scores!`;
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    outputMessage = comparePlayersScores();

    resetGame();

    return `${outputMessage}<br><br>Current scores<br><br> Player 1: ${player1ScoreCounter} | Player 2: ${player2ScoreCounter}`;
  }
};

var lowModeBeatThat = function (input) {
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    // Display Dice rolled as output message
    outputMessage = rollDiceForPlayer();
    // Change the gamestate
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    //Call playerScore Function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `${outputMessage}<br><br> It is now player 2's turn!`;
    }
    if (currentPlayer == 2) {
      gameState = GAME_STATE_COMPARE_SCORES;

      return `${outputMessage}<br><br> Press submit to calculate scores!`;
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    outputMessage = comparePlayersScoresLowMode();

    resetGame();

    return `${outputMessage}<br><br>Current scores<br><br> Player 1: ${player1ScoreCounter} | Player 2: ${player2ScoreCounter}`;
  }
};

var checkModeInput = function (userInput) {
  return userInput == regularMode || userInput == lowestMode;
};

var getGameInstructions = function () {
  if (mode == lowestMode) {
    return `You have chosen lowest mode! <br><br>The player with the lowest value wins!`;
  }
  return `You have chosen regular mode! <br><br>The player with the highest value wins!`;
};

var main = function (input) {
  if (!mode) {
    if (!input) {
      return MODE_SELECTION_INSTRUCTIONS;
    }
    var modeInputIsValid = checkModeInput(input);
    if (!modeInputIsValid) {
      return MODE_SELECTION_INSTRUCTIONS;
    }
    mode = input;
    var GameInstructions = getGameInstructions();
    return GameInstructions;
  } else if (mode == regularMode) {
    myOutputValue = regularBeatThat(input);
    return myOutputValue;
  } else if (mode == lowestMode) {
    myOutputValue = lowModeBeatThat(input);
    return myOutputValue;
  }
};
