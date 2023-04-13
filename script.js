//set gameState to gameStateRollDice
//Players rolls 2 dice - gameStateRollDice
//Players chooses dice orientation -gameStateChooseDice
//Prompt to choose between 1 & 2, will show error msg if input is not 1 or 2
//Add dice number as string(to not add number) then convert to numerals using Number()
//Compare combined numbers accross all players and higher combined number wins
// Add score to winner
// Press submit button to roll dice (set gameState to gameStateRollDice)

var gameStateRollDice = "gamestate is roll dice";
var gameStateChooseDice = "game state is choose dice";
var gameStateCompareScore = "game state is comparing Scores";
var gameState = gameStateRollDice;

var currentPlayerDiceNumber = [];

var currentPlayer = 1;
var scoreBoard = [];

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = Math.floor(randomDecimal) + 1;
  console.log("dicenumber = " + diceNumber);
  return diceNumber;
};

// rolls 2 dice for each player
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerDiceNumber.push(rollDice()); //using roll to generate numbers, using push() to add the numbers to currentPlayerDiceNumber string created
    counter += 1;
  }
  console.log("Current player dice numbers are: " + currentPlayerDiceNumber);
  return (
    "Player " +
    currentPlayer +
    ",<br>Dice 1 = " +
    currentPlayerDiceNumber[0] +
    "<br>Dice 2 = " +
    currentPlayerDiceNumber[1] +
    "<br> Please input 1 (Dice1) or 2 (Dice2) to pick the dice result as the first digit"
  );
};

//input validation, combine score, and scoreboard
var playerScoreCounter = function (playerInput) {
  var playerScore = "";
  if (playerInput != 1 && playerInput != 2) {
    console.log("error input");
    return (
      "Please enter 1 or 2 only. <br> Your dice rolls are: " +
      currentPlayerDiceNumber[0] +
      " & " +
      currentPlayerDiceNumber[1]
    );
  }
  if (playerInput == 1) {
    console.log("input 1");
    var playerScore = Number(
      String(currentPlayerDiceNumber[0]) + String(currentPlayerDiceNumber[1])
    );
    scoreBoard.push(playerScore);
    currentPlayerDiceNumber = [];
    console.log(scoreBoard);
    console.log(currentPlayerDiceNumber);
    console.log("currentplayer1score : " + playerScore);
    return "Your score is: " + playerScore;
  }
  if (playerInput == 2) {
    console.log("input 2");
    var playerScore = Number(
      String(currentPlayerDiceNumber[1]) + String(currentPlayerDiceNumber[0])
    );
    scoreBoard.push(playerScore);
    currentPlayerDiceNumber = [];
    console.log(scoreBoard);
    console.log(currentPlayerDiceNumber);
    console.log("currentplayer2score: " + playerScore);
    return "Your score is: " + playerScore;
  }
};

var comparePlayerScore = function () {
  var compareMessage =
    "Player 1 score: " + scoreBoard[0] + "<br>Player 2 score: " + scoreBoard[1];
  if (scoreBoard[0] == scoreBoard[1]) {
    compareMessage = compareMessage + "<br> It is a tie.";
  }
  if (scoreBoard[0] > scoreBoard[1]) {
    compareMessage = compareMessage + "<br> Player 1 wins";
  }
  if (scoreBoard[0] < scoreBoard[1]) {
    compareMessage = compareMessage + "<br> Player 2 wins.";
  }
  console.log(scoreBoard[0]);
  console.log(scoreBoard[1]);
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = gameStateRollDice;
  scoreBoard = [];
};

var main = function (input) {
  console.log("Current gamestate: " + gameState);
  console.log("Current player is: " + currentPlayer);
  if (gameState == gameStateRollDice) {
    gameState = gameStateChooseDice;
  }
  console.log(rollDiceForPlayer());
  console.log(gameState);

  if (gameState == gameStateChooseDice) {
    myOutputMessage = playerScoreCounter(input);
    if (currentPlayer == 1) {
      console.log("end of player 1 turn");
      currentPlayer = 2;
      gameState = gameStateRollDice;
      return (
        myOutputMessage +
        "<br> Now is Player 2's turn. <br>Please enter 1 or 2 to choose corresponding dice"
      );
    }
    if (currentPlayer == 2) {
      console.log("End of Player 2's turn. Calculating scores");
      gameState = gameStateCompareScore;
      return myOutputMessage + "<br>Click submit to calculate score.";
    }
  }
  if (gameState == gameStateCompareScore) {
    console.log("current gamestate: compareScore");
    myOutputMessage = comparePlayerScore();

    resetGame();
    console.log("current player after reset: " + currentPlayer);
    console.log("current gamestate after reset: " + gameState);
    console.log("playerscore array: " + scoreBoard);
    return myOutputMessage;
  }
};

//issues:
//each submit generates 2 dice rolls
//reset doesnt make a clean slate
//error input does not stop process to validate input
