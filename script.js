var playersArray = [];
var leaderBoard = {};

var main = function (playersArray, dice, mode, knockout) {
  if (knockout) {
    setTimeout(function () {
      updateOutput(knockOutGame(playersArray, dice, mode));
    }, 2000);
  } else {
    setTimeout(function () {
      updateOutput(normalGame(playersArray, dice, mode));
    }, 2000);
  }

  return `Rolling ${dice} dice for each player... <br> <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f8f8447e-91e8-4194-beda-5b65069f6bf3/d2pwkqs-28d37d06-50bf-421a-a255-43a7258379f4.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4Zjg0NDdlLTkxZTgtNDE5NC1iZWRhLTViNjUwNjlmNmJmM1wvZDJwd2txcy0yOGQzN2QwNi01MGJmLTQyMWEtYTI1NS00M2E3MjU4Mzc5ZjQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ll2m7f0bCfUL0lqaEfOD5U80PqDcinqf6F_4fiVdhaU" alt="Something's happening, give it a sec..."  height="150" />`;
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

var knockOutGame = function (playersArray, dice, mode) {
  if (playersArray.length > 1) {
    // First two players in the shuffled players array play against each other
    var pair = playersArray.slice(0, 2);
    console.log(`playing this round: ${pair}`);
    var results = getResults(pair, dice, mode);
    // sample result: [1, [12, 14]]
    var winnerIndex = results[0];
    var playersScores = results[1];
    if (winnerIndex == 99) {
      return `${pair[0]} vs ${pair[1]}. <br>Your scores are ${playersScores}. It's a draw! <br><img src="https://i.pinimg.com/originals/c7/9f/22/c79f228e19a0bba313fc3520ec7f61cd.gif" alt="Try again."  height="150" />`;
    } else {
      if (playersArray.length > 2) {
        // Remove the player who got knocked out from the players array
        playersArray.splice(1 - winnerIndex, 1);
        return `${pair[0]} vs ${
          pair[1]
        }. <br>Your scores are ${playersScores}. ${
          pair[1 - winnerIndex]
        } - knockout! <br><img src="https://i.pinimg.com/originals/dd/26/70/dd26704aa046c2ba2d3feff46139118e.gif" alt="KO!"  height="150" />`;
      } else {
        updateLeaderboard(pair[winnerIndex]);

        // Reset players list and turn off knockout mode
        var knockoutMode = document.querySelector("#knockout");
        knockoutMode.checked = false;
        var playerCount = document.querySelector(
          "[name='radio-players']:checked"
        );
        var players = parseInt(playerCount.value);
        generatePlayersArray(players);
        return `${pair[0]} vs ${pair[1]}. <br>Your scores are ${playersScores}. ${pair[winnerIndex]} wins! <br> <img src="https://acegif.com/wp-content/uploads/gifs/dancing-cat-57.gif" alt="Congrats to the winner!"  height="150" />`;
      }
    }
  }
};

var normalGame = function (playersArray, dice, mode) {
  var results = getResults(playersArray, dice, mode);
  var winnerIndex = results[0];
  var playersScores = results[1];
  if (winnerIndex == 99) {
    return `Your scores are ${playersScores}. It's a draw! <br> <img src="https://i.pinimg.com/originals/c7/9f/22/c79f228e19a0bba313fc3520ec7f61cd.gif" alt="Try again."  height="150" />`;
  } else {
    updateLeaderboard(playersArray[winnerIndex]);
    console.log(leaderBoard);
    return `Your scores are ${playersScores}. ${playersArray[winnerIndex]} wins! <br> <img src="https://acegif.com/wp-content/uploads/gifs/dancing-cat-57.gif" alt="Congrats to the winner!"  height="150" />`;
  }
};

var getPlayersScores = function (playersArray, dice, mode) {
  var playersRolls = [];
  var playersCounter = 0;
  while (playersCounter < playersArray.length) {
    var playerRolls = [];
    var diceCounter = 0;
    while (diceCounter < dice) {
      playerRolls.push(rollDice());
      diceCounter += 1;
    }
    playersRolls.push(playerRolls);
    console.log(`${playersArray[playersCounter]} just rolled ${playerRolls}`);
    playersCounter += 1;
  }

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
var getResults = function (playersArray, dice, mode) {
  var playersRollsCombined = getPlayersScores(playersArray, dice, mode);
  var winningScore = Math.max(...playersRollsCombined);
  console.log(`highest score: ${winningScore}`);
  var results = [
    playersRollsCombined.indexOf(winningScore.toString()),
    playersRollsCombined,
  ];

  // Draw condition
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

// Generate random dice roll
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

// Overwrite "Rolling..." with the outcome of the round
var updateOutput = function (input) {
  var outputBox = document.querySelector("#output-div");
  outputBox.innerHTML = input;
};

// Produce an empty leaderboard, depending on how many users are playing
var generateLeaderboard = function (players) {
  var counter = 0;
  var leaderBoard = {};
  while (counter < players) {
    leaderBoard[`Player ${counter + 1}`] = 0;
    counter += 1;
  }
  return leaderBoard;
};

// Update the leaderboard player by player
var updateLeaderboard = function (winningPlayer) {
  leaderBoard[winningPlayer] += 1;
  var scoreSpace = document.querySelector("#scores");
  var output = "";
  for (var entry in leaderBoard) {
    output += `${entry}: ${leaderBoard[entry]}<br>`;
  }
  scoreSpace.innerHTML = output;
};

// When knockout mode is selected, randomly shuffle the order of players
var shuffleArray = function (array) {
  array.sort(() => Math.random() - 0.5);
};
