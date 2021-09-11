// dices
var dice11 = 0;
var dice12 = 0;
var dice21 = 0;
var dice22 = 0;

// game mode
var gameMode1 = `user1 roll dice`;
var gameMode2 = `user1 choose dice`;
var gameMode3 = `user2 roll dice`;
var gameMode4 = `user2 choose dice`;
var gameMode = gameMode1;

// player mode
var player1Turn = `Player 1`;
var player2Turn = `Player 2`;
var playerTurn = player1Turn;

// chosen numbers
var player1ChosenNo = ``;
var player2ChosenNo = ``;

// number generator. 1 - 6
var genDiceRoll = function () {
  var randomDice = Math.floor(Math.random() * 6);
  return randomDice + 1;
};

var main = function (input) {
  var dice11 = genDiceRoll();
  var dice12 = genDiceRoll();
  var dice21 = genDiceRoll();
  var dice22 = genDiceRoll();

  if (gameMode == gameMode1) {
    player1Dice1 = dice11;
    player1Dice2 = dice12;
    gameMode = gameMode2;
    return `${playerTurn} <br><br> Dice numbers: ${dice11}, ${dice12}. <br><br> Please choose the order of dice by entering 1 or 2.`;
  }

  if (gameMode == gameMode2) {
    if (input == 1) {
      player1ChosenNo = [player1Dice1] + [player1Dice2];
      playerTurn = player2Turn;
      gameMode = gameMode3;
      console.log(dice11, dice12);
    }

    if (input == 2) {
      player1ChosenNo = [player1Dice2] + [player1Dice1];
      playerTurn = player2Turn;
      gameMode = gameMode3;
      console.log(dice11, dice12);
    }

    return `Player 1 number is ${player1ChosenNo} <br><br> Player 2, please hit submit to throw your dice.`;
  }

  if (gameMode == gameMode3) {
    player2Dice1 = dice21;
    player2Dice2 = dice22;
    gameMode = gameMode4;
    return `${playerTurn} <br><br> Dice numbers: ${dice21}, ${dice22}. <br><br> Please choose the order of dice by entering 1 or 2.`;
  }

  if (gameMode == gameMode4) {
    if (input == 1) {
      player2ChosenNo = [player2Dice1] + [player2Dice2];
    }
    if (input == 2) {
      player2ChosenNo = [player2Dice2] + [player2Dice1];
    }

    if (player1ChosenNo > player2ChosenNo) {
      winner = `Player 1 Wins!`;
    }
    if (player2ChosenNo > player1ChosenNo) {
      winner = `Player 2 Wins!`;
    }

    return `Your number is ${player2ChosenNo}. <br><br> ${winner}`;
  }
};
