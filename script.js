/*
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

// === problem breakdown and planning === //
// version 1 . rolls 2 dice and returns the output for 1 player. Player then chooses the dice order and get the correct output
// version 2. refactor code to include player 2
//            - global variables for current player; array to store all the players score
//            -refactor output messages to interact with each player 1 and 2
//            - write logic for player 1 to go first, then plater 2, then compare the score

// version 3. implement comparing the dice scores and declare the winner
// version 4. reset the game so that players can play continually without refreshing trhe browser page

/* 2 game modes -  
first mode: rolls 2 dice and returns the dice num for both dices. program to ask for order
second mode: Player input dice order 
*/

//global variables
var currentDiceRollsArray = [];
//game mode 1 is dice roll
//game mode 2 is choose dice order to get the score
var gameMode = 1;
var playerNumber = 0;
var numOfPlayers = 2;
var currentPlayer = 1;
var allPlayersNumberArr = [];

function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
function gameMode1() {
  for (var i = 0; i < 2; i++) {
    currentDiceRollsArray.push(diceRoll());
  }
  var dice1 = currentDiceRollsArray[0];
  var dice2 = currentDiceRollsArray[1];
  console.log("dice array", currentDiceRollsArray);
  gameMode = 2;
  return `Hello there Player ${currentPlayer}!<br><br>
          You rolled ${dice1} for dice 1 and ${dice2} for dice 2.<br><br>
          Choose the order of dice by entering "1" or "2"`;
}

function gameMode2(diceOrder) {
  var playerNumber;
  console.log("dice arr [0]", currentDiceRollsArray[0]);
  console.log("Dice arr [1]:", currentDiceRollsArray[1]);
  var dice1 = currentDiceRollsArray[0].toString();
  var dice2 = currentDiceRollsArray[1].toString();

  if (diceOrder == 1) {
    var number = dice1 + dice2;
    playerNumber = Number(number);
    //return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
  } else {
    var number = dice2 + dice1;
    playerNumber = Number(number);
    //return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
  }
  console.log("player number is: ", number);
  allPlayersNumberArr.push(playerNumber);
  currentDiceRollsArray = [];

  return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
}
var main = function (input) {
  console.log("current player: ", currentPlayer);
  if (gameMode == 1) {
    return gameMode1();
  }
  if (gameMode == 2) {
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = 1;
    }
    return gameMode2(input);
  }
};

//next is to implement comparing the scores for the 2 players
