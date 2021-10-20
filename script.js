// Global Variables
var playerTurn = 1; // 1 = Player 1; 2 = Player 2
var gamePhase = 1; // 1 = Dice Roll; 2 = Choose Order; 3 = Conclusion
var player1Rolls = []; // Contains the 2 dice rolls for Player 1
var player2Rolls = []; // Contains the 2 dice rolls for Player 2
var finalNumbers = []; // Contains the final numbers for all players
var scorePlayer1 = 0; // Stores running score for Player 1
var scorePlayer2 = 0; // Stores running score for player 2
var gameType = "Choosing Game Type"; // 2 Choices - Standard or Variable Number of Dice
var gameMode = "Choosing Game Mode"; // 2 Choices - Highest Mode or Lowest Mode
var autoGenerate = 0; // 0 = No auto-generate; 1 = auto-generate
var numOfDice = 0; // Stores number of dice used for the round

// Function: Returns random number from 1 to 6 -inclusive
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNum = randomInteger + 1;
  return diceNum;
};

// Function: Takes user input 1 or 2, to generate combined number's value with chosen 1st numerical
var chosenOrderNum = function (choice, playerRolls) {
  var chosenNum = 0;
  if (choice == 1) {
    chosenNum = Number(String(playerRolls[0]) + String(playerRolls[1]));
  } else if (choice == 2) {
    chosenNum = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }
  return chosenNum;
};

// Function: Takes player number input, to return message on what numbers were rolled
var playerXRolls = function (playerNum) {
  var dice1Roll = eval("player" + playerNum + "Rolls[0]");
  var dice2Roll = eval("player" + playerNum + "Rolls[1]");
  var message = `You rolled <b>${dice1Roll}</b> for Dice 1 and <b>${dice2Roll}</b> for Dice 2.`;
  return message;
};

// Function: Returns error message for not picking Dice 1 or 2
var errorMessage = function () {
  return `Please try again. Enter '1' for Dice 1 or '2' for Dice 2.<br><br>${playerXRolls(
    playerTurn
  )}<br>Choose the order of the dice (1 or 2).`;
};

// Function: Generates Leaderboard (Highest Mode - Highest on top; Lowest Mode - Lowest on top)
var leaderBoard = function () {
  var score1 = 0;
  var score2 = 0;
  if (gameMode == "Highest Mode") {
    if (scorePlayer1 >= scorePlayer2) {
      score1 = `Player 1: <b>${scorePlayer1}</b>`;
      score2 = `Player 2: <b>${scorePlayer2}</b>`;
    } else if (scorePlayer1 < scorePlayer2) {
      score1 = `Player 2: <b>${scorePlayer2}</b>`;
      score2 = `Player 1: <b>${scorePlayer1}</b>`;
    }
  } else if (gameMode == "Lowest Mode") {
    if (scorePlayer1 <= scorePlayer2) {
      score1 = `Player 1: <b>${scorePlayer1}</b>`;
      score2 = `Player 2: <b>${scorePlayer2}</b>`;
    } else if (scorePlayer1 > scorePlayer2) {
      score1 = `Player 2: <b>${scorePlayer2}</b>`;
      score2 = `Player 1: <b>${scorePlayer1}</b>`;
    }
  }
  var score = `<br><br><b><u>Leaderboard</u></b><br>${score1}<br>${score2}</b>`;
  return score;
};

// Function: Refactored Game Phase 1 (Roll)
var phase1 = function () {
  eval(`player${playerTurn}Rolls.push(rollDice(),rollDice())`);
  var message = `Welcome Player ${playerTurn}.<br>${playerXRolls(playerTurn)}`;
  if (autoGenerate == 0) {
    message += `<br>Choose the order of the dice (1 or 2).`;
  } else if (autoGenerate == 1) {
    message += `<br><b>Auto-Generate Mode</b>: Press '<b>Submit</b>' to continue...`;
  }
  gamePhase = 2;
  return message;
};

// Function: Game Phase 1 (Roll - Variable Number of Dice)
var phase1VariableDice = function () {
  var counter = 0;
  var message = `Player ${playerTurn} has rolled - `;
  while (counter < numOfDice) {
    var roll = rollDice();
    eval(`player${playerTurn}Rolls.push(${roll})`);
    message += `<br>Dice ${counter + 1}: ${roll}`;
    counter += 1;
  }
  message += `<br>Press '<b>Submit</b>' to see optimal combined number.`;
  gamePhase = 2;
  return message;
};

