var PlayerOne = [];
var playerTwo = [];

// Game modes
var gameModeDiceRoll = "game mode dice roll player 1";
var gameModeChooseDice = "game mode choose dice";

// Game mode 1 roll dice
var mode = gameModeDiceRoll;

// generate dice number from 1-6
var diceRoll = function () {
  var randomDiceRoll = Math.ceil(Math.random() * 6);
  return randomDiceRoll;
};
// player to get random number

var main = function (input) {
  if (mode == gameModeDiceRoll) {
    playerOne = [diceRoll(), diceRoll()];
    console.log(playerOne);
    myOutputValue =
      "Welcome Player 1." +
      "<br>" +
      "You rolled " +
      playerOne[0] +
      " for Dice 1 and " +
      playerOne[1] +
      " for Dice 2. Please choose the order of the dice.";
    mode = gameModeChooseDice;
    return myOutputValue;
  }
  // Player 1: Game mode to choosing the number
  if (mode == gameModeChooseDice) {
    if (input == "1") {
      myOutputValue =
        " Player 1, you chose Dice 1 first. Your number is " +
        playerOne[0] +
        playerOne[1] +
        ". It is now Player 2's turn.";
    }
    if (input == "2") {
      myOutputValue =
        " Player 1, you chose Dice 2 first. Your number is " +
        playerOne[1] +
        playerOne[0] +
        ". It is now Player 2's turn.";
      mode = gameModeDiceRoll;
      return myOutputValue;
    }
  }

  // Player 2
  if (mode == gameModeDiceRoll) {
    playerTwo = [diceRoll(), diceRoll()];
    console.log(playerTwo);
    myOutputValue =
      "Welcome Player 2." +
      "<br>" +
      "You rolled " +
      playerTwo[0] +
      " for Dice 1 and " +
      playerTwo[1] +
      " for Dice 2. Please choose the order of the dice.";
    mode = gameModeChooseDice;
    return myOutputValue;
  }

  // Player 2: Game mode to choosing the number
  if (mode == gameModeChooseDice) {
    if (input == "1") {
      myOutputValue =
        " Player 2, you chose Dice 1 first. Your number is " +
        playerTwo[0] +
        playerTwo[1] +
        ".";
    }

    if (input == "2") {
      myOutputValue =
        " Player 2, you chose Dice 2 first. Your number is " +
        playerTwo[1] +
        playerTwo[0] +
        ".";
    }
  }

  return myOutputValue;
};
