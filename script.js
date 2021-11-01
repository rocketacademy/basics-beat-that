var highestCombinedNumMode = 1;
var lowestCombinedNumMode = 2;
var gameMode;

var numDices;

var diceRollMode = 3;
var diceSelectMode = 4;
var winnerMode = 5;
var stageMode = diceRollMode;

var currPlayer = 1;

var diceRoll = [];

var playerNum;
var player1Num;
var player2Num;
var player1Score = 0;
var player2Score = 0;

var resetGame = function () {
  currPlayer = 1;
  stageMode = diceRollMode;
};

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var getDiceRoll = function () {
  stageMode = diceSelectMode;
  var welcomeMessgae = `Welcome Player ${currPlayer}.`;
  var rolledMessage = [];
  for (d = 0; d < numDices; d += 1) {
    diceRoll.push(rollDice());
    rolledMessage.push(
      ` <strong><u>${diceRoll[d]}</u></strong> for Dice ${d + 1}`
    );
  }
  return `${welcomeMessgae} <br>You rolled${rolledMessage} <br>Click Submit to get the combined number.`;
};

var validateSelection = function (selectedNum) {
  return selectedNum == 1 || selectedNum == 2;
};

var validateNumDices = function (selectedNumDice) {
  if (selectedNumDice != 0 && selectedNumDice != 1) {
    return selectedNumDice == selectedNumDice;
  }
};

var arrayToNum = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var sortArray = function () {
  if (gameMode == highestCombinedNumMode) {
    diceRoll = diceRoll.sort(function (a, b) {
      return b - a;
    });
    return diceRoll;
  } else {
    return diceRoll.sort();
  }
};

var getPlayersNumAuto = function () {
  diceRoll = sortArray();
  if (currPlayer == 1) {
    player1Num = 0;
    while (diceRoll.length > 0) {
      player1Num = arrayToNum(player1Num, diceRoll.shift());
    }
    stageMode = diceRollMode;
    currPlayer = 2;
    return `Player 1 <br>Your number is ${player1Num}.<br><br>It is now Player 2's turn. <br>Click Submit to roll dice`;
  }
  if (currPlayer == 2) {
    player2Num = 0;
    while (diceRoll.length > 0) {
      player2Num = arrayToNum(player2Num, diceRoll.shift());
    }
    stageMode = winnerMode;
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
    if (player1Num == player2Num) {
      return `It is a draw. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    if (player1Num > player2Num) {
      return `Player 1 has won. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    return `Player 2 has won. <br>${genericMessage} <br><br>${leaderboard}`;
  }
  if (gameMode == lowestCombinedNumMode) {
    if (player1Num == player2Num) {
      return `It is a draw. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    if (player1Num > player2Num) {
      return `Player 2 has won. <br>${genericMessage} <br><br>${leaderboard}`;
    }
    return `Player 1 has won. <br>${genericMessage} <br><br>${leaderboard}`;
  }
};

var main = function (input) {
  if (!gameMode) {
    var gameModeSelected = validateSelection(input);
    if (gameModeSelected == false) {
      return `Incorrect input! <br><br>Please choose a game mode to start playing! <br>1: Highest Combined Number <br>2: Lowest
        Combined Number`;
    }
    if (gameModeSelected == true) {
      if (input == 1) {
        gameMode = highestCombinedNumMode;
        return `You have choose: ${gameMode}. <br>Please select the number of dices (2 or more) use for the game`;
      } else {
        gameMode = lowestCombinedNumMode;
        return `You have choose: ${gameMode}. <br>Click submit to start the game.`;
      }
    }
  }

  if (!numDices) {
    var numDicesSelected = validateNumDices(input);
    if (numDicesSelected == true) {
      numDices = input;
    } else {
      return `Please select the number of dices (2 or more) use for the game`;
    }
  }

  var gameModeMessage = `<strong>Game Mode: ${gameMode}</strong> <br><br>`;

  if (stageMode == diceRollMode) {
    var newDiceRoll = getDiceRoll();
    return gameModeMessage + newDiceRoll;
  }
  //Console Log
  //console.log(`Checkpoint 1: ${diceRoll}`);

  if (stageMode == diceSelectMode) {
    var playersNum;
    playersNum = getPlayersNumAuto();
    return gameModeMessage + playersNum;
  }

  if (stageMode == winnerMode) {
    var winner = getWinner();
    resetGame();
    return gameModeMessage + winner;
  }
};
