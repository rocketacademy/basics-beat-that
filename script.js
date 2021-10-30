//Base
// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
var gameDiceRoll = "Game Dice Roll";
var diceSelect = "Dice Selection";
var gameMode = gameDiceRoll;
var winner = "Determine the Winner";

var currPlayer = 1;

var diceRolled = [];
var player1Results = "";
var player2Results = "";

var rollDice = function () {
  var diceNum = Math.floor(Math.random() * 6 + 1);
  return diceNum;
};

var arrayToNum = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var main = function (input) {
  if (gameMode == gameDiceRoll) {
    gameMode = diceSelect;
    diceRolled = [rollDice(), rollDice()];
    console.log(diceRolled);
    return (
      "Welcome Player " +
      currPlayer +
      ". <br> You rolled " +
      diceRolled[0] +
      " for Dice 1 and " +
      diceRolled[1] +
      " for Dice 2. <br> Choose the order of the dice."
    );
  }

  if (gameMode == diceSelect) {
    if (currPlayer == 1) {
      if (input == 1) {
        player1Results = arrayToNum(diceRolled[0], diceRolled[1]);
      } else {
        player1Results = arrayToNum(diceRolled[1], diceRolled[0]);
      }
      gameMode = gameDiceRoll;
      currPlayer = 2;
      return (
        "Player 1, you choose Dice " +
        input +
        " first.<br> Your number is " +
        player1Results +
        ".<br>It is now Player 2's turn. Please press 'Submit'."
      );
    }
    if (currPlayer == 2) {
      if (input == 1) {
        player2Results = arrayToNum(diceRolled[0], diceRolled[1]);
      } else {
        player2Results = arrayToNum(diceRolled[1], diceRolled[0]);
      }
      gameMode = winner;
      return (
        "Player 2, you choose Dice " +
        input +
        " first.<br> Your number is " +
        player2Results +
        ".<br>Please press 'Submit' to determine the Winner."
      );
    }
  }

  if (gameMode == winner) {
    gameMode = gameDiceRoll;
    currPlayer = 1;
    if (player1Results > player2Results) {
      return (
        "Player 1's number is " +
        player1Results +
        ".<br>Player 2's number is " +
        player2Results +
        ".<br>Player 1 Wins!"
      );
    } else {
      return (
        "Player 2's number is " +
        player2Results +
        ".<br>Player 1's number is " +
        player1Results +
        ".<br>Player 2 Wins!"
      );
    }
  }
};
