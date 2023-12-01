/*
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/

// === problem breakdown and planning === //
// version 1 . rolls 2 dice and returns the output for 1 player. Player then chooses the dice order and get the correct output
// version 2. refactor code to include player 2
// version 3. implement comparing the dice scores and declare the winner
// version 4. reset the game so that players can play continually without refreshing trhe browser page

/* 2 game modes -  
first mode: rolls 2 dice and returns the dice num for both dices. program to ask for order
second mode: Player input dice order 
*/
var dice_array = [];
var gameMode = 1;
var playerNumber = 0;
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
function gameMode1() {
  for (var i = 0; i < 2; i++) {
    dice_array.push(diceRoll());
  }
  var dice1 = dice_array[0];
  var dice2 = dice_array[1];
  console.log("dice array", dice_array);
  gameMode = 2;
  return `You rolled ${dice1} for dice 1 and ${dice2} for dice 2.<br><br>
          Choose the order of dice by entering "1" or "2"`;
}

function gameMode2(diceOrder) {
  console.log("dice arr [0]", dice_array[0]);
  console.log("Dice arr [1]:", dice_array[1]);
  var dice1 = dice_array[0].toString();
  var dice2 = dice_array[1].toString();

  if (diceOrder == 1) {
    var number = dice1 + dice2;
    playerNumber = Number(number);
    return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
  } else {
    var number = dice2 + dice1;
    playerNumber = Number(number);
    return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
  }
  console.log("player number is: ", number);
}
var main = function (input) {
  if (gameMode == 1) {
    return gameMode1();
  }
  if (gameMode == 2) {
    return gameMode2(input);
  }

  var myOutputValue = "hello world";
  return myOutputValue;
};
