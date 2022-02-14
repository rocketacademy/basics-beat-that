// Varible gameState is used to organize steps through game
// 0 - initial state
// 1 - roll dice for player 1
// 2 - ask player 1 for dice order
// 3 - roll dice for player 2
// 4 - ask player 2 for dice order
// 5 - print out who won and statistics
// 6 - invite for another round
var gameState = 0;

// Dice order 1 - first dice is left number, 2 - second dice is left number
var player1DiceOrder = 0;
var player2DiceOrder = 0;

// Number of games played
var totalGames = 0;

// Number of players wins
var player1Won = 0;
var player2Won = 0;

var main = function (input) {
  var message = "";

  if (gameState == 0) {
    message = `Welcome to Beat That game! <br><br>`;
    message += `Press button to roll dice for player 1`;
    gameState += 1;
  }

  if (gameState == 1) {
    gameState += 1;
  }

  if (gameState == 2) {
    gameState += 1;
  }

  if (gameState == 3) {
    gameState += 1;
  }

  if (gameState == 4) {
    gameState += 1;
  }

  if (gameState == 5) {
    gameState += 1;
  }

  if (gameState == 6) {
    gameState = 1;
  }

  return message;
};
