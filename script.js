/* There will be 2 players. Have a mode for each player.
// create 2 modes, named 'player 1' and 'player 2'
//allow players to determine if the game is in either mode, by typing 'player 1' or 'player 2' as the input;

Players will take turns. When the player clicks the submit button, it rolls 2 dice.
// create a flow that will dictate how the game runs.
// When the game runs, it will roll two dice;
  //create a function to get a random dice number
//return the result of both dice roll to the player
//The game goes into a new mode and shows the 2 dice the player rolled.
//The player users the input box to decide if dice 1 or dice 2 should be the first digit.
//game prompts next user to roll two dice, and return the results to player 2
//player 2 then orders the dice.
//game will compare who has the larger number, and return the winner to the user.

*/

// global variables
var player1 = 'player 1 mode';
var player2 = 'player 2 mode';
var gameMode = player1;
var player1diceRollArray = [];
var player2diceRollArray = [];
var myOutputValue = 'my output value';
var player1FinalNum = null;
var player2FinalNum = null;

// function to roll a dice
var getDiceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceRoll = randomInteger + 1;
  return diceRoll;
};

// function to get results from 2 dice rolls
var getPlayerDiceOptions = function () {
  var counter = 0;
  player1diceRollArray = [];
  player2diceRollArray = [];
  while (counter < 2) {
    if (gameMode == player1) {
      player1diceRollArray.push(getDiceroll());
      console.log(`Player 1 dice array consists of values ${player1diceRollArray}`);
    } else if (gameMode == player2) {
      player2diceRollArray.push(getDiceroll());
      console.log(`Player 2 dice array consists of values ${player2diceRollArray}`);
    }
    counter = counter + 1;
  }
};
// function to get user's decision on which number (out of 2 dice rolls) should be in the front
var getFinalNum = function (input) {
  var finalNum = null;
  if ((gameMode == player1) && (input == 'dice 1')) {
    console.log('input is \'dice 1\' under player 1 mode');
    finalNum = (Number(player1diceRollArray[0]) * 10) + Number(player1diceRollArray[1]);
  } else if ((gameMode == player1) && (input == 'dice 2')) {
    console.log('input is \'dice 2\' under player 1 mode');
    finalNum = (Number(player1diceRollArray[1]) * 10) + Number(player1diceRollArray[0]);
  } else if ((gameMode == player2) && (input == 'dice 1')) {
    console.log('input is \'dice 1\' under player 2 mode');
    finalNum = (Number(player2diceRollArray[0]) * 10) + Number(player2diceRollArray[1]);
  } else if ((gameMode == player2) && (input == 'dice 2')) {
    console.log('input is \'dice 2\' under player 2 mode');
    finalNum = (Number(player2diceRollArray[1]) * 10) + Number(player2diceRollArray[0]);
  }
  return Number(finalNum);
};

var main = function (input) {
  if (input == 'player 1') {
    gameMode = player1;
    getPlayerDiceOptions();
    myOutputValue = `Results <br> Dice roll 1: ${player1diceRollArray[0]} <br> Dice roll 2: ${player1diceRollArray[1]} <br> Form the biggest number you can with both numbers, by specifying if 'dice 1' or 'dice 2' should be the front`;
  } else if (input == 'player 2') {
    gameMode = player2;
    getPlayerDiceOptions();
    myOutputValue = `Results <br> Dice roll 1: ${player2diceRollArray[0]} <br> Dice roll 2: ${player2diceRollArray[1]} <br> Form the biggest number you can, by specifying if 'dice 1' or 'dice 2' should be in the front`;
  }
  if ((gameMode == player1) && ((input == 'dice 1') || (input == 'dice 2'))) {
    player1FinalNum = Number(getFinalNum(input));
    myOutputValue = `Player 1, your final number is ${player1FinalNum}!<br> Input 'player 2' for player 2 to repeat the process`;
  }
  if ((gameMode == player2) && ((input == 'dice 1') || (input == 'dice 2'))) {
    player2FinalNum = Number(getFinalNum(input));
    myOutputValue = `Player 2, your final number is ${player2FinalNum}! <br> enter 'ready' to find out if player 1 or player 2 won!`;
  }
  if (input == 'results') {
    if ((player1FinalNum == null) || (player2FinalNum == null)) {
      myOutputValue = 'Please ensure that all players have chosen a number';
    } else if (player2FinalNum > player1FinalNum) {
      myOutputValue = `player 2 wins!<br> player 1 rolled ${player1FinalNum}, player 2 rolled ${player2FinalNum}`;
    } else if ((player1FinalNum > 0) && (player2FinalNum > 0) && (player1FinalNum == player2FinalNum)) {
      myOutputValue = `it's a draw! <br> player 1 rolled ${player1FinalNum}, player 2 rolled ${player2FinalNum}`;
    } else if (player1FinalNum > player2FinalNum) {
      myOutputValue = `player 1 wins! <br> player 1 rolled ${player1FinalNum}, player 2 rolled ${player2FinalNum}`;
    }
    player1diceRollArray = [];
    player2diceRollArray = [];
  }
  return myOutputValue;
};
