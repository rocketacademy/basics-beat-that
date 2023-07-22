// /* How to play the game.

// 1. 2 players game. Players take turn.
// 2. Player clicks submit, the game roll 2 dice and shows the dice roll - 3 and 6.
// 3. Player picks the order of the dice they want to form the biggest number. Eg. make number 63. Dice 2 number appears first.
// 4. After both players have rolled and chose dice order, the player with the higher number wins.

// Ideas on how to solve
// 1. Rolls 2 dice and return the output for player 1.
// 2. Player 1 chooses the dice order and forms the number. Get correct return output value.
// 3. Add in player 2.
// 4. Implement comparing dice scores and declare winner
// 5. Reset the game so that the players can play again without refreshing the browser page.
// */

//Create Game State: 1. Roll 2 dice. and 2. Choose Dice Order
// Create Game Modes: 1. Roll 2 dice and 2. Choose Dice Order
var GAME_MODE_ROLL_DICE = "Game mode: Roll 2 dices.";
var GAME_MODE_CHOOSE_DICE_ORDER = "Game mode: Choose dice order.";
var GAME_MODE_COMPARE_PLAYERS_SCORES =
  "Game mode: Compare all players' scores.";
var currentGameMode = GAME_MODE_ROLL_DICE;

// Player state
var currentPlayer = 1;
var totalPlayers = 2;

//Store scores of both players.
var playerScoreTotal = [];

//restart game
var restartGame = function () {
  currentPlayer = 1;
  currentGameMode = GAME_MODE_ROLL_DICE;
  playerScoreTotal = [];
};

// Helper Function - Roll Dice
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var randomDiceNumber = randomInteger + 1;
  // Convert number to string.
  var convertRandomDiceNumberToString = randomDiceNumber.toString();
  console.log("dice number: ", convertRandomDiceNumberToString);
  return convertRandomDiceNumberToString;
};

// Store dice values in array.
var currentPlayerRolls = [];

// Helper Function - Roll 2 dices
var rollTwoDices = function () {
  var counter = 0;
  var chooseOrderText =
    "Please choose the order of the dice by entering 1 or 2.";
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return (
    "Hi Player " +
    currentPlayer +
    ". Your rolls are Dice 1: " +
    currentPlayerRolls[0] +
    " and Dice 2: " +
    currentPlayerRolls[1] +
    "." +
    "<br><br>" +
    chooseOrderText
  );
};

//Helper function - when input is not one or two.
var inputNumber = function (input) {
  //verifies if input is 1 or 2
  if ((input !== 1) & (input !== 2)) {
    return `It looks like you didn't enter 1 or 2. Please select either dice 1 or 2.`;
  }
};

// Helper function - allow user to arrange dice number, to show final number.
var showPlayerDiceNumber = function (playerInput) {
  var showPlayerChosenNumber;
  var convertInputToNumber = Number(playerInput);
  if (convertInputToNumber === 2) {
    showPlayerChosenNumber = Number(
      currentPlayerRolls[1] + currentPlayerRolls[0]
    );
  }
  // Arrange dice number based on user input.
  if (convertInputToNumber === 1) {
    //Convert to number. To compare number "value" between players.
    showPlayerChosenNumber = Number(
      currentPlayerRolls[0] + currentPlayerRolls[1]
    );
    //if input is not 1 or 2.
  } else {
    return inputNumber(playerInput);
  }
  //score player's preferred sequence into score
  playerScoreTotal.push(showPlayerChosenNumber);
  //clear dice value array for next player
  currentPlayerRolls = [];
  return (
    "Hi Player " +
    currentPlayer +
    "! Your number is: " +
    showPlayerChosenNumber +
    "."
  );
};

var comparePlayersScores = function () {
  compareScoresGameMessage =
    "Player 1 score: " +
    playerScoreTotal[0] +
    ". Player 2 score: " +
    playerScoreTotal[1] +
    ".";

  //player 1 wins
  if (playerScoreTotal[0] > playerScoreTotal[1]) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> Player 1 wins!";
  }

  //player 2 wins
  if (playerScoreTotal[1] > playerScoreTotal[0]) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> Player 2 wins!";
  }

  //tie
  if (playerScoreTotal[1] === playerScoreTotal[0]) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> It's a tie!";
  }
  return compareScoresGameMessage;
};

// Check Game Mode. Start Game with Dice Roll.
var main = function (input) {
  console.log("Who is playing: ", currentPlayer);
  var outputGameMessage = "";
  // var gamemodeSequence;
  if (currentGameMode === GAME_MODE_ROLL_DICE) {
    console.log(GAME_MODE_ROLL_DICE);
    //user keys info in input, do not allow user to submit.
    if (input !== "") {
      return "Please roll the dice by clicking the Submit button.";
    } else {
      currentGameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    }
    return (outputGameMessage = rollTwoDices());
  }
  if (currentGameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    console.log(GAME_MODE_CHOOSE_DICE_ORDER);

    //Call  showPlayerDiceNumber
    outputGameMessage = showPlayerDiceNumber(input);

    // Player state: player 1
    if (currentPlayer === 1) {
      currentPlayer += 1;
      currentGameMode = GAME_MODE_ROLL_DICE;
      return (
        outputGameMessage +
        "<br><br> It is now Player " +
        currentPlayer +
        "'s turn. Click submit to roll the dices."
      );
    }
    //if Player reaches Player 2.
    if ((currentPlayer = totalPlayers)) {
      currentGameMode = GAME_MODE_COMPARE_PLAYERS_SCORES;
      console.log(GAME_MODE_COMPARE_PLAYERS_SCORES);
      console.log("players score", playerScoreTotal);
      return outputGameMessage + "<br><BR> Submit to calculate totoal scores.";
    }
  }
  if ((currentGameMode = GAME_MODE_COMPARE_PLAYERS_SCORES)) {
    console.log(GAME_MODE_COMPARE_PLAYERS_SCORES);
    outputGameMessage = comparePlayersScores();
    //reset game,
    restartGame();
    return outputGameMessage;
  }
};
