// 1) There are 2 players and players take turns.
// 2) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// 3) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// 4) After both players have rolled and chosen dice order, the player with the higher combined number wins.

var DICE_ROLL_STATE = "DICE_ROLL_STATE";
var CHOOSE_ORDER_STATE = "CHOOSE_ORDER_STATE";
var gameState = DICE_ROLL_STATE;
var currentPlayer = 1;
var player1Rolls = [];
var player2Rolls = [];
var player1Choice;
var player2Choice;

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollTwoDiceForPlayer = function () {
  console.log("Control flow: start of rollTwoDiceForPlayer");
  for (var i = 0; i < 2; i++) {
    if (currentPlayer == 1) {
      player1Rolls.push(rollDice());
    } else {
      player2Rolls.push(rollDice());
    }
  }
};

var findWinner = function () {
  if (player1Choice > player2Choice) {
    return 1;
  } else {
    return 2;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click : ", gameState);
  var myOutputValue = "";

  if (gameState == DICE_ROLL_STATE) {
    console.log('Control flow: gameState == "DICE_ROLL_STATE"');
    myOutputValue = rollTwoDiceForPlayer();
    gameState = CHOOSE_ORDER_STATE;

    if (currentPlayer == 1) {
      return `Welcome Player ${currentPlayer} <br>
      You rolled Dice 1: ${player1Rolls[0]} and Dice 2: ${player1Rolls[1]} <br>
      Please only input '1' or '2' to choose the dice that will be used as the first digit.`;
    } else {
      return `Welcome Player ${currentPlayer} <br>
      You rolled Dice 1: ${player2Rolls[0]} and Dice 2: ${player2Rolls[1]} <br>
      Please only input '1' or '2' to choose the dice that will be used as the first digit.`;
    }
  }

  if (gameState == CHOOSE_ORDER_STATE) {
    console.log('Control flow: gameState == "CHOOSE_ORDER_STATE"');
    var displayScore = "";
    //input validation
    if (input != 1 && input != 2) {
      console.log("input is NOT 1 or 2");
      return `Error! Please only input '1' or '2' to choose the dice that will be used as the first digit. Your dice rolls are : <br> Dice 1 : ${player1Rolls[0]} <br> Dice 2 : ${player1Rolls[1]}.`;
    } else if (input == 1) {
      console.log("input == 1");
      if (currentPlayer == 1) {
        player1Choice = player1Rolls[0] * 10 + player1Rolls[1];
        displayScore = `${currentPlayer}'s chosen score is ${player1Choice}.`;
      } else {
        player2Choice = player2Rolls[0] * 10 + player2Rolls[1];
        displayScore = `${currentPlayer}'s chosen score is ${player1Choice}.`;
      }
      //alternative : Number(String(player1Rolls[0]) + String(player1Rolls[1]))
    } else {
      console.log("input == 2");
      if (currentPlayer == 1) {
        player1Choice = player1Rolls[1] * 10 + player1Rolls[0];
        displayScore = `${currentPlayer}'s chosen score is ${player1Choice}.`;
      } else {
        player2Choice = player2Rolls[1] * 10 + player2Rolls[0];
        displayScore = `${currentPlayer}'s chosen score is ${player2Choice}.`;
      }
    }

    if (currentPlayer == 1) {
      console.log("changing player to Player 2");
      currentPlayer = 2;
      gameState = DICE_ROLL_STATE;
      // Return player number to Player 1, let Player 2 know it is their turn
      return `${displayScore} It is now Player 2's turn. Press Submit to roll Player 2's dice.`;
    }

    var winner = findWinner();

    currentPlayer = 1;
    gameState = DICE_ROLL_STATE;

    return ` Player ${winner} has won. <br>
      Player 1's number: ${player1Choice} | Player 2's number: ${player2Choice} <br> <br>
      Click Submit to play again.`;
  }
};
