var diceResult;
var mode = "Player 1 Roll";
var roll1;
var roll2;
var player1Result;
var player2Result;
var compareResult;
var player1Score = 0;
var player2Score = 0;
var player1Record = [];
var player2Record = [];

var rollDice = function () {
  diceResult = Math.floor(Math.random() * 6) + 1;
  return diceResult;
};

var main = function (input) {
  console.log("Player 1 and 2 scores: ", player1Score, player2Score);

  if (mode == "Player 1 Roll") {
    roll1 = rollDice();
    roll2 = rollDice();
    console.log("Player 1 rolls are: ", roll1, roll2);
    var myOutputValue = `Welcome Player 1. <br>Die 1 is ${roll1} and Die 2 is ${roll2}.<br>
  Please enter 1 or 2 to choose which number goes first.`;
    mode = "Player 1 Choose";
    return myOutputValue;
  }

  if (mode == "Player 1 Choose") {
    if (input == 1) {
      player1Result = roll1 * 10 + roll2;
    }
    if (input == 2) {
      player1Result = roll2 * 10 + roll1;
    }
    player1Record.push(player1Result);
    console.log("Player 1 generated: ", player1Result);
    var myOutputValue = `Player 1's generated number is ${player1Result}.<br>
    It is Player 2's turn to roll the dice. Please press the button.`;
    mode = "Player 2 Roll";
    return myOutputValue;
  }

  if (mode == "Player 2 Roll") {
    roll1 = rollDice();
    roll2 = rollDice();
    console.log("Player 2 rolls are: ", roll1, roll2);
    var myOutputValue = `Welcome Player 2. <br>Die 1 is ${roll1} and Die 2 is ${roll2}.<br>
  Please enter 1 or 2 to choose which number goes first.`;
    mode = "Player 2 Choose";
    return myOutputValue;
  }

  if (mode == "Player 2 Choose") {
    if (input == 1) {
      player2Result = roll1 * 10 + roll2;
    }
    if (input == 2) {
      player2Result = roll2 * 10 + roll1;
    }

    player2Record.push(player2Result);

    console.log("Player 2 generated: ", player2Result);

    if (player1Result > player2Result) {
      player1Score += 1;
      compareResult = "Player 1 wins!";
    }

    if (player1Result < player2Result) {
      player2Score += 1;
      compareResult = "Player 2 wins!";
    }

    if (player1Result == player2Result) {
      compareResult = "It's a tie!";
    }

    console.log("Player 1 and 2 scores: ", player1Score, player2Score);

    var myOutputValue = `Player 2's generated number is ${player2Result}, versus Player 1's ${player1Result}.<br>
    ${compareResult}<br><br>
    Player 1 has won ${player1Score} times and Player 2 has won ${player2Score} times.<br><br>
    Player 1 generated numbers: ${player1Record}.<br>
    Player 2 generated numbers: ${player2Record}.<br><br>

    Please press the button to play again.`;
    mode = "Player 1 Roll";

    return myOutputValue;
  }
};
