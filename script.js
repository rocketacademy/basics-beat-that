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

// // ======================= MORE COMFORTABLE (SCORE + LEADERBOARD + LOWEST COMBINED NUMBER MODE) ===========================

// // Create an array (needs to be global variable) to store the dice roll numbers
// var diceRollArray = [];
// // Create game mode (needs to be global variable) with default being unsequenced dice roll numbers
// var gameMode = "unsequenced";
// // Create game mode (needs to be global variable) with default being normal (i.e. highest score wins)
// var resultMode = "normal";
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
//   // Change result mode according to input on reversed/normal game
//   if (input.toLowerCase() == `reversed`) {
//     resultMode = `reversed`;
//     // Reset Array
//     competingNumbers = [];
//     return "You are now in reversed mode where the smaller number wins! <br> <br> Player 1 please click the submit button to start the game.";
//   }
//   if (input.toLowerCase() == `normal`) {
//     resultMode = `normal`;
//     // Reset Array
//     competingNumbers = [];
//     return "You are now in normal mode where the bigger number wins! <br> <br> Player 1 please click the submit button to start the game.";
//   }

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
//         `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around.`
//       );
//     }
//     // Alter sequence of dice roll digits according to input
//     if (gameMode == "to be sequenced") {
//       // Error message if input is unrecognised
//       if (!(inputNumeral == 01 || inputNumeral == 10)) {
//         return (
//           `Sorry, I do not understand. <br> <br> You rolled these numbers earlier: ` +
//           diceRollArray +
//           `.<br> <br> Please enter "01" for the sequence to remain the same OR "10" to switch the sequence around.`
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

//         // Create an array to store player 1's numbers
//         var player1 = [];
//         counterPlayer1 = 0;
//         while (counterPlayer1 < competingNumbers.length) {
//           player1.push(competingNumbers[counterPlayer1]);
//           counterPlayer1 = counterPlayer1 + 2;
//         }
//         // Create an array to store player 2's numbers
//         var player2 = [];
//         counterPlayer2 = 1;
//         while (counterPlayer2 < competingNumbers.length) {
//           player2.push(competingNumbers[counterPlayer2]);
//           counterPlayer2 = counterPlayer2 + 2;
//         }

//         // Find the running sum of the numbers in an array
//         var addTotal = function (array) {
//           var sum = ``;
//           counter = 0;
//           while (counter < array.length) {
//             sum = Number(sum) + Number(array[counter]);
//             counter += 1;
//           }
//           return sum;
//         };

//         // Sort Player1 array in descending order
//         player1.sort(function (a, b) {
//           return b - a;
//         });
//         console.log(player1);
//         // Sort Player2 array in descending order
//         player2.sort(function (a, b) {
//           return b - a;
//         });
//         console.log(player2);

//         // Output message based on whether the competing numbers array has collected both players' sequenced numbers per round:
//         // If not yet collected both players' sequenced numbers per round...
//         if (!(competingNumbers.length % 2 == 0)) {
//           return (
//             `Player 1's numbers in descending order: ` +
//             player1 +
//             `<br><br> Player 2's numbers in descending order: ` +
//             player2 +
//             `<br><br> It's player 2's turn to roll the dice now. Click the submit buttom to roll dice.`
//           );
//         }

//         // If both players have already determined their numbers during the latest round...
//         else {
//           // Output winning/losing message
//           if (
//             (resultMode == `normal` && addTotal(player1) > addTotal(player2)) ||
//             (resultMode == `reversed` && addTotal(player1) < addTotal(player2))
//           ) {
//             return (
//               `Player 1 is leading! <br> <br> Player 1's numbers in descending order: ` +
//               player1 +
//               `(Total: ${addTotal(
//                 player1
//               )}) <br><br> Player 2's numbers in descending order: ` +
//               player2 +
//               `(Total: ${addTotal(player2)})`
//             );
//           }
//           if (
//             (resultMode == `normal` && addTotal(player1) < addTotal(player2)) ||
//             (resultMode == `reversed` && addTotal(player1) > addTotal(player2))
//           ) {
//             return (
//               `Player 2 is leading! <br> <br> Player 1's numbers in descending order: ` +
//               player1 +
//               `(Total: ${addTotal(
//                 player1
//               )}) <br><br> Player 2's numbers in descending order: ` +
//               player2 +
//               ` (Total: ${addTotal(player2)})`
//             );
//           } else {
//             return (
//               `Wow, it's a draw! <br> <br> Player 1's numbers in descending order: ` +
//               player1 +
//               `(Total: ${addTotal(
//                 player1
//               )}) <br><br> Player 2's numbers in descending order: ` +
//               player2 +
//               ` (Total: ${addTotal(player2)})`
//             );
//           }
//         }
//       }
//     }
//   }
// };

