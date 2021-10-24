var diceRolls = [];
var playerValues = [];
var playerValuesHistory = [[], []];
var winnerHistory = [];
var modeHistory = [];
var playerScores = [0, 0];
var currentPlayer = 0;
var currentLeader = [];
var totalPlayers = 2;
var currentRound = 1;
var winnerIndex = -1;
var modeCanBeChanged = true;
var gameMode = "Highest";

var main = function (input) {
  var output = "";

  // user's first action must be submit without any input
  // as user is throwing a random roll
  if (input.length == 0 && diceRolls.length == 0) {
    currentPlayer = currentPlayer + 1;
    diceRolls = rollTheDice(2);
    output += `Welcome Player ${currentPlayer}.<br />`;
    output += `You rolled `;

    for (var counter = 0; counter < 2; counter++) {
      output += `${diceRolls[counter]} for Dice ${counter + 1}`;

      if (counter != 1) {
        output += ` and `;
      } else {
        output += `.<br />`;
      }
    }

    output += `Choose the order of the dice. <br />`;
    output += `e.g. Type 1 if you want the value of Dice 1 to be first. <br />`;

    modeCanBeChanged = false;

    return output;
  } else if (diceRolls.length != 0 && (input == 1 || input == 2)) {
    // for either Player 1 or Player 2 to decide the order of their dices
    if (input == 1) {
      playerValues[currentPlayer - 1] = diceRolls[0] + "" + diceRolls[1];
    } else {
      playerValues[currentPlayer - 1] = diceRolls[1] + "" + diceRolls[0];
    }

    output += `Player ${currentPlayer}, you chose Dice ${input} first. <br />`;
    output += `Your number is ${playerValues[currentPlayer - 1]}. <br />`;

    playerValuesHistory[currentPlayer - 1].push(
      playerValues[currentPlayer - 1]
    );

    if (playerValues.length != totalPlayers) {
      output += `It is now Player ${currentPlayer + 1}'s turn.`;
      diceRolls = [];
    } else {
      winnerIndex = findWinner(playerValues);
      findCurrentLeader(winnerIndex);
      modeHistory.push(gameMode);

      output += `Player ${winnerIndex + 1} wins with dice values ${
        playerValues[winnerIndex]
      }!<br /><br />`;

      output += `<br/>`;
      output += `Round ${currentRound} has ended. You can play again.<br/>`;
      output += `<hr/>`;
      output += generateRoundHistory();
      output += generateScoreTable();

      resetRound();
    }
    return output;
  } else if (diceRolls.length != 0 && (input != 1 || input != 2)) {
    output +=
      "Your input is invalid. You can only select a number less than or equal to the number of dices.";

    return output;
  } else {
    output += "You need to roll your dices first. Don't provide any input.";

    return output;
  }
};

// returns an array of random dice values
var rollTheDice = function (noOfTimes) {
  var diceValues = [];

  for (var counter = 0; counter < noOfTimes; counter++) {
    var randomDecimal = Math.random() * 6;
    var randomWholeNumber = Math.floor(randomDecimal);
    var finalDiceValue = randomWholeNumber + 1;
    diceValues.push(finalDiceValue);
  }

  return diceValues;
};

// after all users have selected their dice values
// find a winner. returns index of playerValues
var findWinner = function (playerValues) {
  if (playerValues[0] > playerValues[1]) {
    if (gameMode == "Highest") {
      winnerHistory.push(0);
      return 0;
    } else {
      winnerHistory.push(1);
      return 1;
    }
  } else {
    if (gameMode == "Highest") {
      winnerHistory.push(1);
      return 1;
    } else {
      winnerHistory.push(0);
      return 0;
    }
  }
};

var resetRound = function () {
  diceRolls = [];
  playerValues = [];
  currentPlayer = 0;
  currentRound++;
  modeCanBeChanged = true;
};

var findCurrentLeader = function (winnerIndex) {
  playerScores[winnerIndex]++;

  // find the player with the Highest score
  // return index which represents the player number e.g. 0 for player 1
  // if tie, return -1

  var max = -1;

  for (var counter = 0; counter < playerScores.length; counter++) {
    if (playerScores[counter] > max) {
      currentLeader = [];
      max = playerScores[counter];
      currentLeader.push(counter);
    } else if (playerScores[counter] == max) {
      currentLeader.push(counter);
    }
  }

  console.log("inside findCurrentLeader");
  console.log(currentLeader);
};

var generateRoundHistory = function () {
  var table = `<h3>Round History</h3><table style="width:100%"><thead><tr><th>Round</th><th>Round</th><th>Player 1</th><th>Player 2</th><th>Winner</th></tr></thead><tbody>`;

  for (var counter = 0; counter < currentRound; counter++) {
    table += `<tr><td style="text-align: center;">${
      counter + 1
    }</td><td style="text-align: center;">${gameMode}</td>`;

    for (var counter2 = 0; counter2 < totalPlayers; counter2++) {
      table += `<td style="text-align: center;">${playerValuesHistory[counter2][counter]}</td>`;
    }

    table += `<td style="text-align: center;">Player ${
      winnerHistory[counter] + 1
    }</td></tr>`;
  }

  table += `</tbody>`;

  table += `</table><hr/>`;

  return table;
};

var generateScoreTable = function () {
  var table = `<h3>Score Table</h3><table style="width:100%"><thead><tr><th></th><th>Player 1</th><th>Player 2</th></tr></thead><tbody>`;

  table += `<tr><td style="text-align: center;">Score</td>`;

  for (var counter = 0; counter < playerScores.length; counter++) {
    table += `<td style="text-align: center;">${playerScores[counter]}</td>`;
  }

  table += `</tr><tr><td style="text-align: center;">Leader</td>`;

  for (var counter = 0; counter < playerScores.length; counter++) {
    if (currentLeader.indexOf(counter) != -1) {
      table += `<td style="text-align: center;">👑</td>`;
    } else {
      table += `<td></td>`;
    }
  }

  table += `</tr></tbody></table>`;

  return table;
};
