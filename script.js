var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
// 2 players in game, and each player takes turn

// Each player roll 2 dice and picks the order of the dice they want. ie Dice 1 = 6, dice 2 = 3, Player 1 choose 63 as number
// Player 2 does the same thing
// At the end, player with highest wins

//variables for players
var playerNumberOne;
var playerNumberTwo;

//Array variables to store Player One and Player Two
var diceArrayPlayerOne = [];
var diceArrayPlayerTwo = [];

//2 modes, Part 1 is Player roll dice, Part 2 is Player select number order from dice rolls
var gameMode1 = `Player to roll dice`;
var gameMode2 = `Player to select order of dice number`;

//Global variable to show which player is playing now and which game mode
var gameCurrentPlayer = 1;
var gameCurrentMode = gameMode1;

var playerNumberOne;
var playerNumberTwo;

//------Below are the functions that are to be used in the main game function-------//

//Function to merge dice numbers together dependent on the player
var merge2DiceNumbers = function (playerInput) {
  if (gameCurrentPlayer == 1) {
    var playerMerged = diceArrayPlayerOne;
  } else {
    var playerMerged = diceArrayPlayerTwo;
  }
  if (playerInput == 1) {
    var mergedNumber = String(playerMerged[0]) + String(playerMerged[1]);
  } else {
    var mergedNumber = String(playerMerged[1]) + String(playerMerged[0]);
  }
  console.log(`Player one playermerged ${playerMerged}`);
  if (gameCurrentPlayer == 1) {
    playerNumberOne = mergedNumber;
    return playerNumberOne;
  } else {
    playerNumberTwo = mergedNumber;
    return playerNumberTwo;
  }
  return mergedNumber;
};

//Function of placing number in accordance to player selection

//Function of dice rolls for each player and to store into their own arrays
var playerDiceRolls = function () {
  var playerNewDiceRolls = [rollDice(), rollDice()];
  if (gameCurrentPlayer == 1) {
    diceArrayPlayerOne = playerNewDiceRolls;
    console.log(`Dice rolls are ${diceArrayPlayerOne}`);
  } else {
    diceArrayPlayerTwo = playerNewDiceRolls;
    console.log(`Dice rolls are ${diceArrayPlayerTwo}`);
  }
  return playerNewDiceRolls;
};

//git
//Function for Dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//Function for determining which player wins
var winningPlayer = function () {
  if (playerNumberOne > playerNumberTwo) {
    return `Player One Wins`;
  } else return `Player Two Wins`;
};

// ~~~~~Main Game Function~~~~~
var main = function (input) {
  //var myOutputValue = "hello world";
  //return myOutputValue;

  //If function for game to start with player 1 or 2 depending on the progress of game
  if (gameCurrentMode == gameMode1) {
    console.log(`game current player is ${gameCurrentPlayer}`);
    var gameDiceRoll = playerDiceRolls();
    //game to change to part 2 of game mode which is selecting of dice number
    gameCurrentMode = gameMode2;
    return `Player ${gameCurrentPlayer}, you have rolled ${diceArrayPlayerOne[0]} and ${diceArrayPlayerOne[1]}. <br>
    Choose which the order of dice (Enter only 1 or 2 as input) as first dice so as to form the largest number!`;
  }
  //Now player will input and game is now in gameMode 2 (selection of order of dice numbers)
  if (gameCurrentMode == gameMode2) {
    var orderOfDice = merge2DiceNumbers(input);
    gameCurrentMode = gameMode1;
    if (gameCurrentPlayer == 1) {
      gameCurrentPlayer = 2;
      return `Player 1, you have choosen ${orderOfDice}.`;
    } else {
      // add in the winning condition in here before the programme runs back to the start again
      var winnerOutput = winningPlayer();

      gameCurrentPlayer = 1;

      return winnerOutput;
    }
  }
};
