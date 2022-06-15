var gameMode = "Waiting for Number of Players";
var gameStart = false;
var playerScores = [];
const winnerList = [];
var noOfPlayers = 0;
var currentPlayer = 0;
var playerDiceRolls = [];
var previousScores = [];
var previousWinners = [];
var gamePlayMode = "Choose Play Mode";
var noOfDice = 2;

var main = function (input) {
  myOutputValue = "";
  //
  if (!gameStart && gameMode == "Waiting for Number of Players") {
    if (input <= 1 || isNaN(input) == true) {
      myOutputValue = "At least 2 players are required for this game";
    } else {
      gameMode = "Choose Game Mode";
      noOfPlayers = input;
      for (var i = 0; i < noOfPlayers; i++) {
        previousWinners.push(0);
      }
      console.log(previousWinners);
      myOutputValue = `🎲 Game started with ${input} players. Play in reverse mode? Y/N. 🎲`;
    }
  }
  // select game mode (reverse or normal)
  else if (
    !gameStart &&
    gameMode == "Choose Game Mode" &&
    gamePlayMode == "Choose Play Mode"
  ) {
    if (input == "Y" || input == "y") {
      gameMode = "Choose Number of Dice";
      gamePlayMode = "Lowest Dice";
      return `Lowest 🎲 Game started with ${noOfPlayers} players. How many 🎲 would you like to play with?`;
    } else if (input == "N" || input == "n") {
      gameMode = "Choose Number of Dice";
      gamePlayMode = "Highest Dice";
      return `Highest 🎲 Game started with ${noOfPlayers} players. How many 🎲 would you like to play with?`;
    } else {
      return `Please input Y to start the game in reverse mode, or N to play in normal mode.`;
    }
  } else if (!gameStart && gameMode == "Choose Number of Dice") {
    if (input <= 1 || isNaN(input) == true) {
      return `At least 2 dices are required for this game`;
    } else {
      noOfDice = input;
      gameMode = "Roll Dice";
      gameStart = true;
      return `Game started with ${noOfDice} 🎲 . Click Submit to start rolling.`;
    }
  }
  //dice-roll mode
  else if (gameStart && gameMode == "Roll Dice") {
    console.log(gamePlayMode);
    if (currentPlayer < noOfPlayers) {
      playerDiceRolls = [];
      currentPlayer += 1;
      var diceResult = beatThatRollDice(playerDiceRolls, currentPlayer);
      return diceResult;
      //at the end of the game(currentPlayer >= noOfPlayers), check for the winner(s)
    } else {
      gameStart = false;
      gameMode = "Game Ended";
      myOutputValue = winnerCheck(playerScores);
      previousScores.push([playerScores]);
      playerScores = [];
      //console.log("prev scores= ", previousScores);
      return myOutputValue;
    }
    //choose-dice mode
  } else if (!gameStart && gameMode == "Game Ended") {
    myOutputValue = resetGame(input);
  }
  return myOutputValue;
};

