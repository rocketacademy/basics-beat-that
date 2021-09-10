// Game modes
var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER = "GAME_MODE_CHOOSE_DICE_ORDER";
var GAME_MODE_CHOOSE_NUM_DICE = "GAME_MODE_CHOOSE_NUM_DICE";
var GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  "GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY";
var REGULAR = "regular";
var LOWEST_COMBINED_NUMBER = "lowest combined number";
var numberOfDice = "number of dice";

// Track num of dice user has chosen to play with
var numDiceChosen = 0;

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_CHOOSE_NUM_DICE;

var currPlayer = 1;

// Keep track of each player's dice rolls
var playerOneDice = [];
var playerTwoDice = [];

// Keep track of each player's chosen numbers
var playerOneNum;
var playerTwoNum;

var playerProfiles = [
  { id: 1, score: 0 },
  { id: 2, score: 0 },
];

//Return a random number from 1 to 6
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

//Get dice rolls for curr player and populate curr player's dice array
// Return the new dice rolls

var getDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

  // Assign newDiceRolls to the current player's dice array
  if (currPlayer == 1) {
    playerOneDice = newDiceRolls;
  }
  // If currPlayer is not 1, assume currPlayer is 2
  else {
    playerTwoDice = newDiceRolls;
  }

  // Return new dice rolls to parent function
  return newDiceRolls;
};

var link2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var sortAnArray = function (anArray) {
  // get the length of the given array
  var length = anArray.length;

  //Use bubble sort to sort the array
  for (var i = 0; i < length - 1; i += 1) {
    for (var j = 0; j < length - 1; j += 1) {
      if (anArray[j] > anArray[j + 1]) {
        var temp = anArray[j];
        anArray[j] = anArray[j + 1];
        anArray[j + 1] = temp;
      }
    }
  }
  return anArray;
};

var getPlayerNumber = function () {
  // Get the current player's dice array.
  var diceArray;
  if (currPlayer == 1) {
    diceArray = playerOneDice;
  } else {
    diceArray = playerTwoDice;
  }
  var playerNum;
  sortAnArray(diceArray);

  while (diceArray.length > 0) {
    // get hold of the largest num in the array (which is also the last element since we sorted it in ascending order earlier)
    var largestNum = diceArray.pop();
    // On the first iteration, there is no need to link; just reassign playerNum
    if (playerNum == null) {
      playerNum = largestNum;
    }
    // else if it's not the first iteration, link to get the lowest possible number
    else {
      // if the mode is LOWEST_COMBINED_NUMBER, create the lowest number
      if (mode == LOWEST_COMBINED_NUMBER) {
        playerNum = link2Numbers(largestNum, playerNum);
      }
      // else it must be REGULAR mode, so link to get the largest possible number
      else {
        playerNum = link2Numbers(playerNum, largestNum);
      }
    }
  }

  // Store player num in the relevant global player num variable
  if (currPlayer == 1) {
    playerOneNum = playerNum;
  } else {
    playerTwoNum = playerNum;
  }

  // Return generated player num to parent function
  return playerNum;
};

var determineWinner = function () {
  // if the first player's diceNum is larger than second player's, return his id
  if (playerProfiles[0].diceNum > playerProfiles[1].diceNum) {
    return playerProfiles[0].id;
  }
  return playerProfiles[1].id;
};

var addNumToRunningScore = function (roundScore) {
  // If player 1 is playing, add to his score
  if (currPlayer == 1) {
    playerProfiles[0].score += roundScore;
  }
  // If player 2 is playing, add to his score
  if (currPlayer == 2) {
    playerProfiles[1].score += roundScore;
  }
};

var createLeaderBoardOutput = function () {
  // set the preamble and assign it to a variable that will eventually be returned from this function
  var leaderBoardOutput = "Leaderboard: <br>";

  // If in regular mode, display the player with the larger score first
  if (mode == REGULAR) {
    // If the larger scores is in index 0, loop thru the array
    if (playerProfiles[0].score > playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
      // If the larger scores is in index 1, loop from the back of the array
    } else if (playerProfiles[1].score > playerProfiles[0].score) {
      for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    }

    return leaderBoardOutput;
  }
  if (mode == LOWEST_COMBINED_NUMBER) {
    // If the smaller score is in index 0, loop thru the array and add-on to leaderBoardOutput
    if (playerProfiles[0].score < playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    } else if (playerProfiles[1].score < playerProfiles[0].score) {
      for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    }
    return leaderBoardOutput;
  }
  if (mode == numberOfDice) {
    // If the smaller score is in index 0, loop thru the array and add-on to leaderBoardOutput
    if (playerProfiles[0].score < playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    } else if (playerProfiles[1].score < playerProfiles[0].score) {
      for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          "Player " +
          playerProfiles[i].id +
          ": " +
          playerProfiles[i].score +
          "<br>";
      }
    }
    return leaderBoardOutput;
  }
};

// Reset game
var resetGame = function () {
  currPlayer = 1;
  gameMode = GAME_MODE_DICE_ROLL;
};

var main = function (input) {
  if (!mode) {
    // Validate that input is one of the modes
    if (
      input != REGULAR &&
      input != LOWEST_COMBINED_NUMBER &&
      input != numberOfDice
    ) {
      return (
        "Please choose one of the following modes:<br> 1. " +
        REGULAR +
        "<br> 2. " +
        LOWEST_COMBINED_NUMBER +
        "<br> 3. " +
        numberOfDice
      );
    }
    // if the input is valid, re-assign mode with the input value
    mode = input;
    return (
      "You have selected " +
      mode +
      " mode. Player " +
      currPlayer +
      ", click submit to roll your dice"
    );
  }

  if (gameMode == GAME_MODE_CHOOSE_NUM_DICE) {
    // validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please enter a number larger than 0";
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    numDiceChosen = Number(input);
    // Change to dice roll mode
    gameMode = GAME_MODE_DICE_ROLL;
    return (
      "You have chosen to play with " +
      numDiceChosen +
      " dice. Player 1, click submit to get your dice rolls"
    );
  }

  // Roll 2 dice and show the player the values
  if (gameMode == GAME_MODE_DICE_ROLL) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();
    // Switch mode to choose dice order
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    // Return the dice roll values to that player
    return (
      "Welcome Player " +
      currPlayer +
      "<br>" +
      "You rolled Dice 1: " +
      newDiceRolls[0] +
      " and Dice 2: " +
      newDiceRolls[1] +
      "<br>" +
      "Choose the order of the dice by entering 1 or 2 as the first numeral index."
    );
  }
  if (gameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    // Validate the input. If first numeral index is neither 1 nor 2, tell the user.
    var firstNumeralIndex = Number(input);
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      return "Please choose 1 or 2 as the first numeral index for your dice rolls";
    }

    // Get player number for curr player
    var playerNum = getPlayerNumber(firstNumeralIndex);
    var playerNumResponse =
      "Player " +
      currPlayer +
      " You chose Dice " +
      firstNumeralIndex +
      " first." +
      "<br>";
    "Your number is" + playerNum;
    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return (
        playerNumResponse +
        "<br>" +
        "It is now Player 2's turn. Press Submit to roll Player 2's dice."
      );
    }
    // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    currPlayer = 1;
    gameMode = GAME_MODE_DICE_ROLL;

    // Return the game end response
    return (
      playerNumResponse +
      "<br>" +
      "Player " +
      winningPlayer +
      " has won." +
      "<br>" +
      "Player 1 number: " +
      playerOneNum +
      " | Player 2 number: " +
      playerTwoNum +
      "<br>" +
      "Press Submit to play again."
    );
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return "An error occurred. Please refresh to start again.";
};
