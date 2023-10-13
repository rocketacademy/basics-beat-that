// Basics - Beat That Rules and Brief Flow
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// Two game states
// First game state is for Player 1 to roll dice.
// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 1 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 1's final number

// Game state will change to roll Player 2's dice
//// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 2 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 2's final number

// Game state will change to compare the two Player's numbers
// final output is to compare Player 1 and Player 2's final number to see whose one is bigger

var gameState = "rollPlayerOneDice";

var playerOneDiceRolls = [];
var playerOneFinalNumber;

var playerTwoDiceRolls = [];
var playerTwoFinalNumber;

var main = function (input) {
  var myOutputValue = "";
  if (gameState == "rollPlayerOneDice") {
    for (var i = 0; i < 2; i += 1) playerOneDiceRolls[i] = rollDice();
    myOutputValue = `Welcome Player 1.<br>You rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
    gameState = "askPlayerOneChoice";
  } else if (gameState == "askPlayerOneChoice") {
    var diceNumberChosen = input;
    var playerOneNumberInTens = returnNumberInTensPosition(
      diceNumberChosen,
      playerOneDiceRolls
    );
    var playerOneNumberInOnes = returnNumberInOnesPosition(
      playerOneNumberInTens,
      playerOneDiceRolls
    );
    playerOneFinalNumber = returnFinalNumber(
      playerOneNumberInTens,
      playerOneNumberInOnes
    );
    myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number is ${playerOneFinalNumber}. Press submit to roll Player 2's dice`;
    gameState = "rollPlayerTwoDice";
  } else if (gameState == "rollPlayerTwoDice") {
    for (var i = 0; i < 2; i += 1) playerTwoDiceRolls[i] = rollDice();
    myOutputValue = `Player 2,<br>You rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
    gameState = "askPlayerTwoChoice";
  } else if (gameState == "askPlayerTwoChoice") {
    var diceNumberChosen = input;
    var playerTwoNumberInTens = returnNumberInTensPosition(
      diceNumberChosen,
      playerTwoDiceRolls
    );
    var playerTwoNumberInOnes = returnNumberInOnesPosition(
      playerTwoNumberInTens,
      playerTwoDiceRolls
    );
    playerTwoFinalNumber = returnFinalNumber(
      playerTwoNumberInTens,
      playerTwoNumberInOnes
    );
    myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number is ${playerTwoFinalNumber}. Press submit once more to see the winner`;
    gameState = "checkWinner";
  } else if (gameState == "checkWinner") {
    finalResult = checkResult(playerOneFinalNumber, playerTwoFinalNumber);
    myOutputValue = `Player 1's number is ${playerOneFinalNumber}<br>Player 2's final number is ${playerTwoFinalNumber}.<br>Result is ${finalResult}.`;
  }
  return myOutputValue;
};

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
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

// checkWinner
var checkResult = function (playerOneNumber, playerTwoNumber) {
  result = "";
  if (playerOneNumber > playerTwoNumber) result = "Player 1 wins";
  else if (playerTwoNumber > playerOneNumber) result = "Player 2 wins";
  else result = "draw";
  return result;
};
