var gameMode = "mode selection";
var concatenateNum = "";
var rollDiceResult = [];
var numOfDice = 2;
var result = "";
var leaderBoardResults = "";
var gameVersion = "";
var numOfPlayers = 2;
var playersArray = [];
var turnCounter = 0;

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
      gameMode = "player selection";

      if (input == "Lowest Combined") {
        gameVersion = "lowestCombined";
      } else {
        gameVersion = "normal";
      }

      myOutputValue = `You have selected the ${input} version.<br><br>
      Please enter the number of players.`;

      return myOutputValue;
    } else if (gameMode == "player selection") {
      numOfPlayers = input;
      createPlayersArray(input);
      gameMode = "dice selection";

      myOutputValue = `You have selected ${input} players.<br><br>
      Please enter the number of dice to play.`;

      return myOutputValue;
    } else if (gameMode == "dice selection") {
      numOfDice = input;
      gameMode = "game intro";

      myOutputValue = `You have selected ${input} dice.<br><br>
      Please click submit to start rolling!`;

      return myOutputValue;
    } else {
      return playGame(numOfPlayers);
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
  } else if (gameMode == "dice selection" || gameMode == "player selection") {
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

    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    // console.log(typeof concatenateNum);
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
var checkWhoWins = function (playersArray) {
  var resultStatement = "";
  var maxScoreIndex = 0;
  var duplicateCount = 0;
  var currentScore = playersArray[0].playerConcatenateNum;

  // Find the maximum score
  if (gameVersion == "normal") {
    for (var counter = 0; counter < playersArray.length; counter += 1) {
      if (playersArray[counter].playerConcatenateNum > currentScore) {
        currentScore = playersArray[counter].playerConcatenateNum;
        maxScoreIndex = counter;
      }
    }
  } else if (gameVersion == "lowestCombined") {
    for (var counter = 0; counter < playersArray.length; counter += 1) {
      if (playersArray[counter].playerConcatenateNum < currentScore) {
        currentScore = playersArray[counter].playerConcatenateNum;
        maxScoreIndex = counter;
      }
    }
  }

  resultStatement = `Player ${playersArray[maxScoreIndex].playerNum} won this round!`;

  // Find if there is duplicate scores
  for (var counter = 0; counter < playersArray.length; counter += 1) {
    if (currentScore == playersArray[counter].playerConcatenateNum) {
      duplicateCount += 1;
    }
  }
  if (duplicateCount >= 2) {
    resultStatement = `It's a draw! Nobody wins for this round!`;
  }

  return resultStatement;
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
var generateLeaderBoard = function (array) {
  var leaderBoardTitle = "<u>Leaderboard</u><br>";
  var playerResults = "";

  for (counter = 0; counter < array.length; counter += 1) {
    playerResults =
      playerResults +
      "Player " +
      array[counter].playerNum +
      ": " +
      array[counter].playerSumScore +
      "<br>";
    console.log(`${playerResults}`);
  }

  leaderBoardResults = leaderBoardTitle + playerResults;
  return leaderBoardResults;
};

// Function to create an object for each player

var createPlayersArray = function (inputPlayersNum) {
  for (var counter = 0; counter < inputPlayersNum; counter += 1) {
    var playerObj = {
      playerNum: counter + 1,
      playerDiceRollResult: [],
      playerConcatenateNum: 0,
      playerSumScore: 0,
    };
    playersArray.push(playerObj);
  }
  return playersArray;
};

// Function to add all players score into an array

var combineAllPlayersScore = function (array) {
  var allPlayersScore = [];
  for (var counter = 0; counter < array.length; counter += 1) {
    allPlayersScore.push(array[counter].playerConcatenateNum);
  }
  return allPlayersScore;
};

// Function to play the game

var playGame = function (inputNumOfPlayers) {
  console.log(`Current game mode is ${gameMode}`);
  // console.log(`Player 1 roll dice result is ${player1RollDiceResult}`);
  // console.log(`Player 2 roll dice result is ${player2RollDiceResult}`);

  var winResults = "";
  var myOutputValue = "";
  var currentPlayerNum = 0;
  var nextPlayerNum = 0;

  if (turnCounter < inputNumOfPlayers - 1) {
    playersArray[turnCounter].playerDiceRollResult = generateDiceResult();
    playersArray[turnCounter].playerConcatenateNum = autoConcatenateDiceNum(
      playersArray[turnCounter].playerDiceRollResult
    );
    playersArray[turnCounter].playerSumScore +=
      playersArray[turnCounter].playerConcatenateNum;

    currentPlayerNum = playersArray[turnCounter].playerNum;
    nextPlayerNum = currentPlayerNum + 1;

    generateLeaderBoard(playersArray);

    myOutputValue = `Welcome Player ${currentPlayerNum}.<br><br>
    You rolled ${playersArray[turnCounter].playerDiceRollResult}.<br><br>
    Your number is ${playersArray[turnCounter].playerConcatenateNum}.<br><br>
    It is now Player ${nextPlayerNum}'s turn. Click Submit to roll dice.<br><br>
    ${leaderBoardResults}`;

    turnCounter += 1;

    console.log(playersArray);

    return myOutputValue;
  } else if (turnCounter == inputNumOfPlayers - 1) {
    playersArray[turnCounter].playerDiceRollResult = generateDiceResult();
    playersArray[turnCounter].playerConcatenateNum = autoConcatenateDiceNum(
      playersArray[turnCounter].playerDiceRollResult
    );
    playersArray[turnCounter].playerSumScore +=
      playersArray[turnCounter].playerConcatenateNum;

    currentPlayerNum = playersArray[turnCounter].playerNum;

    winResults = checkWhoWins(playersArray);

    generateLeaderBoard(playersArray);

    myOutputValue = `Welcome Player ${currentPlayerNum}.<br><br>
    You rolled ${playersArray[turnCounter].playerDiceRollResult}.<br><br>
    Your number is ${playersArray[turnCounter].playerConcatenateNum}.<br><br>
    ${winResults}<br><br>
    Please submit the number of dice to play another round!<br><br>
    ${leaderBoardResults}`;

    turnCounter = 0;
    gameMode = "dice selection";

    console.log(playersArray);

    return myOutputValue;
  }
};
