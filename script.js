// Global variables
var arrayActive = [];
var scoreBoard = [];
var numberOfRolls = 2;
var numberOfPlayers = 2;
var lastPlayer = 0;
var currentPlayer = 1;
var scoreBoardLock = 0;
var checkWinner = "";

// Game states: settings, roll dice, choose order
var gameState = "settings";

// Game settings
var settingsList =
  "</br>Settings: autoplay, lowest, play X</br>To start, leave input blank";
var autoPlay = 0;
var lowest = 0;

// Main function

var main = function (input) {
  if (gameState == "settings") {
    if (input == "autoplay") {
      autoPlay = 1;
      return `Autoplay enabled!${settingsList}`;
    }

    if (input == "lowest") {
      lowest = 1;
      return `Lowest wins enabled!${settingsList}`;
    }

    if (input.split(" ")[0] == "play") {
      numberOfPlayers = input.split(" ")[1];
      return `There are ${numberOfPlayers} players.${settingsList}`;
    }

    if (!input == "") {
      return `That's not a setting!${settingsList}`;
    }

    gameState = "roll";
    return `Press submit to roll a dice for Player ${currentPlayer}.`;
  }

  if (gameState == "roll") {
    arrayActive = generateDiceArray(numberOfRolls);
    gameState = "order";
    return `Player ${currentPlayer} rolled ${arrayActive[0]} and ${arrayActive[1]}.`;
  }

  if (gameState == "order") {
    if (autoPlay == 0 && !inputValidator(input)) {
      return `Please enter a valid integer.`;
    }

    var diceCombined = arrangeDice(arrayActive, input);

    // Create new player on scoreboard if needed, else simply add the
    // value to the correct player
    if (scoreBoardLock == 0) {
      scoreBoard.push(diceCombined);
    } else {
      scoreBoard[currentPlayer - 1] += diceCombined;
    }

    // If there are only two players, and both players have played compare their scores and print a winner. Else, empty the field.
    if (numberOfPlayers == 2 && lastPlayer != 0) {
      checkWinner = determineWinner(
        lastPlayer,
        currentPlayer,
        scoreBoard[lastPlayer - 1],
        scoreBoard[currentPlayer - 1]
      );
    } else {
      checkWinner = "";
    }

    currentLeaderBoard = leaderBoard(scoreBoard);
    rollingPlayer = currentPlayer;

    // If all players have played, reset the game and lock the scoreboard
    // else, update for the next player
    if (currentPlayer == numberOfPlayers) {
      lastPlayer = 0;
      currentPlayer = 1;
      scoreBoardLock = 1;
    } else {
      lastPlayer = currentPlayer;
      currentPlayer += 1;
    }

    // Update to loop game state
    gameState = "roll";

    return `The current score is ${scoreBoard}.<br>Player ${rollingPlayer} rolled ${diceCombined}.<br> ${checkWinner}
    <br> ${currentLeaderBoard}`;
  }
};

// Helper functions

var inputValidator = function (input) {
  // Return true if it's a number
  if (!isNaN(input) && input != "") {
    return true;
  }

  // Return false if it's not a number
  return false;
};

// Return random number from 1 to 6
var rollDice = function () {
  // Generate a decimal from 0 to 5 inclusive
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);

  // Convert to provide a result from 1 to 6
  var randomResult = randomInteger + 1;

  return randomResult;
};

// Return an array containing as many dice rolls as input
var generateDiceArray = function (diceRolls) {
  var generatedArray = [];
  // Execute the roll dice function and push its result to an array based on the number of diceRolls
  for (let i = 0; i < diceRolls; i += 1) {
    generatedArray.push(rollDice());
  }
  return generatedArray;
};

// Rearrange dice and return integer
var arrangeDice = function (diceArray, diceChoice) {
  // Arrange dice automatically if autoPlay is on
  if (autoPlay == 1) {
    if (diceArray[0] > diceArray[1]) {
      return diceArray[0] * 10 + diceArray[1];
    }
    return diceArray[1] * 10 + diceArray[0];
  }

  // Take the chosen number as the first number, then remove it from the array
  var firstNumber = diceArray[diceChoice - 1];
  diceArray.splice(diceChoice - 1, 1);

  // Take the remaining number as the second number
  var secondNumber = diceArray[0];
  var diceValue = firstNumber * 10 + secondNumber;

  return diceValue;
};

// Return a string based on winner between first and second player
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

  if (
    (lowest == 0 && firstScore < secondScore) ||
    (lowest == 1 && firstScore > secondScore)
  ) {
    winningScore = secondScore;
    winningPlayer = secondPlayer;
  }

  return `Player ${winningPlayer} wins with ${winningScore}!`;
};

var leaderBoard = function (array) {
  var outputString = `Leaderboard:`;
  var arrSco = array;
  var arrPos = [];

  // Create default leaderboard positions organised by player order
  for (let i = 0; i < arrSco.length; i += 1) {
    arrPos.push(i + 1);
  }

  // Rearrange the input scoreboard array and positions array using
  // bubble sort
  for (let i = 0; i < arrSco.length; i += 1) {
    for (let j = 0; j < arrSco.length - i - 1; j += 1) {
      if (arrSco[j + 1] > arrSco[j]) {
        [arrSco[j + 1], arrSco[j]] = [arrSco[j], arrSco[j + 1]];
        [arrPos[j + 1], arrPos[j]] = [arrPos[j], arrPos[j + 1]];
      }
    }
    console.log(scoreBoard);
  }

  // Push the two arrays into the outputString to generate the leaderboard
  for (let i = 0; i < arrSco.length; i += 1) {
    outputString += `<br>Player ${arrPos[i]}: ${arrSco[i]}`;
  }

  return outputString;
};
