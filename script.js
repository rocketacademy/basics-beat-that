// Global Vars
var numOfPlayers = 0;
var mode = "";
var currentStage = "";
var currentPlayerNum = 1;
var currentPlayer = `Player ${currentPlayerNum}`;
var currentPlayerRolls = [];
var currentPlayerFinalNum = 0;
var allPlayersFinalNum = [];
var allPlayersRunningScore = [];

//--------------------------------------------------------------------
// Helper Funcs

// Sets number of players from player input, links to Choosing Modes.
var inputNumPlayers = function (input) {
  if (Number(input) != NaN && input > 1) {
    numOfPlayers = input;
    allPlayersRunningScore = [];

    var counter = 0;
    while (counter < input) {
      allPlayersRunningScore.push(0);
      counter++;
    }
    currentStage = "mode";
    return `Please select "Normal" or "Reversed" mode.`;
  } else {
    return `Invalid. Please key in valid number of players.<br> There must be at least 2 Players.`;
  }
};

// Selects Modes. Links to starting to roll for all players
var selectMode = function (input) {
  if (input.toLowerCase() == "normal" || input.toLowerCase() == "reversed") {
    mode = input;
    currentStage = "preroll";
    return `${mode.toUpperCase()} mode selected. Press "Submit" to start game.`;
  } else {
    return `Invalid mode selected. Please select "Normal" or "Reversed" mode.`;
  }
};

// Rolls single dice
var rollDice = function () {
  randNum = Math.floor(Math.random() * 6) + 1;
  return randNum;
};

// Rolls 2 Dice
var rollTwoDice = function () {
  var diceOne = rollDice();
  var diceTwo = rollDice();
  currentPlayerRolls.push(diceOne);
  currentPlayerRolls.push(diceTwo);
  currentStage = "arrange";
  return printRolls(diceOne, diceTwo, currentPlayer);
};

// Arranges dice to form "2-digit number" accordng to userChoice
// Arrangement style dependent on mode
// Runs through all players, until last player is done.
// Then links to compare
var arrangeDice = function (input) {
  var finalNum = "";

  if (mode == "normal") {
    var diceOneStr = String(currentPlayerRolls[0]);
    var diceTwoStr = String(currentPlayerRolls[1]);

    if (input == 1) {
      finalNum = Number(diceOneStr + diceTwoStr);
    } else if (input == 2) {
      finalNum = Number(diceTwoStr + diceOneStr);
    } else {
      return (
        `Sorry, ${input} is not a valid choice. Please choose again. <br><br>` +
        printRolls(diceOneStr, diceTwoStr, currentPlayer)
      );
    }
  } else if (mode == "reversed") {
    if (currentPlayerRolls[0] <= currentPlayerRolls[1]) {
      finalNum = String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]);
    } else {
      finalNum = String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]);
    }
  }

  if (currentPlayerNum < numOfPlayers) {
    allPlayersFinalNum.push(finalNum);
    currentPlayerNum++;
    currentStage = "preroll";
    currentPlayerRolls = [];
    currentPlayerFinalNum = 0;
    return `${currentPlayer}'s arranged number is <b>${finalNum}</b><br><br>Press "Submit" for Next Player's turn to roll!`;
  } else if (currentPlayerNum == numOfPlayers) {
    allPlayersFinalNum.push(finalNum);
    currentPlayerNum++;
    currentStage = "compare";
    return `${currentPlayer}'s arranged number is <b>${finalNum}</b><br><br> All Players have now rolled. <br><br> Press "Submit" to Compare Final Numbers Now!`;
  }
};

