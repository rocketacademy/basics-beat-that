var diceObject = []; // This stores the list of dice values of all players
var combinedDiceValue = []; // This stores the combined value of the dices after an order has been determined
var runningScore = []; // This stores the (sorted) cumulative score of each player
var numberOfPlayers = '';
var numberOfDice = '';
var currentPlayer = 1;
var nextPlayer = currentPlayer + 1;
var currentRound = 1;
var gameMode = 'Reset';
var orderMode = 0; // Define 4 states (0 = Initial state, 1 = Dice 1 first, 2 = Dice 2 first, 3 = Auto highest)
var rollMessage; // Declare this as global variable to hold the message of original dice order before sorting

var main = function (input) {
  var winnerIndex;
  var message = '';
  var gameModeMessage =
    'Please select a game mode (input integers 1-5) <br><br> 1. Manually select combined order; highest = winner <br> 2. Manually select combined order; lowest = winner <br> 3. Auto-generate highest combined <br> 4. Variable number of players & dice';
  // Initialize game
  if (gameMode == 'Reset') {
    gameMode = 'Waiting for selection';
    return `Welcome! ${gameModeMessage}`;
  }
  // Select game mode
  if (gameMode == 'Waiting for selection') {
    if (input >= 1 && input <= 5) {
      gameMode = Number(input);
      return `You have chosen mode ${gameMode}. Please click Submit to play`;
    } else {
      return `Input error. ${gameModeMessage}`;
    }
  }
  // Game mode 1 & 2: Base; running score
  if (gameMode == 1 || gameMode == 2) {
    numberOfPlayers = 2;
    numberOfDice = 2;
    // When the user is at the stage of generating dice value
    if (input == '') {
      populateRandomDice(currentPlayer, currentRound, numberOfDice);
      // When the user is selecting order
    } else if (input == 1 || input == 2) {
      orderMode = input;
      getCombinedNumber(orderMode, currentPlayer, currentRound);
    }
  }
  // Game mode 3: Auto highest
  if (gameMode == 3) {
    numberOfPlayers = 2;
    numberOfDice = 2;
    populateRandomDice(currentPlayer, currentRound, numberOfDice);
    orderMode = 3; // 3 is the index for "auto highest"; refer to definition under global variable declaration
    getCombinedNumber(orderMode, currentPlayer, currentRound);
  }

  // Game mode 4: Variable number of players & dice
  if (gameMode == 4) {
    // Assign number of players & dices to user input; the values were previously initialized as empty string
    if (numberOfPlayers == '') {
      numberOfPlayers = input;
    } else if (numberOfDice == '') {
      numberOfDice = input;
      // Enter into game immediately (same round) once the number of players & dice are defined
    }
    if (numberOfDice != '') {
      populateRandomDice(currentPlayer, currentRound, numberOfDice);
      orderMode = 3; // 3 is the index for "auto highest"; refer to definition under global variable declaration
      getCombinedNumber(orderMode, currentPlayer, currentRound);
    }
  }

  var message = displayMessage(gameMode, orderMode, currentPlayer);

  // When it reaches end of the current player
  if (
    ((gameMode == 1 || gameMode == 2) && (input == 1 || input == 2)) ||
    (gameMode != 1 && gameMode != 2 && numberOfDice != '')
  ) {
    currentPlayer = nextPlayer;
    orderMode = 0;
    message =
      message +
      `<br> <br> It is now Player ${nextPlayer}'s turn. Please click Submit to play`;
    // When it is also the end of the round
    if (nextPlayer == 1) {
      currentRound++;
      numberOfDice = '';
      winnerIndex = getWinner(gameMode);
      message = message + `<br> <br> ${displayLeaderboard(winnerIndex)} `;
    }
    if (nextPlayer != numberOfPlayers) {
      nextPlayer++;
    } else {
      nextPlayer = 1;
    }
  }

  return message;
};

// General output message
var displayMessage = function (gameMode, order, playerIndex) {
  var message = '';
  var latestNumber;
  if (numberOfPlayers == '') {
    message = `How many players are playing this game? Please enter integers (e.g. 1, 2, 3 ...)`;
  } else if (numberOfDice == '') {
    message = `How many dices do you want to play in round ${currentRound}? Please enter integers (e.g. 1, 2, 3 ...)`;
  } else if (order == 1 || order == 2) {
    latestNumber = combinedDiceValue[combinedDiceValue.length - 1].value;
    message = `Player ${playerIndex}, you chose Dice ${order} first. <br> Your number is ${latestNumber}.`;
  } else {
    message = `Welcome Player ${playerIndex}. <br> You rolled ${rollMessage}. <br>`;
    if (gameMode == 1 || gameMode == 2) {
      message = message + `Choose the Dice order by entering 1 or 2`;
    } else {
      latestNumber = combinedDiceValue[combinedDiceValue.length - 1].value;
      message =
        message +
        `Player ${playerIndex}, your automatically combined number is ${latestNumber}.`;
    }
  }
  return message;
};

