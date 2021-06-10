// Two players take turns to roll 2 dice, and then decides the order to concatenate the two dice rolls
// (e.g. If the two dice rolls 2 and 5,  The user will decide 25 or 52). The player with the higher combined number wins.

var diceRoll = function () {
  var randomDecimal = Math.random();
  var diceNumber = Math.floor(randomDecimal * 6) + 1;
  return diceNumber;
};

console.log(diceRoll());

var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var player1DiceOrder = 0;
var player2DiceOrder = 0;
var player1CombinedNumber = "";
var player2CombinedNumber = "";

var main = function (input) {
  // Player 1 rolls two dice. Values of both dice rolls goes into a variable each
  if (player1Dice1 == 0) {
    player1CombinedNumber = "";
    player2CombinedNumber = "";
    player1Dice1 = diceRoll();
    player1Dice2 = diceRoll();
    return (
      "Player 1<br><br>" +
      "Dice 1: " +
      player1Dice1 +
      "<br>" +
      "Dice 2: " +
      player1Dice2 +
      '<br>Choose which dice to go first, "1" or "2"'
    );
  }
  if (player2Dice1 == 0) {
    // If player 1 has not selected his dice to go first, get him to choose which dice to go first
    while (player1DiceOrder != 1 && player1DiceOrder != 2) {
      player1DiceOrder = input;
      // Create player 1's combined number
      if (player1DiceOrder == 1) {
        player1CombinedNumber = "" + player1Dice1 + player1Dice2;
        return (
          "Player 1, your combined dice number is " +
          player1CombinedNumber +
          "<br>Player 2, your turn to roll your two dice. Click submit!"
        );
      }
      if (player1DiceOrder == 2) {
        player1CombinedNumber = "" + player1Dice2 + player1Dice1;
        return (
          "Player 1, your combined dice number is " +
          player1CombinedNumber +
          "<br>Player 2, your turn to roll your two dice. Click submit!"
        );
      }
      if (player1DiceOrder != 1 && player1DiceOrder != 2) {
        return 'Player 1, choose a valid dice to go first, "1" or "2"';
      }
    }
    // If player 2 hasnt' rolled yet, player 2 rolls two dice. Values of both dice goes into a variable each
  }
  if (player2Dice1 == 0) {
    player2Dice1 = diceRoll();
    player2Dice2 = diceRoll();
    return (
      "Player 2<br><br>" +
      "Dice 1: " +
      player2Dice1 +
      "<br>" +
      "Dice 2: " +
      player2Dice2 +
      '<br>Choose which dice to go first, "1" or "2"'
    );
  }

  // If player 2 has not selected his dice to go first, get him to choose which dice to go first
  while (player2DiceOrder != 1 && player2DiceOrder != 2) {
    player2DiceOrder = input;
    // Create player 2's combined number
    if (player2DiceOrder == 1) {
      player2CombinedNumber = "" + player2Dice1 + player2Dice2;
    }
    if (player2DiceOrder == 2) {
      player2CombinedNumber = "" + player2Dice2 + player2Dice1;
    }
    if (player2DiceOrder != 2 && player2DiceOrder != 1) {
      return 'Player 2, choose a valid dice to go first, "1" or "2"';
    }
  }
  if (Number(player2CombinedNumber) > Number(player1CombinedNumber)) {
    player1Dice1 = 0;
    player1Dice2 = 0;
    player2Dice1 = 0;
    player2Dice2 = 0;
    player1DiceOrder = 0;
    player2DiceOrder = 0;
    return (
      "Player 1: " +
      player1CombinedNumber +
      "<br>Player 2: " +
      player2CombinedNumber +
      "<br><br>Player 2 wins!<br><br>Click submit for the next player 1 to roll the dice for a new game"
    );
  }
  if (Number(player1CombinedNumber) > Number(player2CombinedNumber)) {
    player1Dice1 = 0;
    player1Dice2 = 0;
    player2Dice1 = 0;
    player2Dice2 = 0;
    player1DiceOrder = 0;
    player2DiceOrder = 0;
    return (
      "Player 1: " +
      player1CombinedNumber +
      "<br>Player 2: " +
      player2CombinedNumber +
      "<br><br>Player 1 wins!<br><br>Click submit for the next player 1 to roll the dice for a new game"
    );
  }

  return;
};
