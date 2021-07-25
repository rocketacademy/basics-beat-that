// // ======================= BASE ===========================

// // Create an array (needs to be global variable) to store the dice roll numbers
// var diceRollArray = [];
// // Create game mode (needs to be global variable) with default being unsequenced dice roll numbers
// var gameMode = "unsequenced";
// // Create an array (needs to be global variable) to store competing players' final sequenced numbers
// var competingNumbers = [];

// // Create a function for dice roll
// var diceRoll = function () {
//   return Math.floor(Math.random() * 6) + 1;
// };
// // Create a function to roll 2 dice
// var rollTwoDice = function () {
//   diceRollArray = [diceRoll(), diceRoll()];
//   return diceRollArray;
// };
// // Create a function to sequence the 2 dice digits
// var sequence = function (sequencePreference) {
//   if (sequencePreference == 01) {
//     return String(diceRollArray[0]) + String(diceRollArray[1]);
//   }
//   if (sequencePreference == 10) {
//     return String(diceRollArray[1]) + String(diceRollArray[0]);
//   }
// };

// var main = function (input) {
//   // Change input to number format
//   var inputNumeral = Number(input);

//   // Loop dice roll and dice sequence codes for 2 players
//   var playerCount = 0;
//   while (playerCount < 2) {
//     console.log("gameMode", gameMode);
//     // Roll 2 random numbers
//     if (gameMode == "unsequenced") {
//       diceRollArray = rollTwoDice();
//       console.log("diceRollArray", diceRollArray);
//       // Then change game mode
//       gameMode = "to be sequenced";
//       return (
//         `You rolled these numbers: ` +
//         diceRollArray +
//         `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around. (Remember, the bigger number wins!).`
//       );
//     }
//     // Alter sequence of dice roll digits according to input
//     if (gameMode == "to be sequenced") {
//       // Error message if input is unrecognised
//       if (!(inputNumeral == 01 || inputNumeral == 10)) {
//         return (
//           `Sorry, I do not understand. <br> <br> You rolled these numbers earlier: ` +
//           diceRollArray +
//           `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around. (Remember, the bigger number wins!).`
//         );
//       }
//       // If input for sequencing of digits is valid
//       else {
//         console.log(`sequenced numerals` + sequence(inputNumeral));
//         // Save final sequenced number
//         competingNumbers.push(sequence(inputNumeral));
//         console.log(`competing numbers: ${competingNumbers}`);
//         playerCount += 1;
//         // Then change game mode back
//         gameMode = "unsequenced";

//         // Output message based on whether the competing numbers array has collected 2 player's sequenced numbers:
//         // If not yet collected 2 player's sequenced numbers...
//         if (competingNumbers.length < 2) {
//           return (
//             `Player 1's final sequenced number is ` +
//             sequence(inputNumeral) +
//             `<br><br> It's player 2's turn to roll the dice now.`
//           );
//         }
//         // If there are already 2 player's sequenced numbers stored...
//         if (competingNumbers.length == 2) {
//           // Generate the 2 numbers stored as separate variables
//           var player1Number = Number(competingNumbers[0]);
//           var player2Number = Number(competingNumbers[1]);
//           // Reset everything
//           playerCount = 0;
//           competingNumbers = [];
//           // Output winning/losing message
//           if (player1Number > player2Number) {
//             return `Player 1 won! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number}.`;
//           }
//           if (player2Number > player1Number) {
//             return `Player 2 won! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number}.`;
//           } else {
//             return `Wow, it's a draw! <br> <br> Player 1's number was ${player1Number} and player 2's number was ${player2Number} too!`;
//           }
//         }
//       }
//     }
//   }
// };

// ======================= MORE COMFORTABLE (SCORE + LEADERBOARD) ===========================

