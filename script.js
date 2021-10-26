var diceRollMode = `Roll Dice Mode`;
var diceSelectMode = `Dice Selection Mode`;
var winnerMode = `Determine Winner Mode`;
var gameMode = diceRollMode;

var currPlayer = 1;

var diceRoll = [];

var playerNum;
var player1Num;
var player2Num;

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

var getPlayerNum = function (selectedNum) {
  if (currPlayer == 1) {
    if (selectedNum == 1) {
      playerNum = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      playerNum = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    player1Num = playerNum;
    gameMode = diceRollMode;
    currPlayer = 2;
    return `Player 1, you chose Dice ${selectedNum} first.<br>Your number is ${playerNum}.<br>It is now Player 2's turn. <br><br>Submit to roll dice`;
  }
  if (currPlayer == 2) {
    if (selectedNum == 1) {
      playerNum = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      playerNum = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    player2Num = playerNum;
    gameMode = winnerMode;
    currPlayer = 1;
    return `Player 2, you chose Dice ${selectedNum} first.<br>Your number is ${playerNum}.<br><br>Press Submit to view winner!!`;
  }
};
var getWinner = function () {
  if (player1Num > player2Num) {
    return `Player 1 has won. <br> Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br><br>Press Submit to play again.`;
  }
  return `Player 2 has won. <br> Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br><br>Press Submit to play again.`;
};

var main = function (input) {
  if (gameMode == diceRollMode) {
    var newDiceRoll = getDiceRoll();
    gameMode = diceSelectMode;
    return newDiceRoll;
  }

  if (gameMode == diceSelectMode) {
    var diceSelection = validateDiceSelected(input);
    if (diceSelection == false) {
      return `Choose the order of the dice by entering 1 or 2 as the first number`;
    }
    if (diceSelection == true) {
      playerNum = getPlayerNum(input);
      return playerNum;
    }
  }

  if (gameMode == winnerMode) {
    var winner = getWinner();
    gameMode = diceRollMode;
    return winner;
  }
};
