// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.
var GAME_STATE_DICE_ROLL = 'GAME_STATE_DICE_ROLL';
var GAME_STATE_CHOOSE_DICE_ORDER = 'GAME_STATE_CHOOSE_DICE_ORDER';
var GAME_STATE_COMPARE_SCORE = 'GAME_STATE_COMPARE_SCORE';
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];
//helper functions
var rollDice = function(){
  console.log('Control flow: start of rollDice()');
  var randomInteger = Math.floor(Math.random()*6)+1;
  console.log('rollDice output, randomInteger:', randomInteger);
  return randomInteger;
}
var rollDiceForPlayer = function(){
  console.log('Control flow: start of rollDiceForPlayer()');
 for(var counter = 0 ; counter < 2 ;counter += 1 ){
  currentPlayerRolls.push(rollDice());
}
console.log("rollDiceForPlayer changes, currentPlayerRolls: ", currentPlayerRolls);

return `🎲 WELCOME, PLAYER ${currentPlayer} 🎲<br><br> You rolled: <br> Dice1: ${currentPlayerRolls[0]} & Dice2: ${currentPlayerRolls[1]} <br><br> Now,please choose the order of the dice by inputting '1' or '2'.`
}



var getPlayerScore = function(playerInput){
  var playerScore;
if (playerInput != 1 && playerInput !=2){
  console.log('Control flow: input validation,invalid input... NOT 1 AND NOT 2');
  return `Please input '1' or '2' to choose the dice's order. <br><br> Your dice rolls are: <br>Dice1: ${currentPlayerRolls[0]} & Dice2: ${currentPlayerRolls[1]}. `
  } 
  if (playerInput == 1) {
    console.log('Control flow: playerInput == 1');

    playerScore = Number(String(currentPlayerRolls[0])+ String(currentPlayerRolls[1]));
    allPlayersScore.push(playerScore);
   currentPlayerRolls = [];

  return `PLAYER ${currentPlayer}<br> Your chosen value is: ${playerScore}.`
  }
  if (playerInput == 2){
   console.log('Control flow: playerInput == 2');

    playerScore = Number(String(currentPlayerRolls[1])+ String(currentPlayerRolls[0]));
  allPlayersScore.push(playerScore);
  currentPlayerRolls = [];

  return `PLAYER ${currentPlayer} <br> Your chosen value is: ${playerScore}.`
  }
}

var comparePlayerScores = function(){
  var compareMessage = `Player 1 score: ${allPlayersScore[0]}<br> Player 2 score: ${allPlayersScore[1]}`
 if (allPlayersScore[0] > allPlayersScore[1]){
    compareMessage += `Player 1 wins.👩`
  };
  if (allPlayersScore[0] < allPlayersScore[1]){
    compareMessage +=`Player 2 wins.🧑`
  };
    if (allPlayersScore[0] == allPlayersScore[1]){
    compareMessage +=`This is a tie.🤷‍♀️`
  };
  return compareMessage;
}

var restGame = function(){
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
}

var main = function (input) {
  console.log('Checking game state on submit click: ', gameState)
  console.log('Checking currentPlayer on submit click: ', currentPlayer);

  var outputMessage = '';
 if(gameState == GAME_STATE_DICE_ROLL){
  console.log('Control flow: gameState == GAME_STATE_DICE_ROLL');

gameState = GAME_STATE_CHOOSE_DICE_ORDER;
outputMessage = rollDiceForPlayer();
return outputMessage;
 }
 if(gameState == GAME_STATE_CHOOSE_DICE_ORDER){
  console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

  outputMessage = getPlayerScore(input);
 
  
  if(currentPlayer == 1){
    console.log("control flow: end of player1 turns,now player2 turns");

    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    return `${outputMessage} <br><br> Now is the Player2 turn & Click the submit button.`; 
  }
  if(currentPlayer == 2){
    console.log("control flow: end of player2 turn and submit click will calculate score");

    gameState = GAME_STATE_COMPARE_SCORE; 
  return `${outputMessage} <br><br> Press submit to calculate scores.`;
};
};
if (gameState == GAME_STATE_COMPARE_SCORE){
  console.log('control flow:game state== GAME_STATE_COMPARE_SCORES');

  outputMessage = comparePlayerScores();
  
  restGame();
  console.log('current player after rest : ', currentPlayer);
  console.log('game state reset :',gameState);
  console.log('allPlayersScoreg array:', allPlayersScore);
  
  return outputMessage;
};
};