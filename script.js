/*
There are 2 players and players take turns
.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

var gameState = "pageLoad"
var player1Roll = [];
var player2Roll = [];
var currentPlayerRoll = 1;
var currentPlayer = 1;
var player1Score = 0;
var player2Score = 0;
var player1TotalWins = 0;
var player2TotalWins = 0;

var main = function (input) {
  var myOutputValue = diceRoll();
  return myOutputValue;
};

//function for random dice roll
var diceRoll = function() {
  var randNum1to6 = Math.ceil(Math.random() * 6);
  return randNum1to6
  console.log(randNum1to6)
}

var getPlayerRolls = function() {
  diceroll1 = diceRoll()
}