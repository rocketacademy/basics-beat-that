//Start with a default mode
var currentMode = "Roll Dice";

//Set up an array for the dice rolls outcome
var diceArray = [];

//Array for player 1 at position 0, and player 2 at position 1
var playersFinalNumber = [];

//Random Dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//Mode 1, two dice rolls, added to array [roll1,roll2]
var modeOneDiceRolls = function () {
  diceArray = [diceRoll(), diceRoll()];
  return diceArray;
};

//Mode 2, ordering dice, return as string to combine them
var diceOrderd = function (firstDice) {
  if (firstDice == 1) {
    return String(diceArray[0]) + String(diceArray[1]);
  }
  if (firstDice == 2) {
    return String(diceArray[1]) + String(diceArray[0]);
  }
};

var main = function (input) {
  //Start with a counter to keep track of 2 players
  var playerHistory = 0;
  // 2 players will be 0 and 1 in counter
  while (playerHistory < 2) {
    if (currentMode == "Roll Dice") {
      //Add rolls to array
      diceArray = modeOneDiceRolls();
      //Switch to mode 2
      currentMode = "Choose Order";
      return `You rolled ${diceArray}. Please choose which dice to be the first. <br><br>Enter either 1 or 2!`;
    }
    if (currentMode == "Choose Order") {
      if (!(input == 1 || input == 2)) {
        return `Invalid! Please enter 1 or 2`;
      } else {
        // Add the ordered number to array position 0 (player1) and 1 (player2)
        playersFinalNumber.push(diceOrderd(input));
        playerHistory += 1;
        //Switch back to mode 1
        currentMode = "Roll Dice";
        if (playersFinalNumber.length < 2) {
          return `Player 1 got ${Number(
            playersFinalNumber[0]
          )}. Player 2, please press submit to start your roll!`;
        }
        if (playersFinalNumber.length == 2) {
          var player1 = Number(playersFinalNumber[0]);
          var player2 = Number(playersFinalNumber[1]);
          playerHistory = 0;
          playersFinalNumber = [];
          if (player1 > player2) {
            return `Player 1 wins with ${player1}, player 2 got ${player2}. <br><br>Player 1, please press submit to play again!`;
          }
          if (player2 > player1) {
            return `Player 2 wins with ${player2}, player 1 got ${player1}. <br><br>Player 1, please press submit to play again!`;
          } else {
            return `It's a draw. <br><br>Player 1, please press submit to play again!`;
          }
        }
      }
    }
  }
};
