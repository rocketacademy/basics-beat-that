// click submit
// player 1 roll 2 dice and show dice rolls
var diceResultPlayer1 = [];
var diceOrderPlayer1 = "";
var diceResultPlayer2 = [];
var diceOrderPlayer2 = "";
var myOutputValue = "";
var gameMode = `Player 1 rolls`;
var Player1Score = 0;
var Player2Score = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceResultPlayer1 = function () {
  if (diceResultPlayer1 == 0) {
    var diceRoll1 = rollDice();
    var diceRoll2 = rollDice();
    diceResultPlayer1.push(diceRoll1, diceRoll2);
  } else {
  }
  return diceResultPlayer1;
};

// player 1 enters order of dice - 1 for same or 2 to swap, then click submit
var decideDiceOrderPlayer1 = function (input, diceResultPlayer1) {
  if (input == 1 && gameMode == "Player 1 rolls") {
    diceOrderPlayer1 = "" + diceResultPlayer1[0] + diceResultPlayer1[1];
  } else if (input == 2 && gameMode == "Player 1 rolls") {
    diceOrderPlayer1 = "" + diceResultPlayer1[1] + diceResultPlayer1[0];
  }

  return Number(diceOrderPlayer1);
};

// player 2 roll 2 dice and show dice rolls
var rollDiceResultPlayer2 = function () {
  if (diceResultPlayer2 == 0) {
    var diceRoll3 = rollDice();
    var diceRoll4 = rollDice();
    diceResultPlayer2.push(diceRoll3, diceRoll4);
  } else {
  }
  return diceResultPlayer2;
};

// player 2 enters order of dice - 1 for same or 2 to swap, then click submit
var decideDiceOrderPlayer2 = function (input, diceResultPlayer2) {
  if (input == 1 && gameMode == "Player 2 rolls") {
    diceOrderPlayer2 = Number("" + diceResultPlayer2[0] + diceResultPlayer2[1]);
  } else if (input == 2 && gameMode == "Player 2 rolls") {
    diceOrderPlayer2 = Number("" + diceResultPlayer2[1] + diceResultPlayer2[0]);
  }
  return diceOrderPlayer2;
};

//compare numbers, player with higher number wins
var decideWinner = function (input, diceOrderPlayer1, diceOrderPlayer2) {
  var diceOrderPlayer1 = decideDiceOrderPlayer1(input, diceResultPlayer1);
  var diceOrderPlayer2 = decideDiceOrderPlayer2(input, diceResultPlayer2);
  var winner = `It's a draw!`;
  if (diceOrderPlayer1 > diceOrderPlayer2) {
    winner = `Player 1 wins!`;
  } else if (diceOrderPlayer2 > diceOrderPlayer1) {
    winner = `Player 2 wins!`;
  }
  return winner;
};

// valid inputs are "", 1 or 2.
var checkInputValid = function (input) {
  inputValid = false;
  if (
    (input == "" && gameMode == `Player 1 rolls`) ||
    input == 1 ||
    input == 2
  ) {
    inputValid = true;
  }
  return inputValid;
};

var main = function (input) {
  var diceOrderPlayer1 = decideDiceOrderPlayer1(input, diceResultPlayer1);
  var diceOrderPlayer2 = decideDiceOrderPlayer2(input, diceResultPlayer2);
  // click submit and roll dice for Player 1
  if (input == "" && gameMode == `Player 1 rolls`) {
    diceResultPlayer1 = rollDiceResultPlayer1();
    myOutputValue = `Player 1 rolled ${diceResultPlayer1}! <br><br> Press "1" to retain order or "2" to reverse order <br><br> E.g. You rolled 3 and 5. Press "1" for 35, and "2" for 53. `;
    console.log("Player 1", diceResultPlayer1);
  }
  // Player 1 decides dice order
  else if (
    (input == 1 && gameMode == `Player 1 rolls`) ||
    (input == 2 && gameMode == `Player 1 rolls`)
  ) {
    console.log("diceOrderPlayer 1", diceOrderPlayer1);
    myOutputValue = `Player 1's hand: ${diceOrderPlayer1}<br><br> It is now Player 2's turn`;
    gameMode = `Player 2 rolls`;
    console.log(`gameMode`, gameMode);
  }
  // click submit and roll dice for Player 2
  else if (input == "" && gameMode == `Player 2 rolls`) {
    diceResultPlayer2 = rollDiceResultPlayer2();
    console.log("Player 2", diceResultPlayer2);
    myOutputValue = `Player 2 rolled ${diceResultPlayer2}! <br><br> Press "1" to retain order or "2" to reverse order <br><br> E.g. You rolled 3 and 5. Press "1" for 35, and "2" for 53. `;
  }
  // Player 2 decides dice order
  else if (
    (input == 1 && gameMode == `Player 2 rolls`) ||
    (input == 2 && gameMode == `Player 2 rolls`)
  ) {
    console.log("diceOrderPlayer 2", diceOrderPlayer2);
    myOutputValue = `Player 2's hand: ${diceOrderPlayer2}<br><br> Click "submit" to find out who wins!`;
    gameMode = `decide winner`;
    console.log(`gameMode`, gameMode);
  }
  // click submit and obtain winner
  else if (input == "" && gameMode == `decide winner`) {
    console.log("diceOrderPlayer 1", diceOrderPlayer1);
    console.log("diceOrderPlayer 2", diceOrderPlayer2);
    var winner = decideWinner(diceOrderPlayer1, diceOrderPlayer2);
    Player1Score = Number(Player1Score) + Number(diceOrderPlayer1);
    Player2Score = Number(Player2Score) + Number(diceOrderPlayer2);
    myOutputValue = `Player 1's hand: ${diceOrderPlayer1}<br><br> Player 2's hand: ${diceOrderPlayer2} <br><br> Congratulations, ${winner}`;
    gameMode = `new game`;
    console.log(gameMode);
  }
  // click submit to start a new game
  else if (input == "" && gameMode == `new game`) {
    diceResultPlayer1 = [];
    diceResultPlayer2 = [];
    if (Player1Score > Player2Score) {
      myOutputValue = `Player 1 is leading!<br><br>Player 1's score: ${Player1Score}<br><br> Player 2's score: ${Player2Score}<br><br>Click "submit" to begin a new game.`;
    } else if (Player1Score < Player2Score) {
      myOutputValue = `Player 2 is leading!<br><br>Player 1's score: ${Player1Score}<br><br> Player 2's score: ${Player2Score}<br><br>Click "submit" to begin a new game.`;
    }
    gameMode = `Player 1 rolls`;
  }
  return myOutputValue;
};
