var gameMode = "Waiting for Number of Players";
var gameStart = false;
var playerScores = [];
const winnerList = [];
var noOfPlayers = 0;
var currentPlayer = 0;
var playerDiceRolls = [];
var previousScores = [];
var previousWinners = [];

var main = function (input) {
  myOutputValue = "";
  //
  if (!gameStart && gameMode == "Waiting for Number of Players") {
    if (input <= 1 || isNaN(input) == true) {
      myOutputValue = "At least 2 players are required for this game";
    } else {
      gameMode = "Dice Roll";
      gameStart = true;
      noOfPlayers = input;
      for (var i = 0; i < noOfPlayers; i++) {
        previousWinners.push(0);
      }
      console.log(previousWinners);
      myOutputValue = `🎲 Game started with ${input} players. Click submit to proceed. 🎲`;
    }
    //dice-roll mode
  } else if (gameStart && gameMode == "Dice Roll") {
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
  } else if (gameStart && gameMode == "Choose Dice") {
    //console.log(playerDiceRolls);
    playerscore = beatThatChooseDice(playerDiceRolls, input, currentPlayer);
    return playerscore;
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
  //go through the score list to find the highest score
  for (var j = 0; j < scoreList.length; j++) {
    if (scoreList[j] > highscore) {
      highscore = scoreList[j];
      winnerIndex = j;
    }
  }
  previousWinners[winnerIndex] += 1;
  console.log(highscore);
  console.log(previousWinners);
  //check for additional winners (if any)
  for (var k = 0; k < scoreList.length; k++) {
    if (scoreList[k] == highscore && k != winnerIndex) {
      additionalWinners += ` and ${k + 1}`;
      previousWinners[k] += 1;
    }
  }
  console.log(previousWinners);
  return `🎲 Winner is Player ${
    winnerIndex + 1
  }${additionalWinners}, with a score of ${highscore}.🎲<br>Would you like to play again? y/n.`;
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
      additionalWinners += `and ${j + 1}`;
    }
  }
  return `The Overall Winner is Player ${
    winnerIndex + 1
  } and ${additionalWinners} with ${highscore} wins.`;
};

var beatThatRollDice = function (playerDiceRolls, i) {
  //roll 2 dices
  var dice1 = diceRoll();
  var dice2 = diceRoll();
  //push the dice numbers to a list
  playerDiceRolls.push(dice1);
  playerDiceRolls.push(dice2);
  //if same dice numbers, call sameDices function
  if (dice1 == dice2) {
    score = sameDices(playerDiceRolls);
    console.log(playerDiceRolls);
    //gameMode = "Roll Dice";
    myOutputValue = `🎲 Player ${i} has rolled <b>${dice1}</b> for Dice 1 and <b>${dice2}</b> for Dice 2.🎲<br>Your score is ${score}.`;
  }
  //if different dice numbers, change gameMode to "Choose Dice"
  else {
    console.log(playerDiceRolls);
    gameMode = "Choose Dice";
    myOutputValue = `🎲Player ${i}has rolled <b>${dice1}</b> for Dice 1 and <b>${dice2}</b> for Dice 2.🎲<br>Choose the order of the dice.`;
  }
  return myOutputValue;
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
    gameMode = "Dice Roll";
    currentPlayer = 1;
    return beatThatRollDice(playerDiceRolls, currentPlayer);
  } else if (input == "N" || input == "n") {
    return overallWinner();
  } else {
    return `Enter Y/N to proceed`;
  }
};
