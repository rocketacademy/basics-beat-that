var gameStatus = "mode selection";
var gameMode = "RANK";
var concatenateNum = "";
var rollDiceResult = [];
var numOfDice = 2;
var leaderBoardResults = "";
var gameVersion = "";
var numOfPlayers = 2;
var playersArray = [];
var turnCounter = 0;
var knockoutTurn = "start knockout";
var tempWinner = {};

var player1 = {};
var player2 = {};
var nextPlayer = {};

var main = function (input) {
  var myOutputValue = "";

  var inputValidationResults = inputValidation(input);

  if (inputValidationResults == true) {
    if (gameStatus == "mode selection") {
      gameStatus = "version selection";

      if (input == "Knockout") {
        gameMode = "KNOCKOUT";
      } else {
        gameMode = "RANK";
      }

      myOutputValue = `You have selected the ${input} mode.<br><br>
      Please select the version that you would like to play by entering
        "Normal" or "Lowest Combined"`;

      return myOutputValue;
    } else if (gameStatus == "version selection") {
      gameStatus = "player selection";

      if (input == "Lowest Combined") {
        gameVersion = "lowestCombined";
      } else {
        gameVersion = "normal";
      }

      myOutputValue = `You have selected the ${input} version.<br><br>
      Please enter the number of players.`;

      return myOutputValue;
    } else if (gameStatus == "player selection") {
      numOfPlayers = input;
      createPlayersArray(input);
      gameStatus = "dice selection";

      myOutputValue = `You have selected ${input} players.<br><br>
      Please enter the number of dice to play.`;

      return myOutputValue;
    } else if (gameStatus == "dice selection") {
      numOfDice = input;
      gameStatus = "game intro";

      myOutputValue = `You have selected ${input} dice.<br><br>
      Please click submit to start rolling!`;

      return myOutputValue;
    } else if (gameStatus == "game intro") {
      if (gameMode == "RANK") {
        return playGame(numOfPlayers);
      } else if (gameMode == "KNOCKOUT") {
        return playKnockoutGame(numOfPlayers);
      }
    }
  } else {
    return inputValidationResults;
  }
};

// Function for input validation

var inputValidation = function (input) {
  var returnStatement = "";
  if (gameStatus == "version selection") {
    if (!(input == "Normal" || input == "Lowest Combined")) {
      returnStatement = `Wrong input. Please enter only "Normal" or "Lowest Combined" to start the game.`;
      return returnStatement;
    } else {
      return true;
    }
  } else if (gameStatus == "game intro" || gameStatus == "player 2 roll dice") {
    return true;
  } else if (
    gameStatus == "player 1 selection" ||
    gameStatus == "player 2 selection"
  ) {
    if (!(input == "Dice 1" || input == "Dice 2")) {
      returnStatement = `Wrong input. Please enter only "Dice 1" or "Dice 2"`;
      return returnStatement;
    } else {
      return true;
    }
  } else if (gameStatus == "player selection") {
    if (Number.isNaN(Number(input)) == true || input < 2 || input == "") {
      returnStatement = `Wrong input. Please enter a number greater or equal to 2.`;
      return returnStatement;
    } else {
      return true;
    }
  } else if (gameStatus == "dice selection") {
    if (Number.isNaN(Number(input)) == true || input == 0 || input == "") {
      returnStatement = `Wrong input. Please enter a number greater than 0.`;
      return returnStatement;
    } else {
      return true;
    }
  } else if (gameStatus == "mode selection") {
    if (!(input == "Knockout" || input == "Original")) {
      returnStatement = `Wrong input. Please enter only "Original" or "Knockout" to start the game.`;
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
  return rollDiceResult;
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
  var concatenateString = "";

  if (gameVersion == "normal") {
    for (counter = sortedTempArray.length - 1; counter >= 0; counter -= 1) {
      var diceNumber = sortedTempArray[counter];
      concatenateString = concatenateString + diceNumber.toString();
    }

    concatenateNum = Number(concatenateString);

    return concatenateNum;
  } else if (gameVersion == "lowestCombined") {
    for (counter = 0; counter < sortedTempArray.length; counter += 1) {
      var diceNumber = sortedTempArray[counter];
      concatenateString = concatenateString + diceNumber.toString();
    }
    concatenateNum = Number(concatenateString);

    return concatenateNum;
  }
};

// Function to check who wins for the round
var checkWhoWins = function (array) {
  var resultStatement = "";
  var maxScoreIndex = 0;
  var duplicateCount = 0;
  var currentScore = array[0].playerConcatenateNum;

  // Find the maximum score
  if (gameVersion == "normal") {
    for (counter = 0; counter < array.length; counter += 1) {
      if (array[counter].playerConcatenateNum > currentScore) {
        currentScore = array[counter].playerConcatenateNum;
        maxScoreIndex = counter;
      }
    }
  } else if (gameVersion == "lowestCombined") {
    for (counter = 0; counter < array.length; counter += 1) {
      if (array[counter].playerConcatenateNum < currentScore) {
        currentScore = array[counter].playerConcatenateNum;
        maxScoreIndex = counter;
      }
    }
  }

  tempWinner = array[maxScoreIndex];

  resultStatement = `Player ${array[maxScoreIndex].playerNum} won this round!`;

  if (gameMode == "KNOCKOUT" && turnCounter + 1 == playersArray.length) {
    resultStatement = `Player ${array[maxScoreIndex].playerNum} is the final winner of this round!`;
  }

  // Find if there is duplicate scores
  for (counter = 0; counter < array.length; counter += 1) {
    if (currentScore == array[counter].playerConcatenateNum) {
      duplicateCount += 1;
    }
  }
  if (duplicateCount >= 2) {
    resultStatement = `It's a draw! Nobody wins for this round!`;
    if (gameMode == "KNOCKOUT" && turnCounter + 1 == playersArray.length) {
      tempWinner = array[0];

      resultStatement = `It's a draw! Player ${array[0].playerNum} had the first player advantage.
      Thus, player ${array[0].playerNum} is the final winner of this round!`;
    } else if (gameMode == "KNOCKOUT") {
      tempWinner = array[0];

      resultStatement = `It's a draw! Player ${array[0].playerNum} had the first player advantage.
      Thus, player ${array[0].playerNum} won this round!`;
    }
  }

  return resultStatement;
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
  }

  leaderBoardResults = leaderBoardTitle + playerResults;
  return leaderBoardResults;
};

// Function to create an object for each player

var createPlayersArray = function (inputPlayersNum) {
  for (counter = 0; counter < inputPlayersNum; counter += 1) {
    var playerObj = {
      playerNum: counter + 1,
      playerDiceRollResult: [],
      playerConcatenateNum: 0,
      playerSumScore: 0,
      playerStatus: "NOT PLAYED",
    };
    playersArray.push(playerObj);
  }
  return playersArray;
};

// Function to add all players score into an array

var combineAllPlayersScore = function (array) {
  var allPlayersScore = [];
  for (counter = 0; counter < array.length; counter += 1) {
    allPlayersScore.push(array[counter].playerConcatenateNum);
  }
  return allPlayersScore;
};

// Function to play the game

var playGame = function (inputNumOfPlayers) {
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
    gameStatus = "dice selection";

    return myOutputValue;
  }
};

