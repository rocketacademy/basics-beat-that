// ****** How the game works ******
//
// Number of players: 2
//
// ---- Player 1 Gameplay ----
// Player 1 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
// Change to Player 2 and repeat (process)
//
// ---- Player 2 Gameplay ----
// Player 2 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
//
// Compare the two numbers (process)
// Show the winner with the higher combined number (output)
//
// *******************************

// ******* Global Variables *******
var gameStatus = "Waiting to roll dice";
var player = "Player 1";

var p1dice1 = 0;
var p1dice2 = 0;
var p2dice1 = 0;
var p2dice2 = 0;
var p1CombinedNumber = 0;
var p2CombinedNumber = 0;

var p1score = 0;
var p2score = 0;

// ********** Functions **********

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Function to roll numbers and move to part 2 for each player
var getRolledNums = function (currentPlayer) {
  var rolledNumsMessage = "";

  // For Player 1 ------------------------
  if (currentPlayer == "Player 1") {
    p1dice1 = rollDice().toString();
    p1dice2 = rollDice().toString();
    console.log("P1 Dice 1: ", p1dice1);
    console.log("P1 Dice 2: ", p1dice2);

    // If dice roll the same number, auto combine them and move to Player 2
    if (p1dice1 == p1dice2) {
      p1CombinedNumber = p1dice1 + p1dice2;
      rolledNumsMessage = `<b>Player 1</b><br><br>
      You rolled ${p1dice1} and ${p1dice2}.<br><br>
      Your combined number is ${p1CombinedNumber}.<br><br>
      <hr><br>
      Player 2, it's now your turn. Hit submit to roll your two numbers.
      `;
      p1score += Number(p1CombinedNumber);
      player = "Player 2";
      gameStatus = "Waiting to roll dice";
    }
    // Output the numbers rolled and ask for user's choice of arrangement
    else {
      rolledNumsMessage = `<b>Player 1</b><br><br>
      You rolled ${p1dice1} and ${p1dice2}.<br><br>
      The next step is to arrange the numbers.<br><br>
      Enter "1" to get the combined number '${p1dice1 + p1dice2}'<br>
      Enter "2" to get the combined number '${p1dice2 + p1dice1}'
      `;
      gameStatus = "Combined number created";
    }
  }
  // For Player 2 ------------------------
  else {
    p2dice1 = rollDice().toString();
    p2dice2 = rollDice().toString();
    console.log("P2 Dice 1: ", p2dice1);
    console.log("P2 Dice 2: ", p2dice2);

    // If dice roll the same number, auto combine them and compare nums to determine winner
    if (p2dice1 == p2dice2) {
      p2CombinedNumber = p2dice1 + p2dice2;
      p2score += Number(p2CombinedNumber);

      var gameResult = determineWinner(p1CombinedNumber, p2CombinedNumber);
      rolledNumsMessage = `<b>Player 2</b><br><br>
      You rolled ${p2dice1} and ${p2dice2}.<br><br>
      Your combined number is ${p2CombinedNumber}.<br><br>
      <hr><br>
      ${gameResult}
      `;

      player = "Player 1";
      gameStatus = "Waiting to roll dice";
    }
    // Output the numbers rolled and ask for user's choice of arrangement
    else {
      rolledNumsMessage = `<b>Player 2</b><br><br>
      You rolled ${p2dice1} and ${p2dice2}.<br><br>
      The next step is to arrange the numbers.<br><br>
      Enter "1" to get the combined number '${p2dice1 + p2dice2}'<br>
      Enter "2" to get the combined number '${p2dice2 + p2dice1}'
      `;
      gameStatus = "Combined number created";
    }
  }
  return rolledNumsMessage;
};

