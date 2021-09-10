var gameMode = "mode selection";
var concatenateNum = "";
var rollDiceResult = [];
var numOfDice = 2;
var result = "";
var leaderBoardResults = "";
var gameVersion = "";
var maxNumber = 0;

var player1RollDiceResult = [];
var player1ConcatenateNum = "";
var player1ScoreSum = 0;

var player2RollDiceResult = [];
var player2ConcatenateNum = "";
var player2ScoreSum = 0;

var main = function (input) {
  var myOutputValue = "";

  // console.clear();

  // console.log(`Current game mode is ${gameMode}.`);
  // console.log(`Current game version is ${gameVersion}.`);

  var inputValidationResults = inputValidation(input);
  console.log(`Result of input validation is ${inputValidationResults}`);

  if (inputValidationResults == true) {
    if (gameMode == "mode selection") {
      gameMode = "dice selection";

      if (input == "Lowest Combined") {
        gameVersion = "lowestCombined";
      } else {
        gameVersion = "normal";
      }

      myOutputValue = `You have selected the ${input} version. Please enter the number of dice you would like to play.`;
      return myOutputValue;
    }
    if (gameMode == "dice selection") {
      numOfDice = input;
      gameMode = "game intro";

      myOutputValue = `You have selected ${input} dice. Please click submit to start rolling!`;
      return myOutputValue;
    } else {
      return playGame(input);
    }
  } else {
    return inputValidationResults;
  }
};

// Function for input validation

var inputValidation = function (input) {
  var returnStatement = "";
  if (gameMode == "mode selection") {
    if (!(input == "Normal" || input == "Lowest Combined")) {
      returnStatement = `Wrong input. Please enter only "Normal" or "Lowest Combined" to start the game.`;
      return returnStatement;
    } else {
      console.log(`Validation Result is true`);
      return true;
    }
  } else if (gameMode == "game intro" || gameMode == "player 2 roll dice") {
    return true;
  } else if (
    gameMode == "player 1 selection" ||
    gameMode == "player 2 selection"
  ) {
    if (!(input == "Dice 1" || input == "Dice 2")) {
      returnStatement = `Wrong input. Please enter only "Dice 1" or "Dice 2"`;
      return returnStatement;
    } else {
      console.log(`Validation Result is true`);
      return true;
    }
  } else if (gameMode == "dice selection") {
    if (Number.isNaN(Number(input)) == true || input == 0 || input == "") {
      returnStatement = `Wrong input. Please enter numbers greater than 0 only.`;
      return returnStatement;
    } else {
      return true;
    }
  }
};

// Function to generate random dice number
var rollDice = function () {
  var randomDiceNum = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum;
};

// Function to add random dice number to array
var generateDiceResult = function () {
  var counter = 0;
  rollDiceResult = [];
  while (counter < numOfDice) {
    rollDiceResult.push(rollDice());
    counter += 1;
  }
  console.log(`Dice results is ${rollDiceResult}.`);
  return rollDiceResult;
};

// Function to concatenate dice numbers

