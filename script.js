// ===== THE GAME ===== //
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// ===== SEQUENCE OF EVENTS ===== //
// 1) Game Mode Roll Dice: Create 2 dice rolls and return output for Player 1
// 2) Game Mode Choose Dice: Player 1 to select the dice order and return combined number for Player 1
// 3) Game Mode Roll Dice: Create 2 dice rolls and return output for Player 2
// 4) Game Mode Choose Dice: Player 2 to select the dice order and return combined number for Player 2
// 5) Compare combined number for Player 1 against combined number for Player 2 and declare winner of highest combined number
// 6) Players 1 and 2 must be able to play the game again (reset back to point 1)

// ======================================== //

// Global Variables
var gameMode = "Roll Dice";
var getPlayerDice = [];

// Function to Roll Dice
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  console.log("This is the Dice Number:", diceNumber);
  return diceNumber;
};

var rollBothDice = function () {
  var counter = 0;
  while (counter < 2) {
    getPlayerDice.push(rollDice());
    counter++;
  }
  console.log("This is the Player's Dice Numbers:", getPlayerDice);
  return `You rolled ${getPlayerDice[0]} for Dice 1 and ${getPlayerDice[1]} for Dice 2.`;
};

var main = function (input) {
  var myOutputValue = rollBothDice();
  return myOutputValue;
};
