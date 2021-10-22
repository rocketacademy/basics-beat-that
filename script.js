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

var p1dice1 = 0;
var p1dice2 = 0;
var p2dice1 = 0;
var p2dice2 = 0;

console.log("P1 Dice 1: ", p1dice1);
console.log("P1 Dice 2: ", p1dice2);
console.log("P2 Dice 1: ", p2dice1);
console.log("P2 Dice 2: ", p2dice2);

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
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      p1dice1 = rollDice().toString();
      p1dice2 = rollDice().toString();

      console.log("P1 Dice 1: ", p1dice1);
      console.log("P1 Dice 2: ", p1dice2);

      myOutputValue = `
      Hi ${player}, you rolled ${p1dice1} and ${p1dice2}.<br><br>
      The next step is to combine the numbers. Choose which number you'd like as your first digit: enter "1" for ${p1dice1} and "2" for ${p1dice2}.
      `;
      gameStatus = "Combined number created";
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      if (input == 1) {
        console.log(p1dice1);
        p1CombinedNumber = p1dice1 + p1dice2;
        myOutputValue = `
        Your combined number is ${p1CombinedNumber}.<br><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;
      } else {
        p1CombinedNumber = p1dice2 + p1dice1;
        myOutputValue = `
        Your combined number is ${p1CombinedNumber}.<br><br>
        Player 2, it's now your turn. Hit submit to roll your two numbers.
        `;
      }
      player = "Player 2";
      gameStatus = "Waiting to roll dice";
      console.log(player, gameStatus);
      return myOutputValue;
    }
  }

  // for Player 2
  if (player == "Player 2") {
    // Part 1: roll the dice
    if (gameStatus == "Waiting to roll dice") {
      p2dice1 = rollDice().toString();
      p2dice2 = rollDice().toString();

      console.log("P2 Dice 1: ", p2dice1);
      console.log("P2 Dice 2: ", p2dice2);

      myOutputValue = `
      Hi ${player}, you rolled ${p2dice1} and ${p2dice2}.<br><br>
      The next step is to combine the numbers. Choose which number you'd like as your first digit: enter "1" for ${p2dice1} and "2" for ${p2dice2}.
      `;
      gameStatus = "Combined number created";
      return myOutputValue;
    }
    // Part 2: combine the numbers
    else {
      if (input == 1) {
        console.log(p2dice1);
        p2CombinedNumber = p2dice1 + p2dice2;
        myOutputValue = `
        Your combined number is ${p2CombinedNumber}.<br><br>
               `;
      } else {
        p2CombinedNumber = p2dice2 + p2dice1;
        myOutputValue = `
        Your combined number is ${p2CombinedNumber}.<br><br>
        `;
      }

      // Determining the winner: compare both combined numbers
      if (p1CombinedNumber > p2CombinedNumber) {
        myOutputValue += `<hr>
        Player 1's combined number is ${p1CombinedNumber}.<br><br>
        Player 2's combined number is ${p2CombinedNumber}.<br><br>
        Player 1 wins!<br><br>
        Hit submit to play again!
        `;
      } else {
        myOutputValue += `<hr>
        Player 1's combined number is ${p1CombinedNumber}.<br><br>
        Player 2's combined number is ${p2CombinedNumber}.<br><br>
        Player 2 wins! <br><br>

        Hit submit to play again!
        `;
      }

      player = "Player 1";
      gameStatus = "Waiting to roll dice";
      console.log(player, gameStatus);
      return myOutputValue;
    }
  }
};
