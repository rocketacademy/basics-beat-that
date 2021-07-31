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

// ======================= MORE COMFORTABLE (SCORE + LEADERBOARD + LOWEST COMBINED NUMBER MODE + AUTO-GENERATE COMBINED NUMBER + VARIABLE NUMBER OF DICE + VARIABLE NUMBER OF PLAYERS) ===========================

// Create scream codes for frequently used strings
var NORMAL = "normal";
var REVERSED = "reversed";
var NO_OF_PLAYERS = "enter number of players";
var GAME = "game";
var UNASSIGNED = "unassigned";

// Create an array to store the newly rolled dice numbers for the current player
var diceRollArray = [];
// Create result mode with default being normal (i.e. highest score wins)
var resultMode = NORMAL;
// Create game mode where default is to enter number of players first
var gameMode = NO_OF_PLAYERS;
// Create counter to track which player's turn it is, where 'player 1' is 0, 'player 2' is 1 and so on..
var playerNo = 0;
// Create array to store all players' competing numbers in sequence of turn taken (e.g. player 1's, player 2's, .. player X's, player 1's, player 2's, .. player X's)
var competingNumbers = [];
// Create array to store all individual players' array of best numbers across previous and current rounds (e.g. player 1's array of numbers, player 2's array of numbers...)
var competingArrays = [];
// Create array to store the total of each player's best combined numbers (e.g. player 1's total, player 2's total...)
var competingTotals = [];

// Create global variable to store the number of dice selected at each round, default being "unassigned"
var numberOfDice = UNASSIGNED;
// Create global variable to store the number of players indicated at the start of the game
var numberOfPlayers = ``;

// Create function to check input is a number > 0
var checkNumber = function (data) {
  return !isNaN(Number(data)) && Number(data) != 0;
};

// Create a function for random dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};
// Create a function to roll a specific quantity of dice stated
var rollAnyQtyDice = function (quantity) {
  diceRollArray = [];
  var counter = 0;
  while (counter < quantity) {
    diceRollArray.push(diceRoll());
    counter += 1;
  }
  return diceRollArray;
};

// Sort an array in an ascending order
var sortAsc = function (array) {
  return array.sort(function (a, b) {
    return a - b;
  });
};
// Sort an array in a descending order
var sortDes = function (array) {
  return array.sort(function (a, b) {
    return b - a;
  });
};

