//Declare Global Variables
let currentNumberRolled,
  gameMessage,
  player1Number = 0,
  player2Number = 0,
  currentDiceOrder,
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
    player1Logic(input);
  } else if (gameMode && !player2Number) {
    player2Logic(input);
  }
  myOutputValue =
    gameMessage +
    `<br><br>Player ${playerIndexSortX} score: ${scoreTableSorted[0]}<br>Player ${playerIndexSortY} score: ${scoreTableSorted[1]}`;
  return myOutputValue;
};

//Generate 2 numbers from dice roll
let rollTwoDice = () => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

//Concatenate the rolls to form new number
function combineDiceNumber() {
  switch (currentDiceOrder) {
    case 1:
      return Number(`${currentNumberRolled[0]}` + `${currentNumberRolled[1]}`);
    case 2:
      return Number(`${currentNumberRolled[1]}` + `${currentNumberRolled[0]}`);
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
    case "L":
      gameMessage =
        player1Number < player2Number
          ? `Winner is Player 1 with ${player1Number} over Player 2 with ${player2Number}.`
          : player1Number > player2Number
          ? `Winner is Player 2 with ${player2Number} over Player 1 with ${player1Number}.`
          : player1Number == player2Number
          ? `It is a draw with both players getting ${player1Number}.`
          : `Error with evaluating winner.`;
  }
}

//Reset entire game state
function resetGame() {
  player1Number = null;
  player2Number = null;
  currentDiceOrder = null;
  currentNumberRolled = null;
}

//Reset game state for next player
function semiResetGame() {
  currentDiceOrder = null;
  currentNumberRolled = null;
}

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

//Plays game for player 1
function player1Logic(input) {
  if (!currentNumberRolled) {
    currentNumberRolled = rollTwoDice();
    gameMessage = `Welcome Player 1.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first`;
  } else if (currentNumberRolled) {
    switch (input) {
      case "1":
      case "2":
        currentDiceOrder = Number(input);
        player1Number = combineDiceNumber();
        gameMessage = `Player 1, you chose Dice ${currentDiceOrder} first.<br>Your number is ${player1Number}.<br>It is now Player 2's turn.`;
        semiResetGame();
        break;
      default:
        gameMessage = `Invalid input.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
    }
  }
}
//Plays game for player 2
function player2Logic(input) {
  if (!currentNumberRolled) {
    currentNumberRolled = rollTwoDice();
    gameMessage = `Welcome Player 2.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
  } else if (currentNumberRolled) {
    switch (input) {
      case "1":
      case "2":
        currentDiceOrder = Number(input);
        player2Number = combineDiceNumber();
        gameMessage = `Player 2, you chose Dice ${currentDiceOrder} first.<br>Your number is ${player2Number}. Press sumbmit to reveal winner.`;
        break;
      default:
        gameMessage = `Invalid input.<br>You rolled ${currentNumberRolled[0]} for Dice 1 and ${currentNumberRolled[1]} for Dice 2.<br>Choose the order of the dice, type "1" for Dice 1 first and type "2" for Dice 2 first.`;
    }
  }
}
