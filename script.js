//Declare Global Variables
let gameMode,
  numberOfDice,
  numberOfPlayers,
  gameMessage,
  currentNumberRolled = [],
  scoreTable = [],
  scoreRecord = [],
  scoreRecordSorted = [],
  playerCounter = 0;

//Main Function
let main = function (input, myOutputValue) {
  if (numberOfDice && numberOfPlayers && gameMode) {
    if (playerCounter < numberOfPlayers) {
      playerRound();
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
  sortLeaderboard();
  myOutputValue = gameMessage + `<br><br>${displaySortedLeaderboard()}`;
  return myOutputValue;
};

//Generate a number for player and record score
function playerRound() {
  currentNumberRolled = rollDice();
  let displayRoll = [...currentNumberRolled];
  sortDiceNumber();
  let currentNumber = combineDiceNumber();
  scoreTable[playerCounter] += currentNumber;
  scoreRecord[playerCounter] += scoreTable[playerCounter];
  gameMessage = `Welcome Player ${
    playerCounter + 1
  }.<br>You rolled: ${displayRoll}<br>Your number is ${currentNumber}.`;
}

//Generate rolls from number of dice
function rollDice() {
  let outputArray = [];
  for (let i = 0; i < numberOfDice; i++) {
    outputArray.push(Math.floor(Math.random() * 6) + 1);
  }
  return outputArray;
}

//Insertion sort algorithm for dice number
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
function combineDiceNumber() {
  let concatenatedNumber = "";
  for (let i = 0; i < currentNumberRolled.length; i++) {
    concatenatedNumber += currentNumberRolled[i];
  }
  return Number(concatenatedNumber);
}

//Generate leaderboard from highest to lowest
function displaySortedLeaderboard() {
  record = "";
  for (let [player, score] of scoreRecordSorted) {
    record += `Player ${Number(player) + 1}: ${score}<br>`;
  }
  return record;
}

//Insertion Sort for leaderboard
function sortLeaderboard() {
  let i, j, holdIndex;
  scoreRecordSorted = Object.entries({ ...scoreRecord });
  switch (gameMode) {
    case "H":
      for (i = 1; i < scoreRecordSorted.length; i++) {
        holdIndex = scoreRecordSorted[i];
        for (j = i - 1; j >= 0 && scoreRecordSorted[j][1] < holdIndex[1]; j--) {
          scoreRecordSorted[j + 1] = scoreRecordSorted[j];
        }
        scoreRecordSorted[j + 1] = holdIndex;
      }
      break;
    case "L":
      for (i = 1; i < scoreRecordSorted.length; i++) {
        holdIndex = scoreRecordSorted[i];
        for (j = i - 1; j >= 0 && scoreRecordSorted[j][1] > holdIndex[1]; j--) {
          scoreRecordSorted[j + 1] = scoreRecordSorted[j];
        }
        scoreRecordSorted[j + 1] = holdIndex;
        break;
      }
  }
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

// //Find max/min value and index of it
// function winEvaluate() {
//   switch (gameMode) {
//     case "H":
//       let maxIndex = 0;
//       for (let i = 1; i < scoreTable.length; i++) {
//         if (scoreTable[i] > scoreRecord[maxIndex]) {
//           maxIndex = i;
//         }
//       }
//       let maxValue = scoreRecord[maxIndex];
//       return `Player ${maxIndex + 1} won with ${maxValue}.`;
//     case "L":
//       let minIndex = 0;
//       for (let i = 1; i < scoreTable.length; i++) {
//         if (scoreTable[i] < scoreRecord[minIndex]) {
//           minIndex = i;
//         }
//       }
//       let minValue = scoreRecord[minIndex];
//       return `Player ${minIndex + 1} won with ${minValue}.`;
//   }
// }

//Reset game state for next player
const semiResetGame = () => (currentNumberRolled = null);

//Reset entire game state
function resetGame() {
  currentNumberRolled = null;
  numberOfDice = null;
  playerCounter = 0;
  for (let i = 0; i < scoreTable.length; i++) {
    scoreTable[i] = 0;
  }
}

//Fill array function
// function fillScoreArrays() {
//   for (let i = 0; i < numberOfPlayers; i++) {
//     scoreTable.push(0);
//     scoreRecord.push(0);
//   }
// }
