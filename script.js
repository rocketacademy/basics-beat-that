var mode = "numberOfPlayers";
var noOfPlayers = 0;
var noOfDice = 0;
var highestRollOutput = [];
var scoreboardArray = [];
var diceRollsArray = [];
var playersHighestRolls = [];
var autoMode = false;
var knockoutMode = false;
var isNormalMode = false;
var main = function (input) {
  if (mode == "numberOfPlayers") {
    var noOfPlayersOutput = setPlayerNumber(input);
    return noOfPlayersOutput;
  }
  if (mode == "numberOfDice") {
    var noOfDiceOutput = setDiceNumber(input);
    return noOfDiceOutput;
  }
  if (mode == "autoModeSelect") {
    var autoGenerateMode = setAutoMode(input);
    return autoGenerateMode;
  }
  if (mode == "knockoutModeSelect") {
    var knockoutModeOutput = setKnockoutMode(input);
    return knockoutModeOutput;
  }
  if (mode == "gameModeSelect") {
    var gameModeOutput = setGameMode(input);
    return gameModeOutput;
  } else {
    var diceRolls = multipleDiceRoll(noOfPlayers, noOfDice, input);
    return diceRolls;
  }
};

var setPlayerNumber = function (input) {
  if (Number.isNaN(Number(input))) {
    return "Please input a number!";
  } else if (input == 0) {
    return "please input a number higher than 0!";
  }
  mode = "numberOfDice";
  noOfPlayers = Number(input);
  index = 0;
  currentPlayer = 0;
  while (index < noOfPlayers) {
    scoreboardArray.push(0);
    index = index + 1;
  }
  return `There are ${noOfPlayers} players for this game. Now, please enter the number of dice you wish to use.`;
};

var setDiceNumber = function (input) {
  if (Number.isNaN(Number(input))) {
    return "Please input a number!";
  } else if (input == 0) {
    return "please input a number higher than 0!";
  }
  mode = "autoModeSelect";
  noOfDice = input;
  return `There are ${noOfDice} dice in play for this game.`;
};

var setGameMode = function (input) {
  if (input == "normal") {
    isNormalMode = true;
    mode = "gameMode";
    return `You have selected Normal mode. Player 1, it is your turn!`;
  } else if (input == "lowest") {
    isNormalMode = false;
    mode = "gameMode";
    return `You have selected Lowest mode. Player 1, it is your turn!`;
  } else {
    return `Please only enter normal or lowest!`;
  }
};

var setAutoMode = function (input) {
  if (input == "yes") {
    autoMode = true;
    mode = "knockoutModeSelect";
    return `You have enabled Auto Mode. Do you wish to play knockout mode? Minumum players required: 3`;
  }
  if (input == "no") {
    autoMode = false;
    mode = "knockoutModeSelect";
    return `You have disabled Auto Mode. Do you wish to play knockout mode? Minumum players required: 3`;
  } else {
    return `Please input either yes or no only!`;
  }
};

var setKnockoutMode = function (input) {
  if (noOfPlayers <= 2) {
    return `You need at least 3 players to play knockout mode!`;
  } else if (input == "yes") {
    knockoutMode = true;
    mode = "gameModeSelect";
    return `You have turned knockout mode on! Do you wish to play normal or lowest mode?`;
  } else if (input == "no") {
    knockoutMode = false;
    mode = "gameModeSelect";
    return `You have turned knockout mode off! Do you wish to play normal or lowest mode?`;
  } else {
    return `Please input either yes or no only!`;
  }
};

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceNumber = Math.floor(randomDecimal) + 1;
  return randomDiceNumber;
};

var multipleDiceRoll = function (noOfPlayers, noOfDice, input) {
  if (mode == "gameMode" || mode == "selectMode" || mode == "faceoff") {
    while (currentPlayer < noOfPlayers) {
      diceOutput = diceSelection(currentPlayer, noOfDice, input);
      //currentPlayer only increases after player inputs their array
      if (mode == "gameMode") {
        currentPlayer = currentPlayer + 1;
      }
      return diceOutput;
    }
    mode = "faceoff";
    faceoffOutput = faceOff(playersHighestRolls);
    mode = "numberOfDice";
    //reset rolls array
    playersHighestRolls.length = 0;
    return faceoffOutput;
  }
};

