//Statuses
var PLAYERSELECTPHASE = 0;
var DICENUMBERSELECTPHASE = 1;
var ROLLPHASE = 2;

//Flow Control: Current game states and player turn.
var playerCount = 0;
var currentDiceNum = 0;
var currentGameState = PLAYERSELECTPHASE;
var currentTurn = 0;
var currentPlayer = 0;

//Stored Values
var currentPlayerNum = [];

//Scores
var scoreboard = [];

var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var rollDiceNum = Math.floor(randomInteger);
  var finalNum = rollDiceNum + 1;
  return finalNum;
};

var initialiseScoreboard = function () {
  for (var i = 0; i < playerCount; i++) {
    scoreboard.push({ player: i, score: 0 });
  }
};

var playerRoll = function (input) {
  var diceValues = [];
  var outputString = "";
  for (var i = 0; i < currentDiceNum; i++) {
    diceValues.push(rollDice());
  }

  diceValues.sort().reverse();

  for (var i = 0; i < diceValues.length; i++) {
    outputString += String(diceValues[i]);
  }

  var outputInt = Number(outputString);
  currentPlayerNum[input] = outputInt;
  scoreboard[input].score += outputInt;

  return `Player ${input + 1} has rolled:<br>${outputInt}`;
};

var winCheck = function (currentPlayerNum) {
  var currentWinner = 0;
  var currentScore = currentPlayerNum[0];
  for (var i = 1; i < currentPlayerNum.length; i++) {
    if (currentPlayerNum[i] > currentScore) {
      currentWinner = i;
      currentScore = currentPlayerNum[i];
    }
  }

  var output = "<br><br>This round's scores:<br>";
  for (var i = 0; i < currentPlayerNum.length; i++) {
    output += `<br>Player ${i + 1} rolled ${currentPlayerNum[i]}.`;
  }

  return `${output}<br><br>Player ${
    currentWinner + 1
  }'s value was ${currentScore} and is the highest for this round.<br>Please choose the number of dice to play and press Go!`;
};

var displayScore = function (scoreboard) {
  scoreboardCopy = [...scoreboard];
  scoreboardCopy.sort((a, b) => a.score - b.score).reverse();
  var output = "<br><br>Current Leaderboard!<br>";
  for (var i = 0; i < scoreboardCopy.length; i++) {
    output += `<br>Player ${scoreboardCopy[i].player + 1} scored ${
      scoreboardCopy[i].score
    }`;
  }
  return output;
};

var main = function (input) {
  if (currentGameState == PLAYERSELECTPHASE) {
    currentGameState = DICENUMBERSELECTPHASE;
    playerCount = input;
    initialiseScoreboard();
    return `You have selected ${input} players.<br>Now select the number of dice to roll (probably up to 10, so it doesn't lag so much.).`;
  }

  if (currentGameState == DICENUMBERSELECTPHASE) {
    currentGameState = ROLLPHASE;
    currentDiceNum = input;
    return `You have chosen to play with ${input} dice.<br>Player 1 press Go! to roll.`;
  }

  if (currentGameState == ROLLPHASE) {
    var closeStatement = playerRoll(currentPlayer);
  }

  if (currentPlayer == playerCount - 1) {
    winStatement = winCheck(currentPlayerNum) + displayScore(scoreboard);
    currentGameState = DICENUMBERSELECTPHASE;
    currentPlayer = 0;
    currentDiceNum = [];
  } else {
    currentPlayer += 1;
    winStatement = "";
  }

  currentTurn += 1;
  return closeStatement + winStatement;
};
