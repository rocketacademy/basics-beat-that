var gameMode = "Lets start the game";
var numberOfPlayers = 0;
var numberOfDice = 0;
var playerAnswer = [];
var sumOfPlayerScore = [];
var playerArray = [];
var curPlayer = 1;

var main = function (input) {
  if (gameMode == "Lets start the game") {
    gameMode = "Input number of players";
    console.log(gameMode);
    return "Welcome to Beat That! Please input number of players.";
  }
  if (gameMode == "Input number of players") {
    numberOfPlayers = input;
    if (Number.isNaN(Number(input))) {
      return `Sorry please enter a number`;
    } else {
      getPlayerArray();
      console.log(numberOfPlayers);
      gameMode = "Input number of dice";
      console.log(gameMode);
      return "Please input number of dice want to play.";
    }
  }
  if (gameMode == "Input number of dice") {
    numberOfDice = input;
    if (Number.isNaN(Number(input))) {
      return `Sorry please enter a number`;
    } else {
      gameMode = "Roll the dice";
      console.log(gameMode);
      console.log(numberOfDice);
      return "Press continue to roll the dice";
    }
  }
  if (gameMode == "Roll the dice") {
    var diceResult = displayRolledResult();
    gameMode = "Key in answer";
    console.log(gameMode);
    return diceResult + "<br>" + "Please input your answer.";
  }
  if (gameMode == "Key in answer") {
    sumOfPlayerScore[Number(curPlayer - 1)] += Number(input);
    gameMode = "Roll the dice";
    curPlayer += 1;
    if (curPlayer > numberOfPlayers) {
      gameMode = "leaderboard";
      return `All players have input the answer. Press continue to see the result❗`;
    }
    return "Next Player please click continue to roll the dice";
  }
  if (gameMode == "leaderboard") {
    resetGame();
    return `${getLeaderboard()} <br> Press continue for next round❗`;
  }
};
console.log(sumOfPlayerScore);

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var findLargestScore = function () {
  var j = 1;
  var largestNumber = sumOfPlayerScore[0];
  var largestNumberPlayer = 1;
  while (j < sumOfPlayerScore.length) {
    if (largestNumber > sumOfPlayerScore[j]) {
    } else {largestNumber = sumOfPlayerScore[j];
    largestNumberPlayer = j + 1;
    }
    j += 1;
  }
  return `Player ${largestNumberPlayer} is leading with ${largestNumber}`;
};

var displayRolledResult = function () {
  var rolledResults = [];
  var rolledResultsDisplay = "";
  var subcount = 0;
  while (subcount < numberOfDice) {
    var b = rollDice();
    rolledResults.push(b);
    rolledResultsDisplay += `You rolled ${rolledResults[subcount]} for Dice ${
      subcount + 1
    } <br>`;
    console.log(rolledResultsDisplay);
    subcount = subcount + 1;
  }
  return rolledResultsDisplay;
};

var getPlayerArray = function () {
  for (var i = 0; i < numberOfPlayers; i += 1) {
    sumOfPlayerScore.push(Number(0));
  }
  return sumOfPlayerScore;
};

var getLeaderboard = function () {
  var outputMsg = "🎲Leaderboard🎲 <br>";
  for (var j = 0; j < numberOfPlayers; j += 1) {
    outputMsg += `Player ${j + 1}'s score is ${sumOfPlayerScore[j]}. <br>`;
  }
  return outputMsg + findLargestScore();
};

var resetGame = function () {
  curPlayer = 1;
  gameMode = "Roll the dice";
  return curPlayer;
};
