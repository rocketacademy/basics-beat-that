var mode = "numberOfPlayers";
var noOfPlayers = 0;
var noOfDice = 0;
var highestRollOutput = [];
var leaderboardScoreArray = [];
var currentPlayer = 0;
var diceRollsArray = [];
var playersHighestRolls = [];
var main = function (input) {
  if (mode == "numberOfPlayers") {
    currentPlayer = 0;
    if (Number.isNaN(Number(input))) {
      return "Please input a number!";
    } else if (input == 0) {
      return "please input a number higher than 0!";
    }
    mode = "numberOfDice";
    noOfPlayers = input;
    index = 0;
    while (index < noOfPlayers) {
      leaderboardScoreArray.push(0);
      index = index + 1;
    }
    return `There are ${noOfPlayers} players for this game. Now, please enter the number of dice you wish to use.`;
  } else if (mode == "numberOfDice") {
    if (Number.isNaN(Number(input))) {
      return "Please input a number!";
    } else if (input == 0) {
      return "please input a number higher than 0!";
    }
    mode = "gameMode";
    noOfDice = input;
    currentPlayer = 0;
    return `There are ${noOfDice} dice in play for this game. Player 1, it is your turn to roll.`;
  }
  var diceRolls = dicerolltwice(noOfPlayers, noOfDice, input);
  return diceRolls;
};

var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceNumber = Math.floor(randomDecimal) + 1;
  return randomDiceNumber;
};

var dicerolltwice = function (noOfPlayers, noOfDice, input) {
  var myOutputValue = "";
  if (mode == "faceOff") {
    var currentWinnerScore = playersHighestRolls[0];
    var currentOpposer = 1;
    var currentWinner = 1;
    var winnerText = "";
    myOutputValue = `Player 1 will now face off against Player 2.<br><br>`;
    while (currentOpposer < playersHighestRolls.length) {
      if (playersHighestRolls[currentOpposer] > currentWinnerScore) {
        winnerText =
          myOutputValue +
          `Player ${
            currentOpposer + 1
          } has won over Player ${currentWinner} with a roll of ${
            playersHighestRolls[currentOpposer]
          } over ${currentWinnerScore}!<br><br>`;
        currentWinnerScore = playersHighestRolls[currentOpposer];
        currentWinner = currentOpposer + 1;
      } else {
        winnerText =
          myOutputValue +
          `Player ${currentWinner} has maintained their title against ${
            currentOpposer + 1
          } with a roll of ${currentWinnerScore} over ${
            playersHighestRolls[currentOpposer]
          }!<br><br>`;
      }
      if (currentOpposer + 1 == playersHighestRolls.length) {
        myOutputValue = winnerText + "The winner has been decided! <br><br>";
      } else {
        myOutputValue =
          winnerText +
          `Now, onto the next round: Player ${currentWinner} vs Player ${
            currentOpposer + 2
          }<br><br>`;
      }
      currentOpposer = currentOpposer + 1;
    }
    myOutputValue =
      myOutputValue +
      `Player ${currentWinner} emerges as the ultimate champion for this round!`;
    var leaderboardText = leaderboard(
      playersHighestRolls,
      leaderboardScoreArray
    );
    myOutputValue =
      myOutputValue +
      "<br><br>" +
      leaderboardText +
      `<br><br> You can resubmit the number of dice that you want to play with!`;
    mode = "numberOfDice";
    return myOutputValue;
  }
  if (mode == "gameMode") {
    if (currentPlayer < noOfPlayers) {
      index = 0;
      while (index < noOfDice) {
        diceRollsArray.push(diceroll());
        index = index + 1;
      }
      myOutputValue = `Player ${
        currentPlayer + 1
      },You have rolled ${diceRollsArray}! <br> 
      Enter the order of the dice to give the highest possible number! The dice order starts from 0.`;
      currentPlayer = currentPlayer + 1;
      mode = "selectMode";
      return myOutputValue;
    }
  } else if (mode == "selectMode") {
    indexesArray = input.split("").map(Number);
    combinedNum = 0;
    for (var i = 0; i < indexesArray.length; i += 1) {
      combinedNum = combinedNum * 10 + diceRollsArray[indexesArray[i]];
    }
    mode = "gameMode";
    diceRollsArray = [];
    if (currentPlayer == noOfPlayers) {
      mode = "faceOff";
    }
    playersHighestRolls[currentPlayer - 1] = combinedNum;
    return `Your combined number is ${combinedNum}. Now, the next player will go. If the last player has already went, then the results will be computed.`;
  }
};

var leaderboard = function (playersHighestRolls, leaderboardScoreArray) {
  var index = 0;
  var myOutputValue = "";
  while (index < playersHighestRolls.length) {
    leaderboardScoreArray[index] =
      leaderboardScoreArray[index] + playersHighestRolls[index];
    myOutputValue =
      myOutputValue +
      `Player ${index + 1} has a total score of: ${
        leaderboardScoreArray[index]
      } <br><br>`;
    index = index + 1;
  }
  return myOutputValue;
};

var inputDisplay = function () {
  if (mode == "numberOfPlayers") {
    return "Please input the number of Players for this round.";
  } else if (mode == "numberOfDice") {
    return "Please input the number of Dice in play for this round.";
  } else if (mode == "gameMode") {
    return `Player ${currentPlayer + 1}, it is your turn.`;
  } else if (mode == "selectMode") {
    return `Player ${currentPlayer}, please select your die in order starting from 0.`;
  } else if (mode == "faceOff") {
    return "The game has ended!";
  }
};
