var gameState = "waiting input";
var gameStateChooseDiceOrder = "choose dice order";
var gameStateChooseDiceOrder2 = "choose dice order2";
var playerRolls = [];
var currentPlayer = 1;
var secondPlayer = 2;
var playerScores = [];
var compareScore = "compare score";

var rollDice = function(){
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
}

//function to output dice rolled
var rollDiceForPlayer = function(){
  for (i = 0; i < 2; i++){
    playerRolls.push(rollDice());
  }
  output = "Welcome Player" + currentPlayer + "<br>Your dice1 roll is: " + playerRolls[0] + " <br> Your dice2 roll is: " + playerRolls[1] + ". <br> Please choose 1 or 2";
  if (currentPlayer == 1){
  gameState = gameStateChooseDiceOrder;
  } else {
    gameState = gameStateChooseDiceOrder2;
  }
  return output;

}

var main = function(input){
  console.log("checking game state: ", gameState);
  console.log(playerScores);  
  if (gameState == "waiting input"){
    return rollDiceForPlayer();
  }

  if (gameState == gameStateChooseDiceOrder){
    if (input == 1){
      score = Number(String(playerRolls[0]) + String(playerRolls[1]));
      playerScores.push(score);
      gameState = "second player";
      return "Player" + currentPlayer + " score is " + score;
    } else if(input == 2){
      score = Number(String(playerRolls[1]) + String(playerRolls[0]));
      playerScores.push(score);
      gameState = "second player";
      return "Player" + currentPlayer + " score is " + score;
    } else {
      score = "ERROR, please enter only 1 or 2.<br> Your dice1 roll is: " + playerRolls[0] + " <br> Your dice2 roll is: " + playerRolls[1] + ". <br> Please choose 1 or 2";
      return score;
    }
  } 

  if (gameState == "second player"){
    currentPlayer = secondPlayer;
    playerRolls = [];
    return rollDiceForPlayer();
  }

  // why is the game state not changing to "compare score"?
  if (gameState == gameStateChooseDiceOrder2){
    if (input == 1){
      score = Number(String(playerRolls[0]) + String(playerRolls[1]));
      playerScores.push(score);
      gameState = compareScore;
      return "Player" + currentPlayer + " score is " + score;
    } else if(input == 2){
      score = Number(String(playerRolls[1]) + String(playerRolls[0]));
      playerScores.push(score);
      gameState = compareScore;
      return "Player" + currentPlayer + " score is " + score;
    } else {
      score = "ERROR, please enter only 1 or 2.<br> Your dice1 roll is: " + playerRolls[0] + " <br> Your dice2 roll is: " + playerRolls[1] + ". <br> Please choose 1 or 2";
      return score;
    }
  } 

  if (gameState == compareScore){
    if (playerScores[0] > playerScores[1]){
      gameState = "reset"
      return "Player 1 score is: " + playerScores[0] + " and Player 2 is: " + playerScores[1] + ". Player 1 wins!";
    } else{
      gameState = "reset"
      return "Player 1 score is: " + playerScores[0] + " and Player 2 is: " + playerScores[1] + ". Player 2 wins!";
    }
  }
  
  if (gameState == "reset"){
    gameState = "waiting input";
    playerRolls = [];
    playerScores = [];
    return "Game Reset!";
  }
}
