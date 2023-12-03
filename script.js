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
const ROLL_DICE_MODE = "roll dice mode";
const CHOOSE_ORDER_OF_Player_VALUE = "choose player value";
// const RETRIEVE_WINNER = "retrieve winner";
var currentDiceRollsArray = [];
//game mode 1 is dice roll
//game mode 2 is choose dice order to get the score
var gameMode = ROLL_DICE_MODE;
var playerNumber = 0;
var numOfPlayers = 2;
var currentPlayer = 1;
var allPlayersNumberArr = [];

function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function gameModeRollDice() {
  for (var i = 0; i < 2; i++) {
    currentDiceRollsArray.push(diceRoll());
  }
  var dice1 = currentDiceRollsArray[0];
  var dice2 = currentDiceRollsArray[1];
  console.log("dice array", currentDiceRollsArray);
  gameMode = CHOOSE_ORDER_OF_Player_VALUE;

  return `Hello there Player ${currentPlayer}!<br><br>
          1.First dice: ${dice1}<br><br>
          2.Second dice: ${dice2}<br><br>
          Choose the order of dice for your score by entering "1" or "2"`;
}

function gameModeChooseOrder(diceOrder) {
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

function getWinner() {
  var highestScore = 0;
  var winner;
  console.log("get winner method is called.");
  var playerOneScore = allPlayersNumberArr[0].toString();
  var playerTwoScore = allPlayersNumberArr[1].toString();
  if (playerOneScore > playerTwoScore) {
    winner = 1;
  } else {
    winner = 2;
  }
  return `==== SCOREBOARD ====<br><br>
          Player 1: ${playerOneScore}<br><br>
          player 2: ${playerTwoScore}<br><br>
          ==================== <br><br>
          The winner of the game is Player ${winner}!!!`;
}
var main = function (input) {
  if (gameMode == ROLL_DICE_MODE) {
    return gameModeRollDice();
  }
  if (gameMode == CHOOSE_ORDER_OF_Player_VALUE) {
    // if (input != 1 && input != 2) {
    //   return `Invalid input. Please enter 1 or 2 only.`;
    // }
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = ROLL_DICE_MODE;
      return ` ${gameModeChooseOrder(input)} <br><br>
                It is now player 2's turn.`;
    }
    if (allPlayersNumberArr.length == 2) {
      return getWinner();
    }
    return gameModeChooseOrder(input);
  }
};

//next is to implement comparing the scores for the 2 players
