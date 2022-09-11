var players = 2;
var leaderBoard = {};

var main = function (players, dice, mode) {
  setTimeout(function () {
    updateOutput(normalGame(players, dice, mode));
  }, 1500);
  return `Rolling ${dice} dice for each player... <br> <img src="https://thumbs.gfycat.com/SecondTartCygnet-max-1mb.gif" alt="Something's happening, give it a sec..."  height="150" />`;
};

var generatePlayersArray = function (players) {
  playersArray = [];
  var counter = 0;
  while (counter < players) {
    playersArray.push(`Player ${counter + 1}`);
    counter += 1;
  }
  return playersArray;
};

// var knockOutGame = function (players, dice, mode) {
//   var playersArray = generatePlayersArray(players);
//   shuffleArray(playersArray);
//   // E.g. ["Player 3", "Player 1", "Player 2"]
//   var roundCounter = 0;

//   while (roundCounter < players - 1) {
//     playGame(2, dice, mode);
//     roundCounter += 1;
//   }
// };

var normalGame = function (players, dice, mode) {
  var playersArray = generatePlayersArray(players);
  var results = getResults(players, dice, mode);
  var winnerIndex = results[0];
  var playersScores = results[1];
  if (winnerIndex == 99) {
    return `Your scores are ${playersScores}. It's a draw! Roll again. <br> <img src="https://i.gifer.com/1Jxj.gif" alt="Shrug"  height="150" />`;
  } else {
    updateLeaderboard(playersArray[winnerIndex]);
    console.log(leaderBoard);
    return `Your scores are ${playersScores}. ${playersArray[winnerIndex]} wins! <br> <img src="https://i.pinimg.com/originals/00/24/b9/0024b92df56e60d2706ed908b31ad870.gif" alt="Congrats to the winner!"  height="150" />`;
  }
};

var getPlayersScores = function (players, dice, mode) {
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
    console.log(
      `The player with index ${playersCounter} just rolled ${playerRolls}`
    );
    playersCounter += 1;
  }
  console.log(`Dice rolls ${playersRolls}`);
  if (mode == "lowest-combined") {
    var playersRollsCombined = lowestCombinedMode(playersRolls);
  }

  if (mode == "highest-combined") {
    var playersRollsCombined = highestCombinedMode(playersRolls);
  }
  console.log(`everyone's score: ${playersRollsCombined}`);
  return playersRollsCombined;
};

// Return results in [winnerIndex, [score, score, ...]]
var getResults = function (players, dice, mode) {
  var playersRollsCombined = getPlayersScores(players, dice, mode);
  var winningScore = Math.max(...playersRollsCombined);
  console.log(`highest score: ${winningScore}`);
  var results = [
    playersRollsCombined.indexOf(winningScore.toString()),
    playersRollsCombined,
  ];

  //draw condition
  if ([...new Set(playersRollsCombined)].length < playersRollsCombined.length) {
    results = [99, playersRollsCombined];
  }
  return results;
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

var shuffleArray = function (array) {
  array.sort(() => Math.random() - 0.5);
};
