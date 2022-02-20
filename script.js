// ==Requirements==//

/* 

1. There are 2 players and players take turns.

2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

4. After both players have rolled and chosen dice order, the player with the higher combined number wins. 
*/

/* 
Pseudo coding framework:

1. What is the objective?
Compare 2 players' arranged numbers from rolling 2 dice, and determine which player is the winner

2. Break down problem into sub-problems (optional for now)

3. What information do I have?

4. What information do I need?
- Game mode
- 2 x Random dice roll per player

5. How can I get there?
- Initiate default game mode as dice roll mode

Player 1 step
- Let player 1 roll the 2 dice
- Store the 2 dice numbers in the player dice choose array
- Once 2 dice are rolled, initiate choose dice order game mode
- Player to choose Dice roll 1 or Dice roll 2 as the first digit
- Transform the number into string, and concatenate them 
- Store into final number array
- Initiate dice roll mode for player 2

Player 2 step
- Let player 2 roll the 2 dice
- Store the 2 dice numbers in the player dice choose array
- Once 2 dice are rolled, initiate choose dice order game mode
- Player to choose Dice roll 1 or Dice roll 2 as the first digit
- Transform the number into string, and concatenate them 
- Store into final number array, after player 1's number

Comparison step
- Compare the 2 numbers
- Show in message box who is the winner

Reset step
- Reset game to initiate dice roll mode, upon declaration of the winner

*/

//global variables
var diceRollGameMode = "Initiate dice roll";
var diceOrderGameMode = "Choose dice order";
var diceRollArray = [];
var chooseNumberArray = [];

var main = function (input) {
  var randomRollDice = rollDice();
  var myOutputValue = "hello world" + randomRollDice;
  return myOutputValue;
};

// Helper functions below

// roll dice function
var rollDice = function () {
  // create random decimal from 0 to 6
  var randomDecimal = Math.random() * 6;

  // remove decimal and + 1
  // This will be integer from 1 to 6 inclusive
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};
