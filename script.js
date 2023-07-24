// BEAT THAT PROJECT Requirements
// There are 2 players and players take turns
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. //
// You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Introduce global variable to distinguish between game, input entry and results modes
var gameMode = "awaiting user input";

// Introduce global variable to distinguish between player 1 and player 2 modes
var playerMode = "no player";

// Define global variables to hold values
var diceRoll1 = 0;
var diceRoll2 = 0;
var player1Num = 0;
var player2Num = 0;

// Function that gets executed when the submit button is clicked
var main = function (input) {
  // Case where new game round starts with Player 1
  if (gameMode === "awaiting user input" && playerMode === "no player") {
    diceRoll1 = rollDice();
    diceRoll2 = rollDice();
    myOutput = `Welcome Player 1. You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br>Choose the order of the dice by typing in 12 or 21.<br>12 denotes that the first dice comes before the second and 21 denotes vice versa.`;
    gameMode = "game time";
    playerMode = "Player 1";
  } // Case after Player 1 provides the order
  else if (gameMode === "game time" && playerMode === "Player 1") {
    if (input === "12") {
      player1Num = Number(String(diceRoll1) + String(diceRoll2));
      myOutput = `Player 1, your number is ${player1Num}`;
      playerMode = "Player 2";
      gameMode = "awaiting user input";
    } else if (input === "21") {
      player1Num = Number(String(diceRoll2) + String(diceRoll1));
      myOutput = `Player 1, your number is ${player1Num}`;
      playerMode = "Player 2";
      gameMode = "awaiting user input";
    } else {
      playerMode = "no player";
      gameMode = "awaiting user input";
      return "Invalid input, the dice will roll again and please type in either 12 or 21.";
    }
  } // Case where game continues with Player 2
  else if (gameMode === "awaiting user input" && playerMode === "Player 2") {
    diceRoll1 = rollDice();
    diceRoll2 = rollDice();
    myOutput = `Welcome Player 2. You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br>Choose the order of the dice by typing in 12 or 21.<br>12 denotes that the first dice comes before the second and 21 denotes vice versa.`;
    gameMode = "game time";
    playerMode = "Player 2";
  } // Case after Player 2 provides the order
  else if (gameMode === "game time" && playerMode === "Player 2") {
    if (input === "12") {
      player2Num = Number(String(diceRoll1) + String(diceRoll2));
      myOutput = `Player 2, your number is ${player2Num}`;
      playerMode = "no player";
      gameMode = "results time";
    } else if (input === "21") {
      player2Num = Number(String(diceRoll2) + String(diceRoll1));
      myOutput = `Player 2, your number is ${player2Num}`;
      playerMode = "no player";
      gameMode = "results time";
    } else {
      playerMode = "Player 2";
      gameMode = "awaiting user input";
      return "Invalid input, the dice will roll again and please type in either 12 or 21.";
    }
  } //Case to compare the numbers for both players and return the outcome
  else if (gameMode === "results time" && playerMode == "no player") {
    playerMode = "no player";
    gameMode = "awaiting user input";
    myOutput = compareValue(player1Num, player2Num);
  }
  return myOutput;
};

// Create helper function for dice roll
var rollDice = function () {
  // produce a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // remove the decimal
  var randomInteger = Math.floor(randomDecimal);
  // add 1 to get a number between 1 and 6 inclusive
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Create helper function to compare both players' diceroll outcomes
var compareValue = function (num1, num2) {
  if (num1 > num2) {
    return `Player 1, you win because your number was ${num1} and it was bigger than the the number for Player 2 which was ${num2}.<br> End of round and click Submit for a new round.`;
  } else if (num2 > num1) {
    return `Player 2, you win because your number was ${num2} and it was bigger than the the number for Player 1 which was ${num1}.<br> End of round and click Submit for a new round.`;
  } else {
    return `It's a tie since both of you got the number ${num1}.<br> End of round and click Submit for a new round.`;
  }
};
