// game mode
var gameMode = "p1Input";
var player1Number = null;
var player2Number = null;
var player1Rolls = [];
var player2Rolls = [];
var player1Numbers = [];
var player2Numbers = [];
var roundNumber = 1;
var player1Sum = 0;
var player2Sum = 0;


var rollDice = function () {
  // produces a float between 0 and 7
  var randomFloat = Math.random() * 6;
  // take off the decimal
  var resultInteger = Math.floor(randomFloat) + 1;
  lastRoll = resultInteger;
  console.log("dice roll = " + resultInteger)
  return resultInteger;
  
};

var playerRoll = function() {
  var roll1 = rollDice();
  var roll2 = rollDice(); 
  var rolls = [roll1, roll2];
  console.log("roll numbers are " + rolls);
  if (gameMode == "p1Input"){
  gameMode = "player1Decision";
  } else if (gameMode == "p2Input") {
    gameMode = "player2Decision";
  }
  return rolls;
}

//calcualte the sum of elements in the array
var playerSum = function(player) {
  var counter = 0;
  var sum = 0;
  if(player == "player1"){
    while (counter < roundNumber){
      sum = sum + player1Numbers[counter];
      counter ++;
    }
  } else if (player == "player2") {
    while (counter < roundNumber){
      sum = sum + player2Numbers[counter];
      counter ++;
     } 
  }
  return sum;
}

var playerDecideOrder = function(input, rolls, playerNumber) {
  //var playerRolls = rolls;
  var myOutputValue = null;
  if (input == 1 && playerNumber == "player1"){
    player1Number = Number(`${rolls[0]}${rolls[1]}`);
    //to do:sum of array with loops
    player1Numbers.push(player1Number);
    myOutputValue = player1Number;
    console.log ("player 1 number is " + player1Number);
    gameMode = "p2Input";
  } else if (input == 2 && playerNumber == "player1") {
    player1Number = Number(`${rolls[1]}${rolls[0]}`);
    player1Numbers.push(player1Number);
    myOutputValue = player1Number;
    console.log ("player 1 number is " + player1Number);
    gameMode = "p2Input";
  } else if (input ==1 && playerNumber == "player2") {
    player2Number = Number(`${rolls[0]}${rolls[1]}`);
    player2Numbers.push(player2Number);
    myOutputValue = player2Number;
    console.log ("player 2 number is " + player2Number);
    gameMode = "results";
  } else if (input == 2 && playerNumber == "player2") {
    player2Number = Number(`${rolls[1]}${rolls[0]}`);
    player2Numbers.push(player2Number);
    myOutputValue = player2Number;
    console.log ("player 2 number is " + player2Number);
    gameMode = "results";
  }
  return myOutputValue;
}

var decideWinner = function(){
  player1Sum = playerSum("player1");
  player2Sum = playerSum("player2");
  console.log (`Player 1's total is ${player1Sum}. Player 2's total is ${player2Sum}`)
  if (player1Number > player2Number && player1Sum > player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 1 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> 1. Player 1 <br> 2. Player 2 `
  } else if (player1Number > player2Number && player1Sum < player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 1 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> 1. Player 2 <br> 2. Player 1 `
  } else if (player1Number > player2Number && player1Sum == player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 1 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> Shoulder to shoulder! `
  }  else if (player1Number == player2Number && player1Sum > player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. It's a draw this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}.
    <br><br> Leaderboard: <br> 1. Player 1 <br> 2. Player 2 `
  } else if (player1Number == player2Number && player1Sum < player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. It's a draw this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}.
    <br><br> Leaderboard: <br> 1. Player 2 <br> 2. Player 1 `
  }else if (player1Number == player2Number && player1Sum == player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. It's a draw this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}.
    <br><br> Leaderboard: <br> Shoulder to shoulder! `
   } else if (player1Number < player2Number && player1Sum > player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 2 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> 1. Player 1 <br> 2. Player 2 `
  } else if (player1Number < player2Number && player1Sum < player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 2 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> 1. Player 2 <br> 2. Player 1 `
  }  else if (player1Number < player2Number && player1Sum == player2Sum) {
    myOutputValue = `Player 1 scored ${player1Number} and player 2 scored ${player2Number}. Player 2 wins this round. <br>
    <br> Hit submit to play again. <br> <br>For the record, player 1's total is ${player1Sum}, and player 2's total is ${player2Sum}. 
    <br><br> Leaderboard: <br> Shoulder to shoulder!`
  }
  gameMode = "start";
  return myOutputValue;
}



var main = function (input) {
  var myOutputValue = 'hello world';
   if (gameMode == "start"){
     myOutputValue = "Hit submit to roll for player 1!";
     gameMode = "p1Input";

   } else if(gameMode == "p1Input") {
    player1Rolls = playerRoll();
    myOutputValue = `Your first roll is ${player1Rolls[0]} and your second rolls is ${player1Rolls[1]}. <br> <br>
    Input 1 to to choose the first roll as your first digit and the second roll as the second digit of your final number, 
    or input 2 to choose the second roll as your first digit and the first roll as the second digit of your final number. `;

  } else if (gameMode == "player1Decision") {
    player1Number = playerDecideOrder (input, player1Rolls, "player1");
    myOutputValue = `Player 1 has chosen ${player1Number}. <br><br> Hit submit again to roll for player 2. `
  }else if (gameMode == "p2Input"){
    player2Rolls = playerRoll();
    myOutputValue = `Your first roll is ${player2Rolls[0]} and your second rolls is ${player2Rolls[1]}. <br> <br>
    Input 1 to to choose the first roll as your first digit and the second roll as the second digit of your final number, 
    or input 2 to choose the second roll as your first digit and the first roll as the second digit of your final number. `;

  } else if (gameMode == "player2Decision") {
    player2Number = playerDecideOrder (input, player2Rolls, "player2");
    myOutputValue = `Player 2 has chosen ${player2Number}. <br><br> Hit submit to view the results. `;
  } else if (gameMode == "results") {
    myOutputValue = decideWinner();
    roundNumber ++;
  }

  return myOutputValue;
};
