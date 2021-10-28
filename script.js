var highestCombinedNumMode = `Highest Combined Number Mode`;
var lowestCombinedNumMode = `Lowest Combined Number Mode`;
var gameMode;

var diceRollMode = `Roll Dice Mode`;
var diceSelectMode = `Dice Selection Mode`;
var winnerMode = `Determine Winner Mode`;
var stageMode = diceRollMode;

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
  stageMode = diceSelectMode;
  return `Welcome Player ${currPlayer}. <br>You rolled <strong><u>${diceRoll[0]}</u></strong> for Dice 1 and <strong><u>${diceRoll[1]}</u></strong> for Dice 2. <br>Click Submit to get the combined number.`;
};

var validateSelection = function (selectedNum) {
  return selectedNum == 1 || selectedNum == 2;
};

var arrayToNum = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

/* var getPlayersNum = function (selectedDice) {
  if (currPlayer == 1) {
    if (selectedDice == 1) {
      player1Num = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      player1Num = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    stageMode = diceRollMode;
    currPlayer = 2;
    return `Player 1, you chose Dice ${selectedDice} first.<br>Your number is ${player1Num}.<br>It is now Player 2's turn. <br><br>Click Submit to roll dice`;
  }
  if (currPlayer == 2) {
    if (selectedDice == 1) {
      player2Num = arrayToNum(diceRoll[0], diceRoll[1]);
    } else {
      player2Num = arrayToNum(diceRoll[1], diceRoll[0]);
    }
    stageMode = winnerMode;
    currPlayer = 1;
    return `Player 2, you chose Dice ${selectedDice} first.<br>Your number is ${player2Num}.<br><br>Click Submit to view winner!!`;
  }
}; */

var getPlayersNumAuto = function (selectedDice) {
  if (currPlayer == 1) {
    if (gameMode == highestCombinedNumMode) {
      if (diceRoll[0] > diceRoll[1]) {
        player1Num = arrayToNum(diceRoll[0], diceRoll[1]);
      } else {
        player1Num = arrayToNum(diceRoll[1], diceRoll[0]);
      }
    }
    if (gameMode == lowestCombinedNumMode) {
      if (diceRoll[0] > diceRoll[1]) {
        player1Num = arrayToNum(diceRoll[1], diceRoll[0]);
      } else {
        player1Num = arrayToNum(diceRoll[0], diceRoll[1]);
      }
    }
    stageMode = diceRollMode;
    currPlayer = 2;
    return `Player 1 <br>Your number is ${player1Num}.<br><br>It is now Player 2's turn. <br>Click Submit to roll dice`;
  }
  if (currPlayer == 2) {
    if (gameMode == highestCombinedNumMode) {
      if (diceRoll[0] > diceRoll[1]) {
        player2Num = arrayToNum(diceRoll[0], diceRoll[1]);
      } else {
        player2Num = arrayToNum(diceRoll[1], diceRoll[0]);
      }
    }
    if (gameMode == lowestCombinedNumMode) {
      if (diceRoll[0] > diceRoll[1]) {
        player2Num = arrayToNum(diceRoll[1], diceRoll[0]);
      } else {
        player2Num = arrayToNum(diceRoll[0], diceRoll[1]);
      }
    }
    stageMode = winnerMode;
    currPlayer = 1;
    return `Player 2 <br>Your number is ${player2Num}.<br><br>Click Submit to view winner!!`;
  }
};

var getLeaderBoard = function () {
  player1Score += player1Num;
  player2Score += player2Num;
  if (gameMode == highestCombinedNumMode) {
    if (player1Score > player2Score) {
      return `Leaderboard: <br>Player 1: ${player1Score} <br>Player 2: ${player2Score}`;
    }
    return `Leaderboard: <br>Player 2: ${player2Score} <br>Player 1: ${player1Score}`;
  }
  if (gameMode == lowestCombinedNumMode) {
    if (player1Score > player2Score) {
      return `Leaderboard: <br>Player 2: ${player2Score} <br>Player 1: ${player1Score}`;
    }
    return `Leaderboard: <br>Player 1: ${player1Score} <br>Player 2: ${player2Score}`;
  }
};

var getWinner = function () {
  var genericMessage = `Player 1's number: ${player1Num} | Player 2's number: ${player2Num} <br><br>Click Submit to play again.`;
  var leaderboard = getLeaderBoard();
  if (gameMode == highestCombinedNumMode) {
    if (player1Num > player2Num) {
      return `Player 1 has won. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    return `Player 2 has won. <br>${genericMessage} <br><br>${leaderboard}`;
  }
  if (gameMode == lowestCombinedNumMode) {
    if (player1Num > player2Num) {
      return `Player 2 has won. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    return `Player 1 has won. <br>${genericMessage} <br><br>${leaderboard}`;
  }
};

var main = function (input) {
  if (!gameMode) {
    var gameModeSelection = validateSelection(input);
    if (gameModeSelection == false) {
      return `Incorrect input! <br><br>Please choose a game mode to start playing! <br>1: Highest Combined Number <br>2: Lowest
        Combined Number`;
    }
    if (gameModeSelection == true) {
      if (input == 1) {
        gameMode = highestCombinedNumMode;
        return `You have choose: ${gameMode}. <br>Click submit to start the game.`;
      } else {
        gameMode = lowestCombinedNumMode;
        return `You have choose: ${gameMode}. <br>Click submit to start the game.`;
      }
    }
  }

  var gameModeMessage = `<strong>Game Mode: ${gameMode}</strong> <br><br>`;

  if (stageMode == diceRollMode) {
    var newDiceRoll = getDiceRoll();
    return gameModeMessage + newDiceRoll;
  }

  if (stageMode == diceSelectMode) {
    var playersNum;
    playersNum = getPlayersNumAuto();
    return gameModeMessage + playersNum;
  }

  if (stageMode == winnerMode) {
    var winner = getWinner();
    stageMode = diceRollMode;
    return gameModeMessage + winner;
  }
};
