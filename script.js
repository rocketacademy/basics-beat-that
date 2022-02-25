// ===== THE GAME ===== //
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// ===== SEQUENCE OF EVENTS ===== //
// 1) Game Mode Roll Dice: Create 2 dice rolls and return output for Player 1
// 2) Game Mode Choose Dice Order: Player 1 to select the dice order and return combined number for Player 1
// 3) Game Mode Roll Dice: Create 2 dice rolls and return output for Player 2
// 4) Game Mode Choose Dice Order: Player 2 to select the dice order and return combined number for Player 2
// 5) Compare combined number for Player 1 against combined number for Player 2 and declare winner of highest combined number
// 6) Players 1 and 2 must be able to play the game again (reset back to point 1)

// ======================================== //

// Global Variables
var gameMode = "Roll Dice";
var getPlayerDice = [];
var playerValue = "";

// Function to Roll Dice
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  console.log("This is the Dice Number:", diceNumber);
  return diceNumber;
};

// Function to Roll 2 Dice and display both numbers
var rollBothDice = function () {
  var counter = 0;
  while (counter < 2) {
    getPlayerDice.push(rollDice());
    counter++;
  }
  console.log("This is the Player's Dice Numbers:", getPlayerDice);
  return `Rolly polly, here are your rolls!
  <br><br> Dice 1: ${getPlayerDice[0]} | Dice 2: ${getPlayerDice[1]}
  <br><br> Now, select either "1" (Dice 1 comes first) or "2" (Dice 2 comes first) to determine the order of your dice.`;
};

// Function to display Player Value
var displayPlayerValue = function (input) {
  // Input validation if user does not choose either "1" or "2"
  if (input != 1 && input != 2) {
    console.log("Invalid input:", input);
    return `That is an invalid choice! Please type either "1" or "2" to select which dice should be ordered first.
      <br><br>As a reminder, Dice 1: ${getPlayerDice[0]} | Dice 2: ${getPlayerDice[1]}`;
  }

  // When Input is "1"
  if (input == 1) {
    playerValue = Number(`${getPlayerDice[0]}${getPlayerDice[1]}`);
    console.log("The player input 1. The player's value is", playerValue);
    return `Your number is ${playerValue}`;
  }

  // When Input is "2"
  if (input == 2) {
    playerValue = Number(`${getPlayerDice[1]}${getPlayerDice[0]}`);
    console.log("The player input 2. The player's value is", playerValue);
    return `Your number is ${playerValue}`;
  }
};

var main = function (input) {
  var myOutputValue = "";
  // Game Mode to Roll Both Dice
  if (gameMode == "Roll Dice") {
    myOutputValue = rollBothDice();

    // Switch Game Mode to choose Dice Order
    gameMode = "Choose Dice Order";
    return myOutputValue;
  }

  if (gameMode == "Choose Dice Order") {
    myOutputValue = displayPlayerValue();
    return myOutputValue;
  }
};
