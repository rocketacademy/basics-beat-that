var GAME_STATE_DICE_ROLL = "DICE ROLL";
var GAME_STATE_CHOOSE_DICE = "CHOOSE DICE";
var GAME_STATE_COMPARE_SCORE = "COMPARE SCORE";
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayerRolls = [];
var currentplayer = 1;
var allPlayersScore = [];
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
  if (playerInput == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (playerInput == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayersScore.push(playerScore);
  currentPlayerRolls = [];
  return `Player ${currentplayer}, you chose Dice ${playerInput} first <br>
  Your number is ${playerScore}.`;
};

var comparePlayerScores = function () {
  var compareMessage = `Player 1 score : ${allPlayersScore[0]} <br>
   Player 2 score : ${allPlayersScore[1]}`;

  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> Player 1 wins!";
  }
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> Player 2 wins!";
  }
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br> It's a tie!";
  }
  return compareMessage;
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
      return myOutputValue + "<br> It is now Player 2's turn.";
    }
    if (currentplayer == 2) {
      gameState = GAME_STATE_COMPARE_SCORE;

      return myOutputValue + "<br> Press submit to calculate scores!";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORE) {
    myOutputValue = comparePlayerScores();

    resetGame();

    return myOutputValue;
  }
};
