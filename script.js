var mode = "selectNoOfPlayers";
var outcome1 = 0;
var outcome2 = 0;
var noOfPlayers = 0;
var prevNoOfPlayers = 0;
var playersHighestRolls = [];
var leaderboardScoreArray = [];
var rollDice1 = 0;
var rollDice2 = 0;
var index = 0;
var currentPlayer = 1;
var main = function (input) {
  if (mode == "selectNoOfPlayers") {
    if (Number.isNaN(Number(input))) {
      return "Please input a number";
    } else {
      //reset index and currentPlayer
      index = 0;
      currentPlayer = 1;
      noOfPlayers = Number(input);
      if (input < 2) {
        return `Please input a number of at least 2 or higher!`;
      }
      if (leaderboardScoreArray[0] == undefined) {
        var leaderboardArrayIndex = 0;
        while (leaderboardArrayIndex < noOfPlayers) {
          leaderboardScoreArray.push(0);
          leaderboardArrayIndex = leaderboardArrayIndex + 1;
        }
      } else if (leaderboardScoreArray[noOfPlayers] == undefined) {
        while (prevNoOfPlayers < noOfPlayers) {
          leaderboardScoreArray.push(0);
          prevNoOfPlayers = prevNoOfPlayers + 1;
        }
      }
      mode = "gameMode";
      return `You have declared ${noOfPlayers} players to play in this round. Player 1, please roll.`;
    }
  } else if (mode == "gameMode" || mode == "selectMode") {
    var highestRollOutput = "";
    var myOutputValue = "";
    while (index < noOfPlayers) {
      if (mode == "gameMode") {
        rollDice1 = diceroll();
        rollDice2 = diceroll();
        outcome1 = rollDice1 * 10 + rollDice2;
        outcome2 = rollDice2 * 10 + rollDice1;
        mode = "selectMode";
        myOutputValue = `You have rolled ${rollDice1} and ${rollDice2}. Player ${currentPlayer}, please select which dice to put first. <br><br>1.${rollDice1}<br>2.${rollDice2}<br>`;
        return myOutputValue;
      } else if (mode == "selectMode") {
        if (input == 1) {
          mode = "gameMode";
          playersHighestRolls.push(outcome1);
          highestRollOutput = outcome1;
        } else if (input == 2) {
          mode = "gameMode";
          playersHighestRolls.push(outcome2);
          highestRollOutput = outcome2;
        } else {
          return `Please input only 1 or 2! <br><br>1.${rollDice1}<br>2.${rollDice2}<br>`;
        }
        index = index + 1;
        var nextPlayertext = ``;
        if (index < noOfPlayers) {
          nextPlayertext = `<br><br> Player ${currentPlayer + 1}, please roll.`;
        } else if (index == noOfPlayers) {
          nextPlayertext = `<br><br>The results will now be tabulated.`;
        }
        myOutputValue =
          myOutputValue +
          `Player ${currentPlayer}, your roll is ${highestRollOutput}.` +
          nextPlayertext;
        leaderboardScoreArray[currentPlayer - 1] =
          leaderboardScoreArray[currentPlayer - 1] + highestRollOutput;
        currentPlayer = currentPlayer + 1;
      }
      return myOutputValue;
    }
    if (index == noOfPlayers) {
      var winningOutcome = faceoff(playersHighestRolls);
      var leaderboardText = leaderboard(
        playersHighestRolls,
        leaderboardScoreArray
      );
      myOutputValue =
        myOutputValue + winningOutcome + "<br><br>" + leaderboardText;
      playersHighestRolls = [];
      prevNoOfPlayers = noOfPlayers;
      return myOutputValue;
    }
  } else {
    mode = "selectNoOfPlayers";
    return `Uhhh... That wasn't supposed to happen. Please try again.`;
  }
};

var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceNumber = Math.floor(randomDecimal) + 1;
  return randomDiceNumber;
};

var leaderboard = function (playersHighestRolls, leaderboardScoreArray) {
  var index = 0;
  var myOutputValue = "";
  while (index < playersHighestRolls.length) {
    myOutputValue =
      myOutputValue +
      `Player ${index + 1} has a total score of: ${
        leaderboardScoreArray[index]
      } <br><br>`;
    index = index + 1;
  }
  mode = "selectNoOfPlayers";
  myOutputValue =
    myOutputValue +
    `<br><br> Please enter the number of players to play again!`;
  return myOutputValue;
};

var faceoff = function (playersHighestRolls) {
  var max = playersHighestRolls[0];
  var index = 0;
  var winnerText = "";
  while (index < playersHighestRolls.length) {
    if (playersHighestRolls[index] > max) {
      max = playersHighestRolls[index];
      winnerText = `The winner is Player ${
        index + 1
      } who rolled the highest value of ${max}`;
    } else if (max == playersHighestRolls[0]) {
      winnerText = `The winner is Player 1 who rolled the highest value of ${max}`;
    }
    index = index + 1;
  }
  return winnerText;
};

var inputDisplay = function () {
  // change to new lowest and normal modes
  if (mode == "start") {
    return "Please input whether you would like to play lowest or normal mode.";
  } else if (mode == "player1startnormal" || mode == "player1startlowest") {
    return "It is Player 1's turn.";
  } else if (mode == "player2startnormal" || mode == "player2startlowest") {
    return "It is Player 2's turn.";
  }
};
