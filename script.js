var player = "";
var player1_roll = [];
var player2_roll = [];
var myOutputValue = "";
var reset = false;
var player1 = 0;
var player2 = 0;

var main = function (input) {
  if (player == "") {
    player = 1;
    player1_roll.push(diceRoll(), diceRoll());
    myOutputValue =
      "Welcome Player " +
      player +
      ". " +
      "<br>" +
      "You rolled " +
      player1_roll[0] +
      " for Dice 1 and " +
      player1_roll[1] +
      " for Dice 2." +
      "<br>" +
      "Choose the order of the dice.";
  } else if (player == 1) {
    if (input == "" || !input.match(/^[0-9]+$/) || !input.match(/^12|21+$/)) {
      player1_roll = player1_roll.join("");
      myOutputValue =
        "Player " +
        player +
        ", you chose the default option." +
        "<br>" +
        "Your number is " +
        player1_roll +
        "." +
        "<br>" +
        "It is now Player 2's turn.";
      player = 2;
    } else if (input == "12") {
      player1_roll = player1_roll.join("");
      myOutputValue =
        "Player " +
        player +
        ", you chose Dice 1 first." +
        "<br>" +
        "Your number is " +
        player1_roll +
        "." +
        "<br>" +
        "It is now Player 2's turn.";
      player = 2;
    } else if (input == "21") {
      player1_roll = player1_roll[1].toString() + player1_roll[0].toString();
      myOutputValue =
        "Player " +
        player +
        ", you chose Dice 2 first." +
        "<br>" +
        "Your number is " +
        player1_roll +
        "." +
        "<br>" +
        "It is now Player 2's turn.";
      player = 2;
    }
  } else if (player == 2 && player2_roll.length == 0) {
    player2_roll.push(diceRoll(), diceRoll());
    myOutputValue =
      "Welcome Player " +
      player +
      ". " +
      "<br>" +
      "You rolled " +
      player2_roll[0] +
      " for Dice 1 and " +
      player2_roll[1] +
      " for Dice 2." +
      "<br>" +
      "Choose the order of the dice.";
  } else if (
    player == 2 &&
    player2_roll.length != 0 &&
    Array.isArray(player2_roll)
  ) {
    if (input == "" || !input.match(/^[0-9]+$/) || !input.match(/^12|21+$/)) {
      player2_roll = player2_roll.join("");
      myOutputValue =
        "Player " +
        player +
        ", you chose the default option." +
        "<br>" +
        "Your number is " +
        player2_roll +
        "." +
        "<br>" +
        "Press submit to show who is the winner!";
    } else if (input == "12") {
      player2_roll = player2_roll.join("");
      myOutputValue =
        "Player " +
        player +
        ", you chose Dice 1 first." +
        "<br>" +
        "Your number is " +
        player2_roll +
        "." +
        "<br>" +
        "Press submit to show who is the winner!";
    } else if (input == "21") {
      player2_roll = player2_roll[1].toString() + player2_roll[0].toString();
      myOutputValue =
        "Player " +
        player +
        ", you chose Dice 2 first." +
        "<br>" +
        "Your number is " +
        player2_roll +
        "." +
        "<br>" +
        "Press submit to show who is the winner!";
    }
  } else if (player == 2 && !Array.isArray(player2_roll) && reset == false) {
    if (player1_roll > player2_roll) {
      player1 += 1;
      myOutputValue =
        "Player 1 win!" +
        "<br><br>" +
        "Leaderboard: " +
        "<br>" +
        (player1 > player2
          ? "Player1: " + player1 + "<br>" + "Player2: " + player2
          : player2 > player1
          ? "Player2: " + player2 + "<br>" + "Player1: " + player1
          : "Player1: " + player1 + "<br>" + "Player2: " + player2) +
        "<br><br>" +
        "Press submit to continue.";
      reset = true;
    } else if (player1_roll == player2_roll) {
      myOutputValue =
        "It is a draw!" +
        "<br><br>" +
        "Leaderboard: " +
        "<br>" +
        (player1 > player2
          ? "Player1: " + player1 + "<br>" + "Player2: " + player2
          : player2 > player1
          ? "Player2: " + player2 + "<br>" + "Player1: " + player1
          : "Player1: " + player1 + "<br>" + "Player2: " + player2) +
        "<br><br>" +
        "Press submit to continue.";
      reset = true;
    } else {
      player2 += 1;
      myOutputValue =
        "Player 2 win!" +
        "<br><br>" +
        "Leaderboard: " +
        "<br>" +
        (player1 > player2
          ? "Player1: " + player1 + "<br>" + "Player2: " + player2
          : player2 > player1
          ? "Player2: " + player2 + "<br>" + "Player1: " + player1
          : "Player1: " + player1 + "<br>" + "Player2: " + player2) +
        "<br><br>" +
        "Press submit to continue.";
      reset = true;
    }
  } else if (reset) {
    player = "";
    player1_roll = [];
    player2_roll = [];
    myOutputValue = "Welcome to the Dice Game! <br> It is Player 1 turn now. <br> Please submit to play.";
    reset = false;
  }
  return myOutputValue;
};

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
