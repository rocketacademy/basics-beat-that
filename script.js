/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. 

For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.

time log
18/2: 1 hour
21/2: 
*/

// input order of dice
// output comparison of numbers and return winner.

// declare game mode constant variables
var GAME_MODE_ROLL_DICE = "ROLL_DICE";
var GAME_MODE_ORDER_DICE = "ENTER_ORDER";

// initialise game mode to enter num dice mode
var gameMode = GAME_MODE_ROLL_DICE;

// create strings for player 1 and player 2 combination
var player1Choice = "";
var player2Choice = "";

// create array to store number combinations
var diceArray = [];

// Create placeholder for dice sequence
var firstDice = "";
var secondDice = "";

// number of players in game and start with Player 1
var numPlayers = 2;
var currPlayer = 1;

// helper function: rollDice. Generate a random integer from 1 to 6
var rollDice = function () {
  //return "2";
  var choicesInDice = 6;
  var randomDecimal = Math.random() * choicesInDice;
  var randomInteger = Math.floor(randomDecimal);
  var rolledDice = randomInteger + 1;
  return rolledDice.toString();
};

// helper function: startOver
var startOver = function () {
  gameMode = GAME_MODE_ROLL_DICE;
  firstDice = "";
  secondDice = "";
  currPlayer = 1;
};

// helper function: combiDiceOrder. Puts the dice in player's chosen order
var combiDiceOrder = function (input) {
  if (input == 1) {
    return firstDice + secondDice;
  }
  return secondDice + firstDice;
};

// helper function:

var main = function (input) {
  if (gameMode == GAME_MODE_ROLL_DICE && currPlayer <= numPlayers) {
    firstDice = rollDice();
    secondDice = rollDice();

    /*
    console.log("this is the first dice", firstDice, typeof firstDice);
    secondDice = rollDice();
    console.log(
      "this is the second dice rolled",
      secondDice,
      typeof secondDice
    );
    */

    // Switch modes
    gameMode = GAME_MODE_ORDER_DICE;

    var genericMessage =
      "Hello, Player " +
      currPlayer +
      " you rolled " +
      firstDice +
      " for dice 1 and " +
      secondDice +
      " for dice 2. Choose the order of the dice by entering '1' or '2' which dice to be first!";
    var myOutputValue = genericMessage;
    return myOutputValue;
  }

  if (gameMode == GAME_MODE_ORDER_DICE) {
    if (input == 1 || input == 2) {
      player1Choice = combiDiceOrder(input);
      console.log("this is player1Choice", player1Choice);

      diceArray.push(player1Choice);
      console.log(diceArray);

      // adds 1 so it moves the turn to the next plater
      currPlayer += 1;
      gameMode = GAME_MODE_ROLL_DICE;
      return (
        "You chose " +
        "Dice" +
        input +
        " first. Your dice combination is: " +
        player1Choice
      );
    }
    // Input validation if input is not 1 or 2
    return "Enter 1 or 2 to select your dice order.";
  }

  // calculate maximum
  var highScore = Math.max(...diceArray);
  var winningPlayer = diceArray.indexOf(highScore.toString()) + 1;
  console.log("higher score: " + highScore);
  console.log("winning player", winningPlayer);

  // initiate startOver
  startOver();
  return (
    "This is the high score " +
    highScore +
    "by Player" +
    winningPlayer +
    " Start game again."
  );
};