// Function to combine numbers
var combineNumbers = function (currentPlayer, input) {
  var combinedNumsMessage = "";

  // For Player 1
  if (currentPlayer == "Player 1") {
    // input validation
    if (input != 1 && input != 2) {
      return `Please enter 1 or 2 to arrange your numbers.<br>
       Enter "1" to get the combined number '${p1dice1 + p1dice2}'<br>
      Enter "2" to get the combined number '${p1dice2 + p1dice1}'`;
    } else if (input == "1") {
      p1CombinedNumber = p1dice1 + p1dice2;
    } else {
      p1CombinedNumber = p1dice2 + p1dice1;
    }
    combinedNumsMessage = `<b>Player 1</b><br><br>
        Your combined number is ${p1CombinedNumber}.<br><br>
        <hr><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;

    p1score += Number(p1CombinedNumber);
    player = "Player 2";
    gameStatus = "Waiting to roll dice";
    return combinedNumsMessage;
  }
  // For Player 2
  else {
    // input validation
    if (input != 1 && input != 2) {
      return `Please enter 1 or 2 to arrange your numbers.<br>
       Enter "1" to get the combined number '${p2dice1 + p2dice2}'<br>
      Enter "2" to get the combined number '${p2dice2 + p2dice1}'`;
    } else if (input == "1") {
      p2CombinedNumber = p2dice1 + p2dice2;
    } else {
      p2CombinedNumber = p2dice2 + p2dice1;
    }
    combinedNumsMessage = `<b>Player 2</b><br><br>
        Your combined number is ${p2CombinedNumber}. <br><br>
        <hr><br>
        `;
    p2score += Number(p2CombinedNumber);
    console.log(p2CombinedNumber);
    player = "Player 1";
    gameStatus = "Waiting to roll dice";
    return combinedNumsMessage;
  }
};

// Function to compare numbers and determine the winner
var determineWinner = function (p1number, p2number) {
  var winner = "";
  if (p1number == p2number) {
    winner = `<b>It's a draw! What are the odds? 🤔</b>`;
  } else if (p1number > p2number) {
    winner = `The winner of this round is <b>Player 1! 🥇</b>`;
  } else {
    winner = `The winner of this round is <b>Player 2! 🥇</b>`;
  }

  var scoreboard = updateLeaderboard();

  var resultsMessage = `
  Player 1's combined number is ${p1number}.<br>
  Player 2's combined number is ${p2number}.<br>
  ${winner}<br><br>
  ${scoreboard}<br><br>
  Hit submit to play again!`;

  return resultsMessage;
};

// Function for auto-combination of numbers
// This function should roll the dice, compare numbers, and combine them
var autoCombine = function () {
  var num1 = rollDice().toString();
  var num2 = rollDice().toString();
  console.log(num1);
  console.log(num2);

  var combinedNum = 0;
  if (num1 > num2) {
    combinedNum = num1 + num2;
  } else {
    combinedNum = num2 + num1;
  }
  console.log(combinedNum);
  return combinedNum;
};

// Function to update leaderboard
var updateLeaderboard = function () {
  var leaderboard = "";

  // Compare running score to see who's leading
  var leader = "<b>Player 1 is in the lead! 🥳</b>";
  if (p1score == p2score) {
    leader = "<b>Your scores are tied! 🤝</b>";
  } else if (p1score < p2score) {
    leader = "<b>Player 2 is in the lead! 🎉</b>";
  }

  // Arrange scores in descending order
  var scoreList = `
  1. Player 1 - ${p1score}<br>
  2. Player 2 - ${p2score}`;
  if (p1score < p2score) {
    scoreList = `
    1. Player 2 - ${p2score}<br>
    2. Player 1 - ${p1score}`;
  }

  leaderboard = `${leader}<br>
  ${scoreList}`;

  return leaderboard;
};

var main = function (input) {
  var myOutputValue = "";

  if (input == "auto") {
    gameStatus = "Auto-combine";
    return `Initiating auto-combine mode!`;
  } else if (input == "reset") {
    gameStatus = "Waiting to roll dice";
    player = "Player 1";
    return `Resetting the game! Player 1, hit submit to roll your dice.`;
  }

  if (gameStatus == "Auto-combine") {
    p1CombinedNumber = autoCombine();
    p1score += Number(p1CombinedNumber);

    p2CombinedNumber = autoCombine();
    p2score += Number(p2CombinedNumber);

    myOutputValue = determineWinner(p1CombinedNumber, p2CombinedNumber);
    return myOutputValue;
  }

  // <<<< ----- Player 1's Turn ----- >>>>
  if (player == "Player 1") {
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      myOutputValue = getRolledNums(player);
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      myOutputValue = combineNumbers(player, input);
      return myOutputValue;
    }
  }

  // <<<< ----- Player 2's Turn ----- >>>>
  if (player == "Player 2") {
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      myOutputValue = getRolledNums(player);
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      var player2nums = combineNumbers(player, input);

      // << -- Game results: compare both combined numbers -- >>
      var results = determineWinner(p1CombinedNumber, p2CombinedNumber);

      myOutputValue = `${player2nums}
      ${results}`;

      return myOutputValue;
    }
  }
};
