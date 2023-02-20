// Global variables to track game mode, players' dice rolls and cumulative score
let gameMode = "player"; // other states: 'roll1', 'roll2, 'result', 'end'
let players = [1, 2];
let diceRolls = 0;

let p1DiceRolls = [];
let p1SortedDiceRolls = [];
let p1Result;
let p1Score = [];

let p2DiceRolls = [];
let p2SortedDiceRolls = [];
let p2Result;
let p2Score = [];

let btn = document.getElementById("submit-button");

// Main function

const main = function (input) {
  if (gameMode === "player") {
    if(!isValid(input)) {
      return 'Invalid entry. Please try again.'
    } else {
      diceRolls = input;
      gameMode = "roll1";
      btn.innerText = 'Roll the dice'
      return `Each player will roll ${input} dice. Player 1 - roll the dice to begin.`
    }
  }

  else if (gameMode === "roll1") {
    runRollLogic();
    generateOptimalNum();
    gameMode = 'roll2'
    return displayRollMessage();
  }

  else if (gameMode === "roll2") {
    runRollLogic();
    generateOptimalNum();
    gameMode = 'result'
    btn.innerText = "Show the winner";
    return displayRollMessage();
  }

  else if (gameMode === 'result') {
    gameMode = "end";
    btn.innerText = "Show leaderboard";
    updateScore();
    return displayWinnerMessage();
  }

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

function displayRollMessage() {
  if (gameMode === "roll2") {
    return `Welcome Player 1.<br><br>You rolled the following dice: ${p1DiceRolls}.<br><br>The optimal combined number based on your rolls is ${p1Result}.<br><br> Player 2, roll the dice.`;
  } 
  
  else if (gameMode === "result") {
    return `Welcome Player 2.<br><br>You rolled the following dice: ${p2DiceRolls}.<br><br>The optimal combined number based on your rolls is ${p2Result}`;
  }
}

function displayWinnerMessage() {
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
    return `Leaderboard: <br><br> Player 1's cumulative score: ${p1Total}<br>Player 2's cumulative score: ${p2Total}<br><br><strong>Player 1</strong> is leading!<br><br>Enter the no. of dice to roll to play again.`;
  } else {
    return `Leaderboard: <br><br> Player 2's cumulative score: ${p2Total}<br>Player 1's cumulative score: ${p1Total}<br><br><strong>Player 2</strong> is leading!<br><br> Enter the no. of dice to roll to play again.`;
  }
}

function restartRound() {
  gameMode = "player";
  diceRolls = null;
  p1DiceRolls = [];
  p1SortedDiceRolls = [];
  p1Result = 0;
  p2DiceRolls = [];
  p2SortedDiceRolls = [];
  p2Result = 0;
}

function isValid(num) {
  return num >= 1
}

function runRollLogic() {
  for (let i = 0; i < diceRolls; i++) {
    if (gameMode === "roll1") {
      p1DiceRolls.push(Number(getDiceRoll()));
      p1SortedDiceRolls = p1DiceRolls.slice()
    } else if (gameMode === "roll2") {
      p2DiceRolls.push(Number(getDiceRoll()));
      p2SortedDiceRolls = p2DiceRolls.slice();
    }
  }
}

function compareNums (a, b) {
  return b - a
}

function generateOptimalNum() {
  if (gameMode === 'roll1') {
    p1SortedDiceRolls = p1SortedDiceRolls.sort(compareNums);
    p1Result = Number(p1SortedDiceRolls.join(""));
  }
 else if (gameMode === 'roll2') {
    p2SortedDiceRolls = p2SortedDiceRolls.sort(compareNums);
    p2Result = Number(p2SortedDiceRolls.join(""));
  }
}
