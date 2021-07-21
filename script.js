// String Constants

// Global Variables
var numOfPlayers = 2;
var playerNumber = 1;
var playerTurn = 0;
var playerCombi = [];
var numOfDice = 2;
var diceRolls = [];

// Main
var main = function (input) {
  // Roll dice if dice rolls are empty and ask player to choose combination
  if (diceRolls.length == 0) {
    getDiceRolls(numOfDice);
    return chooseCombi(playerNumber);
  } else {
    // Show a player's combination or ends the game
    return generateCombi(input);
  }
};

// Modules

// Die Roll
function rollDie() {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var dieNumber = randomInteger + 1;
  return dieNumber;
}

// Dice Rolls
function getDiceRolls(numOfDice) {
  var counter = 0;
  while (counter < numOfDice) {
    diceRolls.push(rollDie());
    counter += 1;
  }
}

// Choose Combination
function chooseCombi(playerNumber) {
  var message = `Welcome Player ${playerNumber}. Here are your dice rolls:<br>`;
  for (roll in diceRolls) {
    message += `Die ${Number(roll) + 1}: ${diceRolls[roll]}<br>`;
  }
  message += `Please choose the order of the dice.`;
  return message;
}

// Generate Combination
function generateCombi(input) {
  if (input == 1) {
    playerCombi.push(Number(String(diceRolls[0]) + String(diceRolls[1])));
  } else {
    playerCombi.push(Number(String(diceRolls[1]) + String(diceRolls[0])));
  }
  var message = `Player ${playerNumber}, you chose Die ${input} first.<br>Your number is ${playerCombi[playerTurn]}.<br>`;

  // Check if everyone has played
  if (playerNumber != numOfPlayers) {
    // Increase player number, reset dice rolls and ask for next player to play
    playerNumber += 1;
    playerTurn += 1;
    diceRolls = [];
    message += `It is now Player ${playerNumber}'s turn.`;
    return message;
  } else {
    message += endGame();
    return message;
  }
}

// Get max in array
function arrayMax(array) {
  return Math.max.apply(null, array);
}

// Reset Round
function resetRound() {
  playerNumber = 1;
  playerTurn = 0;
  playerCombi = [];
  diceRolls = [];
}

// Game Ending
function endGame() {
  var message = "All players have played, now for the results!<br>";
  for (player in playerCombi) {
    message += `Player ${Number(player) + 1} got ${playerCombi[player]}.<br>`;
  }
  var highestCombi = arrayMax(playerCombi);
  var winner = playerCombi.indexOf(highestCombi) + 1;
  message += `The winner is Player ${winner}!`;
  resetRound();
  return message;
}
