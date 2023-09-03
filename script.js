//global variables
var gameMode = "Number of players";
var playerNum = 0;
var totalPlayers = 0;
var playerRound = 0;
var playerDiceOne = "";
var playerDiceTwo = "";
var playerCombinedDice = [];
var playerResult = 0;
var largestNum = 0;
var winningBoard = [];
var scoreBoard = [];

var calcScoreBoard = function () {
  //loop through winning board length
  for (var i = 0; i < winningBoard.length; i += 1) {
    //for each element in winning board loop through each player number
    for (var j = 0; j < totalPlayers - 1; j += 1) {
      if (winningBoard[j] == j) {
        var calcScore = 0;
        calcScore += 1;
        scoreBoard.push(`Player ${j + 1}: ${calcScore}`);
      }
    }
  }
  return scoreBoard;
};

//player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
var playerRoll = function () {
  playerDiceOne = rollDice().toString();
  playerDiceTwo = rollDice().toString();
};

//player pick the order to concatenate
var combinePlayerDice = function (diceChoice) {
  if (diceChoice == 1) {
    playerCombinedDice[playerNum] = Number(playerDiceOne + playerDiceTwo);
    return playerCombinedDice;
  }
  playerCombinedDice[playerNum] = Number(playerDiceTwo + playerDiceOne);
  return playerCombinedDice;
};

//roll dice function
var rollDice = function () {
  var randomValue = Math.random() * 6;
  var randomInteger = Math.floor(randomValue);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//winning functions
var calcWinner = function () {
  largestNum = playerCombinedDice[0];
  for (var i = 0; i < playerCombinedDice.length; i += 1) {
    if (playerCombinedDice[i] > largestNum) {
      largestNum = playerCombinedDice[i];
    }
  }
  var winningPlayer = playerCombinedDice.indexOf(largestNum) + 1;
  winningBoard.push(winningPlayer);
  return winningPlayer;
};

var calcScore = function () {
  var output = "";
  var totalScore = 0;
  //reset the scoreboard
  for (var h = 0; h < totalPlayers; h += 1) {
    scoreBoard.pop();
  }
  //loop each player through the winning board and count number of times each player wins
  for (var i = 0; i < totalPlayers; i += 1) {
    //loop each win in the winning board and match with player number
    for (var j = 0; j < winningBoard.length; j += 1) {
      if (winningBoard[j] == i + 1) {
        //if match then + 1
        totalScore += 1;
      }
    }
    //push the scores of each player into the scoreboard array
    scoreBoard.push(totalScore);
    //reset the score for each player
    totalScore = 0;
  }
  for (var v = 0; v < totalPlayers; v += 1) {
    output =
      output + `⭐ <b>Player ${v + 1}</b> ⭐ ${scoreBoard[v]} points <br>`;
  }
  return output;
};

var gameMechanics = function (input) {
  if (gameMode == "roll dice") {
    //roll the dice
    playerRollDice = playerRoll();
    gameMode = "combine dice";
    return `🎲 <b> Player ${
      playerNum + 1
    } </b> 🎲 <br><br> You rolled ${playerDiceOne} for Dice One and ${playerDiceTwo} for Dice Two. <br><br> Choose the order of the dice. Input "1" or "2"`;
  } else if (gameMode == "combine dice") {
    //validate input is 1 or 2
    if (isNaN(Number(input)) == true || (input !== "1" && input !== "2")) {
      return `You did not enter a valid input. <br><br> Please enter either "1" or "2"`;
    } else playerCombinedDice = combinePlayerDice(input);
    playerResult = playerCombinedDice[playerNum];
    playerNum += 1;
    if (playerNum != totalPlayers) {
      gameMode = "roll dice";
      return `🎲 <b> Player ${playerNum} </b> 🎲 <br><br> Your combined dice roll is ${playerResult} <br><br> It is now Player ${
        playerNum + 1
      }'s turn! Please click "Submit"!`;
    }
    return `🎲 <b> Player ${playerNum} </b> 🎲 <br><br> Your combined dice roll is ${playerResult} <br><br> Let's see who wins~</br>`;
  }
};

var main = function (input) {
  if (isNaN(Number(input)) == true)
    return `You did not enter a number! Please enter the number of players!`;
  //define number of players to play
  if (gameMode == "Number of players") {
    totalPlayers = Number(input);
    gameMode = "roll dice";
    return `There are a total of ${totalPlayers} players! Click "Submit" to begin!`;
  }
  while (playerNum < totalPlayers) {
    var playGameMechanics = gameMechanics(input);
    return playGameMechanics;
  }
  //winning conditions
  var findWinner = calcWinner();
  var finalScore = calcScore();
  playerNum = 0;
  playerCombinedDice = [];
  gameMode = "roll dice";
  return `🎲 <b> Player ${findWinner} wins! 🎲 </b> <br><br> The combined dice roll is ${largestNum}! <br><br>Let's play again! <br><br><br> ${finalScore}`;
};
