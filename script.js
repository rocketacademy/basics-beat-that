// Roll the dice and put them in order to make the highest number possible.

// Set up command for dice roll

// Define game modes
var player_one_plays = "player one plays";
var player_one_chooses = "player one chooses";
var player_two_plays = "player two plays";
var player_two_chooses = "player two chooses";
var find_winner = "find winner";

// Define current game mode
var currentGameMode = player_one_plays;
// The game starts with player 1
var currentPlayer = 1;

// Keep track of player's dice numbers
var playerOneDiceSequence;
var playerTwoDiceSequence;

// Keep track of scores
var playerOneScore = 0;
var playerTwoScore = 0;

// Global variables
var myOutputValue = "";

// Dice Roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// 2 rounds of dice rolls by 2 players
var playerOneDiceOne;
var playerOneDiceTwo;
var playerTwoDiceOne;
var playerTwoDiceTwo;

//Player one rolls and choose dice sequence
// Player one rolls two dices
var playerOneRolls = function () {
  playerOneDiceOne = diceRoll();
  playerOneDiceTwo = diceRoll();
  var playerOneDiceRollOutcome = `You rolled ${playerOneDiceOne} for dice 1 and ${playerOneDiceTwo} for dice 2. <br> Please choose the preferred order of the dice by typing 1 or 2 to appoint the first dice.`;
  console.log(`Player 1 Dice 1 rolled ${playerOneDiceOne}`);
  console.log(`Player 1 Dice 2 rolled ${playerOneDiceTwo}`);
  return playerOneDiceRollOutcome;
};

// Player one to make a choice
var playerOneChoose = function (input) {
  if (input != 1 || input != 2) {
    myOutputValue = `You did not type "1" for Dice 1 or "2" for Dice 2. Please refresh the game to start again.`;
  }
  if (input == 1) {
    playerOneDiceSequence = `${playerOneDiceOne}${playerOneDiceTwo}`;
    console.log(
      `Player 1 typed ${input} and chose the following sequence: ${playerOneDiceOne}${playerOneDiceTwo}`
    );
    myOutputValue = `Player 1, your number is ${playerOneDiceSequence}. <br> It is now Player 2's turn.`;
  }
  if (input == 2) {
    playerOneDiceSequence = `${playerOneDiceTwo}${playerOneDiceOne}`;
    console.log(
      `Player 1 typed ${input} and chose the following sequence: ${playerOneDiceTwo}${playerOneDiceOne}`
    );
    myOutputValue = `Player 1, your number is ${playerOneDiceSequence}. <br> It is now Player 2's turn.`;
  }
  return myOutputValue;
};

// Player two rolls and choose dice sequence
// Player two rolls two dices
var playerTwoRolls = function () {
  playerTwoDiceOne = diceRoll();
  playerTwoDiceTwo = diceRoll();
  var playerTwoDiceRollOutcome = `You rolled ${playerTwoDiceOne} for dice 1 and ${playerTwoDiceTwo} for dice 2. <br> Please choose the preferred order of the dice by typing 1 or 2 to appoint the first dice.`;
  console.log(`Player 2 Dice 1 rolled ${playerTwoDiceOne}`);
  console.log(`Player 2 Dice 2 rolled ${playerTwoDiceTwo}`);
  return playerTwoDiceRollOutcome;
};

// Player two to make a choice
var playerTwoChoose = function (input) {
  if (input != 1 || input != 2) {
    myOutputValue = `You did not type "1" for Dice 1 or "2" for Dice 2. Please refresh the game to start again.`;
  }
  if (input == 1) {
    playerTwoDiceSequence = `${playerTwoDiceOne}${playerTwoDiceTwo}`;
    console.log(
      `Player 2 typed ${input} and chose the following sequence: ${playerTwoDiceOne}${playerTwoDiceTwo}`
    );
    myOutputValue = `Player 2, your number is ${playerTwoDiceSequence}. <br> Click to find out who won!`;
  }
  if (input == 2) {
    playerTwoDiceSequence = `${playerTwoDiceTwo}${playerTwoDiceOne}`;
    console.log(
      `Player 2 typed ${input} and chose the following sequence: ${playerTwoDiceTwo}${playerTwoDiceOne}`
    );
    myOutputValue = `Player 2, your number is ${playerTwoDiceSequence}. <br> Click to find out who won!`;
  }
  return myOutputValue;
};

// Calculate result in each round
var winCount = function () {
  var winner = ``;
  if (playerOneDiceSequence > playerTwoDiceSequence) {
    playerOneScore = playerOneScore + 1;
    playerTwoScore = playerTwoScore;
    winner = `Player 1 wins!`;
    console.log(
      `Player 1 wins with ${playerOneDiceSequence} vs Player 2's ${playerTwoDiceSequence}`
    );
  } else if (playerTwoDiceSequence > playerOneDiceSequence) {
    playerTwoScore = playerTwoScore + 1;
    playerOneScore = playerOneScore;
    winner = `Player 2 wins!`;
    console.log(
      `Player 2 wins with ${playerTwoDiceSequence} vs Player 1's ${playerOneDiceSequence}`
    );
  }
  return `${winner} The current score: Player 1 has ${playerOneScore} and Player 2 has ${playerTwoScore}. Keep playing!`;
};

// Perform main function
var main = function (input) {
  if (currentGameMode == player_one_plays) {
    myOutputValue = playerOneRolls();
    console.log(`===== Current Game Mode ===== Player 1 to roll 2 dices`);
    // Main function for player 1
    currentGameMode = player_one_chooses;

    return myOutputValue;
  }
  if (currentGameMode == player_one_chooses) {
    myOutputValue = playerOneChoose(input);
    console.log(
      `===== Current Game Mode ===== Player 1 to choose dice sequence`
    );
    currentGameMode = player_two_plays;
    return myOutputValue;
  }
  if (currentGameMode == player_two_plays) {
    myOutputValue = playerTwoRolls();
    console.log(`===== Current Game Mode ===== Player 2 to roll dices`);
    // Main function for player 2
    currentGameMode = player_two_chooses;
    return myOutputValue;
  }
  if (currentGameMode == player_two_chooses) {
    myOutputValue = playerTwoChoose(input);
    console.log(
      `===== Current Game Mode ===== Player 2 to choose dice sequence`
    );
    currentGameMode = find_winner;
    return myOutputValue;
  }
  if (currentGameMode == find_winner) {
    myOutputValue = winCount();
    console.log(`===== Current Game Mode ===== Find out who is the winner`);
    currentGameMode = player_one_plays;
    return myOutputValue;
  }
  return myOutputValue;
};
