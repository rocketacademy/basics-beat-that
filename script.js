// Create an array (needs to be global variable) to store the dice roll numbers
var diceRollArray = [];
// Create game mode (needs to be global variable) with default being unsequenced dice roll numbers
var gameMode = "unsequenced";
// Create an array (needs to be global variable) to store competing players' final sequenced numbers
var competingNumbers = [];

// Create a function for dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};
// Create a function to roll 2 dice
var rollTwoDice = function () {
  diceRollArray = [diceRoll(), diceRoll()];
  return diceRollArray;
};
// Create a function to sequence the 2 dice digits
var sequence = function (sequencePreference) {
  if (sequencePreference == 01) {
    return String(diceRollArray[0]) + String(diceRollArray[1]);
  }
  if (sequencePreference == 10) {
    return String(diceRollArray[1]) + String(diceRollArray[0]);
  }
};

var main = function (input) {
  // Change input to number format
  var inputNumeral = Number(input);

  // Loop dice roll and dice sequence codes for 2 players
  var playerCount = 0;
  while (playerCount < 2) {
    console.log("gameMode", gameMode);
    // Roll 2 random numbers
    if (gameMode == "unsequenced") {
      diceRollArray = rollTwoDice();
      console.log("diceRollArray", diceRollArray);
      // Then change game mode
      gameMode = "to be sequenced";
      return (
        `You rolled these numbers: ` +
        diceRollArray +
        `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around. (Remember, the bigger number wins!).`
      );
    }
    // Alter sequence of dice roll digits according to input
    if (gameMode == "to be sequenced") {
      // Error message if input is unrecognised
      if (!(inputNumeral == 01 || inputNumeral == 10)) {
        return (
          `Sorry, I do not understand. <br> <br> You rolled these numbers earlier: ` +
          diceRollArray +
          `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around. (Remember, the bigger number wins!).`
        );
      }
      // If input for sequencing of digits is valid
      else {
        console.log(`sequenced numerals` + sequence(inputNumeral));
        // Save final sequenced number
        competingNumbers.push(sequence(inputNumeral));
        console.log(`competing numbers: ${competingNumbers}`);
        playerCount += 1;
        // Then change game mode back
        gameMode = "unsequenced";

        // Output message based on whether the competing numbers array has collected 2 player's sequenced numbers:
        // If not yet collected 2 player's sequenced numbers...
        if (competingNumbers.length < 2) {
          return (
            `Player 1's final sequenced number is ` +
            sequence(inputNumeral) +
            `<br><br> It's player 2's turn to roll the dice now.`
          );
        }
        // If there are already 2 player's sequenced numbers stored...
        if (competingNumbers.length == 2) {
          // Generate the 2 numbers stored as separate variables
          var player1Number = Number(competingNumbers[0]);
          var player2Number = Number(competingNumbers[1]);
          // Reset everything
          playerCount = 0;
          competingNumbers = [];
          // Output winning/losing message
          if (player1Number > player2Number) {
            return `Player 1 won! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number}.`;
          }
          if (player2Number > player1Number) {
            return `Player 2 won! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number}.`;
          } else {
            return `Wow, it's a draw! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number} too!`;
          }
        }
      }
    }
  }
};
