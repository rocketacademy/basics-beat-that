// var main = function (input) {
//   var myOutputValue = "hello world";
//   return myOutputValue;
// };

/// 2 players taking turns, p1 and p2
// upon submit, game rolls 2 dice , show 2 numbers, p1 choose 1 or 2 to combine number (eg 24 or 42)
// store results for p1
// p2 do the same ; store results for p2
// compare p1 and p2
//higher number wins

// 4 game state - "P1 Dice Roll" , "P1 Choose Order" , "P2 Dice Roll" , "P2 Choose Order"

/////////////////////

var gameState = "P1 Roll Dice";

var p1PlayerRollDice = [];
var p2PlayerRollDice = [];
var p1PlayerTotal = [];
var p2PlayerTotal = [];

function getRandomNum() {
  return Math.floor(Math.random() * 6) + 1;
}
var randomNum = getRandomNum();
console.log(randomNum);

function p1RollDice() {
  var i = 0;
  while (i < 2) {
    var randomNum = getRandomNum();
    p1PlayerRollDice.push(randomNum);
    i = i + 1;

    console.log(p1PlayerRollDice);
  }
  return (
    "hello <br> you rolled Dice 1: " +
    p1PlayerRollDice[0] +
    "  & Dice 2:  " +
    p1PlayerRollDice[1] +
    "<br> Please choose 1 or 2 to select which Dice to go first when you combine your 2 dice rolls"
  );
}

function p2RollDice() {
  var i = 0;
  while (i < 2) {
    var randomNum = getRandomNum();
    p2PlayerRollDice.push(randomNum);
    i = i + 1;

    console.log(p2PlayerRollDice);
  }
  return (
    "hello <br> you rolled Dice 1: " +
    p2PlayerRollDice[0] +
    "  & Dice 2:  " +
    p2PlayerRollDice[1] +
    "<br> Please choose 1 or 2 to select which Dice to go first when you combine your 2 dice rolls"
  );
}

function getWinner() {
  if (p1PlayerTotal[0] < p2PlayerTotal[0]) {
    return "Player 2 WINS ";
  } else {
    return "Player 1 WINS ";
  }
}

var winMessage = getWinner();
var p1RollDiceWithMessage = p1RollDice();
var p2RollDiceWithMessage = p2RollDice();

console.log(p1RollDiceWithMessage);

function main(input) {
  console.log("check game state? ", gameState);
  var outputMessage = "";

  if (gameState === "P1 Roll Dice") {
    outputMessage = p1RollDiceWithMessage;
    gameState = "P1 Choose Order";
    return outputMessage;
  }

  if (gameState === "P1 Choose Order") {
    console.log("Control flow: gameState === P1 Choose Order");
    gameState = "P2 Roll Dice";
    console.log("check gameState - ", gameState);

    if (input == 1) {
      console.log("Player input 1");

      var p1PlayerScore = Number(
        String(p1PlayerRollDice[0]) + String(p1PlayerRollDice[1])
      );

      p1PlayerTotal.push(p1PlayerScore);
      console.log(p1PlayerTotal);

      return (
        "Your Score is " +
        p1PlayerScore +
        ".   Player 2 turn to play now.  Please Press SUBMIT to roll 2 dice"
      );
    }
    if (input == 2) {
      console.log("Player input 2");

      var p1PlayerScore = Number(
        String(p1PlayerRollDice[1]) + String(p1PlayerRollDice[0])
      );

      p1PlayerTotal.push(p1PlayerScore);

      return (
        "Your Score is " +
        p1PlayerScore +
        ".   Player 2 turn to play now. Please Press SUBMIT to roll 2 dice"
      );
    }
  }

  /// player 2

  if (gameState === "P2 Roll Dice") {
    outputMessage = p2RollDiceWithMessage;
    gameState = "P2 Choose Order";
    return outputMessage;
  }

  if (gameState === "P2 Choose Order") {
    console.log("Control flow: gameState === P2 Choose Order");

    console.log("check gameState - ", gameState);

    // console.log("check gamestate - " gameState)

    if (input == 1) {
      console.log("Player input 1");

      var p2PlayerScore = Number(
        String(p2PlayerRollDice[0]) + String(p2PlayerRollDice[1])
      );

      p2PlayerTotal.push(p2PlayerScore);

      console.log(p2PlayerTotal);

      return (
        "Your Score is " + p2PlayerScore + ".  Final Result is   " + winMessage
      );
    }
    if (input == 2) {
      console.log("Player input 2");

      var p2PlayerScore = Number(
        String(p2PlayerRollDice[0]) + String(p2PlayerRollDice[1])
      );

      p2PlayerTotal.push(p2PlayerScore);

      return (
        "Your Score is " + p1PlayerScore + ".  Final Result is   " + winMessage
      );
    }
  }
}
