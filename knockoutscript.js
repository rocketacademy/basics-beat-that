var noOfKnockoutLevels = 0;
var playerIndexPairings = [];
var playerIndexPairingsHistory = [];
var numberOfPlayersLeft = [];
var numberOfPlayersLeftHistory = [];
var knockoutPlayerValues = [];
var knockoutPlayerValuesHistory = [];
var currentKnockoutRound = 1;
var knockoutModeHistory = [];

var generateNumberOfKnockoutRoundsAndIndexes = function () {
  console.log("--- inside generateNumberOfKnockoutRoundsAndIndexes ---");
  noOfKnockoutLevels = Math.round(playerNames / 2);

  // generate numbers [0, 1, 2, 3] if there are 4 players
  // as we generate pairings, we remove the numbers from the array
  for (var i = 0; i < playerNames.length; i++) {
    numberOfPlayersLeft.push(i);
  }

  console.log("numberOfPlayersLeft");
  console.log(numberOfPlayersLeft);

  console.log("--- end generateNumberOfKnockoutRoundsAndIndexes ---");
};

var generateRandomPairings = function () {
  console.log("--- inside generateRandomPairings ---");
  var tempArray = [];

  console.log("numberOfPlayersLeft");
  console.log(numberOfPlayersLeft);

  // add nested arrays in playerIndexPairings to pair players together
  while (numberOfPlayersLeft.length !== 0) {
    var randomPersonIndex = pickARandomPerson();
    if (tempArray.length == 0 || tempArray.length == 1) {
      tempArray.push(numberOfPlayersLeft.splice(randomPersonIndex, 1)[0]);
    } else {
      playerIndexPairings.push(tempArray);
      tempArray = [];
      tempArray.push(numberOfPlayersLeft.splice(randomPersonIndex, 1)[0]);
    }
  }

  if (tempArray.length !== 0) {
    playerIndexPairings.push(tempArray);
  }

  console.log("playerIndexPairings");
  console.log(playerIndexPairings);

  console.log("--- end generateRandomPairings ---");
};

var pickARandomPerson = function () {
  console.log("--- inside pickARandomPerson ---");
  var randomDecimal = Math.random() * numberOfPlayersLeft.length;
  var randomPersonIndex = Math.floor(randomDecimal);

  console.log("randomPersonIndex");
  console.log(randomPersonIndex);

  console.log("--- end pickARandomPerson ---");
  return randomPersonIndex;
};

var startKnockoutRound = function (noOfDices) {
  console.log("--- inside startKnockoutRound ---");
  // reinitiatlise numberOfPlayersLeft to []
  // add winners to numberOfPlayersLeft

  knockoutModeHistory.push(gameMode);

  generateNumberOfKnockoutRoundsAndIndexes();
  generateRandomPairings();
  initialiseHistoryPlaceholders();

  numberOfPlayersLeft = [];

  playLevelAndFindWinners(noOfDices);

  console.log("BEFORE addStatsToHistory");
  console.log("numberOfPlayersLeft");
  console.log(numberOfPlayersLeft);

  addStatsToHistory();
  checkIfRoundEndOrGoNextLevel(noOfDices);

  // resetKnockoutRound();
  console.log("--- end startKnockoutRound ---");
};

var findKnockoutWinner = function (valuesToCompare) {
  console.log("--- inside findKnockoutWinner ---");
  var winners = [];

  if (valuesToCompare[0] == valuesToCompare[1]) {
    winners = [0, 1];
  } else if (gameMode == "Highest") {
    if (valuesToCompare[0] > valuesToCompare[1]) {
      winners = [0];
    } else {
      winners = [1];
    }
  } else {
    if (valuesToCompare[0] > valuesToCompare[1]) {
      winners = [1];
    } else {
      winners = [0];
    }
  }

  console.log("winners");
  console.log(winners);

  console.log("--- end findKnockoutWinner ---");

  return winners;
};

var resetKnockoutRound = function () {
  console.log("--- inside resetKnockoutRound ---");

  console.log("--- adding history ---");
  playerIndexPairings = [];
  numberOfPlayersLeft = [];
  knockoutPlayerValues = [];
  currentKnockoutRound++;
};

var goToNextLevel = function (noOfDices) {
  console.log("--- inside goToNextLevel ---");

  resetLevel();
  generateRandomPairings();
  playLevelAndFindWinners(noOfDices);

  console.log("BEFORE addStatsToHistory");
  console.log("numberOfPlayersLeft");
  console.log(numberOfPlayersLeft);

  addStatsToHistory();
  checkIfRoundEndOrGoNextLevel(noOfDices);

  console.log("--- end goToNextLevel ---");
};

var resetLevel = function () {
  playerIndexPairings = [];
  knockoutPlayerValues = [];
};

