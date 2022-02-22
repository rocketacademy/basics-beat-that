//Create the initial mode, "player 1" where the user sees the welcome message asking him to click on submit to roll the dice
//Change the mode to player 1
//Create a function that allows the computer to roll two dice, display the values and asks the user to pick which dice goes first
//Display the result of player 1's choice
//Change the mode to player 2
//The computer rolls two dice and displays the values and asks player 2 to pick which dice goes first
//Display the result of player 2's choice
//Determine who wins by comparing the 2 values; Display the results and state the winner

var gameMode = "player 1";
var myOutputValue = "";
var player1roll1 = 0;
var player1roll2 = 0;
var player1result = 0;
var player2roll1 = 0;
var player2roll2 = 0;
var player2result = 0;

var rollDice = function () {
  // Generate a decimal from 0 to 6, exclusive of 0.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 1 to 6 inclusive.
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  if (gameMode == "player 1") {
    if (input != "") {
      myOutputValue =
        "Please click on submit to roll your dice.";
    } else {
      player1roll1 = rollDice();
      player1roll2 = rollDice();
      myOutputValue =
        "🎲Welcome Player 1.🎲 " +
        "<br>" +
        "You rolled " +
        player1roll1 +
        " for Dice 1 and " +
        player1roll2 +
        " for Dice 2." +
        "<br>" +
        "Choose the order of the dice.";
      gameMode = "player 1 choice";
    }
  } else if (gameMode == "player 1 choice") {
    if (Number(input) != 1 && Number(input) != 2) {
      myOutputValue = "Please choose either 1 or 2.";
    } else if (Number(input) == 1) {
      player1result = player1roll1 * 10 + player1roll2;
      myOutputValue =
        "Player 1, you chose Dice 1 first." +
        "<br>" +
        "Your number is " +
        player1result +
        ".<br>" +
        "It is now Player 2's turn.";
      gameMode = "player 2";
    } else if (Number(input) == 2) {
      player1result = player1roll2 * 10 + player1roll1;
      myOutputValue =
        "Player 1, you chose Dice 2 first." +
        "<br>" +
        "Your number is " +
        player1result +
        ".<br>" +
        "It is now Player 2's turn.";
      gameMode = "player 2";
    }
  } else if (gameMode == "player 2") {
    player2roll1 = rollDice();
    player2roll2 = rollDice();
    myOutputValue =
      "🎲Welcome Player 2.🎲 " +
      "<br>" +
      "You rolled " +
      player2roll1 +
      " for Dice 1 and " +
      player2roll2 +
      " for Dice 2." +
      "<br>" +
      "Choose the order of the dice.";
    gameMode = "player 2 choice";
  } else if (gameMode == "player 2 choice") {
    if (input != "1" && input != "2") {
      myOutputValue = "Please choose either 1 or 2.";
    } else if (input == "1") {
      player2result = player2roll1 * 10 + player2roll2;
      myOutputValue =
        "Player 2, you chose Dice 1 first." +
        "<br>" +
        "Your number is " +
        player2result +
        ".";
      gameMode = "compare results";
    } else if (input == "2") {
      player2result = player2roll2 * 10 + player2roll1;
      myOutputValue =
        "Player 2, you chose Dice 2 first." +
        "<br>" +
        "Your number is " +
        player2result +
        ".";
      gameMode = "compare results";
    }
  } else if (gameMode == "compare results") {
    myOutputValue =
      "Player 1 scored " +
      player1result +
      " and Player 2 scored " +
      player2result +
      ".<br>";
    if (player1result > player2result) {
      myOutputValue += "Player 1 wins!";
    } else if (player1result < player2result) {
      myOutputValue += "Player 2 wins!";
    } else if ((player1result == player2result)) {
      myOutputValue += "It's a draw.";
    }
    gameMode = "player 1";
  }
  return myOutputValue;
};
