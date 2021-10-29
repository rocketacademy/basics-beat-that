// Only applicale for 2 player and 2 dice game

// Global Variable
var GAME_MODE_ROLL_DICE = "GAME_MODE_ROLL_DICE";
var GAME_MODE_SELECT_ORDER = "GAME_MODE_SELECT_ORDER";
var GAME_MODE_HIGHEST_COMBINED_NUMBER = "GAME_MODE_HIGHEST_COMBINED_NUMBER";
var GAME_MODE_LOWEST_COMBINED_NUMBER = "GAME_MODE_LOWEST_COMBINED_NUMBER";

var player1 = [];
var player2 = [];
var playersTurn = 1;
var playerAction = GAME_MODE_ROLL_DICE;
var gameMode = null;
var player1Selection = 0;
var player2Selection = 0;
var player1Score = 0;
var player2Score = 0;

var main = function (input) {
  // Local Variable
  var player2Output = "";

  // Game mode selection
  if (!gameMode) {
    if (input == "highest number") {
      gameMode = GAME_MODE_HIGHEST_COMBINED_NUMBER;
      return "Highest number game mode selected <br> Highest number wins <br> Player 1 starts <br><br> Click submit to start rolling";
    } else if (input == "lowest number") {
      gameMode = GAME_MODE_LOWEST_COMBINED_NUMBER;
      return "Lowest number game mode selected <br> Lowest number wins <br> Player 1 starts <br><br> Click submit to start rolling";
    } else {
      return "Please enter 'highest number' mode or 'lowest number' mode";
    }
  }

  // Change game mode
  if (input.includes("game mode: ")) {
    if (input.includes("highest number")) {
      getReset();
      gameMode = GAME_MODE_HIGHEST_COMBINED_NUMBER;
      return "You have chosen highest number gamemode";
    } else if (input.includes("lowest number")) {
      getReset();
      gameMode = GAME_MODE_LOWEST_COMBINED_NUMBER;
      return "You have chosen lowest number gamemode";
    }
  }

  if (gameMode === GAME_MODE_HIGHEST_COMBINED_NUMBER) {
    // Roll Dice mode
    if (playerAction === GAME_MODE_ROLL_DICE) {
      if (playersTurn === 1) {
        for (var dices = 0; dices < 2; dices += 1) {
          var rolledDiceNumber = rollDice();
          player1.push(rolledDiceNumber);
        }
        playerAction = GAME_MODE_SELECT_ORDER;
        return `Welcome Player 1. <br>
                You rolled ${player1[0]} for Dice 1 and ${player1[1]} for Dice 2. <br>
                Choose the order of the dice.`;
      } else {
        for (var dices = 0; dices < 2; dices += 1) {
          var rolledDiceNumber = rollDice();
          player2.push(rolledDiceNumber);
        }
        playerAction = GAME_MODE_SELECT_ORDER;
        return `Welcome Player 2. <br>
                You rolled ${player2[0]} for Dice 1 and ${player2[1]} for Dice 2. <br>
                Choose the order of the dice.`;
      }
    }

    // Select Order mode
    // if (playerAction === GAME_MODE_SELECT_ORDER) {
    //   if ((input == 1 || input == 2) && playersTurn === 1) {
    //     player1Selection = getOrder(input);
    //     playerAction = GAME_MODE_ROLL_DICE;
    //     return `Player 1, you chose Dice ${input} first. <br>
    //     Your number is ${player1Selection}. <br>
    //     It is now Player 2's turn.`;
    //   } else if ((input == 1 || input == 2) && playersTurn === 2) {
    //     player2Selection = getOrder(input);
    //     playerAction = GAME_MODE_ROLL_DICE;
    //     player2Output = `Player 2, you chose Dice ${input} first. <br>
    //     Your number is ${player2Selection}.`;
    //   } else {
    //     return "Please enter 1 or 2 only";
    //   }
    // }

    if (playerAction === GAME_MODE_SELECT_ORDER) {
      if (playersTurn === 1) {
        player1Selection = getOrder();
        playerAction = GAME_MODE_ROLL_DICE;
        return `Player 1, you chose Dice ${input} first. <br>
        Your number is ${player1Selection}. <br>
        It is now Player 2's turn.`;
      } else if (playersTurn === 2) {
        player2Selection = getOrder();
        playerAction = GAME_MODE_ROLL_DICE;
        player2Output = `Player 2, you chose Dice ${input} first. <br>
        Your number is ${player2Selection}.`;
      }
    }

    var winnerOutput = getHighestNumWinner(player1Selection, player2Selection);
  }

  if (gameMode === GAME_MODE_LOWEST_COMBINED_NUMBER) {
    // Roll Dice mode
    if (playerAction === GAME_MODE_ROLL_DICE) {
      if (playersTurn === 1) {
        for (var dices = 0; dices < 2; dices += 1) {
          var rolledDiceNumber = rollDice();
          player1.push(rolledDiceNumber);
        }
        playerAction = GAME_MODE_SELECT_ORDER;
        return `Welcome Player 1. <br>
        You rolled ${player1[0]} for Dice 1 and ${player1[1]} for Dice 2. <br>
        Choose the order of the dice.`;
      } else {
        for (var dices = 0; dices < 2; dices += 1) {
          var rolledDiceNumber = rollDice();
          player2.push(rolledDiceNumber);
        }
        playerAction = GAME_MODE_SELECT_ORDER;
        return `Welcome Player 2. <br>
        You rolled ${player2[0]} for Dice 1 and ${player2[1]} for Dice 2. <br>
        Choose the order of the dice.`;
      }
    }

    // Select Order mode
    // if (playerAction === GAME_MODE_SELECT_ORDER) {
    //   if ((input == 1 || input == 2) && playersTurn === 1) {
    //     player1Selection = getOrder(input);
    //     playerAction = GAME_MODE_ROLL_DICE;
    //     return `Player 1, you chose Dice ${input} first. <br>
    //     Your number is ${player1Selection}. <br>
    //     It is now Player 2's turn.`;
    //   } else if ((input == 1 || input == 2) && playersTurn === 2) {
    //     player2Selection = getOrder(input);
    //     playerAction = GAME_MODE_ROLL_DICE;
    //     player2Output = `Player 2, you chose Dice ${input} first. <br>
    //     Your number is ${player2Selection}.`;
    //   } else {
    //     return "Please enter 1 or 2 only";
    //   }
    // }

    if (playerAction === GAME_MODE_SELECT_ORDER) {
      if (playersTurn === 1) {
        player1Selection = getOrder();
        playerAction = GAME_MODE_ROLL_DICE;
        return `Player 1, you chose Dice ${input} first. <br>
        Your number is ${player1Selection}. <br>
        It is now Player 2's turn.`;
      } else if (playersTurn === 2) {
        player2Selection = getOrder();
        playerAction = GAME_MODE_ROLL_DICE;
        player2Output = `Player 2, you chose Dice ${input} first. <br>
        Your number is ${player2Selection}.`;
      }
    }

    var winnerOutput = getLowestNumWinner(player1Selection, player2Selection);
  }

  // Reset game
  getReset();

  var scoreboard = getLeaderboard();
  var myOutputValue = `${player2Output} <br>
                      ${winnerOutput} <br>
                      Player 1: ${player1Selection} | Player 2: ${player2Selection} <br><br>
                      ${scoreboard} <br><br>
                      Click submit to start the game again`;

  return myOutputValue;
};

