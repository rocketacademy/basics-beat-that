// Define current player
var currentPlayer = 1;

// Function for output
var myOutputValue = "";

// Define variables to keep track of player's number
var playerNumber = [];
var playerOneNum = playerNumber[0];
var playerTwoNum = playerNumber[1];

// Function to track game mode
var modeRollDice = "Roll dice mode";
var modeChoseOrder = "Chose order of numbers";
var modeCurrent = modeRollDice;

// Function to keep track of dice rolled
var diceNumberRolled = [];
var diceRollA = "";
var diceRollB = "";

// Combination of numbers
// var combineNumbers = "";
var combineNumbersAB = Number(diceRollA) + Number(diceRollB);
var combineNumbersBA = Number(diceRollB) + Number(diceRollA);

// Function to get random dice number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  // Select game mode
  var gameCounter = 0;
  if (modeCurrent == modeRollDice) {
    myOutputValue = rollDiceTwice(gameCounter);
    modeCurrent = modeChoseOrder;
  }
  // Choose order of numbers
  else if (modeCurrent == modeChoseOrder) {
    // If Player chooses AB arrangement
    var combinedNumbers = String(diceRollA) + String(diceRollB);
    var myOutputValue = `The number you've chose is ${combinedNumbers} <br><br> Click 'submit' to continue. `;

    // If Player chooses BA arrangement
    if (input == diceRollB) {
      var combinedNumbers = String(diceRollB) + String(diceRollA);
      var myOutputValue = `The number you've chose is ${combinedNumbers} <br><br> Click 'submit' to continue. `;
    }
    // Function to combine players' numbers
    playerNumber.push(combinedNumbers);
    console.log(`Player ${Number(currentPlayer)} chose ${combinedNumbers}`);

    //  Function to return to game mode
    modeCurrent = modeRollDice;

    // To reset the database
    diceNumberRolled = [];

    // Restarting the game for player 2
    if (currentPlayer == 2) {
      // change game mode to decide which is winner
      modeCurrent = "Announce Winner";
    } else {
      currentPlayer = currentPlayer + 1;
    }
  } else if ((modeCurrent = "Announce Winner")) {
    myOutputValue = announceWinner();
  }
  return myOutputValue;
};

// Function to roll dice twice and store dice numbers
var rollDiceTwice = function () {
  var diceCounter = 0;
  while (diceCounter < 2) {
    var diceNumber = rollDice();
    diceCounter += 1;
    // Store the numbers rolled
    diceNumberRolled.push(diceNumber);
    console.log("Dice number stored: " + diceNumberRolled);
  }

  // Assign the dice number rolled in the global variables
  diceRollA = diceNumberRolled[0];
  diceRollB = diceNumberRolled[1];
  return (
    "Alright Player " +
    currentPlayer +
    "! <br> <br> You rolled " +
    diceRollA +
    " and " +
    diceRollB +
    ". <br> <br> Choose which number you want as the first numeral of your combined number."
  );
};

// Function to compare numbers
var announceWinner = function () {
  myOutputValue = "";
  if (playerNumber[0] > playerNumber[1]) {
    myOutputValue = `Yay player 1 won!`;
  }
  if (playerNumber[1] > playerNumber[0]) {
    myOutputValue = `Yay player 2 won!`;
  }
  if (playerNumber[0] == playerNumber[1]) {
    myOutputValue = `It's a draw!`;
  }
  modeCurrent = modeRollDice;
  currentPlayer = 1;
  playerNumber = [];
  return myOutputValue;
};
