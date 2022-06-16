var GAME_STATE_DICE_ROLL = "DICE ROLL";
var GAME_STATE_CHOOSE_DICE = "CHOOSE DICE";
var GAME_STATE_COMPARE_SCORE = "COMPARE SCORE";
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayerRolls = [];
var currentplayer = 1;
var allPlayersScore = [];
var player1Score = [];
var player2Score = [];

var defaultOutput = document.querySelector("#output-div");
defaultOutput.innerHTML = `Welcome to Beat That! <br>
 Click submit to start rolling the dice!`;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var rollDiceTwice = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return `Welcome Player ${currentplayer} <br>
     You rolled ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2 <br>
     Choose the order of the dice by inputting 1 or 2`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // To choose first dice as the first number
  if (playerInput == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  // To choose 2nd dice as the first number
  if (playerInput == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  if (currentplayer == 1) {
    player1Score.push(playerScore);
  } else {
    player2Score.push(playerScore);
  }
  currentPlayerRolls = [];
  return `Player ${currentplayer}, you chose Dice ${playerInput} first <br>
  Your number is ${playerScore}.`;
};

var comparePlayerScores = function () {
  var compareMessage = `Player 1 score : ${allPlayersScore[0]} <br>
   Player 2 score : ${allPlayersScore[1]}`;

  //  player 1 score higher than player 2
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> Player 1 wins!";
  }
  //  player 1 score lower than player 2
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> Player 2 wins!";
  }
  //  player 1 tie with player 2
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> It's a tie!";
  }
  return compareMessage + " Click submit to play again!";
};

var leaderBoard = function () {
  counter1 = 0;
  counter2 = 0;
  var player1TotalScore = 0;
  var player2TotalScore = 0;
  while (counter1 < player1Score.length) {
    player1TotalScore = player1Score[counter1] + player1TotalScore;
    counter1 += 1;
  }
  while (counter2 < player2Score.length) {
    player2TotalScore = player2Score[counter2] + player2TotalScore;
    counter2 += 1;
  }
  var leaderBoardMessage = `The current score stands at <br>
  Player 1 score : ${player1TotalScore} <br>
  Player 2 score : ${player2TotalScore} <br>`;
  if (player1TotalScore > player2TotalScore) {
    leaderBoardMessage = leaderBoardMessage + "Player 1 is currently ahead!";
  }
  if (player1TotalScore < player2TotalScore) {
    leaderBoardMessage = leaderBoardMessage + "Player 2 is currently ahead!";
  }
  if (player1TotalScore == player2TotalScore) {
    leaderBoardMessage =
      leaderBoardMessage + "Player 1 and Player 2 is currently tied!";
  }
};

var resetGame = function () {
  currentplayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};
var main = function (input) {
  var myOutputValue = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    myOutputValue = rollDiceTwice();
    gameState = GAME_STATE_CHOOSE_DICE;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE) {
    myOutputValue = getPlayerScore(input);

    if (currentplayer == 1) {
      currentplayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return (
        myOutputValue +
        "<br> It is now Player 2's turn. <br> Click submit to roll the dice!"
      );
    }
    if (currentplayer == 2) {
      gameState = GAME_STATE_COMPARE_SCORE;

      return myOutputValue + "<br> Press submit to calculate scores!";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORE) {
    myOutputValue = comparePlayerScores() + "<br>" + leaderBoard();

    resetGame();

    return myOutputValue;
  }
};
