var main = function (players, diceCount, rounds, winCondition) {
  var scores = [];
  var player = 0;
  var output = "";
  var totalScore = 0;
  var playerTotalScore = [];
  while (player < players) {
    scores.push(getPlayerScore(diceCount, rounds, winCondition));
    for (let score in scores[player]) {
      totalScore += scores[player][score];
    }
    playerTotalScore.push(totalScore);
    output += `<b>Player ${player + 1}</b> rolled ${
      scores[player]
    } and scored a total of <b>${totalScore}</b>.<br>`;
    totalScore = 0;
    player += 1;
  }
  var winner = checkWinner(playerTotalScore, winCondition);
  output += `<br>Since the player with <b>${winCondition}</b>, the winner is <b>Player ${winner}</b>!`;
  return output;
};

var diceRoll = function () {
  var randDecimal = Math.random() * 6;
  var randInteger = Math.floor(randDecimal);
  return randInteger + 1;
};

var playerDiceRoll = function (diceCount, winCondition) {
  var counter = 0;
  var currentPlayerRolls = [];
  while (counter < diceCount) {
    currentPlayerRolls.push(diceRoll());
    counter += 1;
  }
  var bestScore = "";
  var sorted = [];
  if (winCondition == "highest score wins") {
    sorted = currentPlayerRolls.sort().reverse();
  } else if (winCondition == "lowest score wins") {
    sorted = currentPlayerRolls.sort();
  }
  for (let num in sorted) {
    bestScore += sorted[num];
  }
  return Number(bestScore);
};

var getPlayerScore = function (diceCount, rounds, winCondition) {
  var round = 0;
  scores = [];
  while (round < rounds) {
    scores.push(playerDiceRoll(diceCount, winCondition));
    round += 1;
  }
  return scores;
};

var checkWinner = function (playerTotalScore, winCondition) {
  var winner;
  if (winCondition == "highest score wins") {
    console.log("high");
    var max = 0;
    for (let score in playerTotalScore) {
      if (playerTotalScore[score] > max) {
        max = playerTotalScore[score];
      }
    }
    winner = playerTotalScore.indexOf(max) + 1;
  } else if (winCondition == "lowest score wins") {
    console.log("low");
    var min = Infinity;
    for (let score in playerTotalScore) {
      if (playerTotalScore[score] < min) {
        min = playerTotalScore[score];
      }
    }
    winner = playerTotalScore.indexOf(min) + 1;
  }
  return winner;
};
