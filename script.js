// Declare global variables
var player1Dice = [];
var player2Dice = [];
var sum1 = 0;
var sum2 = 0;
var player1score = 0;
var player2score = 0;

var winner = " ";
var players = ["Player 1", "Player 2"];
var message = " ";
var gameStatus = "Player 1";
var numOfDice = 2;
var gameMode = "Waiting for Game Mode";

// Helper functions
function getDice() {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}

function compareDiceNum(num1, num2) {
  if (gameStatus == "Player 1") {
    if (num1 == num2) {
      sum1 = player1Dice[0] * 10 + player1Dice[1];
      message = `🎲 WELCOME, Player One 🎲
               <br> You rolled ${player1Dice[0]} for dice one and ${player1Dice[1]} for dice two.
               <br> Your number is ${sum1}
               <br> It's now Player 2's turn.`;
      gameStatus = "Player 2";
    } else {
      gameStatus = "Player 1: choose dice order";
      message = `🎲 WELCOME, Player One 🎲
               <br> You rolled ${player1Dice[0]} for dice one and ${player1Dice[1]} for dice two. 
               <br>Choose the order of the dice by entering "1" or "2"`;
    }
  } else if (gameStatus == "Player 2") {
    if (num1 == num2) {
      sum2 = player2Dice[0] * 10 + player2Dice[1];
      message = `🎲 WELCOME, Player Two 🎲
               <br> You rolled ${player2Dice[0]} for dice one and ${player2Dice[1]} for dice two.
               <br> Your number is ${sum2}
               <br> Press "Submit" to find out who's the winner.`;
      gameStatus = "result";
    } else {
      gameStatus = "Player 2: choose dice order";
      message = `🎲 WELCOME, Player Two 🎲
               <br> You rolled ${player2Dice[0]} for dice one and ${player2Dice[1]} for dice two. 
               <br>Choose the order of the dice by entering "1" or "2"`;
    }
  }
  return message;
}

function getDiceMessage(order) {
  if (gameStatus == "Player 1: choose dice order") {
    if (order == 1) {
      sum1 = player1Dice[0] * 10 + player1Dice[1];
      message = `🎲 PLAYER 1 🎲 <br>You chose Dice 1 first. Your number is ${sum1}. It's now Player 2's turn.`;
      gameStatus = "Player 2";
    } else if (order == 2) {
      sum1 = player1Dice[1] * 10 + player1Dice[0];
      message = `🎲 PLAYER 1 🎲 <br>You chose Dice 2 first. Your number is ${sum1}. <br> It's now Player 2's turn.`;
      gameStatus = "Player 2";
    } else {
      message = `You rolled ${player1Dice[0]} for dice one and ${player1Dice[1]} for dice two.Please enter 1 or 2.`;
    }
  } else if (gameStatus == "Player 2: choose dice order") {
    if (order == 1) {
      sum2 = player2Dice[0] * 10 + player2Dice[1];
      message = `🎲 PLAYER 2 🎲 <br>You chose Dice 1 first. Your number is ${sum2}. <br>Press "Submit" to find out who's the winner.`;
      gameStatus = "result";
    } else if (order == 2) {
      sum2 = player2Dice[1] * 10 + player2Dice[0];
      message = `🎲 PLAYER 2 🎲 <br>You chose Dice 2 first. Your number is ${sum2}. <br> Press "Submit" to find out who's the winner.`;
      gameStatus = "result";
    } else {
      message = ` <br> You rolled ${player2Dice[0]} for dice one and ${player2Dice[1]} for dice two. Please enter 1 or 2.`;
    }
  }
  return message;
}

function getWinnerMessage(player1score, player2score) {
  if (gameMode == "regular") {
    if (player1score > player2score) {
      winner = players[0];
      message = `${winner} is leading!🏆  <br> Player One: ${player1score} <br> Player Two: ${player2score} <br>Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    } else if (player2score > player1score) {
      winner = players[1];
      message = `${winner} is leading!🏆   <br> Player Two: ${player2score}<br> Player One: ${player1score} <br>Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    } else {
      message = `It's a draw. Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    }
    return message;
  } else if (gameMode == "reverse") {
    if (player1score < player2score) {
      winner = players[0];
      message = `${winner} is leading!🏆  <br> Player One: ${player1score} <br> Player Two: ${player2score} <br>Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    } else if (player2score < player1score) {
      winner = players[1];
      message = `${winner} is leading!🏆   <br> Player Two: ${player2score}<br> Player One: ${player1score} <br>Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    } else {
      message = `It's a draw. Press "Submit" to continue the game.`;
      gameStatus = "Player 1";
    }
    return message;
  }
}

function main(input) {
  if (gameMode == "Waiting for Game Mode") {
    if (input == "regular") {
      gameMode = "regular";
      message =
        "The chosen game mode is regular. The player with the highest combined number win the game.Please press submit to start.";
    } else if (input == "reverse") {
      gameMode = "reverse";
      message =
        "The chosen game mode is reverse. The player with the lowest combined number win the game.Please press submit to start.";
    } else {
      message = "There are only 2 game modes. Please enter regular or reverse.";
    }
    return message;
  } else if (gameMode == "regular") {
    if (gameStatus == "Player 1") {
      player1Dice = [];
      for (var i = 0; i < numOfDice; i++) {
        player1Dice.push(getDice());
      }
      message = compareDiceNum(player1Dice[0], player1Dice[1]);

      return message;
    } else if (gameStatus == "Player 1: choose dice order") {
      var order = input;
      message = getDiceMessage(order);
      return message;
    }

    if (gameStatus == "Player 2") {
      player2Dice = [];
      for (var i = 0; i < numOfDice; i++) {
        player2Dice.push(getDice());
      }
      message = compareDiceNum(player2Dice[0], player2Dice[1]);

      return message;
    } else if (gameStatus == "Player 2: choose dice order") {
      var order = input;
      message = getDiceMessage(order);
      return message;
    }

    while (gameStatus == "result") {
      player1score += sum1;
      player2score += sum2;
      message = getWinnerMessage(player1score, player2score);
      return message;
    }
  } else if (gameMode == "reverse") {
    if (gameStatus == "Player 1") {
      player1Dice = [];
      for (var i = 0; i < numOfDice; i++) {
        player1Dice.push(getDice());
      }
      message = compareDiceNum(player1Dice[0], player1Dice[1]);

      return message;
    } else if (gameStatus == "Player 1: choose dice order") {
      var order = input;
      message = getDiceMessage(order);
      return message;
    }

    if (gameStatus == "Player 2") {
      player2Dice = [];
      for (var i = 0; i < numOfDice; i++) {
        player2Dice.push(getDice());
      }
      message = compareDiceNum(player2Dice[0], player2Dice[1]);

      return message;
    } else if (gameStatus == "Player 2: choose dice order") {
      var order = input;
      message = getDiceMessage(order);
      return message;
    }

    while (gameStatus == "result") {
      player1score += sum1;
      player2score += sum2;
      message = getWinnerMessage(player1score, player2score);
      return message;
    }
  }
}