// Tally score and determine winner
var getWinner = function (gameMode) {
  runningScore = [];
  // Tally score for each player
  var playerIndex = 1;
  while (playerIndex <= numberOfPlayers) {
    var tally = 0;
    var counter = 0;
    while (counter < combinedDiceValue.length) {
      if (combinedDiceValue[counter].player == playerIndex) {
        tally = tally + combinedDiceValue[counter].value;
      }
      counter++;
    }
    runningScore.push({
      player: playerIndex,
      value: tally,
    });
    playerIndex++;
  }
  // Sort running score array for (1) leaderboard, (2) winner can be conveniently determined from index 0 position
  var x = 0;
  while (x < runningScore.length) {
    var y = 0;
    while (y < runningScore.length - 1) {
      if (
        (gameMode == 2 && runningScore[y].value > runningScore[y + 1].value) ||
        (gameMode != 2 && runningScore[y].value < runningScore[y + 1].value)
      ) {
        var tempPlayer = runningScore[y].player;
        var tempValue = runningScore[y].value;
        runningScore[y].player = runningScore[y + 1].player;
        runningScore[y].value = runningScore[y + 1].value;
        runningScore[y + 1].player = tempPlayer;
        runningScore[y + 1].value = tempValue;
      }
      y++;
    }
    x++;
  }

  maxIndex = runningScore[0].player;
  return maxIndex;
};

// Display latest leaderboard and declare winner
var displayLeaderboard = function (winner) {
  var leaderboard = '=========== <br> Leaderboard <br> =========== <br>';
  var counter = 0;
  while (counter < numberOfPlayers) {
    leaderboard =
      leaderboard +
      `Player ${runningScore[counter].player}: ${runningScore[counter].value} <br>`;
    counter++;
  }
  leaderboard = leaderboard + `<br> Player ${winner} is winning`;
  return leaderboard;
};

// Generate the text message of "X (value) for Dice Y (dice number)"
var generateDiceRollMessage = function (playerIndex, roundIndex) {
  var counter = 0;
  var diceMessage = '';
  while (counter < diceObject.length) {
    if (
      diceObject[counter].player == playerIndex &&
      diceObject[counter].round == roundIndex
    ) {
      diceMessage =
        diceMessage +
        `${diceObject[counter].value} for Dice ${diceObject[counter].diceNum}`;
      if ((counter + 1) % numberOfDice != 0) {
        diceMessage = diceMessage + ' and ';
      }
    }
    counter++;
  }
  return diceMessage;
};

// Order the numbers and push the combined value into the combinedDiceValue array object
var getCombinedNumber = function (order, playerIndex, roundIndex) {
  var combinedNumber = '';
  var targetIndex;
  // If sorting is manual
  if (order == 1 || order == 2) {
    var counter = 0;
    // Find the anchor index value in the array object
    while (counter < diceObject.length) {
      if (
        diceObject[counter].player == playerIndex &&
        diceObject[counter].round == roundIndex &&
        diceObject[counter].diceNum == 1
      ) {
        targetIndex = counter;
      }
      counter++;
    }
    // Derive the combined number
    var firstDigit = diceObject[targetIndex].value;
    var secondDigit = diceObject[targetIndex + 1].value;
    if (order == 1) {
      combinedNumber = Number(firstDigit + '' + secondDigit);
    } else if (order == 2) {
      combinedNumber = Number(secondDigit + '' + firstDigit);
    }
    // If sorting is automatic
  } else {
    // Sort array
    var x = 0;
    while (x < diceObject.length) {
      var y = 0;
      while (y < diceObject.length - 1) {
        if (
          diceObject[y].player == playerIndex &&
          diceObject[y + 1].player == playerIndex &&
          diceObject[y].value < diceObject[y + 1].value
        ) {
          var tempValue = diceObject[y].value;
          diceObject[y].value = diceObject[y + 1].value;
          diceObject[y + 1].value = tempValue;
        }
        y++;
      }
      x++;
    }
    // Derive the combined number
    var counter = 0;
    while (counter < diceObject.length) {
      if (
        diceObject[counter].player == playerIndex &&
        diceObject[counter].round == roundIndex
      ) {
        combinedNumber = combinedNumber + '' + diceObject[counter].value;
      }
      counter++;
    }
    combinedNumber = Number(combinedNumber);
  }

  combinedDiceValue.push({
    player: playerIndex,
    round: roundIndex,
    value: combinedNumber,
  });
};

// Populate dice roll and push the value into the diceObject array object
var populateRandomDice = function (playerIndex, roundIndex, totalDice) {
  var diceCounter = 1;
  while (diceCounter <= totalDice) {
    diceObject.push({
      player: playerIndex,
      round: roundIndex,
      diceNum: diceCounter,
      value: Math.ceil(Math.random() * 6),
    });
    diceCounter++;
  }
  rollMessage = generateDiceRollMessage(playerIndex, currentRound);
};
