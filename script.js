// Global Variables
var playerTurn = 1; // 1 = Player 1; 2 = Player 2
var gamePhase = 1; // 1 = Dice Roll; 2 = Choose Order; 3 = Conclusion
var playerRolls = []; // Contains dice rolls for all Players
var finalNumbers = []; // Contains the final numbers for all players
var scorePlayer = []; // Stores running score for all Players
var gameType = "Choosing Game Type"; // 2 Choices - Standard or Variable Number of Dice
var gameMode = "Choosing Game Mode"; // 2 Choices - Highest Mode or Lowest Mode
var autoGenerate = 0; // 0 = No auto-generate; 1 = auto-generate
var numOfDice = 0; // Stores number of dice used for the round
var gameState = "Choosing Number of Players"; // 2 Choices - Choosing Number of Players or Game
var numOfPlayers = 0; // Stores number of players

// Function: Returns random number from 1 to 6 -inclusive
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNum = randomInteger + 1;
  return diceNum;
};

// Function: Takes user input 1 or 2, to generate combined number's value with chosen 1st numerical
var chosenOrderNum = function (choice, rolls) {
  var chosenNum = 0;
  console.log(`rolls`, rolls);
  if (choice == 1) {
    chosenNum = Number(
      String(rolls[(playerTurn - 1) * 3 + 1]) +
        String(rolls[(playerTurn - 1) * 3 + 2])
    );
  } else if (choice == 2) {
    chosenNum = Number(
      String(rolls[(playerTurn - 1) * 3 + 2]) +
        String(rolls[(playerTurn - 1) * 3 + 1])
    );
  }
  return chosenNum;
};

// Function: Takes player number input, to return message on what numbers were rolled
var playerXRolls = function (playerNum) {
  var dice1Roll = playerRolls[(playerNum - 1) * 3 + 1];
  var dice2Roll = playerRolls[(playerNum - 1) * 3 + 2];
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
  var score = `<br><br><b><u>Leaderboard</u></b>`;
  var number = 11;
  var ascendingOrderScores = [];
  while (ascendingOrderScores.length < scorePlayer.length) {
    var innercounter = 0;
    while (innercounter < scorePlayer.length) {
      if (number == scorePlayer[innercounter]) {
        ascendingOrderScores.push(scorePlayer[innercounter - 1]);
        ascendingOrderScores.push(number);
      }
      innercounter += 1;
    }
    number += 1;
  }
  if (gameMode == "Highest Mode") {
    while (ascendingOrderScores.length > 0) {
      var xScore = ascendingOrderScores.pop();
      var xPlayer = ascendingOrderScores.pop();
      score += `<br>Player ${xPlayer}: <b>${xScore}</b>`;
    }
  } else if (gameMode == "Lowest Mode") {
    console.log(`lowest mode`, ascendingOrderScores);
    var counter = 1;
    while (counter - 1 < numOfPlayers) {
      score += `<br>Player ${ascendingOrderScores[(counter - 1) * 2]}: ${
        ascendingOrderScores[(counter - 1) * 2 + 1]
      }`;
      counter += 1;
    }
  }

  return score;
};

// Function: Refactored Game Phase 1 (Roll)
var phase1 = function () {
  playerRolls.push(String(playerTurn));
  playerRolls.push(rollDice());
  playerRolls.push(rollDice());
  console.log(`standard phase1`, playerRolls);
  console.log(playerRolls);
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
  playerRolls.push(String(playerTurn));
  while (counter < numOfDice) {
    var roll = rollDice();
    playerRolls.push(roll);
    message += `<br>Dice ${counter + 1}: ${roll}`;
    counter += 1;
  }
  console.log(`Variable`, playerRolls);
  message += `<br>Press '<b>Submit</b>' to see optimal combined number.`;
  gamePhase = 2;
  return message;
};

// Function: Game Phase 2 (Choice)
var phase2 = function (choice) {
  finalNumbers.push(chosenOrderNum(choice, playerRolls));
  var message = `Player ${playerTurn}, you chose Dice ${choice} first.<br>Your number is <b>${
    finalNumbers[playerTurn - 1]
  }</b>`;
  console.log(finalNumbers);
  return message;
};

