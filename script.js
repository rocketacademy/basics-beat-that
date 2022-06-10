// Beat That Project

// Global Variable
const game = new Map();
game.set("player1ready", false);
game.set("player2ready", false);
game.set("player1dice", false);
game.set("player2dice", false);
game.set("dice1", 0);
game.set("dice2", 0);
game.set("player1Number", 0);
game.set("player2Number", 0);
game.set("player1Won", 0);
game.set("player2Won", 0);
game.set("gamesPlayed", 0)
var player1ready = false;
var player2ready = false;
var player1dice = false;
var player2dice = false;
var dice1;
var dice2;
var player1Number;
var player2Number;

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var checkUserInput = function (userInput) {
  if (userInput === "1" || userInput === "2") {
    return false;
  }
  return true;
};

var pickOrder = function (dice1, dice2, choice) {
  if (choice === "1") {
    return "" + dice1 + dice2;
  } else {
    return "" + dice2 + dice1;
  }
};

var resetGame = function () {
  player1ready = false;
  player2ready = false;
  player1dice = false;
  player2dice = false;
};


var main = function (input) {
  let myOutputValue = '';
  if (player1ready === false) {
    dice1 = rollDice();
    dice2 = rollDice();
    myOutputValue += "Welcome Player 1.<br><br>";
    myOutputValue += `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
    player1ready = true;
    return myOutputValue;
  }

  if (player1dice === false) {
    if (checkUserInput(input)) {
      return "Please return a valid input (1 or 2).";
    }
    player1Number = pickOrder(dice1, dice2, input);
    player1Number = parseInt(player1Number);
    player1dice = true
    myOutputValue = "Player 2, please press the submit button to roll dice."
    return myOutputValue;
  }

  if(player2ready === false) {
    dice1 = rollDice();
    dice2 = rollDice();
    myOutputValue += "Welcome Player 2.<br><br>";
    myOutputValue += `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
    player2ready = true;
    return myOutputValue;
  }

  if (player2dice === false) {
    if (checkUserInput(input)) {
      return "Please return a valid input (1 or 2).";
    }
    player2Number = pickOrder(dice1, dice2, input);
    player2Number = parseInt(player2Number);
    player2dice = true
  }

  // Win Condition
  
  if (player1Number > player2Number) {
    myOutputValue += "Player 1 won.<br><br>";
  } else if (player2Number > player1Number) {
    myOutputValue += "Player 2 won.<br><br>";
  } else {
    myOutputValue += "Draw.<br><br>";
  }

  console.log("Player 1 Number:",player1Number);
  console.log("Player 2 Number:",player2Number);

  myOutputValue += `Player 1 has ${player1Number} and Player 2 has ${player2Number}<br><br>Press submit to start new game`;
  resetGame();

  return myOutputValue;
};
