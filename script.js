// store game modes
var gameMode = "start";
var DICEROLLMODE = "dice roll mode";
var ORDERMODE = "order mode";
var ENTERNUMOFUSERS = "enter number of users";

// arrays

var allDiceRollsArray = [];
var orderedNumberArray = [];
var orderedNumberArrayforSorting = [];

//counts
var numOfPlayers = 0;
var playerNumber = 1;
var numDiceRollsOverall = 0;
var diceRollsPerUser = 0;
var numOfUsersWhoHavePlayed = 0;
var diceRollsAllowedPerUser = 2;

// dice roll function
var rollDice = function () {
  var randomIntegerUpToSix = Math.floor(Math.random() * 6) + 1;
  return randomIntegerUpToSix;
};

//helper function to roll dice and store in array
var rollAndStoreDice = function () {
  var playerDiceRoll = rollDice();
  allDiceRollsArray.push(playerDiceRoll);
  return playerDiceRoll;
};

var outputWinner = function (sortingArray, copyOfSortingArray) {
  sortingArray.sort();
  var maxNumber = sortingArray.pop();
  var matchToPlayerNum = copyOfSortingArray.indexOf(maxNumber);
  var winningPlayer = matchToPlayerNum + 1;
  return (
    "The winner is player number " +
    winningPlayer +
    "! Click submit to restart game!"
  );
};

var main = function (input) {
  var myOutputValue = "";

  // start mode. instructs user to enter total number of players.
  if (gameMode == "start") {
    gameMode = ENTERNUMOFUSERS;
    return "Welcome. Please enter the number of players for this game";

    // in this mode, user enters number of players. game mode switches to dice roll mode.
  } else if (gameMode == ENTERNUMOFUSERS) {
    numOfPlayers = input;
    console.log("store no of players " + numOfPlayers);
    gameMode = DICEROLLMODE;
    return (
      "There are " +
      numOfPlayers +
      " players in this game. Now, player 1 please click submit twice to roll two dice."
    );
  }
  // entering dice roll mode. The loop ensures one game per user, with each game entails two dice rolls and the ordering of the dice rolls.

  while (numOfUsersWhoHavePlayed < numOfPlayers) {
    console.log(numOfUsersWhoHavePlayed, numOfPlayers);

    // include one more round on top of max dice rolls allowed. in the first two round user rolls dice, in last round user orders the dice rolls
    while (diceRollsPerUser < diceRollsAllowedPerUser + 1) {
      //the following while loop rolls dice the num of times allowed per user, in this case 2.
      while (diceRollsPerUser < diceRollsAllowedPerUser) {
        var showAndStoreDiceRolls = rollAndStoreDice();
        diceRollsPerUser = diceRollsPerUser + 1;
        numDiceRollsOverall = numDiceRollsOverall + 1;
        return (
          "The dice rolled is " + showAndStoreDiceRolls + ". Click submit."
        );
      }
      // after dice rolls exceeds dice rolls allowed per user (2), enter order mode.

      if (gameMode == DICEROLLMODE) {
        gameMode = ORDERMODE;
        var guess1 = allDiceRollsArray[numDiceRollsOverall - 1];
        var guess2 = allDiceRollsArray[numDiceRollsOverall - 2];
        return (
          "Your guesses are " +
          guess1 +
          " and " +
          guess2 +
          ". Order the two guesses to form a two-digit number. The player with the highest two-digit number wins."
        );
      } else if (gameMode == ORDERMODE) {
        console.log("entered order mode");

        orderedNumberArray.push(input);
        orderedNumberArrayforSorting.push(input);
        gameMode = DICEROLLMODE;
        numOfUsersWhoHavePlayed = numOfUsersWhoHavePlayed + 1;
        diceRollsPerUser = diceRollsPerUser + 1;

        if (playerNumber == numOfPlayers) {
          return (
            "You keyed in " +
            orderedNumberArray[numOfUsersWhoHavePlayed - 1] +
            ". All " +
            numOfPlayers +
            " players have gone a round. Now click submit to see who won!"
          );
        } else
          return (
            "You keyed in " +
            orderedNumberArray[numOfUsersWhoHavePlayed - 1] +
            ". It is now the next player's turn"
          );
      }
    }
    diceRollsPerUser = 0;
    playerNumber = playerNumber + 1;
    return "Hello player no. " + playerNumber + " click submit to play.";
  }
  return outputWinner(orderedNumberArrayforSorting, orderedNumberArray);
};
