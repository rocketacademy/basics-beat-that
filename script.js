// Global variables
var arrayActive = [];
var scoreBoard = [];
var numberOfRolls = 2;
var numberOfPlayers = 2;
var lastPlayer = 0;
var currentPlayer = 1;

// Game states: roll dice, choose order
var gameState = "roll";

var main = function (input) {
  if (gameState == "roll") {
    arrayActive = generateDiceArray(numberOfRolls);
    gameState = "order";
    return `Player ${currentPlayer} rolled ${arrayActive[0]} and ${arrayActive[1]}.`;
  }

  if (gameState == "order") {
    scoreBoard.push(arrangeDice(arrayActive, input));
    gameState = "roll";

    var checkWinner = determineWinner(
      lastPlayer,
      currentPlayer,
      scoreBoard[lastPlayer - 1],
      scoreBoard[currentPlayer - 1]
    );

    lastPlayer = currentPlayer;
    currentPlayer += 1;
    return `The current score is ${scoreBoard}.<br> ${checkWinner}`;
  }
};

var inputValidator = function (input) {};

var rollDice = function () {
  // Generate a decimal from 0 to 5 inclusive
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);

  // Convert to provide a result from 1 to 6
  var randomResult = randomInteger + 1;

  return randomResult;
};

var generateDiceArray = function (diceRolls) {
  var generatedArray = [];
  // Execute the roll dice function and push its result to an array based on the number of diceRolls
  for (let i = 0; i < diceRolls; i += 1) {
    generatedArray.push(rollDice());
  }
  return generatedArray;
};

var arrangeDice = function (diceArray, diceChoice) {
  // Take the chosen number as the first number, then remove it from the array
  var firstNumber = diceArray[diceChoice - 1];
  diceArray.splice(diceChoice - 1, 1);

  // Take the remaining number as the second number
  var secondNumber = diceArray[0];
  var diceValue = firstNumber * 10 + secondNumber;

  return diceValue;
};

var determineWinner = function (
  firstPlayer,
  secondPlayer,
  firstScore,
  secondScore
) {
  // Default: First player wins
  var winningScore = firstScore;
  var winningPlayer = firstPlayer;

  if (firstScore == secondScore) {
    return `It's a draw with a score of ${winningScore}!`;
  }

  if (firstScore < secondScore) {
    winningScore = secondScore;
    winningPlayer = secondPlayer;
  }

  return `Player ${winningPlayer} wins with ${winningScore}!`;
};
