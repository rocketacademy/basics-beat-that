// creating names/array size for n numbers of players
var getPlayerNames = function (numOfPlayers) {
  var playerNamesArray = []; // setting up empty array
  numOfPlayersCounter = 1;
  while (numOfPlayersCounter <= numOfPlayers) {
    playerNamesArray.push("player" + numOfPlayersCounter + "Num");
    numOfPlayersCounter += 1;
  }
  return playerNamesArray;
};

// choose a number between 1 to 6 each dice roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// creating dice arrays for n number of players
var diceArray = function (numOfPlayers, numOfRolls) {
  // create variables for each player's numbers
  var playerNamesArray = getPlayerNames(numOfPlayers);

  console.log("playerNamesArray: ", playerNamesArray);
  playerCounter = 1;

  // set up empty array for all players
  allPlayersDiceArray = [];
  // for each player
  while (playerCounter <= numOfPlayers) {
    // reset rollCounter to 0
    rollCounter = 0;
    // set up an empty array for each player
    console.log("playerCounter: ", playerCounter);
    playerNamesArray[playerCounter] = [];
    console.log(
      "playerNamesArray and Counter: ",
      playerNamesArray[playerCounter]
    );
    // roll dice n times
    while (rollCounter < numOfRolls) {
      // add the dice roll to respective players' array
      playerNamesArray[playerCounter].push(diceRoll());
      console.log(
        "inner playerNamesArray and Counter: ",
        playerNamesArray[playerCounter]
      );

      console.log("playercounter: ", playerCounter);
      console.log("rollcounter: ", rollCounter);
      rollCounter += 1;
    }
    allPlayersDiceArray.push(playerNamesArray[playerCounter]);
    console.log("allPlayersDiceArray before sort: ", allPlayersDiceArray);
    playerCounter += 1;
  }
  return allPlayersDiceArray;
};

console.log("==========start of smallest game==========");

// selecting the largest number of all digits in array
var smallestNum = function (numOfPlayers, numOfRolls) {
  // Initialise empty array for comparison
  var compareArray = [];

  // Initialise all players dice array
  // FYI: need to create a new array and copy each value into this new array ("dynamically")
  var allPlayersDiceArraySorted = diceArray(numOfPlayers, numOfRolls);

  console.log(
    "allPlayersDiceArray before sort in smallestNum game: ",
    allPlayersDiceArraySorted
  );

  // sort array in ascending order
  var arrayIndexNum = 0;
  while (arrayIndexNum < numOfPlayers) {
    allPlayersDiceArraySorted[arrayIndexNum].sort();
    console.log("sorted array within loop: ", allPlayersDiceArraySorted);
    arrayIndexNum += 1;
  }

  console.log("sorted array: ", allPlayersDiceArraySorted);

  var playerNum = 0;

  while (playerNum < numOfPlayers) {
    console.log(
      "playerNum: ",
      playerNum,
      "arrayIndexNum: ",
      arrayIndexNum,
      "smallestNum: ",
      smallestNum
    );
    var smallestNum = parseInt(allPlayersDiceArraySorted[playerNum].join(""));
    console.log("playerNum: ", playerNum);
    console.log("smallestNum:", smallestNum);

    compareArray.push(smallestNum);
    console.log("array to compare: ", compareArray);
    playerNum += 1;
  }

  playerNum += 1;
  // reset array index number to 0
  arrayIndexNum = 0;

  // selecting smallest number and determining which player is the winner i.e. (index+1)
  var min = compareArray[0];
  var minIndex = 0;
  for (var i = 1; i < compareArray.length; i++) {
    if (compareArray[i] < min) {
      minIndex = i;
      min = compareArray[i];
      console.log("minIndex: ", minIndex);
      console.log("min number: ", min);
    }
  }
  winningPlayer = minIndex + 1;
  return [winningPlayer, min];
};

console.log("==========end of smallest game==========");

// define global variable for game mode
var gameMode = prompt("Enter the game mode (smallest or base):");

/* 
start of global variables for base game
*/

if (gameMode == "base") {
  alert("Press submit to play.");
}

// define global variables for base game
var hasPlayerOneRolled = false;
var hasPlayerTwoRolled = false;
// setting up player 1 and 2 array
var playerOneArray = [];
var playerTwoArray = [];
playerOneArray.push(diceRoll());
playerOneArray.push(diceRoll());
console.log("playerOneArray: ", playerOneArray);
playerTwoArray.push(diceRoll());
playerTwoArray.push(diceRoll());
console.log("playerOneArray: ", playerOneArray);
var playerOneNumber = "";
var playerTwoNumber = "";