// Function: Game Phase 2 (Choice - Variable Number of Dice)
var phase2VariableDice = function () {
  var index = 0;
  if (gameMode == "Highest Mode") {
    var number = 6;
    var highestNum = "";
    while (number > 0) {
      index = (playerTurn - 1) * (numOfDice + 1) + 1;
      while (
        index > (playerTurn - 1) * (numOfDice + 1) &&
        index < playerTurn * (numOfDice + 1)
      ) {
        if (playerRolls[index] == number) {
          highestNum += playerRolls[index];
        }
        index += 1;
      }
      number -= 1;
    }
    finalNumbers.push(Number(highestNum));
    console.log(`final number`, finalNumbers);
    return `Your highest number is <b>${highestNum}</b>`;
  } else if (gameMode == "Lowest Mode") {
    var number = 0;
    var lowestNum = "";
    while (number <= 6) {
      index = (playerTurn - 1) * (numOfDice + 1) + 1;
      while (
        index > (playerTurn - 1) * (numOfDice + 1) &&
        index < playerTurn * (numOfDice + 1)
      ) {
        if (playerRolls[index] == number) {
          lowestNum += playerRolls[index];
        }
        index += 1;
      }
      number += 1;
    }
    finalNumbers.push(Number(lowestNum));
    return `Your lowest number is <b>${lowestNum}</b>`;
  }
};

// Function: Game Phase 2 (Choice - Auto-Generated Combined Number)
var phase2Auto = function () {
  var diceRoll1 = playerRolls[(playerTurn - 1) * 3 + 1];
  var diceRoll2 = playerRolls[(playerTurn - 1) * 3 + 2];
  if (gameMode == "Highest Mode") {
    if (diceRoll1 >= diceRoll2) {
      finalNumbers.push(chosenOrderNum(1, playerRolls));
    } else if (diceRoll2 > diceRoll1) {
      finalNumbers.push(chosenOrderNum(2, playerRolls));
    }
  } else if (gameMode == "Lowest Mode") {
    if (diceRoll1 <= diceRoll2) {
      finalNumbers.push(chosenOrderNum(1, playerRolls));
    } else if (diceRoll2 < diceRoll1) {
      finalNumbers.push(chosenOrderNum(2, playerRolls));
    }
  }
  var message = `Player ${playerTurn}, your number is <b>${
    finalNumbers[playerTurn - 1]
  }</b>`;
  return message;
};

// Function: Game Phase 3 (Conclusion - Highest Number)
var phase3 = function () {
  var message = "";
  var counter = 0;
  while (counter < numOfPlayers) {
    message += `<br>Player ${counter + 1}: <b>${finalNumbers[counter]}</b>`;
    counter += 1;
  }
  var highest = 0;
  var counter2 = 0;
  while (counter2 < numOfPlayers) {
    if (finalNumbers[counter2] >= highest) {
      highest = finalNumbers[counter2];
    }
    counter2 += 1;
  }
  message += `<br><br><b>${highest}</b> is the highest number!`;
  return message;
};

// Function: Game Phase 3 (Conclusion - Lowest Number)
var phase3Lowest = function () {
  var message = "";
  var counter = 0;
  while (counter < numOfPlayers) {
    message += `<br>Player ${counter + 1}: <b>${finalNumbers[counter]}</b>`;
    counter += 1;
  }
  var lowest = finalNumbers[0];
  var counter2 = 0;
  while (counter2 < numOfPlayers) {
    if (finalNumbers[counter2] <= lowest) {
      lowest = finalNumbers[counter2];
    }
    counter2 += 1;
  }
  message += `<br><br><b>${lowest}</b> is the lowest number!`;
  return message;
};

// Function: Reset Back to Phase 1
var reset = function () {
  var counter = 0;
  console.log(`final numbers`, finalNumbers);
  if (scorePlayer.length == 0) {
    while (counter < numOfPlayers) {
      scorePlayer.push(String(counter + 1));
      scorePlayer.push(finalNumbers[counter]);
      counter += 1;
    }
  } else {
    while (counter < numOfPlayers) {
      scorePlayer[counter * 2 + 1] += finalNumbers[counter];
      counter += 1;
    }
  }
  console.log(`final scores`, scorePlayer);
  var message = `<br><br>Press '<b>Submit</b>' to play again!`;
  if (gameMode == "Highest Mode") {
    message += `<br>Alternatively, enter '<b>Lowest Mode</b>' to switch to Lowest Combined Number Mode.`;
  } else if (gameMode == "Lowest Mode") {
    message += `<br>Alternatively, enter '<b>Highest Mode</b>' to switch to Highest Combined Number Mode.`;
  }
  message += `<br><i>*do note that swapping game modes resets the Leaderboard*</i>`;
  message += `<br><br>To try other game modes, change number of players or change number of dice <i>(For Variable Dice Game Mode)</i>, enter '<b>Restart</b>' to return to Home Page.`;
  message += leaderBoard();
  gamePhase = 1;
  playerRolls = [];
  finalNumbers = [];
  return message;
};

