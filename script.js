//define variables 
var GAME_MODE_DICE_ROLL = 'GAME_MODE_DICE_ROLL';
var GAME_MODE_CHOOSE_DICE_ORDER = 'GAME_MODE_CHOOSE_DICE_ORDER'; 

var lowest = false; 


var gameMode = GAME_MODE_DICE_ROLL; 

//define current player
var currentPlayer = 1;

//define players' dice rolls
var player1DiceRoll = [];
var player2DiceRoll = [];

//define player's choice
var player1Choice = '';
var player2Choice = '';

//keep log of players' scores
var player1Score = []; 
var player2Score = [];

var player1Combined = function (){
  var sum1= 0;
  for (let i = 0; i < player1Score.length; i++) {
      sum1 += player1Score[i];
  }
  console.log(sum1);
  return (sum1);
  };

  var player2Combined = function (){
    var sum2= 0;
    for (let i = 0; i < player2Score.length; i++) {
        sum2 += player2Score[i];
    }
    console.log(sum2);
    return (sum2);
    };




//define functions
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var getDiceRolls = function (){
  var newDiceRolls = [rollDice(), rollDice()];

  if (currentPlayer == 1){
    player1DiceRoll = newDiceRolls;
  } 
  else {
    player2DiceRoll = newDiceRolls;
  }
  return newDiceRolls;
};

var concat2Numbers = function(num1, num2) {
  return Number(String(num1) + String(num2));
};

var firstNumber = '';

var getPlayerNumber = function(firstNumber){
  if (currentPlayer == 1){
    var diceArray = player1DiceRoll;
  }
  else diceArray = player2DiceRoll; 

  var playerDice;

  if (firstNumber == 1) {
    playerDice = concat2Numbers(diceArray[0], diceArray[1]);
  }
  else {
    playerDice = concat2Numbers(diceArray[1], diceArray[0]);
  }


  if (currentPlayer === 1) {
    player1DiceRoll = playerDice;
    player1Score.push(player1DiceRoll);
  } else {
    player2DiceRoll = playerDice;
    player2Score.push(player2DiceRoll);
  }
  // Return generated player num to parent function
  return playerDice;
};


  var winner = function(){
      if (lowest == false && player1Combined() > player2Combined()){
        return 1;
      }
      else if (lowest == true && player1Combined() < player2Combined()){
        return 1;
      }
      return 2;
  };

  

//start of MAIN
var main = function (input) {
    
   if (input == 'lowest'|| input == 'LOWEST'){
     lowest = true;
     console.log(lowest);
     return 'Lowest mode is on. <br>Type "lowest off" to turn off. <br><br> Press Submit to continue.';
   };
   
   if (input == 'lowest off'|| input == 'LOWEST OFF'){
    lowest = false;
    console.log(lowest);
    return 'Lowest mode is off. <br>Type "lowest" to turn on. <br><br>Press Submit to continue.';
  };


   if (gameMode == GAME_MODE_DICE_ROLL){
    var newDiceRolls = getDiceRolls();

    gameMode = GAME_MODE_CHOOSE_DICE_ORDER; 

    console.log(gameMode);
    console.log("Current Player:" + currentPlayer);
    console.log(newDiceRolls);

    return 'Welcome Player ' + currentPlayer + ' . You rolled ' + '<b>' + newDiceRolls[0] + '</b>' + ' and ' + '<b>' + newDiceRolls[1] + '</b>' + ' .<br><br> Choose the order of the dice. <i>Type "1" to select dice1 first, "2" to select dice2 first</i>' + '<br><br><br><b>--LEADERBOARD--</b><br>Player 1 combined score = ' + player1Combined() + '<br> Player 2 combined score = ' + player2Combined();
   }


   if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER) {2
     var firstNumber = Number(input);
     if (firstNumber !== 1 && firstNumber !== 2) {
      return 'Please choose 1 or 2 as the first numeral index for your dice rolls';
    }
   }

    var playerNum = getPlayerNumber(firstNumber);
    console.log(currentPlayer);

    if (currentPlayer == 1){
    var playerNumResponse = 'Player ' + currentPlayer + ' you chose Dice ' + firstNumber + ' first. Your number is ' + playerNum + ' <br><br> Your current score is ' + '<b>' + player1Combined() + '</b>';
    } 
   else var playerNumResponse = 'Player ' + currentPlayer + ' you chose Dice ' + firstNumber + ' first. Your number is ' + playerNum + ' <br><br> Your current score is ' + '<b>' + player2Combined() + '</b>';


    if (currentPlayer == 1){
      currentPlayer = 2; 
      gameMode = GAME_MODE_DICE_ROLL; 
      console.log(newDiceRolls);
      return playerNumResponse + ' <br><br><br> It is now Player 2 turn. <br><br> Press Submit.';

    }

    var winningPlayer = winner(); 
    
    currentPlayer = 1; 
    gameMode = GAME_MODE_DICE_ROLL;

    return playerNumResponse + ' <br><br><b> Player ' + winningPlayer + ' has won. </b><br><br> Player 1 currently rolled  ' + player1DiceRoll + ' .<br> player 2 currently rolled ' + player2DiceRoll + '<br><br><br><b>--LEADERBOARD--</b> <br>Player 1 combined score = ' + player1Combined() + '<br> Player 2 combined score = ' + player2Combined() + '<br> Current lowest mode is  <b>' + lowest + '</b><br><br> Press Submit to restart'; 

  };