// A number of players take turns to roll 2 dice, and then decides the order to concatenate the two dice rolls
// (e.g. If the two dice rolls 2 and 5,  The user will decide 25 or 52). The player with the higher combined number wins.
// Create an array of player rolls, an array of players' combined scores, and two check arrays -- to check if a player has rolled and to check if a player has selected his/her combined score

var numberOfDiceRolls = 0;
var gameStatus = "chooseNumberPlayers";
var numberOfPlayers = 0;
var playerRollCheckArray = [];
var playersCombinedNumberCheckArray = [];
var playersCombinedNumberArray = [];
var playerRollsArray = [];
// Function to simulate a dice roll
var diceRoll = function () {
  var randomDecimal = Math.random();
  var diceNumber = Math.floor(randomDecimal * 6) + 1;
  return diceNumber;
};

// Function to simulate X number of dice rolls and return the dice rolls to an array. Input of the function is the number of dice to roll
var rollXdice = function (numberOfDiceToRoll) {
  diceRolls = [];
  for (var counter = 0; counter < numberOfDiceToRoll; counter += 1) {
    diceRolls.push(diceRoll());
  }
  return diceRolls;
};

// Function to autogenerate combined number to get highest number
var autoGenerateCombinedNumber = function (diceRollNumbersArray) {
  diceRollNumbersArray.sort();
  diceRollNumbersArray.reverse();
  var sortedCombinedNumber = "";
  for (var counter = 0; counter < diceRollNumbersArray.length; counter += 1) {
    sortedCombinedNumber = sortedCombinedNumber + diceRollNumbersArray[counter];
  }
  return sortedCombinedNumber;
};

var main = function (input) {
  if (gameStatus == "chooseNumberPlayers") {
    numberOfPlayers = input;
    gameStatus = "chooseNumberOfDiceToRoll";
    for (var player = 0; player < numberOfPlayers; player += 1) {
      // Create two arrays containing check-values for each player -- one array to check if each player has rolled the dice. The other array to check if each player has chosen whch dice roll of theirs they want to choose as their first to create the combined number.
      playerRollCheckArray.push(0);
      playersCombinedNumberCheckArray.push(0);
      playersCombinedNumberArray.push(0);
    }
    return "Choose the number of dice each player rolls";
  }

  if (gameStatus == "chooseNumberOfDiceToRoll") {
    numberOfDiceRolls = input;
    gameStatus = "gamePlay";
    return "Player 1 - click submit to roll your dice!";
  }

  if (gameStatus == "gamePlay") {
    // players will take turns to roll their dice
    for (var player = 0; player < numberOfPlayers; player += 1) {
      if (playerRollCheckArray[player] == 0) {
        playerRollsArray.push(rollXdice(numberOfDiceRolls));
        playerRollCheckArray[player] = 1;
        var playerRollMessage = "Player " + (player + 1) + ", you rolled a<br>";
        for (var counter = 0; counter < numberOfDiceRolls; counter += 1) {
          playerRollMessage =
            playerRollMessage + playerRollsArray[player][counter] + "<br>";
        }
        // After player rolls the two dice, make him choose what dice goes first and create the player's combined number (not applicable for autogenerate number version)

        playersCombinedNumberArray[player] =
          playersCombinedNumberArray[player] +
          parseInt(autoGenerateCombinedNumber(playerRollsArray[player]));
        return playerRollMessage;
      }

      // // Players select their own combined number (only for two dice rolls)
      // if (playersCombinedNumberCheckArray[player] == 0) {
      //   var firstRoll = input;
      //   var secondRoll = 2;
      //   if (firstRoll == 2) {
      //     secondRoll = 1;
      //   }
      //   console.log(firstRoll, secondRoll);
      //   playersCombinedNumberArray[player] = Number(
      //     "" +
      //       playerRollsArray[player][firstRoll - 1] +
      //       playerRollsArray[player][secondRoll - 1]
      //   );
      //   playersCombinedNumberCheckArray[player] = 1;
      //   return "Your  combined number is " + playersCombinedNumberArray[player];
      // }

      if (player + 1 == numberOfPlayers) {
        // If the last player is reached and they have rolled and selected their number to go first, show the scoreboard
        gameStatus = "scoreboard";
        return "Click submit to show the scoreboard!";
      }
    }
  }
  var scoreboard = "";
  var winner = 0;
  if (gameStatus == "scoreboard") {
    gameStatus = "gamePlay";
    playerRollsArray = [];
    for (var player = 0; player < numberOfPlayers; player += 1) {
      playerRollCheckArray[player] = 0;
      // Creating the scoreboard
      if (
        playersCombinedNumberArray[player] > playersCombinedNumberArray[winner]
      ) {
        winner = player;
      }
      scoreboard =
        scoreboard +
        "Player " +
        (player + 1) +
        ": " +
        playersCombinedNumberArray[player] +
        "<br><br>";
    }

    return (
      "Player " +
      (winner + 1) +
      " wins!<br><br><br><b>Scoreboard</b><br><br>" +
      scoreboard
    );
  }
};
