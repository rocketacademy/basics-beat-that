// Player One clicks submit
// Roll two dices and show value
// Player One chooses dice order
// Player Two clicks submit
// Roll two dices and show value
// Player Two chooses dice order
// Evaluate higher combined score and output result. Reset game

var gameMode = "playerOneRoll";
var dices = [];
var playerOneScore = "";
var playerTwoScore = "";

var main = function(input) {
  if (gameMode == "playerOneRoll") {
    var rollPlayerOne = rollPlayer();
    gameMode = "playerOneChooses";
    return `Player One has rolled: <br> 1st Dice: ${rollPlayerOne[0]} <br> 2nd Dice: ${rollPlayerOne[1]}`;
  }
  if (gameMode == "playerOneChooses") {
    if (input != 1 && input != 2) {
      return `Please enter either 1 or 2 to choose which dice goes first.`
    } else {
      gameMode = "playerTwoRoll";
      playerOneScore = combineScore(input);
      return `Player One score: ${playerOneScore}`;
      }
  }
  if (gameMode == "playerTwoRoll") {
    var rollPlayerTwo = rollPlayer();
    gameMode = "playerTwoChooses";
    return `Player Two has rolled: <br> 1st Dice: ${rollPlayerTwo[0]} <br> 2nd Dice: ${rollPlayerTwo[1]}`;
  }
  if (gameMode == "playerTwoChooses") {
    if (input != 1 && input != 2) {
      return `Please enter either 1 or 2 to choose which dice goes first.`
    } else {
      gameMode = "compare";
      playerTwoScore = combineScore(input);
      return `Player Two score: ${playerTwoScore}`;
      }
  }
  if (gameMode == "compare") {
    return compareScore()
  }
}

//Helper function to get a random number from 1-6
var rollDice = function() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceInteger = randomInteger + 1;
  return diceInteger;
}

//Helper function to store 2 dice numbers in an array
var rollPlayer = function() {
  var diceOne = rollDice();
  var diceTwo = rollDice();
  dices = [diceOne, diceTwo];
  return dices;
}

//Helper function to combine both numbers in the array. The order will depend on user input 1 or 2
var combineScore = function(input) {
  if (input == "1") {
    var score = Number(String(dices[0]) + String(dices[1]));
  }
  if (input == "2") {
    score = Number(String(dices[1]) + String(dices[0]));
  }
  return score;
}

//Helper function to compare Player One and Two scores
var compareScore = function() {
  var outputMessage = `Player One score: ${playerOneScore} <br> Player Two score: ${playerTwoScore}`;
  gameMode = "playerOneRoll";
  if (playerOneScore > playerTwoScore) {
    return outputMessage + `<br> Player One wins!`;
  }
  if (playerTwoScore > playerOneScore) {
    return outputMessage + `<br> Player Two wins!`;
  }
  if (playerOneScore == playerTwoScore) {
    return outputMessage + `<br> It's a draw!`;
  }
}