/* 
  end of global variables for base game
*/

/* 
  start of global variables for smallest game 
*/

if (gameMode == "smallest") {
  var numOfPlayers = prompt("Enter number of players:");
  var numOfRolls = prompt("Enter number of dice rolls:");
  alert("Press submit to play.");
}

/* 
  end of global variables for smallest game 
*/

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "base") {
    // player one rolls dice

    console.log("playerOneArray", playerOneArray);
    if (hasPlayerOneRolled == false && hasPlayerTwoRolled == false) {
      // set switch to true since player one has rolled the dice and prompt to choose order has came out
      hasPlayerOneRolled = true;
      return `Welcome Player 1. <br> You rolled ${playerOneArray[0]} for Dice 1 and ${playerOneArray[1]} for Dice 2. <br> Choose the order of the dice.`;
    }

    // determine player one number based on what he has chosen
    if (
      input == 1 &&
      hasPlayerOneRolled == true &&
      hasPlayerTwoRolled == false
    ) {
      playerOneNumber = playerOneArray[0] * 10 + playerOneArray[1];
      return `Player 1, you chose Dice 1 first. <br> Your number is ${playerOneNumber}. <br> It is now Player 2's turn. Press submit.`;
    } else if (
      input == 2 &&
      hasPlayerOneRolled == true &&
      hasPlayerTwoRolled == false
    ) {
      playerOneNumber = playerOneArray[1] * 10 + playerOneArray[0];
      return `Player 1, you chose Dice 2 first. <br> Your number is ${playerOneNumber}. <br> It is now Player 2's turn. Press submit.`;
    }

    // player two rolls dice
    console.log("playerTwoArray", playerTwoArray);
    if (hasPlayerOneRolled == true && hasPlayerTwoRolled == false) {
      // set switch to true since player one has rolled the dice and prompt to choose order has come out
      hasPlayerTwoRolled = true;
      return `Welcome Player 2. <br> You rolled ${playerTwoArray[0]} for Dice 1 and ${playerTwoArray[1]} for Dice 2. <br> Choose the order of the dice.`;
    }

    // determine player one number based on what he has chosen
    if (
      input == 1 &&
      hasPlayerOneRolled == true &&
      hasPlayerTwoRolled == true
    ) {
      playerTwoNumber = playerTwoArray[0] * 10 + playerTwoArray[1];
      return `Player 2, you chose Dice 1 first. <br> Your number is ${playerTwoNumber}. <br> Press submit to see who the winner is.`;
    } else if (
      input == 2 &&
      hasPlayerOneRolled == true &&
      hasPlayerTwoRolled == true
    ) {
      playerTwoNumber = playerTwoArray[1] * 10 + playerTwoArray[0];
      return `Player 2, you chose Dice 2 first. <br> Your number is ${playerTwoNumber}. <br> Press submit to see who the winner is. `;
    }

    if ((hasplayerOneRolled = true && hasPlayerTwoRolled == true)) {
      if (playerOneNumber > playerTwoNumber) {
        myOutputValue = `Player 1: ${playerOneNumber} vs Player 2: ${playerTwoNumber} <br> <br> Player 1 wins. <br> <br> Press submit to start a new round.`;
      }
      if (playerOneNumber < playerTwoNumber) {
        myOutputValue = `Player 1: ${playerOneNumber} vs Player 2: ${playerTwoNumber} <br> <br> Player 2 wins. <br> <br> Press submit to start a new round.`;
      }
      if (playerOneNumber == playerTwoNumber) {
        myOutputValue = `Player 1: ${playerOneNumber} vs Player 2: ${playerTwoNumber} <br> <br> It is a draw. <br> <br> Press submit to start a new round.`;
      }
    }

    // reset counters for base game
    hasPlayerOneRolled = false;
    hasPlayerTwoRolled = false;
    playerOneArray = [];
    playerTwoArray = [];
    playerOneArray.push(diceRoll());
    playerOneArray.push(diceRoll());
    console.log("playerOneArray: ", playerOneArray);
    playerTwoArray.push(diceRoll());
    playerTwoArray.push(diceRoll());
    console.log("playerOneArray: ", playerOneArray);
    playerOneNumber = "";
    playerTwoNumber = "";
  }

  if (gameMode == "smallest") {
    var winningDetails = smallestNum(numOfPlayers, numOfRolls);
    myOutputValue = `Player ${winningDetails[0]} won with the smallest number of ${winningDetails[1]}. <br> Press submit to play again.`;
  }

  return myOutputValue;
};
