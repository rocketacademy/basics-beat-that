// GLOBAL VARIABLES
var gameStateDiceRoll = "gameStateDiceRoll";
var gameStateOrder = "gameStateOrder";
var gameStateCompare = "gameStateCompare";
var gameStateReset = "gameStateReset";
var gameState = "gameStateDiceRoll";
var player = 1;
var currentRoll = [];
var diceCalcHolder = [];

// HELPER FUNCTION
// Dice roll function
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInterger = Math.floor(randomDecimal + 1);
  console.log(`Random interger ${randomInterger}`);
  return randomInterger;
};

// Function that rolls the dice twice and store it in the array currentRoll
var playerRoll = function () {
  var counter = 0;
  var message = "";

  while (counter < 2) {
    counter += 1;
    currentRoll.push(diceRoll());
  }
  console.log(`While loop to roll dice twice`, currentRoll);
  message = `Welcome player ${player}. Please select which order dice one and two to form the highest value by selecting '1' or '2'<br>
  Dice one: ${currentRoll[0]} <br> Dice two: ${currentRoll[1]}`;

  return message;
};

// Function that concatanate two strings together
var addNum = function (playerInput) {
  var diceCalc;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    myOutputValue = `ERROR! <br> Please select which order dice one and two to form the highest value by selecting '1' or '2'<br>
  Dice one: ${currentRoll[0]} <br> Dice two: ${currentRoll[1]}`;
    return myOutputValue;
  }
  // playerInput
  else if (playerInput == 1) {
    diceCalc = Number(String(currentRoll[0])) + String(currentRoll[1]);
    myOutputValue = `Your value added up to be ${diceCalc}. `;
  } else if (playerInput == 2) {
    diceCalc = Number(String(currentRoll[1])) + String(currentRoll[0]);
    myOutputValue = `Your value added up to be ${diceCalc}. `;
  }
  console.log(`Push diceCalc value into holder ${diceCalc}`);
  diceCalcHolder.push(diceCalc);
  currentRoll = [];
  return myOutputValue;
};

// Function that compares the two scores
var scoreComparison = function () {
  var message = "";
  if (gameState == gameStateCompare) {
    // Player 1 win condition
    if (diceCalcHolder[0] > diceCalcHolder[1]) {
      message = `🥇Player 1 wins🥇! <br><br> Player 1 dice value is ${diceCalcHolder[0]} <br> Player 1 dice value is ${diceCalcHolder[1]} <br><br><br> Click submit to reset game.`;
    }
    // Player 2 win condition
    else if (diceCalcHolder[1] > diceCalcHolder[0]) {
      message = `🥇Player 2 wins🥇! <br><br> Player 2 dice value is ${diceCalcHolder[1]} <br> Player 1 dice value is ${diceCalcHolder[0]} <br><br><br> Click submit to reset game.`;
    }
    // TIE
    else if ((diceCalcHolder[1] = diceCalcHolder[0])) {
      message = `It's a tie! <br><br> Player 2 dice value is ${diceCalcHolder[1]} <br> Player 1 dice value is ${diceCalcHolder[0]} <br><br><br> Click submit to reset game.`;
    }
  }
  return message;
};

// MAIN FUNCTION
var main = function (input) {
  var myOutputValue = "";

  // Dice roll
  if (gameState == gameStateDiceRoll) {
    console.log(`Control flow: Set game to dice roll state`);
    gameState = gameStateOrder;
    myOutputValue = playerRoll();
    return myOutputValue;
  }

  // Order the dice
  if (gameState == gameStateOrder) {
    console.log(`Control flow: Set game to dice order state`);
    myOutputValue = addNum(input);
    if (player == 1) {
      player = 2;
      gameState = gameStateDiceRoll;
      return (
        myOutputValue + `<br> Click submit button for player 2 to roll the dice`
      );
    } else if (player == 2) {
      gameState = gameStateCompare;
      return myOutputValue + `<br>  Click submit button to reveal the winner!`;
    }
    return myOutputValue;
  }

  // Compare the dice values
  if (gameState == gameStateCompare) {
    myOutputValue = scoreComparison();
    gameState = gameStateReset;
    return myOutputValue;
  }

  // Reset the game
  if (gameState == gameStateReset) {
    player = 1;
    gameState = gameStateDiceRoll;
    diceCalcHolder = [];
    return `--GAME RESET-- <br> Player 1 turn. <br> Click Submit to roll dice.`;
  }
};
