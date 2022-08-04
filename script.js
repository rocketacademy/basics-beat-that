/*
Beat That
Info:
1. 2 players will take turns to click on submit
2. Game will roll 2 dice
3. 2 numbers will be produced
4. Players get to specify which number to be the first integer
5. Player with higher combined number, wins
Output:
1. Array of 2 numbers
2. 2 sets of arrays
3. Comparison between both arrays
*/

// Global Variables
// Game Modes
var GameModeNeutral = `game mode neutral`;
var GameModeRollDice = `game mode roll dice`;
var GameModeChooseDiceOrder = `game mode choose dice order`;
var GameModeCompareResults = `game mode compare results`;
var currentGameMode = GameModeNeutral;

// Game State
var normalGameState = `normal game state`;
var reverseGameState = `reverse game state`;
var gameState = normalGameState;

var playerScoreControl = true;

// Default player 1
var currentPlayer = 1;

// To store current player scores
var playerDiceRollResults = [];

// To store the both players scores
var bothPlayersValue = [];

// Player 1 & Player 2 Scores
var player1Win = 0;
var player2Win = 0;

var main = function (input) {
  // Ensure game mode in neutral
  console.log(`Current Game Mode`, currentGameMode);
  var myOutputValue = "";

  if (currentGameMode == GameModeNeutral && currentPlayer != 2) {
    console.log(`Current Player`, currentPlayer);
    console.log(`Game state`, gameState);
    // Change game mode
    currentGameMode = GameModeRollDice;
    return (myOutputValue = `Welcome Player ${currentPlayer}. <br><br> Click on Submit again to start the game or type in "reverse" to make the game as such player with the lowest score wins.`);
  }

  if (currentGameMode == GameModeNeutral && currentPlayer == 2) {
    currentGameMode = GameModeRollDice;
    return (myOutputValue = `Welcome Player ${currentPlayer}. <br><br> Click on Submit to roll the dices.`);
  }
  // Change of game state
  else if (input == `reverse`) {
    gameState = reverseGameState;
    currentGameMode = GameModeRollDice;
    return `Game has been reversed, player with the lowest score wins! <br><br> Click on Submit to roll the dice.`;
  } else if (currentGameMode == GameModeRollDice) {
    currentGameMode = GameModeChooseDiceOrder;
    console.log(`Game state`, gameState);
    myOutputValue = playerRollDice();
    return myOutputValue;
  } else if (currentGameMode == GameModeChooseDiceOrder) {
    myOutputValue = playerScore(input);
    console.log(gameState);

    // To remind user to input "1" or "2"
    if (playerScoreControl) {
      return `Select Dice 1 or 2 by typing in "1" or "2".`;
    }

    // Player 2's turn
    if (currentPlayer == 1) {
      currentPlayer = 2;
      currentGameMode = GameModeNeutral;
      return `${myOutputValue} <br><br> It's now Player 2's turn.`;
    }
    if (currentPlayer == 2) {
      currentGameMode = GameModeCompareResults;
      return `${myOutputValue} <br><br> Please press on submit to compare both scores!`;
    }
  }
  if (currentGameMode == GameModeCompareResults) {
    if (gameState == reverseGameState) {
      myOutputValue = lowestPlayerScores();
    } else {
      myOutputValue = highestPlayerScores();
    }
    return myOutputValue;
  }
};

// Helper Function for dice rolls
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Helper Function for 2 dice rolls
var playerRollDice = function () {
  var counter = 0;
  while (counter < 2) {
    playerDiceRollResults.push(diceRoll());
    counter = counter + 1;
  }
  console.log(playerDiceRollResults);
  return `Player ${currentPlayer} <br> You rolled ${playerDiceRollResults[0]} for Dice 1 and <br> ${playerDiceRollResults[1]} for Dice 2. <br><br> Choose the order of the dice. <br><br> Enter "1" or "2".`;
};

// Helper Function to get Player's Score
var playerScore = function (playerInput) {
  // playerScoreControl to enable to game to move on
  playerScoreControl = false;
  console.log(`Player Input`, playerInput);
  var playerNumber;
  var message = "";

  // To make sure input is only "Dice 1" or "Dice 2"
  if (playerInput != 1 && playerInput != 2) {
    playerScoreControl = true;
    return `Error! <br> Please enter either "1" or "2" only.
    <br> Please try again`;
  }
  // If player chooses Dice 1
  else {
    if (playerInput == 1) {
      // Using String converts array info into a string value
      // Using Number will convert the strings into a proper number for comparison
      playerNumber = Number(
        String(playerDiceRollResults[0]) + String(playerDiceRollResults[1])
      );
      console.log(`Player's number`, playerNumber);
      message = `You chose Dice ${playerInput} first. Your number is ${playerNumber}.`;
    }
    // If player chooses Dice 2
    if (playerInput == 2) {
      playerNumber = Number(
        String(playerDiceRollResults[1]) + String(playerDiceRollResults[0])
      );
      console.log(`Player's number`, playerNumber);
      message = `You chose Dice ${playerInput} first. Your number is ${playerNumber}.`;
    }
    // Store Player's values in bothPlayersValue array
    bothPlayersValue.push(playerNumber);
    console.log(bothPlayersValue);
    // Clear current player's array result
    playerDiceRollResults = [];
    return message;
  }
};

// Helper Function to compare highest score
var highestPlayerScores = function () {
  var myOutputValue = `Player 1's score is ${bothPlayersValue[0]} and Player 2's score is ${bothPlayersValue[1]}`;
  // If Player 1 wins
  if (bothPlayersValue[0] > bothPlayersValue[1]) {
    player1Win += 1;
    myOutputValue = `${myOutputValue} <br><br>  Player 1 wins! <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  // If Player 2 Wins
  if (bothPlayersValue[1] > bothPlayersValue[0]) {
    player2Win += 1;
    myOutputValue = `${myOutputValue} <br><br> Player 2 wins! <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  // If tie
  if (bothPlayersValue[0] == bothPlayersValue[1]) {
    myOutputValue = `${myOutputValue} <br><br> It's a tie~ <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  currentGameMode = GameModeNeutral;
  bothPlayersValue = [];
  currentPlayer = 1;
  return myOutputValue;
};

// Helper Function to compare lowest score
var lowestPlayerScores = function () {
  var myOutputValue = `Player 1's score is ${bothPlayersValue[0]} and Player 2's score is ${bothPlayersValue[1]}`;
  // If Player 1 wins
  if (bothPlayersValue[0] < bothPlayersValue[1]) {
    player1Win += 1;
    myOutputValue = `${myOutputValue} <br><br>  Player 1 wins! <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  // If Player 2 Wins
  if (bothPlayersValue[1] < bothPlayersValue[0]) {
    player2Win += 1;
    myOutputValue = `${myOutputValue} <br><br> Player 2 wins! <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  // If tie
  if (bothPlayersValue[0] == bothPlayersValue[1]) {
    myOutputValue = `${myOutputValue} <br><br> It's a tie~ <br><br> Player 1: ${player1Win} <br> Player 2: ${player2Win}`;
  }
  currentGameMode = GameModeNeutral;
  gameState = normalGameState;
  bothPlayersValue = [];
  currentPlayer = 1;

  return myOutputValue;
};
