// Global Variables
var playerTurn = 1; // 1 = Player 1; 2 = Player 2; ...
var gamePhase = 1; // 1 = Dice Roll; 2 = Choose Order; 2.5(Knockout only) = Player vs Player; 3 = Conclusion
var playerRolls = []; // Contains individual dice rolls for all Players
var finalNumbers = []; // Contains the final chosen numbers for all Players
var scorePlayer = []; // Stores running score for all Players
var gameType = "Choosing Game Type"; // 3 Choices - Standard, Variable Number of Dice or Knockout
var gameMode = "Choosing Game Mode"; // 2 Choices - Highest Mode or Lowest Mode
var autoGenerate = 0; // 0 = No auto-generate; 1 = auto-generate
var numOfDice = 0; // Stores number of dice used for the round
var gameState = "Choosing Number of Players"; // 2 Choices - Choosing Number of Players or Game
var numOfPlayers = 0; // Stores number of players
var knockoutRound = 1; // Stores knockout round (For non-knockout modes, this is replaced by playerTurn to imply round number)
var knockoutGone = []; // Stores players already picked to play

// Function: Returns random number from 1 to X -inclusive
var rollDice = function (num) {
  var randomDecimal = Math.random() * num;
  var randomInteger = Math.floor(randomDecimal);
  var diceNum = randomInteger + 1;
  return diceNum;
};

// Function: Takes user input (Dice) 1 or (Dice) 2 in choice, to generate combined number's value with chosen 1st numerical
var chosenOrderNum = function (choice, rolls) {
  var chosenNum = 0;
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

// Function: Takes in Player X's turn, to return message on what numbers were rolled
var playerXRolls = function (playerNum) {
  var dice1Roll = playerRolls[(playerNum - 1) * 3 + 1];
  var dice2Roll = playerRolls[(playerNum - 1) * 3 + 2];
  var message = `You rolled <b>${dice1Roll}</b> for Dice 1 and <b>${dice2Roll}</b> for Dice 2.`;
  return message;
};

// Function: Returns error message for not picking Dice 1 or 2
var errorMessage = function () {
  return `⛔️ Please try again. Enter '1' for Dice 1 or '2' for Dice 2.<br><br>${playerXRolls(
    playerTurn
  )}<br>Choose the order of the dice (1 or 2).`;
};

// Function: Generates Leaderboard for Standard & Variable Dice Versions (Highest Mode - Highest on top; Lowest Mode - Lowest on top)
var leaderBoard = function () {
  var score = `<br><br><b><u>Leaderboard</u></b> 🎯`;
  var number = 11; // minimum number is 11 as a minimum of 2 dice is required
  var ascendingOrderScores = []; // to store player number and scores in ascending order
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
      score += `<br>Player ${xPlayer}: <b>${xScore}</b>`; // "pop" scores and player numbers from the last element
    }
  } else if (gameMode == "Lowest Mode") {
    var counter = 1;
    while (counter - 1 < numOfPlayers) {
      score += `<br>Player ${ascendingOrderScores[(counter - 1) * 2]}: <b>${
        ascendingOrderScores[(counter - 1) * 2 + 1] // display score in existing ascendingOrderScores array
      }</b>`;
      counter += 1;
    }
  }
  return score;
};

// Function: Game Phase 1 (Roll - Standard)
var phase1 = function () {
  playerRolls.push(String(playerTurn));
  playerRolls.push(rollDice(6));
  playerRolls.push(rollDice(6));
  var message = `Welcome Player ${playerTurn}.<br><br>${playerXRolls(
    playerTurn
  )}`;
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
  var message = `<b>Player ${playerTurn}</b> has rolled... `;
  playerRolls.push(String(playerTurn));
  while (counter < numOfDice) {
    var roll = rollDice(6);
    playerRolls.push(roll);
    message += `<br>Dice ${counter + 1}: ${roll}`;
    counter += 1;
  }
  message += `<br><br>Press '<b>Submit</b>' to see optimal combined number.`;
  gamePhase = 2;
  return message;
};

// Function: Game Phase 1 (Roll - Knockout)
var phase1Knockout = function () {
  knockoutGone.push(playerTurn);
  var message = `Player <b>${playerTurn}</b>, you're up!<br><br>`;
  playerRolls.push(String(playerTurn));
  playerRolls.push(rollDice(6));
  playerRolls.push(rollDice(6));
  var roll1 = playerRolls[(knockoutRound - 1) * 3 + 1];
  var roll2 = playerRolls[(knockoutRound - 1) * 3 + 2];
  message += `You rolled <b>${roll1}</b> for Dice 1 and <b>${roll2}</b> for Dice 2.<br>Choose the order of the dice (1 or 2).`;
  gamePhase = 2;
  return message;
};

