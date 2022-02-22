// Global Variables
// Track player 1 score as integer
var intPlayerOneScore = 0;
var intPlayerOneScoreAlt = 0;
// Track player 1 score as string
var playerOneScoreString = 0;
var playerOneScoreAltString = 0;
// Track player 2 score as integer
var intPlayerTwoScore = 0;
var intPlayerTwoScoreAlt = 0;
// Track player 2 score as string
var playerTwoScoreString = 0;
var playerTwoScoreStringAlt = 0;
// Tracking Final Score of Both Players
var finalScorePlayerOne = "";
var finalScorePlayerTwo = "";
// gameTurns
var gameTurn = "Player 1";

//Create a diceRoll function
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

// Score comparison function
var scoreComparison;

var main = function (input) {
  if (gameTurn == `Comparison` && finalScorePlayerOne > finalScorePlayerTwo) {
    return `Player 1 wins! `;
  }
  if (gameTurn == `Comparison` && finalScorePlayerOne < finalScorePlayerTwo) {
    return `Player 2 wins! `;
  }
  // When player 1 hits submit
  if (gameTurn == `Player 1` && input == ``) {
    var diceA1 = diceRoll();
    var diceB1 = diceRoll();
    // Player one score as strings
    playerOneScoreString = `${diceA1}` + `${diceB1}`;
    playerOneScoreAltString = `${diceB1}` + `${diceA1}`;
    // Player one score as integers
    intPlayerOneScore = parseInt(playerOneScoreString);
    intPlayerOneScoreAlt = parseInt(playerOneScoreAltString);
    // Check if string converts to integer
    console.log(intPlayerOneScore, `intPlayerOneScore`);
    console.log(intPlayerOneScoreAlt, `intPlayerOneScoreAlt`);
    // Return message
    return `Player 1 rolled 
    <br></br> Dice A: ${diceA1}
    <br></br> Dice B: ${diceB1}
    <br></br>
    Please enter A if you want dice A to go first, or B for dice B to go first`;
  }

  // If Player 1 chooses for dice A to go first
  if (gameTurn == `Player 1` && input == `a`) {
    // Update player 1's final score
    finalScorePlayerOne = intPlayerOneScore;
    // Check for P1 score upon A
    console.log(`finalScorePlayerOne`, finalScorePlayerOne);
    // Update game mode to Player 2's Turn
    gameTurn = `Player 2`;
    // return message
    return `Player 1 chose for dice A to go first, their score is ${playerOneScoreString}`;
  }

  // If Player 1 chooses for dice B to go first
  if (gameTurn == `Player 1` && input == `b`) {
    // Update player 1's final score
    finalScorePlayerOne = intPlayerOneScoreAlt;
    // Chcek for P1 score upon B
    console.log(`finalScorePlayerOne`, finalScorePlayerOne);
    // Update game mode to Player 2's Turn
    gameTurn = `Player 2`;
    // return message
    return `Player 1 chose for dice A to go first, their score is ${playerOneScoreAltString}`;
  }

  // Player 2's Turn
  if (gameTurn == `Player 2` && input == ``) {
    // Two dicerolls
    var diceA2 = diceRoll();
    var diceB2 = diceRoll();
    // Player two score as strings
    playerTwoScoreString = `${diceA2}${diceB2}`;
    playerTwoScoreStringAlt = `${diceB2}${diceA2}`;
    // Player two score as integers
    intPlayerTwoScore = parseInt(playerTwoScoreString);
    intPlayerTwoScoreAlt = parseInt(playerTwoScoreStringAlt);
    // Return message
    return `Player 2 rolled 
    <br></br> Dice A: ${diceA2}
    <br></br> Dice B: ${diceB2}
    <br></br>
    Please enter A if you want dice A to go first, or B for dice B to go first`;
  }

  // If Player 2 choose for dice A to go first
  if ((gameTurn = `Player 2` && input == `a`)) {
    // update player 2's final score
    finalScorePlayerTwo = intPlayerTwoScore;
    // Check P2 score upon A
    console.log(`finalScorePlayerTwo`, finalScorePlayerTwo);
    //Update game mode to comparison
    gameTurn = `Comparison`;
    // return message
    return `Player 2 chose for dice A to go first, their score is ${playerTwoScoreString}`;
  }
  // if Player 2 choose for dice B to go first
  if ((gameTurn = `Player 2` && input == `b`)) {
    // update player 2's final score
    finalScorePlayerTwo = intPlayerTwoScoreAlt;
    // Check P2 score upon B
    console.log(`finalScorePlayerTwo`, finalScorePlayerTwo);
    // Update game mode to comparison
    gameTurn = `Comparison`;
    // return message
    return `Player 2 chose for dice A to go first, their score is ${playerTwoScoreStringAlt}`;
  }
};
