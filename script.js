let turn, mode;
let player1Rolls, player2Rolls;
let player1Number, player2Number;
let p1score = 0;
let p2score = 0;

resetGame();

function main(input) {
  var outputValue;
  if (mode === "roll") {
    outputValue = getPlayerRolls(turn);
  } else if (mode === "arrange") {
    if (!isValid(input)) {
      return invalidStatement();
    } else {
      outputValue = arrangedPlayerNumber(turn, input);
      changeTurn();
    }
  } else if (mode === "compare") {
    outputValue = winStatement(player1Number, player2Number) + scoreChart();
    resetGame();
  }
  return outputValue;
}

function getPlayerRolls(turn) {
  var player = generateDiceRolls(2);
  changeMode("arrange");
  if (turn === "Player 1") {
    player1Rolls = player;
  } else if (turn === "Player 2") {
    player2Rolls = player;
  }
  return rollStatement(turn, player);
}

function arrangedPlayerNumber(turn, input) {
  if (turn === "Player 1") {
    player1Number = arrangeNumbers(player1Rolls, input);
    changeMode("roll");
    return arrangedStatement(turn, player1Number);
  } else if (turn === "Player 2") {
    player2Number = arrangeNumbers(player2Rolls, input);
    changeMode("compare");
    return arrangedStatement(turn, player2Number);
  }
}

function resetGame() {
  turn = "Player 1";
  mode = "roll";
  player1Rolls = [];
  player2Rolls = [];
  player1Number = 0;
  player2Number = 0;
}

function changeTurn() {
  if (turn === "Player 1") {
    turn = "Player 2";
  } else {
    turn = "Player 1";
  }
}
function changeMode(inputMode) {
  mode = inputMode;
}

function rollStatement(name, rolls) {
  return `${name}'s rolls: ${rolls} <br><br>
  Which number would you like to be first?<br>
  Type "1" for dice 1 and "2" for dice 2.`;
}

function arrangedStatement(name, number) {
  return `${name}'s number: ${number}<br><br>
  Click "Submit" to continue.`;
}

function scoreChart() {
  var score = "<br><br>Leaderboard:<br>";
  if (p1score > p2score) {
    score += `Player 1: ${p1score}<br>Player 2: ${p2score}`;
  } else {
    score += `Player 2: ${p2score}<br>Player 1: ${p1score}`;
  }
  return score;
}

function winStatement(p1, p2) {
  var result = `Player 1: ${p1}, Player 2: ${p2}`;
  if (p1 === p2) {
    result += `<br><br>It's a Draw!`;
  } else if (p1 > p2) {
    result += `<br><br>Player 1 wins!`;
    p1score += 1;
  } else {
    result += `<br><br>Player 2 wins!`;
    p2score += 1;
  }
  return result + `<br>Click "Submit" to play again.`;
}

function invalidStatement() {
  return `Please enter "1" for dice 1 or "2" for dice 2 to decide the order!`;
}

function generateDiceRolls(noOfRolls) {
  let rolls = [];
  for (i = 0; i < noOfRolls; i += 1) {
    rolls.push(diceRoll(6));
  }
  return rolls;
}

function diceRoll(number) {
  return Math.ceil(Math.random() * number);
}

function arrangeNumbers(rolls, selection) {
  if (selection === "1") {
    return String(rolls[0]) + String(rolls[1]);
  } else {
    return String(rolls[1]) + String(rolls[0]);
  }
}

function isValid(input) {
  return input == 1 || input == 2;
}