var diceRoll = function () {
  randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

var winnerCheck = function (scoreList) {
  var highscore = 0;
  var winnerIndex = 0;
  var additionalWinners = "";
  var lowestscore = scoreList[0];
  //go through the score list to find the highest score (Highest Dice Mode)
  if (gamePlayMode == "Highest Dice") {
    for (var j = 0; j < scoreList.length; j++) {
      if (scoreList[j] > highscore) {
        highscore = scoreList[j];
        winnerIndex = j;
      }
    }
    previousWinners[winnerIndex] += 1;
    // console.log(highscore);
    // console.log(previousWinners);
    //check for additional winners (if any)
    for (var k = 0; k < scoreList.length; k++) {
      if (scoreList[k] == highscore && k != winnerIndex) {
        additionalWinners += ` and ${k + 1}`;
        previousWinners[k] += 1;
      }
    }
    // console.log(previousWinners);
    return `🎲 Winner is Player ${
      winnerIndex + 1
    }${additionalWinners}, with a score of ${highscore}.🎲<br>Would you like to play again? y/n.`;
  } else if (gamePlayMode == "Lowest Dice") {
    console.log("scorelist=" + scoreList);
    for (var i = 0; i < scoreList.length; i++) {
      if (scoreList[i] < lowestscore) {
        lowestscore = scoreList[i];
        winnerIndex = i;
      }
      console.log(lowestscore);
      console.log(winnerIndex);
    }
    previousWinners[winnerIndex] += 1;
    for (var k = 0; k < scoreList.length; k++) {
      if (scoreList[k] == lowestscore && k != winnerIndex) {
        additionalWinners += ` and ${k + 1}`;
        previousWinners[k] += 1;
        console.log("ran");
      }
    }
    console.log(lowestscore);
    return `🎲 Winner is Player ${
      winnerIndex + 1
    }${additionalWinners}, with a score of ${lowestscore}.🎲<br>Would you like to play again? y/n.`;
  }
};

var overallWinner = function () {
  var highscore = 0;
  var winnerIndex = 0;
  var additionalWinners = "";
  console.log(previousWinners);
  for (var i = 0; i < previousWinners.length; i++) {
    if (previousWinners[i] > highscore) {
      highscore = previousWinners[i];
      winnerIndex = i;
    }
  }
  for (var j = 0; j < previousWinners.length; j++) {
    if (previousWinners[j] == highscore && j != winnerIndex) {
      additionalWinners += ` and ${j + 1}`;
    }
  }
  return `The Overall Winner is Player <b>${
    winnerIndex + 1
  }${additionalWinners}</b> with ${highscore} wins.`;
};

var beatThatRollDice = function (playerDiceRolls, i) {
  //roll 2 dices
  var dices = "";
  for (var i = 0; i < noOfDice; i++) {
    var diceNumber = diceRoll();
    playerDiceRolls.push(diceNumber);
    dices += `<b>${diceNumber}</b> for Dice ${i + 1} `;
  }
  playerScore = autoChooseDice(playerDiceRolls);
  myOutputValue = `🎲Player ${i} has rolled ${dices}.🎲<br>Your Score is ${playerScore}`;
  return myOutputValue;
};

var autoChooseDice = function (rollList) {
  score = 0;
  var sorted = rollList.sort().reverse();
  for (var i = 0; i < sorted.length; i++) {
    score += sorted[i] * 10 ** (sorted.length - 1 - i);
  }
  // if (gamePlayMode == "Highest Dice") {
  //   if (rollList[0] > rollList[1]) {
  //     score = rollList[0] * 10 + rollList[1];
  //   } else if (rollList[1] > rollList[0]) {
  //     score = rollList[1] * 10 + rollList[0];
  //   }
  // } else if (gamePlayMode == "Lowest Dice") {
  //   if (rollList[0] < rollList[1]) {
  //     score = rollList[0] * 10 + rollList[1];
  //   } else if (rollList[1] < rollList[0]) {
  //     score = rollList[1] * 10 + rollList[0];
  //   }
  // }
  playerScores.push(score);
  return score;
};

var beatThatChooseDice = function (rollList, input, i) {
  var score = 0;
  // input validation for choosing dice
  if (input != 1 && input != 2) {
    return `Please input 1 or 2`;
  }
  //calculate scores if input is 1 or 2
  else if (input == 1) {
    score = rollList[0] * 10 + rollList[1];
    playerScores.push(score);
  } else if (input == 2) {
    score = rollList[1] * 10 + rollList[0];
    playerScores.push(score);
  }
  //change gameMode back to Dice Roll
  gameMode = "Dice Roll";
  if (i < noOfPlayers - 1) {
    return `Player ${i}, you chose Dice ${input} first.<br>Your score is ${score}. It is now Player ${
      i + 1
    }'s turn.`;
  } else {
    return `Player ${i}, you chose Dice ${input} first.<br>Your score is ${score}.`;
  }
};

//if dice numbers are the same, no need to choose dice, just calculate immediately
var sameDices = function (rollList) {
  var score = rollList[0] * 10 + rollList[1];
  playerScores.push(score);
  return score;
};

var resetGame = function (input) {
  if (input == "y" || input == "Y") {
    playerDiceRolls = [];
    gameStart = true;
    gameMode = "Roll Dice";
    currentPlayer = 1;
    return beatThatRollDice(playerDiceRolls, currentPlayer);
  } else if (input == "N" || input == "n") {
    return overallWinner();
  } else {
    return `Enter Y/N to proceed`;
  }
};
