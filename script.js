var rollDice = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6 + 1);
  return randomDiceNumber;
};
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var player1Score = 0;
var player2Score = 0;
var gameMode = "start";

var main = function (input) {
  if (gameMode == "start") {
    var myOutputValue = ` Game involves 2 players. player 1 will go first.
  Rules of the game: click start to initiate the roll of 2 dice. Then choose your first number from the random roll of the 2 dice to form a 2 digit number. player with the highest value will win. Click submit to continue.`;
    gameMode = "player1roll";
    return myOutputValue;
  }
  if (gameMode == "player1roll") {
    player1Dice1 = rollDice();
    player1Dice2 = rollDice();
    var myOutputValue = `Welcome Player 1. <br>You rolled ${player1Dice1} for Dice 1 and ${player1Dice2} for Dice 2. <br>Choose the order of your dice by keying in the number of the dice you want to be the first.`;
    gameMode = "player1ToChoose";
    return myOutputValue;
  }
  if (gameMode == "player1ToChoose") {
    if (Number(input) !== player1Dice1 && Number(input) !== player1Dice2) {
      var myOutputValue = `Please key in a valid number that you rolled. Either ${player1Dice1} or ${player1Dice2}.`;
      return myOutputValue;
    }
    if (Number(input) == player1Dice1) {
      var myOutputValue = `Player 1, you chose Dice 1 first.
Your number is ${
        player1Dice1.toString() + player1Dice2.toString()
      }. <br>It is now Player 2's turn. Click submit to continue.`;
      player1Score = Number(player1Dice1.toString() + player1Dice2.toString());
      console.log(player1Score);
      gameMode = "player2roll";
      return myOutputValue;
    }
    if (Number(input) == player1Dice2) {
      var myOutputValue = `Player 1, you chose Dice 2 first.
Your number is ${
        player1Dice2.toString() + player1Dice1.toString()
      }. <br>It is now Player 2's turn. Click submit to continue.`;
      player1Score = Number(player1Dice2.toString() + player1Dice1.toString());
      console.log(player1Score);
      gameMode = "player2roll";
      return myOutputValue;
    }
  }
  if (gameMode == "player2roll") {
    player2Dice1 = rollDice();
    player2Dice2 = rollDice();
    var myOutputValue = `Welcome Player 2. <br>You rolled ${player2Dice1} for Dice 1 and ${player2Dice2} for Dice 2. <br>Choose the order of your dice by keying in the number of the dice you want to be first.`;
    gameMode = "player2ToChoose";
    return myOutputValue;
  }
  if (gameMode == "player2ToChoose") {
    if (Number(input) !== player2Dice1 && Number(input) !== player2Dice2) {
      var myOutputValue = `Please key in a valid number that you rolled. Either ${player2Dice1} or ${player2Dice2}.`;
      return myOutputValue;
    }
    if (Number(input) == player2Dice1) {
      var myOutputValue = `Player 2, you chose Dice 1 first.
Your number is ${player2Dice1.toString() + player2Dice2.toString()}. `;
      player2Score = Number(player2Dice1.toString() + player2Dice2.toString());
      console.log(player1Score);
      console.log(player2Score);
      if (player2Score > player1Score) {
        var statement = `Since Player 1 Number is ${player1Score}, Player 2 wins. `;
      }
      if (player1Score > player2Score) {
        var statement = `Since Player 1 Number is ${player1Score}, Player 1 wins. `;
      }
      if (player1Score == player2Score) {
        var statement = `Since Player 1 Number is ${player1Score}, It's a draw. `;
      }
      gameMode = "start";
      return myOutputValue + statement;
    }
    if (Number(input) == player2Dice2) {
      var myOutputValue = `Player 2, you chose Dice 2 first.
Your number is ${player2Dice2.toString() + player2Dice1.toString()}. `;
      player2Score = Number(player2Dice2.toString() + player2Dice1.toString());
      console.log(player1Score);
      console.log(player2Score);
      if (player2Score > player1Score) {
        var statement = `Since Player 1 Number is ${player1Score}, Player 2 wins. `;
      }
      if (player1Score > player2Score) {
        var statement = `Since Player 1 Number is ${player1Score}, Player 1 wins. `;
      }
      if (player1Score == player2Score) {
        var statement = `Since Player 1 Number is ${player1Score}, It's a draw. `;
      }
      gameMode = "start";
      return (
        myOutputValue +
        statement +
        `To restart the game, click submit to continue.`
      );
    }
  }
};
