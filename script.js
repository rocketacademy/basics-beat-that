//global variables
let playerTurnCounter = 1;
const playerDice = [];
let totalPlayer = 0;
let numOfDice = 0;
let playerScore = [];
let autoModeFlag = 1;
let leaderBoard = [];
let reverseModeFlag = 0;
let knockOutFlag = 0;

var main = function (input) {
  if (input.toLowerCase().includes("reverse")) {
    reverseModeFlag = 1;
    return "Reversed mode activated. Please get the lowest score to win";
  }
  if (input.toLowerCase().includes("knockout")) {
    knockOutFlag = 1;
    return "Knockout mode activated. Please enter 3 or more players to play";
  }
  if (input.toLowerCase().includes("reset")) {
    playerTurnCounter = 1;
    totalPlayer = 0;
    numOfDice = 0;
    autoModeFlag = 1;
    reverseModeFlag = 0;
    knockOutFlag = 0;
    return "Game reset. Enter number of players to play";
  }

  if (totalPlayer == 0) {
    totalPlayer = input;
    for (let i = 0; i < totalPlayer; i++) {
      playerDice[i] = [];
      playerScore[i] = 0;
    }
    return `${totalPlayer} players will be playing the game. Please enter the number of dice to roll.`;
  }
  if (numOfDice == 0) {
    numOfDice = input;
    return `${numOfDice} dice will be rolled for this game. Player 1 please press submit to roll`;
  }
  if (knockOutFlag == 1) {
    return knockOut(input);
  }
  return normalGame();
};

//roll dice
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//rolls the number of dice for current player and stores them in a dice array after sorting big to small
var playerTurn = function (noOfDice, playerTurnCounter) {
  for (let i = 0; i < noOfDice; i++) {
    playerDice[playerTurnCounter - 1][i] = diceRoll();
  }
  if (reverseModeFlag == 1) {
    playerDice[playerTurnCounter - 1].sort();
  } else {
    playerDice[playerTurnCounter - 1].sort().reverse();
  }
};

//converts the dice roll into the largest number possible and stores them in a score array
var autoMode = function (diceArray) {
  playerScore[playerTurnCounter - 1] += parseInt(
    diceArray.toString().replace(/,/g, "")
  );
};

// reset global variables to reset the game
var resetGame = function () {
  //totalPlayer = 0;
  numOfDice = 0;
  playerTurnCounter = 1;
};

// to create a leaderboard of the player scores by initalising a new array of arrays that carry the player's score and index number then sorting that array according to gamemode requirements
var scoreBoard = function () {
  for (let i = 0; i < totalPlayer; i++) {
    leaderBoard[i] = [];
  }
  for (let i = 0; i < totalPlayer; i++) {
    leaderBoard[i] = [playerScore[i], [i + 1]];
  }
  if (reverseModeFlag == 1) {
    leaderBoard.sort(function (a, b) {
      return a[0] - b[0];
    });
  } else {
    leaderBoard.sort(function (a, b) {
      return b[0] - a[0];
    });
  }
};

// to print out leaderboard in a table format
var printLeaderBoard = function () {
  let outputMessage = `<br>LeaderBoard<br><br>Player\xa0\xa0\xa0\xa0Score<br>`;
  for (let i = 0; i < totalPlayer; i++) {
    outputMessage += `<br> Player ${leaderBoard[i][1]}\xa0\xa0${leaderBoard[i][0]}`;
  }
  return outputMessage;
};

//for the output message to call out which player's turn it is
var playerCallMessage = function () {
  if (playerTurnCounter <= totalPlayer) {
    return `Player ${playerTurnCounter} please press submit to roll`;
  } else {
    return "Please press submit to see results";
  }
};

//to play the knockout game
var knockOut = function (input) {
  if (totalPlayer <= 2) {
    totalPlayer = input;
    return "Too little players. Please submit 3 or more players to play";
  } else {
    if (playerTurnCounter <= totalPlayer) {
      playerTurn(numOfDice, playerTurnCounter);
    }
    if (autoModeFlag == 1 && playerTurnCounter <= totalPlayer) {
      autoMode(playerDice[playerTurnCounter - 1]);
    }

    console.log("here");
    console.log(playerScore);
    let winner = 0;
    let winningScore = 0;
    if (reverseModeFlag == 1) {
      winningScore = Math.min.apply(null, playerScore);
      winner = playerScore.indexOf(winningScore) + 1;
    } else {
      winningScore = Math.max.apply(null, playerScore);
      winner = playerScore.indexOf(winningScore) + 1;
    }
    playerTurnCounter += 1;
    return `The score was ${
      playerScore[playerTurnCounter - 2]
    }<br>Player ${winner} is winning, with a score of ${winningScore}, ${playerCallMessageKO()}`;
  }
};

//for the knockout game to call out which player's turn it is
var playerCallMessageKO = function () {
  if (playerTurnCounter <= totalPlayer) {
    return `Player ${playerTurnCounter} please press submit to roll`;
  } else {
    for (let i = 0; i < totalPlayer; i++) {
      playerScore[i] = 0;
    }
    playerTurnCounter = 1;
    return "Press submit to start with player 1 again ";
  }
};

//function for the normal game to run
var normalGame = function () {
  if (playerTurnCounter <= totalPlayer) {
    playerTurn(numOfDice, playerTurnCounter);
  }
  if (autoModeFlag == 1 && playerTurnCounter <= totalPlayer) {
    autoMode(playerDice[playerTurnCounter - 1]);
  }
  //check if every player finished their turn and output the final winner
  if (playerTurnCounter > totalPlayer) {
    let winner = 0;
    let winningScore = 0;
    if (reverseModeFlag == 1) {
      winningScore = Math.min.apply(null, playerScore);
      winner = playerScore.indexOf(winningScore) + 1;
    } else {
      winningScore = Math.max.apply(null, playerScore);
      winner = playerScore.indexOf(winningScore) + 1;
    }

    scoreBoard();

    let winlist = printLeaderBoard();
    resetGame();
    return `Player ${winner} is winning, with a score of ${winningScore}<br> ${winlist} <br><br>Play again? Submit the number of dice to continue`;
  }

  playerTurnCounter += 1;

  return `The roll is ${
    playerDice[playerTurnCounter - 2]
  } <br>${playerCallMessage()}`;
};
