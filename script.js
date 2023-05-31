//====Requirements=====//

//1) there are 2 players and players take turns
//2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls, eg. 3 and 6
//3) the player picks the order of the dice they want. Eg. if they wanted the number 63, they would specify that the 2nd dice goes first
//4) after both players have rolled and chosen dice order, the player with the higher combined number wins


//==== problem breakdown and planning =====//
//ver 1. rolls 2 dice and turns the output for 1 player. That player chooses the dice order and gets the correct return output.
// ver 2. refactored code to include Player 2
//ver 3. implementing comparing dice scores and declare the winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page


var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ROLL = "GAME_STATE_CHOOSE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER;
var gamestate = GAME_STATE_DICE_ROLL;

var playerRolls = [];

//Helper function to roll dice
var rollDice = function () {
  console.log('Control flow: start of rollDice()');
  //Random decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  //Random integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log('rollDice output, randomInteger: ', randomInteger);

  return randomInteger;
}

//helper function to roll 2 dice
var rollDiceForPlayer = function() {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter ++;
  }
  return `Welcome!<br><br>You have rolled:<br>Dice 1: ${playerRolls[0]}<br>Dice 2: ${playerRolls[1]}<br><br>Now input either '1' or '2' to choose the corresponding dice to coose the corresponding dice to be used as the first digit of your final value.`
}

//get player's input and output the appropriate message
var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    return `Error! Please only input either '1' or '2' to choose which dice to use as the first digit. <br><br>Your dice rolls are:<br>Dice 1: ${playerRolls[0]}<br>Dice 2: ${playerRolls[1]}.`;
  }
  if (playerInput == 1) {
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `Your chose value is: ${playerScore}`;
  }

  if (playerInput == 2) {
    var playerScore2 = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `Your chose value is: ${playerScore2}`;
  }
}

function main(input) {
  console.log('Checking game state on submit click: ', gamestate);
  var outputMessage = '';
  if (gamestate == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gamestate == GAME_STATE_DICE_ROLL");

    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    //Change the game state
    gamestate = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  
  if (gamestate == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log('Control flow: gamestate == GAME_STATE_CHOOSE_DICE_ORDER');

    //call playerScore function
    outputMessage = getPlayerScore(input);    
    return outputMessage;
  }

}
