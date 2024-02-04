var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ROLL = 'GAME_STATE_CHOOSE_DICE_ROLL';
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

var rollDice = function(){
  console.log('Control flow: start of rollDice()')
  var randomInteger = Math.ceil(Math.random() * 6);
  
  console.log('rollDice output, randomInteger:', randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function(){
  console.log('Control flow: start of rollDiceForPlayer()');
  var counter = 0;
  while (counter < 2){
    playerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log('rollDiceForPLayer changes, playerRolls:', playerRolls);
  return "Welcome<br><br>You rolled:<br>Dice 1:" + playerRolls[0] + "| Dice 2:" + playerRolls[1] + ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value."
};

var getPlayerScore = function(playerInput){

  if(playerInput != 1 && playerInput != 2){
      console.log('Control flow: input validation, valid input... Not 1 & not 2');
      return"Error! Please only input '1' or '2' to choose which dice to use as the first digit.<br><br>Your dice rolls are:<br>Dice 1: " + playerRolls[0] + "| Dice 2: " + playerRolls[1] + "."; 
    }

    if(playerInput == 1){
      var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
      return "Your chosen value is:" + playerScore;
    }

    if(playerInput == 2){
      var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
      return "Your chosen value is:" + playerScore;
    }
};

var main = function (input) {
  console.log('Checking game state on submit click:', gameState);
  var myOutputValue = '';

  if(gameState == GAME_STATE_DICE_ROLL){
    console.log ('Control flow: gameState == GAME_STATE_DICE_ROLL');
  }
  
  outputMessage = rollDiceForPlayer();
  gameState = GAME_STATE_CHOOSE_DICE_ROLL;

  if(gameState == GAME_STATE_CHOOSE_DICE_ROLL){
    console.log('Control flow: gameState == GAME_STATE_CHOOSE_DICE_ROLL');

    outputMessage = getPlayerScore(input);
    return outputMessage

  }

  return myOutputValue;
};
