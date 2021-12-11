// Pseudo Code
// 1. Player 1 - Upon click of submit, call diceRoll function to give 2 random numbers
// 2. If 2 randoms numbers same, move to player 2, otherwise, let player input to choose the order
// 3. repeat for player 2
//. 4. see which number is bigger at the end to decide the winner

// Game mode state and global variables
var currentGameMode = "playerOne";
var playerOneNumber;
var playerTwoNumber;
var selectedNumbers = [];

// Function for dice roll: get a random number from 1 to 6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Generate 2 random numbers for Player 1 and 2 by calling diceRoll
// Chose to assign as global as each integer figures won't change via the functions / control flow
var playerOneRollOne = diceRoll();
var playerOneRollTwo = diceRoll();
var playerTwoRollOne = diceRoll();
var playerTwoRollTwo = diceRoll();
// Internal - console log
console.log(playerOneRollOne, playerOneRollTwo);
console.log(playerTwoRollOne, playerTwoRollTwo);

// Main Function
var main = function (input) {
  // BLOCK 1 - PLAYER ONE ROLL (default game mode)
  if (currentGameMode == "playerOne") {
    // If both generated random numbers is same, proceed to output
    if (playerOneRollOne == playerOneRollTwo) {
      // Convert the numerical value to string for concat
      playerOneNumber = String(playerOneRollOne) + String(playerOneRollTwo);

      // Store playerOneNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerOneNumber));
      console.log(selectedNumbers);

      // Control flow - switch to Player 2's mode since no input required from Player 1
      currentGameMode = "playerTwo";

      return `<b>&#x1F3B2 PLAYER 1 TURN &#x1F3B2</b> </br>
              </br>
              You've rolled ${playerOneRollOne} for dice one and ${playerOneRollTwo} for dice two. </br>
              </br>
              Your number is ${playerOneNumber}. </br>
              </br>
              Click submit for Player 2 turn.`;
    }

    // If both generated random numbers is different, player to choose order
    else {
      // Control flow - switch to Player 1 (Order input)'s mode since input required from Player 1
      currentGameMode = "playerOneOrderInput";

      return `<b>&#x1F3B2 PLAYER 1 TURN &#x1F3B2</b> </br>
              </br>
              You've rolled ${playerOneRollOne} for dice one and ${playerOneRollTwo} for dice two. </br>
              </br>
              Please choose the order of the dice by entering "1" or "2".`;
    }
  }

  // BLOCK 2 - PLAYER ONE ORDER INPUT
  else if (currentGameMode == "playerOneOrderInput") {
    // Nested if to consider 2 scenarios to allow for the different order of number
    // First scenario - place 1st dice roll first
    if (input == 1) {
      // Convert the numerical value to string for concat
      playerOneNumber = String(playerOneRollOne) + String(playerOneRollTwo);

      // Store playerOneNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerOneNumber));
      console.log(selectedNumbers);

      // Control flow - switch to Player 2's mode since no further input required from Player 1
      currentGameMode = "playerTwo";

      return `<b>&#x1F3B2 PLAYER 1 TURN &#x1F3B2</b> </br>
              </br>
              You chose Dice 1 first. </br>
              </br>
              Your number is ${playerOneNumber}. </br>
              </br>
              Click submit for Player 2 turn.`;
    }

    // Second scenario - place 2nd dice roll first
    else if (input == 2) {
      // Convert the numerical value to string for concat
      playerOneNumber = String(playerOneRollTwo) + String(playerOneRollOne);

      // Store playerOneNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerOneNumber));
      console.log(selectedNumbers);

      // Control flow - switch to Player 2's mode since no further input required from Player 1
      currentGameMode = "playerTwo";

      return `<b>&#x1F3B2 PLAYER 1 TURN &#x1F3B2</b> </br>
              </br>
              You chose Dice 2 first. </br>
              </br>
              Your number is ${playerOneNumber}. </br>
              </br>
              Click submit for Player 2 turn.`;
    }

    // Third Scenario - Capture for data validation error (no change to game mode)
    else {
      return `<b>&#x1F3B2 PLAYER 1 TURN &#x1F3B2</b> </br>
              </br>
              You have entered an invalid input choice. </br>
              </br>
              Please input only "1" or "2". </br>
              </br>`;
    }
  }

  // BLOCK 3 - PLAYER TWO INPUT
  else if (currentGameMode == "playerTwo") {
    // If both generated random numbers is same, proceed to output
    if (playerTwoRollOne == playerTwoRollTwo) {
      // Convert the numerical value to string for concat
      playerTwoNumber = String(playerTwoRollOne) + String(playerTwoRollTwo);

      // Store playerOneNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      console.log(selectedNumbers);

      // Control flow - switch to winningPage mode since no input required from Player 2
      currentGameMode = "winningPage";

      return `<b>&#x1F3B2 PLAYER 2 TURN &#x1F3B2</b> </br>
              </br>
              You've rolled ${playerTwoRollOne} for dice one and ${playerTwoRollTwo} for dice two. </br>
              </br>
              Your number is ${playerTwoNumber}.</br>
              </br>
              Click submit to see who won.`;
    }

    // If both generated random numbers is different, player to choose order
    else {
      // Control flow - switch to Player 2 (Order input)'s mode since input required from Player 2
      currentGameMode = "playerTwoOrderInput";

      return `<b>&#x1F3B2 PLAYER 2 TURN &#x1F3B2</b> </br>
              </br>
              You've rolled ${playerTwoRollOne} for dice one and ${playerTwoRollTwo} for dice two. </br>
              </br>
              Please choose the order of the dice by entering "1" or "2".`;
    }
  }

  // BLOCK 4 - PLAYER TWO ORDER INPUT
  else if (currentGameMode == "playerTwoOrderInput") {
    // Nested if to consider 2 scenarios to allow for the different order of number
    // First scenario - place 1st dice roll first
    if (input == 1) {
      // Convert the numerical value to string for concat
      playerTwoNumber = String(playerTwoRollOne) + String(playerTwoRollTwo);

      // Store playerTwoNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      console.log(selectedNumbers);

      // Control flow - switch to winningPage's mode since no further input required from Player 2
      currentGameMode = "winningPage";

      return `<b>&#x1F3B2 PLAYER 2 TURN &#x1F3B2</b> </br>
              </br>
              You chose Dice 1 first. </br>
              </br>
              Your number is ${playerTwoNumber}. </br>
              </br>
              Click submit to see who won.`;
    }

    // Second scenario - place 2nd dice roll first
    else if (input == 2) {
      // Convert the numerical value to string for concat
      playerTwoNumber = String(playerTwoRollTwo) + String(playerTwoRollOne);

      // Store playerOneNumber into selectedNumbers array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      console.log(selectedNumbers);

      // Control flow - switch to winningPage's mode since no further input required from Player 2
      currentGameMode = "winningPage";

      return `<b>&#x1F3B2 PLAYER 2 TURN &#x1F3B2</b> </br>
              </br>
              You chose Dice 2 first. </br>
              </br>
              Your number is ${playerTwoNumber}. </br>
              </br>
              Click submit to see who won.`;
    }

    // Third Scenario - Capture for data validation error (no change to game mode)
    else {
      return `<b>&#x1F3B2 PLAYER 2 TURN &#x1F3B2</b> </br>
              </br>
              You have entered an invalid input choice. </br>
              </br>
              Please input only "1" or "2". </br>
              </br>`;
    }
  }

  // BLOCK 5 - WINNING CALCULATION
  else if (currentGameMode == "winningPage") {
    // Nested if to consider 2 scenarios - either Player 1 or Player 2 wins
    // First scenario - Player 1 wins
    if (selectedNumbers[0] > selectedNumbers[1]) {
      return `<b>&#x1F3B2 PLAYER 1 WINS &#x1F3B2</b> </br>
              </br>
              Player 1: ${playerOneNumber} </br>
              </br>
              Player 2: ${playerTwoNumber} </br>
              </br>
              Thank you for playing! &#x1F604 </br>
              </br>
              Refresh the web page to play again! </br>
              </br>`;
    }

    // Second scenario - Player 2 wins
    else {
      return `<b>&#x1F3B2 PLAYER 2 WINS &#x1F3B2</b> </br>
              </br>
              Player 1: ${playerOneNumber} </br>
              </br>
              Player 2: ${playerTwoNumber} </br>
              </br>
              Thank you for playing! &#x1F604 </br>
              </br>
              Refresh the web page to play again! </br>
              </br>`;
    }
  }
};
