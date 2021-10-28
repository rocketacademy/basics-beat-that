var gamestage = 1;
var gameRound = 0;

//variables stating players' individual dices
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;

//variables stating players' final combined numbers
var p1num = 0;
var p2num = 0;

//global states stating scores
var p1TotalScore = 0;
var p2TotalScore = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  var diceNumber = randomInteger;
  return diceNumber;
};

var rollPlayer1Dices = function () {
  var dice1 = rollDice().toString();
  var dice2 = rollDice().toString();
  player1Dice1 = dice1 + dice2;
  player1Dice2 = dice2 + dice1;
  myOutputValue = `Hi Player 1!<BR><BR>
  
  Your first dice is ${dice1} and your second dice is ${dice2}! <BR><BR>
  
  Type <B>1</b> to choose ${player1Dice1} or <B>2</b> to choose ${player1Dice2} to compete with Player 2.`;
  return myOutputValue;
};

var rollPlayer2Dices = function () {
  var dice1 = rollDice().toString();
  var dice2 = rollDice().toString();
  player2Dice1 = dice1 + dice2;
  player2Dice2 = dice2 + dice1;
  myOutputValue = `Hi Player 2! <BR><BR>
  
  Your first dice is ${dice1} and your second dice is ${dice2}! <BR><BR>
  
  Type <B>1</b> to choose ${player2Dice1} or <B>2</b> to choose ${player2Dice2} to compete with Player 1.`;
  return myOutputValue;
};

var main = function (input) {
  //gamestage 1, where player 1 rolls the 2 dices.
  if (gamestage == 1) {
    var player1Rolls = rollPlayer1Dices();
    var myOutputValue = `${player1Rolls}`;
    gamestage = 2;
    gameRound = 0;
    return myOutputValue;
  }

  //gamestage 2, where player 1 enters his choice.
  if (gamestage == 2 && input == "1") {
    var myOutputValue = `Player 1 has chosen ${player1Dice1}. Player 2, please click <b>submit</b> to roll your dices.`;
    p1num = player1Dice1;
    gamestage = 3;
    console.log("player 1", p1num);
    return myOutputValue;
  }

  if (gamestage == 2 && input == "2") {
    var myOutputValue = `Player 1 has chosen ${player1Dice2}. Player 2, please click <b>submit</b> to roll your dices.`;
    p1num = player1Dice2;
    gamestage = 3;
    console.log("player 1", p1num);
    return myOutputValue;
  }

  //gamestage 3, where player 2 rolls 2 dices.
  if (gamestage == 3) {
    var player2Rolls = rollPlayer2Dices();
    var myOutputValue = `${player2Rolls}`;
    gamestage = 4;
    return myOutputValue;
  }

  //gamestage 4, where player 2 enters his choice.
  if (gamestage == 4 && input == "1") {
    p2num = player2Dice1;
    p2TotalScore += Number(p2num);
    p1TotalScore += Number(p1num);
    if (p2num > p1num) {
      var myOutputValue = `Player 2 has chosen ${p2num}. Player 1's number was ${p1num}, therefore Player 2 wins.<BR><BR>
      <B>Scoreboard</b><BR><BR>
      Player 1: ${p1TotalScore}<BR>
      Player 2: ${p2TotalScore}<BR>
   Please click <B>submit</b> to play again!`;
    } else {
      p2num = player2Dice2;
      var myOutputValue = `Player 2 has chosen ${p2num}. Player 1's number was ${p1num}, therefore Player 1 wins.<BR><BR>
      <B>Scoreboard</b><BR><BR>
      Player 1: ${p1TotalScore}<BR>
      Player 2: ${p2TotalScore}<BR>
   Please click <B>submit</b> to play again!`;
    }

    gamestage = 1; //resetting gamestage
    gameRound += 1;
    return myOutputValue;
  }
  return myOutputValue;
};