// Function to randomly assign player

var assignRandomPlayer = function (inputNumOfPlayers) {
  var counter = 0;
  var randomPlayer = 0;

  if (turnCounter < numOfPlayers) {
    while (counter < 1) {
      var randomNum = Math.floor(Math.random() * inputNumOfPlayers);
      if (playersArray[randomNum].playerStatus == "NOT PLAYED") {
        randomPlayer = playersArray[randomNum];
        playersArray[randomNum].playerStatus = "PLAYED";
        counter += 1;
      } else {
        counter = 0;
      }
    }
  }

  return randomPlayer;
};

// Function to create array

var createArray = function (object1, object2) {
  var newArray = [];
  newArray.push(object1);
  newArray.push(object2);
  return newArray;
};

// Function to reset player's status

var resetPlayerStatus = function (array) {
  for (counter = 0; counter < array.length; counter += 1) {
    array[counter].playerStatus = "NOT PLAYED";
  }
};

// Function to play the game in KNOCKOUT MODE

var playKnockoutGame = function (inputNumOfPlayers) {
  var winResults = "";
  var myOutputValue = "";

  if (knockoutTurn == "start knockout") {
    player1 = assignRandomPlayer(inputNumOfPlayers);
    nextPlayer = assignRandomPlayer(inputNumOfPlayers);

    myOutputValue = `Player ${player1.playerNum} you will start first.<br><br>
    You will play against Player ${nextPlayer.playerNum}.<br><br>
    Click Submit to roll dice.<br><br>`;

    knockoutTurn = "player 1";
    return myOutputValue;
  }

  if (knockoutTurn == "player 1") {
    player1.playerDiceRollResult = generateDiceResult();
    player1.playerConcatenateNum = autoConcatenateDiceNum(
      player1.playerDiceRollResult
    );
    player1.playerSumScore += player1.playerConcatenateNum;

    generateLeaderBoard(playersArray);

    myOutputValue = `Welcome Player ${player1.playerNum}.<br><br>
    You rolled ${player1.playerDiceRollResult}.<br><br>
    Your number is ${player1.playerConcatenateNum}.<br><br>
    It is now player ${nextPlayer.playerNum}'s turn. Click Submit to roll dice.<br><br>
    ${leaderBoardResults}`;

    turnCounter += 1;

    knockoutTurn = "next player";

    return myOutputValue;
  } else if (knockoutTurn == "next player") {
    player2 = nextPlayer;

    player2.playerDiceRollResult = generateDiceResult();
    player2.playerConcatenateNum = autoConcatenateDiceNum(
      player2.playerDiceRollResult
    );
    player2.playerSumScore += player2.playerConcatenateNum;

    winResults = checkWhoWins(createArray(player1, player2));

    player1 = tempWinner;

    generateLeaderBoard(playersArray);

    myOutputValue = `Welcome Player ${player2.playerNum}.<br><br>
    You rolled ${player2.playerDiceRollResult}.<br><br>
    Your number is ${player2.playerConcatenateNum}.<br><br>
    ${winResults}<br><br>`;

    turnCounter += 1;

    if (turnCounter < numOfPlayers) {
      knockoutTurn = "next player";
      nextPlayer = assignRandomPlayer(inputNumOfPlayers);
      myOutputValue =
        myOutputValue +
        `Player ${nextPlayer.playerNum} you are up next. Click submit to play another round!<br><br>${leaderBoardResults}`;
    } else {
      knockoutTurn = "start knockout";
      gameStatus = "dice selection";
      resetPlayerStatus(playersArray);
      turnCounter = 0;
      myOutputValue =
        myOutputValue +
        `Please submit the number of dice to play another round!<br><br>${leaderBoardResults}`;
    }

    return myOutputValue;
  }
};
