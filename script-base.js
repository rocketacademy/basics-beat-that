// Create a version of the Beat That dice game, where players create the largest number they can by concatenating random dice roll digits.
/// Requirements:
/// 1. There are 2 players and players take turns.
/// 2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
/// 3. Player picks the order of the dice they want. Like 36 or 63.
/// 4. After both players have rolled and chosen the dice order, the player with the higher combined number wins.

// Create a helper function for dice roll
var diceRoll = function (input) {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNum = randomInteger + 1;
  return randomNum;
};

// Step 1 Create a helper function for the game play. Think about how to do it in a single player mode first.
/*
// Create a helper function for Rule number 2. When player click Submit, game rolls 2 dice and returns the results of the dice rolls.
var firstRoll = "";
var secondRoll = "";

var rollTwoDices = function (input) {
  firstRoll = diceRoll();
  secondRoll = diceRoll();
  var myOutputValue = `First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
  return myOutputValue;
};

// Create a helper function for Rule number 3. Create a function to concatenate the two numbers in the order chosen by the user
// Input = 1 or 2

var chooseDiceOrder = function (input) {
  if (input == 1) {
    var biggestNum = "" + firstRoll + secondRoll;
    var myOutputValue = `You chose Dice 1 first. Your number is ${biggestNum}. <br><br> Click 'Submit' to roll again.`;
    return myOutputValue;
  }

  if (input == 2) {
    var biggestNum = "" + secondRoll + firstRoll;
    var myOutputValue = `You chose Dice 2 first. Your number is ${biggestNum}.<br><br> Click 'Submit' to roll again.`;
    return myOutputValue;
  }
};

var currentGameMode = "roll 2 dices";

var main = function (input) {
  var modeResult;

  if (currentGameMode == "roll 2 dices") {
    if (input != "") {
      modeResult = "Click the 'Submit' button to roll dice";
    } else {
      currentGameMode = "choose order of 2 dices";
      modeResult = rollTwoDices(input);
    }
  } else if (currentGameMode == "choose order of 2 dices") {
    if (!(input == 1 || input == 2)) {
      modeResult = `Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
    } else {
      modeResult = chooseDiceOrder(input);
      currentGameMode = "roll 2 dices";
    }
  }
  return modeResult;
};
*/

// Step 2: Now that single player mode is coded, create the gameplay for two player mode.
// Create global variable to track number of players.
// Store the dice roll results of player 1 and 2 into an array
// Edit game mode function so that the game stop and show results after Player number 2 chooses the Dice order. Then reset the game after displaying results. Do this by creating a new
/// game mode to display the results.

var playerNum = 1;
var allPlayersScore = [];

var firstRoll = "";
var secondRoll = "";

var rollTwoDices = function (input) {
  firstRoll = diceRoll();
  secondRoll = diceRoll();
  var myOutputValue = `Current Turn: PLAYER ${playerNum} <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
  return myOutputValue;
};

// Create a helper function for Rule number 3. Create a function to concatenate the two numbers in the order chosen by the user
// Input = 1 or 2

/*
var chooseDiceOrder = function (input) {
  if (input == 1) {
    var biggestNum = Number("" + firstRoll + secondRoll);
    var myOutputValue = `Current Turn: PLAYER ${playerNum} <br><br> You chose Dice 1 first. Your number is ${biggestNum}.`;
    allPlayersScore.push(biggestNum);
    return myOutputValue;
  }

  if (input == 2) {
    var biggestNum = Number("" + secondRoll + firstRoll);
    var myOutputValue = `Current Turn: PLAYER ${playerNum} <br><br> You chose Dice 2 first. Your number is ${biggestNum}.`;
    allPlayersScore.push(biggestNum);
    return myOutputValue;
  }
};
*/

// Refactor of chooseDiceOrder function in line 93 to line 107
var chooseDiceOrder = function (input) {
  var biggestNum = "";
  var myOutputValue = "";
  if (input == 1) {
    biggestNum = Number("" + firstRoll + secondRoll);
    myOutputValue = `Current Turn: PLAYER ${playerNum} <br><br> You chose Dice 1 first. Your number is ${biggestNum}.`;
    allPlayersScore.push(biggestNum);
  } else if (input == 2) {
    biggestNum = Number("" + secondRoll + firstRoll);
    myOutputValue = `Current Turn: PLAYER ${playerNum} <br><br> You chose Dice 2 first. Your number is ${biggestNum}.`;
    allPlayersScore.push(biggestNum);
  }
  return myOutputValue;
};

// Step 3:
// Create a helper function to compare which number is the biggest in the array using a while loop
// Return the corresponding winner of that biggest number

var compareNum = function (input) {
  var i = 0;
  var largestNum = 0;
  while (i < input.length) {
    if (input[i] > largestNum) {
      largestNum = input[i];
    }
    i += 1;
  }
  return largestNum;
};

var winner = function (input) {
  var trackWinner = [];
  var winningScore = compareNum(input);
  var j = 0;
  while (j < input.length) {
    if (input[j] == winningScore) {
      trackWinner.push(j);
    }
    j += 1;
  }
  return trackWinner.map(addOne);
};

var addOne = function (num) {
  return num + 1;
};

var currentGameMode = "roll 2 dices";

var main = function (input) {
  var modeResult;

  if (currentGameMode == "roll 2 dices") {
    if (input != "") {
      modeResult = "Click the 'Submit' button to roll dice";
    } else {
      currentGameMode = "choose order of 2 dices";
      modeResult = rollTwoDices(input);
    }
  } else if (currentGameMode == "choose order of 2 dices") {
    if (playerNum == 1) {
      if (!(input == 1 || input == 2)) {
        modeResult = `Current Turn: PLAYER ${playerNum} <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(input)} <br><br> It is PLAYER ${
          playerNum + 1
        }'s turn. Click 'Submit' to roll.`;
        playerNum += 1;
        currentGameMode = "roll 2 dices";
      }
    } else if (playerNum == 2) {
      if (!(input == 1 || input == 2)) {
        modeResult = `Current Turn: PLAYER ${playerNum} <br><br> Invalid input. <br><br> First dice: ${firstRoll} and Second dice: ${secondRoll} <br><br> Choose the order of the dice by entering '1' or '2'`;
      } else {
        modeResult = `${chooseDiceOrder(
          input
        )} <br><br> Click 'Submit' for the winner!`;
        currentGameMode = "game end display winner";
      }
    }
  } else if (currentGameMode == "game end display winner") {
    if (input != "") {
      modeResult = "Told you to click 'Submit' tsk.";
    } else {
      currentGameMode = "roll 2 dices";
      modeResult = `Winner(s): Player ${winner(
        allPlayersScore
      )} <br><br> Player 1: ${allPlayersScore[0]} <br> Player 2: ${
        allPlayersScore[1]
      } <br><br> Click 'Submit' to play again.`;
      allPlayersScore = [];
      playerNum = 1;
    }
  }

  console.log("array of dice rolls:" + allPlayersScore);
  console.log("Player number: " + playerNum);
  return modeResult;
};
