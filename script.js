var players = 2;
var leaderBoard = {};

var main = function (players, dice, mode) {
  setTimeout(function () {
    updateOutput(playGame(players, dice, mode));
  }, 1500);
  return `Rolling ${dice} dice... <br> <img src="https://thumbs.gfycat.com/SecondTartCygnet-max-1mb.gif" alt="Something's happening, give it a sec..."  height="150" />`;
};

var playGame = function (players, dice, mode) {
  var playersRolls = [];
  var playersCounter = 0;
  while (playersCounter < players) {
    var playerRolls = [];
    var diceCounter = 0;
    while (diceCounter < dice) {
      playerRolls.push(rollDice());
      diceCounter += 1;
    }
    playersRolls.push(playerRolls);
    playersCounter += 1;
    console.log(`A player just rolled ${playerRolls}`);
  }
  console.log(`Dice rolls ${playersRolls}`);

  if (mode == "lowest-combined") {
    var playersRollsCombined = lowestCombinedMode(playersRolls);
  }

  if (mode == "highest-combined") {
    var playersRollsCombined = highestCombinedMode(playersRolls);
  }
  console.log(`everyone's score: ${playersRollsCombined}`);

  var winningScore = Math.max(...playersRollsCombined);
  winningPlayer =
    "Player " + (playersRollsCombined.indexOf(winningScore.toString()) + 1);

  if ([...new Set(playersRollsCombined)].length < playersRollsCombined.length) {
    return `Your scores are ${playersRollsCombined}. It's a draw! Roll again. <br> <img src="https://i.gifer.com/1Jxj.gif" alt="Shrug"  height="150" />`;
  }

  var result = `Your scores are ${playersRollsCombined}. ${winningPlayer} wins! <br> <img src="https://i.pinimg.com/originals/00/24/b9/0024b92df56e60d2706ed908b31ad870.gif" alt="Congrats to the winner!"  height="150" />`;
  console.log(leaderBoard);
  updateLeaderboard(winningPlayer);
  return result;
};

// Combine dice rolls into largest possible integer
var highestCombinedMode = function (playersRolls) {
  var combined = [];
  var counter = 0;
  while (counter < playersRolls.length) {
    combined.push(playersRolls[counter].sort().reverse().join(""));
    counter += 1;
  }
  return combined;
};

// Combine dice rolls into smallest possible integer
var lowestCombinedMode = function (playersRolls) {
  var combined = [];
  var counter = 0;
  while (counter < playersRolls.length) {
    combined.push(playersRolls[counter].sort().join(""));
    counter += 1;
  }
  return combined;
};

// Generate random number between 1 and 6
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

// Overwrite "rolling..." with the outcome of the round
var updateOutput = function (input) {
  var outputBox = document.querySelector("#output-div");
  outputBox.innerHTML = input;
};

var generateLeaderboard = function (players) {
  var counter = 0;
  var leaderBoard = {};
  while (counter < players) {
    leaderBoard[`Player ${counter + 1}`] = 0;
    counter += 1;
  }
  return leaderBoard;
};

var updateLeaderboard = function (winningPlayer) {
  leaderBoard[winningPlayer] += 1;
  var scoreSpace = document.querySelector("#scores");
  var output = "";
  for (var entry in leaderBoard) {
    output += `${entry}: ${leaderBoard[entry]}<br>`;
  }
  scoreSpace.innerHTML = output;
};
