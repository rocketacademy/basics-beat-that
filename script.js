// Beat That Psudo Code
// 2 players is required to play the game
// player 1 will start by rolling 2 dice
// player 1 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// player 2 will continue by throwing his 2 dice
// player 2 will select which dice will be his first numeral
// the other dice will automatically be the second numeral
// compare the results of player 1 and player 2
// the player with the higher number will be the winner

// GLOBEL VARIABLES
// Scores and Leaderboard
var playerOneScore = 0;
var playerTwoScore = 0;

// player database
var playerOneRolls = [];
var playerOneNumber = 0;
var playerTwoRolls = [];
var playerTwoNumber = 0;

// gameProcess and current player
var gameProcess = 'dice roll'
var player = 'Player 1'

// leaderborad
document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:\n2:`

// player summary
document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`

// system instructions
document.getElementById("myCustomText").innerHTML = `${player}, please roll your dice.`

// button text
document.getElementById("submit-button").innerHTML = `Roll dice!`

// HELPER FUNCTION
// function to roll a 6-sided dice and return a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(`this dice roll result: ${diceNumber}`)
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
var gameProcessDiceRoll = function () {
  // generating an array with 2 dice roll results
  var diceRollResults = twoDiceRolls();

  // assigning to respective player
  if (player == 'Player 1') {
    playerOneRolls = diceRollResults;
    document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number:`
  } else if (player == 'Player 2') {
    playerTwoRolls = diceRollResults;
    document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number:`
  }
  
  console.log(`${player}'s dice rolls are ${diceRollResults}`)
  
  // update system instructions
  document.getElementById("myCustomText").innerHTML = `${player}! Please select which dice you want for your first numeral!`;
  
  // update button text
  document.getElementById("submit-button").innerHTML = `Submit`
  
  // changing game mode
  gameProcess = 'first numeral'
  
  // return system message for the results of the dice rolls
  return `You rolled the following: ${diceRollResults}`
}

// HELPER FUNCTION
// determine the combined number based on user choice of first numeral 
var gameProcessFirstNum = function (playerIndex) {
  // defining which player's dice rolls to use
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
    playerOneScore += playerNum;
    player = 'Player 2';
    gameProcess = 'dice roll';

    // update player summary
    document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1: ${playerOneRolls[0]}\nDice #2: ${playerOneRolls[1]}\nCombined Number:${playerOneNumber}`

    // update system instructions
    document.getElementById("myCustomText").innerHTML = `Player 2, please roll your dice.`

    // update button text
    document.getElementById("submit-button").innerHTML = `Roll dice!`

    // return system message for the player's chosen value
    return `Player 1 has selected dice #${playerIndex} as their first numberal!`
  } else if (player == 'Player 2') {
    // reset game and change game mode to summary
    playerTwoNumber = playerNum;
    playerTwoScore += playerNum;
    player = 'Player 1';
    gameProcess = 'summary';

    // update player summary
    document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1: ${playerTwoRolls[0]}\nDice #2: ${playerTwoRolls[1]}\nCombined Number:${playerTwoNumber}`

    // update system instructions
    document.getElementById("myCustomText").innerHTML = `The game has ended. Click "Reset" to reset the game`;

    // update button
    document.getElementById("submit-button").innerHTML = `Reset`;

    // return system message for the player's chosen value and the results of the game
    return `Player 2 has selected dice #${playerIndex} as their first numberal!\n<b>${gameResults()}</b>`
  }
}

// HELPER FUINCTION
// determine the winner 
var gameResults = function () {
  if (playerOneNumber > playerTwoNumber) {
    return `Player 1 Wins!`
  } else if (playerOneNumber < playerTwoNumber) {
    return  `Player 2 Wins!`
  } else {
    return `WOW! It's a Draw!`
  }
}

// HELPER FUNCTION
// reset the game
var gameProcessSummary = function () {
  playerOneRolls = [];
  playerOneNumber = 0;
  playerTwoRolls = [];
  playerTwoNumber = 0;
  
  gameProcess = 'dice roll'
  player = 'Player 1'
  document.getElementById("flex-item-one").innerHTML = `<b>Player 1!</b>\nDice #1:\nDice #2:\nCombined Number:`
  document.getElementById("flex-item-two").innerHTML = `<b>Player 2!</b>\nDice #1:\nDice #2:\nCombined Number:`
  document.getElementById("myCustomText").innerHTML = `${player}, please roll your dice.`
  document.getElementById("submit-button").innerHTML = `Roll dice!`;

  return '';
}

// HELPER FUNCTION
// tabulate total scores and update leaderboard
var updateLeaderboard = function () {
  if (playerOneScore >= playerTwoScore) {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 1 - ${playerOneScore}\n2:   Player 2 - ${playerTwoScore}`
  } else {
    document.getElementById("leader-board").innerHTML = `<b>🏁LEADERBOARD🏁</b>\n1:   Player 2 - ${playerTwoScore}\n2:   Player 1 - ${playerOneScore}`
  }
}

// MAIN FUNCTION
var main = function (input) {

  var myOutputValue = '';

  if (gameProcess == 'dice roll') {
    myOutputValue = gameProcessDiceRoll();
  } else if  (gameProcess == 'first numeral') {
    var playerIndex = input;
    myOutputValue = gameProcessFirstNum(playerIndex);
  } else if (gameProcess == 'summary') {
    myOutputValue = gameProcessSummary();
  }

  updateLeaderboard();

  return myOutputValue;
};
