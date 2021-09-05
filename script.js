var activePlayer = 1;
var currentMode = "waiting to start";
var currentPlayerArray = [0, 0];
var currentScore = 0;
var scoreArray = [[], []];
// ^this is meant to be a nested array - index 0 corresponds to player 1's scores, etc.

var validateInput = function (input) {
  var validCommands = ["start", "Roll", "dice 1", "dice 2"];
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
  return currentScore;
};

var playerTurnSelection = function (input) {
  var score = calcPlayerScore(input);
  var returnstring =
    `${activePlayer}, you chose ${input} to be the first numeral.` +
    "<br><br>" +
    `The number you generated is: ${score}`;
  console.log(`Score Generated: ${score}`);
  return returnstring;
};

var writePlayerScore = function () {
  var index = activePlayer - 1;
  scoreArray[index].push(currentScore); // i hope this works
  console.log(scoreArray[index]);
  console.log("Score recorded.");
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
      currentMode = "playing";
      console.log("Started Playing");
      return "Hello Player 1. Enter 'Roll' to continue.";
    }
    if (input == "Roll") {
      return playerTurnRoll(activePlayer);
    }
    playerTurnSelection(input);
    writePlayerScore();
    return switchPlayer();
  }
  return "Looks like you submitted something invalid.";
};
