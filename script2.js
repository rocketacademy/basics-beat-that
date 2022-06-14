//Statuses
var PLAYERSELECTPHASE = 0;
var DICENUMBERSELECTPHASE = 1;
var ROLLPHASE = 2;
var VICTORROLLPHASE = 3;

//Flow Control: Current game states and player turn.
var playerCount = 0;
var currentDiceCount = 0;
var currentGameState = PLAYERSELECTPHASE;
var currentTurn = 0;
var currentPlayer = 0;
var currentVictor = 0;

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

var initialiseScoreboard = function (board) {
  for (var i = 0; i < playerCount; i++) {
    board.push({ player: i, score: 0 });
  }
};

var playerRoll = function (input) {
  var diceValues = [];
  var outputString = "";
  for (var i = 0; i < currentDiceCount; i++) {
    diceValues.push(rollDice());
  }

  diceValues.sort().reverse();

  for (var i = 0; i < diceValues.length; i++) {
    outputString += String(diceValues[i]);
  }

  var outputInt = Number(outputString);
  currentPlayerNum.push({ player: input, score: outputInt });
  scoreboard[input].score += outputInt;

  return `Player ${input + 1} has rolled:<br>${outputInt}`;
};

var winCheck = function (currentPlayerNum) {
  currentPlayerNumCopy = [...currentPlayerNum];
  currentPlayerNumCopy.sort((a, b) => a.score - b.score).reverse();

  var output = "<br><br>This round's scores:<br>";
  for (var i = 0; i < currentPlayerNumCopy.length; i++) {
    output += `<br>Player ${currentPlayerNumCopy[i].player + 1} rolled ${
      currentPlayerNumCopy[i].score
    }.`;
  }

  currentVictor = currentPlayerNumCopy[0].player;

  return `${output}<br><br>Player ${
    currentPlayerNumCopy[0].player + 1
  }'s value was ${
    currentPlayerNumCopy[0].score
  } and is the highest for this round.<br>Player ${
    currentPlayerNumCopy[1].player + 1
  } is going home with NOTHING!`;
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
    initialiseScoreboard(scoreboard);
    return `You have selected ${input} players.<br>Now select the number of dice to roll (probably up to 10, so it doesn't lag so much.).`;
  }

  if (currentGameState == DICENUMBERSELECTPHASE) {
    currentGameState = VICTORROLLPHASE;
    currentDiceCount = input;
    return `You have chosen to play with ${input} dice.<br>Press Go! to roll.`;
  }

  if (currentGameState == VICTORROLLPHASE) {
    var closeStatement = playerRoll(currentVictor);
    currentGameState = ROLLPHASE;
    currentPlayer = currentTurn + 1;
    return closeStatement;
  }

  if (currentGameState == ROLLPHASE) {
    var closeStatement = playerRoll(currentPlayer);
    winStatement = winCheck(currentPlayerNum) + displayScore(scoreboard);
    currentGameState = DICENUMBERSELECTPHASE;
    currentPlayer = currentVictor;
    currentTurn += 1;
    currentPlayerNum = [];
    if (currentTurn == playerCount - 1) {
      continuationMessage = `<br><br>The game has ended; please refresh to start a new game.`;
    } else {
      continuationMessage = `<br><br>Please select the number of dice to continue your next game.`;
    }
    return closeStatement + winStatement + continuationMessage;
  }
};
