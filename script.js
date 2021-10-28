// ****** How the programme works ******
//
// Number of players: 2
// Number of dice rolled: 2 (default)
// Game mode: highest combination (default)
// Players can change how many dice are rolled by keying in number from 1-10 (inclusive)
// Programme autocombines the numbers according to the game mode
// Players can change game mode by entering "highest" or "lowest"
//
// *************************************

// ///// ******* Global Variables ******* /////
var gameMode = "highest";
var player = "Player 1";

var numDiceToRoll = 2;

var p1diceNums = [];
var p2diceNums = [];
var p1CombinedNumber = 0;
var p2CombinedNumber = 0;

var p1score = 0;
var p2score = 0;

// ///// ********** Functions ********** /////

// ----------- Functions to change global variables -----------
// Function to change player
var changePlayer = function () {
  if (player == "Player 1") {
    player = "Player 2";
  } else {
    player = "Player 1";
  }
};

// Function to alternate between game modes
var changeGameMode = function (input) {
  if (input == "lowest") {
    gameMode = "lowest";
    resetGame();
    return `
    Initiating new game rules: the player with the <b>lowest</b> combined number wins! <br><br>
    The score has been reset.<br><br>
    Player 1, start by hitting submit.
    `;
  } else if (input == "highest") {
    gameMode = "highest";
    resetGame();
    return `
    Initiating new game rules: the player with the <b>highest</b> combined number wins! <br><br>
    The score has been reset.<br><br>
    Player 1, start by hitting submit.
    `;
  }
};

// Function to reset dice number arrays
var resetRound = function () {
  p1diceNums = [];
  p2diceNums = [];
};

// Function to reset dice number arrays, players' scores and current player
var resetGame = function () {
  resetRound();
  p1score = 0;
  p2score = 0;
  player = "Player 1";
};

// ------------------ Functions for game mechanics ------------------
// Function to roll random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Function to roll numbers based on variable number of dice to roll
var getRolledNums = function (numDice) {
  // For Player 1 ------------------------
  if (player == "Player 1") {
    // create a loop to roll number for each dice and push into array
    for (var i = 0; i < numDice; i++) {
      var rolledNum = rollDice();
      p1diceNums.push(rolledNum);
    }
    return p1diceNums;
  }
  // For Player 2 ------------------------
  else {
    // create a loop to roll number for each dice and push into array
    for (var i = 0; i < numDice; i++) {
      var rolledNum = rollDice();
      p2diceNums.push(rolledNum);
    }
    return p2diceNums;
  }
};

// Function to combine numbers
var combineNumbers = function () {
  // For "highest" game mode -------------
  if (gameMode == "highest") {
    // For Player 1 ----------------------
    if (player == "Player 1") {
      p1diceNums.sort();
      p1diceNums.reverse();
      p1CombinedNumber = p1diceNums.join("");
      return p1CombinedNumber;
    }
    // For Player 2 ----------------------
    else {
      p2diceNums.sort();
      p2diceNums.reverse();
      p2CombinedNumber = p2diceNums.join("");
      return p2CombinedNumber;
    }
  }
  // For "lowest" game mode --------------
  else if (gameMode == "lowest") {
    // For Player 1 ----------------------
    if (player == "Player 1") {
      p1diceNums.sort();
      p1CombinedNumber = p1diceNums.join("");
      return p1CombinedNumber;
    }
    // For Player 2 ----------------------
    else {
      p2diceNums.sort();
      p2CombinedNumber = p2diceNums.join("");
      return p2CombinedNumber;
    }
  }
};

// Function to compare numbers and determine the winner
var determineWinner = function () {
  var result = "";
  // For "highest" game mode ----------------------
  if (gameMode == "highest") {
    if (p1CombinedNumber == p2CombinedNumber) {
      result = "It's a draw!";
    } else if (p1CombinedNumber > p2CombinedNumber) {
      result = "The winner of this round is Player 1!";
    } else {
      result = "The winner of this round is Player 2!";
    }
  }
  // For "lowest" game mode ----------------------
  else {
    if (p1CombinedNumber == p2CombinedNumber) {
      result = "It's a draw!";
    } else if (p1CombinedNumber < p2CombinedNumber) {
      result = "The winner of this round is Player 1!";
    } else {
      result = "The winner of this round is Player 2!";
    }
  }
  updateScore();
  return result;
};

