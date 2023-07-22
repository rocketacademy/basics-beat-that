//Create Game Mode: 1. Roll 2 dice. and 2. Choose Dice Order
var GAME_MODE_ROLL_DICE = "Game mode: Roll 2 dices.";
var GAME_MODE_CHOOSE_DICE_ORDER = "Game mode: Choose dice order.";
var GAME_MODE_COMPARE_PLAYERS_SCORES =
  "Game mode: Compare all players' scores.";
var currentGameMode = GAME_MODE_ROLL_DICE;

// Player state
var currentPlayer = 1;
var totalPlayers = 3;
var Player1 = "Player 1 ";
var Player2 = "Player 2 ";
var Player3 = "Player 3 ";

//Game Text
var gameText_ChooseOrderText =
  "Please choose the order of the dice by entering 1 or 2.";
var gameText_SubmitToRollDices = "Click submit to roll the dices.";

//Store scores of both players.
var playerScoreTotal = [];

//Restart game
var restartGame = function () {
  currentPlayer = 1;
  currentGameMode = GAME_MODE_ROLL_DICE;
  playerScoreTotal = [];
};

// Roll Dice
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

// Roll 2 dices
var rollTwoDices = function () {
  var counter = 0;
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
    gameText_ChooseOrderText
  );
};

//Input validation - if input number is not 1 or 2.
var inputNumber = function (input) {
  if (input !== 1 || input !== 2) {
    return gameText_ChooseOrderText;
  }
};

//Combined dice roll number: Player decide which dice number to go first.
var combineDiceNumber = function (playerChoice) {
  if (playerChoice == 1) {
    return Number(currentPlayerRolls[0] + currentPlayerRolls[1]);
  } else return Number(currentPlayerRolls[1] + currentPlayerRolls[0]);
};

//Compare players' dice value.
var ComparePlayersScores = function () {
  //pull out the highest number from the playscore array
  var winningNumber = Math.max(...playerScoreTotal);
  compareScoresGameMessage =
    Player1 +
    " Number: " +
    playerScoreTotal[0] +
    ". " +
    Player2 +
    " Number: " +
    playerScoreTotal[1] +
    ". " +
    Player3 +
    " Number: " +
    playerScoreTotal[2] +
    //What is the biggest number?
    ". <br><BR> The winner with number '" +
    winningNumber +
    "' wins! 🥳";

  //player 1 wins
  if (playerScoreTotal[0] === winningNumber) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> " + Player1 + "wins! 🥳";
  }

  //player 2 wins
  if (playerScoreTotal[1] === winningNumber) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> " + Player2 + "wins! 🥳";
  }

  //player 3 wins
  if (playerScoreTotal[2] === winningNumber) {
    compareScoresGameMessage =
      compareScoresGameMessage + "<br><BR> " + Player3 + "wins! 🥳";
  }

  return compareScoresGameMessage;
};

// Check Game Mode. Start Game with Dice Roll.
var main = function (input) {
  console.log("Who is playing: ", currentPlayer);
  var outputGameMessage = "";
  // Game starts from scratch.
  if (currentGameMode === GAME_MODE_ROLL_DICE) {
    console.log(GAME_MODE_ROLL_DICE);
    //Players keys info in input, do not allow player to start game.
    if (input !== "") {
      return gameText_SubmitToRollDices;
    } else {
      currentGameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    }
    return (outputGameMessage = rollTwoDices());
  }

  // After player X roll dice.

  if (currentGameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    console.log(GAME_MODE_CHOOSE_DICE_ORDER);

    if (input == 1 || input == 2) {
      playerScoreTotal.push(combineDiceNumber(input));
      console.log("player combined numbers", playerScoreTotal);
      //clear dice value array for next player
      currentPlayerRolls = [];
      outputGameMessage =
        "Hi Player " +
        currentPlayer +
        "! Your number is: " +
        playerScoreTotal[currentPlayer - 1];
      (".");
    } else {
      return inputNumber(input);
    }

    // Player state: player X
    if (currentPlayer < totalPlayers) {
      currentPlayer += 1;
      currentGameMode = GAME_MODE_ROLL_DICE;
      return (
        outputGameMessage +
        "<br><br> It is now Player " +
        currentPlayer +
        "'s turn. " +
        gameText_SubmitToRollDices
      );
    }
    //if Player reaches Player 2 or 3.
    if (currentPlayer === totalPlayers) {
      currentGameMode = GAME_MODE_COMPARE_PLAYERS_SCORES;
      console.log(GAME_MODE_COMPARE_PLAYERS_SCORES);
      console.log("players score", playerScoreTotal);
      return (
        outputGameMessage + "<br><BR> Click submit to see who is the winner!"
      );
    }
  }
  if ((currentGameMode = GAME_MODE_COMPARE_PLAYERS_SCORES)) {
    console.log(GAME_MODE_COMPARE_PLAYERS_SCORES);
    outputGameMessage = ComparePlayersScores();
    //reset game,
    restartGame();
    return outputGameMessage;
  }
};
