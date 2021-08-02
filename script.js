//game mode
var diceRollMode = "dice rolling!";
var diceOrderMode = "choose the order of dice";
var beatThatWinner = "comparing the numbers";
//default game mode
var gameMode = diceRollMode;
// players
var player1 = "Player 1";
var player2 = "Player 2";
var activePlayer = player1;
// arrays to store dice rolls
var player1Dice = [];
var player2Dice = [];
// player dice order
var player1Order;
var player2Order;
//win counter
var player1Win = 0;
var player2Win = 0;

// random Dice Roll function
var diceRoll = function () {
  var diceRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
};

// storing dice into arrays
var dicePush = function () {
  var dicePush = [diceRoll(), diceRoll()];

  // Checking if player is 1 or 2, then pushing the dice numbers into the array
  if (activePlayer == player1 && gameMode == diceRollMode) {
    player1Dice = dicePush;
  } else if (activePlayer == player2) {
    player2Dice = dicePush;
  }
  return dicePush;
};

// dice ordering function
var diceOrder = function (input) {
  var input = Number(input);
  //creating a common variable
  var diceArray;
  var playerOrder;
  if (activePlayer == player1) {
    diceArray = player1Dice;
  } else if (activePlayer == player2) {
    diceArray = player2Dice;
  }
  //combining the two dice numbers depending on player's input
  if (input == 1) {
    playerOrder = Number(String(diceArray[0]) + String(diceArray[1]));
  } else if (input == 2) {
    playerOrder = Number(String(diceArray[1]) + String(diceArray[0]));
  }
  if (activePlayer == player1) {
    player1Order = playerOrder;
  } else {
    player2Order = playerOrder;
  }
  return `Sure ${activePlayer}! Your number is ${playerOrder}`;
};

var main = function (input) {
  if (gameMode == diceRollMode) {
    var gameDiceRoll = dicePush();
    gameMode = diceOrderMode;
    return `Hello ${activePlayer}! <br> <br> You have just rolled ${gameDiceRoll} <br> <br> Choose your dice order: <br> Pick 1 if you want the first dice first <br> Pick 2 for second dice to go first `;
  }
  if (gameMode == diceOrderMode) {
    var gameDiceOrder = diceOrder(input);
    if (input != 1 && input != 2){
      return `Please input 1 or 2.`
    }
    if (activePlayer == player1) {
      activePlayer = player2;
      gameMode = diceRollMode;
      return `${gameDiceOrder} <br> <br> Now it is player 2's turn! <br> <br> Player 2, press submit to roll.`;
    } else {
      gameMode = beatThatWinner;
      return `${gameDiceOrder} <br> Who will win? Press submit!`;
    }
  }
  // Comparing the numbers of both players to determine a winner
  if (gameMode == beatThatWinner) {
    gameMode = diceRollMode;
    activePlayer = player1;
    if (
      player1Order > player2Order
    ) {
      player1Win += 1;
      return `Congratulations Player 1! You have won! <br> <br> Player 1 had ${player1Order} and Player 2 had ${player2Order} <br><br> Leaderboard: <br> Player 1: ${player1Win} <br> vs <br> Player 2: ${player2Win} <br> <br> Press submit to play again!`;
    }
    if (
      player2Order > player1Order
    ) {
      player2Win += 1;
      return `Congratulations Player 2! You have won! <br> Player 2 had ${player2Order} and Player 1 had ${player1Order} <br><br> Leaderboard: <br> Player 1: ${player1Win} <br> vs <br> Player 2: ${player2Win} <br> <br> Press submit to play again!`;
    }
    if (
      player2Order = player1Order
    ) {
      return `It is a draw! Have another go!`;
    }
  }
};