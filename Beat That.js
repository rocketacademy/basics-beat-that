//Global variables
var gameStateDiceRoll = 'waiting for player to roll the dice'; 
var gameStateChooseOrder = 'waiting for player to choose order';
var gameStateCompareScores = 'compare the scores' 
var gameState = gameStateDiceRoll;
//To store the current player's dice numbers 
var playerRolls = [];
//To headcount the players
var currentPlayer = 1; 
//To store each player's scores
var allPlayersScores = [];

//Roll dice function 
var rollDice = function () {
  var randomDecimal = Math.random()* 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceForPlayer = function(){
  var counter = 0;
  while (counter < 2){
    playerRolls.push(rollDice());
    counter = counter + 1; 
  }
  return `🎲🤪 Welcome Player ${currentPlayer}! 🤪🎲 <br><br> You rolled ${playerRolls [0]} for Dice 1 and ${playerRolls [1]} for Dice 2. <br><br> Choose the order of the dice by entering 1 or 2.`;
}; 

//Get player's score function 
var getPlayerScore = function(input){
  //Input validation 
  if(input != 1 && input != 2){
    return `❌ Error! Please only input 1 or 2. ❌<br><br> Your dice rolls are: <br><br> 🎲 Dice 1: ${playerRolls [0]} <br><br> 🎲 Dice 2: ${playerRolls [1]}`;
  }
  //If player chose Dice 1
  if(input == 1){
    var playerResult = Number (String(playerRolls[0]) + String(playerRolls[1]));
    outputMessage = `You chose Dice 1. <br><br> Your number is ${playerResult}.`;
  }
  //If player chose Dice 2
  if(input == 2){
    var playerResult = Number (String(playerRolls[1]) + String(playerRolls[0]));
    outputMessage = `You chose Dice 2. <br><br> Your number is ${playerResult}.`;
  }
  //Store player's score 
  allPlayersScores.push(playerResult);
  //Reset for next player 
  playerRolls = []; 
  return outputMessage;
}; 

//Determine winner function 
var getWinner = function (){
  var player1Scores = allPlayersScores[0];
  var player2Scores = allPlayersScores[1];
  outputMessage = `🎲 Player 1: ${player1Scores} <br><br> 🎲 Player 2: ${player2Scores}`;
    //Player 1 wins 
    if (player1Scores > player2Scores)
    {
      return outputMessage + "<br><br> Player 1 wins! 🥳";
    }
    //Player 2 wins 
    if (player1Scores < player2Scores){
      return outputMessage + "<br><br> Player 2 wins! 🥳";
    }
    //Draw 
    if (player1Scores == player2Scores){
      return outputMessage + "<br><br> It is a draw! 🙂";
    }
};

//Reset game 
var resetGame = function (){
  currentPlayer = 1;
  gameState = gameStateDiceRoll; 
  allPlayersScores = [];
};

//Main game 
var main = function (input) {
  var outputMessage = '';
  //Time to roll dice 
  if (gameState == gameStateDiceRoll){
    //Prompt player to click submit in order to play if they input any value. 
    if (input != ''){
      outputMessage = "Please click submit to start play.";
    }
    else{
      outputMessage = rollDiceForPlayer();
      //Change game mode once dice is rolled
      gameState = gameStateChooseOrder;
    }
    return outputMessage;
  }
  
  //Time to choose order 
  if (gameState == gameStateChooseOrder){
    outputMessage = getPlayerScore(input); 
    //Player 1' score
    if (currentPlayer == 1){
      if (input == 1 || input == 2){
        //Transition to Player 2 
        currentPlayer = currentPlayer + 1; 
        gameState = gameStateDiceRoll;
        return outputMessage + "<br><br> It is now Player 2's turn!";
      }
      else{
        return outputMessage;
      }
    }

    //Player 2's score   
    if (currentPlayer == 2){
      gameState = gameStateChooseOrder;
      if (input == 1 | input == 2){
        gameState = gameStateCompareScores; 
        return outputMessage + "<br><br> Click submit for the scores!";
      }
      else{
        return outputMessage;
      }
    }
  }

  //Time to compare and choose the winner 
  if (gameState == gameStateCompareScores){
    outputMessage = getWinner();
    resetGame();
    return outputMessage; 
  }
}
