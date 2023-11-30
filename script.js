// GLOBEL VARIABLES
var playerOneRolls = [];
var playerOneNumber = 0;
var playerTwoRolls = [];
var playerTwoNumber = 0;

var gameMode = 'dice roll'
var player = 'Player 1'
document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`
document.getElementById("myCustomText").innerHTML = `${player}, please roll your dice.`

// HELPER FUNCTION
// function to roll a 6-sided dice and return a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}

// HELPER FUNCTION
// function that helps to roll 2 dice and return the results in an array
var twoDiceRolls = function () {
  // defining an array for the dice roll results
  var diceResults = [];

  for (let i = 0; i < 2; i++) {
    // generating a random 6-sided dice result, and adding them to the results array
    var diceNumber = diceRoll();
    diceResults.push(diceNumber);
  }

  return diceResults;
}

// HELPER FUNCTION
// determining the 2 dice roll results for respective player
var gameModeDiceRoll = function () {
  // generating an array with 2 dice roll results
  var diceRollResults = twoDiceRolls();
  // assigning to assigned player
  if (player == 'Player 1') {
    playerOneRolls = diceRollResults;
    document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number:`
  } else if (player == 'Player 2') {
    playerTwoRolls = diceRollResults;
    document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number:`
  }
  
  // returning system message for the results of the dice rolls
  console.log(`${player}'s dice rolls are ${diceRollResults}`)

  document.getElementById("myCustomText").innerHTML = `${player}! Please select which dice you want for your first numeral!`

  // changing game mode
  gameMode = 'first numeral'

  return `You rolled the following: ${diceRollResults}`
}

// HELPER FUNCTION
// determine the combined number based on user choice of first numeral 
var gameModeFirstNum = function (playerIndex) {
  // defining the which player's dice rolls use
  if (player == 'Player 1') {
    var arr = playerOneRolls;
  } else if (player == 'Player 2') {
    var arr = playerTwoRolls;
  }

  // combining the numbers
  if (playerIndex == 1) {
    var firstNumeral = arr[0];
    var secondNumeral = arr[1];
    var playerNum =  (firstNumeral * 10) + secondNumeral;
  } else if (playerIndex == 2) {
    var firstNumeral = arr[1];
    var secondNumeral = arr[0];
    var playerNum =  (firstNumeral * 10) + secondNumeral;
  } else {
    // input validation
    return `You have entered in invalid input, please choose either the first or second dice as your first numeral (i.e. 1 or 2)`;
  }

  console.log(`${player}'s combined number is: ${playerNum}`)
  
  // return the combined numbers to the respective players
  if (player == 'Player 1') {
    // reset game and change to player 2
    playerOneNumber = playerNum;
    player = 'Player 2';
    gameMode = 'dice roll';

    document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number:${playerOneNumber}`
    document.getElementById("myCustomText").innerHTML = `Player 2, please roll your dice.`

    return `Player 1 has selected dice #${playerIndex} as their first numberal!`
  } else if (player == 'Player 2') {
    // reset game and change game mode to summary
    playerTwoNumber = playerNum;
    player = 'Player 1';
    gameMode = 'summary';

    document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number:${playerTwoNumber}`
    document.getElementById("myCustomText").innerHTML = `The game has ended. Click "Enter" to reset the game`

    return `Player 2 has selected dice #${playerIndex} as their first numberal! ${gameModeSummary()}`
  }
}

// HELPER FUINCTION
// determine the winner 
var gameModeSummary = function () {
  if (playerOneNumber > playerTwoNumber) {
    return `Player 1 wins!`
  } else {
    return  `Player 2 wins!`
  }
}

var main = function (input) {

  var myOutputValue = '';

  if (gameMode == 'dice roll') {
    myOutputValue = gameModeDiceRoll();
  } else if  (gameMode == 'first numeral') {
    // input validation & combining players dice
    var playerIndex = input;
    myOutputValue = gameModeFirstNum(playerIndex);
  } else if (gameMode == 'summary') {
    playerOneRolls = [];
    playerOneNumber = 0;
    playerTwoRolls = [];
    playerTwoNumber = 0;

    gameMode = 'dice roll'
    player = 'Player 1'
    document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
    document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`
    document.getElementById("myCustomText").innerHTML = `${player}, please roll your dice.`

    myOutputValue = '';
  }

  return myOutputValue;
};
