// Global Variable
var GAME_MODE_ROLL_DICE = "GAME_MODE_ROLL_DICE";
var GAME_MODE_SELECT_ORDER = "GAME_MODE_SELECT_ORDER";

var player1 = [];
var player2 = [];
var playersTurn = 1;
var gameMode = GAME_MODE_ROLL_DICE;
var player1Selection = 0;
var player2Selection = 0;

var main = function (input) {
  // Local Variable
  var player2Output = "";

  // Roll Dice mode
  if (gameMode === GAME_MODE_ROLL_DICE) {
    if (playersTurn === 1) {
      for (var dices = 0; dices < 2; dices += 1) {
        var rolledDiceNumber = rollDice();
        player1.push(rolledDiceNumber);
      }
      gameMode = GAME_MODE_SELECT_ORDER;
      return `Welcome Player 1. <br>
              You rolled ${player1[0]} for Dice 1 and ${player1[1]} for Dice 2. <br>
              Choose the order of the dice.`;
    } else {
      for (var dices = 0; dices < 2; dices += 1) {
        var rolledDiceNumber = rollDice();
        player2.push(rolledDiceNumber);
      }
      gameMode = GAME_MODE_SELECT_ORDER;
      return `Welcome Player 2. <br>
              You rolled ${player2[0]} for Dice 1 and ${player2[1]} for Dice 2. <br>
              Choose the order of the dice.`;
    }
  }

  // Select Order mode
  if (gameMode === GAME_MODE_SELECT_ORDER) {
    if ((input == 1 || input == 2) && playersTurn === 1) {
      player1Selection = getOrder(input);
      gameMode = GAME_MODE_ROLL_DICE;
      return `Player 1, you chose Dice ${input} first. <br>
              Your number is ${player1Selection}. <br>
              It is now Player 2's turn.`;
    } else if ((input == 1 || input == 2) && playersTurn === 2) {
      player2Selection = getOrder(input);
      gameMode = GAME_MODE_ROLL_DICE;
      player2Output = `Player 2, you chose Dice ${input} first. <br>
                      Your number is ${player2Selection}.`;
    } else {
      return "Please enter 1 or 2 only";
    }
  }

  // Reset game
  getReset();

  var winnerOutput = getWinner(player1Selection, player2Selection);
  var myOutputValue = `${player2Output} <br>
                      ${winnerOutput} <br>
                      Player 1: ${player1Selection} | Player 2: ${player2Selection} <br><br>
                      Click submit to start the game again`;

  return myOutputValue;
};

////////////////////// Functions ////////////////////////////////
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

var getOrder = function (userInput) {
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
};

var combineValue = function (num1, num2) {
  var playerOrder = `${num1}${num2}`;
  return playerOrder;
};

var getWinner = function (player1Number, player2Number) {
  if (player1Number > player2Number) {
    return "Player 1 won";
  } else if (player1Number < player2Number) {
    return "Player 2 won";
  }
};

var getReset = function () {
  player1 = [];
  player2 = [];
  playersTurn = 1;
  gameMode = GAME_MODE_ROLL_DICE;
};
