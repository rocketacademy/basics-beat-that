//global variables
var gamestage = 1;
var gameRound = 0;

//global states stating players' individual dices
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;

//arrays to contain players' combined numbers
var player1FinalNum = [];
var player2FinalNum = [];

//global states stating scores
var player1TotalScore = 0;
var player2TotalScore = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  var diceNumber = randomInteger;
  return diceNumber;
};

var rollPlayer1Dices = function () {
  var dice1 = rollDice();
  var dice2 = rollDice();
  var combinePlayer1DicesOption1 = "" + dice1 + dice2;
  var combinePlayer1DicesOption2 = "" + dice2 + dice1;
  myOutputValue = `Your first dice is ${dice1} and your second dice is ${dice2}! Type <B>1</b> to choose ${combinePlayer1DicesOption1} or <B>2</b> to choose ${combinePlayer1DicesOption2} to compete with Player 2.`;
  player1FinalNum.push(combinePlayer1DicesOption1);
  player1FinalNum.push(combinePlayer1DicesOption2);
  console.log(player1FinalNum);
  return myOutputValue;
};

var rollPlayer2Dices = function () {
  var dice1 = rollDice();
  var dice2 = rollDice();
  var combinePlayer2DicesOption1 = "" + dice1 + dice2;
  var combinePlayer2DicesOption2 = "" + dice2 + dice1;
  myOutputValue = `Your first dice is ${dice1} and your second dice is ${dice2}! Type <B>1</b> to choose ${combinePlayer2DicesOption1} or <B>2</b> to choose ${combinePlayer2DicesOption2} to compete with Player 1.`;
  player2FinalNum.push(combinePlayer2DicesOption1);
  player2FinalNum.push(combinePlayer2DicesOption2);
  console.log(player2FinalNum);
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
    //pushing player 1's choice into an array, popping out the other unchosen number
    gameRound = 0;
    player1FinalNum.pop(player1FinalNum.length - 1);
    console.log(player1FinalNum);
    var player1FinalFinalNum = player1FinalNum[gameRound];
    var myOutputValue = `Player 1 has chosen ${player1FinalFinalNum}. Player 2, please click <b>submit</b> to roll your dices.`;
    gamestage = 3;
    return myOutputValue;
  }

  if (gamestage == 2 && input == "2") {
    gameRound += 1;
    console.log(player1FinalNum[gameRound]);
    var myOutputValue = `Player 1 has chosen ${player1FinalNum[gameRound]}. Player 2, please click <b>submit</b> to roll your dices.`;
    gamestage = 3;
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
  if (gamestage == 4) {
    //pushing player 2's choice into an array.
    player2FinalNum.push(input);
    console.log(player2FinalNum[gameRound]);
    if (player2FinalNum[gameRound] > player1FinalNum[gameRound]) {
      var myOutputValue = `Player 2 has chosen ${player2FinalNum[gameRound]}. Player 1's number was ${player1FinalNum[gameRound]}, therefore Player 2 wins.<BR><BR>
   Please click <B>submit</b> to play again!`;
    } else {
      var myOutputValue = `Player 2 has chosen ${player2FinalNum[gameRound]}. Player 1's number was ${player1FinalNum[gameRound]}, therefore Player 1 wins.<BR><BR>
   Please click <B>submit</b> to play again!`;
    }
    gamestage = 1;
    gameRound += 1;
    return myOutputValue;
  }

  return myOutputValue;
};
