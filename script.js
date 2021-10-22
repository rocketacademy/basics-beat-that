// ****** How the game works ******
//
// Number of players: 2
//
// ---- Player 1 Gameplay ----
// Player 1 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
// Change to Player 2 and repeat (process)
//
// ---- Player 2 Gameplay ----
// Player 2 clicks Submit (first input == '')
// Roll 2 dice (process)
// Show the numbers rolled (output)
// Player picks which dice to go first (input == 1 || 2)
// Concatenate the numbers (process)
// Show the combined number (output)
//
// Compare the two numbers (process)
// Show the winner with the higher combined number (output)
//
// *******************************

// ****** Global Variables ******
var gameStatus = "Waiting to roll dice";
var player = "Player 1";

var dice1 = 0;
var dice2 = 0;

console.log("Dice 1: ", dice1);
console.log("Dice 2: ", dice2);

var p1CombinedNumber = 0;
var p2CombinedNumber = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "";

  // for Player 1
  if (player == "Player 1") {
    if (gameStatus == "Waiting to roll dice") {
      dice1 = rollDice().toString();
      dice2 = rollDice().toString();

      console.log("Dice 1: ", dice1);
      console.log("Dice 2: ", dice2);

      myOutputValue = `
      Hi Player 1, you rolled ${dice1} and ${dice2}.<br><br>
      The next step is to combine the numbers. Choose which number you'd like as your first digit: enter "1" for ${dice1} and "2" for ${dice2}.
      `;
      gameStatus = "Combined number created";
      return myOutputValue;
    } else {
      if (input == 1) {
        console.log(dice1);
        p1CombinedNumber = dice1 + dice2;
        myOutputValue = `
        Your combined number is ${p1CombinedNumber}.<br><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;
      } else {
        p1CombinedNumber = dice2 + dice1;
        myOutputValue = `
        Your combined number is ${p1CombinedNumber}.<br><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;
      }
    }
  }

  return myOutputValue;
};