// Function: Game Phase 2 (Choice - Standard)
var phase2 = function (choice) {
  finalNumbers.push(chosenOrderNum(choice, playerRolls));
  var message = `Player ${playerTurn}, you chose Dice ${choice} first.<br><br>Your number is <b>${
    finalNumbers[playerTurn - 1]
  }</b>`;
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

// Function: Game Phase 2 (Choice - Knockout)
var phase2Knockout = function (choice) {
  var chosenNum = 0;
  if (choice == 1) {
    chosenNum = Number(
      String(playerRolls[(knockoutRound - 1) * 3 + 1]) +
        String(playerRolls[(knockoutRound - 1) * 3 + 2])
    );
  } else if (choice == 2) {
    chosenNum = Number(
      String(playerRolls[(knockoutRound - 1) * 3 + 2]) +
        String(playerRolls[(knockoutRound - 1) * 3 + 1])
    );
  }
  finalNumbers.push(String(playerTurn));
  finalNumbers.push(chosenNum);
  var message = `Player ${playerTurn}, you chose Dice ${choice} first.<br><br>Your number is <b>${
    finalNumbers[finalNumbers.length - 1]
  }`;
  knockoutRound += 1;
  if (finalNumbers.length == 2) {
    gamePhase = 1;
    playerTurn = rollDice(numOfPlayers);
    while (knockoutGone.includes(playerTurn)) {
      playerTurn = rollDice(numOfPlayers);
    }
    message += `<br><br>It is now <b>Player ${playerTurn}'s</b> turn. Press '<b>Submit</b>' to continue...`;
  } else if (finalNumbers.length == 4) {
    gamePhase = 2.5;
    message += `<br><br>Our 2 contenders are Player <b>${finalNumbers[0]}</b> & Player <b>${finalNumbers[2]}</b>.`;
  } else {
    gamePhase = 1;
  }
  return message;
};

// Function: Game Phase 2.5 (Versus - Knockout)
var phase2Versus = function () {
  var message = `Between Player ${finalNumbers[0]} with <b>${finalNumbers[1]}</b> and Player ${finalNumbers[2]} with <b>
        ${finalNumbers[3]}</b>...`;

  if (finalNumbers[1] == finalNumbers[3]) {
    var randomChance = rollDice(2);
    if (randomChance == 1) {
      finalNumbers = [finalNumbers[0], finalNumbers[1]];
    } else if (randomChance == 2) {
      finalNumbers = [finalNumbers[2], finalNumbers[3]];
    }
    message += `<br>It's a draw! Player <b>${finalNumbers[0]}</b> has been randomly chosen to pass this round!`;
  } else if (gameMode == "Highest Mode") {
    if (finalNumbers[1] > finalNumbers[3]) {
      message += `<br>Player <b>${finalNumbers[0]}</b> wins and has passed this round!`;
      finalNumbers = [finalNumbers[0], finalNumbers[1]];
    } else if (finalNumbers[1] < finalNumbers[3]) {
      message += `<br>Player <b>${finalNumbers[2]}</b> wins and has passed this round!`;
      finalNumbers = [finalNumbers[2], finalNumbers[3]];
    }
  } else if (gameMode == "Lowest Mode") {
    if (finalNumbers[1] < finalNumbers[3]) {
      message += `<br>Player <b>${finalNumbers[0]}</b> wins and has passed this round!`;
      finalNumbers = [finalNumbers[0], finalNumbers[1]];
    } else if (finalNumbers[1] > finalNumbers[3]) {
      message += `<br>Player <b>${finalNumbers[2]}</b> wins and has passed this round!`;
      finalNumbers = [finalNumbers[2], finalNumbers[3]];
    }
  }

  if (knockoutRound - 1 == numOfPlayers) {
    gamePhase = 3;
    message += `<br><br>Press '<b>Submit</b>' to continue to see final results...`;
  } else {
    playerTurn = rollDice(numOfPlayers);
    while (knockoutGone.includes(playerTurn)) {
      playerTurn = rollDice(numOfPlayers);
    }
    gamePhase = 1;
    message += `<br><br>It is now <b>Player ${playerTurn}'s</b> turn. Press '<b>Submit</b>' to continue...`;
  }
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
  message += `<br><br><b>${highest}</b> is the highest number! 🎉🎉🎉`;
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
  message += `<br><br><b>${lowest}</b> is the lowest number! 🎉🎉🎉`;
  return message;
};

// Function: Reset Back to Phase 1 (For Standard and Variable Dice Versions)
var reset = function () {
  var counter = 0;
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
  var message = `<br><br>Press '<b>Submit</b>' to play again!`;
  if (gameMode == "Highest Mode") {
    message += `<br>Alternatively, enter '<b>Lowest Mode</b>' to switch to Lowest Combined Number Mode. ⬇️`;
  } else if (gameMode == "Lowest Mode") {
    message += `<br>Alternatively, enter '<b>Highest Mode</b>' to switch to Highest Combined Number Mode. ⬆️`;
  }
  message += `<br><i>*do note that swapping game modes resets the Leaderboard*</i>`;
  message += `<br><br>To try other game modes, change number of players or change number of dice <i>(For Variable Dice Game Mode)</i>, enter '<b>Restart</b>' to return to Starting Home Page. 🏡`;
  message += leaderBoard();
  gamePhase = 1;
  playerRolls = [];
  finalNumbers = [];
  return message;
};

// Function: Reset Back to Phase 1 (For Knockout Version)
var resetKnockout = function () {
  var message = `<br>👏🏼<b>Player ${finalNumbers[0]} with ${finalNumbers[1]} is the ULTIMATE WINNER!</b>👏🏼`;

  message += `<br><br>Press '<b>Submit</b>' to play again!`;
  if (gameMode == "Highest Mode") {
    message += `<br>Alternatively, enter '<b>Lowest Mode</b>' to switch to Lowest Combined Number Mode. ⬇️`;
  } else if (gameMode == "Lowest Mode") {
    message += `<br>Alternatively, enter '<b>Highest Mode</b>' to switch to Highest Combined Number Mode. ⬆️`;
  }
  message += `<br><br>To try other game modes, change number of players or change number of dice <i>(For Variable Dice Game Mode)</i>, enter '<b>Restart</b>' to return to Starting Home Page. 🏡`;

  gamePhase = 1;
  knockoutGone = [];
  knockoutRound = 1;
  playerRolls = [];
  finalNumbers = [];
  return message;
};

// Function: Highest/Lowest Mode Header
var header = function () {
  var message = "";
  if (gameMode == "Highest Mode") {
    message = `<b><u>Highest Combined Number Game Mode</u></b> ⬆️<br>`;
  } else if (gameMode == "Lowest Mode") {
    message = `<b><u>Lowest Combined Number Game Mode</u></b> ⬇️<br>`;
  }
  return message;
};

// Function: Option to Restart or Change Game Mode (Highest/Lowest)
var endGameOptions = function (choice) {
  if (choice == "Restart") {
    return restart();
  } else if (choice == "Lowest Mode") {
    gameMode = "Lowest Mode";
    scorePlayer = [];
    return `Welcome to '<b>Lowest Combined Number Mode</b>'. The player with the lowest combined number wins. Press '<b>Submit</b>' to continue...`;
  } else if (choice == "Highest Mode") {
    gameMode = "Highest Mode";
    scorePlayer = [];
    return `Welcome to '<b>Highest Combined Number Mode</b>'. The player with the highest combined number wins. Press '<b>Submit</b>' to continue...`;
  }
};

// Function: Return back to Starting Home Page
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
  playerTurn = 1;
  gamePhase = 1;
  return `Returning back to Starting Home Page 🏡. Press '<b>Submit</b>' to continue...`;
};

