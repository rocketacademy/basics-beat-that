// === REQUIREMENTS === //
// 1) therorder of the dice they want. For example, if they wanted the number 63, e are 2 players and players take turns to roll dice
// 2) when a player click submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6
// 3) the player picks the they'd specify that the 2nd dice goes first.
// 4) after both players have rolled and chosen dice order, the player with the highest combined number wins.

// === PROBLEM STATEMENT ===//
// ver 1. rolls 2 dice and program returns the output for player 1. Player 1 chooses the dice order and program return output.
// ver 2. refactored code to include player 2.
// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page.

// Global Variables
var gameMode = "PLAYER 1 ROLLS DICE";
var diceRolled = [];
var myOutputValue = "";

// Player's Chosen Numbers
var playerOneNum = 0;
var playerTwoNum = 0;
var allPlayerScores = [];

// Scoreboard
var numPlayerOneWins = 0;
var numPlayerTwoWins = 0;
var numDraws = 0;

// Helper Function #1: Random Dice Generator
var rollDice = function (input) {
  // random integer from 1 to 6
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`Random Dice Roll: ${randomDiceNumber}`);
  return randomDiceNumber;
};

// Helper Function #2: Roll 2 Dice
var rollTwoDice = function (input) {
  var counter = 0;
  while (counter < 2) {
    console.log(counter);
    input = rollDice();
    diceRolled.push(input);
    counter += 1;
  }
};

// Helper Function #3: Player 1 Score
var playerOneScore = function (playerInput) {
  // if Player 1 input '1'
  if (playerInput == 1) {
    playerOneNum = Number(String(diceRolled[0]) + String(diceRolled[1]));
    allPlayerScores.push(playerOneNum);
    myOutputValue = `Player 1, your number is ${playerOneNum}. <br> Player 2, whenever you are ready, press submit to roll dice.`;
    gameMode = "PLAYER TWO ROLLS DICE";
  }
  // if Player 1 input '2'
  if (playerInput == 2) {
    playerOneNum = Number(String(diceRolled[1]) + String(diceRolled[0]));
    allPlayerScores.push(playerOneNum);
    myOutputValue = `Player 1, your number is ${playerOneNum}. <br> Player 2, whenever you are ready, press submit to roll dice.`;
    gameMode = "PLAYER TWO ROLLS DICE";
  }
  return myOutputValue;
};

// Helper Function #4: Player 2 Score
var playerTwoScore = function (playerInput) {
  // if Player 2 input '1'
  if (playerInput == 1) {
    playerTwoNum = Number(String(diceRolled[2]) + String(diceRolled[3]));
    allPlayerScores.push(playerTwoNum);
    myOutputValue = `Player 2, your number is ${playerTwoNum}. <br>Press submit again to find out who won!`;
    gameMode = "ANNOUNCE WINNER";
  }
  // if Player 2 input '2'
  if (playerInput == 2) {
    playerTwoNum = Number(String(diceRolled[3]) + String(diceRolled[2]));
    allPlayerScores.push(playerTwoNum);
    myOutputValue = `Player 2, your number is ${playerTwoNum}. <br>Press submit again to find out who won!`;
    gameMode = "ANNOUNCE WINNER";
  }
  return myOutputValue;
};

// Helper Function #5: Comparing The Scores
var playerScores = function (playerScore) {
  if (allPlayerScores[0] > allPlayerScores[1]) {
    numPlayerOneWins += 1;
    myOutputValue = `Player 1: ${allPlayerScores[0]} 👑 <br>Player 2: ${allPlayerScores[1]} <br><br> THE WINNER IS..... PLAYER 1 🎉 <br><br>📌 Scoreboard<br>Player 1: ${numPlayerOneWins} <br>Player 2: ${numPlayerTwoWins} <br> Draw: ${numDraws}`;
  }
  if (allPlayerScores[0] < allPlayerScores[1]) {
    numPlayerTwoWins += 1;
    myOutputValue = `Player 1: ${allPlayerScores[0]} <br>Player 2: ${allPlayerScores[1]} 👑 <br><br> THE WINNER IS..... PLAYER 2 🎉 <br><br>📌 Scoreboard<br>Player 1: ${numPlayerOneWins} <br>Player 2: ${numPlayerTwoWins} <br> Draw: ${numDraws}`;
  } else if (allPlayerScores[0] == allPlayerScores[1]) {
    numDraws += 1;
    myOutputValue = `Player 1: ${allPlayerScores[0]}. <br>Player 2: ${allPlayerScores[1]}. <br><br> IT'S A TIE 🤝 <br>Play Again!<br><br>📌 Scoreboard<br>Player 1: ${numPlayerOneWins} <br>Player 2: ${numPlayerTwoWins} <br> Draw: ${numDraws}`;
  }
  return myOutputValue;
};

// Helper Function #6: Reset Game
var resetGame = function () {
  gameMode = "PLAYER 1 ROLLS DICE";
  allPlayerScores = [];
  diceRolled = [];
};

var main = function (input) {
  if (gameMode == "PLAYER 1 ROLLS DICE") {
    input = rollTwoDice();
    myOutputValue = `Player 1, you have rolled ${diceRolled[0]}, ${diceRolled[1]}. <br>Please choose the order of the dice by entering '1' or '2'.`;
    gameMode = "PLAYER 1 CHOOSE ORDER OF DICE";
  }
  if (gameMode == "PLAYER 1 CHOOSE ORDER OF DICE") {
    return playerOneScore(input);
  }
  if (gameMode == "PLAYER TWO ROLLS DICE") {
    input = rollTwoDice();
    myOutputValue = `Player 2, you have rolled ${diceRolled[2]}, ${diceRolled[3]}. <br>Please choose the order of the dice by entering '1' or '2'.`;
    gameMode = "PLAYER TWO CHOOSE ORDER OF DICE";
  }
  if (gameMode == "PLAYER TWO CHOOSE ORDER OF DICE") {
    return playerTwoScore(input);
  }
  if (gameMode == "ANNOUNCE WINNER") {
    playerScores(input);
    resetGame();
  }
  return myOutputValue;
};
