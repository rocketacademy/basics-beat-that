// choose a number between 1 to 6 each dice roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// each player returns n times dice rolls
var playerDiceRolls = function (numOfRolls) {
  var playerRollsArray = [];
  rollCounter = 0;
  while (rollCounter < numOfRolls) {
    playerRollsArray.push(diceRoll());
    rollCounter += 1;
  }
  return playerRollsArray;
};

var hasPlayerOneRolled = false;
var hasPlayerTwoRolled = false;
var playerOneArray = playerDiceRolls(2);
var playerTwoArray = playerDiceRolls(2);
var playerOneNumber = "";
var playerTwoNumber = "";

var main = function (input) {
  // player one rolls dice
  console.log("playerOneArray", playerOneArray);
  if (hasPlayerOneRolled == false && hasPlayerTwoRolled == false) {
    // set switch to true since player one has rolled the dice and prompt to choose order has come out
    hasPlayerOneRolled = true;
    return `Welcome Player 1. <br> You rolled ${playerOneArray[0]} for Dice 1 and ${playerOneArray[1]} for Dice 2. <br> Choose the order of the dice.`;
  }

  // determine player one number based on what he has chosen
  if (input == 1 && hasPlayerOneRolled == true && hasPlayerTwoRolled == false) {
    playerOneNumber = playerOneArray[0] * 10 + playerOneArray[1];
    return `Player 1, you chose Dice 1 first. <br> Your number is ${playerOneNumber}. <br> It is now Player 2's turn.`;
  } else if (
    input == 2 &&
    hasPlayerOneRolled == true &&
    hasPlayerTwoRolled == false
  ) {
    playerOneNumber = playerOneArray[1] * 10 + playerOneArray[0];
    return `Player 1, you chose Dice 2 first. <br> Your number is ${playerOneNumber}. <br> It is now Player 2's turn.`;
  }

  // player two rolls dice
  console.log("playerTwoArray", playerTwoArray);
  if (hasPlayerOneRolled == true && hasPlayerTwoRolled == false) {
    // set switch to true since player one has rolled the dice and prompt to choose order has come out
    hasPlayerTwoRolled = true;
    return `Welcome Player 2. <br> You rolled ${playerTwoArray[0]} for Dice 1 and ${playerTwoArray[1]} for Dice 2. <br> Choose the order of the dice.`;
  }

  // determine player one number based on what he has chosen
  if (input == 1 && hasPlayerOneRolled == true && hasPlayerTwoRolled == true) {
    playerTwoNumber = playerTwoArray[0] * 10 + playerTwoArray[1];
    return `Player 2, you chose Dice 1 first. <br> Your number is ${playerTwoNumber}.`;
  } else if (
    input == 2 &&
    hasPlayerOneRolled == true &&
    hasPlayerTwoRolled == true
  ) {
    playerTwoNumber = playerTwoArray[1] * 10 + playerTwoArray[0];
    return `Player 2, you chose Dice 2 first. <br> Your number is ${playerTwoNumber}. `;
  }

  if ((hasplayerOneRolled = true && hasPlayerTwoRolled == true)) {
    if (playerOneNumber > playerTwoNumber) {
      myOutputValue = `Player 1: ${playerOneNumber} vs Player 2: ${playerTwoNumber} <br> <br> Player 1 wins. <br> <br> Press submit to start a new round.`;
    } else {
      myOutputValue = `Player 1: ${playerOneNumber} vs Player 2: ${playerTwoNumber} <br> <br> Player 2 wins. <br> <br> Press submit to start a new round.`;
    }
  }

  // reset counters
  hasPlayerOneRolled = false;
  hasPlayerTwoRolled = false;
  playerOneArray = playerDiceRolls(2);
  playerTwoArray = playerDiceRolls(2);
  playerOneNumber = "";
  playerTwoNumber = "";

  return myOutputValue;
};
