/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins. */

// -------------------------------------------------------------------
// -------------------- GLOBAL VARIABLES -----------------------------
// -------------------------------------------------------------------

var currentMode = "New Game";
var P1diceResult = [];
var P1diceResultOrdered = 0;
var P1diceResultOrderedHistory = [];
var P2diceResult = [];
var P2diceResultOrdered = 0;
var P2diceResultOrderedHistory = [];
var P1winCount = 0;
var P1loseCount = 0;
var P2winCount = 0;
var P2loseCount = 0;

// -------------------------------------------------------------------
// ------------------- HELPER FUNCTIONS ------------------------------
// -------------------------------------------------------------------

//Dice Roll Function
var myRandomValue = Math.random();
var getRandomInteger = function (max) {
  var randomDecimal = Math.random() * (max + 1);
  var resultInteger = Math.floor(randomDecimal);
  return resultInteger;
};

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//Display Running Score Function
var getRunningScore = function () {
  var runningScoreOutput = "Player 1 vs Player 2 Score History: ";
  for (
    var runningScoreCounter = 0;
    runningScoreCounter < P2diceResultOrderedHistory.length;
    runningScoreCounter += 1
  ) {
    runningScoreOutput =
      runningScoreOutput +
      "<br>" +
      (runningScoreCounter + 1) +
      ") " +
      P1diceResultOrderedHistory[runningScoreCounter] +
      " vs " +
      P2diceResultOrderedHistory[runningScoreCounter];
    +"<br>";
  }
  return runningScoreOutput;
};

// Display Leaderboard Function
var getLeaderboard = function () {
  var leaderboardOutput = "Leaderboard: <br>";
  if (P1winCount > P2winCount) {
    leaderboardOutput =
      leaderboardOutput +
      "P1 is in the lead with " +
      P1winCount +
      " win vs " +
      P1loseCount +
      " loss!<br> P2 is trailing behind with " +
      P2winCount +
      " win vs " +
      P2loseCount +
      " loss!<br>";
  } else if (P2winCount > P1winCount) {
    leaderboardOutput =
      leaderboardOutput +
      "P2 is in the lead with " +
      P2winCount +
      " win vs " +
      P2loseCount +
      " loss!<br> P1 is trailing behind with " +
      P1winCount +
      " win vs " +
      P1loseCount +
      " loss!<br>";
  }
  return leaderboardOutput;
};

// -------------------------------------------------------------------
// ----------------------- MAIN FUNCTION -----------------------------
// -------------------------------------------------------------------

var main = function (input) {
  if (currentMode == "New Game") {
    var P1dice1 = rollDice();
    var P1dice2 = rollDice();
    var myOutputValue =
      "Welcome Player 1.<br> You rolled " +
      P1dice1 +
      " for Dice 1 and " +
      P1dice2 +
      " for Dice 2.<br> Choose the order of the dice by typing in which dice number (1 or 2) you want to go first.";
    //Store dice results in global array
    P1diceResult = [P1dice1, P1dice2];
    console.log("P1 dice results");
    console.log(P1diceResult);
    //Change current mode
    currentMode = "P1 Pick Order";
  } else if (currentMode == "P1 Pick Order") {
    if (input == 1) {
      myOutputValue =
        "Player 1, you chose Dice 1 first. Your number is " +
        P1diceResult[0] +
        P1diceResult[1] +
        "<br> Press submit for Player 2's turn.";
      //Store re-ordered result
      P1diceResultOrdered = P1diceResult[0] + "" + P1diceResult[1];
      // Store re-ordered result history in array
      P1diceResultOrderedHistory.push(P1diceResultOrdered);
      //Change current mode
      currentMode = "P2 Turn";
    } else if (input == 2) {
      myOutputValue =
        "Player 1, you chose Dice 2 first. Your number is " +
        P1diceResult[1] +
        P1diceResult[0] +
        "<br> Press submit for Player 2's turn.";
      //Store re-ordered result
      P1diceResultOrdered = P1diceResult[1] + "" + P1diceResult[0];
      // Store re-ordered result history in array
      P1diceResultOrderedHistory.push(P1diceResultOrdered);
      //Change current mode
      currentMode = "P2 Turn";
    }
  } else if (currentMode == "P2 Turn") {
    var P2dice1 = rollDice();
    var P2dice2 = rollDice();
    var myOutputValue =
      "Welcome Player 2.<br> You rolled " +
      P2dice1 +
      " for Dice 1 and " +
      P2dice2 +
      " for Dice 2.<br> Choose the order of the dice by typing in which dice number (1 or 2) you want to go first.";
    //Store dice results in global array
    P2diceResult = [P2dice1, P2dice2];
    console.log("P2 dice results");
    console.log(P2diceResult);
    //Change current mode
    currentMode = "P2 Pick Order";
  } else if (currentMode == "P2 Pick Order") {
    if (input == 1) {
      myOutputValue =
        "Player 2, your chose Dice 1 first. Your number is " +
        P2diceResult[0] +
        P2diceResult[1] +
        "<br> Press submit again to determine the winner.";
      //Store re-ordered result
      P2diceResultOrdered = P2diceResult[0] + "" + P2diceResult[1];
      // Store re-ordered result history in array
      P2diceResultOrderedHistory.push(P2diceResultOrdered);
      //Change current mode
      currentMode = "Determine Winner";
    } else if (input == 2) {
      myOutputValue =
        "Player 2, you chose Dice 2 first. Your number is " +
        P2diceResult[1] +
        P2diceResult[0] +
        "<br> Press submit again to determine the winner.";
      //Store re-ordered result
      P2diceResultOrdered = P2diceResult[1] + "" + P2diceResult[0];
      // Store re-ordered result history in array
      P2diceResultOrderedHistory.push(P2diceResultOrdered);
      //Change current mode
      currentMode = "Determine Winner";
    }
  } else if (currentMode == "Determine Winner") {
    if (P1diceResultOrdered > P2diceResultOrdered) {
      //Add to win counter for P1, lose counter for P2
      P1winCount += 1;
      P2loseCount += 1;
      myOutputValue =
        "Player 1 wins! <br>Player 1's number is " +
        P1diceResultOrdered +
        " and Player 2's number is " +
        P2diceResultOrdered +
        "<br>" +
        "Press submit to start new game <br><br>" +
        getRunningScore() +
        "<br><br>" +
        getLeaderboard();
      //Change current mode
      currentMode = "New Game";
    } else if (P2diceResultOrdered > P1diceResultOrdered) {
      //Add to win counter for P2, lose counter for P1
      P2winCount += 1;
      P1loseCount += 1;
      myOutputValue =
        "Player 2 wins! <br>Player 1's number is " +
        P1diceResultOrdered +
        " and Player 2's number is " +
        P2diceResultOrdered +
        "<br>" +
        "Press submit to start new game <br><br>" +
        getRunningScore() +
        "<br><br>" +
        getLeaderboard();
      //Change current mode
      currentMode = "New Game";
    } else if (P1diceResultOrdered == P2diceResultOrdered) {
      myOutputValue =
        "Its a tie! <br>Player 1's number is " +
        P1diceResultOrdered +
        " and Player 2's number is " +
        P2diceResultOrdered +
        "<br>" +
        "Press submit to start new game <br><br>" +
        getRunningScore() +
        "<br><br>" +
        getLeaderboard();
      //Change current mode
      currentMode = "New Game";
    }
  }

  return myOutputValue;
};
