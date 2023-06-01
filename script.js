var gameMode = "gameModeRollDice"; //initialize to gameStart from Start
var userDiceRoll1;
var userDiceRoll2;
var playerOneRollDiceResult = [];
var playerTwoRollDiceResult = [];
var playerOneFinalScore = "";
var playerTwoFinalScore = "";
var playerOneScore = [];
var playerTwoScore = [];
var finalPlayScore = [];
var errorMessage = "";
var outPutMessage = "";

//GetRandom no function for diceroll
var getRandomInteger = function () {
  var randomDecimal = Math.random() * 6;
  var resultInteger = Math.floor(randomDecimal) + 1;
  return resultInteger;
};

var diceRoll = function () {
  var diceNumber = getRandomInteger();
  return diceNumber;
};

var inputValidation = function (userInput) {
  if (isNaN(userInput) || userInput === "") {
    console.log("re-Enter again");
    errorMessage = "Please enter 1 or 2 instead of empty submission";
    return errorMessage;
  }

  if (userInput !== 1 && userInput !== 2) {
    errorMessage = "System only accept 1 or 2 only!";
    return errorMessage;
  }
  return true;
};

var playerOneRollDice = function () {
  var counter = 0;
  console.log("playRollDice working");
  while (counter < 2) {
    playerOneRollDiceResult.push(diceRoll());
    counter += 1;
  }
  console.log("playerRollDiceResult", playerOneRollDiceResult);
  gameMode = "setPlayerOneScore";
  console.log("gameMode: ", gameMode);

  return (
    "Welcome, You roll " +
    playerOneRollDiceResult[0] +
    " for Dice 1 and " +
    playerOneRollDiceResult[1] +
    " for Dice 2. <br /> Choose the order of the dice. Input Dice 1 = 1 or Dice 2 = 2 as your 1st number"
  );
};

var playerTwoRollDice = function () {
  var counter = 0;
  while (counter < 2) {
    playerTwoRollDiceResult.push(diceRoll());
    counter += 1;
  }
  console.log("playerRollDiceResult", playerTwoRollDiceResult);
  gameMode = "setPlayerTwoScore";
  return (
    "Welcome, You roll " +
    playerTwoRollDiceResult[0] +
    " for Dice 1 and " +
    playerTwoRollDiceResult[1] +
    " for Dice 2. <br /> Choose the order of the dice. Input Dice 1 = 1 or Dice 2 = 2 as your 1st number"
  );
};

var setPlayerOneScore = function (input) {
  console.log("The input is ", input);
  console.log("gameMode setPlayerOneScore working");
  if (input == "1") {
    playerOneScore[0] = String(playerOneRollDiceResult[0]);
    playerOneScore[1] = String(playerOneRollDiceResult[1]);
    gameMode = "playerTwoRollDice";
    console.log("PlayerOne Score", playerOneScore);
    return playerOneChoice();
  } else if (input == "2") {
    playerOneScore[0] = String(playerOneRollDiceResult[1]);
    playerOneScore[1] = String(playerOneRollDiceResult[0]);
    console.log("PlayerOne Score", playerOneScore);
    gameMode = "playerTwoRollDice";
    console.log("gameMode PlayerOneChoice Set");
    return playerOneChoice();
  } else return inputValidation(input);
};

var playerOneChoice = function () {
  ("gameMode PlayerOneChoice Working");
  playerOneFinalScore = playerOneScore[0] + playerOneScore[1];
  gameMode = "playerTwoRollDice";
  return `Player One , you choose Dice 1 first. <br/> Your number is ${playerOneFinalScore} <br/> It is now Player 2's turn.`;
};

var setPlayerTwoScore = function (input) {
  if (input === "1") {
    playerTwoScore[0] = String(playerTwoRollDiceResult[0]);
    playerTwoScore[1] = String(playerTwoRollDiceResult[1]);

    return playerTwoChoice();
  } else if (input === "2") {
    playerTwoScore[0] = String(playerTwoRollDiceResult[1]);
    playerTwoScore[1] = String(playerTwoRollDiceResult[0]);

    return playerTwoChoice();
  } else return inputValidation(input);
};

var playerTwoChoice = function () {
  playerTwoFinalScore = playerTwoScore[0] + playerOneScore[1];
  return `Player 1 Your Score : ${playerOneFinalScore} <br/> Player 2 Your Score: ${playerTwoFinalScore} `;
};

var main = function (input) {
  input = input || "";
  if (gameMode === "gameModeRollDice") {
    outPutMessage = playerOneRollDice();
  } else if (gameMode === "setPlayerOneScore") {
    outPutMessage = setPlayerOneScore(input);
  } else if (gameMode === "playerTwoRollDice") {
    outPutMessage = playerTwoRollDice();
  } else if (gameMode === "setPlayerTwoScore") {
    outPutMessage = setPlayerTwoScore(input);
  }

  return outPutMessage;
};
