/*
1. There are 2 players and players take turns.

2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

4. After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

// Global variables
var currentMode = "Roll the dice";
var myOutputValue = "";
var player = "Player 1";
var player1Results = "";
var player2Results = "";

// Generate dices
var diceRollGenerator = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceRoll = Math.floor(randomDecimal) + 1;
  return randomDiceRoll;
};

// Specifying the 2 dices
var diceRoll1 = diceRollGenerator();
var diceRoll2 = diceRollGenerator();

var orderOfDice = function (input) {
  if (input == 1) {
    return `Your number is ${diceRoll1}${diceRoll2}`;
  }
  if (input == 2) {
    return `Your number is ${diceRoll2}${diceRoll1}`;
  }
};

var main = function (input) {
  if (currentMode == "Roll the dice") {
    diceRoll1 = diceRollGenerator();
    diceRoll2 = diceRollGenerator();
    myOutputValue = `Dice 1 rolled ${diceRoll1} and Dice 2 rolled ${diceRoll2}. <br><br> Please input 1 or 2 to choose the order of your dice roll.`;
    currentMode = "Dice rolled";
  } else if (currentMode == "Dice rolled" && player == "Player 1") {
    player1Results = orderOfDice(input);
    myOutputValue =
      "Player 1: " +
      player1Results +
      "<br><br>" +
      "Player 2: It is now your turn to roll the dice.<br><br> Press enter to begin.";
    currentMode = "Roll the dice";
    player = "Player 2";
  } else if (currentMode == "Dice rolled" && player == "Player 2") {
    player2Results = orderOfDice(input);
    myOutputValue = player2Results;
    currentMode = "End";
    player = "results";
  }
  if (currentMode == "End" && player == "results") {
    myOutputValue =
      " Player 1: " +
      player1Results +
      "<br><br>" +
      "Plkayer 2: " +
      player2Results;
    player = "End play";
  }
  if (player1Results > player2Results && player == "End play") {
    myOutputValue =
      " Player 1: " +
      player1Results +
      "<br><br>" +
      "Player 2: " +
      player2Results +
      ". <br><br> Player 1 wins!";
  } else if (player2Results > player1Results && player == "End play") {
    myOutputValue =
      " Player 1: " +
      player1Results +
      "<br><br>" +
      "Plkayer 2: " +
      player2Results +
      ". <br><br> Player 2 wins!";
  }
  return myOutputValue;
};