// Function: Refactored Game Phase 2 (Choice)
var phase2 = function (choice) {
  finalNumbers.push(chosenOrderNum(choice, eval(`player${playerTurn}Rolls`)));
  var message = `Player ${playerTurn}, you chose Dice ${choice} first.<br>Your number is <b>${
    finalNumbers[playerTurn - 1]
  }</b>`;
  return message;
};

// Function: Game Phase 2 (Choice - Variable Number of Dice)
var phase2VariableDice = function () {
  var currentPlayerArray = eval(`player${playerTurn}Rolls`);
  var index = 0;
  if (gameMode == "Highest Mode") {
    var number = 6;
    var highestNum = "";
    while (number > 0) {
      index = 0;
      while (index < currentPlayerArray.length) {
        if (currentPlayerArray[index] == number) {
          highestNum += currentPlayerArray[index];
        }
        index += 1;
      }
      number -= 1;
    }
    eval(finalNumbers.push(Number(highestNum)));
    return `Your highest number is <b>${highestNum}</b>`;
  } else if (gameMode == "Lowest Mode") {
    var number = 0;
    var lowestNum = "";
    while (number <= 6) {
      index = 0;
      while (index < currentPlayerArray.length) {
        console.log("a");
        if (currentPlayerArray[index] == number) {
          lowestNum += currentPlayerArray[index];
        }
        index += 1;
      }
      number += 1;
    }
    eval(finalNumbers.push(Number(lowestNum)));
    return `Your lowest number is <b>${lowestNum}</b>`;
  }
};

// Function: Refactored Game Phase 2 (Choice - Auto-Generated Combined Number)
var phase2Auto = function () {
  var diceRoll1 = eval(`player${playerTurn}Rolls[0]`);
  var diceRoll2 = eval(`player${playerTurn}Rolls[1]`);
  if (gameMode == "Highest Mode") {
    if (diceRoll1 >= diceRoll2) {
      finalNumbers.push(chosenOrderNum(1, eval(`player${playerTurn}Rolls`)));
    } else if (diceRoll2 > diceRoll1) {
      finalNumbers.push(chosenOrderNum(2, eval(`player${playerTurn}Rolls`)));
    }
  } else if (gameMode == "Lowest Mode") {
    if (diceRoll1 <= diceRoll2) {
      finalNumbers.push(chosenOrderNum(1, eval(`player${playerTurn}Rolls`)));
    } else if (diceRoll2 < diceRoll1) {
      finalNumbers.push(chosenOrderNum(2, eval(`player${playerTurn}Rolls`)));
    }
  }
  var message = `Player ${playerTurn}, your number is <b>${
    finalNumbers[playerTurn - 1]
  }</b>`;
  return message;
};

// Function: Refactored Game Phase 3 (Conclusion - Default Highest Number)
var phase3 = function () {
  var message = `Player 1's number is <b>${finalNumbers[0]}</b> and Player 2's number is <b>${finalNumbers[1]}</b>.<br>`;
  if (finalNumbers[0] > finalNumbers[1]) {
    message += `<b>Player 1 won</b>.`;
  } else if (finalNumbers[1] > finalNumbers[0]) {
    message += `<b>Player 2 won</b>.`;
  } else if (finalNumbers[0] == finalNumbers[1]) {
    message += `<b>It's a draw</b>.`;
  }
  return message;
};

// Function: Alternate Game Phase 3 (Conclusion - Lowest Number)
var phase3Lowest = function () {
  var message = `Player 1's number is <b>${finalNumbers[0]}</b> and Player 2's number is <b>${finalNumbers[1]}</b>.<br>`;
  if (finalNumbers[0] < finalNumbers[1]) {
    message += `<b>Player 1 won</b>.`;
  } else if (finalNumbers[1] < finalNumbers[0]) {
    message += `<b>Player 2 won</b>.`;
  } else if (finalNumbers[0] == finalNumbers[1]) {
    message += `<b>It's a draw</b>.`;
  }
  return message;
};

