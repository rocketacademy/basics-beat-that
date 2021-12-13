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
var playerOneRollOne;
var playerOneRollTwo;
var playerTwoRollOne;
var playerTwoRollTwo;
var playerOneNumberArray = [];
var playerTwoNumberArray = [];

// Function for dice roll: get a random number from 1 to 6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Generate 2 random numbers for Player 1 and 2 by calling diceRoll
var randomDiceRoll = function () {
  playerOneRollOne = diceRoll();
  playerOneRollTwo = diceRoll();
  playerTwoRollOne = diceRoll();
  playerTwoRollTwo = diceRoll();
  // Internal - console log
  console.log(playerOneRollOne, playerOneRollTwo);
  console.log(playerTwoRollOne, playerTwoRollTwo);
};

// LEADERBOARD HELPER FUNCTION - SUM OF ELEMENTS IN ARRAYS
var arraySum = function (array) {
  var sum = 0;
  var arrayLength = array.length;
  for (var i = 0; i < arrayLength; i += 1) {
    sum += array[i];
  }
  return sum;
};

var displayLeaderboard = function () {
  // First scenario - Player 1 wins
  if (arraySum(playerOneNumberArray) > arraySum(playerTwoNumberArray)) {
    return `<b>&#x1F31F LEADERBOARD &#x1F31F</b> </br>
    </br>
    Player 1: ${arraySum(playerOneNumberArray)} </br>
    </br>
    Player 2: ${arraySum(playerTwoNumberArray)} </br>
    </br>
    <b> PLAYER 1 IS LEADING!</b> </br>
    </br>
    </br>
    Thank you for playing! &#x1F604 </br>
    </br>
    Click submit for another round! </br>
    </br>`;
  }

  // Second scenario - Player 2 wins
  else if (arraySum(playerOneNumberArray) < arraySum(playerTwoNumberArray)) {
    return `<b>&#x1F31F LEADERBOARD &#x1F31F</b> </br>
        </br>
        Player 1: ${arraySum(playerOneNumberArray)} </br>
        </br>
        Player 2: ${arraySum(playerTwoNumberArray)} </br>
        </br>
        <b> PLAYER 2 IS LEADING! </b> </br>
        </br>
        </br>
        Thank you for playing! &#x1F604 </br>
        </br>
        Click submit for another round! </br>
        </br>`;
  }

  // Third scenario - Draw
  else {
    return `<b>&#x1F31F LEADERBOARD &#x1F31F</b> </br>
        </br>
        Player 1: ${arraySum(playerOneNumberArray)} </br>
        </br>
        Player 2: ${arraySum(playerTwoNumberArray)} </br>
        </br>
        <b> IT'S A DRAW! </b> </br>
        </br>
        </br>
        Thank you for playing! &#x1F604 </br>
        </br>
        Click submit for another round! </br>
        </br>`;
  }
};

// WINNING CALCULATION HELPER FUNCTION
// If to consider 2 scenarios - either Player 1 or Player 2 wins
var winningCalculation = function () {
  // First scenario - Player 1 wins
  if (selectedNumbers[0] > selectedNumbers[1]) {
    return `<b>&#x1F3B2 PLAYER 1 WINS &#x1F3B2</b> </br>
        </br>
        Player 1: ${selectedNumbers[0]} </br>
        </br>
        Player 2: ${selectedNumbers[1]} </br>
        </br>
        `;
  }

  // Second scenario - Player 2 wins
  else if (selectedNumbers[0] < selectedNumbers[1]) {
    return `<b>&#x1F3B2 PLAYER 2 WINS &#x1F3B2</b> </br>
              </br>
              Player 1: ${selectedNumbers[0]} </br>
              </br>
              Player 2: ${selectedNumbers[1]} </br>
              </br>
             `;
  }

  // Third scenario - Draw
  else {
    return `<b>&#x1F3B2 IT'S A DRAW &#x1F3B2</b> </br>
              </br>
              Player 1: ${selectedNumbers[0]} </br>
              </br>
              Player 2: ${selectedNumbers[1]} </br>
              </br>
              `;
  }
};

// RESET GAME HELPER FUNCTION
var resetGame = function () {
  currentGameMode = "playerOne";
  selectedNumbers = [];
};

// Main Function (Main function will run when submit button is clicked)
var main = function (input) {
  // BLOCK 1 - PLAYER ONE ROLL (default game mode)
  if (currentGameMode == "playerOne") {
    // Roll Dice - Put under 1st scenario as only want to change the numbers at initial stage
    randomDiceRoll();
    // If both generated random numbers is same, proceed to output
    if (playerOneRollOne == playerOneRollTwo) {
      // Convert the numerical value to string for concat
      playerOneNumber = String(playerOneRollOne) + String(playerOneRollTwo);

      // Store playerOneNumber into selectedNumbers and playerOneNumberArray array as a number
      selectedNumbers.push(Number(playerOneNumber));
      playerOneNumberArray.push(Number(playerOneNumber));
      console.log(selectedNumbers, playerOneNumberArray);

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

      // Store playerOneNumber into selectedNumbers and playerOneNumberArray array as a number
      selectedNumbers.push(Number(playerOneNumber));
      playerOneNumberArray.push(Number(playerOneNumber));
      console.log(selectedNumbers, playerOneNumberArray);

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

      // Store playerOneNumber into selectedNumbers and playerOneNumberArray array as a number
      selectedNumbers.push(Number(playerOneNumber));
      playerOneNumberArray.push(Number(playerOneNumber));
      console.log(selectedNumbers, playerOneNumberArray);

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

      // Store playerTwoNumber into selectedNumbers and playerTwoNumberArray array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      playerTwoNumberArray.push(Number(playerTwoNumber));
      console.log(selectedNumbers, playerTwoNumberArray);

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

      // Store playerTwoNumber into selectedNumbers and playerTwoNumberArray array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      playerTwoNumberArray.push(Number(playerTwoNumber));
      console.log(selectedNumbers, playerTwoNumberArray);
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

      // Store playerOneNumber into selectedNumbers and playerTwoNumberArray array as a number
      selectedNumbers.push(Number(playerTwoNumber));
      playerTwoNumberArray.push(Number(playerTwoNumber));
      console.log(selectedNumbers, playerTwoNumberArray);

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

  // BLOCK 5 - WINNING CALCULATION AND RESET GAME
  else if (currentGameMode == "winningPage") {
    winningResultOutput = winningCalculation();
    leaderboard = displayLeaderboard();
    resetGame();
    return `${winningResultOutput} </br>
            ${leaderboard}`;
  }
};
