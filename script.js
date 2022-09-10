var leaderBoard = {
  "Player 1": 0,
  "Player 2": 0,
};

var main = function (dice, mode) {
  setTimeout(function () {
    updateOutput(playGame(dice, mode));
  }, 1500);
  return `Rolling ${dice} dice... <br> <img src="https://thumbs.gfycat.com/SecondTartCygnet-max-1mb.gif" alt="Something's happening, give it a sec..."  height="150" />`;
};

var playGame = function (dice, mode) {
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

  if (mode == "lowest-combined") {
    player1Num = lowestCombinedMode(player1Roll);
    player2Num = lowestCombinedMode(player2Roll);
  }

  if (mode == "highest-combined") {
    player1Num = highestCombinedMode(player1Roll);
    player2Num = highestCombinedMode(player2Roll);
  }

  var playerRolls = `Player 1 rolled ${player1Num} and Player 2 rolled ${player2Num}.`;
  if (player1Num > player2Num) {
    var winner = "Player 1";
  }
  if (player1Num < player2Num) {
    var winner = "Player 2";
  }
  if (player1Num == player2Num) {
    return `It's a draw! Roll again. <br> <img src="https://i.gifer.com/1Jxj.gif" alt="Shrug"  height="150" />`;
  }
  var result = `${playerRolls} ${winner} wins! <br> <img src="https://i.pinimg.com/originals/00/24/b9/0024b92df56e60d2706ed908b31ad870.gif" alt="Congrats to the winner!"  height="150" />`;
  updateLeaderboard(winner);
  console.log(leaderBoard);
  return result;
};

// Combine dice rolls into largest possible integer
var highestCombinedMode = function (rolls) {
  playerNum = parseInt(rolls.sort().reverse().join(""));
  return playerNum;
};

// Combine dice rolls into smallest possible integer
var lowestCombinedMode = function (rolls) {
  playerNum = parseInt(rolls.sort().join(""));
  return playerNum;
};

// Generate random number between 1 and 6
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

// Overwrite "rolling..." with round outcome
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
