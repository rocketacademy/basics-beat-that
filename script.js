// Global Variables
var dice_01 = 0;
var dice_02 = 0;
var gameMode = "";

// Dice Roll Function //
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = " ";
  var player1Score = 0;
  var player1Rolls = []; // Creating a container to store Player 1 rolls
  var player2Rolls = [];

  // Player 1's dice roll
  gameMode = "Player 1";
  if (gameMode == "Player 1") {
    dice_01 = rollDice();
    player1Rolls.push(dice_01);
    console.log(dice_01);
    dice_02 = rollDice();
    player1Rolls.push(dice_02);
    console.log(dice_02);
    console.log(player1Rolls);
    gameMode = "Player 1 Score";

    if (gameMode == "Player 1 Score") {
      myOutputValue =
        " Dice 1 is " +
        dice_01 +
        "<br> Dice 2 is " +
        dice_02 +
        "<br> <br> Please choose which dice you want to go first? 1 or 2";
      //Player 1 chooses which dice to go first
      if (input == "1") {
        player1Score = player1Rolls[0] + player1Rolls[1];
        myOutputValue = "Your score is " + player1Score;
      } else if (input == "2") {
        player1Score = player1Rolls[1] + player1Rolls[0];
        myOutputValue = "Your score is " + player1Score;
      }
    }
    return myOutputValue;
  }
};

// if ((gameMode = "Player 2")) {
//   dice_01 = rollDice();
//   console.log(dice_01);
//   dice_02 = rollDice();
//   console.log(dice_02);
// }
