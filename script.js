/*There are 2 players and players take turns.

When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

/* Pseudo code for basic project 2
when click submit, roll 2 dice, output the 2 dice roll. (first submit)

player 1 pick 1st dice order by inputting 1 or 2 (second submit)

concat the player guess + remaining as dice roll result

next player 2

repeat dice roll (third submit)

repeat order (fourth submit)

compare results, higher result win
*/

// GLOBAL VARIABLES
var mode = "roll dice"; // expect "roll dice" and "order dice"
var currentPlayer = 1; // number of players
var playerOne = [];
var playerOneOrderedDice = "";
var playerTwo = [];
var playerTwoOrderedDice = "";

var rollDice = function () {
  diceValue = Math.floor(Math.random() * 6) + 1; // expect 1 to 6 inclusive
  return diceValue;
};

var getDiceRoll = function (playerArray) {
  playerArray[0] = rollDice();
  playerArray[1] = rollDice();
  console.log(playerArray);
  return;
};

var showRollMessage = function (playerArray) {
  var message = `Welcome Player ${currentPlayer}
  <br>
  You rolled ${playerArray[0]} for Dice 1 and ${playerArray[1]} for Dice 2.
  <br>
  Choose the order of the dice.
  <br>
  Input 1 or 2`;
  return message;
};

var orderDiceValues = function (playerArray, userInput, currentPlayer) {
  // if user input = 1, concat array[0] and array[1]
  // if user input = 2, concat array[1] and array[0]
  if (userInput === "1" && currentPlayer == 1) {
    playerOneOrderedDice = Number(
      String(playerArray[0]) + String(playerArray[1])
    ); // expect integar
    console.log(userInput, playerOneOrderedDice);
    return;
  }
  if (userInput === "2" && currentPlayer == 1) {
    playerOneOrderedDice = Number(
      String(playerArray[1]) + String(playerArray[0])
    ); // expect integar
    console.log(userInput, playerOneOrderedDice);
    return;
  }
  if (userInput === "1" && currentPlayer == 2) {
    playerTwoOrderedDice = Number(
      String(playerArray[0]) + String(playerArray[1])
    ); // expect integar
    console.log(userInput, playerTwoOrderedDice);
    return;
  }
  if (userInput === "2" && currentPlayer == 2) {
    playerTwoOrderedDice = Number(
      String(playerArray[1]) + String(playerArray[0])
    ); // expect integar
    console.log(userInput, playerTwoOrderedDice);
    return;
  }
};

var showOrderMessage = function (playerOrderedDice, userInput) {
  message = `Player ${currentPlayer - 1}, you chose Dice ${userInput} first.
  <br>
  Your number is ${playerOrderedDice}.
  <br>
  It is now Player ${currentPlayer}'s turn.`;
  return message;
};

var isDraw = function (playerOneValue, playerTwoValue) {
  if (playerOneValue == playerTwoValue) {
    return true;
  }
};

var showDrawMessage = function () {
  message = `Player 1, your number is ${playerOneOrderedDice}.
  <br>
  Player 2, your number is ${playerTwoOrderedDice}.
  <br>
  It is a draw!`;
  return message;
};

var didPlayerOneWin = function (playerOneValue, playerTwoValue) {
  if (playerOneValue > playerTwoValue) {
    return true;
  } else {
    return false;
  }
};

var showPlayerOneWin = function () {
  message = `Player 1, your number is ${playerOneOrderedDice}.
  <br>
  Player 2, your number is ${playerTwoOrderedDice}.
  <br>
  Player 1 wins!`;
  return message;
};

var showPlayerTwoWin = function () {
  message = `Player 1, your number is ${playerOneOrderedDice}.
  <br>
  Player 2, your number is ${playerTwoOrderedDice}.
  <br>
  Player 2 wins!`;
  return message;
};

var main = function (input) {
  // first submit
  // roll 2 dice for player 1
  if (mode === "roll dice" && currentPlayer === 1) {
    getDiceRoll(playerOne);
    mode = "order dice";
    return showRollMessage(playerOne);
  }

  // second submit
  // order dice value for player 1
  if (mode === "order dice" && currentPlayer === 1) {
    orderDiceValues(playerOne, input, currentPlayer);
    mode = "roll dice";
    currentPlayer = 2;
    return showOrderMessage(playerOneOrderedDice, input);
  }

  // third submit
  // roll 2 dice for player 2
  if (mode === "roll dice" && currentPlayer === 2) {
    getDiceRoll(playerTwo);
    mode = "order dice";
    return showRollMessage(playerTwo);
  }

  // fourth submit
  // order dice value for player 2
  if (mode === "order dice" && currentPlayer === 2) {
    orderDiceValues(playerTwo, input, currentPlayer);
  }

  // all players rolled and ordered
  // highest number wins
  // force and check for draw
  // playerOneOrderedDice = 10;
  // playerTwoOrderedDice = 10;
  if (isDraw(playerOneOrderedDice, playerTwoOrderedDice)) {
    mode = "roll dice";
    currentPlayer = 1;
    return showDrawMessage();
  }
  // check which player wins
  if (didPlayerOneWin(playerOneOrderedDice, playerTwoOrderedDice)) {
    mode = "roll dice";
    currentPlayer = 1;
    return showPlayerOneWin();
  } else {
    mode = "roll dice";
    currentPlayer = 1;
    return showPlayerTwoWin();
  }
};
