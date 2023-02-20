// Global variables to track game mode and players' dice rolls
let gameMode = "roll1"; // other states: 'order1', 'roll2', 'order2', 'result', 'end'
let players = [1, 2];

let p1DiceRolls = [];
let p1Result;
let p1Score = [];

let p2DiceRolls = [];
let p2Result;
let p2Score = [];

let btn = document.getElementById("submit-button");

// Main function

const main = function (input) {
  // Player 1 rolls 2 dice => return dice values and message

  if (gameMode === "roll1") {
    runRollLogic();
    gameMode = "order1";
    btn.innerText = "Get number";
    return displayRollMessage();
  }

  // Player 1 selects order of dice => return result and message
  else if (gameMode === "order1") {
    if (!isValid(input)) {
      return `Invalid entry. Please select the order of your dice with '1' or '2'.`;
    } else {
      runOrderLogic(input);
      gameMode = "roll2";
      btn.innerText = "Roll the dice";
      return displayOrderMessage(input);
    }
  }

  // Repeat same logic for Player 2
  else if (gameMode === "roll2") {
    runRollLogic();
    gameMode = "order2";
    btn.innerText = "Get number";
    return displayRollMessage();
  } else if (gameMode === "order2") {
    if (!isValid(input)) {
      return `Invalid entry. Please select the order of your dice with '1' or '2'.`;
    } else {
      runOrderLogic(input);
      gameMode = "result";
      btn.innerText = "Show the winner";
      return displayOrderMessage(input);
    }
  }

  // Compare player results and determine winner
  else if (gameMode === "result") {
    gameMode = "end";
    btn.innerText = "Show leaderboard";
    updateScore();
    return displayWinnerMessage(input);
  }

  // Restart round
  else if (gameMode === "end") {
    restartRound();
    btn.innerText = "Roll the dice";
    return showLeaderBoard();
  }
};

// Helper Functions

function getDiceRoll() {
  return Math.ceil(Math.random() * 6);
}

function updatePlayerDiceRoll(dice1, dice2) {
  if (gameMode === "roll1") {
    p1DiceRolls.push(String(dice1), String(dice2));
  } else if (gameMode === "roll2") {
    p2DiceRolls.push(String(dice1), String(dice2));
  }
}

function displayRollMessage() {
  if (gameMode === "order1") {
    return `Welcome Player 1.<br><br>You rolled ${p1DiceRolls[0]} for Dice 1 and ${p1DiceRolls[1]} for Dice 2.<br><br>Choose the order of the combined dice number by entering '1' or '2'.`;
  } else if (gameMode === "order2") {
    return `Welcome Player 2.<br><br>You rolled ${p2DiceRolls[0]} for Dice 1 and ${p2DiceRolls[1]} for Dice 2.<br><br>Choose the order of the combined dice number by entering '1' or '2'.`;
  }
}

function isValid(number) {
  return number === "1" || number === "2";
}

function runOrderLogic(order) {
  if (gameMode === "order1") {
    if (order === "1") {
      p1Result = Number(p1DiceRolls[0] + p1DiceRolls[1]);
    } else {
      p1Result = Number(p1DiceRolls[1] + p1DiceRolls[0]);
    }
  } else if (gameMode === "order2") {
    if (order === "1") {
      p2Result = Number(p2DiceRolls[0] + p2DiceRolls[1]);
    } else {
      p2Result = Number(p2DiceRolls[1] + p2DiceRolls[0]);
    }
  }
}

function displayOrderMessage(order) {
  if (gameMode === "roll2") {
    return `Player ${players[0]}, you chose Dice ${order} first.<br><br>Your number is ${p1Result}.<br><br> It is now Player ${players[1]}'s turn.`;
  } else if (gameMode === "result") {
    return `Player ${players[1]}, you chose Dice ${order} first.<br><br>Your number is ${p2Result}.`;
  }
}

function displayWinnerMessage(input) {
  if (p1Result > p2Result) {
    return `Player 1's number is ${p1Result} and Player 2's number is ${p2Result}.<br><br> Player 1 wins!`;
  } else if (p1Result === p2Result) {
    return `It's a draw!`;
  } else {
    return `Player 1's number is ${p1Result} and Player 2's number is ${p2Result}.<br><br> Player 2 wins!`;
  }
}

function updateScore() {
  p1Score.push(p1Result);
  p2Score.push(p2Result);
}

function showLeaderBoard() {
  let p1Total = p1Score.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  let p2Total = p2Score.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  if (p1Total > p2Total) {
    return `Leaderboard: <br><br> Player 1's cumulative score: ${p1Total}<br>Player 2's cumulative score: ${p2Total}<br><br><strong>Player 1</strong> is leading!<br><br>Player 1, roll the dice to play again.`;
  } else {
    return `Leaderboard: <br><br> Player 2's cumulative score: ${p2Total}<br>Player 1's cumulative score: ${p1Total}<br><br><strong>Player 2</strong> is leading!<br><br>Player 1, roll the dice to play again.`;
  }
}

function restartRound() {
  gameMode = "roll1";
  p1DiceRolls = [];
  p1Result = 0;
  p2DiceRolls = [];
  p2Result = 0;
}

// Consolidation functions

function runRollLogic() {
  let dice1 = getDiceRoll();
  let dice2 = getDiceRoll();
  updatePlayerDiceRoll(dice1, dice2);
}
