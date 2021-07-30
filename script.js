var ROLL_DICE_MODE = "Roll Dice Mode";
var CHOOSE_ORDER_MODE = "Choose Order Mode";
var DECIDE_WINNER_MODE = "Decide Winner";
var arrayRolls = [];
var playerOneNum = 0;
var playerTwoNum = 0;
var arrayForNums = [];
var currentPlayer = 1;
var numOfPlayers = 2;
var currentGameMode = ROLL_DICE_MODE;
var playerOneScore = 0;
var playerTwoScore = 0;

var selectAB = function () {
  number = Number(arrayRolls[0] * 10 + arrayRolls[1]);
  return number;
};
var selectBA = function () {
  number = Number(arrayRolls[1] * 10 + arrayRolls[0]);
  return number;
};

var main = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == ROLL_DICE_MODE) {
    myOutputValue = roll(input);
  } else if (currentGameMode == CHOOSE_ORDER_MODE) {
    myOutputValue = pickOrder(input);
  } else if (currentGameMode == DECIDE_WINNER_MODE) {
    myOutputValue = decideWinner(input);
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};

var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
};

var roll = function () {
  arrayRolls = [diceRoll(), diceRoll()];
  var myOutputValue = `Player ${currentPlayer}, your two dice rolls are: A: ${arrayRolls[0]} and B: ${arrayRolls[1]}. <br><br> Please pick the order of the number AB or BA `;
  console.log("arrayRolls", arrayRolls);
  currentGameMode = CHOOSE_ORDER_MODE;
  return myOutputValue;
};

var pickOrder = function (input) {
  var myOutputValue = "";
  console.log("arrayRolls", arrayRolls);
  counter = 0;
  if ((input == "AB") & (currentPlayer == 1)) {
    playerOneNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}.<br><br>It is now Player 2's turn.<br><br> Press submit to roll`;
    currentGameMode = ROLL_DICE_MODE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "AB") & (currentPlayer == 2)) {
    playerTwoNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    currentGameMode = DECIDE_WINNER_MODE;
  } else if ((input == "BA") & (currentPlayer == 1)) {
    playerOneNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}<br><br>It is now Player 2's turn.<br><br>Press submit to roll`;
    currentGameMode = ROLL_DICE_MODE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "BA") & (currentPlayer == 2)) {
    playerTwoNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    currentGameMode = DECIDE_WINNER_MODE;
  }
  console.log("playerOneNum", playerOneNum);
  console.log("playerTwoNum", playerTwoNum);
  console.log("currentGameMode", currentGameMode);
  console.log("arrayForNums", arrayForNums);
  return myOutputValue;
};

var decideWinner = function () {
  var myOutputValue = "None";
  playerOneScore = sumOfNum(1);
  playerTwoScore = sumOfNum(2);
  var leaderBoard = getLeaderboard();
  if (playerOneNum > playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 1 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum < playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 2 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum == playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>It is a draw, let's play again<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  currentGameMode = ROLL_DICE_MODE;
  currentPlayer = 1;
  return myOutputValue;
};

var sumOfNum = function (player) {
  var myOutputValue = 0;
  var counter = player - 1;
  while (counter < arrayForNums.length) {
    myOutputValue = myOutputValue + arrayForNums[counter];
    counter += numOfPlayers;
  }
  return myOutputValue;
};

var getLeaderboard = function () {
  var myOutputValue = [`P1 : ${playerTwoScore} `, `P2 : ${playerOneScore}`];
  if (playerOneScore >= playerTwoScore) {
    myOutputValue = [`P1 : ${playerOneScore} `, `P2 : ${playerTwoScore}`];
  }
  return myOutputValue;
};
