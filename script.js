// 2 players, each player will roll 2 dices each.
// select order of the dice roll to make the biggest possible combination, not adding them up.
// compare P1 choice with P2 choice, biggest wins

let playerRollOfDice = [];
let playerChoice;
let currentPlayer = 1;
let allPlayerChoice =[];
var currentGameState = "Game State Dice Roll";
var nextGameState = "Game State Choose Dice Order";
var gameState = GameStateDiceRoll;


//create helper function first. mathematical equation to randomize dice roll

let diceRoll = function (){
  let randomDecimal = Math.random () * 6;
  let randomInteger = Math.floor (randomDecimal) + 1;
  return randomInteger;

}

// Player's turn to roll dice
 let rollDiceForPlayer = function(){
let counter = 0;
while (counter < 2) {
  playerRollOfDice.push(rollDice());

  counter = counter + 1;
};

return ` <b> Player ${currentPlayer} turn. </b><br> You have numbers ${ playerRollOfDice[0]}<b> and <b> ${ playerRollOfDice [1]} <b>. Please indicate '1' or '2' to proceed with the next selection `
 };

 //change the game state to Game State Choose Dice Order

 let playerChooseDice = function (playerInput) {
// input validation to ensure that the player will key in appropriate number
if ( playerInput != 1 && playerInput != 2){
return `INVALID INPUT Please input '1' or '2' to choose which dice to use first. <br> Your dice rolls are <br> ${playerRollOfDice [0]} and <br> ${playerRollOfDice [1]} . `;
};

//when player chooses 1 as his input
if (playerInput == 1){
  playerChoice = Number(String (playerRollOfDice[0]) + String(playerRollOfDice[1]));
};

//when player chooses 2 as his input
if (playerInput == 2){
  playerChoice = Number(String (playerRollOfDice[1]) + String(playerRollOfDice[0]));
};

allPlayerChoice.push(playerChoice);

  
}

var main = function (input){
if (currentGameState == GameStateDiceRoll){

  let outputMessage = rollDiceForPlayer ();

  return outputMessage;
};

if (currentPlayer == 1){
  currentPlayer == 2;

  currentGameState = "GameStateDiceRoll";

  return outputMessage + `Click SUBMIT to begin Player 2 choice.`;
}

if (currentPlayer == 2){
  currentGameState = "Compare Dice Roll";

  return outputMessage + ` Press SUBMIT to proceed and compare.`;
}

if (currentGameState == "Compare Dice Roll") {
  currentGameState = "Game State Dice Roll";


  //set conditions for winning the game

  currentPlayer = 1;
  if (allPlayerChoice[0] > allPlayerChoices[1]) {
      outputMessage = `Player 1 choice is ${allPlayerChoices[0]}.<br><br> Player 2 choice is ${allPlayerChoices[1]}. <br> <b>Player 1 has a higher number! <br> Click Submit to reset game.`;
  }
  if (allPlayerChoices[0] < allPlayerChoices[1]) {
      outputMessage = `Player 1 choice is ${allPlayerChoices[0]}.<br><br> Player 2 choice is ${allPlayerChoices[1]}. <br> <b>Player 2 has a higher number! <br> Click Submit to reset game.`;
  }

  
  //reset the array for player's choice so new game is started fresh

  allPlayersChoices = [];
  return outputMessage;
};


}