////////////////////// Functions ////////////////////////////////
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

/*var getOrder = function (userInput) {
  if (playersTurn == 1) {
    if (userInput == 1) {
      playerNumber = combineValue(player1[0], player1[1]);
    } else if (userInput == 2) {
      playerNumber = combineValue(player1[1], player1[0]);
    }
    playersTurn = 2;
  } else {
    if (userInput == 1) {
      playerNumber = combineValue(player2[0], player2[1]);
    } else if (userInput == 2) {
      playerNumber = combineValue(player2[1], player2[0]);
    }
  }
  return Number(playerNumber);
};*/

var combineValue = function (num1, num2) {
  var playerOrder = `${num1}${num2}`;
  return playerOrder;
};

var getHighestNumWinner = function (player1Number, player2Number) {
  if (player1Number > player2Number) {
    player1Score += 1;
    return "Player 1 won this round";
  } else if (player1Number < player2Number) {
    player2Score += 1;
    return "Player 2 won this round";
  } else {
    return "It's a draw!";
  }
};

var getLowestNumWinner = function (player1Number, player2Number) {
  if (player1Number < player2Number) {
    player1Score += 1;
    return "Player 1 won this round";
  } else if (player1Number > player2Number) {
    player2Score += 1;
    return "Player 2 won this round";
  } else {
    return "It's a draw!";
  }
};

var getReset = function () {
  player1 = [];
  player2 = [];
  playersTurn = 1;
  playerAction = GAME_MODE_ROLL_DICE;
};

var getLeaderboard = function () {
  if (player1Score > player2Score) {
    return `Leaderboard: <br>
            1. Player 1: ${player1Score}Pts <br>
            2. Player 2: ${player2Score}Pts`;
  } else if (player1Score < player2Score) {
    return `Leaderboard: <br>
            1. Player 2: ${player2Score}Pts <br>
            2. Player 1: ${player1Score}Pts`;
  } else {
    return `Leaderboard: <br>
            1. Player 1: ${player1Score}Pts <br>
            1. Player 2: ${player2Score}Pts`;
  }
};

var generateNumber = function (turn) {
  if (gameMode === GAME_MODE_HIGHEST_COMBINED_NUMBER) {
    var firstNum = Math.max(...turn);
    var secondNum = Math.min(...turn);
    var playerNumber = combineValue(firstNum, secondNum);
    return playerNumber;
  } else if (gameMode === GAME_MODE_LOWEST_COMBINED_NUMBER) {
    var firstNum = Math.min(...turn);
    var secondNum = Math.max(...turn);
    var playerNumber = combineValue(firstNum, secondNum);
    return playerNumber;
  }
};

var getOrder = function () {
  if (playersTurn == 1) {
    var turn = player1;
    playerNumber = generateNumber(turn);
    playersTurn = 2;
  } else {
    turn = player2;
    playerNumber = generateNumber(turn);
  }
  return Number(playerNumber);
};
