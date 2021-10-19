// Global States
var playerTurn = 1; // 1 = Player 1; 2 = Player 2
var gamePhase = 1; // 1 = Dice Roll; 2 = Choose Order; 3 = Conclusion
var player1Rolls = [];
var player2Rolls = [];
var playerChoice = 0; // If 1, choose 1st numerical; If 2, choose 2nd numerical
var finalNumber1 = 0; // Stores final number for Player 1
var finalNumber2 = 0; // Stores final number for Player 2

// Function: Returns random number from 1 to 6 -inclusive
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNum = randomInteger + 1;
  return diceNum;
};

// Function: Takes user input 1 or 2, to generate combined number's value with chosen 1st numerical
var chosenOrderNum = function (choice, playerRolls) {
  if (choice == 1) {
    chosenNum = Number(String(playerRolls[0]) + String(playerRolls[1]));
  } else if (choice == 2) {
    chosenNum = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }
  return chosenNum;
};

// Function: Takes player number input, to return message on what numbers were rolled
var playerXRolls = function (playerNum) {
  dice1Roll = eval("player" + playerNum + "Rolls[0]");
  dice2Roll = eval("player" + playerNum + "Rolls[1]");
  var message = `You rolled <b>${dice1Roll}</b> for Dice 1 and <b>${dice2Roll}</b> for Dice 2.`;
  return message;
};

// Function: Returns error message for not picking 1 or 2.
var errorMessage = function () {
  return `Please try again. Enter '1' for Dice 1 or '2' for Dice 2.`;
};

var main = function (input) {
  var myOutputValue = "";
  // 1st IF: If game is in Phase 3 (Conclusion)
  if (gamePhase == 3) {
    myOutputValue = `Player 1's number is <b>${finalNumber1}</b> and Player 2's number is <b>${finalNumber2}</b>.<br>`;
    if (finalNumber1 > finalNumber2) {
      myOutputValue += `<b>Player 1 won</b>.`;
    } else if (finalNumber2 > finalNumber1) {
      myOutputValue += `<b>Player 2 won</b>.`;
    } else if (finalNumber1 == finalNumber2) {
      myOutputValue += `<b>It's a draw</b>.`;
    }
    myOutputValue += `<br>Press 'Submit' to play again!`;
    gamePhase = 1;
    player1Rolls = [];
    player2Rolls = [];
  }
  // 2nd IF: If game is in 1st Player's Turn (Phase 1 or 2)
  else if (playerTurn == 1) {
    if (gamePhase == 1) {
      player1Rolls.push(rollDice(), rollDice());
      myOutputValue = `Welcome Player 1.<br>${playerXRolls(
        playerTurn
      )}<br>Choose the order of the dice (1 or 2).`;
      gamePhase = 2;
    } else if (gamePhase == 2) {
      if (input != 1 && input != 2) {
        return (
          errorMessage() +
          `<br>${playerXRolls(
            playerTurn
          )}<br>Choose the order of the dice (1 or 2).`
        );
      }
      playerChoice = input;
      finalNumber1 = chosenOrderNum(playerChoice, player1Rolls);
      myOutputValue = `Player 1, you chose Dice ${playerChoice} first.<br>Your number is <b>${finalNumber1}</b>.<br>It is now Player 2's turn. Press 'Submit' to continue...`;
      playerTurn = 2;
      gamePhase = 1;
    }
  }
  // 3rd IF: If game is in 2nd Player's Turn (Phase 1 or 2)
  else if (playerTurn == 2) {
    if (gamePhase == 1) {
      player2Rolls.push(rollDice(), rollDice());
      myOutputValue = `Welcome Player 2.<br>${playerXRolls(
        playerTurn
      )}<br>Choose the order of the dice (1 or 2).`;
      gamePhase = 2;
    } else if (gamePhase == 2) {
      if (input != 1 && input != 2) {
        return (
          errorMessage() +
          `<br>${playerXRolls(
            playerTurn
          )}<br>Choose the order of the dice (1 or 2).`
        );
      }
      playerChoice = input;
      finalNumber2 = chosenOrderNum(playerChoice, player2Rolls);
      myOutputValue = `Player 2, you chose Dice ${playerChoice} first.<br>Your number is <b>${finalNumber2}</b>.<br>Press 'Submit' to see Final Score.`;
      playerTurn = 1;
      gamePhase = 3;
    }
  }

  return myOutputValue;
};
