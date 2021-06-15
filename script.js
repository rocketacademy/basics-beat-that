var mode = "numberOfPlayers";
var noOfPlayers = 0;
var noOfDice = 0;
var prevNoOfPlayers = 0;
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
    noOfPlayers = Number(input);
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
  var gameOutput = gameFunc(noOfPlayers, noOfDice, input);
  return gameOutput;
};

var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceNumber = Math.floor(randomDecimal) + 1;
  return randomDiceNumber;
};

var gameFunc = function (noOfPlayers, noOfDice, input) {
  var myOutputValue = "";
  if (mode == "faceOff") {
    var max = playersHighestRolls[0];
    var index = 0;
    var winnerText = "";
    while (index < playersHighestRolls.length) {
      winnerText = `The winner is Player 1 who rolled the highest value of ${max}`;
      if (playersHighestRolls[index] > max) {
        max = playersHighestRolls[index];
        winnerText = `The winner is Player ${
          index + 1
        } who rolled the highest value of ${max}`;
      }
      index = index + 1;
    }
    var leaderboardText = leaderboard(
      playersHighestRolls,
      leaderboardScoreArray
    );
    myOutputValue =
      myOutputValue +
      winnerText +
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
    //Resetting the combinedNum after each iteration
    playersHighestRolls[currentPlayer - 1] = combinedNum;
    return `Your combined number is ${combinedNum}. Now, the next player will go. If the last player has already went, then the results will be computed.`;
  }
};

var leaderboard = function (playerHighestRoll, leaderboardScoreArray) {
  //need to figure out how to display leaderboard in order
  var index = 0;
  var myOutputValue = "";
  while (index < playerHighestRoll.length) {
    leaderboardScoreArray[index] =
      leaderboardScoreArray[index] + playerHighestRoll[index];
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
