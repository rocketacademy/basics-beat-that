// Global variables for arrays to store dice roll for Player 1 and Player 2
var diceArray1 = [];
var diceArray2 = [];

// Global variables for player numbers
var playerNumber1;
var playerNumber2;

// Global variables for different stage in the game
var gameStage1 = 'Player roll dice';
var gameStage2 = 'Player select dice number order';

// Global variables to determine current player and game stage
var gameCurrentPlayer = 1;
var gameCurrentStage = gameStage1;


// Main function for dice roll game
var main = function (input) {
  
  // Check current game stage which is 1 - player to roll dice
  if (gameCurrentStage == gameStage1) {
    var newDiceRoll = playerDiceRolls ();
    gameCurrentStage = gameStage2;
    return `Welcome player ${gameCurrentPlayer}, your dice rolls are:<br>
    Dice 1: ${newDiceRoll[0]}<br>
    Dice 2: ${newDiceRoll[1]}<br><br>
    Choose the order of dice (Enter 1 or 2) to make the numbers largest.`
  }  

  // Check current game stage which is 2 - player to select dice number order
  if (gameCurrentStage == gameStage2) {
    var diceOrder = Number(input);

    // Input validation to ensure digits 1 or 2 is entered
    if (diceOrder != 1 && diceOrder != 2) {
      return `Please enter ONLY 1 or 2 to make the numbers largest.<br>`
    }

    var playerNumber = getPlayerNumber (diceOrder);
    var playerResponse = `Player ${gameCurrentPlayer} you select ${diceOrder} as first order.<br>
    Your number is ${playerNumber}.`;

    // Switch to player 2 after player 1 completes game stage 2
    if (gameCurrentPlayer == 1) {
      gameCurrentPlayer = 2;
      gameCurrentStage = gameStage1;
      return `${playerResponse}<br><br>
      Now is Player ${gameCurrentPlayer}'s turn. Click 'Submit' button to start dice roll.`
    }

    // Determine winning player condition through winCondition function
    var winningPlayer = winCondition ();

    // Reset order of player to 1 and game current stage to game stage 1
    gameCurrentPlayer = 1;
    gameCurrentStage = gameStage1;

    // Output the comparison of numbers, winning player and instruction to play again
    return `${playerResponse}<br><br>
    Player 1's number is ${playerNumber1}.<br>
    Player 2's number is ${playerNumber2}.<br><br>
    Player ${winningPlayer} has won.<br><br>
    Click 'Submit' button to start playing again.`;
  }
};


// Function to generate and store dice rolls for 2 players in array
var playerDiceRolls = function () {

  var newDiceRolls = [diceRoll(),diceRoll()];
  console.log (newDiceRolls);
  if (gameCurrentPlayer == 1) {
    diceArray1 = newDiceRolls;
    console.log (diceArray1);
  }
  else {
    diceArray2 = newDiceRolls;
    console.log (diceArray2);
  }
  return newDiceRolls;
}


// Function to get player concatenated numbers
var getPlayerNumber = function (diceArrangement) {
  var rollDices;
  if (gameCurrentPlayer == 1) {
    rollDices = diceArray1;
  }
  else  {
    rollDices = diceArray2;
  }
  
  
  // Function to generate player number depending on selection order
  var playerNumber;
  if (diceArrangement == 1) {
    playerNumber = concatenate2Numbers(rollDices[0],rollDices[1]);
  }
  else {
    playerNumber = concatenate2Numbers(rollDices[1],rollDices[0]);
  }
  
  if (gameCurrentPlayer == 1) {
    playerNumber1 = playerNumber;
  }
  else {
    playerNumber2 = playerNumber;
  }

  return playerNumber;
}


// Function to align 2 numbers together
var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};


// Function to determine win condition and return 1 or 2
var winCondition = function () {
  if (playerNumber1 > playerNumber2) {
    return 1;
  }
  else return 2;
}


// Function to generate random dice roll
var diceRoll = function () {
  var randomInteger = Math.floor(Math.random () * 6) + 1;
  console.log (randomInteger);
  return randomInteger;
};