// Store the unsequenced dice numbers rolled in the current round for the current player
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
  if (resultMode == NORMAL) {
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
  if (resultMode == REVERSED) {
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
  var total = ``;
  counter = 0;
  while (counter < array.length) {
    total = Number(total) + Number(array[counter]);
    counter += 1;
  }
  return total;
};

// Find winning player based on result mode (normal/reversed)
var findWinner = function (array, normalOrReversed) {
  var counter = 0;
  var playerGreatest = 1;
  var playerSmallest = 1;
  while (counter < array.length) {
    console.log("counter", counter);
    if (
      array[counter] < array[counter + 1] &&
      array[playerGreatest - 1] == array[counter + 1]
    ) {
      playerGreatest = playerGreatest + `and ${counter + 2}`;
    } else if (array[counter] < array[counter + 1]) {
      playerGreatest = counter + 2;
    }
    if (
      array[counter] > array[counter + 1] &&
      array[playerSmallest - 1] == array[counter + 1]
    ) {
      playerSmallest = playerSmallest + `and ${counter + 2}`;
    } else if (array[counter] > array[counter + 1]) {
      playerSmallest = counter + 2;
    }
    counter += 1;
    console.log("playerGreatest", playerGreatest);
    console.log("playerSmallest", playerSmallest);
  }

  if (normalOrReversed == NORMAL) {
    return playerGreatest;
  }
  if (normalOrReversed == REVERSED) {
    return playerSmallest;
  }
};

// ***** MAIN FUNCTION *****
var main = function (input) {
  console.log("player number", playerNo);
  // Step 1: Check for instructions to change result mode (normal/reversed) first
  if (input.toLowerCase() == REVERSED) {
    resultMode = REVERSED;
    // Reset Arrays to start new game in changed mode
    competingNumbers = [];
    competingArrays = [];
    competingTotals = [];
    return "You are now in reversed mode where the smaller number wins! <br> <br> Please enter the number of players for this game.";
  }
  if (input.toLowerCase() == NORMAL) {
    resultMode = NORMAL;
    // Reset Arrays to start new game in changed mode
    competingNumbers = [];
    competingArrays = [];
    competingTotals = [];
    return "You are now in normal mode where the bigger number wins! <br> <br> Please enter the number of players for this game.";
  }

  // Step 2: Assign the number of players for the game
  // If input is valid (i.e. a digit >0)
  if (gameMode == NO_OF_PLAYERS && checkNumber(input) == true) {
    numberOfPlayers = Number(input);
    gameMode = GAME;
    return `You have selected a ${numberOfPlayers}-player game. <br><br> Please enter the number of dice you wish to play for this round, then click the submit button.`;
  }
  // If input is not valid, show error message
  else if (gameMode == NO_OF_PLAYERS) {
    return `Sorry, I do not understand. <br> <br> Please enter the number of players to start this game.`;
  }

  // Step 3: Assign number of dice, then roll dice and auto-generate best combined number, and store the necessary data for result comparison later
  if (gameMode == GAME) {
    // Assign number of dice first
    // If input is valid (i.e. a digit >0), assign number of dice
    if (numberOfDice == UNASSIGNED && checkNumber(input) == true) {
      numberOfDice = Number(input);
      console.log("numberOfDice", numberOfDice);
    }
    // If input is invalid, show error message
    else if (numberOfDice == UNASSIGNED) {
      return `Sorry, I do not understand. <br> <br> Please enter the number of dice you wish to play in this round.`;
    }

    // After number of dice has been assigned,
    if (numberOfDice != UNASSIGNED) {
      // Roll the amount of dice that was dictated earlier
      diceRollArray = rollAnyQtyDice(numberOfDice);
      console.log("diceRollArray", diceRollArray);
      // Store the dice roll in an unsequenced array (for output message use)
      var unsortedDiceRollArray = storeRandomArray(diceRollArray);
      // Get best combined number of the dice rolled
      var bestNumber = autoCombine(resultMode, diceRollArray);
      // Store best combined number in the array along with other players' best numbers
      competingNumbers.push(Number(bestNumber));
      // Extract all of current player's best numbers thus far into the individual player's personal array of best numbers
      var playerCount1 = playerNo;
      console.log("playerNo", playerNo);
      console.log("playerCount1", playerCount1);
      var indivArray = [];
      while (playerCount1 < competingNumbers.length) {
        indivArray.push(competingNumbers[playerCount1]);
        console.log("playerCount1", playerCount1);
        console.log(
          "competingNumbers[playerCount1]",
          competingNumbers[playerCount1]
        );
        console.log("indivArray", indivArray);
        playerCount1 += Number(numberOfPlayers);
      }
      console.log("competingNumbers", competingNumbers);
      console.log("indivArray", indivArray);
      // If there is none stored yet (i.e. still in first round), use push to get new data in
      if (competingArrays.length < numberOfPlayers) {
        competingArrays.push(indivArray);
      }
      // If there is already data stored within (i.e. second round and beyond), replace old data
      if (competingArrays.length >= numberOfPlayers) {
        competingArrays[playerNo] = indivArray;
      }
      console.log("competingArrays", competingArrays);

      // Collate the total of all the numbers in the individual player's personal array
      var indivTotal = addTotal(indivArray);
      // If there is none stored yet (i.e. still in first round), use push to get new data in
      if (competingTotals.length < numberOfPlayers) {
        competingTotals.push(indivTotal);
      }
      // If there is already data stored within (i.e. second round and beyond), replace old data
      if (competingTotals.length >= numberOfPlayers) {
        competingTotals[playerNo] = indivTotal;
      }
      console.log("competingTotals", competingTotals);

      // Step 4: Output message (includes finding the winner if it is the last player of the round)
      // If this is not the final player's turn, simply output the current player's dice roll outcome
      if (playerNo < numberOfPlayers - 1) {
        playerNo += 1;
        return `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br> It's the next player's turn now, please click submit to roll dice.`;
      }

      // If this is the final player's turn, output the current player's dice roll outcome, along with win/lose results and stats
      if (playerNo == numberOfPlayers - 1) {
        // Reset variables in preparation for fresh round after outcome is generated
        playerNo = 0;
        numberOfDice = UNASSIGNED;
        // Find winner based on running sum thus far
        var winningPlayer = findWinner(competingTotals, resultMode);
        console.log("competingTotals", competingTotals);
        console.log("winningPlayer", winningPlayer);
        // Create loop to print each players' numbers and total sum (for message output use)
        playerCounter = 0;
        var resultLog = ``;
        while (playerCounter < numberOfPlayers) {
          resultLog =
            resultLog +
            `Player ${
              playerCounter + 1
            }'s numbers in descending order: ${sortDes(
              competingArrays[playerCounter]
            )}. (Total: ${competingTotals[playerCounter]}) <br>`;
          playerCounter += 1;
        }
        // Output Result message
        return (
          `You rolled these numbers: ${unsortedDiceRollArray}. <br> <br> This is your best combined number from those digits above: ${bestNumber}. <br><br><br> 🏆 THE CURRENT WINNER IS: PLAYER ${winningPlayer}! 🏆 <br> <br> You are currently in the ${resultMode} game mode. <br> <br>` +
          resultLog +
          `<br><br><br> To continue, please get Player 1 to enter the number of dice you wish to roll for the next round. <br><br><br> ================= <br><br> Tip: <br><br> Enter "reversed" for reversed mode (lowest number wins). <br> Enter "normal" for normal mode (highest number wins).`
        );
      }
      // Reset secondary arrays. Do not reset core array "competingNumbers"
      competingArrays = [];
      competingTotals = [];
      indivArray = [];
      indivTotal = [];
    }
  }
};
