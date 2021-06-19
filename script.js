//There are 2 players and players take turns.

var gameMode = "Roll Dice";
//Game Mode 1 is roll dice
//Game Mode 2 is dice order

var player1Dice = [];
var player2Dice = [];
var currentPlayer;

//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
var main = function (input) {
  if (gameMode == "Roll Dice") {
    currentPlayer = input;
    var dice1 = rollDice();
    var dice2 = rollDice();

    if (currentPlayer == 1) {
      player1Dice[(dice1, dice2)];
    } else {
      player2Dice[(dice1, dice2)];
    }
    console.log("dice 1:" + dice1);
    console.log("dice 2:" + dice2);

    gameMode = "Dice Order";

    myOutputValue =
      "player " +
      input +
      " rolled " +
      dice1 +
      " for Dice 1 and " +
      dice2 +
      " for Dice 2";
  } else {
    //Dice order mode
    diceOrder = input;
    if (diceOrder == 1) {
      console.log("nothing changed");
    } else {
      dice1 = player2Dice[0];
      dice2 = player2Dice[1];
      player1Dice = player1Dice[(dice2, dice1)];
    }
  }

  return myOutputValue;
};

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  gameMode = "";
  return diceNumber;
};

//The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
//"Choose the order of the dice."

//after both players have rolled and chosen dice order, the player with the higher combined number wins.

var chooseOrder = function (userOrder, dice1, dice2) {
  if (userOrder == 1) {
    result = [dice1, dice2];
  } else {
    result = [dice2, dice1];
  }
  return result;
};
