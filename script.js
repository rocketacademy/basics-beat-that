// create a 2 player mode and dice roll/dice order mode
var playersMode = "player 1";
var gameMode = "dice roll";
var player1;
var player2;
var myOutputValue;
var roll1;
var roll2;

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

var declareWinner = function () {
  if (player1 > player2) {
    myOutputValue = `Player 1, you got ${player1}. Player 2, you got ${player2}. Player 1 wins!`;
  }
  if (player1 < player2) {
    myOutputValue = `Player 1, you got ${player1}. Player 2, you got ${player2}. Player 2 wins!`;
  }
  if (player1 == player2) {
    myOutputValue = `Player 1, you got ${player1}. Player 2, you got ${player2}. It's a draw!`;
  }
  gameMode = "dice roll";
  playersMode = "player 1";
  return myOutputValue;
};

// return results of dice ordering and announce winner
var diceOrder = function (input) {
  if (playersMode == "player 1") {
    playersMode = "player 2";
    gameMode = "dice roll";
    if (input == 1) {
      player1 = roll1 + roll2;
      console.log("Player 1:", player1);
      return `Your recorded dice roll is ${roll1}${roll2}. Player 2 may roll now.`;
    }
    if (input == 2) {
      player1 = roll2 + roll1;
      console.log("Player 1:", player1);
      return `Your recorded dice roll is ${roll2}${roll1}. Player 2 may roll now.`;
    }
  }
  if (playersMode == "player 2") {
    if (input == 1) {
      player2 = roll1 + roll2;
      console.log("Player 2:", player2);
      return declareWinner();
    }
    if (input == 2) {
      player2 = roll2 + roll1;
      console.log("Player 2:", player2);
      return declareWinner();
    }
  }
  return "Invalid input. Please indicate '1' if you want dice 1 to be recorded first, and '2' if you want dice 2 to be recorded first.";
};

var main = function (input) {
  if (gameMode == "dice roll") {
    return diceRoll();
  }
  if (gameMode == "dice order") {
    return diceOrder(input);
  }
};
