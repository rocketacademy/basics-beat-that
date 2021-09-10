// create a 2 player mode and dice roll/dice order mode
var playersMode = "player 1";
var gameMode = "dice roll";
var otherModes = "highest number wins";
var player1;
var player2;
var myOutputValue;
var roll1;
var roll2;
var player1score = 0;
console.log("Player 1's score:", player1score);
var player2score = 0;
console.log("Player 2's score:", player2score);

// generate random dice rolls
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

// return result of dice rolls and invite dice ordering
var diceRoll = function () {
  var rollOne = rollDice();
  roll1 = String(rollOne);
  console.log("Roll 1: " + rollOne);
  var rollTwo = rollDice();
  roll2 = String(rollTwo);
  console.log("Roll 2: " + rollTwo);
  if (playersMode == "player 1") {
    gameMode = "dice order";
    return (
      "Nice rollin', Player 1!" +
      "<br><br>" +
      `Dice One: ${roll1}` +
      "<br>" +
      `Dice Two: ${roll2}` +
      "<br><br>" +
      "Please indicate the order you want your dice roll to be recorded in. If you want dice 1 to be recorded first, enter '1'. If you want dice 2 to be recorded first, enter '2'."
    );
  }
  if (playersMode == "player 2") {
    gameMode = "dice order";
    return (
      "Nice rollin', Player 2!" +
      "<br><br>" +
      `Dice One: ${roll1}` +
      "<br>" +
      `Dice Two: ${roll2}` +
      "<br><br>" +
      "Please indicate the order you want your dice roll to be recorded in. If you want dice 1 to be recorded first, enter '1'. If you want dice 2 to be recorded first, enter '2'."
    );
  }
};

var runningScore = function () {
  if (player1score > player2score || player1score == player2score) {
    var outputValue =
      "<br><br>" +
      "<b>Running Score</b>" +
      "<br>" +
      `Player 1: ${player1score}` +
      "<br>" +
      `Player 2: ${player2score}`;
  }
  if (player2score > player1score) {
    outputValue =
      "<br><br>" +
      "<b>Running Score</b>" +
      "<br>" +
      `Player 2: ${player2score}` +
      "<br>" +
      `Player 1: ${player1score}`;
  }
  return outputValue;
};

var declareWinner = function () {
  myOutputValue =
    `Player 1, you got ${player1}. Player 2, you got ${player2}.` + "<br><br>";

  if (otherModes == "highest number wins") {
    if (player1 > player2) {
      myOutputValue =
        myOutputValue + `Player 1 wins this round!` + runningScore();
    }
    if (player1 < player2) {
      myOutputValue =
        myOutputValue + `Player 2 wins this round!` + runningScore();
    }
    if (player1 == player2) {
      myOutputValue =
        myOutputValue + `It's a draw this round!` + runningScore();
    }
  }

  if (otherModes == "lowest number wins") {
    if (player1 > player2) {
      myOutputValue =
        myOutputValue + `Player 2 wins this round!` + runningScore();
    }
    if (player1 < player2) {
      myOutputValue =
        myOutputValue + `Player 1 wins this round!` + runningScore();
    }
    if (player1 == player2) {
      myOutputValue = myOutputValue + `It's a draw!` + runningScore();
    }
  }
  gameMode = "dice roll";
  playersMode = "player 1";
  return myOutputValue;
};

// return results of dice ordering and announce winner
var diceOrder = function (input) {
  if (playersMode == "player 1") {
    if (input == 1) {
      player1 = roll1 + roll2;
      player1score = player1score + Number(player1);
      playersMode = "player 2";
      gameMode = "dice roll";
      console.log("Player 1:", player1);
      return `Your recorded dice roll is ${roll1}${roll2}. Player 2 may roll now.`;
    }
    if (input == 2) {
      player1 = roll2 + roll1;
      player1score = player1score + Number(player1);
      playersMode = "player 2";
      gameMode = "dice roll";
      console.log("Player 1:", player1);
      return `Your recorded dice roll is ${roll2}${roll1}. Player 2 may roll now.`;
    }
  }
  if (playersMode == "player 2") {
    if (input == 1) {
      player2 = roll1 + roll2;
      player2score = player2score + Number(player2);
      console.log("Player 2:", player2);
      return declareWinner();
    }
    if (input == 2) {
      player2 = roll2 + roll1;
      player2score = player2score + Number(player2);
      console.log("Player 2:", player2);
      return declareWinner();
    }
  }
  return "Invalid input. Please indicate '1' if you want dice 1 to be recorded first, and '2' if you want dice 2 to be recorded first.";
};

var main = function (input) {
  if (input == "lowest") {
    otherModes = "lowest number wins";
    return "Starting now, the lowest number wins. To revert back to having the highest number win, enter 'highest'.";
  }
  if (input == "highest") {
    otherModes = "highest number wins";
    return "Starting now, the highest number wins. To have the lowest number win, enter 'lowest'.";
  }
  if (gameMode == "dice roll") {
    return diceRoll();
  }
  if (gameMode == "dice order") {
    return diceOrder(input);
  }
};
