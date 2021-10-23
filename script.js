/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

/* Pseudo code for basic project 2
when click submit, roll 2 dice, output the 2 dice roll.

player pick 1st dice order by inputting 1 or 2

concat the player guess + remaining as dice roll result

next player

repeat dice roll and order

compare results, higher result win
*/

// GLOBAL VARIBLES
var MODE = "init"; // init, order
var PLAYER1 = [];

var rollDice = function () {
  var diceValue = Math.floor(Math.random() * 6) + 1; // return 1 to 6 inclusive
  console.log(`running function rollDice: ${diceValue}`);
  console.log("====================");
  return diceValue;
};

var main = function (input) {
  // first load = init, player 1 starts first
  if (MODE === "init") {
    // when submit, roll 2 dice
    PLAYER1[0] = rollDice();
    PLAYER1[1] = rollDice();
    return `Welcome Player 1.
    <br>
    You rolled ${PLAYER1[0]} for Dice 1 and ${PLAYER1[1]} for Dice 2
    <br>
    Choose the order of the dice.`;
  }

  var myOutputValue = "hello world";
  return myOutputValue;
};
