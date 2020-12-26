var gameMode = 'player1rolls';
var player1Dice1;
var player1Dice2;
var player1Pick;
var player2Dice1;
var player2Dice2;
var player2Pick;

var diceRoll = function () {
  // number from 0 to 1
  var digit = Math.random();
  // number from 0 to 6
  var number = digit * 6;
  // integer to float from 0 to 5
  var integer = Math.floor(number) + 1;
  return integer;
};

var player1turn = function () {
  player1Dice1 = diceRoll();
  player1Dice2 = diceRoll();
  gameMode = 'player1picks';
};

var player2turn = function () {
  player2Dice1 = diceRoll();
  player2Dice2 = diceRoll();
  gameMode = 'player2picks';
};

var player1P = function (input) {
  var result;
  if (input == 1) {
    result = (player1Dice1 * 10) + player1Dice2;
  }
  else if (input == 2) {
    result = (player1Dice2 * 10) + player1Dice1;
  }
  gameMode = 'player2rolls';
  return result;
};

var player2P = function (input) {
  var result;
  if (input == 1) {
    result = (player2Dice1 * 10) + player2Dice2;
  }
  else if (input == 2) {
    result = (player2Dice2 * 10) + player2Dice1;
  }
  gameMode = 'gameResult';
  return result;
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == 'player1rolls') {
    player1turn();
    myOutputValue = 'Welcome Player1. <br> You rolled Dice 1:' + player1Dice1 + ' and Dice 2:' + player1Dice2 + '. <br> Choose the order of the dice.';
    return myOutputValue;
  }
  if (gameMode == 'player1picks') {
    player1Pick = player1P(input);
    myOutputValue = 'Player1, you chose Dice ' + input + ' fist. <br> Your number is ' + player1Pick + '. <br> It is now Player 2\'s turn';
    return myOutputValue;
  }
  if (gameMode == 'player2rolls') {
    player2turn();
    myOutputValue = 'Welcome Player2. <br> You rolled Dice 1:' + player2Dice1 + ' and Dice 2:' + player2Dice2 + '. <br> Player 1\'s score is ' + player1Pick + '<br> Choose the order of the dice.';
    return myOutputValue;
  }
  if (gameMode == 'player2picks') {
    player2Pick = player2P(input);
    myOutputValue = 'Player2, you chose Dice ' + input + ' fist. <br> Your number is ' + player2Pick + '<br>';
    if (player2Pick > player1Pick) {
      myOutputValue = myOutputValue + 'Player 2 wins';
    }
    else if (player2Pick == player1Pick) {
      myOutputValue = myOutputValue + 'It\'s a draw';
    }
    else if (player1Pick > player2Pick) {
      myOutputValue = myOutputValue + 'Player 1 wins!';
    }
    gameMode = 'player1picks';
    return myOutputValue;
  }
};
