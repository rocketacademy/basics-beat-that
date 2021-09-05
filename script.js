var activePlayer = 1;
var currentMode = "waiting to start";
var currentPlayerArray = [0, 0];
var currentScore = 0;
var scoreArray = [[], []]; // this is meant to be a nested array - index 0 corresponds to player 1's scores, etc.
var roundNumber = 0;

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
  scoreArray[activePlayer - 1].push(currentScore); // i hope this works
  console.log("Score recorded.");
  return;
};

var switchPlayer = function () {
  activePlayer++;
  activePlayer = (activePlayer % 2) + 1;
  // ^toggles between 1 and 2, conveniently assumes 2 players
  console.log(`New Player Turn: ${activePlayer}`);
  return `${activePlayer}'s turn has ended. Moving to next player, type 'Roll' to continue.`;
};

var main = function (input) {
  if (currentMode == "waiting to start" || input == "start") {
    currentMode = "playing";
    console.log("Started Playing");
    return "Hello Player 1. Enter 'Roll' to continue.";
  } else if (input == "Roll") {
    return playerTurnRoll(activePlayer);
  } else if (input == "dice 1" || input == "dice 2") {
    playerTurnSelection(input);
    writePlayerScore();
    return switchPlayer();
  } else {
    return "Looks like you entered something invalid.";
  }
};
