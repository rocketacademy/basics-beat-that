var playerOneStoredDiceNumber = [];
var playerTwoStoredDiceNumber = [];
var playerOneFirstDiceValue 
var playerOneSecondDiceValue 
var playerTwoFirstDiceValue 
var playerTwoSecondDiceValue 
var printPlayer1Number
var printPlayer2Number
var gameMode = 'Player 1 roll dice mode'

var diceRoll = function(input){
var generateRandomNumber = Math.ceil((Math.random()* 6));
return generateRandomNumber;
}

var main = function (input) {
 //dice roll 2 times and store value for player 1 in array
 if (gameMode == 'Player 1 roll dice mode'){
 playerOneFirstDiceValue = diceRoll();
 playerOneSecondDiceValue = diceRoll();
 playerOneStoredDiceNumber.push(playerOneFirstDiceValue, playerOneSecondDiceValue);
 gameMode = 'Player 1 order of dice'
 console.log('array 1', playerOneStoredDiceNumber)
// print dice 1 and dice 2 value + allow selection.
return myOutputValue = `Welcome Player 1. <br> You rolled ${playerOneStoredDiceNumber[0]} for Dice 1 and ${playerOneStoredDiceNumber[1]} for Dice 2.<br> Choose the order of the dice (1 or 2)`
};

// Player 1 select order of dice to concatenate dice results
if (gameMode == 'Player 1 order of dice'){
  gameMode = 'Player 2 roll dice mode'
  if (input == 1){
    printPlayer1Number = `${playerOneStoredDiceNumber[0]}${playerOneStoredDiceNumber[1]}`
    return `Player 1, you chose Dice 1 first. <br> Your number is ${printPlayer1Number}. <br> It is now Player 2's turn.`} 
  printPlayer1Number = `${playerOneStoredDiceNumber[1]}${playerOneStoredDiceNumber[0]}`
  return `Player 1, you chose Dice 2 first. <br> Your number is ${printPlayer1Number}. <br> It is now Player 2's turn.`
 }

 //dice roll 2 times and store value for player 2 in array
 if (gameMode == 'Player 2 roll dice mode'){
  gameMode = 'Player 2 order of dice'
  playerTwoFirstDiceValue = diceRoll();
  playerTwoSecondDiceValue = diceRoll();
  playerTwoStoredDiceNumber.push(playerTwoFirstDiceValue, playerTwoSecondDiceValue);
  console.log('array 2', playerTwoStoredDiceNumber)
 // print dice 1 and dice 2 value + allow selection.
 return myOutputValue = `Welcome Player 2. <br> You rolled ${playerTwoStoredDiceNumber[0]} for Dice 1 and ${playerTwoStoredDiceNumber[1]} for Dice 2.<br> Choose the order of the dice (1 or 2)`
 };

// Player 2 select order of dice to concatenate dice results
if (gameMode == 'Player 2 order of dice'){
  gameMode = 'Compare Winner Mode'
  if (input == 1){
    printPlayer2Number = `${playerTwoStoredDiceNumber[0]}${playerTwoStoredDiceNumber[1]}`
    return `Player 2, you chose Dice 1 first. <br> Your number is ${printPlayer2Number}. <br> Hit the submit button to show the winner!`} 
  printPlayer2Number = `${playerTwoStoredDiceNumber[1]}${playerTwoStoredDiceNumber[0]}`
  return `Player 2, you chose Dice 2 first. <br> Your number is ${printPlayer2Number}. <br> Hit the submit button to show the winner!`
 };

 //compare value and print result if player 1 or player 2 win
 if (gameMode == 'Compare Winner Mode'){
  gameMode = 'Player 1 roll dice mode'
  playerOneStoredDiceNumber = [];
  playerTwoStoredDiceNumber = [];
  var Player1Number = Number(printPlayer1Number);
   console.log('player1', Player1Number)
   var Player2Number = Number(printPlayer2Number);
   console.log('player2', Player2Number)   
  if (Player1Number > Player2Number){
    return `Player 1, you have won! <br> Player 1 number is ${printPlayer1Number} while Player 2 number is ${printPlayer2Number}  <br> Hit the submit button to play again.`} 
  if (Player2Number > Player1Number){
    return `Player 2, you have won! <br> Player 1 number is ${printPlayer1Number} while Player 2 number is ${printPlayer2Number}  <br> Hit the submit button to play again.`} 
    
 return `It's a draw! <br> Both have selected the same number <br> Hit the submit button to play again.`
}
};