var playLevelAndFindWinners = function (noOfDices) {
  console.log("--- inside playLevelAndFindWinners ---");

  console.log("playerIndexPairings");
  console.log(playerIndexPairings);

  for (var i = 0; i < playerIndexPairings.length; i++) {
    // check whether pairing has 1 or 2 people
    if (playerIndexPairings[i].length == 2) {
      var tempArray = [];
      for (var j = 0; j < 2; j++) {
        tempArray.push(autoGenerateNumber(rollTheDice(noOfDices), gameMode));
      }

      knockoutPlayerValues.push(tempArray);

      console.log("knockoutPlayerValues");
      console.log(knockoutPlayerValues);

      var knockoutWinnerIndex = findKnockoutWinner(tempArray);

      console.log("knockoutWinnerIndex");
      console.log(knockoutWinnerIndex);

      for (var k = 0; k < knockoutWinnerIndex.length; k++) {
        console.log("to push");
        console.log(playerIndexPairings[i][knockoutWinnerIndex[k]]);
        numberOfPlayersLeft.push(
          playerIndexPairings[i][knockoutWinnerIndex[k]]
        );
      }
    } else {
      // dont need to roll dice
      // auto win baby!
      numberOfPlayersLeft.push(playerIndexPairings[i][0]);
    }
  }
};

var initialiseHistoryPlaceholders = function () {
  playerIndexPairingsHistory[currentKnockoutRound - 1] = [];
  numberOfPlayersLeftHistory[currentKnockoutRound - 1] = [];
  knockoutPlayerValuesHistory[currentKnockoutRound - 1] = [];
};

var addStatsToHistory = function () {
  console.log("--- inside addStatsToHistory ---");
  playerIndexPairingsHistory[currentKnockoutRound - 1].push([
    ...playerIndexPairings,
  ]);

  numberOfPlayersLeftHistory[currentKnockoutRound - 1].push([
    ...numberOfPlayersLeft,
  ]);
  knockoutPlayerValuesHistory[currentKnockoutRound - 1].push([
    ...knockoutPlayerValues,
  ]);
  console.log("--- end addStatsToHistory ---");
};

var checkIfRoundEndOrGoNextLevel = function (noOfDices) {
  if (numberOfPlayersLeft.length == 1) {
    // winner found
    console.log("!!! WINNER FOUND !!!");

    playerScores[numberOfPlayersLeft[0]]++;

    generateKnockoutHistoryTable();

    findCurrentLeader();
    generatePlayerTable();

    resetKnockoutRound();
  } else {
    console.log("!!! still have remaining players !!!");
    goToNextLevel(noOfDices);
  }
};

var generateKnockoutHistoryTable = function () {
  var table = `<h6 class="text-center">--- Round ${currentKnockoutRound} ---</h6><div class="table-responsive"><table class="table table-bordered border-secondary text-center bg-white" style="border: 1px solid black;"><thead><tr><th scope="col">Level</th><th scope="col" colspan="100%" class="text-center">Mode: `;

  if (knockoutModeHistory[currentKnockoutRound - 1] == "Highest") {
    table += `<span class="text-danger">Highest</span>`;
  } else {
    table += `<span class="text-success">Lowest</span>`;
  }

  table += `</th></tr></thead>`;

  table += `<tbody>`;

  var level = 1;

  // loop through levels
  for (
    var i = 0;
    i < playerIndexPairingsHistory[currentKnockoutRound - 1].length;
    i++
  ) {
    table += `<tr><th rowspan="2" style="text-align: center; vertical-align: middle">${level}</th>`;

    for (
      var j = 0;
      j < playerIndexPairingsHistory[currentKnockoutRound - 1][i].length;
      j++
    ) {
      for (
        var k = 0;
        k < playerIndexPairingsHistory[currentKnockoutRound - 1][i][j].length;
        k++
      ) {
        if (
          numberOfPlayersLeftHistory[currentKnockoutRound - 1][i].indexOf(
            playerIndexPairingsHistory[currentKnockoutRound - 1][i][j][k]
          ) != -1
        ) {
          table += `<th class="bg-warning">${
            playerNames[
              playerIndexPairingsHistory[currentKnockoutRound - 1][i][j][k]
            ]
          }</th>`;
        } else {
          table += `<th>${
            playerNames[
              playerIndexPairingsHistory[currentKnockoutRound - 1][i][j][k]
            ]
          }</th>`;
        }
      }
      if (
        j !=
        playerIndexPairingsHistory[currentKnockoutRound - 1][i].length - 1
      ) {
        table += `<td></td>`;
      } else {
        table += `</tr>`;
      }
    }

    table += `<tr>`;

    for (
      var a = 0;
      a < knockoutPlayerValuesHistory[currentKnockoutRound - 1][i].length;
      a++
    ) {
      for (
        var b = 0;
        b < knockoutPlayerValuesHistory[currentKnockoutRound - 1][i][a].length;
        b++
      ) {
        table += `<td>${
          knockoutPlayerValuesHistory[currentKnockoutRound - 1][i][a][b]
        }</td>`;
      }
      if (
        a !=
        knockoutPlayerValuesHistory[currentKnockoutRound - 1][i].length - 1
      ) {
        table += `<td></td>`;
      } else {
        table += `</tr>`;
      }
    }

    table += `</tr>`;

    level++;
  }

  table += `<tr><th style="text-align: center; vertical-align: middle">Winner</th><th colspan="100%">${
    playerNames[numberOfPlayersLeft[0]]
  }</th></tr>`;

  table += `</tbody></table></div>`;

  document.getElementById("knockout-history-table").innerHTML += table;
  document.getElementById("knockout-history-div").style.display = "";
};
