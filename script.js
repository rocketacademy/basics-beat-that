//Initiate variables and default game mode
var gameMode = "P1RollDice";
var P1Rolls = [];
var P2Rolls = [];
var P1Choice = 0;
var P2Choice = 0;
var numberOfDice = 2;

//Function to roll x number of dice rolls
var rollTwoDice = function (playerID) {
  currentNumberOfDiceRolls = 0;
  while (currentNumberOfDiceRolls < numberOfDice) {
    var currentDiceRollNumber = Math.ceil(Math.random() * 6);
    playerID[currentNumberOfDiceRolls] = currentDiceRollNumber;
    currentNumberOfDiceRolls = currentNumberOfDiceRolls + 1;
  }
};

var main = function (input) {
  var myOutputValue = "";
  //P1 Roll Dice
  if (gameMode == "P1RollDice") {
    console.log("Current Game Mode:" + gameMode);
    rollTwoDice(P1Rolls);
    console.log("P1 Dice Rolls:" + P1Rolls);
    myOutputValue = "You rolled a " + P1Rolls[0] + " for Dice 1 and a " + P1Rolls[1] + " for Dice 2.<br>Choose the order of the dice by selecting whether 1 (Dice 1) or 2 (Dice 2) should be the first digit.";
    gameMode = "P1ChooseOrder";
    console.log("Current Game Mode:" + gameMode);
    return myOutputValue;
  }
  //P1 Choose Order of Dice
  if (gameMode == "P1ChooseOrder") {
    if (input == 1) {
      console.log("P1 Choose Which Dice First:" + input);
      myOutputValue = "Your number is ".concat(P1Rolls[0], P1Rolls[1]) + "<br> It is now Player 2's turn. ";
      P1Choice = Number("".concat(P1Rolls[0], P1Rolls[1]));
      gameMode = "P2RollDice";
      console.log("P1Choice:" + P1Choice);
    } else if (input == 2) {
      console.log("P1 Choose Which Dice First:" + input);
      myOutputValue = "Your number is ".concat(P1Rolls[1], P1Rolls[0]) + "<br> It is now Player 2's turn. ";
      P1Choice = Number("".concat(P1Rolls[1], P1Rolls[0]));
      gameMode = "P2RollDice";
      console.log("P1Choice:" + P1Choice);
    } else {
      myOutputValue = input + " is an invalid selection. <br> Please choose the order of the dice by selecting whether 1 (Dice 1) or 2 (Dice 2) should be the first digit.";
    }
    return myOutputValue;
  }
  //P2 Roll Dice
  if (gameMode == "P2RollDice") {
    console.log("Current Game Mode:" + gameMode);
    rollTwoDice(P2Rolls);
    console.log("P2 Dice Rolls:" + P2Rolls);
    myOutputValue = "You rolled a " + P2Rolls[0] + " for Dice 1 and a " + P2Rolls[1] + " for Dice 2.<br>Choose the order of the dice by selecting whether 1 (Dice 1) or 2 (Dice 2) should be the first digit.";
    gameMode = "P2ChooseOrder";
    console.log("Current Game Mode:" + gameMode);
    return myOutputValue;
  }
  //P2 Choose Order of Dice
  if (gameMode == "P2ChooseOrder") {
    if (input == 1) {
      console.log("P2 Choose Which Dice First:" + input);
      myOutputValue = "Your number is ".concat(P2Rolls[0], P2Rolls[1]);
      P2Choice = Number("".concat(P2Rolls[0], P2Rolls[1]));
      console.log("P2Choice:" + P2Choice);
      gameMode = "Choose Winner";
      console.log("Current Game Mode:" + gameMode);
    } else if (input == 2) {
      console.log("P2 Choose Which Dice First:" + input);
      myOutputValue = "Your number is ".concat(P2Rolls[1], P2Rolls[0]);
      P2Choice = Number("".concat(P2Rolls[1], P2Rolls[0]));
      console.log("P2Choice:" + P2Choice);
      gameMode = "Choose Winner";
      console.log("Current Game Mode:" + gameMode);
    } else {
      myOutputValue = input + " is an invalid selection. <br> Please choose the order of the dice by selecting whether 1 (Dice 1) or 2 (Dice 2) should be the first digit.";
    }
  }
  //Choose Winner Immediately after P2 chooses - if return againt then user needs to click submit again
  if (gameMode == "Choose Winner") {
    if (P1Choice > P2Choice) {
      myOutputValue = "The winner is Player 1 because " + P1Choice + " is larger than " + P2Choice + "<br> Press Submit to Play Again";
    } else if (P1Choice == P2Choice) {
      myOutputValue = "It is a draw because " + P1Choice + " is equal to " + P2Choice + "<br> Press Submit to Play Again";
    } else myOutputValue = "The winner is Player 2 because " + P2Choice + " is larger than " + P1Choice + "<br> Press Submit to Play Again";
    gameMode = "P1RollDice";
  }
  return myOutputValue;
};
