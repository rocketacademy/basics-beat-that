var mode = "ROLL_DICE";
var currentPlayer = 1;
var newDiceRolls;
var playerScore = [];
var scoreBoard = [];

// Generate random dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// 2 dice roll
var getDiceRoll = function () {
  return [diceRoll(), diceRoll()];
};

// combine dice rolls
var twoDiceRoll = function (roll1, roll2) {
  return Number(String(roll1) + String(roll2));
};

// decided dice roll position
var playerDiceRoll = function (input) {
  if (input == 1) {
    playerNumber = twoDiceRoll(newDiceRolls[0], newDiceRolls[1]);
  } else {
    playerNumber = twoDiceRoll(newDiceRolls[1], newDiceRolls[0]);
  }
  return playerNumber;
};

// decides winner
var compareScore = function () {
  if (playerScore[0] > playerScore[1]) {
    return `Player 1 wins.`;
  } else if (playerScore[0] == playerScore[1]) {
    return `Draw!`;
  } else {
    return `Player 2 wins.`;
  }
};

// scoreboard
var getScoreBoard = function () {
  if (playerScore[0] > playerScore[1]) {
    scoreBoard.push(
      `Player 1 win ${playerScore[0]}, Player 2 lose: ${playerScore[1]}`
    );
  } else {
    scoreBoard.push(
      `Player 2 wins: ${playerScore[1]}, Player 1 lose: ${playerScore[0]}`
    );
  }
};

var main = function (input) {
  if (mode === "ROLL_DICE") {
    newDiceRolls = getDiceRoll();
    mode = "SELECT_DICE";
    return `Welcome Player ${currentPlayer}.
    <br>
    <br>You rolled:
    <br>Dice 1 - ${newDiceRolls[0]}
    <br>Dice 2 - ${newDiceRolls[1]}
    <br>
    <br>Choose the order of the dice.`;
  }
  if (mode === "SELECT_DICE") {
    if (input == "1" || input == "2") {
      var playerNumber = playerDiceRoll(input);
      playerScore.push(playerNumber);
      mode = "ROLL_DICE";
      currentPlayer++;

      if (currentPlayer > 2) {
        var output = compareScore();
        getScoreBoard();
        output += "<br><br>Scoreboard:<br>";

        for (var i = 0; i < scoreBoard.length; i++) {
          output += `<br>${i + 1}. ${scoreBoard[i]}`;
        }

        currentPlayer = 1;
        playerScore = [];
        mode = "ROLL_DICE";
        return output;
      } else {
        return `Player ${currentPlayer - 1}, you chose Dice ${input} first.
        <br>
        <br>Your number is ${playerNumber}.
        <br>
        <br>It is now Player ${currentPlayer}'s turn.`;
      }
    } else {
      return `Please input 1 or 2.`;
    }
  }
};
