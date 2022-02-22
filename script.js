/* Beat that game!
Logic for this game: 
-2 players will roll two dices. 
- For example, if player 1 rolls 1 and 6, they can afterwards choose either dice 1 or dice 2 to form a number.If player 1 chooses the second dice, the number will be 61 or 16 if player had chosen the first dice. 
- This is repeated for Player 2. 
- whoever has the highest number wins the game  
*/

/*first off we must input game states into the game. 
The first game state being for the player to roll the dice and the second game state to choose the dice order. 
*/
const PLAYER1ROLLDICEGAMESTATE = "Game state Roll Dice";
const PLAYER1CHOOSEDICEGAMESTATE = "Game state choose dice";
const PLAYER2ROLLDICEGAMESTATE = "Game state Roll Dice for Player 2";
const PLAYER2CHOOSEDICEGAMESTATE = "Game state choose dice for Player 2";
const SHOWDOWN =
  "Game state to determine which player has the higher value to win";
const RESET = "Reset game state";

//Variable to change game state
var gameState = PLAYER1ROLLDICEGAMESTATE;

//Function for players to roll dice from 1 to 6
var diceRoll = function () {
  var randomDiceRoll = Math.floor(Math.random() * 6);
  var randomDiceRollInteger = randomDiceRoll + 1;
  return randomDiceRollInteger;
};

//Array to keep track of player rolls
var playerOneRolls = [];
var playerTwoRolls = [];

//Array to store player's chosen value from the dice rolls for current game
var playerOneNum = [];
var playerTwoNum = [];

//Array to store player's chosen value from dice rolls throughout life cycle of the game until it is ended e.g. site is refrshed or terminated
var playerOneNumGlobal = [];
var playerTwoNumGlobal = [];
var total1 = 0;
var total2 = 0;

var player1Score = 0;
var player2Score = 0;

//used to add up the numbers in the array on line 39
var playerOneSum = function (a) {
  for (var i in a) {
    total1 += a[i];
  }
  console.log(total1);
  return total1;
};

//used to add up the numbers in the array on line 40
var playerTwoSum = function (a) {
  for (var i in a) {
    total2 += a[i];
  }
  console.log(total2);
  return total2;
};

//function to restart state of the game to continue to next round.
var resetgame = function () {
  gameState = PLAYER1ROLLDICEGAMESTATE;
  playerOneRolls = [];
  playerTwoRolls = [];
  playerOneNum = [];
  playerTwoNum = [];
  console.log(`Round reset`);
  return `Round Reset! Please click on "Submit" button to continue to next round!`;
};

//function to restart entire game
var resetWholegame = function () {
  gameState = PLAYER1ROLLDICEGAMESTATE;
  playerOneRolls = [];
  playerTwoRolls = [];
  playerOneNum = [];
  playerTwoNum = [];
  playerOneNumGlobal = [];
  playerTwoNumGlobal = [];
  total1 = 0;
  total2 = 0;
  player1Score = 0;
  player2Score = 0;
  console.log(`Round reset`);
  return `Game reset!<br><br>Please click on the "Submit" button to Start a new game!`;
};

//Function for player 1 to roll dice push the value into the player roll arrays
var playerOneRollDice = function () {
  gameState = PLAYER1CHOOSEDICEGAMESTATE;
  var counter = 0;
  while (counter < 2) {
    counter += 1;
    playerOneRolls.push(diceRoll());
  }
  console.log(`Player 1 Rolls ${playerOneRolls}`);
  return `Welcome Player 1! <br><br> You have rolled:<br><br>Dice No.1: ${playerOneRolls[0]} <br>Dice No.2: ${playerOneRolls[1]}<br><br>Please input "1" or "2" to choose the dice number to be used as the final digit in your final value to be used`;
};

//Function to determine player 1's chosen value
var playerOneValue = function (playerInput) {
  gameState = PLAYER2ROLLDICEGAMESTATE;

  if (playerInput == 1) {
    var playerOneValue = Number(
      String(playerOneRolls[0]) + String(playerOneRolls[1])
    );
    playerOneNum.push(playerOneValue);
    playerOneNumGlobal.push(playerOneValue);
    console.log("player 1 choice", playerOneValue);
  }
  if (playerInput == 2) {
    var playerOneValue = Number(
      String(playerOneRolls[1]) + String(playerOneRolls[0])
    );
    playerOneNum.push(playerOneValue);
    playerOneNumGlobal.push(playerOneValue);
    console.log("player 1 choice", playerOneValue);
  }
  if (playerInput != 1 && playerInput != 2) {
    console.log(`invalid command`);
    gameState = PLAYER1CHOOSEDICEGAMESTATE;
    return "Please type either 1 or 2.";
  }
  return `Player 1 has chosen the value of ${playerOneValue}<br><br>Kindly click on "Submit" to continue to player 2!`;
};

