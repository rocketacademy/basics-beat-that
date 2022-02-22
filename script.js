/* What is the objective?
1. Create a game called "Beat That"
2. Objective of the game for the player to click submit, and the 2 dices will roll. Output will tell the player
what the value of the both dice
3. The player will then need to choose which dice goes first.
​
  What information do I need?
1. We will need a function for dice roll for 2 dices
2. 4 different game modes
​*/
//Declare Global variable
var currentGameMode = "waiting for username";
var userName = "";
var player1Rolls =[];
var player2Rolls = [];
//Comparison of value (Declare Global Variable)
var playerAnswers = [];
//Helper function for diceroll
var rollDice = function(){
  var diceNumber = Math.floor(Math.random() *6) + 1;
  return diceNumber;
};

var rollDiceForPlayer1 = function(){
  var counter = 0
  while( counter < 2){
    player1Rolls.push(rollDice());
    counter = counter + 1}
    return `Player 1, you have thrown 2 dice and the dice number is ${player1Rolls[0]} and ${player1Rolls[1]}, <br> choose "1" or "2" to proceed`
};

var rollDiceForPlayer2 = function(){
  var counter = 0
  while(counter < 2){
    player2Rolls.push(rollDice());
    counter = counter +1}
    return `Player 2, you have thrown 2 dice and the dice number is ${player2Rolls[0]} and ${player2Rolls[1]}, <br> choose "1" or "2" to proceed`
  };

  var chooseWinner = function(){
    if(playerAnswers[0]>playerAnswers[1]){
      return `player1 wins`;
    } if(playerAnswers[1]>playerAnswers[0]){
     return `player2 wins`;
    } if(playerAnswers[0]==playerAnswers[1]){
      return `its a tie`;
    };
  };

  var main = function (input) {
   if(currentGameMode == "waiting for username"){
    userName = input;
    currentGameMode = 'waiting for player1 to roll dice!'
    return `Hello, ${userName}! <br> Welcome to the game of BEAT THAT. <br> To start the game, please press submit again`;
  } if (currentGameMode == `waiting for player1 to roll dice!`){
    currentGameMode = 'waiting for player1 to decide which dice goes first'
    return rollDiceForPlayer1();
  }   else if(currentGameMode == 'waiting for player1 to decide which dice goes first' && input == 1){
    currentGameMode = 'waiting for player2 to roll dice'
    var Player1Score = player1Rolls[0] + "" + player1Rolls[1];
    playerAnswers.push(Player1Score)
    return `your score is ${Player1Score} ; player 2 please roll dice`
  }
    if (currentGameMode == 'waiting for player1 to decide which dice goes first' && input == 2){
      currentGameMode = 'waiting for player2 to roll dice'
    var Player1Score = player1Rolls[1] + "" + player1Rolls[0];
    playerAnswers.push(Player1Score)
    console.log(playerAnswers)
    return `your score is ${Player1Score} ; player 2 please roll dice` 
  }
    else if(currentGameMode == 'waiting for player2 to roll dice'){
       currentGameMode = 'waiting for player2 to decide which dice goes first'
    return rollDiceForPlayer2();
    console.log(playerAnswers)

  }
    else if(currentGameMode == 'waiting for player2 to decide which dice goes first' && input == 1){
    var Player2Score = player2Rolls[0] + "" + player2Rolls[1];
    playerAnswers.push(Player2Score)
    return chooseWinner() + ` your score is ${Player2Score}, and player 1 score is ${playerAnswers[0]}`
    console.log(playerAnswers)
  }
     if(currentGameMode == 'waiting for player2 to decide which dice goes first' && input == 2){
    var Player2Score = player2Rolls[1] + "" + player2Rolls[0];
    playerAnswers.push(Player2Score)
    return chooseWinner() + ` your score is ${Player2Score}, and player 1 score is ${playerAnswers[0]}`
    console.log(playerAnswers)

     };
    };