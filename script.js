//=========Project 2: Beat That ===========

// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Global Variables
var GAME_MODE_DICE_ROLL = `GAME_MODE_DICE_ROLL`;
var GAME_MODE_CHOOSE_DICE_ORDER = `GAME_MODE_CHOOSE_DICE_ORDER`;
var GAME_MODE_DETERMINE_WINNER = `GAME_MODE_DETERMINE_WINNER`;
var currentGameMode = GAME_MODE_DICE_ROLL;
var NUM_OF_DICES = 2;
var NUM_OF_PLAYERS = 2;
var currentPlayer = 1;
var playerRolls = [];
var diceOrder = 0;
var playerValue = 0;
var playersValues = [];
var myOutputValue = ``;

// ===============Helper functions==================
var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var playerRollDice = function () {
  for (var counterA = 0; counterA < NUM_OF_DICES; counterA += 1) {
    playerRolls.push(rollDice());
    console.log("during dice roll", playerRolls);
  }
  myOutputValue = `Welcome Player ${currentPlayer}!<br><br>You have rolled:-<br>Dice 1 >> ${playerRolls[0]}<br>Dice 2 >> ${playerRolls[1]}<br>Please key in 1️⃣ or 2️⃣ to decide the order of your dices.`;
  return myOutputValue;
};

var playerChooseDiceOrder = function (diceOrder) {
  //check if dice order input is correct ie within number of dices or number of elements in roll array
  if (diceOrder > playerRolls.Length) {
    myOutputValue = `Error! Please key a number within 1 to ${playerRolls.Length} to decide the order of your dices.`;
  } else if (diceOrder == 1) {
    //if player choose first dice, string first dice then second dice
    console.log("before string", playerRolls);
    playerValue = Number(String(playerRolls[0]) + String(playerRolls[1]));
    console.log("after string", playerRolls);
    //store the players' value in the array.
    playersValues.push(playerValue);
    console.log("player value storage", playerValue, playersValues);
    myOutputValue = `You chose Dice ${diceOrder} first, so your number is ${playerValue}.<br><br><br>Click on "Submit" for Player ${currentPlayer} to roll your dices or key in "End" to determine the winner.`;
  } else if (diceOrder == 2) {
    //if player choose second dice, string second dice then first dice
    console.log("before string", playerRolls);
    //the 'N" in Number must be caps else it wont work.
    playerValue = Number(String(playerRolls[1]) + String(playerRolls[0]));
    console.log("after string", playerRolls);
    //store the players' value in the array.
    playersValues.push(playerValue);
    console.log("player value storage", playerValue, playersValues);
    myOutputValue = `You chose Dice ${diceOrder} first, so your number is ${playerValue}.<br><br><br>Click on "Submit" for Player ${currentPlayer} to roll your dices or key in "End" to determine the winner.`;
  }
  return myOutputValue;
};

var determineWinnerResults = function () {
  var playerOneValue = playersValues[0];
  var playerTwoValue = playersValues[1];
  console.log("player1", playerOneValue, "player2", playerTwoValue);
  var playerOneWinCount = 0;
  var playerTwoWinCount = 0;
  if (playerOneValue == playerTwoValue) {
    myOutputValue = `Let's see who's the winner? 🏆<br>Player 1: ${playerOneValue}<br>Player 2: ${playerTwoValue}<br><br> 🥁🥁🥁🥁🥁🥁 <br> It's a tie.`;
    playerOneWinCount += 1;
    playerTwoWinCount += 1;
  } else if (playerOneValue < playerTwoValue) {
    myOutputValue = `Let's see who's the winner? 🏆<br>Player 1: ${playerOneValue}<br>Player 2: ${playerTwoValue}<br><br> 🥁🥁🥁🥁🥁🥁 <br> It's Player 2!`;
    playerTwoWinCount += 1;
  } else if (playerOneValue > playerTwoValue) {
    myOutputValue = `Let's see who's the winner? 🏆<br>Player 1: ${playerOneValue}<br>Player 2: ${playerTwoValue}<br><br> 🥁🥁🥁🥁🥁🥁 <br> It's Player 1!`;
    playerOneWinCount += 1;
  } else console.log("error");
  return myOutputValue;
};

//=====MAIN function =============

var main = function (input) {
  if (input === "End") {
    currentGameMode = GAME_MODE_DETERMINE_WINNER;
    myOutputValue = determineWinnerResults();
    playersValues = [];
    return myOutputValue;
  } else {
    myOutputValue = "Error, please refresh to reset the game.";
  }

  if (currentGameMode == GAME_MODE_DICE_ROLL) {
    myOutputValue = playerRollDice();
    currentGameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (currentGameMode == GAME_MODE_CHOOSE_DICE_ORDER) {
    currentGameMode = GAME_MODE_DICE_ROLL;
    currentPlayer = currentPlayer + 1;
    myOutputValue = playerChooseDiceOrder(input);
    playerRolls = [];
    console.log("current game mode", currentGameMode);

    return myOutputValue;
  }

  return myOutputValue;
};
