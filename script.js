var leaderBoard = {
  "Player 1": 0,
  "Player 2": 0,
};

var main = function (dice, mode) {
  if (mode == "highest-combined") {
    setTimeout(function () {
      updateOutput(highestCombinedMode(dice));
    }, 1000);
    return `Rolling ${dice} dice...`;
  }

  if (mode == "lowest-combined") {
    setTimeout(function () {
      updateOutput(lowestCombinedMode(dice));
    }, 1000);
    return `Rolling ${dice} dice...`;
  }
};

var highestCombinedMode = function (dice) {
  var player1Roll = [];
  var player2Roll = [];
  counter = 0;
  while (counter < dice) {
    player1Roll.push(rollDice());
    player2Roll.push(rollDice());
    counter += 1;
  }
  console.log(`Player 1 rolled ${player1Roll}`);
  console.log(`Player 2 rolled ${player2Roll}`);
  // Convert player's dice rolls into the largest possible int
  player1Num = parseInt(player1Roll.sort().reverse().join(""));
  player2Num = parseInt(player2Roll.sort().reverse().join(""));
  var playerRolls = `Player 1 rolled ${player1Num} and Player 2 rolled ${player2Num}.`;
  if (player1Num > player2Num) {
    var winner = "Player 1";
  }
  if (player1Num < player2Num) {
    var winner = "Player 2";
  }
  if (player1Num == player2Num) {
    return "It's a draw! Roll again.";
  }
  var result = `${playerRolls} ${winner} wins!`;
  updateLeaderboard(winner);
  console.log(leaderBoard);
  return result;
};

var lowestCombinedMode = function (dice) {
  var player1Roll = [];
  var player2Roll = [];
  counter = 0;
  while (counter < dice) {
    player1Roll.push(rollDice());
    player2Roll.push(rollDice());
    counter += 1;
  }
  console.log(`Player 1 rolled ${player1Roll}`);
  console.log(`Player 2 rolled ${player2Roll}`);
  // Convert player's dice rolls into the largest possible int
  player1Num = parseInt(player1Roll.sort().join(""));
  player2Num = parseInt(player2Roll.sort().join(""));
  var playerRolls = `Player 1 rolled ${player1Num} and Player 2 rolled ${player2Num}.`;
  if (player1Num > player2Num) {
    var winner = "Player 1";
  }
  if (player1Num < player2Num) {
    var winner = "Player 2";
  }
  if (player1Num == player2Num) {
    return "It's a draw! Roll again.";
  }
  var result = `${playerRolls} ${winner} wins!`;
  updateLeaderboard(winner);
  console.log(leaderBoard);
  return result;
};

var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var updateOutput = function (input) {
  var outputBox = document.querySelector("#output-div");
  outputBox.innerHTML = input;
};

var updateLeaderboard = function (winner) {
  leaderBoard[winner] += 1;
  var player1Score = document.querySelector("#player-1-wins");
  var player2Score = document.querySelector("#player-2-wins");
  player1Score.innerHTML = `Player 1: ${leaderBoard["Player 1"]}`;
  player2Score.innerHTML = `Player 2: ${leaderBoard["Player 2"]}`;
};

var timeout = function () {
  timeout = setTimeout(highestCombinedMode(), 3000);
};
