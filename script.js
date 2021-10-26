//global variables
var player1 = [];
var player2 = [];
var playerTurn = 1;
var player1Number = "";
var player2Number = "";

var main = function (input) {
  //Error message
  var myOutputValue = "Invalid Input";

  // change mode
  if (playerTurn == 1 && input == "2" && player2 == "") {
    playerTurn = 2;
    return "Player 2's Roll. Please roll your dice by pressing Submit";
  } else if (
    playerTurn == 2 &&
    input == "1" &&
    player1 == "" &&
    player2Number != ""
  ) {
    playerTurn = 1;
    return "Player 1's Rol1. Please roll your dice by pressing Submit";
  }

  //diceRoll for Player 1 if mode is at 1 and player has not rolled dices
  if (playerTurn == 1 && player1 == "") {
    player1.push(diceRoll());
    player1.push(diceRoll());
    return (
      "Player 1 rolled " +
      player1[0] +
      " for Dice 1 and " +
      player1[1] +
      " for Dice 2." +
      "<br> Please select which dice to go first in the number."
    );
    //diceRoll for Player 2 if mode is at 2 and player has not rolled dices
  } else if (playerTurn == 2 && player2 == "") {
    player2.push(diceRoll());
    player2.push(diceRoll());
    return (
      "Player 2 rolled " +
      player2[0] +
      " for Dice 1 and " +
      player2[1] +
      " for Dice 2." +
      "<br> Please select which dice to go first in the number."
    );
  }
  // player 1 select the order of their dice
  if (playerTurn == 1 && (player1 !== "") & (input == 1)) {
    player1Number = player1[0] + "" + player1[1];
    return (
      "Player 1 has chosen the number " +
      player1Number +
      "<br><br>If Player 2 has not selected their number, please submit 2 in the input box. <br><br> If both players have selected their numbers, press Submit to see the results!"
    );
  } else if (playerTurn == 1 && (player1 !== "") & (input == 2)) {
    player1Number = player1[0] + "" + player1[1];
    return (
      "Player 1 has chosen the number " +
      player1Number +
      "<br><br>If Player 2 has not selected their number, please submit 2 in the input box. <br><br> If both players have selected their numbers, press Submit to see the results!"
    );
  }

  // player 2 select the order of their dice
  if (playerTurn == 2 && (player2 !== "") & (input == 1)) {
    player2Number = player2[0] + "" + player2[1];
    return (
      "Player 2 has chosen the number " +
      player2Number +
      "<br><br>If Player 1 has not selected their number, please submit 1 in the input box. <br><br> If both players have selected their numbers, press Submit to see the results!"
    );
  } else if (playerTurn == 2 && (player1 !== "") & (input == 2)) {
    player2Number = player2[1] + "" + player2[0];
    return (
      "Player 2 has chosen the number " +
      player2Number +
      "<br><br>If Player 1 has not selected their number, please submit 1 in the input box. <br><br> If both players have selected their numbers, press Submit to see the results!"
    );
  }

  // compare numbers
  if (player1Number > player2Number) {
    var myOutputValue =
      "Player 1 wins with a number of " +
      player1Number +
      ". Player 2 had a number of " +
      player2Number;
  } else if (player2Number > player1Number) {
    var myOutputValue =
      "Player 2 wins with a number of " +
      player2Number +
      ". Player 1 had a number of " +
      player1Number;
  }

  return myOutputValue;
};

//diceRoll function
var diceRoll = function () {
  var randomDecimal = Math.random();
  var randomNumber = Math.floor(randomDecimal * 6);
  var randomNumberPlusOne = randomNumber + 1;
  return randomNumberPlusOne;
};