var concatenateDiceNum = function (input) {
  var dicePosition1 = "";
  var dicePosition2 = "";
  if (input == "Dice 1") {
    dicePosition1 = rollDiceResult[0];
    // console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[1];
    // console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  } else {
    dicePosition1 = rollDiceResult[1];
    // console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[0];
    // console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  }
};

// Function to copy an array into another array

var copyArray = function (arrayToCopy) {
  var newArray = [];
  for (var counter = 0; counter < arrayToCopy.length; counter += 1) {
    newArray.push(arrayToCopy[counter]);
  }
  return newArray;
};

// Function to auto concatenate dice numbers

var autoConcatenateDiceNum = function (inputArray) {
  var tempArray = copyArray(inputArray);
  var sortedTempArray = tempArray.sort();
  var dicePosition1 = "";
  var dicePosition2 = "";
  if (gameVersion == "normal") {
    dicePosition1 = sortedTempArray.pop();
    dicePosition2 = sortedTempArray.pop();
    console.log(`Player 1 roll dice result is ${player1RollDiceResult}`);
    console.log(`Player 2 roll dice result is ${player2RollDiceResult}`);

    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  } else if (gameVersion == "lowestCombined") {
    dicePosition1 = sortedTempArray.splice(0, 1);
    dicePosition2 = sortedTempArray.splice(0, 1);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  }
};

// Function to check who wins for the round
var checkWhoWins = function (player1CurrentScore, player2CurrentScore) {
  var resultStatement = "";

  if (player1CurrentScore == player2CurrentScore) {
    resultStatement = `It's a draw! Click submit to try again.`;
    result = "draw";
    return resultStatement;
  } else if (player1CurrentScore > player2CurrentScore) {
    resultStatement = `Player 1 won this round!`;
    result = "player1";
    return resultStatement;
  } else {
    resultStatement = `Player 2 won this round!`;
    result = "player2";
    return resultStatement;
  }
};

// Function for lowest combined number wins

var lowestComWins = function (player1CurrentScore, player2CurrentScore) {
  var resultStatement = "";
  checkWhoWins(player1CurrentScore, player2CurrentScore);
  if (result == "draw") {
    resultStatement = `It's a draw! Click submit to try again.`;
    return resultStatement;
  } else if (result == "player1") {
    resultStatement = `Player 2 won this round!`;
    return resultStatement;
  } else {
    resultStatement = `Player 1 won this round!`;
    return resultStatement;
  }
};

// Function to generate leaderboard results
var leaderBoard = function (player1SumScore, player2SumScore) {
  var leaderBoardTitle = "<u>Leaderboard</u>";
  if (gameVersion == "normal") {
    if (
      player1SumScore > player2SumScore ||
      player1SumScore == player2SumScore
    ) {
      leaderBoardResults = `${leaderBoardTitle}<br>Player 1: ${player1SumScore}<br>Player 2: ${player2SumScore}`;
      return leaderBoardResults;
    } else {
      leaderBoardResults = `${leaderBoardTitle}<br>Player 2: ${player2SumScore}<br>Player 1: ${player1SumScore}`;
      return leaderBoardResults;
    }
  } else {
    if (
      player1SumScore > player2SumScore ||
      player1SumScore == player2SumScore
    ) {
      leaderBoardResults = `${leaderBoardTitle}<br>Player 2: ${player2SumScore}<br>Player 1: ${player1SumScore}`;
      return leaderBoardResults;
    } else {
      leaderBoardResults = `${leaderBoardTitle}<br>Player 1: ${player1SumScore}<br>Player 2: ${player2SumScore}`;
      return leaderBoardResults;
    }
  }
};

// Function to play the game

var playGame = function (input) {
  console.log(`Current game mode is ${gameMode}`);
  // console.log(`Player 1 roll dice result is ${player1RollDiceResult}`);
  // console.log(`Player 2 roll dice result is ${player2RollDiceResult}`);

  var winResults = "";
  var myOutputValue = "";
  if (gameMode == "game intro") {
    player1RollDiceResult = generateDiceResult();
    player1ConcatenateNum = autoConcatenateDiceNum(player1RollDiceResult);
    player1ScoreSum += player1ConcatenateNum;
    leaderBoard(player1ScoreSum, player2ScoreSum);

    gameMode = "player 2 roll dice";

    // console.log(`Player 1 roll dice result is ${player1RollDiceResult}`);
    // console.log(`Player 2 roll dice result is ${player2RollDiceResult}`);

    myOutputValue = `Welcome Player 1.<br><br>
    You rolled ${player1RollDiceResult}.<br><br>
    Your number is ${player1ConcatenateNum}.<br><br>
    It is now Player 2's turn. Click Submit to roll dice.<br><br>
    ${leaderBoardResults}`;

    return myOutputValue;
  } else if (gameMode == "player 2 roll dice") {
    player2RollDiceResult = generateDiceResult();
    player2ConcatenateNum = autoConcatenateDiceNum(player2RollDiceResult);
    player2ScoreSum += player2ConcatenateNum;
    leaderBoard(player1ScoreSum, player2ScoreSum);

    if (gameVersion == "normal") {
      winResults = checkWhoWins(player1ConcatenateNum, player2ConcatenateNum);
    } else {
      winResults = lowestComWins(player1ConcatenateNum, player2ConcatenateNum);
    }

    gameMode = "game intro";

    // console.log(`Player 1 roll dice result is ${player1RollDiceResult}`);
    // console.log(`Player 2 roll dice result is ${player2RollDiceResult}`);

    myOutputValue = `Welcome Player 2.<br><br>
    You rolled ${player2RollDiceResult}<br><br>
    Your number is ${player2ConcatenateNum}.<br><br>
    ${winResults}<br><br>It is now Player 1's turn. Click Submit to roll dice.<br><br>
    ${leaderBoardResults}`;

    return myOutputValue;
  }
};
