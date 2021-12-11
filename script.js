//Global variables
var playerOne = 0;
var playerTwo = 0;
var player1Turn = true;
var player2Turn = false;
var diceOne = 0;
var diceTwo = 0;
var GAME_STATUS = "START_GAME";
var gameMode = "";
var winningPlayer = "";

//This function generates random dice roll
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

//This function generate current score for current player
var getScore = function (input) {
  var score = 0;

  console.log(diceOne);
  console.log(diceTwo);

  if (input == "1") {
    score = diceOne.toString() + diceTwo.toString();
  } else if (input == "2") {
    score = diceTwo.toString() + diceOne.toString();
  }
  console.log(score);
  return score;
};

//This function rolled 2 dice and ask user to enter option 1 or 2
var getCurrentRoll = function () {
  diceOne = rollDice();
  diceTwo = rollDice();

  var msg =
    "You have rolled: " +
    diceOne +
    " and " +
    diceTwo +
    "<br> Please choose option 1 or 2.";

  GAME_STATUS = "ASK_OPTION";
  return msg;
};

var checkWinningPlayer = function (gameMode) {
  if (gameMode == "HIGH") {
    if (playerOne > playerTwo) {
      winningPlayer = "Player 1";
    }
    if (playerTwo > playerOne) {
      winningPlayer = "Player 2";
    }
  }

  if (gameMode == "LOW") {
    if (playerOne < playerTwo) {
      winningPlayer = "Player 1";
    }
    if (playerTwo < playerOne) {
      winningPlayer = "Player 2";
    }
  }
  return winningPlayer;
};

var main = function (input) {
  var currentScore = 0;

  //Ask user to chose game mode between highest combined number or lowest combine number
  if (GAME_STATUS == "START_GAME") {
    var startMsg =
      "Let's start by choosing which game mode you want to play. <br> Please input 'HIGH' for highest combined number of dice roll or 'LOW' for lowest combined number of dice roll.";
    GAME_STATUS = "CHOOSE_MODE";
    return startMsg;
  }

  //save user input for the game mode only if game status is at the start of the game
  if (GAME_STATUS == "CHOOSE_MODE") {
    console.log(input);
    if (input.toUpperCase() == "HIGH") {
      gameMode = "HIGH";
      console.log(gameMode);
    }
    if (input.toUpperCase() == "LOW") {
      gameMode = "LOW";
      console.log(gameMode);
    } else if (input.toUpperCase() != "HIGH" && input.toUpperCase != "LOW") {
      var invalid =
        "You have entered invalid choice for game mode. Please input either HIGH or LOW. Click Roll Dice to re-start the game";
      GAME_STATUS = "START_GAME";
      return invalid;
    }
    console.log(gameMode);

    //Initialise dice rolling
    GAME_STATUS = "ROLL_DICE";
  }

  //Starts with player 1 turn, roll dice then ask user to input option
  //At the end of player1 turn, it becomes player2 turn
  if (player1Turn) {
    if (GAME_STATUS == "ROLL_DICE") {
      return getCurrentRoll();
    }

    if (GAME_STATUS == "ASK_OPTION") {
      currentScore = Number(getScore(input));
      GAME_STATUS = "ROLL_DICE";
      playerOne = playerOne + currentScore;
      console.log(playerOne);
      player1Turn = false;
      player2Turn = true;
      return (
        "Player 1 current roll: " +
        currentScore +
        "<br> Player 2 now it is your turn."
      );
    }
  }
  //On player2 turn, roll dice then ask user to input option
  //At the end of player2 turn it becomes player1 turn again
  //when user click submit/roll button, the total running score for each player is shown
  if (player2Turn) {
    if (GAME_STATUS == "ROLL_DICE") {
      return getCurrentRoll();
    }
    if (GAME_STATUS == "ASK_OPTION") {
      currentScore = Number(getScore(input));
      GAME_STATUS = "END_ROUND";
      playerTwo = playerTwo + currentScore;
      console.log(playerTwo);
      console.log(gameMode);
      player2Turn = false;
      player1Turn = true;
      return (
        "Player 2 current roll: " +
        currentScore +
        "<br> Click to see who is winning"
      );
    }
  }

  //Show leaderboard status between player 1 and player 2
  if (GAME_STATUS == "END_ROUND") {
    //Conditions to see who is winning
    var whoWins = checkWinningPlayer(gameMode);
    console.log(gameMode);
    console.log(winningPlayer);

    var myOutputValue =
      "Player 1 total score: " +
      playerOne +
      "<br> Player 2 total score: " +
      playerTwo +
      "<br> Congratulations! " +
      whoWins +
      " wins! 🏆";

    //If it's a draw
    if (playerOne == playerTwo) {
      myOutputValue =
        "Player 1 total score: " +
        playerOne +
        " <br> Player 2 total score: " +
        playerTwo +
        "<br> It's a draw! 🎲";
    }
    GAME_STATUS = "ROLL_DICE";
  }

  return myOutputValue;
};
