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
var compareScoreGameMode = "compare score";
var gameMode = diceRollGameModePlayer1;
var diceRollArray1 = [];
var diceRollArray2 = [];
var chooseNumberArray = [];
var doubleDigitNumber = ``;
var counter = 0;

var main = function (input) {
  if (gameMode == diceRollGameModePlayer1) {
    // define variable for PLayer 1's roll dice array
    var myOutputValue = rollAndStoreDicePlayer1();

    //change game mode to dice order game mode
    gameMode = diceOrderGameModePlayer1;
    console.log(gameMode);
    return myOutputValue;
  }

  // roll dice and set order for Player 1
  if (gameMode == diceOrderGameModePlayer1) {
    if (input == 1) {
      doubleDigitNumber = parseInt(`${diceRollArray1[0]}${diceRollArray1[1]}`);
      chooseNumberArray.push(doubleDigitNumber);

      gameMode = diceRollGameModePlayer2;
      return `Hi Player 1, you have chosen ${doubleDigitNumber}. Now it is Player 2's turn to play.`;
    }
    if (input == 2) {
      doubleDigitNumber = parseInt(`${diceRollArray1[1]}${diceRollArray1[0]}`);
      chooseNumberArray.push(doubleDigitNumber);

      gameMode = diceRollGameModePlayer2;

      return `Hi Player 1, you have chosen ${doubleDigitNumber}. Now it is Player 2's turn to play.`;
    }
    if (input != 1 || input != 2) {
      return `Hi Player 1, you have not typed in 1 or 2, please type in 1 or 2 <br> <br>
      You have rolled Dice 1 as ${diceRollArray1[0]} and Dice 2 as ${diceRollArray1[1]}. <br> <br>`;
    }
  }

  if (gameMode == diceRollGameModePlayer2) {
    // define variable for PLayer 2's roll dice array
    var myOutputValue2 = rollAndStoreDicePlayer2();

    //change game mode to dice order game mode
    gameMode = diceOrderGameModePlayer2;

    return myOutputValue2;
  }

  // roll dice and set order for Player 2
  if (gameMode == diceOrderGameModePlayer2) {
    if (input == 1) {
      doubleDigitNumber = parseInt(`${diceRollArray2[0]}${diceRollArray2[1]}`);
      chooseNumberArray.push(doubleDigitNumber);

      console.log(gameMode);

      // move to compare score game mode
      gameMode = compareScoreGameMode;
      return `Hi Player 2, you have chosen ${doubleDigitNumber}.`;
    }
    if (input == 2) {
      doubleDigitNumber = parseInt(`${diceRollArray2[1]}${diceRollArray2[0]}`);
      chooseNumberArray.push(doubleDigitNumber);
      console.log(chooseNumberArray);

      console.log(gameMode);

      // move to compare score game mode
      gameMode = compareScoreGameMode;
      return `Hi Player 2, you have chosen ${doubleDigitNumber}.`;
    }
    if (input != 1 || input != 2) {
      return `Hi Player 2, you have not typed in 1 or 2, please type in 1 or 2 <br> <br>
      You have rolled Dice 1 as ${diceRollArray2[0]} and Dice 2 as ${diceRollArray2[1]}. <br> <br>`;
    }
  }

  // Determine winner
  if (gameMode == compareScoreGameMode) {
    // player 1 wins condition
    if (chooseNumberArray[0] > chooseNumberArray[1]) {
      // reset to player 1 game mode
      gameMode = diceRollGameModePlayer1;
      // show winning message
      return `Hi Player 1, you have won! Your number is ${chooseNumberArray[0]}, Player 2's number is ${chooseNumberArray[1]}.`;
    }
    // player 2 wins condition
    if (chooseNumberArray[1] > chooseNumberArray[0]) {
      // reset to player 1 game mode
      gameMode = diceRollGameModePlayer1;
      // show winning message
      return `Hi Player 2, you have won! Your number is ${chooseNumberArray[1]}, Player 1's number is ${chooseNumberArray[0]}.`;
    }
    // draw condition
    if (chooseNumberArray[0] == chooseNumberArray[1]) {
      // reset to player 1 game mode
      gameMode = diceRollGameModePlayer1;
      // show winning message
      return `It is a Draw. Player 1's number is ${chooseNumberArray[0]}, Player 2's number is ${chooseNumberArray[1]}.`;
    }
  }
};

// Helper functions below

// roll 2 dice for player 1 and store the numbers in array function
var rollAndStoreDicePlayer1 = function () {
  while (counter < 2) {
    // push rolled dice into array
    diceRollArray1.push(rollDice());
    // increase counter by 1
    counter = counter + 1;
  }
  return `Hi Player 1, you have rolled Dice 1 as ${diceRollArray1[0]} and Dice 2 as ${diceRollArray1[1]}. <br> <br> Please enter 1 or 2 to select the order of the first digit`;
};

// roll 2 dice for player 2 and store the numbers in array function
var rollAndStoreDicePlayer2 = function () {
  // reset counter to 0
  counter = 0;
  while (counter < 2) {
    // push rolled dice into array
    diceRollArray2.push(rollDice());
    // increase counter by 1
    counter = counter + 1;
  }

  return `Hi Player 2, you have rolled Dice 1 as ${diceRollArray2[0]} and Dice 2 as ${diceRollArray2[1]}. <br> <br> Please enter 1 or 2 to select the order of the first digit`;
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
