//global variables
var gameMode = "rollDiceMode";
var randomNumberOne = 0;
var randomNumberTwo = 0;
var playerNumber = 1;
var myOutputValue = "";
var combinedNumber = 0;
var equals = false;
var totalPlayerOneScore = 0;
var totalPlayerTwoScore = 0;
var currentPlayerOneScore = 0;
var currentPlayerTwoScore = 0;
var winningPlayer = "";

//function to roll a dice
var rollADice = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};
//function to format the string
var formatString = function (
  message,
  input,
  combinedNumber,
  totalPlayerOneScore,
  totalPlayerTwoScore
) {
  var outputString = "";
  if (message == "welcome") {
    outputString =
      "Welcome player " +
      playerNumber +
      "😀. " +
      "<br>" +
      "You rolled " +
      randomNumberOne +
      " for dice 1 and " +
      randomNumberTwo +
      " for dice 2.";

    if (equals == false) {
      outputString =
        outputString +
        "<br>" +
        "You can now choose which dice goes first, dice 1 or dice 2. Please enter '1' or '2'" +
        "<br>";
    }
  } // end of welcome message
  else if (message == "leaderboard") {
    outputString =
      outputString +
      "<br>" +
      "============================================================" +
      "<br>" +
      "<br>" +
      "🏆  <b><u>Leaderboard</u></b>  🏆" +
      "<br>" +
      "<br>";
    if (
      totalPlayerOneScore > totalPlayerTwoScore ||
      totalPlayerOneScore == totalPlayerTwoScore
    ) {
      outputString =
        outputString +
        "Player One total Score = " +
        totalPlayerOneScore +
        "<br>" +
        "Player Two total Score = " +
        totalPlayerTwoScore +
        "<br>";
    } else {
      outputString =
        outputString +
        "Player Two total Score = " +
        totalPlayerTwoScore +
        "<br>" +
        "Player One total Score = " +
        totalPlayerOneScore +
        "<br>";
    }
  } else if (message == "click submit") {
    outputString = "Please start the game by clicking submit.";
  } // end of click submit message
  else if (message == "result") {
    if (equals == false) {
      outputString = "Player " + playerNumber + ", you chose Dice " + input;
    }

    outputString =
      outputString + "<br>" + "Your number is " + combinedNumber + "👍.";
    if (playerNumber == 2) {
      outputString =
        outputString +
        "<br>" +
        winningPlayer +
        " wins this round. Congrats!!🤝";
    }
    if (playerNumber == 1) {
      outputString = outputString + " It is now Player 2's turn.";
    }
  } // end of result message
  return outputString;
};
//function for first mode logic
var rollDiceMode = function (input) {
  if (input == "") {
    randomNumberOne = rollADice();
    randomNumberTwo = rollADice();

    if (randomNumberOne == randomNumberTwo) {
      equals = true;
      combinedNumber = "" + randomNumberOne + randomNumberTwo;
      if (playerNumber == 1) {
        currentPlayerOneScore = Number(combinedNumber);
        // playerOneScores.push(currentPlayerOneScore);
        totalPlayerOneScore = totalPlayerOneScore + currentPlayerOneScore;
      } else if (playerNumber == 2) {
        currentPlayerTwoScore = Number(combinedNumber);
        // playerTwoScores.push(currentPlayerTwoScore);
        totalPlayerTwoScore = totalPlayerTwoScore + currentPlayerTwoScore;
        if (currentPlayerOneScore > currentPlayerTwoScore) {
          winningPlayer = "Player 1";
        } else if (currentPlayerTwoScore > currentPlayerOneScore) {
          winningPlayer = "Player 2";
        }
      }

      myOutputValue = formatString(
        "welcome",
        input,
        combinedNumber,
        totalPlayerOneScore,
        totalPlayerTwoScore
      );
      myOutputValue =
        myOutputValue +
        formatString(
          "result",
          input,
          combinedNumber,
          totalPlayerOneScore,
          totalPlayerTwoScore
        );
      myOutputValue =
        myOutputValue +
        formatString(
          "leaderboard",
          input,
          combinedNumber,
          totalPlayerOneScore,
          totalPlayerTwoScore
        );

      if (playerNumber == 1) {
        playerNumber = 2;
      } else if (playerNumber == 2) {
        playerNumber = 1;
      }
    } else {
      equals = false;

      myOutputValue = formatString(
        "welcome",
        input,
        combinedNumber,
        totalPlayerOneScore,
        totalPlayerTwoScore
      );
      myOutputValue =
        myOutputValue +
        formatString(
          "leaderboard",
          input,
          combinedNumber,
          totalPlayerOneScore,
          totalPlayerTwoScore
        );

      gameMode = "resultMode";
    }
  } else {
    myOutputValue = formatString(
      "click submit",
      input,
      totalPlayerOneScore,
      totalPlayerTwoScore
    );
  }
}; // end of rollDiceMode

var resultMode = function (input) {
  if (input == 1 || input == 2) {
    if (input == 1) {
      combinedNumber = "" + randomNumberOne + randomNumberTwo;
    } else if (input == 2) {
      combinedNumber = "" + randomNumberTwo + randomNumberOne;
    }
    if (playerNumber == 1) {
      currentPlayerOneScore = Number(combinedNumber);
      // playerOneScores.push(currentPlayerOneScore);
      totalPlayerOneScore = totalPlayerOneScore + currentPlayerOneScore;
    } else if (playerNumber == 2) {
      currentPlayerTwoScore = Number(combinedNumber);
      // playerTwoScores.push(currentPlayerTwoScore);
      totalPlayerTwoScore = totalPlayerTwoScore + currentPlayerTwoScore;
      if (currentPlayerOneScore > currentPlayerTwoScore) {
        winningPlayer = "Player 1";
      } else if (currentPlayerTwoScore > currentPlayerOneScore) {
        winningPlayer = "Player 2";
      }
    }

    myOutputValue = formatString(
      "result",
      input,
      combinedNumber,
      totalPlayerOneScore,
      totalPlayerTwoScore
    );
    myOutputValue =
      myOutputValue +
      formatString(
        "leaderboard",
        input,
        combinedNumber,
        totalPlayerOneScore,
        totalPlayerTwoScore
      );
    if (playerNumber == 1) {
      playerNumber = 2;
    } else if (playerNumber == 2) {
      playerNumber = 1;
    }

    gameMode = "rollDiceMode";
  } else {
    myOutputValue = "Please enter a valid input. Type '1' or '2'";
  }
};

//start of main function
var main = function (input) {
  if (gameMode == "rollDiceMode") {
    rollDiceMode(input);
  } else if (gameMode == "resultMode") {
    resultMode(input);
  }

  return myOutputValue;
};