// ======================= MORE COMFORTABLE (AUTO-GENERATE COMBINED NUMBER + VARIABLE NUMBER OF DICE) ===========================

// Create an array (needs to be global variable) to store the newly rolled dice numbers
var diceRollArray = [];
// Create game mode (needs to be global variable) with default being normal (i.e. highest score wins)
var resultMode = "normal";
// Create global variable to track if it is player 1 or 2's turn, set default as player 1
var player = 0;
// Create global variables to store player 1 and 2's numbers
var player1 = [];
var player2 = [];
// Create global variables to store the number of dice selected at each round
var numberOfDice = ``;

// Create a function for dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};
// Create a function to roll any quantity of dice depending on quantity stated
var rollAnyQtyDice = function (quantity) {
  // Reset diceRollArray (QUESTION: I thought this step is redundant since my next line is to replace the array with something else, but it doesn't work when I omit it, why?)
  diceRollArray = [];
  var counter = 0;
  while (counter < quantity) {
    diceRollArray.push(diceRoll());
    counter += 1;
  }
  return diceRollArray;
};

// Sort an array in ascending order
var sortAsc = function (array) {
  return array.sort(function (a, b) {
    return a - b;
  });
};

// Sort an array in descending order
var sortDes = function (array) {
  return array.sort(function (a, b) {
    return b - a;
  });
};

// Store the unsequenced dice numbers rolled in current round for current player
var storeRandomArray = function (array) {
  var diceCounter = 0;
  var unsortedarray = ``;
  while (diceCounter < array.length) {
    unsortedarray = String(unsortedarray) + String(array[diceCounter]);
    diceCounter += 1;
  }
  return unsortedarray;
};

// Auto-generate highest/lowest combined number based on result mode
var autoCombine = function (resultMode, array) {
  if (resultMode == `normal`) {
    array = sortDes(array);
    var bestNumber = ``;
    itemCounter = 0;
    while (itemCounter < array.length) {
      bestNumber = String(bestNumber) + String(array[itemCounter]);
      itemCounter += 1;
    }
    console.log("bestNumber", bestNumber);
    return bestNumber;
  }
  if (resultMode == `reversed`) {
    var array = sortAsc(array);
    var bestNumber = ``;
    itemCounter = 0;
    while (itemCounter < array.length) {
      bestNumber = String(bestNumber) + String(array[itemCounter]);
      itemCounter += 1;
    }
    console.log("bestNumber", bestNumber);
    return bestNumber;
  }
};

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

