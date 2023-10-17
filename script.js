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
function main(input, myOutputValue) {
  if (numberOfDice && numberOfPlayers && gameMode) {
    playerCounter < numberOfPlayers
      ? (playerRound(), semiResetGame(), playerCounter++)
      : ((gameMessage = `Game Ended.<br>${winEvaluation()}`), resetGame());
  } else if (!gameMode) {
    switch (input) {
      case "H":
      case "L":
        gameMode = input;
        gameMessage = `${gameMode} mode chosen. Enter the number of dice (integer).`;
        break;
      default:
        gameMessage = "Invalid input, choose H or L for game mode.";
    }
  } else if (!numberOfDice) {
    Number.isInteger(Number(input)) && Number(input) > 0
      ? ((numberOfDice = Number(input)),
        (gameMessage = `${numberOfDice} dice selected, enter the number of players (integer).`))
      : (gameMessage = "Invalid input, enter the number of dice (integer).");
  } else if (!numberOfPlayers) {
    Number.isInteger(Number(input)) && Number(input) > 0
      ? ((numberOfPlayers = Number(input)),
        (scoreTable = fillArrays(numberOfPlayers)),
        ((scoreRecord = fillArrays(numberOfPlayers)),
        (gameMessage = `${numberOfPlayers} players selected, press submit to play.`)))
      : (gameMessage = "Invalid input, enter the number of players (integer).");
  } else gameMessage = "Error in main function.";
  sortLeaderboard();
  myOutputValue = gameMessage + `<br><br>${displaySortedLeaderboard()}`;
  return myOutputValue;
}

//Generate a number for player and record score
function playerRound() {
  currentNumberRolled = rollDice(numberOfDice);
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
function rollDice(x) {
  let outputArray = [];
  for (let i = 0; i < x; i++) {
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
  let record = "";
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
      }
      break;
  }
}

//Find max/min value and index of it
function winEvaluation() {
  switch (gameMode) {
    case "H":
      let maxValue = Math.max(...scoreTable);
      let maxIndex = scoreTable.indexOf(maxValue);
      return `Player ${maxIndex + 1} won this round with ${maxValue}.`;
    case "L":
      let minValue = Math.min(...scoreTable);
      let minIndex = scoreTable.indexOf(minValue);
      return `Player ${minIndex + 1} won this round with ${minValue}.`;
  }
}

// //Find max/min value and index of it
// function winEvaluate() {
//   switch (gameMode) {
//     case "H":
//       let maxIndex = 0;
//       for (let i = 1; i < scoreTable.length; i++) {
//         if (scoreTable[i] > scoreTable[maxIndex]) {
//           maxIndex = i;
//         }
//       }
//       let maxValue = scoreTable[maxIndex];
//       return `Player ${maxIndex + 1} won this round with ${maxValue}.`;
//     case "L":
//       let minIndex = 0;
//       for (let i = 1; i < scoreTable.length; i++) {
//         if (scoreTable[i] < scoreTable[minIndex]) {
//           minIndex = i;
//         }
//       }
//       let minValue = scoreTable[minIndex];
//       return `Player ${minIndex + 1} won this round with ${minValue}.`;
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
const fillArrays = (x) => Array(x).fill(0);

// //Fill array function
// function fillScoreArrays() {
//   for (let i = 0; i < numberOfPlayers; i++) {
//     scoreTable.push(0);
//     scoreRecord.push(0);
//   }
// }