// Function to update score
var updateScore = function () {
  p1score += Number(p1CombinedNumber);
  p2score += Number(p2CombinedNumber);
};

// Function to update leaderboard
var updateLeaderboard = function () {
  // Default = Player 1 is in the lead
  var leader = "<b>Player 1 is in the lead! 🥳</b>";
  var scoreList = `
  1. Player 1 - ${p1score}<br>
  2. Player 2 - ${p2score}`;

  // For "highest" game mode ----------------------
  if (gameMode == "highest") {
    // Compare running score to see who's leading
    if (p1score == p2score) {
      leader = "<b>Your scores are tied! 🤝</b>";
    } else if (p1score < p2score) {
      leader = "<b>Player 2 is in the lead! 🎉</b>";
    }
    // Arrange scores in descending order (default = p1 on top)
    if (p1score < p2score) {
      scoreList = `
    1. Player 2 - ${p2score}<br>
    2. Player 1 - ${p1score}`;
    }
  }

  // For "lowest" game mode -----------------------
  if (gameMode == "lowest") {
    // Compare running score to see who's leading
    if (p1score == p2score) {
      leader = "<b>Your scores are tied! 🤝</b>";
    } else if (p1score > p2score) {
      leader = "<b>Player 2 is in the lead! 🎉</b>";
    }
    // Arrange scores in ascending order (default = p1 on top)
    if (p1score > p2score) {
      scoreList = `
    1. Player 2 - ${p2score}<br>
    2. Player 1 - ${p1score}`;
    }
  }

  var leaderboard = `${leader}<br>
  ${scoreList}`;

  return leaderboard;
};

var main = function (input) {
  var myOutputValue = `
  Current player: ${player}<br>
  `;

  // -------------------------------------------------------------------------
  /////// Check input for changes in game mode or number of dice rolled  /////
  // Change game mode if input is "lowest" / "highest"
  if (input == "lowest" || input == "highest") {
    return changeGameMode(input);
  }
  // Input validation: If input is text or NOT a number between 1 and 10
  else if (isNaN(Number(input)) || (input != "" && input < 1) || input > 10) {
    return `
    Sorry, I didn't recognise that.<br><br>
    If you're trying to change the number of dice rolled, enter a number from 1 to 10.<br><br>
    If you're trying to change the game mode, enter "lowest" or "highest".<br><br>
    You can also just hit submit to play the game.
    `;
  }
  // If input is valid: Take in input to change number of dice rolled
  else if (input != "") {
    numDiceToRoll = input;
    resetGame();
    return `
    Each player will roll ${numDiceToRoll} dice from now on.<br><br>
    The score has also been reset.<br><br>
    Player 1, hit Submit to start.
    `;
  }

  myOutputValue += `Number of dice rolled: ${numDiceToRoll}<br><br>`;

  // ------------------------------------
  /////////// Start game play ///////////
  // <<<< ----- Player 1's Turn ----- >>>>
  if (player == "Player 1") {
    // Part 1: roll the dice
    getRolledNums(numDiceToRoll);
    myOutputValue += `
      Your rolled numbers: ${p1diceNums}<br>
      `;
    // Part 2: combine the numbers
    combineNumbers();
    myOutputValue += `
      Your number combination: ${p1CombinedNumber}
      `;
    // Change player
    changePlayer();
    // Result =
    return myOutputValue;
  }
  // <<<< ----- Player 2's Turn ----- >>>>
  else {
    // Part 1: roll the dice
    getRolledNums(numDiceToRoll);
    myOutputValue += `
      Your rolled numbers: ${p2diceNums}<br>
      `;
    // Part 2: combine the numbers
    combineNumbers();
    myOutputValue += `
      Your number combination: ${p2CombinedNumber}
      `;

    // Determine results of game ---------
    var gameResult = determineWinner();
    var scoreboard = updateLeaderboard();

    myOutputValue += `<br><br><hr><br>
    Player 1's number is ${p1CombinedNumber}.<br>
    Player 2's number is ${p2CombinedNumber}.<br>
    <b>${gameResult} 🥇</b><br><br>
    ${scoreboard}<br><br>
    Hit submit to play again or enter a number to change how many dice are rolled.`;

    // Reset round
    changePlayer();
    resetRound();

    // Result =
    return myOutputValue;
  }
};