var main = function (input) {
  console.log("player", player);
  console.log(
    "Input is a number?",
    !isNaN(Number(input)) && Number(input) != 0
  );
  // Change result mode according to input on reversed/normal game
  if (input.toLowerCase() == `reversed`) {
    resultMode = `reversed`;
    // Reset Arrays
    player1 = [];
    player2 = [];
    return "You are now in reversed mode where the smaller number wins! <br> <br> Player 1, please enter the number of dice you wish to place in this round and click submit.";
  }
  if (input.toLowerCase() == `normal`) {
    resultMode = `normal`;
    // Reset Arrays
    player1 = [];
    player2 = [];
    return "You are now in normal mode where the bigger number wins! <br> <br> Player 1, please enter the number of dice you wish to place in this round and click submit.";
  }

  // *** Roll dice for the first time every new round, auto-generate combined number, but do not generate result yet ***
  // Valid input
  if (player == 0 && !isNaN(Number(input)) && Number(input) != 0) {
    // Roll the amount of dice stated in input
    numberOfDice = Number(input);
    diceRollArray = rollAnyQtyDice(numberOfDice);
    console.log("diceRollArray", diceRollArray);
    //Store unsequenced array
    var unsortedDiceRollArray = storeRandomArray(diceRollArray);
    // Get best combined number
    var bestNumber = autoCombine(resultMode, diceRollArray);
    player1.push(bestNumber);
    player = 1;
    return `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br> It's player 2's turn now, please click submit to roll your dice.`;
  }
  // Error message for invalid input
  else if (player == 0) {
    return `Sorry, I do not understand. <br> <br> Please enter the number of dice you wish to play in this round.`;
  }

  // *** Roll dice for the second player every round, auto-generate combined number, and output result ***
  if (player == 1) {
    // Roll the amount of dice stated in earlier input
    diceRollArray = rollAnyQtyDice(numberOfDice);
    console.log("diceRollArray", diceRollArray);
    //Store unsequenced array
    var unsortedDiceRollArray = storeRandomArray(diceRollArray);
    // Get best combined number
    var bestNumber = autoCombine(resultMode, diceRollArray);
    player2.push(bestNumber);
    console.log("player1", player1);
    console.log("player2", player2);
    // Reset variables
    player = 0;
    numberOfDice = ``;
    if (
      (resultMode == `normal` && addTotal(player1) > addTotal(player2)) ||
      (resultMode == `reversed` && addTotal(player1) < addTotal(player2))
    ) {
      return (
        `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br><br> 🏆 THE CURRENT WINNER IS: PLAYER 1! 🏆
       <br> <br> You are currently in the ${resultMode} game mode. <br> <br> Player 1's numbers in descending order: ` +
        sortDes(player1) +
        ` (Total: ${addTotal(
          player1
        )}) <br><br> Player 2's numbers in descending order: ` +
        sortDes(player2) +
        ` (Total: ${addTotal(
          player2
        )}) <br><br><br> To continue, please get Player 1 to enter the number of dice you wish to roll for the next round. <br><br><br> ================= <br><br> Tip: <br><br> Enter "reversed" for reversed mode (lowest number wins). <br> Enter "normal" for normal mode (highest number wins).`
      );
    }
    if (
      (resultMode == `normal` && addTotal(player1) < addTotal(player2)) ||
      (resultMode == `reversed` && addTotal(player1) > addTotal(player2))
    ) {
      return (
        `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br><br> 🏆 THE CURRENT WINNER IS: PLAYER 2! 🏆
       <br> <br> You are currently in the ${resultMode} game mode. <br> <br> Player 1's numbers in descending order: ` +
        sortDes(player1) +
        ` (Total: ${addTotal(
          player1
        )}) <br><br> Player 2's numbers in descending order: ` +
        sortDes(player2) +
        ` (Total: ${addTotal(
          player2
        )}) <br><br><br> To continue, please get Player 1 to enter the number of dice you wish to roll for the next round. <br><br><br> ================= <br><br> Tip: <br><br> Enter "reversed" for reversed mode (lowest number wins). <br> Enter "normal" for normal mode (highest number wins).`
      );
    } else {
      return (
        `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br><br> 🏆 THE CURRENT WINNER IS: BOTH OF YOU! It's a draw! 🏆 <br></br> You are currently in the ${resultMode} game mode. <br> <br> Player 1's numbers in descending order: ` +
        sortDes(player1) +
        ` (Total: ${addTotal(
          player1
        )}) <br><br> Player 2's numbers in descending order: ` +
        sortDes(player2) +
        ` (Total: ${addTotal(
          player2
        )}) <br><br><br> To continue, please get Player 1 to enter the number of dice you wish to roll for the next round. <br><br><br> ================= <br><br> Tip: <br><br> Enter "reversed" for reversed mode (lowest number wins). <br> Enter "normal" for normal mode (highest number wins).`
      );
    }
  }
};
