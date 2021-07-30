//two game modes
var gameModeRollDice = "Game mode roll dice";
var gameModeDiceSequence = "Game mode dice sequence";

var gameMode = gameModeRollDice;

// Player 1 to start the game
var currPlayer = "player1";

// There are two players in the game
var diceArrayPlayer1 = [];
var diceArrayPlayer2 = [];

// Each Player Total Scores
var player1Total = 0;
var player2Total = 0;

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == gameModeRollDice && currPlayer == "player1") {
    var dice1 = rollDice();
    diceArrayPlayer1.push(dice1);
    var dice2 = rollDice();
    diceArrayPlayer1.push(dice2);
    myOutputValue =
      "You rolled" +
      dice1 +
      dice2 +
      "Player 1, Please choose your sequence by inputting 0 (1st dice & 2nd dice) or 1 (2nd dice & 1st dice)";
    gameMode = gameModeDiceSequence;
    return myOutputValue;
  } else if (gameMode == gameModeDiceSequence && currPlayer == "player1") {
    gameMode = gameModeRollDice;
    currPlayer = "player2";
    if (input == 0) {
      player1Total = diceArrayPlayer1[0] + "" + diceArrayPlayer1[1];
      return player1Total;
    }
    if (input == 1) {
      player1Total = diceArrayPlayer1[1] + "" + diceArrayPlayer1[0];
      return player1Total;
    }
  }
  if (gameMode == gameModeRollDice && currPlayer == "player2") {
    var dice1 = rollDice();
    diceArrayPlayer2.push(dice1);
    var dice2 = rollDice();
    diceArrayPlayer2.push(dice2);
    myOutPutValue =
      "You rolled" +
      dice1 +
      dice2 +
      "Player 2, Please choose your sequence by inputting 0 (1st dice & 2nd dice) or 1 (2nd dice & 1st dice)";
    gameMode = gameModeDiceSequence;
    return myOutPutValue;
  } else if (gameMode == gameModeDiceSequence && currPlayer == "player2") {
    currPlayer = "player1";
    gameMode = gameModeRollDice;
    if (input == 0) {
      player2Total = diceArrayPlayer2[0] + "" + diceArrayPlayer2[1];
    }
    if (input == 1) {
      player2Total = diceArrayPlayer2[1] + "" + diceArrayPlayer2[0];
    }
    myOutPutValue = winningCondition();
    return myOutPutValue;
  }
};
// to return a dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomIntegar = Math.floor(randomDecimal);
  var diceNumber = randomIntegar + 1;
  return diceNumber;
};

//To compare Player 1 and Player 2 total no of points
var winningCondition = function () {
  if (player1Total > player2Total) {
    myOutputValue = "Congratulations, Player 1 won!";
  } else {
    myOutputValue = "Congratulations, Player 2 won!";
  }
  diceArrayPlayer1 = [];
  diceArrayPlayer2 = [];
  player1Total = 0;
  player2Total = 0;
  return myOutputValue;
};
