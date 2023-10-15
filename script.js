//Declare Global Variables
let currentNumberRolled,
  gameMessage,
  player1Number = 0,
  player2Number = 0,
  scoreTable = [0, 0],
  scoreTableSorted = [0, 0],
  playerIndexSortX = 1,
  playerIndexSortY = 2,
  gameMode;

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
        gameMessage = `${gameMode} mode chosen`;
        break;
      default:
        gameMessage = "Invalid input, choose H or L for game mode.";
    }
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
  currentNumberRolled = rollTwoDice();
  player1Number = combineDiceNumber();
  gameMessage = `Welcome Player 1.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Your number is ${player1Number}.<br>It is now Player 2's turn.`;
}

//Plays game for player 2
function player2Logic() {
  currentNumberRolled = rollTwoDice();
  player2Number = combineDiceNumber();
  gameMessage = `Welcome Player 2.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Your number is ${player2Number}.<br>Press sumbmit to reveal winner.`;
}

//Generate 2 numbers from dice roll
let rollTwoDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

//Concatenate the rolls to form new number
function combineDiceNumber() {
  switch (gameMode) {
    case "H":
      return currentNumberRolled[0] > currentNumberRolled[1]
        ? Number(`${currentNumberRolled[0]}` + `${currentNumberRolled[1]}`)
        : Number(`${currentNumberRolled[1]}` + `${currentNumberRolled[0]}`);
    case "L":
      return currentNumberRolled[0] < currentNumberRolled[1]
        ? Number(`${currentNumberRolled[0]}` + `${currentNumberRolled[1]}`)
        : Number(`${currentNumberRolled[1]}` + `${currentNumberRolled[0]}`);
    default:
      console.log("error in combineDiceNumber()");
  }
}
