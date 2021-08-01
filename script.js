//There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// // Global Variables
var p1_turn = true; // Sets the default to Player 1's turn
var gameMode = "Initial_Gameplay";

// Dice Roll Function //
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Getting new dice rolls for each player
var getDicerolls = function () {
  var newDicerolls = [rollDice(), rollDice()];
  return newDicerolls;
};

var main = function (input) {
  var myOutputValue = "";

  // Player 1's Turn
  if (p1_turn == true) {
    var player1Array = getDicerolls();
    console.log(player1Array);

    // Getting Player 1's Dice Rolls
    var p1_gameMode = "P1 Rolls";

    p1_gameMode == "P1 Rolls";
    myOutputValue =
      "Hello Player 1, <br> Dice 1 is " +
      player1Array[0] +
      "<br> Dice 2 is " +
      player1Array[1] +
      "<br> <br> Please choose which dice you want to go first? 1 or 2";

    // Letting P1 choose which dice to go first
    p1_gameMode = "P1 Roll Sequence";
    var p1_finalScore = 0;
    if (gameMode == "P1 Roll Sequence") {
      if (input == "1") {
        myOutputValue = `Your score is ${player1Array[0]}${player1Array[1]}`; // Converts to a string
        p1_finalScore = player1Array[0] * 10 + player1Array[1];
      } else if (input == "2") {
        myOutputValue = `Your score is ${player1Array[1]}${player1Array[0]}`;
        p1_finalScore = player1Array[1] * 10 + player1Array[0];
      }
      console.log("P1 " + p1_finalScore);
      p1_gameMode = "P1 turn ends";
    }
    p1_turn = false; //Ends player 1 turn
  }

  // Player 2's Turn starts here
  else if (p1_turn != true) {
    var player2Array = getDicerolls();
    console.log("Player 2 " + player2Array);

    // Getting Player 2's Dice Rolls
    var p2_gameMode = "P2 Rolls";
    myOutputValue =
      "Hello Player 2, <br><br> Dice 1 is " +
      player2Array[0] +
      "<br> Dice 2 is " +
      player2Array[1] +
      "<br> <br> Please choose which dice you want to go first? 1 or 2";
    p2_gameMode = "P2 Roll Sequence";
    var p2_finalScore = 0;

    while (p2_gameMode == "P2 Roll Sequence") {
      if (input == "1") {
        myOutputValue = `Your score is ${player2Array[0]}${player2Array[1]}`; // Converts to a string
        p2_finalScore = player2Array[0] * 10 + player2Array[1];
      } else if (input == "2") {
        myOutputValue = `Your score is ${player2Array[1]}${player2Array[0]}`;
      }
      console.log("P2 " + p2_finalScore);
      p2_gameMode = "P2 turn ends";
    }
    p1_turn = true; // Ends Player 2 turn
  }

  return myOutputValue;
};
