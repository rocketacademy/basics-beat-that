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
var playerRolls = [];
var scoreKeeper = [];
var mode = "start";
var player = 0;

// ========== GAME PARTS ==========
// ---------- DICE ROLL ----------
function diceRoll() {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// ---------- GERNERATE ROLLS ----------
function storeNum(rollArray, player) {
  // reset dice array
  // rollArray = [];
  // push dice rolls into array 2x
  rollArray.push(diceRoll());
  rollArray.push(diceRoll());
  console.log("storeNum: " + rollArray);
  mode = "sequencing";
  console.log("mode: " + mode);
  var rolled =
    `Welcome Player ${player}. <br>You rolled <u>${rollArray[0]} for Dice 1</u> and <u>${rollArray[1]} for Dice 2</u>. <br>Choose which dice to go first (1 or 2). ` +
    leaderboard(scoreKeeper);
  return rolled;
}

// ---------- LEADERBOARD ----------
// checks which player is leading and list them in descending order
function leaderboard(scoreKeeper) {
  var scoreboard = "<br><br><u>Scoreboard</u><br>";
  // total player count = scoreKeeper.length
  if (scoreKeeper.length == 2) {
    var display = `<br><br>Current score:<br>Player 1: ${scoreKeeper[0]}<br>Player 2: ${scoreKeeper[1]}`;
    if (scoreKeeper[1] > scoreKeeper[0]) {
      display = `<br><br>Current score:<br>Player 2: ${scoreKeeper[1]}<br>Player 1: ${scoreKeeper[0]}`;
    }
    return display;
  } else {
    for (p = 0; p < scoreKeeper.length; p++) {
      var playerCounter = p + 1;
      scoreboard =
        scoreboard +
        `Player ${playerCounter}: ${scoreKeeper[playerCounter - 1]}<br>`;
    }
    return scoreboard;
  }
}

// ---------- SEQUENCING ----------
// generates 2-digit number from input sequencing
function sequencing(seq, rollArray, player) {
  var sequence = "";
  var finalNum = "";
  console.log("sequencing fn " + seq);
  console.log(rollArray, "in sequencing fn");
  // user chooses which dice roll to be in front
  if (isNaN(seq) || seq == 0) {
    sequence =
      `Please only enter 1 or 2<br><br>Player ${player}, you rolled <u>${rollArray[0]} for Dice 1</u> and <u>${rollArray[1]} for Dice 2</u>.` +
      leaderboard(scoreKeeper);
  }
  if (seq <= 2 && seq > 0) {
    if (seq == 1) {
      finalNum = String(rollArray[0]) + String(rollArray[1]);
      console.log(seq + " first: " + finalNum);
    }
    if (seq == 2) {
      finalNum = String(rollArray[1]) + String(rollArray[0]);
      console.log(seq + " first: " + finalNum);
    }
    // add 2-digit number as score to player
    scoreKeeper[player - 1] += Number(finalNum);
    sequence =
      `Player ${player}, you chose Dice ${seq} first. <br>Your number is ${finalNum}. <br><br>It is now the next player's turn.` +
      leaderboard(scoreKeeper);
    // change mode
    mode = "rolling";
  }
  return sequence;
}

// ========== MAIN FUNCTION ==========
var main = function (input) {
  var myOutputValue = "Press submit to continue.";
  var playerCount;

  if (player <= scoreKeeper.length) {
    console.log("current: " + player);
    if (mode == "rolling") {
      // reset array
      playerRolls = [];
      var store = storeNum(playerRolls, player);
      return store;
    }
    if (mode == "sequencing") {
      console.log(playerRolls);
      var seqResult = sequencing(input, playerRolls, player);
      // change player
      player++;
      return seqResult;
    }
  } else {
    player = 1;
    console.log("reset player count");
  }

  if (mode == "start") {
    myOutputValue = "How many players?";
    if (isNaN(Number(input)) == false && input != 0) {
      playerCount = Number(input);
      for (players = 0; players < playerCount; players++) {
        scoreKeeper.push(0);
      }
      player++;
      console.log("score array:", scoreKeeper);
      mode = "rolling";
      console.log("number of players:", playerCount);
      console.log("mode:", mode);
      myOutputValue = `${playerCount} players noted. <br>Player 1, press Submit to start rolling.`;
    }
    // return myOutputValue;
  }
  return myOutputValue;
};

/////////////////////////////////////////////////////////
// // ---------- PLAYER 1 ----------
// if (player == 1) {
//   console.log("player " + player);
// if (mode == "rolling") {
//   //reset array
//   playerRolls = [];
//   var rolling = play(playerRolls, player);
//   console.log(playerRolls);
//   return rolling;
// }
// if (mode == "sequencing") {
//   var sequence = "Please only enter 1 or 2";
//   // user chooses which dice roll to be in front
//   if (input <= 2 && input > 0) {
//     sequence = scoring(input, player, playerRolls);
//     // change player number and mode
//     player = 2;
//     mode = "rolling";
//   }
//   return sequence;
// }
// }

// // ---------- PLAYER 2 ----------
// if (player == 2) {
//   console.log("player " + player);
//   if (mode == "rolling") {
//     //reset array
//     playerRolls = [];
//     var rolling = play(playerRolls, player);
//     console.log(playerRolls);
//     return rolling;
//   }
//   if (mode == "sequencing") {
//     myOutputValue = "Please only enter 1 or 2";
//     // user chooses which dice roll to be in front
//     if (input <= 2 && input > 0) {
//       myOutputValue = scoring(input, player, playerRolls);
//       // change player number and mode
//       player = 1;
//       mode = "rolling";
//     }
//   }
//   return myOutputValue;
// }
// };
