// Game for 2 players
// player clicks submit and rolls 2 dice, then choose the order of the dice results for player's score
// compare both players score and determine winners


var GAME_STATE_ROLL_DICE = 'GAME_STATE_ROLL_DICE';
var GAME_STATE_CHOOSE_ORDER = 'GAME_STATE_CHOOSE_ORDER';
var gameState = GAME_STATE_ROLL_DICE;
var GAME_STATE_COMPARE_SCORES = 'GAME_STATE_COMPARE_SCORES';

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

//Roll dice helper function
var rollDice = function(){
  var randomDecimel = Math.random() *6;
  var randomInteger = Math.floor(randomDecimel) +1;
  console.log('rollDice function result:', randomInteger)
  return randomInteger;
}

var rollDiceForPlayer = function(){
  var counter = 0;
  while(counter < 2){
    currentPlayerRolls.push(rollDice());
    counter ++;
  }
  return "Hello! Player " + currentPlayer + ", you rolled:<br><br>Dice 1 with value of " + currentPlayerRolls[0] + " and Dice 2 with value of " + currentPlayerRolls[1] + ".<br><br>Now please choose '1' or '2' to determine the order of your rolls and also your final score."
}

var getPlayerScore = function(playerInput){
  var playerScore;
  if (playerInput != 1 && playerInput != 2){
      return "Invalid input! Please enter either '1' or '2' to choose determine your final score. Your dice rolls are<br><br>Dice 1: " + currentPlayerRolls[0] + " and Dice 2: " + currentPlayerRolls[1] +"."
    }
    // player choose '1'
    if (playerInput == 1){
      playerScore = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    }
    // player choose '2'
    if (playerInput == 2){
      playerScore = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
    }
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return "Player " + currentPlayer + " your final chosen score is: " + playerScore;
}

var main = function (input) {
  console.log('Game state is: ', gameState);
  console.log('Checking on the current player: ', currentPlayer);
  var myOutputValue = '';
  if (gameState == GAME_STATE_ROLL_DICE){
    console.log('Game State is GAME_STATE_ROLL_DICE')
    myOutputValue = rollDiceForPlayer();
  
  gameState = GAME_STATE_CHOOSE_ORDER;
  return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_ORDER){
    console.log('GAME_STATE_CHOOSE_ORDER');
    myOutputValue = getPlayerScore(input);

  if (currentPlayer == 1){
    currentPlayer = 2;
    gameState = GAME_STATE_ROLL_DICE;
    return myOutputValue + "<br><br>It is time for Player 2's turn!";
  }
  if (currentPlayer ==2){
    console.log("End of player 2's turn. Next submit click will compare scores.")
    gameState = GAME_STATE_COMPARE_SCORES;
     return myOutputValue + "<br><br>Click Submit again to calculate the scores!";
  }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES){
    console.log("gamestate is COMPARE SCORES")
    myOutputValue = "Player 1's score is: " + allPlayersScore[0] + "<br>Player 2's score is: " + allPlayersScore[1];
    // Player 1 wins
    if (allPlayersScore[0] > allPlayersScore[1]){
      myOutputValue = myOutputValue + "<br><br>Player 1 wins!!";
    }
    // Player 2 wins
    if (allPlayersScore[0] < allPlayersScore[1]){
      myOutputValue = myOutputValue + "<br><br>Player 2 wins!!";
    }
    // Draw
    if (allPlayersScore[0] == allPlayersScore[1]){
      myOutputValue = myOutputValue + "<br><br>It's a draw!!";
  }
  return myOutputValue;
  };
};