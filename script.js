var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var addScore = function (X, Y) {
  return (X * 10) + Y;
};

var diceOne = 0;
var diceTwo = 0;
var playerOneScore = 0;
var playerTwoScore = 0;
var myOutputValue = '';
var gameScore = 'Player 1: ' + playerOneScore + '. Player 2: ' + playerTwoScore + '.';

// click submit button
var main = function () {
  // roll dice 1 and 2
  diceOne = diceRoll();
  diceTwo = diceRoll();
  console.log(diceOne);
  console.log(diceTwo);
  // show dice score
  myOutputValue = 'Dice one has a score of ' + diceOne + '. Dice two has a score of ' + diceTwo + '. Which dice will you choose first?';
  return myOutputValue;
};

// player input 1 or 2 to choose dice score
// submit
var main2 = function (input) {
  var score = 0;
  // calculate dice score
  if (input == 1) {
    score = addScore(diceOne, diceTwo);
    myOutputValue = 'Your dice score is ' + score + '.';
  }
  else if (input == 2) {
    score = addScore(diceTwo, diceOne);
    myOutputValue = 'Your dice score is ' + score + '.';
  }
  else {
    myOutputValue = 'Dice one has a score of ' + diceOne + '. Dice two has a score of ' + diceTwo + '. Invalid. Please input only 1 or 2.';
    return myOutputValue;
  }

  // check mode/player turn
  if (playerOneScore == 0) {
    playerOneScore = score;
    myOutputValue = myOutputValue + ' Roll dice for player 2 turn.';
    gameScore = 'Player 1: ' + playerOneScore + '. Player 2: ' + playerTwoScore + '.';
  } else {
    playerTwoScore = score;
    if (playerOneScore > playerTwoScore) {
      // if mode 1 = 0, add score to mode 1. then show mode 2 turn
      myOutputValue = myOutputValue + ' Player 1 win';
      // if playerOnescore and playerTwoScore are a draw.
    } else if (playerOneScore == playerTwoScore) {
      myOutputValue = 'It is a draw. Please restart the game and try again.';
    } else {
      // if mode 2 = 0, add score to mode 2. then end game
      myOutputValue = myOutputValue + ' Player 2 win';
    }
    gameScore = 'Player 1: ' + playerOneScore + '. Player 2: ' + playerTwoScore + '.';
  }

  return myOutputValue;
};

var getScore = function () {
  return gameScore;
};
