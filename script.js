// Basics - Beat That Rules and Brief Flow
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// 1st player clicks submit, a helper function will roll dice which returns a number between 1 to 6 and store this number in playerOneFirstDiceRoll. roll dice again and store this number in playerOneSecondDiceRoll
// then, we need to ask the player to specify which order they want the dice to be in

// Make the dice roll variables global because we will need to switch game states
var playerOneDiceRolls = [];

var main = function () {
  for (var i = 0; i < 2; i += 1) playerOneDiceRolls[i] = rollDice(); // rolls dice twice and stores it in the corresponding index of the array
  var myOutputValue = playerOneDiceRolls;
  return myOutputValue;
};

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
};
