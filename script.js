// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first.
// You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// global variables
var playerOneDiceOne = "";
var playerOneDiceTwo = "";
var playerTwoDiceOne = "";
var playerTwoDiceTwo = "";
var playerOneNumber = "";
var playerTwoNumber = "";
var playerOneScore = [];
var playerTwoScore = [];
var gameMode = "player 1";

// roll dice to string
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber.toString();
};

// player 1 dice roll
var playerOneDiceRoll = function () {
  playerOneDiceOne = rollDice();
  playerOneDiceTwo = rollDice();
  gameMode = "player 1 position";
  return `Hello Player 1 🐶.<br><br>You rolled ${playerOneDiceOne} for Dice 🎲 One and ${playerOneDiceTwo} for Dice 🎲 Two.<br><br>Now please choose the order of your Dice 🎲 by entering 1 or 2.`;
};

// player 1 choose dice position
var playerOneChoice = function (input) {
  if (input == 1 || input == 2) {
    playerOneNumber = combineDiceRolls(input);
    playerOneScore.push(playerOneNumber);
    gameMode = "player 2";
    return `Player 1 🐶.<br><br>Your chosen number is ${playerOneNumber}.<br><br>It is now Player 2's 🐹 turn to give it a go.<br><br>Click submit to roll the dice 🎲.`;
  } else {
    return verifyInput(input);
  }
};

// player 2 dice roll
var playerTwoDiceRoll = function () {
  playerTwoDiceOne = rollDice();
  playerTwoDiceTwo = rollDice();
  gameMode = "player 2 position";
  return `Hello Player 2 🐹.<br><br>You rolled ${playerTwoDiceOne} for Dice 🎲 One and ${playerTwoDiceTwo} for Dice 🎲 Two.<br><br>Now please choose the order of your Dice 🎲 by entering 1 or 2.`;
};

// player 2 choose dice position
var playerTwoChoice = function (input) {
  if (input == 1 || input == 2) {
    playerTwoNumber = combineDiceRolls(input);
    playerTwoScore.push(playerTwoNumber);
    gameMode = "score time";
    return `Player 2 🐹.<br><br>Your chosen number is ${playerTwoNumber}.<br><br>Let's see who's the winner?! 🍾`;
  } else {
    return verifyInput(input);
  }
};

// verify if input is a valid number
var verifyInput = function (input) {
  if (input != 1 || input != 2) {
    return "🙅 Please enter 1 or 2 to position your dice 🎲 roll.";
  }
};

// combine the dice rolls
var combineDiceRolls = function (input) {
  if (input == 1 && gameMode == "player 1 position") {
    return playerOneDiceOne + playerOneDiceTwo;
  } else if (input == 1 && gameMode == "player 2 position") {
    return playerTwoDiceOne + playerTwoDiceTwo;
  } else if (input == 2 && gameMode == "player 1 position") {
    return playerOneDiceTwo + playerOneDiceOne;
  } else if (input == 2 && gameMode == "player 2 position") {
    return playerTwoDiceTwo + playerTwoDiceOne;
  }
};

// player scoring
var finalScore = function () {
  if (playerOneScore > playerTwoScore) {
    return `Player 1 🐶 wins 🏆 with ${playerOneScore} and Player 2 🐹 loses 😭 with ${playerTwoScore}`;
  } else if (playerOneScore < playerTwoScore) {
    return `Player 1 🐶 loses 😭 with ${playerOneScore} and Player 2 🐹 wins 🏆 with ${playerTwoScore}`;
  } else if (playerOneScore == playerTwoScore) {
    return `It is a draw as Player 1 🐶 number is ${playerOneScore} and Player 2 🐹 number is also ${playerTwoScore}`;
  }
};

// play again
var playAgain = function () {
  gameMode = "player 1";
  playerOneScore = [];
  playerTwoScore = [];
};

var main = function (input) {
  // player 1 rolls dice
  if (gameMode == "player 1") {
    myOutputValue = playerOneDiceRoll();
    console.log(
      `player 1 dice roll is ${playerOneDiceOne} and ${playerOneDiceTwo}`
    );
    // player 1 choose dice position
  } else if (gameMode == "player 1 position") {
    myOutputValue = playerOneChoice(input);
    console.log(`player 1 number is ${playerOneNumber}`);
    // player 2 rolls dice
  } else if (gameMode == "player 2") {
    myOutputValue = playerTwoDiceRoll();
    console.log(
      `player 1 dice roll is ${playerTwoDiceOne} and ${playerTwoDiceTwo}`
    );
    // player 2 choose dice position
  } else if (gameMode == "player 2 position") {
    myOutputValue = playerTwoChoice(input);
    console.log(`player 1 number is ${playerTwoNumber}`);
    // who has the bigger number
  } else if (gameMode == "score time") {
    myOutputValue = finalScore() + "<br><br>Press submit to play again!";
    console.log(
      `player 1 score in array is ${playerOneScore} and player 2 is ${playerTwoScore}`
    );
    // play again
    playAgain();
  }
  return myOutputValue;
};
