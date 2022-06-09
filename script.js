var gameState = "begin";
var begin = "begin";
var startGame = "startgame";
var nextPlayer = "next";
var compare = "compare";
var firstDice = 0;
var secondDice = 0;
var final = 0;
var playerRolls = [];
var currentPlayer = 1;

// random number generator
var randomNum = function (max) {
  return Math.floor(Math.random() * max) + 1;
};

var roll = function () {
  var numberOfSides = 6;
  firstDice = randomNum(numberOfSides);
  secondDice = randomNum(numberOfSides);
};

var sequence = function (input) {
  if (input == 1) {
    final = Number("" + firstDice + secondDice);
    playerRolls.push(final);
    final = 0;
    return `You chose Dice 1 first. <br>Your Number is ${
      playerRolls[currentPlayer - 1]
    }.`;
  } else if (input == 2) {
    final = Number("" + secondDice + firstDice);
    playerRolls.push(final);
    final = 0;
    return `You chose Dice 2 first. <br>Your Number is ${
      playerRolls[currentPlayer - 1]
    }.`;
  } else {
    return `Please enter '1' or '2' only!<br><br> Dice 1: ${firstDice}<br>Dice 2: ${secondDice}`;
  }
};
var outcome = function () {
  var output = `Player 1 score = ${playerRolls[0]}.<br>Player 2 score = ${playerRolls[1]}.`;
  if (playerRolls[0] > playerRolls[1]) {
    return output + `<br><br>Player 1 won! <br><br> Press 'q' to quit!`;
  } else if (playerRolls[0] < playerRolls[1]) {
    return output + `<br><br>Player 2 won!<br><br> Press 'q' to quit!`;
  } else {
    return output + `<br><br>Draw!<br><br> Press 'q' to quit!`;
  }
};

var main = function (input) {
  if (input != "q") {
    var output = "";
    if (gameState == begin) {
      roll();
      gameState = startGame;
      return `Player ${currentPlayer}<br><br> You have rolled <br> Dice 1: ${firstDice}<br> Dice 2: ${secondDice}. <br><br> Please choose which dice to go first! `;
    }
    if (gameState == startGame) {
      output = sequence(input);
      if (Number.isInteger(playerRolls[1])) {
        gameState = compare;
        return output + `<br><br>Press roll to reveal result!`;
      } else if (Number.isInteger(playerRolls[0]) && currentPlayer == 1) {
        currentPlayer = 2;
        gameState = begin;
        return output + `<br><br>Press roll to start Player 2's turn!`;
      }
      return output;
    }

    if (gameState == compare) {
      output = outcome();
      return output;
    }
  } else {
    firstDice = 0;
    secondDice = 0;
    final = 0;
    playerRolls = [];
    currentPlayer = 1;
    gameState = begin;
    return `Thank you for playing! Press roll to start a new round!`;
  }
};
