// Create a version of the Beat That dice game,
// where players create the largest number they can by concatenating random dice roll digits.
//
// --- Base Requirements:
// 1. There are 2 players and players take turns.
// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls,
//    for example 3 and 6.
// 3. The player picks the order of the dice they want. For example,
//    if they wanted the number 63, they would specify that the 2nd dice goes first.
//    You can choose how the player specifies dice order.
// 4. After both players have rolled and chosen dice order,
//    the player with the higher combined number wins.

// ========== GLOBAL VAR ==========
var player = 1;
var playerRolls = [];
var scoreKeeper = [];
// var p1Score = 0;
// var p2Score = 0;
var mode = "rolling";

// ========== DICE ROLL ==========
function diceRoll() {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// ========== GAME PARTS ==========
// ---------- GERNERATE ROLLS ----------
function storeNum(rollArray, player) {
  // push dice rolls into array 2x
  rollArray.push(diceRoll());
  rollArray.push(diceRoll());
  console.log(rollArray);
  return `Welcome Player ${player}. <br>You rolled <u>${rollArray[0]} for Dice 1</u> and <u>${rollArray[1]} for Dice 2</u>. <br>Choose which dice to go first (1 or 2).`;
}

// ---------- SEQUENCING ----------
// generates 2-digit number from input sequencing
function sequencing(seq, diceArr) {
  var finalNum = "";
  console.log("beat that fn " + seq);
  console.log(diceArr, "in beat that fn");
  if (seq == 1) {
    console.log(seq + " first");
    finalNum = String(diceArr[0]) + String(diceArr[1]);
    console.log("1: " + finalNum);
  }
  if (seq == 2) {
    console.log(seq + " first");
    finalNum = String(diceArr[1]) + String(diceArr[0]);
    console.log("2: " + finalNum);
  }
  return Number(finalNum);
}
function scoring(input, player, playerRolls) {
  var sequence = Number(input);
  var number = sequencing(sequence, playerRolls);
  scoreKeeper.push(number);
  // add 2-digit number as score to player
  scoreKeeper[player - 1] += Number(number);
  // output final number and leaderboard
  myOutputValue =
    `Player ${player}, you chose Dice ${sequence} first. <br>Your number is ${number}. <br><br>It is now Player 2's turn.` +
    leaderboard(scoreKeeper);
  return myOutputValue;
}
// ---------- LEADERBOARD ----------
// checks which player is leading and list them in descending order
function leaderboard(scoreKeeper) {
  var display = `<br><br>Current score:<br>Player 1: ${scoreKeeper[0]}<br>Player 2: ${scoreKeeper[1]}`;
  if (scoreKeeper[1] > scoreKeeper[0]) {
    display = `<br><br>Current score:<br>Player 2: ${scoreKeeper[1]}<br>Player 1: ${scoreKeeper[0]}`;
  }
  return display;
}

// ---------- ROLLING ----------
function play(rollArray, player) {
  // generate 2-digit numbers
  myOutputValue = storeNum(rollArray, player);
  // change mode to sequencing
  mode = "sequencing";
  // return dice rolls and leaderboard
  return myOutputValue + leaderboard(scoreKeeper);
}

// ========== MAIN FUNCTION ==========
var main = function (input) {
  var myOutputValue = "";
  for (players = 0; players < 3; players++) {
    scoreKeeper.push(0);
  }

  // ---------- PLAYER 1 ----------
  if (player == 1) {
    console.log("player " + player);
    if (mode == "rolling") {
      //reset array
      playerRolls = [];
      var rolling = play(playerRolls, player);
      console.log(playerRolls);
      return rolling;
    }
    if (mode == "sequencing") {
      myOutputValue = "Please only enter 1 or 2";
      // user chooses which dice roll to be in front
      if (input <= 2 && input > 0) {
        myOutputValue = scoring(input, player, playerRolls);
        // change player number and mode
        player = 2;
        mode = "rolling";
      }
      return myOutputValue;
    }
  }

  // ---------- PLAYER 2 ----------
  if (player == 2) {
    console.log("player " + player);
    if (mode == "rolling") {
      //reset array
      playerRolls = [];
      var rolling = play(playerRolls, player);
      console.log(playerRolls);
      return rolling;
    }
    if (mode == "sequencing") {
      myOutputValue = "Please only enter 1 or 2";
      // user chooses which dice roll to be in front
      if (input <= 2 && input > 0) {
        myOutputValue = scoring(input, player, playerRolls);
        // change player number and mode
        player = 1;
        mode = "rolling";
        return myOutputValue;
      }
    }
  }
};
