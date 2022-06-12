// Beat That Project

// Global Variable
var [player1Ready, player2Ready, player1Dice, player2Dice] = Array(6).fill(false);
var [player1WonRounds, player2WonRounds, totalRounds] = Array(3).fill(0);
var dice1, dice2, player1Number, player2Number;

// Function rollDice
// Purpose: Use RNG to give to a number between 1 to 6
// Output: Returns a number between 1 to 6
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// Function checkUserInput
// Purpose: Ensure that the user only enter "1" or "2"
// Input: User input
// Output: Returns False if correct Input or True if incorrect Input
var checkUserInput = function (userInput) {
  if (userInput === "1" || userInput === "2") {
    return false;
  }
  return true;
};

// Function pickOrder
// Purpose: Concat both dice into 1 String
// Input: dice1, dice2 and user choice in which order
// Output: String after combining
var pickOrder = function (dice1, dice2, choice) {
  if (choice === "1") {
    return "" + dice1 + dice2;
  } else {
    return "" + dice2 + dice1;
  }
};

// Function resetGame
// Purpose: Reset the game to the original state
var resetGame = function () {
  player1Ready = false;
  player2Ready = false;
  player1Dice = false;
  player2Dice = false;
};

// Function createTable
// Purpose: Create a Scoreboard to be printed at the end of the round
var createTable = function() {
  var output = "<table><tr><th>Name</th><th>Score</th></tr><tr><td>";
  if (player1WonRounds > player2WonRounds || player1WonRounds === player2WonRounds) {
    output += `Player 1</td><td>${player1WonRounds}</td></tr><tr><td>Player 2</td><td>${player2WonRounds}</td>`;
  } else {
    output += `Player 2</td><td>${player2WonRounds}</td></tr><tr><td>Player 1</td><td>${player1WonRounds}</td>`;
  }
  output += "</tr></table>"
  return output;
};

var main = function (input) {
  let myOutputValue = '';
  if (player1Ready === false) {
    dice1 = rollDice();
    dice2 = rollDice();
    myOutputValue += "Welcome Player 1.<br><br>";
    myOutputValue += `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
    player1Ready = true;
    return myOutputValue;
  }

  if (player1Dice === false) {
    if (checkUserInput(input)) {
      return "Please return a valid input (1 or 2).";
    }
    player1Number = pickOrder(dice1, dice2, input);
    player1Number = parseInt(player1Number);
    player1Dice = true;
    myOutputValue = "Player 2, please press the submit button to roll dice.";
    return myOutputValue;
  }

  if(player2Ready === false) {
    dice1 = rollDice();
    dice2 = rollDice();
    myOutputValue += "Welcome Player 2.<br><br>";
    myOutputValue += `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
    player2Ready = true;
    return myOutputValue;
  }

  if (player2Dice === false) {
    if (checkUserInput(input)) {
      return "Please return a valid input (1 or 2).";
    }
    player2Number = pickOrder(dice1, dice2, input);
    player2Number = parseInt(player2Number);
    player2Dice = true;
  }

  // Win Condition
  
  if (player1Number > player2Number) {
    myOutputValue += "Player 1 won.<br><br>";
    player1WonRounds += 1;
  } else if (player2Number > player1Number) {
    myOutputValue += "Player 2 won.<br><br>";
    player2WonRounds += 1;
  } else {
    myOutputValue += "Draw.<br><br>";
  }
  totalRounds += 1;

  console.log("Player 1 Number:", player1Number);
  console.log("Player 2 Number:", player2Number);

  myOutputValue += `Player 1 has ${player1Number} and Player 2 has ${player2Number}<br><br>Press submit to start new game<br><br>`
  myOutputValue += createTable();
  resetGame();


  return myOutputValue;
};