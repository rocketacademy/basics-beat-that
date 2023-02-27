var GAME_STATE_DICE_ROLL = "diceRoll";
var GAME_STATE_CHOOSE_DICE = "chooseDice";
var GAME_STATE_COMPARE_SCORE = "compareScores";
var currentmode = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  console.log(rollDice);
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
    var diceRollOutput = `Welcome player ${currentPlayer}. <br><br> You rolled... <br><br> Dice 1: ${currentPlayerRolls[0]} <br><br> Dice 2: ${currentPlayerRolls[1]}  <br><br> Input '1' or '2' to choose the order of the dice as the first digit of your final value.`;
  }
  return diceRollOutput;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    var outputWrongInput = `Error! please input '1' or '2' to choose which dice to use as the first digit. <br><br> Your dice rolls are ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2. `;
    return outputWrongInput;
  }
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
  var outputChosenValueAllPlayers = `Hi Player ${currentPlayer}! <br><br> Your chosen value: ${playerScore}`;
  return outputChosenValueAllPlayers;
};

var comparePlayersScores = function () {
  var outputAllPlayerScore = `Player 1 score: ${allPlayersScore[0]} <br><br> Player 2 score: ${allPlayersScore[1]}`;

  // if player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    var outputPlayer1Wins = `${outputAllPlayerScore} <br><br>Player 1 wins!`;
    return outputPlayer1Wins;
  }
  // if player 2 wins
  if (allPlayersScore[1] > allPlayersScore[0]) {
    var outputPlayer2Wins = `${outputAllPlayerScore} <br><br>Player 2 wins!`;
    return outputPlayer2Wins;
  }
  // if its a draw

  if ((allPlayersScore[1] = allPlayersScore[0])) {
    var outputPlayerDraw = `${outputAllPlayerScore} <br><br>It's a tie!`;
    return outputPlayerDraw;
  }
};

var resetGame = function () {
  currentPlayer = 1;
  currentmode = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
  console.log(allPlayersScore);
};

var main = function (input) {
  var outputValue = "";
  if (currentmode == GAME_STATE_DICE_ROLL) {
    var outputValue = rollDiceForPlayer();
    currentmode = GAME_STATE_CHOOSE_DICE;
    return outputValue;
  }

  if (currentmode == GAME_STATE_CHOOSE_DICE) {
    var outputValue2 = getPlayerScore(input);
    console.log(GAME_STATE_CHOOSE_DICE);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      currentmode = GAME_STATE_DICE_ROLL;
      var outputMessage2 = outputValue2 + `<br><br> It's now player 2's turn.`;
      console.log("current player: 2");

      return outputMessage2;
    }
    if (currentPlayer == 2) {
      currentmode = GAME_STATE_COMPARE_SCORE;
      var outputMessage3 =
        outputValue2 + `<br><br>Hit 'Submit' to calculate scores.`;
      return outputMessage3;
    }
  }

  if (currentmode == GAME_STATE_COMPARE_SCORE) {
    console.log(currentmode == GAME_STATE_COMPARE_SCORE);
    var outputMessage4 = comparePlayersScores();
    resetGame();
    return outputMessage4;
  }
};
