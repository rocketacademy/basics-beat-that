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
var p1Rolls = [];
var p2Rolls = [];
var p1Score = 0;
var p2Score = 0;
var mode = "rolling";

// ========== DICE ROLL ==========
function diceRoll() {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// ========== GAME PARTS ==========
function storeNum(rollArray, player) {
  // add 2 dice rolls to array
  rollArray.push(diceRoll());
  rollArray.push(diceRoll());
  console.log(rollArray);
  return `Welcome Player ${player}. <br>You rolled <u>${rollArray[0]} for Dice 1</u> and <u>${rollArray[1]} for Dice 2</u>. <br>Choose which dice to go first (1 or 2).`;
}

// generates 2-digit number from input sequencing
function beatThatSeq(seq, diceArr) {
  var finalNum = "";
  console.log("beat that fn " + seq);
  console.log(diceArr);
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

// checks which player is leading and list them in descending order
function leaderboard(p1Score, p2Score) {
  var display = `<br><br>Current score:<br>Player 1: ${p1Score}<br>Player 2: ${p2Score}`;
  if (p2Score > p1Score) {
    display = `<br><br>Current score:<br>Player 2: ${p2Score}<br>Player 1: ${p1Score}`;
  }
  return display;
}

// ========== MAIN FUNCTION ==========
var main = function (input) {
  var myOutputValue = "";

  // ---------- PLAYER 1 ----------
  if (player == 1) {
    console.log("player " + player);
    if (mode == "rolling") {
      // reset array for each round
      p1Rolls = [];
      // generate 2-digit numbers
      myOutputValue = storeNum(p1Rolls, player);
      // change mode to sequencing
      mode = "sequencing";
      console.log(mode);
      console.log(p1Rolls);
      // return dice rolls and leaderboard
      return myOutputValue + leaderboard(p1Score, p2Score);
    }
    if (mode == "sequencing") {
      myOutputValue = "Please only enter 1 or 2";
      // user chooses which dice roll to be in front
      if (input <= 2 && input > 0) {
        var sequence = Number(input);
        console.log(p1Rolls);
        p1Num = beatThatSeq(sequence, p1Rolls);
        console.log(p1Num);
        // add 2-digit number as score to player
        p1Score += Number(p1Num);
        console.log("p1 score:", p1Score);
        // output final number and leaderboard
        myOutputValue =
          `Player ${player}, you chose Dice ${sequence} first. <br>Your number is ${p1Num}. <br><br>It is now Player 2's turn.` +
          leaderboard(p1Score, p2Score);
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
      // reset array for each round
      p2Rolls = [];
      // generate 2-digit numbers
      myOutputValue = storeNum(p2Rolls, player);
      // change mode to sequencing
      mode = "sequencing";
      console.log(mode);
      console.log(p2Rolls);
      // return dice rolls and leaderboard
      return myOutputValue + leaderboard(p1Score, p2Score);
    }
    if (mode == "sequencing") {
      myOutputValue = "Please only enter 1 or 2";
      // user chooses which dice roll to be in front
      if (input <= 2 && input > 0) {
        var sequence = Number(input);
        p2Num = beatThatSeq(sequence, p2Rolls);
        console.log(p2Num);
        // add 2-digit number as score to player
        p2Score += Number(p2Num);
        console.log("p2 score:", p2Score);
        // output final number and leaderboard
        myOutputValue =
          `Player ${player}, you chose Dice ${sequence} first. <br>Your number is ${p1Num}. <br><br>It is now Player 1's turn.` +
          leaderboard(p1Score, p2Score);
        // change player number and mode
        player = 1;
        mode = "rolling";
        return myOutputValue;
      }
    }
  }
};
