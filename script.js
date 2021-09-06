var activePlayer = 1;
var currentMode = "waiting to start";
var currentPlayerArray = [0, 0];
var currentScore = 0;
var scoreArray = [[], []];
// ^this is meant to be a nested array - index 0 corresponds to player 1's scores, etc.
var progressNumber = 0;

var validateInput = function (input) {
  var validCommands = ["start", "Roll", "dice 1", "dice 2", "next"];
  if (validCommands.includes(input)) {
    return true;
  }
  console.log("Invalid Input.");
  return false;
};

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var playerTurnRoll = function (playerNumber) {
  currentPlayerArray[0] = rollDice();
  currentPlayerArray[1] = rollDice();
  console.log(`Rolled ${currentPlayerArray[0]} and ${currentPlayerArray[1]}`);
  var returnstring =
    `It is now Player ${playerNumber}'s turn.` +
    "<br><br>" +
    `You rolled ${currentPlayerArray[0]} for Dice 1, and  ${currentPlayerArray[1]} for Dice 2` +
    "<br><br>" +
    "Choose the order of the dice - enter 'dice 1' or 'dice 2'";
  return returnstring;
};

var calcPlayerScore = function (firstNumeralSelection) {
  if (firstNumeralSelection == "dice 1") {
    currentScore =
      currentPlayerArray[0].toString() + currentPlayerArray[1].toString();
  } else if (firstNumeralSelection == "dice 2") {
    currentScore =
      currentPlayerArray[1].toString() + currentPlayerArray[0].toString();
  }
  currentScore = Number(currentScore);
  console.log(currentScore);
  return currentScore;
};

var writePlayerScore = function () {
  var index = activePlayer - 1;
  scoreArray[index].push(currentScore);
  console.log(`Score Array for Player ${activePlayer}: ${scoreArray[index]}`);
  console.log("Score recorded.");
};

var playerTurnSelection = function (input) {
  var score = calcPlayerScore(input);
  var returnstring =
    `Player ${activePlayer}, you chose ${input} to be the first numeral.` +
    "<br><br>" +
    `The number you generated is: ${score}` +
    "<br><br>" +
    "Please type 'next' to continue.";
  console.log(`Score Generated: ${score}`);
  writePlayerScore();
  return returnstring;
};

var indexofMax = function (arr) {
  var currentMax = arr[0];
  var currentMaxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > currentMax) {
      // ^ loops over array and updates values
      currentMax = arr[i];
      currentMaxIndex = i;
    }
    return currentMaxIndex;
  }
};

var chooseWinner = function () {
  var currentRoundArray = [];
  for (let i = 0; i < scoreArray.length; i++) {
    var lastElement = scoreArray[i].previousPlayer;
    currentRoundArray.push(lastElement);
    // ^ loop over scoreArray, pop last value into currentRoundArray for comparison
    // player 1 is index 0, etc
  }
  var roundWinner = indexofMax(currentRoundArray) + 1;
  console.log(`Player ${roundWinner} wins this round.`);
  return roundWinner;
};

var calcCumulativeScore = function () {
  var cumulativeScoreArray = [];
  for (let i = 0; i < scoreArray.length; i++) {
    // loop players
    var tempScore = 0;
    var subArray = scoreArray[i];
    for (let s = 0; s < subArray.length; s++) {
      // loop score records
      tempScore = tempScore + scoreArray[i][s];
    }
    cumulativeScoreArray.push(tempScore);
    // contains all
  }
  console.log(`cumulativeScoreArray: ${cumulativeScoreArray}`);
  return cumulativeScoreArray;
};

var generateLeaderboardObject = function (arr) {
  // first sorts an array?????
  // takes cumulativeScoreArray and maps into dictionary/object thing
  var leaderboardObject = {};
  for (let entry = 0; entry < arr.length; entry++) {
    leaderboardObject[entry] = arr[entry];
  }
  console.log(`unsorted: ${leaderboardObject}`);
  const sortedLeaderboardObject = Object.fromEntries(
    Object.entries(leaderboardObject).sort(([, a], [, b]) => a - b) //magic
    // ^ takes entries of an object
    // then sorts them
    // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  );
  console.log(`sorted: ${sortedLeaderboardObject}`);
  return sortedLeaderboardObject;
};

var generateLeaderboardMessage = function (obj) {
  var messageString = "Leaderboard: <br><br>";
  for (let [key, value] of Object.entries(obj)) {
    messageString = messageString + `Player ${key}:   ${value}` + "<br><br>";
  }
  console.log(messageString);
  return messageString;
};

var switchPlayer = function () {
  var previousPlayer = activePlayer;
  activePlayer++;
  activePlayer = ((activePlayer + 1) % 2) + 1;
  // ^toggles between 1 and 2, conveniently assumes 2 players
  console.log(`New Player Turn: ${activePlayer}`);
  return `Player ${previousPlayer}'s turn has ended. Moving to next player, type 'Roll' to continue.`;
};

var main = function (input) {
  if (validateInput(input) == true) {
    // this catches all non-valid input
    if (currentMode == "waiting to start" && input == "start") {
      currentMode = "turn in progress";
      console.log("Started Playing");
      return "Hello Player 1. Enter 'Roll' to continue.";
    }
    if (progressNumber < 4) {
      if (progressNumber < 2 && input == "Roll") {
        return playerTurnRoll(activePlayer);
      }
      if (input.includes("dice")) {
        writePlayerScore();
        // ^ i believe this is WRONGFULLY called twice
        // check later
        return playerTurnSelection(input); // return?
      }
      if (input == "next") {
        progressNumber++;
        console.log(`progressNumber: ${progressNumber}`);
        return switchPlayer();
      }
      if (progressNumber == 2 && input == "Roll") {
        console.log(`scoreArray: ${scoreArray}`);
        // indicates 1 round is done
        var roundwinner = chooseWinner();
        //generateLeaderboardObject(calcCumulativeScore);
        progressNumber = 0;
        console.log(calcCumulativeScore());
        console.log(generateLeaderboardMessage(calcCumulativeScore()));
        return `The winner for this round is ${roundwinner}. Type 'Roll' to play again!`;
      }
    }
  }
  return "Looks like you submitted something invalid.";
};
