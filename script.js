var gameMode = "player1";

var randomDigit = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};
var randomDigit1 = 0;
var randomDigit2 = 0;
var player1Score = 0;
var player2Score = 0;
var currentPlayer = "player1A";

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "player1") {
    randomDigit1 = randomDigit();
    randomDigit2 = randomDigit();
    myOutputValue = `Player 1 🧍, your Dice 1 🎲 is ${randomDigit1} and <br> Dice 2 🎲is ${randomDigit2}. <br><br> Please indicate either '1' or '2' to choose the order of your dice.<br><br> User with the highest number will win. Good luck!`;
    gameMode = "chooseDiceOrder";
    return myOutputValue;
  }
  if (gameMode == "chooseDiceOrder") {
    if (currentPlayer == "player1A") {
      if (input == "1") {
        player1Score = `${randomDigit1}${randomDigit2}`;
        console.log("player 1 score", player1Score);
        myOutputValue = `You have chosen Dice 1 🎲 and your number is ${randomDigit1}${randomDigit2}.`;
      } else if (input == "2") {
        myOutputValue = `You have chosen Dice 2 🎲 and your number is ${randomDigit2}${randomDigit1}.`;
      }
      gameMode = "player2";
      currentPlayer = "player2A";
    } else if (currentPlayer == "player2A") {
      if (input == "1") {
        player2Score = `${randomDigit1}${randomDigit2}`;
        console.log("player 2 score", player2Score);
        myOutputValue = `You have chosen Dice 1 🎲 and your number is ${randomDigit1}${randomDigit2}.`;
      } else if (input == "2") {
        myOutputValue = `You have chosen Dice 2 🎲 and your number is ${randomDigit2}${randomDigit1}.`;
      }
      gameMode = "determineWinner";
    }
    return myOutputValue;
  }
  if (gameMode == "player2") {
    randomDigit1 = randomDigit();
    randomDigit2 = randomDigit();
    myOutputValue = `Player 2 🧍, your Dice 1 🎲 is ${randomDigit1} and Dice 2 🎲 is ${randomDigit2}. <br><br> Please indicate either '1' or '2' to choose the order of your dice.<br><br> User with the highest number will win. Good luck!`;
    gameMode = "chooseDiceOrder";
    return myOutputValue;
  }
  if (gameMode == "determineWinner") {
    if (player1Score > player2Score) {
      myOutputValue = `Player 1, your score is ${player1Score} and <br><br>Player 2, your score is ${player2Score}. <br><br> Player 1, you win! 🎉🎉🎉`;
    } else if (player1Score < player2Score) {
      myOutputValue = `Player 1, your score is ${player1Score} and Player 2, your score is ${player2Score}. <br><br>Player 2, you win! 🎉🎉🎉`;
    }
    return myOutputValue;
  }
};
