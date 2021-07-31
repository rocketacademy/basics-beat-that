// Game states
//var gameState_diceCount = "gameState_diceCount";
var gameState_diceRoll = "gameState_diceRoll";
var gameState_diceOrder = "gameState_diceOrder";

// Dice count tracker
// var numDiceCount = 0;

// Initial game state
var gameMode = gameState_diceRoll;

// Player 1 starts
var currPlayer = 1;

// Dice roll results tracker as an array
var player1Rolls = [];
var player2Rolls = [];

// Dice simulation
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};
var getDiceRoll2 = function () {
  var twoDiceRolled = [getDiceRoll(), getDiceRoll()];
  // Insert round results to player results tracker array
  if (currPlayer === 1) {
    player1Rolls = twoDiceRolled;
  }
  if (currPlayer === 2) {
    player2Rolls = twoDiceRolled;
  }
  return twoDiceRolled;
};

var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var playerNumber = function () {
  var diceArray;
  if (currPlayer === 1) {
    diceArray = player1Rolls;
  }
  if (currPlayer === 2) {
    diceArray = player2Rolls;
  }
  return diceArray;
};

var playerNum;
if (firstNumeralIndex === 1) {
  playerNum = concatenate2Numbers(diceArray[0], diceArray[1]);
} else {
  playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
}
if (currPlayer === 1) {
  player1Num = playerNum;
} else {
  player2Num = playerNum;
  return playerNum;
}
var winner;
if (player1Num > player2Num) {
  winner = "Player 1";
} else {
  winner = "Player 2";
}

var main = function (input) {
  /*  if (gameMode == gameState_diceCount) {
    numDiceChosen = Number(input);
  if gameMode = gameState_diceRoll;
    return (
      "You're playing with " +
      numDiceChosen +
      " dice! Player 1, please proceed to roll your " +
      numDiceChosen +
      " dice!"
    );
  }
*/
  if (gameMode == gameState_diceRoll) {
    var roundDiceRolls = getDiceRoll2();
    gameMode = gameState_diceOrder;
    return (
      "Hello Player " +
      currPlayer +
      "! <br> Your first roll yields " +
      roundDiceRolls[0] +
      " and your second roll yields " +
      roundDiceRolls[1] +
      "! <br> Choose the order of your dice by entering 1 or 2 as your first numeral index!"
    );
  }

  if (gameMode === gameState_diceOrder) {
    var firstNumeralIndex = Number(input);
    var playerNum = playerNumber(firstNumeralIndex);
    var playerNumResponse =
      "Player " + currPlayer + ", your number is " + playerNum + ".";
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = gameState_diceRoll;
      return (
        playerNumResponse +
        "<br> Player 2's turn! Roll your dice by pressing the button."
      );
    }
    var winnerPlayer = winner;

    currPlayer = 1;
    gameMode = gameState_diceRoll;

    // Return the game end response
    return (
      playerNumResponse +
      "<br><br>Congratulations " +
      winnerPlayer +
      "! You won this round! <br>Player 1's number: " +
      player1Num +
      " | Player 2's number: " +
      player2Num +
      "<br><br> Play again by pressing the button!"
    );
  }
  // validation
  return "An error occurred. Please refresh to start again.";
};
