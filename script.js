// Project #2 - Beat That!

// Make game replayable
// Fix error message

// Globals
var mode = "roll";
var playerNumber = 1;

// Arrays
var playerRolls = [];
var totalScores = [];

// Dice Roll Function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Roll 2 Dice Function
var rollTwoDice = function () {
  for (let counter = 0; counter < 2; counter += 1) {
    playerRolls.push(rollDice());
  }
  return (
    "Player " +
    playerNumber +
    " rolls a " +
    playerRolls[0] +
    " and a " +
    playerRolls[1] +
    ".<br><br> Key in 1 or 2 to choose the order of your dice."
  );
};

// Choose Order Function
var chooseOrder = function (chosenOrder) {
  var playerScore;
  if (chosenOrder == 1) {
    playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
  }
  if (chosenOrder == 2) {
    playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
  }
  if (chosenOrder != 1 && chosenOrder != 2) {
    return (
      "Woops, you did not enter a valid number. Please key in '1' or '2' to choose the order of your dice and try again. <br><br> Your dice rolls were " +
      playerRolls[0] +
      " and " +
      playerRolls[1] +
      "."
    );
  }
  //Add to total scores array, clear current array for next player
  totalScores.push(playerScore);
  playerRolls = [];

  return (
    "Player " + playerNumber + ", your combined number is " + playerScore + "."
  );
};

// Score Tally Function
var tallyScores = function () {
  myOutputValue =
    "Player 1 score:" +
    totalScores[0] +
    "<br><br> Player 2 score:" +
    totalScores[1];
  // Player 1 Wins
  if (totalScores[0] > totalScores[1]) {
    return myOutputValue + "<br><br>Player 1 Wins!";
  }
  // Player 2 Wins
  if (totalScores[1] > totalScores[0]) {
    return myOutputValue + "<br><br>Player 1 Wins!";
  }
  // Tie Scenario
  if (totalScores[0] == totalScores[1]) {
    return myOutputValue + "<br><br>It's a tie.";
  }
};

// Main Function
var main = function (input) {
  var myOutputValue = "";

  // Roll mode + update to choose mode after
  if (mode == "roll") {
    myOutputValue = rollTwoDice();
    mode = "choose";
    return myOutputValue;
  }
  // Choose order mode + udpate to Player 2
  if (mode == "choose") {
    if (playerNumber == 1) {
      myOutputValue = chooseOrder(input);
      playerNumber = 2;
      mode = "roll";
      return (
        myOutputValue +
        "<br><br> It is now Player 2's turn to roll. Press submit to roll!"
      );
    }
    if (playerNumber == 2) {
      myOutputValue = chooseOrder(input);
      mode = "score";
      return (
        myOutputValue +
        "<br><br> The scores have been tallied! Press submit to find out who won."
      );
    }
  }
  if (mode == "score") {
    myOutputValue = tallyScores();
    return myOutputValue;
  }

  return myOutputValue;
};
