var gameMode = "mode selection";
var concatenateNum = "";
var rollDiceResult = [];
var numOfDice = 2;
var winResults = "";
var leaderBoardResults = "";
var gameVersion = "";

var player1RollDiceResult = [];
var player1ConcatenateNum = "";
var player1ScoreSum = 0;

var player2RollDiceResult = [];
var player2ConcatenateNum = "";
var player2ScoreSum = 0;

console.log(`Current game mode is ${gameMode}.`);
console.log(`Current game version is ${gameVersion}.`);

var main = function (input) {
  var myOutputValue = "";

  console.clear();

  if (gameMode == "mode selection") {
    gameMode = "game intro";

    if (input == "Normal") {
      gameVersion = "normal";
    } else {
      gameVersion = "lowestCombined";
    }
    console.log(`Current game mode is ${gameMode}.`);
    console.log(`Current game version is ${gameVersion}.`);
    myOutputValue = `You have selected the ${input} version. Please click submit to start rolling!`;
    return myOutputValue;
  } else {
    console.log(`Yeah!! you reached this point!`);
    return playGame(gameMode, input);
  }
};

// Function to generate random dice number
var rollDice = function () {
  var randomDiceNum = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum;
};

// Function to add random dice number to array
var generateDiceResult = function () {
  var counter = 0;
  rollDiceResult = [];
  while (counter < numOfDice) {
    rollDiceResult.push(rollDice());
    counter += 1;
  }
  return rollDiceResult;
};

// Function to concatenate dice numbers

var concatenateDiceNum = function (input) {
  var dicePosition1 = "";
  var dicePosition2 = "";
  if (input == "Dice 1") {
    dicePosition1 = rollDiceResult[0];
    // console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[1];
    // console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  } else {
    dicePosition1 = rollDiceResult[1];
    // console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[0];
    // console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  }
};

// Function to check who wins for the round
var checkWhoWins = function (player1CurrentScore, player2CurrentScore) {
  var resultStatement = "";
  gameMode = "game intro";

  if (player1CurrentScore == player2CurrentScore) {
    resultStatement = `It's a draw! Click submit to try again.`;
    return resultStatement;
  } else if (player1CurrentScore > player2CurrentScore) {
    resultStatement = `Player 1 won this round!`;
    return resultStatement;
  } else {
    resultStatement = `Player 2 won this round!`;
    return resultStatement;
  }
};

// Function to generate leaderboard results
var leaderBoard = function (player1SumScore, player2SumScore) {
  var leaderBoardTitle = "<u>Leaderboard</u>";
  if (player1SumScore > player2SumScore || player1SumScore == player2SumScore) {
    leaderBoardResults = `${leaderBoardTitle}<br>Player 1: ${player1SumScore}<br>Player 2: ${player2SumScore}`;
    return leaderBoardResults;
  } else {
    leaderBoardResults = `${leaderBoardTitle}<br>Player 2: ${player2SumScore}<br>Player 1: ${player1SumScore}`;
    return leaderBoardResults;
  }
};

// Function to play the game

var playGame = function (currentGameMode, input) {
  console.log(`Current game mode is ${currentGameMode}`);
  var myOutputValue = "";
  if (currentGameMode == "game intro") {
    player1RollDiceResult = generateDiceResult();
    gameMode = "player 1 selection";
    myOutputValue = `Welcome Player 1.<br><br>You rolled ${player1RollDiceResult[0]} for Dice 1 and ${player1RollDiceResult[1]} for Dice 2.<br><br>Choose the order of the dice.`;
    return myOutputValue;
  } else if (currentGameMode == "player 1 selection") {
    player1ConcatenateNum = concatenateDiceNum(input);
    player1ScoreSum += player1ConcatenateNum;
    leaderBoard(player1ScoreSum, player2ScoreSum);
    myOutputValue = `Player 1, you chose ${input} first.<br><br>Your number is ${player1ConcatenateNum}.<br><br>It is now Player 2's turn. Click Submit to roll dice.<br><br>${leaderBoardResults}`;
    gameMode = "player 2 roll dice";
    return myOutputValue;
  } else if (currentGameMode == "player 2 roll dice") {
    gameMode = "player 2 selection";
    player2RollDiceResult = generateDiceResult();
    myOutputValue = `Welcome Player 2.<br><br>You rolled ${player2RollDiceResult[0]} for Dice 1 and ${player2RollDiceResult[1]} for Dice 2.<br><br>Choose the order of the dice.`;
    return myOutputValue;
  } else if (currentGameMode == "player 2 selection") {
    player2ConcatenateNum = concatenateDiceNum(input);
    player2ScoreSum += player2ConcatenateNum;
    leaderBoard(player1ScoreSum, player2ScoreSum);
    winResults = checkWhoWins(player1ConcatenateNum, player2ConcatenateNum);
    myOutputValue = `Player 2, you chose ${input} first.<br><br>Your number is ${player2ConcatenateNum}.<br><br>${winResults}<br><br>It is now Player 1's turn. Click Submit to roll dice.<br><br>${leaderBoardResults}`;
    return myOutputValue;
  }
};

var whosTurn = function () {};