//============================MAIN Function====================================
var main = function (input) {
  if (gameState == "Choosing Number of Players") {
    if (input > 1) {
      numOfPlayers = Number(input);
      gameState = "Game";
      return `You have entered <b>${numOfPlayers}</b> number of players. Press '<b>Submit</b>' to continue...`;
    }
    return `Welcome to Beat That! 🤜🏼🤛🏼<br><br>To begin, enter '<b>Number of Players</b>' (at least 2).`;
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
        return `Welcome to Beat That! <b>Standard Version</b> 🔰.<br><br>Press '<b>Submit</b>' to select between Highest or Lowest Combined Number Mode.`;
      } else if (input == "Variable Dice") {
        gameType = "Variable Dice - Choosing Dice Number";
        return `Welcome to Beat That! <b>Variable Dice Version</b> 🎲🎲🎲.<br><br>Press enter <b>number of dice</b> you wish to use (at least 2).`;
      } else if (gameType == "Variable Dice - Choosing Dice Number") {
        if (input < 2) {
          return `⛔️ Please input <b>number of dice</b> you wish to use (at least 2).`;
        } else {
          numOfDice = Number(input);
          playerRolls = [];
          gameType = "Variable Dice";
        }
      } else if (input == "Knockout") {
        if (numOfPlayers < 3) {
          return `Sorry, Knockout can only be played with more than 2 players, please enter '<b>Restart</b>' to change the number of players.`;
        } else gameType = "Knockout";
        playerTurn = rollDice(numOfPlayers);
        return `Welcome to Beat That! <b>Knockout Version 💥</b>.<br><br>Press '<b>Submit</b>' to select between Highest or Lowest Combined Number Mode.`;
      } else if (input == "Restart") {
        return restart();
      } else if (gameType == "Choosing Game Type") {
        return `Welcome to Beat That! 🤜🏼🤛🏼<br><br>Enter either:<br>1. '<b>Standard</b>' for Standard Beat That! Version 🔰<br>2. '<b>Variable Dice</b>' for Variable Dice Beat That! Version 🎲🎲🎲<br>3. '<b>Knockout</b>' for Knockout Beat That! Version 💥<i>(3 or more players)</i>`;
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
        return `Enter either:<br>1. '<b>Highest Mode</b>' for Highest Combined Number Game Mode ⬆️<br>2. '<b>Lowest Mode</b>' for Lowest Combined Number Game Mode ⬇️`;
      }
    }

    // Standard Beat That! Version
    if (gameType == "Standard") {
      // Phase 3: Conclusion - Standard
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
        return endGameOptions(input);
      } else {
        myOutputValue = header();
        // Phase 1: Roll - Standard
        if (gamePhase == 1) {
          myOutputValue += phase1();
        }
        // Phase 2: Choice - Standard
        else if (gamePhase == 2) {
          if (autoGenerate == 0) {
            // Input Validation: Check if number entered is either 1 or 2
            if (input != 1 && input != 2) {
              return header() + errorMessage();
            }
            myOutputValue += phase2(input);
          } else if (autoGenerate == 1) {
            myOutputValue += phase2Auto();
          }
          if (playerTurn == numOfPlayers) {
            gamePhase = 3;
            playerTurn = 1;
            myOutputValue += `<br><br>Press '<b>Submit</b>' to see Final Score.`;
          } else {
            gamePhase = 1;
            playerTurn += 1;
            myOutputValue += `<br><br>It is now Player ${playerTurn}'s turn. Press '<b>Submit</b>' to continue...`;
          }
        }
      }
    }

    // Variable Dice Beat That! Version
    if (gameType == "Variable Dice") {
      // Phase 3: Conclusion - Variable Dice
      if (gamePhase == 3 && gameMode == "Highest Mode") {
        myOutputValue = header();
        myOutputValue += phase3();
        myOutputValue += reset();
      } else if (gamePhase == 3 && gameMode == "Lowest Mode") {
        myOutputValue = header();
        myOutputValue += phase3Lowest();
        myOutputValue += reset();
      }
      // Option for Players to swap game modes between Highest Mode and Lowest Mode after every round or return to Starting Home Page
      else if (
        gamePhase == 1 &&
        ((gameMode == "Highest Mode" && input == "Lowest Mode") ||
          (gameMode == "Lowest Mode" && input == "Highest Mode") ||
          input == "Restart")
      ) {
        return endGameOptions(input);
      } else {
        myOutputValue = header();
        // Phase 1: Roll - Variable Dice
        if (gamePhase == 1) {
          myOutputValue += phase1VariableDice();
        }
        // Phase 2: Choice - Variable Dice
        else if (gamePhase == 2) {
          myOutputValue = phase2VariableDice();
          if (playerTurn == numOfPlayers) {
            gamePhase = 3;
            playerTurn = 1;
            myOutputValue += `<br><br>Press '<b>Submit</b>' to see Final Score.`;
          } else {
            gamePhase = 1;
            playerTurn += 1;
            myOutputValue += `<br><br>It is now Player ${playerTurn}'s turn. Press '<b>Submit</b>' to continue...`;
          }
        }
      }
    }
    // Knockout Beat That! Version
    if (gameType == "Knockout") {
      console.log(`final numbers`, finalNumbers);
      myOutputValue = header();
      // Phase 3: Conclusion - Knockout
      if (gamePhase == 3) {
        myOutputValue += resetKnockout();
      } else if (
        gamePhase == 1 &&
        ((gameMode == "Highest Mode" && input == "Lowest Mode") ||
          (gameMode == "Lowest Mode" && input == "Highest Mode") ||
          input == "Restart")
      ) {
        return endGameOptions(input);
      }
      // Phase 2.5: Versus - Knockout
      else if (gamePhase == 2.5) {
        myOutputValue += phase2Versus();
      }
      // Phase 1: Roll - Knockout
      else if (gamePhase == 1) {
        myOutputValue += phase1Knockout();
      }
      // Phase 2: Choice - Knockout
      else if (gamePhase == 2) {
        // Input Validation: Check if number entered is either 1 or 2
        if (input != 1 && input != 2) {
          return (
            header() +
            `⛔️ Please try again. Enter '1' for Dice 1 or '2' for Dice 2.<br><br>You rolled <b>${
              playerRolls[(knockoutRound - 1) * 3 + 1]
            }</b> for Dice 1 and <b>${
              playerRolls[(knockoutRound - 1) * 3 + 2]
            }</b> for Dice 2.<br>Choose the order of the dice (1 or 2).`
          );
        }
        myOutputValue += phase2Knockout(input);
      }
    }
  }

  return myOutputValue;
};
