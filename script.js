var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var gameMode = "waitingForPlayerName";
var playerNames = [];
var playerOneScore = [];
var playerTwoScore = [];
var playerOneScoreArray = [];
var playerTwoScoreArray = [];

var main = function (input) {
  if (gameMode == "waitingForPlayerName") {
    //Player One Code
    if (input == "") {
      return `Please Input Player 1 Name`;
    } else {
      playerNames.push(input);
      gameMode = "rollDicePlayerOne";
      return `Hello ${playerNames[0]}, welcome to Beat That! Click on Submit to Roll the dice!`;
    }
  }
  if (gameMode == "rollDicePlayerOne") {
    playerOneScoreArray.push(rollDice());
    playerOneScoreArray.push(rollDice());
    gameMode = "playerOneChooseOrder";
    return `${playerNames[0]}, your first number is ${playerOneScoreArray[0]} and your second number is ${playerOneScoreArray[1]},<br>input "standard" or "reverse" to add your number up!`;
  }
  if (gameMode == "playerOneChooseOrder" && input == "standard") {
    playerOneScore = "" + playerOneScoreArray[0] + playerOneScoreArray[1];
    gameMode = "playerTwoInputName";
    return `${playerNames[0]}! Your score is ${playerOneScoreArray[0]}${playerOneScoreArray[1]}!`;
  }
  if (gameMode == "playerOneChooseOrder" && input == "reverse") {
    playerOneScore = "" + playerOneScoreArray[1] + playerOneScoreArray[0];
    gameMode = "playerTwoInputName";
    return `${playerNames[0]}! Your score is ${playerOneScoreArray[1]}${playerOneScoreArray[0]}!`;
  }
  // Player Two Code
  if (gameMode == "playerTwoInputName") {
    if (input == "") {
      return `Please Input Player 2 Name`;
    } else {
      playerNames.push(input);
      gameMode = "rollDicePlayerTwo";
      return `Hello ${playerNames[1]}, welcome to Beat That! Click on Submit to Roll the dice!`;
    }
  }
  if (gameMode == "rollDicePlayerTwo") {
    playerTwoScoreArray.push(rollDice());
    playerTwoScoreArray.push(rollDice());
    gameMode = "playerTwoChooseOrder";
    return `${playerNames[1]}, your first number is ${playerTwoScoreArray[0]} and your second number is ${playerTwoScoreArray[1]},<br>input "standard" or "reverse" to add your number up!`;
  }
  if (gameMode == "playerTwoChooseOrder" && input == "standard") {
    playerTwoScore = "" + playerTwoScoreArray[0] + playerTwoScoreArray[1];
    gameMode = "totalUp";
    return `${playerNames[1]}! Your score is ${playerTwoScoreArray[0]}${playerTwoScoreArray[1]}!`;
  }
  if (gameMode == "playerTwoChooseOrder" && input == "reverse") {
    playerTwoScore = "" + playerTwoScoreArray[1] + playerTwoScoreArray[0];
    gameMode = "totalUp";
    return `${playerNames[1]}! Your score is ${playerTwoScoreArray[1]}${playerTwoScoreArray[0]}!`;
  }
  //Total Up
  var myOutputValue = "";
  if (gameMode == "totalUp")
    if (playerOneScore > playerTwoScore) {
      myOutputValue = `${playerNames[0]}'s score is ${playerOneScore}<br><br>${playerNames[1]}'s score is ${playerTwoScore}.<br><br> Since ${playerOneScore} is more than ${playerTwoScore}, ${playerNames[0]} won!`;
    }
  if (playerTwoScore > playerOneScore) {
    myOutputValue = `${playerNames[0]}'s score is ${playerOneScore}<br><br>${playerNames[1]}'s score is ${playerTwoScore}.<br><br> Since ${playerTwoScore} is more than ${playerOneScore}, ${playerNames[1]} won!`;
  }
  return myOutputValue;
};
