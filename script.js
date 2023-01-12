// Game for 2 players
// player clicks submit and rolls 2 dice, then choose the order of the dice results for player's score
// compare both players score and determine winners


var GAME_STATE_ROLL_DICE = 'GAME_STATE_ROLL_DICE';
var GAME_STATE_CHOOSE_ORDER = 'GAME_STATE_CHOOSE_ORDER';
var gameState = GAME_STATE_ROLL_DICE;

var playerRolls = [];

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
    playerRolls.push(rollDice());
    counter ++;
  }
  return "Hello! You rolled:<br><br>Dice 1 with value of " + playerRolls[0] + " and Dice 2 with value of " + playerRolls[1] + ".<br><br>Now please choose '1' or '2' to determine the order of your rolls and also your final score."
}

var getPlayerScore = function(playerInput){
  if (playerInput != 1 && playerInput != 2){
      return "Invalid input! Please enter either '1' or '2' to choose determine your final score. Your dice rolls are<br><br>Dice 1: " + playerRolls[0] + " and Dice 2: " + playerRolls[1] +"."
    }
    // player choose '1'
    if (playerInput == 1){
      var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
      return "Your final chosen score is: ", playerScore;
    }
    // player choose '2'
    if (playerInput == 2){
      var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
      return "Your final chosen score is: ", playerScore;
    }
}

var main = function (input) {
  console.log('Game state is: ', gameState)
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
    return myOutputValue;
  }
};