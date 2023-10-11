// Basics - Beat That Rules and Brief Flow
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// first input is player will enter their name, and then
// a helper function will roll dice which returns a number between 1 to 6 and store this number in first index of playerOneDiceRolls array. roll dice again and store this number in second index of playerOneDiceRolls array
// the game state needs to then change to ask user to input how they want to sequence the dice rolls. Instruct player to input the dice number they want in the tens position
// E.g. if the roll is 3 for Dice One and 6 for Dice Two, i input 2 because i want Dice Two as the tens place. Then the code will minus 1 from it to find out the index position of the tens number in the array
// then we will assign the numbers into variables playerOneTens and playerOneOnes
// Then, we need to make the numbers into a String so we can concatenate them. This concatenation will be stored in playerOneConcatenatedString
// and then turn them back into a Number so we can compare the numbers later on. This reverse type will be stored in playerOneFinalNumber
// 3 Helper function to return the final number:
// 1. function to return the number in the tens position
// 2. function to return the number in the ones position
// 3. function to return the final number concatenated and Number type
// put all of the playerOneChoice code into a helper function so that it makes main more concise
// need to make the playerOne numbers global. so the helper function can access them and store them
// then we will need to switch gamestates to player two
// then compare the final numbers

// Make the dice roll variables global because we will need to switch game states
var gameState = "rollPlayerOneDice";
var playerOneDiceRollsArray = [];
var playerOneNumberTensPosition;
var playerOneNumberOnesPosition;
var playerOneFinalNumber;

var playerTwoDiceRollsArray = [];
var playerTwoNumberTensPosition;
var playerTwoNumberOnesPosition;
var playerTwoFinalNumber;

var main = function (input) {
  var myOutputValue = "";
  // start off with Player One roll dice
  if (gameState == "rollPlayerOneDice") {
    for (var i = 0; i < 2; i += 1) playerOneDiceRollsArray[i] = rollDice(); // rolls dice twice and stores it in the corresponding index of the array
    myOutputValue = `Welcome Player 1.<br>You rolled ${playerOneDiceRollsArray[0]} for Dice One and ${playerOneDiceRollsArray[1]} for Dice Two.<br>Choose the order of your dice`;
    gameState = "askPlayerOneChoice";
    // change gamestate to get playerOne's Dice Number choice as input. Then activate the helper functions to return the final number
  } else if (gameState == "askPlayerOneChoice") {
    var diceNumberChosen = input;
    playerOneFinalNumber = activateReturnNumberFunctions(
      diceNumberChosen,
      playerOneDiceRollsArray,
      playerOneNumberTensPosition,
      playerOneNumberOnesPosition,
      playerOneFinalNumber
    );
    myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number is ${playerOneFinalNumber}.<br>It is now Player 2's turn.`;
    gameState = "rollPlayerTwoDice";
    // swap gameState to initiate the same above code we did for playerTwo
  } else if (gameState == "rollPlayerTwoDice") {
    for (var i = 0; i < 2; i += 1) playerTwoDiceRollsArray[i] = rollDice();
    myOutputValue = `Player 2, you rolled ${playerTwoDiceRollsArray[0]} for Dice One and ${playerTwoDiceRollsArray[1]} for Dice Two.<br>Choose the order of your dice`;
    gameState = "askPlayerTwoChoice";
  }
  return myOutputValue;
};

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
};

// Function to activate the helper functions returning the final number
var activateReturnNumberFunctions = function (
  chosenDiceNumber,
  playerXDiceRollsArray,
  playerXNumberTensPosition,
  playerXNumberOnesPosition,
  playerXFinalNumber
) {
  var diceNumberChosen = chosenDiceNumber;
  playerXNumberTensPosition = returnNumberInTensPosition(
    diceNumberChosen,
    playerXDiceRollsArray
  );
  playerXNumberOnesPosition = returnNumberInOnesPosition(
    playerXNumberTensPosition,
    playerXDiceRollsArray
  );
  playerXFinalNumber = returnFinalNumber(
    playerXNumberTensPosition,
    playerXNumberOnesPosition
  );
  return playerXFinalNumber;
};

// Return number in the tens position
var returnNumberInTensPosition = function (
  selectedDiceNumber,
  playerDiceRollArray
) {
  var diceNumberInTensPosition = selectedDiceNumber;
  var indexNumberInTensPosition = diceNumberInTensPosition - 1;
  var numberInTensPosition = playerDiceRollArray[indexNumberInTensPosition];
  return numberInTensPosition;
};

// Return number in ones position
var returnNumberInOnesPosition = function (
  numberInTensPosition,
  playerDiceRollArray
) {
  var numberInOnesPosition = playerDiceRollArray.find(function (
    elementInArray
  ) {
    return elementInArray != numberInTensPosition;
  });
  return numberInOnesPosition;
};

// Return the two numbers concatenated
var returnFinalNumber = function (tensPositionNumber, onesPositionNumber) {
  concatenatedString = "" + tensPositionNumber + onesPositionNumber;
  convertedNumber = Number(concatenatedString);
  return convertedNumber;
};
