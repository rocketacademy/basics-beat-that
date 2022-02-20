/*
Game beat-that: simple dual game comparing dice throws
1. There are 2 players and players take turns.

2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

4. After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/
var gameState = "";
var playerOneRolls = [];
var playerTwoRolls = [];

//six-sided dice
var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal) + 1;
  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger;
  console.log("diceNumber:", diceNumber);
  return diceNumber;
};

var rollDiceForPlayerOne = function () {
  console.log("Check two dice rolled for player one");
  var counter = 0;
  while (counter < 2) {
    playerOneRolls.push(rollDice());
    counter += 1;
  }
  return playerOneRolls;
};

var rollDiceForPlayerTwo = function () {
  console.log("Check two dice rolled for player two");
  var counter = 0;
  while (counter < 2) {
    playerTwoRolls.push(rollDice());
    counter += 1;
  }
  return playerTwoRolls;
};

var maximiseDigitOutputs = function (numberArray) {
  console.log("Check that numbers are rearranged");
  var firstNumber = numberArray.pop();
  var secondNumber = numberArray.pop();
  var playerScore = 0;
  if (firstNumber >= secondNumber) {
    playerScore = Number(String(firstNumber) + String(secondNumber));
    console.log("First number rolled is larger!");
    return playerScore;
  } else {
    playerScore = Number(String(secondNumber) + String(firstNumber));
    console.log("Second number rolled is larger!");
    return playerScore;
  }
};

var main = function (input) {
  var myOutputValue = "";
  var playerOneScore = maximiseDigitOutputs(rollDiceForPlayerOne());
  var playerTwoScore = maximiseDigitOutputs(rollDiceForPlayerTwo());
  if (playerOneScore == playerTwoScore) {
    myOutputValue = "Draw! Roll again!";
  }
  if (playerOneScore > playerTwoScore) {
    myOutputValue =
      "Player One Wins! Player One Scores: " +
      playerOneScore +
      " Player Two Scores: " +
      playerTwoScore;
  } else {
    myOutputValue =
      "Player Two Wins! Player One Scores: " +
      playerOneScore +
      " Player Two Scores: " +
      playerTwoScore;
  }
  console.log("check roll", rollDice());
  return myOutputValue;
};
