// Initialise global variables and set starting game mode to 'roll dice' with player 1 to go first

var myOutputValue;
var gameMode = 'roll dice';
var numDice = 2;
var currPlayer = 1;
var Player1Result = 0;
var Player2Result = 0;
var PlayerOneDiceRolls = [];
var PlayerTwoDiceRolls = [];

// Randomly generate a single dice roll

function rollDice() {
  var diceNumbers = [1, 2, 3, 4, 5, 6];
  const randomIndex = Math.floor(Math.random() * diceNumbers.length);
  return diceNumbers[randomIndex];
}

// Generate a dice roll for each dice in the game and store in an array
// of the respective player, which is taken in as the argument

function storeDiceInArray(currPlayer) {
  for (var i = 0; i < numDice; i += 1) {
    if (currPlayer == 1) {
      PlayerOneDiceRolls.push(rollDice());
    } else { PlayerTwoDiceRolls.push(rollDice()); }
  }
}

// Generate welcome message and display the result of each dice roll for each player
// Prompt user to select whice dice goes first to specify order and final score
// Limitation: Function only retrieves first two elements in array which prevents multiple turns

function getDiceRolls(currPlayer) {
  if (currPlayer == 1) {
    return `Welcome Player ${currPlayer}.<br>
  You rolled ${PlayerOneDiceRolls[0]} for Dice 1 and ${PlayerOneDiceRolls[1]} for Dice 2.<br>
  Which dice do you choose first?`; }

  return `Welcome Player ${currPlayer}.<br>
  You rolled ${PlayerTwoDiceRolls[0]} for Dice 1 and ${PlayerTwoDiceRolls[1]} for Dice 2.<br>
  Which dice do you choose first?`;
}

// Take user input to return final score based on chosen order of the dice.
// Display final score and winning message once both players have played

function chooseFinalScore(input, currPlayer, nextPlayer) {
  var message = '';
  if (currPlayer == 1) {
    // If user inputs 'dice one' retrieve first element of the respective array and concatenate
    // with second element to generate a string of their final score.
    // Display the score and prompt next player to take their turn by clicking the button.
    if (input == 'dice one') {
      Player1Result = `${PlayerOneDiceRolls[0]}${PlayerOneDiceRolls[1]}`;
      message = `Your score is ${Player1Result}.<br>
      Now it is the turn of Player ${nextPlayer}.<br>
      Click the button to roll your 🎲`;
    } else {
      Player1Result = `${PlayerOneDiceRolls[1]}${PlayerOneDiceRolls[0]}`;
      message = `Your score is ${Player1Result}.<br>
      Now it is the turn of Player ${nextPlayer}.<br>
      Click the button to roll your 🎲`;
    }
  // Same logic as above but for Player 2
  } else if (input == 'dice one') {
    Player2Result = `${PlayerTwoDiceRolls[0]}${PlayerTwoDiceRolls[1]}`;
    message = `Your score is ${Player2Result}. `;
  } else {
    Player2Result = `${PlayerTwoDiceRolls[1]}${PlayerTwoDiceRolls[0]}`;
    message = `Your score is ${Player2Result}.`;
  }
  // Return final score and call getResultsMessage function to display winning message
  return message + '<br>' + getResultsMessage(Player1Result, Player2Result);
}

// Return contextual results message based on respective scores for each player

function getResultsMessage(Player1Result, Player2Result) {
  // Convert string results into a number so we can apply comparison operators
  var Player1ResultAsNumber = Number(Player1Result);
  var Player2ResultAsNumber = Number(Player2Result);
  // Only display a message once both players have played
  if (currPlayer == 1) {
    return '';
  }
  // Player with the highest score wins,
  if (Player2ResultAsNumber > Player1ResultAsNumber) {
    return `Player ${currPlayer} wins with a score of ${Player2ResultAsNumber} 🏆`;
  } if (Player2ResultAsNumber == Player1ResultAsNumber) {
    return 'Honours even. It\'s a draw!';
  }

  return `Player 1 wins with a score of ${Player1ResultAsNumber} 🏆`;
}

var main = function (input) {
  // In 'roll dice' mode, when a player clicks button, generate two dice rolls and store in an array
  if (gameMode == 'roll dice') {
    storeDiceInArray(currPlayer);
    // Display results and prompt user to select order of the dice
    myOutputValue = getDiceRolls(currPlayer);
    // Switch mode to 'choose dice'
    gameMode = 'choose dice';
  }
  // In 'choose dice' mode, player chooses order of dice and prompts next player to take turn
  // Once both players have played, display final score and winning message
  else if (gameMode == 'choose dice') {
    gameMode = 'roll dice';
    var nextPlayer = (currPlayer % 2) + 1;
    myOutputValue = chooseFinalScore(input, currPlayer, nextPlayer);
    currPlayer = nextPlayer;
  }
  return myOutputValue;
};
