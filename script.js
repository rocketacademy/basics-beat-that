// Project #2 - Beat That!

// Globals
var state = "selection";
var playerNumber = 1;
var mode = "regular";

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
    // Update to error state to not allow player to continue until dice order is chosen
    state = "error";
    return (
      "Woops, you did not enter a valid number. 😔 <br><br> Please key in 1 or 2 to choose the order of your dice and try again. <br><br> Your dice rolls were " +
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

// Score Tally Function for normal state
var tallyScores = function () {
  myOutputValue =
    "Player 1 score:" +
    totalScores[0] +
    "<br><br> Player 2 score:" +
    totalScores[1];
  // Player 1 Wins
  if (totalScores[0] > totalScores[1]) {
    return myOutputValue + "<br><br>Player 1 Wins! 💪";
  }
  // Player 2 Wins
  if (totalScores[1] > totalScores[0]) {
    return myOutputValue + "<br><br>Player 2 Wins! 💪";
  }
  // Tie Scenario
  if (totalScores[0] == totalScores[1]) {
    return myOutputValue + "<br><br>It's a tie. 😐";
  }
};

// Replay Function
var restartGame = function () {
  state = "roll";
  playerNumber = "1";
  totalScores = [];
};

// Selection state - choose game mode, instruction message in index.html
var chooseGameMode = function (input) {
  if (state == "selection") {
    if (input == "regular") {
      state = "roll";
      mode = "regular";
      return "You have chosen to play a regular game of Beat That, let's go!<br><br> Press the submit button to start playing. 🎲";
    }
    if (input == "reverse") {
      state = "roll";
      mode = "reverse";
      return "You have chosen to play a reversed game of Beat That, wild! <br><br> Press the submit button to start playing. 🎲";
    }
    if (input != "reverse" || input != "regular") {
      state = "selection";
      return "You did not key in a valid game mode. 😔 <br><br> Please key in regular or reverse and try again!";
    }
  }
};

// Lowest Dice Game "reversed mode"
var tallyReverseScores = function () {
  myOutputValue =
    "Player 1 score:" +
    totalScores[0] +
    "<br><br> Player 2 score:" +
    totalScores[1];
  // Player 1 Wins
  if (totalScores[1] > totalScores[0]) {
    return myOutputValue + "<br><br>Player 1 Wins! 💪";
  }
  // Player 2 Wins
  if (totalScores[0] > totalScores[1]) {
    return myOutputValue + "<br><br>Player 2 Wins! 💪";
  }
  // Tie Scenario
  if (totalScores[0] == totalScores[1]) {
    return myOutputValue + "<br><br>It's a tie. 😐";
  }
};

// Main Function
var main = function (input) {
  var myOutputValue = "";

  // Select game mode
  if (state == "selection") {
    myOutputValue = chooseGameMode(input);
    return myOutputValue;
  }

  // Start with roll dice state, update to choose order state after
  if (state == "roll") {
    myOutputValue = rollTwoDice();
    state = "choose";
    return myOutputValue;
  }
  // Choose order state and update to Player 2 and back to roll state
  if (state == "choose") {
    if (playerNumber == 1) {
      myOutputValue = chooseOrder(input);
      if (state != "error") {
        playerNumber = 2;
        state = "roll";
        return (
          myOutputValue +
          "<br><br> It is now Player 2's turn to roll. Press submit to roll!"
        );
      }
    }
    // Update to tally score state after player 2 chooses
    if (playerNumber == 2) {
      myOutputValue = chooseOrder(input);
      if (state != "error") {
        state = "score";
        return (
          myOutputValue +
          "<br><br> The scores have been tallied! Press submit to find out who won."
        );
      }
    }
  }
  // Error state
  if (state == "error") {
    myOutputValue = chooseOrder(input);
    state = "choose";
    return myOutputValue;
  }

  // Tally score screen, restart game
  if (state == "score" && mode == "regular") {
    myOutputValue = tallyScores();
    restartGame();
    return (
      myOutputValue +
      "<br><br>Ready for another round? Press submit to begin rolling. 🎲"
    );
  }
  if (state == "score" && mode == "reverse") {
    myOutputValue = tallyReverseScores();
    restartGame();
    return (
      myOutputValue +
      "<br><br>Ready for another round? Press submit to begin rolling. 🎲"
    );
  }

  return myOutputValue;
};