var diceSelection = function (currentPlayer, noOfDice, input) {
  if (autoMode == false) {
    if (mode == "gameMode") {
      console.log(currentPlayer);
      index = 0;
      while (index < noOfDice) {
        diceRollsArray.push(diceRoll());
        index = index + 1;
      }
      myOutputValue = `Player ${
        currentPlayer + 1
      },You have rolled ${diceRollsArray}! <br> 
      Enter the order of the dice! The dice order starts from 0.`;
      mode = "selectMode";
      return myOutputValue;
    } else if (mode == "selectMode") {
      console.log("WTF");
      indexesArray = input.split("").map(Number);
      combinedNum = 0;
      for (var i = 0; i < indexesArray.length; i += 1) {
        combinedNum = combinedNum * 10 + diceRollsArray[indexesArray[i]];
      }
      mode = "gameMode";
      diceRollsArray = [];
      playersHighestRolls.push(combinedNum);
      return `Your combined number is ${combinedNum}. Now, Player ${
        currentPlayer + 2
      }(if any) will go. If the last player has already went, then the results will be computed.`;
    }
    //AUTOMODE FOR HIGHEST AND ONE FOR LOWEST!
  } else if (autoMode == true) {
    console.log(currentPlayer);
    index = 0;
    while (index < noOfDice) {
      diceRollsArray.push(diceRoll());
      index = index + 1;
    }
    var temp = 0;
    if (isNormalMode == true) {
      for (a = 0; a < diceRollsArray.length; a += 1) {
        for (b = a + 1; b < diceRollsArray.length; b += 1) {
          if (diceRollsArray[a] < diceRollsArray[b]) {
            temp = diceRollsArray[a];
            diceRollsArray[a] = diceRollsArray[b];
            diceRollsArray[b] = temp;
          }
        }
      }
    }
    if (isNormalMode == false) {
      for (a = 0; a < diceRollsArray.length; a += 1) {
        for (b = a + 1; b < diceRollsArray.length; b += 1) {
          if (diceRollsArray[b] < diceRollsArray[a]) {
            temp = diceRollsArray[a];
            diceRollsArray[a] = diceRollsArray[b];
            diceRollsArray[b] = temp;
          }
        }
      }
    }
    var sortedArray = [];
    for (c = 0; c < diceRollsArray.length; c += 1) {
      sortedArray[c] = diceRollsArray[c];
    }
    combinedNum = 0;
    for (var i = 0; i < sortedArray.length; i += 1) {
      combinedNum = combinedNum * 10 + sortedArray[i];
    }
    console.log(combinedNum);
    diceRollsArray = [];
    playersHighestRolls.push(combinedNum);
    return `Your combined number is ${combinedNum}. Now, Player ${
      currentPlayer + 2
    }(if any) will go. If the last player has already went, then the results will be computed.`;
  }
};

var faceOff = function (playersHighestRolls) {
  if (knockoutMode == true) {
    var currentWinnerScore = playersHighestRolls[0];
    var currentOpposer = 1;
    var currentWinner = 1;
    var winnerText = "";
    var myOutputValue = `Player 1 will now face off against Player 2.<br><br>`;
    while (currentOpposer < playersHighestRolls.length) {
      if (isNormalMode == true) {
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
      }
      if (isNormalMode == false) {
        if (playersHighestRolls[currentOpposer] < currentWinnerScore) {
          winnerText =
            myOutputValue +
            `Player ${
              currentOpposer + 1
            } has won over Player ${currentWinner} with a lower roll of ${
              playersHighestRolls[currentOpposer]
            } over ${currentWinnerScore}!<br><br>`;
          currentWinnerScore = playersHighestRolls[currentOpposer];
          currentWinner = currentOpposer + 1;
        } else {
          winnerText =
            myOutputValue +
            `Player ${currentWinner} has maintained their title against ${
              currentOpposer + 1
            } with a lower roll of ${currentWinnerScore} over ${
              playersHighestRolls[currentOpposer]
            }!<br><br>`;
        }
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
    var scoreboardText = scoreboard(playersHighestRolls, scoreboardArray);
    myOutputValue =
      myOutputValue +
      "<br><br>" +
      scoreboardText +
      `<br><br> You can resubmit the number of dice that you want to play with!`;
    mode = "numberOfDice";
    return myOutputValue;
  }
  if (knockoutMode == false) {
    var leadingScore = playersHighestRolls[0];
    var index = 0;
    var winnerText = "";
    while (index < playersHighestRolls.length) {
      if (isNormalMode == true) {
        if (playersHighestRolls[index] > leadingScore) {
          leadingScore = playersHighestRolls[index];
          winnerText = `The winner is Player ${
            index + 1
          } who rolled the highest value of ${leadingScore}`;
        } else if (leadingScore == playersHighestRolls[0]) {
          winnerText = `The winner is Player 1 who rolled the highest value of ${leadingScore}`;
        }
      } else if (isNormalMode == false) {
        if (playersHighestRolls[index] < leadingScore) {
          leadingScore = playersHighestRolls[index];
          winnerText = `The winner is Player ${
            index + 1
          } who rolled the lowest value of ${leadingScore}`;
        } else if (leadingScore == playersHighestRolls[0]) {
          winnerText = `The winner is Player 1 who rolled the lowest value of ${leadingScore}. <br><br> You can input the number of dice you wish to play with next round!`;
        }
      }
      index = index + 1;
    }
    var scoreboardText = scoreboard(playersHighestRolls, scoreboardArray);
    myOutputValue = winnerText + `<br><br>` + scoreboardText;
    return myOutputValue;
  }
};

var scoreboard = function (playersHighestRolls, scoreboardArray) {
  var index = 0;
  var myOutputValue = "";
  while (index < playersHighestRolls.length) {
    scoreboardArray[index] =
      scoreboardArray[index] + playersHighestRolls[index];
    myOutputValue =
      myOutputValue +
      `Player ${index + 1} has a total score of: ${
        scoreboardArray[index]
      } <br><br>`;
    index = index + 1;
  }
  return myOutputValue;
};

var inputDisplay = function () {
  if (mode == "numberOfPlayers") {
    return "Please input the number of Players for this round.";
  }
  if (mode == "numberOfDice") {
    return "Please input the number of Dice in play for this round.";
  }
  if (mode == "autoModeSelect") {
    return "Please input 'yes' or 'no' if you wish to have rolls automatically combined.";
  }
  if (mode == "knockoutModeSelect") {
    return "Please input 'yes' or 'no' if you wish to have a round knockout system.";
  }
  if (mode == "gameModeSelect") {
    return "Please input normal or lowest to select which mode to play.";
  }
  if (mode == "gameMode") {
    return `Please submit to roll the dice.`;
  }
  if (mode == "selectMode") {
    return `Player ${
      currentPlayer + 1
    }, please select your die in order starting from 0.`;
  } else if (mode == "faceOff") {
    return "The game has ended!";
  }
};