//Function for player 2 to roll dice push the value into the player roll arrays
var playerTwoRollDice = function () {
  gameState = PLAYER2CHOOSEDICEGAMESTATE;
  var counter2 = 0;
  while (counter2 < 2) {
    playerTwoRolls.push(diceRoll());
    counter2 += 1;
  }
  console.log(`Player 2 rolls ${playerTwoRolls}`);
  return `Welcome Player 2! <br><br> You have rolled:<br><br>Dice No.1: ${playerTwoRolls[0]} <br>Dice No.2: ${playerTwoRolls[1]}<br><br>Please input "1" or "2" to choose the dice number to be used as the final digit in your final value to be used`;
};

//Function to determine player 2's chosen value
var playerTwoValue = function (playerTwoInput) {
  gameState = SHOWDOWN;
  if (playerTwoInput == 1) {
    var playerTwoValue = Number(
      String(playerTwoRolls[0]) + String(playerTwoRolls[1])
    );
    playerTwoNum.push(playerTwoValue);
    playerTwoNumGlobal.push(playerTwoValue);
    console.log("player 2 choice", playerTwoValue);
  }
  if (playerTwoInput == 2) {
    var playerTwoValue = Number(
      String(playerTwoRolls[1]) + String(playerTwoRolls[0])
    );
    playerTwoNum.push(playerTwoValue);
    playerTwoNumGlobal.push(playerTwoValue);
    console.log("player 2 choice", playerTwoValue);
  }
  if (playerTwoInput != 1 && playerTwoInput != 2) {
    console.log(`invalid command`);
    gameState = PLAYER2CHOOSEDICEGAMESTATE;
    return "Please type either 1 or 2.";
  }
  return `Player 2 has chosen the value of ${playerTwoValue}<br><br>Kindly click on "Submit" button to see which player Won!`;
};
//Function to determine which player won.
var whichPlayerWon = function () {
  gameState = RESET;
  if (playerOneNum > playerTwoNum) {
    player1Score += 1;
    console.log(`Player 1 Won. Score is ${player1Score}`);
    return `Player 1 Wins this round!🎆<br><br>Player 1 value: ${playerOneNum}<br><br>Player 2 value: ${playerTwoNum}<br><br>Press click on the "Submit" button to conitue the game!<br><br>Leaderboard:<br>Player 1 score: ${playerOneSum(
      playerOneNumGlobal
    )}<br><br>Player 2 score: ${playerTwoSum(
      playerTwoNumGlobal
    )}<br><br>Number of rounds won by each player:<br>Player 1: ${player1Score}<br><br>Player 2: ${player2Score}`;
  } else if (playerTwoNum > playerOneNum) {
    player2Score += 1;
    console.log(`Player 2 Won! Score is ${player2Score}`);
    return `Player 2 Wins this round!!🎆<br><br>Player 1 value: ${playerOneNum}<br><br>Player 2 value: ${playerTwoNum}<br><br>Please click on the "Submit" button to continue the game!<br><br>Leaderboard:<br>Player 1 Score: ${playerOneSum(
      playerOneNumGlobal
    )}
    <br><br>Player 2 score: ${playerTwoSum(
      playerTwoNumGlobal
    )}<br><br>Number of rounds won by each player:<br>Player 1: ${player1Score}<br><br>Player 2: ${player2Score}`;
  }
  if (playerOneNum == playerTwoNum) {
    console.log(`Score for the two players are equal! Wow!`);
    return `Wow! Your scores are tied up!<br><br>No points will be award. Please click on the "Submit" button to continue the game!
    <br><br>Leaderboard:<br>Player 1 Score: ${playerOneSum(
      playerOneNumGlobal
    )}<br><br>Number of rounds won by each player:<br>Player 1: ${player1Score}<br><br>Player 2: ${player2Score}`;
  }
};

var main = function (input) {
  if (gameState == PLAYER1ROLLDICEGAMESTATE) {
    myOutputValue = playerOneRollDice();
  } else if (gameState == PLAYER1CHOOSEDICEGAMESTATE) {
    myOutputValue = playerOneValue(input);
  } else if (gameState == PLAYER2ROLLDICEGAMESTATE) {
    myOutputValue = playerTwoRollDice();
  } else if (gameState == PLAYER2CHOOSEDICEGAMESTATE) {
    myOutputValue = playerTwoValue(input);
  } else if (gameState == SHOWDOWN) {
    myOutputValue = whichPlayerWon();
  } else if ((gameState = RESET)) {
    myOutputValue = resetgame();
  }

  if (player1Score == 5) {
    myOutputValue = `Player 1 is the first to reach 5 consecutive rounds of winning! HOORAY!!<br><br>Leaderboard:<br><br>Player 1 Score: ${playerOneSum(
      playerOneNumGlobal
    )}<br><br>Player 2 Score: ${playerTwoSum(
      playerTwoNumGlobal
    )}<br><br>Please input "restart" to reset the game!`;
  }

  if (player2Score == 5) {
    myOutputValue = `Player 2 is first to reach 5 consecutive rounds winning! HOORAY!!<br><br>Leaderboard:<br><br>Player 1 Score: ${playerOneSum(
      playerOneNumGlobal
    )}<br><br>Player 2 Score: ${playerTwoSum(
      playerTwoNumGlobal
    )}<br><br>Please input "restart" to reset the game!`;
  }

  if (input == "restart") {
    myOutputValue = resetWholegame();
  }

  return myOutputValue;
};
