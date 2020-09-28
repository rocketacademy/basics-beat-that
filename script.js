// get random roll from 1 to 6
var getRandomDice = function () {
  var randomFloat = Math.random() * 6;
  var randomInteger = Math.floor(randomFloat) + 1;
  return randomInteger;
};

var gameMode = 'player 1 roll';
var player1Roll = 'player 1 roll';
var player2Roll = 'player 2 roll';
var player1Choice = 'player 1 choice';
var player2Choice = 'player 2 choice';
var continueGame = 'continue';
var endGame = 'end';
var dice1Roll;
var dice2Roll;
var dice1 = 'dice 1';
var dice2 = 'dice 2';
var player1Number;
var player2Number;

var main = function (input) {
  var myOutputValue = 'hello world';
  if (gameMode == player1Roll) {
    // when player click submit, roll 2 dice
    dice1Roll = getRandomDice();
    dice2Roll = getRandomDice();
    // go to player 1 choice
    myOutputValue = 'Welcome Player 1. <br><br> You rolled <br>Dice 1: ' + dice1Roll + ' and Dice 2: ' + dice2Roll + '. <br><br> Choose the order of the dice by typing in dice 1 or dice 2, then click submit.';
    gameMode = player1Choice;
  } else if (gameMode == player1Choice) {
    // if player 1 chose dice 1
    if (input == dice1) {
      player1Number = (dice1Roll * 10) + dice2Roll;
      myOutputValue = 'Player 1, you chose ' + dice1 + ' first. <br>Your number is ' + player1Number + '. <br> It is now player 2\'s turn. <br><br>Click Submit to roll.';
      // go to player 2 mode
      gameMode = player2Roll;
    } else
    // if player 1 chose dice 2
    if (input == dice2) {
      player1Number = (dice2Roll * 10) + dice1Roll;
      myOutputValue = 'Player 1, you chose ' + dice2 + ' first. <br>Your number is ' + player1Number + '. <br> It is now player 2\'s turn. <br><br>Click Submit to roll.';
      // go to player 2 mode
      gameMode = player2Roll;
    }
  } else if (gameMode == player2Roll) {
    // when player click submit, roll 2 dice
    dice1Roll = getRandomDice();
    dice2Roll = getRandomDice();
    // go to player 2 choice
    myOutputValue = 'Welcome Player 2. <br><br> You rolled <br>Dice 1: ' + dice1Roll + ' and Dice 2: ' + dice2Roll + '. <br><br> Choose the order of the dice by typing in dice 1 or dice 2, then click submit.';
    gameMode = player2Choice;
  } else if (gameMode == player2Choice) {
    if (input == dice1) {
      player2Number = (dice1Roll * 10) + dice2Roll;
      myOutputValue = 'Player 2, you chose ' + dice1 + ' first. <br>Your number is ' + player2Number + '. <br> Click Submit to see the results!';
      // go to player 2 mode
      gameMode = endGame;
    } else
    // if player 1 chose dice 2
    if (input == dice2) {
      player2Number = (dice2Roll * 10) + dice1Roll;
      myOutputValue = 'Player 2, you chose ' + dice2 + ' first. <br>Your number is ' + player2Number + '. <br> Click Submit to see the results!';
      // go to player 2 mode
      gameMode = endGame;
    }
  } else if (gameMode == endGame) {
    if (player1Number > player2Number) {
      myOutputValue = 'Player 1 won! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    } else if (player1Number < player2Number) {
      myOutputValue = 'Player 2 won! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    } else if (player1Number == player2Number) {
      myOutputValue = 'It was a draw! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    }
  }
  return myOutputValue;
};
