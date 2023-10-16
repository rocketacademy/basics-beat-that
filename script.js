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
      gameMessage = `Game Ended.`;
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
      gameMessage = `${numberOfDice} dice selected, Type in the number of players (integer).`;
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
  myOutputValue = gameMessage + `<br><br>${scoreRecord}`;
  return myOutputValue;
};

function playerLogic() {
  currentNumberRolled = rollDice();
  let displayRoll = `${currentNumberRolled}`;
  sortDiceNumber();
  currentNumber = combineDiceNumber();
  gameMessage = `You rolled: ${displayRoll}<br>Your number is ${currentNumber}.`;
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

//Generate X numbers from dice roll
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

// //Compare both numbers to determine winner
// function evalutateWinner() {
//   switch (gameMode) {
//     case "H":
//       gameMessage =
//         player1Number > player2Number
//           ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
//           : player1Number < player2Number
//           ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
//           : player1Number == player2Number
//           ? `It is a draw with both players getting ${player1Number}.`
//           : `Error with evaluating winner.`;
//       break;
//     case "L":
//       gameMessage =
//         player1Number < player2Number
//           ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
//           : player1Number > player2Number
//           ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
//           : player1Number == player2Number
//           ? `It is a draw with both players getting ${player1Number}.`
//           : `Error with evaluating winner.`;
//       break;
//     default:
//       console.log("error in evaluateWinner()");
//   }
// }

// //Records total score
// function scoreRecord() {
//   scoreTable[0] += player1Number;
//   scoreTable[1] += player2Number;
// }

// //Bubble Sort for 2 players only
// function leaderboard() {
//   if (scoreTable[0] < scoreTable[1]) {
//     scoreTableSorted[0] = scoreTable[1];
//     scoreTableSorted[1] = scoreTable[0];
//   } else {
//     scoreTableSorted[0] = scoreTable[0];
//     scoreTableSorted[1] = scoreTable[1];
//   }
//   if (scoreTable[1] == scoreTableSorted[0]) {
//     playerIndexSortX = 2;
//     playerIndexSortY = 1;
//   } else {
//     playerIndexSortX = 1;
//     playerIndexSortY = 2;
//   }
//   return `<br><br>Player ${playerIndexSortX} score: ${scoreTableSorted[0]}<br>Player ${playerIndexSortY} score: ${scoreTableSorted[1]}`;
// }
