/* There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. 

For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.

time log
18/2: 1 hour
*/

// input order of dice
// output comparison of numbers and return winner.

// declare game mode constant variables
var GAME_MODE_ROLL_DICE = "ROLL_DICE";
var GAME_MODE_PLAYER1_NUM_DICE = "ENTER_ORDER_1";
var GAME_MODE_PLAYER2_NUM_DICE = "ENTER_ORDER_2";

// initialise game mode to enter num dice mode
var gameMode = GAME_MODE_ROLL_DICE;

// create global arrays for player 1 and player 2
var player1DiceRolled = [];
var player2DiceRolled = [];

// Generate a random integer from 1 to 6

var rollDice = function () {
  // return 2;
  var choicesInDice = 6;
  var randomDecimal = Math.random() * choicesInDice;
  var randomInteger = Math.floor(randomDecimal);
  var rolledDice = randomInteger + 1;
  return rolledDice;
};

// sequence of events:
// auto rolls 2 dice for player 1
// player 1 enter choice of sequence
// add the numbers 6 + 5 = 65.
// auto rolls 2 dice for player 1
// player 2 enter choice of sequence
// add the numbers 3 + 1 = 31.
// compare the two values then return the winner.
// restart game

var main = function () {
  if (gameMode == GAME_MODE_ROLL_DICE) {
    var diceRoll1 = rollDice();
    player1DiceRolled.push(diceRoll1);

    var diceRoll2 = rollDice();
    player1DiceRolled.push(diceRoll2);

    console.log(diceRoll1);
    console.log(diceRoll2);
    console.log(player1DiceRolled);

    gameMode = GAME_MODE_PLAYER1_NUM_DICE;
    myOutputValue =
      "Hello, you rolled " +
      diceRoll1 +
      " for dice 1 and " +
      diceRoll2 +
      " for dice 2. Choose the order of the dice by entering '1' or '2' which dice to be first!";
    return myOutputValue;
  }
  //if (gameMode == GAME_MODE_PLAYER1_NUM_DICE) {
  //var choiceIs = player1DiceRolled[index];
  // return choiceIs;
  //}

  return "quick end";
};
