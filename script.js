var firstMode = "Player rolls dice";
var secondMode = "Player select combination";
var gameMode = firstMode;

var rollDiceFirst = "";
var rollDiceSecond = "";

var counter = 1;
var numberOfPlayers = 2;
var playersArray = [];

var main = function (input) {
  while (counter <= numberOfPlayers) {
    var player = "Player ";
    if (gameMode == firstMode) {
      player += counter;
      rollDiceFirst = rollDice();
      rollDiceSecond = rollDice();
      gameMode = secondMode; // Change game mode to First Mode
      myOutputValue =
        "Welcome " +
        player +
        ".<br >You rolled " +
        rollDiceFirst +
        " for Dice 1 and " +
        rollDiceSecond +
        " for Dice 2.<br >Choose the order of the dice.";
      return myOutputValue;
    } else if (gameMode == secondMode) {
      player += counter;
      if (input == "Dice 1") {
        rollDiceCombi = Number(rollDiceFirst + "" + rollDiceSecond);
      } else {
        rollDiceCombi = Number(rollDiceSecond + "" + rollDiceFirst);
      }
      playersArray.push(rollDiceCombi);
      myOutputValue =
        player +
        ", you chose " +
        input +
        " first. Your number is " +
        rollDiceCombi +
        ".<br >";
      gameMode = firstMode; // Reset game mode to First Mode
      counter = counter + 1;
      if (counter == 2) {
        myOutputValue +=
          "It is now Player " +
          counter +
          "'s turn. Please trigger Submit to continue."; // complicating myOutputValue because life is not complicated enough.
        return myOutputValue;
      }
    }
    myOutputValue =
      compareDiceRoll(playersArray[0], playersArray[1]) +
      "The rolls by Player 1 and Player 2 were respectively: " +
      playersArray;
  }
  return myOutputValue;
};

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);
  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var compareDiceRoll = function (playerOneRoll, playerTwoRoll) {
  var compareDiceRollResults = "";
  if (playerOneRoll == playerTwoRoll) {
    compareDiceRollResults = "Both players draw!<br >";
  } else if (playerOneRoll > playerTwoRoll) {
    compareDiceRollResults = "Player 1 wins!<br >";
  } else {
    compareDiceRollResults = "Player 2 wins!<br >";
  }
  return compareDiceRollResults;
};