// Function: Highest/Lowest Mode Header
var header = function () {
  var message = "";
  if (gameMode == "Highest Mode") {
    message = `<b><u>Highest Combined Number Game Mode</u></b><br>`;
  } else if (gameMode == "Lowest Mode") {
    message = `<b><u>Lowest Combined Number Game Mode</u></b><br>`;
  }
  return message;
};

// Function: Return back to Home Page
var restart = function () {
  gameType = "Choosing Game Type";
  gameMode = "Choosing Game Mode";
  gameState = "Choosing Number of Players";
  autoGenerate = 0;
  numOfDice = 0;
  playerRolls = [];
  finalNumbers = [];
  scorePlayer = [];
  numOfPlayers = 0;
  return `Returning back to Home Page. Press '<b>Submit</b>' to continue...`;
};

//======================================================================================================================================
// MAIN Function
var main = function (input) {
  if (gameState == "Choosing Number of Players") {
    if (input > 1) {
      numOfPlayers = Number(input);
      gameState = "Game";
      return `<b>${numOfPlayers}</b> number of players inputted. Press '<b>Submit</b>' to continue...`;
    }
    return `Welcome to Beat That! To begin, enter '<b>Number of Players</b>' (at least 2).`;
  }

  if (gameState == "Game") {
    var myOutputValue = "";
    // Allows Players to activate/deactivate auto-generate at any point (For Standard version)
    if (input == "Activate Auto-Generate" && autoGenerate == 0) {
      autoGenerate = 1;
      return `The computer <b>will now</b> auto-generate the highest/lowest two-digit number.`;
    } else if (input == "Deactivate Auto-Generate" && autoGenerate == 1) {
      autoGenerate = 0;
      return `The computer <b>will now stop</b> auto-generating the highest/lowest two-digit number.`;
    }

    // Page for Players to select game type (Standard or Variable Dice)
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
          numOfDice = Number(input);
          playerRolls = [];
          gameType = "Variable Dice";
        }
      } else if (gameType == "Choosing Game Type") {
        return `Welcome to Beat That!<br><br>Enter either:<br>1. '<b>Standard</b>' for Standard Beat That! version<br>2. '<b>Variable Dice</b>' for Variable Dice Beat That! version`;
      }
    }

    // Page for Players to select game mode (Highest or Lowest)
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
          scorePlayer = [];
          return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
        } else if (input == "Highest Mode") {
          gameMode = "Highest Mode";
          scorePlayer = [];
          return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b>' to continue...`;
        }
      }
      // 2nd IF: Phase 1 & 2
      else if (playerTurn > 0) {
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
          console.log(`playerTurn`, playerTurn);
          if (playerTurn == numOfPlayers) {
            gamePhase = 3;
            playerTurn = 1;
            myOutputValue += `<br>Press '<b>Submit</b>' to see Final Score.`;
          } else {
            gamePhase = 1;
            playerTurn += 1;
            myOutputValue += `<br>It is now Player ${playerTurn}'s turn. Press '<b>Submit</b>' to continue...`;
          }
        }
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
        scorePlayer = [];
        return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
      } else if (input == "Highest Mode") {
        gameMode = "Highest Mode";
        scorePlayer = [];
        return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b> to continue...`;
      }
    }
    // 2nd IF: Phase 1 & 2
    else if (playerTurn > 0) {
      myOutputValue = header();
      if (gamePhase == 1) {
        myOutputValue += phase1VariableDice();
      } else if (gamePhase == 2) {
        myOutputValue = phase2VariableDice();
        if (playerTurn == numOfPlayers) {
          gamePhase = 3;
          playerTurn = 1;
          myOutputValue += `<br>Press '<b>Submit</b>' to see Final Score.`;
        } else {
          gamePhase = 1;
          playerTurn += 1;
          myOutputValue += `<br>It is now Player ${playerTurn}'s turn. Press '<b>Submit</b>' to continue...`;
        }
      }
    }
  }

  return myOutputValue;
};
