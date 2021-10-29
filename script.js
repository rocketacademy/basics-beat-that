// Initialise dice roll, dice order and choose order arrays.
var diceRoll = [];
var diceOrder = [];
var chooseOrder = [];

// Initialise number of players, number of dice and current player variables.
var numPlayer = 2;
var numDice = 2;
var currentPlayer = 0;

// Define a function that rolls the dice (return a random number from 1 to 6).
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// Define a function that rolls player's dice and then add to the diceRoll array.
var rollPlayerDice = function () {
  // Loops to account for variable number of players and dice.
  for (var i = 0; i < numPlayer; i += 1) {
    var tempRoll = [];
    for (var j = 0; j < numDice; j += 1) {
      tempRoll.push(rollDice());
    }
    diceRoll.push(tempRoll);
    chooseOrder.push(false);
  }
};

// Define a function that sets up the game.
var setUpGame = function () {
  diceOrder = [];
  chooseOrder = [];
  currentPlayer = 0;
  rollPlayerDice();
};

// Define a function that returns player X's dice rolls in string format.
var getPlayerDiceRoll = function (playerNum) {
  var output = "You rolled ";
  for (var j = 0; j < numDice; j += 1) {
    output += `${diceRoll[playerNum][j]} for Dice ${j + 1}`;
    if (j == numDice - 2) {
      output += ' and ';
    } else if (j != numDice - 1) {
      output += ', ';
    }
  }
  return output + '.';
};

// Define a function that returns player X's dice order according to their input.
var orderDice = function (playerNum, orderString) {
  var selectedOrder = orderString.replace(/\s/g, '').split(',');
  var diceNumber = '';
  for (var j = 0; j < numDice; j += 1) {
    diceNumber += diceRoll[playerNum][selectedOrder[j] - 1].toString();
  }
  diceOrder.push(Number(diceNumber));
  return `Player ${playerNum + 1}, you chose Dice ${selectedOrder[0]} first.`;
};

// Define a function to determine the winner.
var determineWinner = function () {
  return new Set(diceOrder).size == 1 ? "It's a draw! No one won!" :
    `Player ${diceOrder.indexOf(Math.max.apply(null, diceOrder)) + 1} won!`;
};

// Define the main function.
var main = function (input) {
  if (!diceRoll.length) {
    setUpGame();
  }

  if (chooseOrder[currentPlayer] == false) {
    chooseOrder[currentPlayer] = true;
    return `Welcome Player ${currentPlayer + 1}.<br>
    ${getPlayerDiceRoll(currentPlayer)}<br>Choose the order of the dice.`;
  }

  var output = `${orderDice(currentPlayer, input)}<br>
  Your number is ${diceOrder[currentPlayer]}.<br>`;
  if (currentPlayer == numPlayer - 1) {
    diceRoll = [];
    return output + determineWinner();
  }
  currentPlayer += 1;
  return output + `It is now Player ${currentPlayer + 1}'s turn.`;
};
