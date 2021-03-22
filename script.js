/* Base Code
//array to store final number concatenated by the players
var diceRolls = [];
//random number rolled by dice 1
var dice1 = 0;
//random number rolled by dice 2
var dice2 = 0;
//number of turns completed. Each round there will be 2 turns since there are only 2 players
var playerCount = 0;
var main = function (input) {
  while (playerCount<2){
    //generate dice roll numbers
    if (input == ''){
      dice1=Math.floor(Math.random()*6+1);
      dice2=Math.floor(Math.random()*6+1);
      console.log(playerCount);
      return `Your dice numbers are ${dice1} and ${dice2}. To put ${dice1} as your first number, enter "Dice 1". Otherwise, enter "Dice 2" to put ${dice2} as your first number`
    }
    //add final number concatenated by players to an array to be stored so the numbers can compared at the end of the game to see who won
    if (input =='Dice 1'){
      playerNumber=`${dice1}${dice2}`
      diceRolls.push(Number(playerNumber));
      playerCount = playerCount + 1
      return `Your number is ${playerNumber}`
    }
    //add final number concatenated by players to an array to be stored so the numbers can compared at the end of the game to see who won
    if (input =='Dice 2'){
      playerNumber=`${dice2}${dice1}`
      diceRolls.push(Number(playerNumber));
      playerCount = playerCount + 1
      return `Your number is ${playerNumber}`
    }
  }
  //when playerCount == 2, all players have finished their turns and the winner will be announced
  if (diceRolls[0]>diceRolls[1]){
    return `Congratulations Player 1, your number ${diceRolls[0]} is the largest`
  }
  if (diceRolls[1]>diceRolls[0]){
    return `Congratulations Player 2, your number ${diceRolls[1]} is the largest`
  }
}
*/

/* variable dice mode
//numbers the player receives from rolling the dices
var diceNumbers =[];
//number of dices that has been rolled
var rollNumber =0;
//array to store final numbers concatenated by the players
var diceRolls = [];
//number of turns completed. Each round there will be 2 turns since there are only 2 players
var playerCount = 0;
// there are 2 modes:
// initiate: default mode at the start of the game where players have to choose the number of dices to be rolled
// rolled: mode once the number of dices to be used has been determined and the first player roll his dice
//
var mode = 'initiate'
//player's input on the sequence that they want to arrange the numbers by
var sequence = [];
// number of dices to be rolled for each turn
var numberOfRolls =0;

//generates numbers rolled for the player
var playerRollsDices = function (){
  while(rollNumber<numberOfRolls){
    dice = Math.floor(Math.random()*6+1);
    diceNumbers.push(dice);
    rollNumber = rollNumber + 1;
  }
}

//creates the highest number formed by the player
var playerHighestNumber = function(){
  for (var i=0; i<diceNumbers.length; i++){
      playerNumber =playerNumber+`${diceNumbers[parseInt(sequence[i])]}`;      
  }
  diceRolls.push(parseInt(playerNumber));
}
var main = function (input) {
  while (playerCount<2){
    //initiate game by asking for number of dices to be rolled
    if (input == ''){
      return 'Enter the number of dices that you want to roll'
    }
    //choice on number of dices to be rolled is set and the dices for the first player is rolled
    if (isNaN(parseInt(input))==false && mode!="rolled"){
      numberOfRolls = Number(input);
      mode = 'rolled';
      playerRollsDices();
      return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
    }
    //rolls dice for subsequent turns
    if (input =="Roll"){
      rollNumber = 0;
      playerRollsDices();
      return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
    }
    //concatenate the numbers rolled into the player's final number based on the sequence defined by the player
    else{
      sequence = input.split("");
      playerNumber ='';
      playerHighestNumber();
      //reset the array of the values rolled by the current player for the next turn
      diceNumbers.length = 0;
      playerCount = playerCount+1;
      return `Your number is ${playerNumber}. The next player please enter 'Roll' to start your turn`
    }
  }
  //when playerCount == 2, all players have finished their turns and the winner will be announced
  if (diceRolls[0]>diceRolls[1]){
    return `Congratulations Player 1, your number ${diceRolls[0]} is the largest`
  }
  if (diceRolls[1]>diceRolls[0]){
    return `Congratulations Player 2, your number ${diceRolls[1]} is the largest`
  }
}
*/