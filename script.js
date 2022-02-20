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
var diceRollGameModePlayer1 = "Initiate dice roll for player 1";
var diceOrderGameModePlayer1 = "Choose dice order for player 1";
var diceRollGameModePlayer2 = "Initiate dice roll for player 2";
var diceOrderGameModePlayer2 = "Choose dice order for player 2";
var gameMode = diceRollGameModePlayer1;
var diceRollArray = [];
var chooseNumberArray = [];
var counter = 0;

var main = function (input) {
  if (gameMode == diceRollGameModePlayer1) {
    // define variable for PLayer 1's roll dice array
    var myOutputValue = rollAndStoreDice();

    //change game mode to dice order game mode
    gameMode = diceOrderGameModePlayer1;
    console.log(gameMode);
    return myOutputValue;
  }

  if (gameMode == diceOrderGameModePlayer1) {
    if (input == 1) {
      var doubleDigitNumber = Number(`${diceRollArray[0]}${diceRollArray[1]}`);
      chooseNumberArray = chooseNumberArray.push(doubleDigitNumber);
      console.log(chooseNumberArray);

      gameMode = diceRollGameModePlayer2;
      console.log(gameMode);
      return `Hi Player 1, you have chosen ${doubleDigitNumber}. Now it is Player 2's turn to play.`;
    }
    if (input == 2) {
      var doubleDigitNumber = Number(`${diceRollArray[1]}${diceRollArray[0]}`);
      chooseNumberArray = chooseNumberArray.push(doubleDigitNumber);
      console.log(chooseNumberArray);

      gameMode = diceRollGameModePlayer2;
      console.log(gameMode);
      return `Hi Player 1, you have chosen ${doubleDigitNumber}. Now it is Player 2's turn to play.`;
    }
    if (input != 1 || input != 2) {
      return `Hi Player 1, you have not typed in 1 or 2, please type in 1 or 2 <br> <br>
      You have rolled Dice 1 as ${diceRollArray[0]} and Dice 2 as ${diceRollArray[1]}. <br> <br>`;
    }
  }
};

// Helper functions below

// roll 2 dice for each player and store the numbers in array function
var rollAndStoreDice = function () {
  while (counter < 2) {
    // push rolled dice into array
    diceRollArray.push(rollDice());
    // increase counter by 1
    counter = counter + 1;
  }
  console.log(diceRollArray);
  return `Hi Player 1, you have rolled Dice 1 as ${diceRollArray[0]} and Dice 2 as ${diceRollArray[1]}. <br> <br> Please enter 1 or 2 to select the order of the first digit`;
};

// roll dice function
var rollDice = function () {
  // create random decimal from 0 to 6
  var randomDecimal = Math.random() * 6;

  // remove decimal and + 1
  // This will be integer from 1 to 6 inclusive
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};