// Compares all final numbers across all players
// Prints outcome of round, then asks if "play again" or "reset", and sets "stage" to corresponding stage.
var compareFinalNums = function () {
  var printAllFinalNum = "";
  var comparedPlayer = 1;
  var comparedPlayerRoll = 0;

  var winningRoll = 0;
  var winningPlayer = 0;

  while (comparedPlayer <= numOfPlayers) {
    comparedPlayerRoll = allPlayersFinalNum[comparedPlayer - 1];
    if (mode == "normal") {
      if (comparedPlayerRoll > winningRoll) {
        winningRoll = comparedPlayerRoll;
        winningPlayer = comparedPlayer;
      }
    } else if (mode == "reversed") {
      if (winningRoll == 0) {
        winningRoll = comparedPlayerRoll;
        winningPlayer = comparedPlayer;
      } else if (comparedPlayerRoll < winningRoll) {
        winningRoll = comparedPlayerRoll;
        winningPlayer = comparedPlayer;
      }
    }
    printAllFinalNum += `Player ${comparedPlayer}'s final number: ${comparedPlayerRoll}. <br><br>`;
    allPlayersRunningScore[comparedPlayer - 1] += Number(comparedPlayerRoll);
    comparedPlayer++;
  }
  currentStage = "postgame";
  return (
    printAllFinalNum +
    `Player ${winningPlayer} wins! <br><br> Press <b>Submit</b> to play next round, <br>or <b>type "Reset"</b> to reset game.`
  );
};

// Takes in input post-game to decide reset to which stage
var postGameReset = function (input) {
  console.log("running PostGame");
  if (input == "") {
    currentStage = "mode";
    return `Starting next round. Please select "Normal" or "Reversed" mode.`;
  } else if (input.toLowerCase() == "reset") {
    bigReset();
    return `Game Reset. Please key in number of players.`;
  } else {
    return `Sorry, Invalid. Either just press Submit to play next round, or type "Reset" to reset game.`;
  }
};

// Helper function for printing each player's rolls for reference during arrangement
// Post-roll instructions dependent on mode.
var printRolls = function (diceOneNum, diceTwoNum, currentPlayer) {
  var printRollOutput = `
  <b><u>${currentPlayer}'s rolls</b></u><br>
  <b>Dice One:</b> ${diceOneNum}<br>
  <b>Dice Two:</b> ${diceTwoNum}<br>
`;
  return printRollOutput + "<br>" + postRollInstructions();
};

// Helper function to print instruction depending on mode.
var postRollInstructions = function () {
  var output = "";
  if (mode == "normal") {
    output = `Choose the dice you want to order first, <b><u>1</b></u> or <b><u>2</b></u><br>`;
  } else if (mode == "reversed") {
    output = `This is REVERSED mode, just press "Submit" and the AI will select your lowest outcome.`;
  }
  return output;
};

// Update running tally of all players scores, for html display
var updateRunningScores = function () {
  var runningScoreTally = "";
  var playerCounter = 0;
  while (playerCounter < numOfPlayers) {
    runningScoreTally += `Player ${playerCounter + 1}'s running score is ${
      allPlayersRunningScore[playerCounter]
    } <br>`;
    playerCounter++;
  }
  return runningScoreTally;
};

// Update all players scores for this round, for html display
var updateCurrentRoll = function () {
  var currentRolls = "";
  var playerCounter = 0;
  while (playerCounter < numOfPlayers) {
    currentRolls += `Player ${playerCounter + 1}'s current roll is ${
      allPlayersFinalNum[playerCounter]
    } <br>`;
    playerCounter++;
  }
  return currentRolls;
};

// Helper func to reset all globals
var bigReset = function () {
  numOfPlayers = 0;
  mode = "";
  currentStage = "";
  currentPlayerNum = 1;
  currentPlayer = `Player ${currentPlayerNum}`;
  currentPlayerRolls = [];
  currentPlayerFinalNum = 0;
  allPlayersFinalNum = [];
  allPlayersRunningScore = [];
};

//-------------------------------------------------------------------------
// Main Function

var main = function (input) {
  console.log("Current at stage:", currentStage);
  if (numOfPlayers == 0) {
    return inputNumPlayers(input);
  } else if (currentStage == "mode") {
    currentPlayerNum = 1;
    currentPlayerRolls = [];
    currentPlayerFinalNum = 0;
    allPlayersFinalNum = [];
    return selectMode(input);
  }

  while (currentPlayerNum <= numOfPlayers) {
    currentPlayer = `Player ${currentPlayerNum}`;
    if (currentStage == "preroll") {
      currentStage = "roll";
      return `Press "Submit" for ${currentPlayer}'s turn to roll!`;
    } else if (currentStage == "roll") {
      return rollTwoDice();
    } else if (currentStage == "arrange") {
      return arrangeDice(input);
    }
  }

  if (currentStage == "compare") {
    return compareFinalNums();
  } else if (currentStage == "postgame") {
    return postGameReset(input);
  }
};
