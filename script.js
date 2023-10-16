//Declare Global Variables
let currentNumberRolled = [],
  gameMessage,
  scoreTable = [],
  scoreRecord = [],
  gameMode,
  numberOfDice,
  numberOfPlayers,
  playerCounter = 0,
  currentNumber;

//Main Function
let main = function (input, myOutputValue) {
  if (numberOfDice && numberOfPlayers && gameMode) {
    if (playerCounter < numberOfPlayers) {
      playerLogic();
      recordScore();
      semiResetGame();
      playerCounter++;
    } else {
      gameMessage = `Game Ended.<br>${winEvaluation()}`;
      resetGame();
    }
  } else if (!gameMode) {
    switch (input) {
      case "H":
      case "L":
        gameMode = input;
        gameMessage = `${gameMode} mode chosen. Type in the number of dice (integer).`;
        break;
      default:
        gameMessage = "Invalid input, choose H or L for game mode.";
    }
  } else if (!numberOfDice) {
    if (Number.isInteger(Number(input)) && Number(input) > 0) {
      numberOfDice = Number(input);
      gameMessage = `${numberOfDice} dice selected, type in the number of players (integer).`;
    } else gameMessage = "Invalid input, type in the number of dice (integer).";
  } else if (!numberOfPlayers) {
    if (Number.isInteger(Number(input)) && Number(input) > 0) {
      numberOfPlayers = Number(input);
      scoreTable = Array(numberOfPlayers).fill(0);
      scoreRecord = Array(numberOfPlayers).fill(0);
      gameMessage = `${numberOfPlayers} players selected, press submit to play.`;
    } else
      gameMessage = "Invalid input, type in the number of players (integer).";
  } else gameMessage = "Error in main function.";
  myOutputValue = gameMessage + `<br><br>${leaderboard()}`;
  return myOutputValue;
};

//Generate leaderboard
function leaderboard(record = "") {
  for (let i = 0; i < scoreRecord.length; i++) {
    record += `Player ${i + 1}: ${scoreRecord[i]}<br>`;
  }
  return record;
}

//Determine winner
function winEvaluation() {
  switch (gameMode) {
    case "H":
      let maxValue = Math.max(...scoreTable);
      let maxIndex = scoreTable.indexOf(maxValue);
      return `Player ${maxIndex + 1} won with ${maxValue}.`;
    case "L":
      let minValue = Math.min(...scoreTable);
      let minIndex = scoreTable.indexOf(maxValue);
      return `Player ${minIndex + 1} won with ${minValue}.`;
  }
}

//Generate a number for player
function playerLogic() {
  currentNumberRolled = rollDice();
  let displayRoll = [...currentNumberRolled];
  sortDiceNumber();
  currentNumber = combineDiceNumber();
  gameMessage = `Welcome Player ${
    playerCounter + 1
  }.<br>You rolled: ${displayRoll}<br>Your number is ${currentNumber}.`;
}

//Insertion sort algorithm
function sortDiceNumber() {
  let i, j, holdIndex;
  switch (gameMode) {
    case "H":
      for (i = 1; i < currentNumberRolled.length; i++) {
        holdIndex = currentNumberRolled[i];
        for (j = i - 1; j >= 0 && currentNumberRolled[j] < holdIndex; j--) {
          currentNumberRolled[j + 1] = currentNumberRolled[j];
        }
        currentNumberRolled[j + 1] = holdIndex;
      }
      break;
    case "L":
      for (i = 1; i < currentNumberRolled.length; i++) {
        holdIndex = currentNumberRolled[i];
        for (j = i - 1; j >= 0 && currentNumberRolled[j] > holdIndex; j--) {
          currentNumberRolled[j + 1] = currentNumberRolled[j];
        }
        currentNumberRolled[j + 1] = holdIndex;
      }
      break;
  }
}

//Concatenate the rolls to form new number
const combineDiceNumber = (concatenatedNumber = "") => {
  for (let i = 0; i < currentNumberRolled.length; i++) {
    concatenatedNumber += currentNumberRolled[i];
  }
  return Number(concatenatedNumber);
};

//Generate rolls from number of dice
const rollDice = (outputArray = []) => {
  for (let i = 0; i < numberOfDice; i++) {
    outputArray.push(Math.floor(Math.random() * 6) + 1);
  }
  return outputArray;
};

//Generates score table
const recordScore = () => {
  scoreTable[playerCounter] += currentNumber;
  scoreRecord[playerCounter] += scoreTable[playerCounter];
};

//Reset game state for next player
const semiResetGame = () => {
  currentNumberRolled = null;
  currentNumber = null;
};

//Reset entire game state
const resetGame = () => {
  currentNumberRolled = null;
  currentNumber = null;
  numberOfDice = null;
  playerCounter = 0;
  for (let i = 0; i < scoreTable.length; i++) {
    scoreTable[i] = 0;
  }
};

// //Fill array function
// function fillArray() {}

// //Find max/min value and index of it
// function evaluate() {}
