var gameMode = "Waiting for Number of Players";
var gameStart = false;
var playerScores = [];
const winnerList = [];
var noOfPlayers = 0;
var currentPlayer = 0;
var playerDiceRolls = [];
var previousScores = []; //counter for round wins
var previousWinners = []; // counter for winners each round
var gamePlayMode = "Choose Play Mode";
var noOfDice = 2;

var main = function (input) {
  myOutputValue = "";
  //choose number of players to play
  if (!gameStart && gameMode == "Waiting for Number of Players") {
    if (input <= 1 || isNaN(input)) {
      myOutputValue = "At least 2 players are required for this game";
    } else {
      // if input is validated (players >=2), user to choose the game mode (highest or lowest dice)
      gameMode = "Choose Game Mode";
      noOfPlayers = input;
      for (var i = 0; i < noOfPlayers; i++) {
        previousWinners.push(0);
      }
      console.log(previousWinners);
      myOutputValue = `🎲 Game started with ${input} players. Play in reverse mode? Y/N. 🎲`;
    }
  }
  // select game mode (reverse = lowest dice or normal = highest dice)
  else if (
    !gameStart &&
    gameMode == "Choose Game Mode" &&
    gamePlayMode == "Choose Play Mode"
  ) {
    //player chooses Lowest Dice Mode

    // can force input to all lowercase**

    if (input == "Y" || input == "y") {
      gameMode = "Choose Number of Dice";
      gamePlayMode = "Lowest Dice";
      return `Lowest 🎲 Game started with ${noOfPlayers} players. How many 🎲 would you like to play with?`;
    } else if (input == "N" || input == "n") {
      //player chooses Highest Dice Mode
      gameMode = "Choose Number of Dice";
      gamePlayMode = "Highest Dice";
      return `Highest 🎲 Game started with ${noOfPlayers} players. How many 🎲 would you like to play with?`;
    } else {
      return `Please input Y to start the game in reverse mode, or N to play in normal mode.`;
    }
    //player chooses number of dice to use
  } else if (!gameStart && gameMode == "Choose Number of Dice") {
    if (input <= 1 || isNaN(input)) {
      return `At least 2 dices are required for this game`;
    } else {
      noOfDice = input;
      gameMode = "Roll Dice";
      gameStart = true;
      return `Game started with ${noOfDice} 🎲 . Click Submit to start rolling.`;
    }
  }
  //dice-roll mode for all players
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
// dice roll helper function
var diceRoll = function () {
  randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};
// check for the winner of each round
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
    // add 1 to the score counter for each round
    previousWinners[winnerIndex] += 1;
    //check for additional winners (if any)
    for (var k = 0; k < scoreList.length; k++) {
      if (scoreList[k] == highscore && k != winnerIndex) {
        additionalWinners += ` and ${k + 1}`;
        // add 1 to the score counter each round
        previousWinners[k] += 1;
      }
    }
    return `🎲 Winner is Player ${
      winnerIndex + 1
    }${additionalWinners}, with a score of ${highscore}.🎲<br>Would you like to play again? y/n.`;
  }
  //go through score list to find the lowest score (Lowest Dice Mode)
  else if (gamePlayMode == "Lowest Dice") {
    console.log("scorelist=" + scoreList);
    for (var i = 0; i < scoreList.length; i++) {
      if (scoreList[i] < lowestscore) {
        lowestscore = scoreList[i];
        winnerIndex = i;
      }
      console.log(lowestscore);
      console.log(winnerIndex);
    }
    // add 1 to the score counter each round
    previousWinners[winnerIndex] += 1;
    //check for additional winners (if any)
    for (var k = 0; k < scoreList.length; k++) {
      if (scoreList[k] == lowestscore && k != winnerIndex) {
        additionalWinners += ` and ${k + 1}`;
        // add 1 to the score counter each round
        previousWinners[k] += 1;
        console.log("ran");
      }
    }
    //console.log(lowestscore);
    return `🎲 Winner is Player ${
      winnerIndex + 1
    }${additionalWinners}, with a score of ${lowestscore}.🎲<br>Would you like to play again? y/n.`;
  }
};
//check for the overall winner of the game
var overallWinner = function () {
  var highscore = 0;
  var winnerIndex = 0;
  var additionalWinners = "";
  console.log(previousWinners);
  // check which player index has the highest score
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
  myOutputValue = `🎲Player ${currentPlayer} has rolled ${dices}.🎲<br>Your Score is ${playerScore}`;
  return myOutputValue;
};
// helper function to derive score from dice rolls
var autoChooseDice = function (rollList) {
  score = 0;
  if (gamePlayMode == "Lowest Dice") {
    //sort dice in ascending order
    var sorted = rollList.sort();
  } else {
    //sort dice in descending order
    var sorted = rollList.sort().reverse();
  }
  for (var i = 0; i < sorted.length; i++) {
    //join the individual digits to a multi-digit integer
    score += sorted[i] * 10 ** (sorted.length - 1 - i);
  }

  playerScores.push(score);
  return score;
};

// function to restart or end the game after each round
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
