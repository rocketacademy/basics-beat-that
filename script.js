// when player clicks submit, game rolls 2 dice
// array collects dice roll e.g. p1 = [3,5]
// player picks the order of dice after prompt, "which to be the first digit?", p1[0] or p1[1]
// once picked, auto goes back to mode 1
// p2[0] or p2[1]

// note to partner: still making sense of my own code
var gameMode = "roll dice";
var user = [];
var userResult = [];
console.log(`initial game mode ${gameMode}`);

var main = function (input) {
  var myOutputValue = " ";
  var playerDice = diceRoll();
  var counter = 0;

  // 2 game modes: 1 runs the dice after submit, another arranges number based on user input

  if (gameMode == "roll dice") {
    user.push(playerDice);
    console.log(playerDice);
    while (counter < 2) {
      myOutputValue = `Welcome Player 1. You rolled ${user[0]} for Dice 1 and ${user[1]} for Dice 2. <br>
    Choose the order of the dice. If you would like to flip the sequence of number ${comNum}, <br>
    Enter y, else simply click submit.`;
      gameMode == "choose order";
      console.log("gamemode = " + gameMode);
    }
  }

  if (gameMode == "choose order") {
    var comNum = user[0] * 10 + user[1];
    var comNumRev = user[1] * 10 + user[0];
    if (input == "y") {
      // var first = 3;
      // var second = user[1];
      // var numSort = Number(second + first);

      myOutputValue = `Player 1, you chose Dice ${user[0]} first. Your number is ${comNum}. It is now Player 2's turn`;
    } else {
      myOutputValue = `Player 1, you chose Dice ${user[1]} first. Your number is ${comNumRev}`;
    }
    gameMode == "roll dice";

    // return winner
    myOutputValue = "player 1 wins";
    if (userResult[0] > userResult[1]) {
      myOutputValue = "player 2 wins";
      return myOutputValue;
    }
  }

  return myOutputValue;
};

// get dice roll
var diceRoll = function () {
  return Math.ceil(Math.random() * 6);
};
