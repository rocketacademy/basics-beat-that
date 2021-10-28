var diceRollMode = `Roll Dice Mode`;
var diceSelectMode = `Dice Selection Mode`;
var winnerMode = `Determine Winner Mode`;
var gameMode = diceRollMode;

var currPlayer = 1;

var diceRoll = [];

var player1Num;
var player2Num;
var player1Score = 0;
var player2Score = 0;

var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var getDiceRoll = function () {
  diceRoll = [rollDice(), rollDice()];
  return `Welcome Player ${currPlayer}. <br>You rolled ${diceRoll[0]} for Dice 1 and ${diceRoll[1]} for Dice 2. <br>Choose the order of the dice by entering 1 or 2 as the first number.`;
};

var validateDiceSelected = function (selectedNum) {
  return selectedNum == 1 || selectedNum == 2;
};

var arrayToNum = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var getPlayersNum = function (selectedDice) {
  if (currPlayer == 1) {
    if (selectedDice == 1) {
      player1Num = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      player1Num = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    gameMode = diceRollMode;
    currPlayer = 2;
    return `Player 1, you chose Dice ${selectedDice} first.<br>Your number is ${player1Num}.<br>It is now Player 2's turn. <br><br>Press Submit to roll dice`;
  }
  if (currPlayer == 2) {
    if (selectedDice == 1) {
      player2Num = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      player2Num = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    gameMode = winnerMode;
    currPlayer = 1;
    return `Player 2, you chose Dice ${selectedDice} first.<br>Your number is ${player2Num}.<br><br>Press Submit to view winner!!`;
  }
};

var getLeaderBoard = function () {
  player1Score += player1Num;
  player2Score += player2Num;
  if (player1Score > player2Score) {
    return `Leaderboard: <br>Player 1: ${player1Score} <br>Player 2: ${player2Score}`;
  }
  return `Leaderboard: <br>Player 2: ${player2Score} <br>Player 1: ${player1Score}`;
};

var getWinner = function () {
  var genericMessage = `Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br><br>Press Submit to play again.`;
  var leaderboard = getLeaderBoard();
  if (player1Num > player2Num) {
    return `Player 1 has won. <br>${genericMessage} <br><br>${leaderboard}`;
  }
  return `Player 2 has won. <br>${genericMessage} <br><br>${leaderboard}`;
};

var main = function (input) {
  if (gameMode == diceRollMode) {
    var newDiceRoll = getDiceRoll();
    gameMode = diceSelectMode;
    return newDiceRoll;
  }

  if (gameMode == diceSelectMode) {
    var playersNum;
    var diceSelection = validateDiceSelected(input);
    if (diceSelection == false) {
      return `Choose the order of the dice by entering 1 or 2 as the first number`;
    }
    if (diceSelection == true) {
      playersNum = getPlayersNum(input);
      return playersNum;
    }
  }

  if (gameMode == winnerMode) {
    var winner = getWinner();
    gameMode = diceRollMode;
    return winner;
  }
};
