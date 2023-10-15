//Declare Global Variables
let currentNumberRolled = [],
  gameMessage,
  player1Number = 0,
  player2Number = 0,
  scoreTable = [0, 0],
  scoreTableSorted = [0, 0],
  playerIndexSortX = 1,
  playerIndexSortY = 2,
  gameMode,
  numberOfDice;

//Main Function
let main = function (input, myOutputValue) {
  if (player1Number && player2Number) {
    evalutateWinner();
    scoreRecord();
    leaderboard();
    resetGame();
  } else if (!gameMode) {
    switch (input) {
      case "H":
      case "L":
        gameMode = input;
        gameMessage = `${gameMode} mode chosen. Type in the number of dice (interger) to roll`;
        break;
      default:
        gameMessage = "Invalid input, choose H or L for game mode.";
    }
  } else if (!numberOfDice) {
    if (Number.isInteger(Number(input)) && Number(input) > 0) {
      numberOfDice = input;
      gameMessage = `${numberOfDice} dice selected, press submit to play.`;
    } else
      gameMessage =
        "Invalid input, type in the number of dice (interger) to roll";
  } else if (gameMode && !player1Number) {
    player1Logic();
    semiResetGame();
  } else if (gameMode && !player2Number) {
    player2Logic();
  }
  myOutputValue =
    gameMessage +
    `<br><br>Player ${playerIndexSortX} score: ${scoreTableSorted[0]}<br>Player ${playerIndexSortY} score: ${scoreTableSorted[1]}`;
  return myOutputValue;
};

//Reset game state for next player
const semiResetGame = () => (currentNumberRolled = null);

//Reset entire game state
const resetGame = () => {
  player1Number = null;
  player2Number = null;
  currentNumberRolled = null;
  numberOfDice = null;
};

//Records total score
function scoreRecord() {
  scoreTable[0] += player1Number;
  scoreTable[1] += player2Number;
}

//Bubble Sort for 2 players only
function leaderboard() {
  if (scoreTable[0] < scoreTable[1]) {
    scoreTableSorted[0] = scoreTable[1];
    scoreTableSorted[1] = scoreTable[0];
  } else {
    scoreTableSorted[0] = scoreTable[0];
    scoreTableSorted[1] = scoreTable[1];
  }
  if (scoreTable[1] == scoreTableSorted[0]) {
    playerIndexSortX = 2;
    playerIndexSortY = 1;
  } else {
    playerIndexSortX = 1;
    playerIndexSortY = 2;
  }
}

//Compare both numbers to determine winner
function evalutateWinner() {
  switch (gameMode) {
    case "H":
      gameMessage =
        player1Number > player2Number
          ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
          : player1Number < player2Number
          ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
          : player1Number == player2Number
          ? `It is a draw with both players getting ${player1Number}.`
          : `Error with evaluating winner.`;
      break;
    case "L":
      gameMessage =
        player1Number < player2Number
          ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
          : player1Number > player2Number
          ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
          : player1Number == player2Number
          ? `It is a draw with both players getting ${player1Number}.`
          : `Error with evaluating winner.`;
      break;
    default:
      console.log("error in evaluateWinner()");
  }
}

//Plays game for player 1
function player1Logic() {
  currentNumberRolled = rollDice();
  const displayRoll = "" + currentNumberRolled;
  sortDiceNumber();
  player1Number = combineDiceNumber();
  gameMessage = `Welcome Player 1.<br>You rolled: ${displayRoll}<br>Your number is ${player1Number}.<br><br>It is now Player 2's turn.`;
}

//Plays game for player 2
function player2Logic() {
  currentNumberRolled = rollDice();
  const displayRoll = "" + currentNumberRolled;
  sortDiceNumber();
  player2Number = combineDiceNumber();
  gameMessage = `Welcome Player 2.<br>You rolled: ${displayRoll}<br>Your number is ${player2Number}.<br><br>Press sumbmit to reveal winner.`;
}

//Generate X numbers from dice roll
function rollDice() {
  let outputArray = [];
  for (let i = 0; i < numberOfDice; i++) {
    outputArray.push(Math.floor(Math.random() * 6) + 1);
  }
  return outputArray;
}

//Concatenate the rolls to form new number with insertion sort algorithm
function combineDiceNumber() {
  let outputNumber = "";
  for (let i = 0; i < currentNumberRolled.length; i++) {
    outputNumber += currentNumberRolled[i];
  }
  return Number(outputNumber);
}

//Insertion sort algorithm
function sortDiceNumber() {
  let i, j;
  switch (gameMode) {
    case "H":
      for (i = 1; i < currentNumberRolled.length; i++) {
        let holdIndex = currentNumberRolled[i];
        for (j = i - 1; j >= 0 && currentNumberRolled[j] < holdIndex; j--) {
          currentNumberRolled[j + 1] = currentNumberRolled[j];
        }
        currentNumberRolled[j + 1] = holdIndex;
      }
      break;
    case "L":
      for (i = 1; i < currentNumberRolled.length; i++) {
        let holdIndex = currentNumberRolled[i];
        for (j = i - 1; j >= 0 && currentNumberRolled[j] > holdIndex; j--) {
          currentNumberRolled[j + 1] = currentNumberRolled[j];
        }
        currentNumberRolled[j + 1] = holdIndex;
      }
      break;
  }
}
