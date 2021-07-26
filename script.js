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
var mode = "rolling";

// ========== DICE ROLL ==========
function diceRoll() {
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
}

// ========== GAME ==========
function storeNum(rollArray, player) {
  rollArray.push(diceRoll());
  rollArray.push(diceRoll());
  console.log(rollArray);
  myOutputValue = `Welcome Player ${player}. <br>You rolled <u>${rollArray[0]} for Dice 1</u> and <u>${rollArray[1]} for Dice 2</u>. <br>Choose which dice to go first (1 or 2).`;
  mode = "sequencing";
}

function beatThatSeq(seq, diceArr) {
  console.log("beat that fn " + seq);
  if (seq == 1) {
    console.log(seq + " first");
    var finalNum = String(diceArr[0]) + String(diceArr[1]);
    console.log("1: " + finalNum);
  }
  if (seq == 2) {
    console.log(seq + " first");
    var finalNum = String(diceArr[1]) + String(diceArr[0]);
    console.log("2: " + finalNum);
  }
  return finalNum;
}

// ========== MAIN FUNCTION ==========
var main = function (input) {
  var myOutputValue = "";
  var p1Rolls = [];

  if (mode == "rolling") {
    myOutputValue = storeNum(p1Rolls, player);
    console.log(mode);
    console.log(p1Rolls);
  }
  if (mode == "sequencing") {
    myOutputValue = "Please only enter 1 or 2";
    if (input <= 2 && input > 0) {
      var sequence = Number(input);
      p1Num = beatThatSeq(sequence, p1Rolls);
      console.log(p1Num);
      myOutputValue = `Player ${player}, you chose Dice ${sequence} first. <br>Your number is ${p1Num}. <br><br>It is now Player 2's turn.`;
      mode = "rolling";
    }
  }

  return myOutputValue;
};