// Function: Refactored Reset Back to Phase 1
var reset = function () {
  scorePlayer1 += finalNumbers[0];
  scorePlayer2 += finalNumbers[1];
  var message = `<br><br>Press '<b>Submit</b>' to play again!`;
  if (gameMode == "Highest Mode") {
    message += `<br>Alternatively, enter '<b>Lowest Mode</b>' to switch to Lowest Combined Number Mode.`;
  } else if (gameMode == "Lowest Mode") {
    message += `<br>Alternatively, enter '<b>Highest Mode</b>' to switch to Highest Combined Number Mode.`;
  }
  message += `<br><i>*do note that swapping game modes resets the Leaderboard*</i>`;
  message += `<br><br>To try other game modes or change number of dice <i>(For Variable Dice Game Mode)</i>, enter '<b>Restart</b>' to return to Home Page.`;
  message += leaderBoard();
  gamePhase = 1;
  player1Rolls = [];
  player2Rolls = [];
  finalNumbers = [];
  return message;
};

// Function: Highest/Lowest Mode Header
var header = function () {
  var message = "";
  if (gameMode == "Highest Mode") {
    message = `<b><u>Highest Combined Number Game Mode</u></b><br><br>`;
  } else if (gameMode == "Lowest Mode") {
    message = `<b><u>Lowest Combined Number Game Mode</u></b><br><br>`;
  }
  return message;
};

// Function: Return back to Home Page
var restart = function () {
  gameType = "Choosing Game Type";
  gameMode = "Choosing Game Mode";
  autoGenerate = 0;
  numOfDice = 0;
  return `Returning back to Home Page. Press '<b>Submit</b>' to continue...`;
};