// Create an array (needs to be global variable) to store the dice roll numbers
var diceRollArray = [];
// Create game mode (needs to be global variable) with default being unsequenced dice roll numbers
var gameMode = "unsequenced";
// Create game mode (needs to be global variable) with default being normal (i.e. highest score wins)
var resultMode = "normal";
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
  // Change result mode according to input on reversed/normal game
  if (input.toLowerCase() == `reversed`) {
    resultMode = `reversed`;
    // Reset Array
    competingNumbers = [];
    return "You are now in reversed mode where the smaller number wins! <br> <br> Player 1 please click the submit button to start the game.";
  }
  if (input.toLowerCase() == `normal`) {
    resultMode = `normal`;
    // Reset Array
    competingNumbers = [];
    return "You are now in normal mode where the bigger number wins! <br> <br> Player 1 please click the submit button to start the game.";
  }

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
        `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around.`
      );
    }
    // Alter sequence of dice roll digits according to input
    if (gameMode == "to be sequenced") {
      // Error message if input is unrecognised
      if (!(inputNumeral == 01 || inputNumeral == 10)) {
        return (
          `Sorry, I do not understand. <br> <br> You rolled these numbers earlier: ` +
          diceRollArray +
          `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around.`
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

        // Create an array to store player 1's numbers
        var player1 = [];
        counterPlayer1 = 0;
        while (counterPlayer1 < competingNumbers.length) {
          player1.push(competingNumbers[counterPlayer1]);
          counterPlayer1 = counterPlayer1 + 2;
        }
        // Create an array to store player 2's numbers
        var player2 = [];
        counterPlayer2 = 1;
        while (counterPlayer2 < competingNumbers.length) {
          player2.push(competingNumbers[counterPlayer2]);
          counterPlayer2 = counterPlayer2 + 2;
        }

        // Find the running sum of the numbers in an array
        var addTotal = function (array) {
          var sum = ``;
          counter = 0;
          while (counter < array.length) {
            sum = Number(sum) + Number(array[counter]);
            counter += 1;
          }
          return sum;
        };

        // Sort Player1 array in descending order
        player1.sort(function (a, b) {
          return b - a;
        });
        console.log(player1);
        // Sort Player2 array in descending order
        player2.sort(function (a, b) {
          return b - a;
        });
        console.log(player2);

        // Output message based on whether the competing numbers array has collected both players' sequenced numbers per round:
        // If not yet collected both players' sequenced numbers per round...
        if (!(competingNumbers.length % 2 == 0)) {
          return (
            `Player 1's numbers in descending order: ` +
            player1 +
            `<br><br> Player 2's numbers in descending order: ` +
            player2 +
            `<br><br> It's player 2's turn to roll the dice now. Click the submit buttom to roll dice.`
          );
        }

        // If both players have already determined their numbers during the latest round...
        else {
          // Output winning/losing message
          if (
            (resultMode == `normal` && addTotal(player1) > addTotal(player2)) ||
            (resultMode == `reversed` && addTotal(player1) < addTotal(player2))
          ) {
            return (
              `Player 1 is leading! <br> <br> Player 1's numbers so far are: ` +
              player1 +
              `(Total: ${addTotal(
                player1
              )}) <br><br> Player 2's numbers so far are: ` +
              player2 +
              `(Total: ${addTotal(player2)})`
            );
          }
          if (
            (resultMode == `normal` && addTotal(player1) < addTotal(player2)) ||
            (resultMode == `reversed` && addTotal(player1) > addTotal(player2))
          ) {
            return (
              `Player 2 is leading! <br> <br> Player 1's numbers in descending order: ` +
              player1 +
              `(Total: ${addTotal(
                player1
              )}) <br><br> Player 2's numbers in descending order: ` +
              player2 +
              ` (Total: ${addTotal(player2)})`
            );
          } else {
            return (
              `Wow, it's a draw! <br> <br> Player 1's numbers in descending order: ` +
              player1 +
              `(Total: ${addTotal(
                player1
              )}) <br><br> Player 2's numbers in descending order: ` +
              player2 +
              ` (Total: ${addTotal(player2)})`
            );
          }
        }
      }
    }
  }
};
