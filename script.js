// Global variable to track game version
var gameVersion = "";

// Global variable to track the game mode, ie. if it's player 1's or player 2's turn.
var gameMode = "1";

// Global variable to track the player's number selections.
var player1Final = "";
var player2Final = "";
var player1Temp = [];
var player2Temp = [];

// Global variable to track players' scores.
var player1Total = 0;
var player2Total = 0;

// Request for user input for game version.
var getVersion = function (input) {
  gameVersion = input;
  return `You have selected the ${gameVersion} version. <br> Click "submit" to start the game.`;
};

// Random number generator between 1 to 6
var generateDiceNumber = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// Function to roll 2 dices and assign them to an array.
var diceRoll = function () {
  var dice1 = generateDiceNumber();
  var dice2 = generateDiceNumber();
  var diceCombi = [dice1, dice2];
  return diceCombi;
};

// Function to display message for each roll from player 1 and player 2. Function takes an array as a parameter.
var displayRoll = function (playerRoll) {
  var playerNum = `Welcome Player 1.`;
  if (gameMode == 2) {
    playerNum = `Welcome Player 2.`;
  }
  return `${playerNum} <br> You rolled ${playerRoll[0]} for Dice 1 and ${playerRoll[1]} for Dice 2. <br> Input the number of the dice to determine the first numeral.`;
};

// Function takes in player seleted dice number, and sets it as the first numeral. Reads 2 parameters, user input and array with dice numbers.
var sequenceNumber = function (userNum, diceNum) {
  return "" + diceNum[userNum - 1] + diceNum[diceNum.length - userNum];
};

// Game logic to check for the larger number between player 1 and 2's selections and print winning player message.
// Checks for game version. If normal version, larger number wins. If reverse version, lower number wins.
var compareNumbers = function (player1, player2) {
  if (gameVersion == "reverse") {
    if (Number(player1) < Number(player2)) {
      return `Player 1 has ${player1} and Player 2 has ${player2}. <br> Player 1 wins! <br> Player 1, please click "submit" to play again.`;
    }
    return `Player 1 has ${player1} and Player 2 has ${player2}. <br> Player 2 wins! <br> Player 1, please click "submit" to play again`;
  } else {
    if (Number(player1) > Number(player2)) {
      return `Player 1 has ${player1} and Player 2 has ${player2}. <br> Player 1 wins! <br> Player 1, please click "submit" to play again.`;
    }
    return `Player 1 has ${player1} and Player 2 has ${player2}. <br> Player 2 wins! <br> Player 1, please click "submit" to play again`;
  }
};

// Function to print leaderboard. Show total scores of each player and rank them in decreasing order.
var showLeaderboard = function (score1, score2) {
  if (gameVersion == "reverse") {
    if (score2 < score1) {
      return `Player 2: ${score2} <br> Player 1: ${score1}`;
    } else {
      return `Player 1: ${score1} <br> Player 2: ${score2}`;
    }
  } else {
    if (score2 > score1) {
      return `Player 2: ${score2} <br> Player 1: ${score1}`;
    } else {
      return `Player 1: ${score1} <br> Player 2: ${score2}`;
    }
  }
};

// Game logic for normal version ie. largest number wins.
var playNormalGame = function (input) {
  var outputValue = "";
  if (gameMode == "1") {
    player1Temp = diceRoll();
    outputValue = displayRoll(player1Temp);
    gameMode = "Player 1 sequence";
    return outputValue;
  } else if (gameMode == "Player 1 sequence") {
    player1Final = sequenceNumber(input, player1Temp);
    player1Total += Number(player1Final);
    gameMode = "2";
    return `It is Player 2's turn to roll the dice. Player 2, please click "submit".`;
  } else if (gameMode == "2") {
    player2Temp = diceRoll();
    outputValue = displayRoll(player2Temp);
    gameMode = "Player 2 sequence";
    return outputValue;
  } else if (gameMode == "Player 2 sequence") {
    player2Final = sequenceNumber(input, player2Temp);
    player2Total += Number(player2Final);
    gameMode = "check";
    return `Both players have made their choices! Let's reveal the winner!`;
  } else {
    outputValue = `${compareNumbers(
      player1Final,
      player2Final
    )} <br><br> <========LEADERBOARD=========> <br> ${showLeaderboard(
      player1Total,
      player2Total
    )}`;
    gameMode = "1";
    return outputValue;
  }
};

var main = function (input) {
  if (gameVersion == "" && input == "") {
    return `Please select either "normal" or "reverse" version of the game.`;
  } else if (gameVersion == "" && input != "") {
    return getVersion(input);
  } else {
    return playNormalGame(input);
  }
};
