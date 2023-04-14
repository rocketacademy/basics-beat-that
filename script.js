// Project 2 - Beat That
// There are 2 players and players take turns.
/* At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.*/
// input : no of players -> no of dice -> rollDice -> output : dice roll values and optimal combined no for each player -> shows winner of that round + leaderboard

// declaring global variables
let gameStatus = "numPlayers";
let currentPlayer = "Player ";
let gameCtr = 0;
let noOfPlayers = 0;
let playerCtr = 0;
let numDice = 0;
let minDice = 1;
let diceRollResult = [];
let playersArray = [];

// position of nested array column
const PLAYER_NAME = Number(0);
const DICE_RESULT = 1;
const PLAYER_TOTAL = 2;

// rolling one dice
let rollOneDice = function () {
  let randomDecimal = Math.random() * 6;
  let randomInteger = Math.floor(randomDecimal) + 1;
  console.log(randomInteger);
  return randomInteger;
};

// to find winner of each round
let findWinner = function (arrayIndex) {
  let winner = "";
  for (let row = 0, greatest = 0; row < playersArray.length; row += 1) {
    if (playersArray[row][arrayIndex] > greatest) {
      greatest = playersArray[row][arrayIndex];
      winner = `The winner for this round is ${playersArray[row][PLAYER_NAME]}!`;
    } else if (playersArray[row][arrayIndex] == greatest) {
      winner = `${winner} and ${playersArray[row][PLAYER_NAME]} had a draw! `;
    }
  }
  return winner;
};
/*
// to find winner for Scoreboard
let findGrandWinner = function () {
  let grandWinner = "";
  for (let row = 0, greatest = 0; row < playersArray.length; row += 1) {
    if (playersArray[row][PLAYER_TOTAL] > greatest) {
      greatest = playersArray[row][PLAYER_TOTAL];
      grandWinner = playersArray[row][PLAYER_NAME];
    } else if (playersArray[row][PLAYER_TOTAL] == greatest) {
      grandWinner = `${grandWinner} and ${playersArray[row][PLAYER_NAME]} had a draw!`;
    }
  }
  return grandWinner;
};
*/
// to find index of array match for current player
let matchingArray = function () {
  for (let row = 0; row <= noOfPlayers; row += 1) {
    if (playersArray[row][PLAYER_NAME] == currentPlayer) {
      return row;
    }
  }
};

// roll no of Dice specified by user
let rollTotalDice = function () {
  console.log(`Roll Total Dice Function running.`);
  let outputValue = "";
  let winner = "";
  if (gameCtr == 0) {
    outputValue = `Welcome ${currentPlayer}. 🤩 <br><br> You have rolled`;
  } else {
    outputValue = `${currentPlayer}, you have rolled`;
  }
  for (let diceNo = 0; diceNo < numDice; diceNo += 1) {
    diceRollResult[diceNo] = rollOneDice();
  }
  for (let arrayPos = 0; arrayPos < numDice; arrayPos += 1) {
    if (arrayPos < numDice - 1) {
      outputValue = outputValue + ` ${diceRollResult[arrayPos]},`;
    } else {
      outputValue = outputValue + ` ${diceRollResult[arrayPos]}. `;
    }
  }

  diceRollResult.sort();
  diceRollResult.reverse();
  let numOfPlayers = "Player " + noOfPlayers;
  let arrayIndex = matchingArray();
  playersArray[arrayIndex][DICE_RESULT] = Number(diceRollResult.join(""));
  playersArray[arrayIndex][PLAYER_TOTAL] +=
    playersArray[arrayIndex][DICE_RESULT];

  if (currentPlayer != numOfPlayers) {
    outputValue =
      outputValue +
      `<br>Your optimal combination is ${playersArray[arrayIndex][DICE_RESULT]}. 💪 <br>Click "Submit" to roll the dice for the next player.`;
    currentPlayer;
  } else {
    winner = findWinner(DICE_RESULT);
    grandWinner = findWinner(PLAYER_TOTAL);
    outputValue =
      outputValue +
      `<br>${playersArray[arrayIndex][PLAYER_NAME]}, your optimal combination is ${playersArray[arrayIndex][DICE_RESULT]}. 💪 <br><br> ${winner} 🎉
      <br>Click "Submit" to start a new round! <br><br> `;
    gameCtr += 1;
    let scoreboardDisplay = displayScoreBoard();
    outputValue = `${outputValue} ${scoreboardDisplay}`;
  }
  return outputValue;
};

// to display the Leaderboard
let displayScoreBoard = function () {
  let outputValue = `<div id="scoreboard"><center>
      <hr style="width:50%">
        <br>🏆 Leaderboard 🏆
        <br>
        <br>${grandWinner} is leading! 🎊
        <br><br>Total Rounds: ${gameCtr}<br>`;
  for (let row = 0; row < playersArray.length; row += 1) {
    outputValue =
      outputValue +
      `${playersArray[row][PLAYER_NAME]} Grand Total: ${playersArray[row][PLAYER_TOTAL]} <br>`;
  }
  return outputValue;
};

let checkNumPlayers = function (input) {
  let outputValue = "";
  if (Number.isNaN(Number(input))) {
    outputValue = `You have keyed in an invalid choice. Please key in the number of players.`;
  } else if (input == 1) {
    outputValue = `You need a minimum of 2 players to play this game. Please key in a number greater than 1.`;
  } else {
    noOfPlayers = input;
    for (let ctr = 1; ctr <= noOfPlayers; ctr += 1) {
      playersArray.push([`Player ${ctr}`, 0, 0]);
    }
    gameStatus = "numDice";
    outputValue = `You have set the game for ${noOfPlayers} players. Now key in the number of dice you wish to roll.`;
  }
  return outputValue;
};

let checkNumDice = function (input) {
  let outputValue = "";
  if (Number.isNaN(Number(input))) {
    outputValue = `You have keyed in an invalid choice. Please key in the number of dice you wish to use. Then click submit to roll the dice.`;
  } else if (input <= minDice) {
    outputValue = `The minimum number of dice to play is 2. Please key in a number above 2. Then click submit to roll the dice.`;
  } else {
    numDice = input;
    gameStatus = "rollDice";
    outputValue = `You have chosen to roll ${numDice} dice. Please click 'Submit' to start the game.`;
  }
  return outputValue;
};

let checkRollDice = function (input) {
  let outputValue = "";
  if (input != "") {
    outputValue = `You don't need to key in anything. Please click 'Submit' to roll the dice.`;
  } else {
    if (playerCtr < noOfPlayers) {
      playerCtr += 1;
      currentPlayer = `Player ${playerCtr}`;
      outputValue = rollTotalDice();
    } else {
      playerCtr = 1;
      currentPlayer = `Player ${playerCtr}`;
      outputValue = rollTotalDice();
    }
  }
  return outputValue;
};

let main = function (input) {
  let myOutputValue = "";
  if (gameStatus == "numPlayers") {
    myOutputValue = checkNumPlayers(input);
  } else if (gameStatus == "numDice") {
    myOutputValue = checkNumDice(input);
  } else if (gameStatus == "rollDice") {
    myOutputValue = checkRollDice(input);
  }
  return myOutputValue;
};