// MAIN Function
var main = function (input) {
  var myOutputValue = "";
  // Allows Players to activate/deactivate auto-generate at any point (For Standard version)
  if (input == "Activate Auto-Generate" && autoGenerate == 0) {
    autoGenerate = 1;
    return `The computer <b>will now</b> auto-generate the highest/lowest two-digit number.`;
  } else if (input == "Deactivate Auto-Generate" && autoGenerate == 1) {
    autoGenerate = 0;
    return `The computer <b>will now stop</b> auto-generating the highest/lowest two-digit number.`;
  }

  // First page for Players to select game type (Standard or Variable Dice)
  if (
    gameType == "Choosing Game Type" ||
    "Variable Dice - Choosing Dice Number"
  ) {
    if (input == "Standard") {
      gameType = "Standard";
      return `Welcome to Beat That! standard version. Press '<b>Submit</b>' to select between Highest or Lowest Combined Number Mode.`;
    } else if (input == "Variable Dice") {
      gameType = "Variable Dice - Choosing Dice Number";
      return `Welcome to Beat That! variable dice version. <br>Press enter <b>number of dice</b> you wish to use (at least 2).`;
    } else if (gameType == "Variable Dice - Choosing Dice Number") {
      if (input < 2) {
        return `Please input <b>number of dice</b> you wish to use that is more than 2.`;
      } else {
        numOfDice = input;
        gameType = "Variable Dice";
      }
    } else if (gameType == "Choosing Game Type") {
      return `Welcome to Beat That!<br><br>Enter either:<br>1. '<b>Standard</b>' for Standard Beat That! version<br>2. '<b>Variable Dice</b>' for Variable Dice Beat That! version`;
    }
  }

  // Second page for Players to select game mode (Highest or Lowest)
  if (gameMode == "Choosing Game Mode") {
    if (input == "Lowest Mode") {
      gameMode = "Lowest Mode";
      return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
    } else if (input == "Highest Mode") {
      gameMode = "Highest Mode";
      return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b>' to continue...`;
    } else if (gameMode == "Choosing Game Mode") {
      return `Enter either:<br>1. '<b>Highest Mode</b>' for Highest Combined Number Game Mode<br>2. '<b>Lowest Mode</b>' for Lowest Combined Number Game Mode`;
    }
  }
  // Standard Beat That! version
  if (gameType == "Standard") {
    // 1st IF: If game is in Phase 3 (Conclusion)
    if (gamePhase == 3 && gameMode == "Highest Mode") {
      myOutputValue = header();
      myOutputValue += phase3();
      myOutputValue += reset();
    } else if (gamePhase == 3 && gameMode == "Lowest Mode") {
      myOutputValue = header();
      myOutputValue += phase3Lowest();
      myOutputValue += reset();
    }
    // Option for Players to swap game modes between Highest Mode and Lowest Mode after every round
    else if (
      gamePhase == 1 &&
      ((gameMode == "Highest Mode" && input == "Lowest Mode") ||
        (gameMode == "Lowest Mode" && input == "Highest Mode") ||
        input == "Restart")
    ) {
      if (input == "Restart") {
        return restart();
      } else if (input == "Lowest Mode") {
        gameMode = "Lowest Mode";
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
      } else if (input == "Highest Mode") {
        gameMode = "Highest Mode";
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b>' to continue...`;
      }
    }
    // 2nd IF: If game is in 1st Player's Turn (Phase 1 & 2)
    else if (playerTurn == 1) {
      myOutputValue = header();
      if (gamePhase == 1) {
        myOutputValue += phase1();
      } else if (gamePhase == 2) {
        if (autoGenerate == 0) {
          if (input != 1 && input != 2) {
            return header() + errorMessage();
          }
          myOutputValue += phase2(input);
        } else if (autoGenerate == 1) {
          myOutputValue += phase2Auto();
        }
        myOutputValue += `<br>It is now Player 2's turn. Press '<b>Submit</b>' to continue...`;
        playerTurn = 2;
        gamePhase = 1;
      }
    }
    // 3rd IF: If game is in 2nd Player's Turn (Phase 1 & 2)
    else if (playerTurn == 2) {
      myOutputValue = header();
      if (gamePhase == 1) {
        myOutputValue += phase1();
      } else if (gamePhase == 2) {
        if (autoGenerate == 0) {
          if (input != 1 && input != 2) {
            return header() + errorMessage();
          }
          myOutputValue += phase2(input);
        } else if (autoGenerate == 1) {
          myOutputValue += phase2Auto();
        }
        myOutputValue += `<br>Press '<b>Submit</b>' to see Final Score.`;
        playerTurn = 1;
        gamePhase = 3;
      }
    }
  }
  // Variable Dice Beat That! version
  if (gameType == "Variable Dice") {
    // 1st IF: If game is in Phase 3 (Conclusion)
    if (gamePhase == 3 && gameMode == "Highest Mode") {
      myOutputValue = header();
      myOutputValue += phase3();
      myOutputValue += reset();
    } else if (gamePhase == 3 && gameMode == "Lowest Mode") {
      myOutputValue = header();
      myOutputValue += phase3Lowest();
      myOutputValue += reset();
    }
    // Option for Players to swap game modes between Highest Mode and Lowest Mode after every round or return to Home Page
    else if (
      gamePhase == 1 &&
      ((gameMode == "Highest Mode" && input == "Lowest Mode") ||
        (gameMode == "Lowest Mode" && input == "Highest Mode") ||
        input == "Restart")
    ) {
      if (input == "Restart") {
        return restart();
      } else if (input == "Lowest Mode") {
        gameMode = "Lowest Mode";
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
      } else if (input == "Highest Mode") {
        gameMode = "Highest Mode";
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b> to continue...`;
      }
    }
    // 2nd IF: If game is in 1st Player's Turn (Phase 1 & 2)
    else if (playerTurn == 1) {
      myOutputValue = header();
      if (gamePhase == 1) {
        myOutputValue += phase1VariableDice();
      } else if (gamePhase == 2) {
        myOutputValue = phase2VariableDice();
        myOutputValue += `<br>It is now Player 2's turn. Press '<b>Submit</b>' to continue...`;
        playerTurn = 2;
        gamePhase = 1;
      }
    }
    // 3rd IF: If game is in 2nd Player's Turn (Phase 1 & 2)
    else if (playerTurn == 2) {
      myOutputValue = header();
      if (gamePhase == 1) {
        myOutputValue += phase1VariableDice();
      } else if (gamePhase == 2) {
        myOutputValue = phase2VariableDice();
        myOutputValue += `<br>Press '<b>Submit</b>' to see Final Score.`;
        playerTurn = 1;
        gamePhase = 3;
      }
    }
  }

  return myOutputValue;
};
