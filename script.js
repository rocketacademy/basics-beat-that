/* Base Level
var diceNumbers =[];
var rollNumber =0;
var diceRolls = [];
var dice1 = 0;
var dice2 = 0;
var playerCount = 0;
var main = function (input) {
  while (playerCount<2){
    if (input == ''){
      dice1=Math.floor(Math.random()*6+1);
      dice2=Math.floor(Math.random()*6+1);
      console.log(playerCount);
      return `Your dice numbers are ${dice1} and ${dice2}. To put ${dice1} as your first number, enter "Dice 1". Otherwise, enter "Dice 2" to put ${dice2} as your first number`
    }
    if (input =='Dice 1'){
      playerNumber=`${dice1}${dice2}`
      diceRolls.push(Number(playerNumber));
      playerCount = playerCount + 1
      return `Your number is ${playerNumber}`
    }
    if (input =='Dice 2'){
      playerNumber=`${dice2}${dice1}`
      diceRolls.push(Number(playerNumber));
      playerCount = playerCount + 1
      return `Your number is ${playerNumber}`
    }
  }
  if (diceRolls[0]>diceRolls[1]){
    return `Congratulations Player 1, your number ${diceRolls[0]} is the largest`
  }
  if (diceRolls[1]>diceRolls[0]){
    return `Congratulations Player 2, your number ${diceRolls[1]} is the largest`
  }
}
*/
/* more comfortable level
//numbers rolled
var diceNumbers =[];
//roll counts
var rollNumber =0;
//numbers formed based on player's choice
var diceRolls = [];
//keep tracks if both players had rolled the dices
var playerCount = 0;
var mode = ''
//sequence inputed by player for numbers rolled
var sequence = [];
// set number of dice to be rolled
var numberOfRolls =0;
var main = function (input) {
  while (playerCount<2){
    if (input == ''){
      return 'Enter the number of dices that you want to roll'
    }
    if (isNaN(parseInt(input))==false && mode!="rolled"){
      numberOfRolls = Number(input);
      mode = 'rolled'
      while(rollNumber<numberOfRolls){
        dice = Math.floor(Math.random()*6+1);
        diceNumbers.push(dice);
        rollNumber = rollNumber + 1;
      }
      return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
    }
    if (input =="Roll"){
      rollNumber = 0;
      while(rollNumber<numberOfRolls){
        dice = Math.floor(Math.random()*6+1);
        diceNumbers.push(dice);
        rollNumber = rollNumber + 1;
      }
      return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
    }
    else{
      sequence = input.split("");
      //console.log(sequence);
      playerNumber ='';
      for (var i=0; i<diceNumbers.length; i++){
        playerNumber =playerNumber+`${diceNumbers[parseInt(sequence[i])]}`;
        
      }
      diceNumbers.length = 0;
      diceRolls.push(parseInt(playerNumber));
      playerCount = playerCount+1;
      return `Your number is ${playerNumber}. The next player please enter 'Roll' to start your turn`
    }
  }
  if (diceRolls[0]>diceRolls[1]){
    return `Congratulations Player 1, your number ${diceRolls[0]} is the largest`
  }
  if (diceRolls[1]>diceRolls[0]){
    return `Congratulations Player 2, your number ${diceRolls[1]} is the largest`
  }
}
*/
/* score
//numbers rolled
var diceNumbers =[];
//roll counts
var rollNumber =0;
//numbers formed based on player's choice
var diceRolls = [];
//keep tracks if both players had rolled the dices
var playerCount = 0;
//mode for the dice
var mode = ''
//sequence inputed by player for numbers rolled
var sequence = [];
// set number of dice to be rolled
var numberOfRolls =0;
var player1Score = 0;
var player2Score = 0;
//mode the game is on
var gameMode = 'continuous';
var main = function (input) {
  while (gameMode=='continuous'){
    while (playerCount<2){
      if (input == ''){
        return 'Enter the number of dices that you want to roll'
      }
      if (isNaN(parseInt(input))==false && mode!="rolled"){
        numberOfRolls = Number(input);
        mode = 'rolled'
        while(rollNumber<numberOfRolls){
          dice = Math.floor(Math.random()*6+1);
          diceNumbers.push(dice);
          rollNumber = rollNumber + 1;
        }
        return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
      }
      if (input =="Roll"){
        rollNumber = 0;
        while(rollNumber<numberOfRolls){
          dice = Math.floor(Math.random()*6+1);
          diceNumbers.push(dice);
          rollNumber = rollNumber + 1;
        }
        return `The numbers you rolled are ${diceNumbers}. Please choose the sequence of your number`
      }
      else{
        sequence = input.split("");
        //console.log(sequence);
        playerNumber ='';
        for (var i=0; i<diceNumbers.length; i++){
          playerNumber =playerNumber+`${diceNumbers[parseInt(sequence[i])]}`;
          
        }
        diceNumbers.length = 0;
        diceRolls.push(parseInt(playerNumber));
        playerCount = playerCount+1;
        return `Your number is ${playerNumber}. The next player please enter 'Roll' to start your turn or leave the input empty if the round has ended`
      }
    }
    playerCount = 0;
    mode ='reset'
    if (diceRolls[0]>diceRolls[1]){
      player1Score=player1Score+1;
      return `Player 1 has won this round. The scores are Player 1: ${player1Score} and Player 2:${player2Score}`
    }
    if (diceRolls[1]>diceRolls[0]){
      player2Score=player2Score+1;
      return `Player 2 has won this round. The scores are Player 1: ${player1Score} and Player 2:${player2Score}`
    }
}
}
*/ 

//numbers rolled
var diceNumbers =[];
//roll counts
var rollNumber =0;
//numbers formed based on player's choice
var diceRolls = [];
//keep tracks if both players had rolled the dices
var playerCount = 0;
//mode for the dice
var mode = ''
//sequence inputed by player for numbers rolled
var sequence = [];
// set number of dice to be rolled
var numberOfRolls =0;
var player1Score = 0;
var player2Score = 0;
//number of dices to be rolled
var numberOfRolls =0;
//mode the game is on
var gameMode = 'continuous';
var main = function (input) {
  while (gameMode=='continuous'){
    while (playerCount<2){
      if (input == ''){
        return 'Enter the number of dices that you want to roll'
      }
      if (isNaN(parseInt(input))==false && mode!="rolled"){
        numberOfRolls = Number(input);
        mode = 'rolled';
        playerNumber ='';
        while(rollNumber<numberOfRolls){
          dice = Math.floor(Math.random()*6+1);
          diceNumbers.push(dice);
          rollNumber = rollNumber + 1;
        }
        while (numberOfRolls>0){
          largestNumber = Math.max.apply(null,diceNumbers);
          indexRemoved = diceNumbers.indexOf(largestNumber)-1;
          console.log(largestNumber);
          console.log(indexRemoved);
          diceNumbers = diceNumbers.splice(indexRemoved,1);
          playerNumber=playerNumber + `${largestNumber}`;
          numberOfRolls = numberOfRolls -1;
        }
        diceRolls.push(parseInt(playerNumber));
        playerCount = playerCount+1;
        return `Your largest number is ${playerNumber}. The next player please enter 'Roll' to start your turn or leave the input empty if the round has ended`
      }
      if (input =='Roll'){
        playerNumber ='';
        while(rollNumber<numberOfRolls){
          dice = Math.floor(Math.random()*6+1);
          diceNumbers.push(dice);
          rollNumber = rollNumber + 1;
        }
        while (numberOfRolls>0){
          largestNumber = Math.max.apply(null,diceNumbers);
          indexRemoved = diceNumbers.indexOf(largestNumber)-1;
          console.log(largestNumber);
          console.log(indexRemoved);
          diceNumbers = diceNumbers.splice(indexRemoved,1);
          playerNumber=playerNumber + `${largestNumber}`;
          numberOfRolls = numberOfRolls -1;
        }
        diceRolls.push(parseInt(playerNumber));
        playerCount = playerCount+1;
        return `Your largest number is ${playerNumber}. The next player please enter 'Roll' to start your turn or leave the input empty if the round has ended`
      }
      /*if (input =="Roll"){
        var playerNumber ='';
        var rollNumber = 0;
        while(rollNumber<numberOfRolls){
          dice = Math.floor(Math.random()*6+1);
          diceNumbers.push(dice);
          rollNumber = rollNumber + 1;
        }
        while (diceNumbers.length!=0){
          largestNumber = Math.max.apply(null,diceNumbers);
          indexRemoved = diceNumbers.indexOf(largestNumber);
          diceNumbers = diceNumbers.splice(indexRemoved);
          playerNumber=playerNumber + `${largestNumber}`;
        }
        diceRolls.push(parseInt(playerNumber));
        playerCount = playerCount+1;
        return `Your largest number is ${playerNumber}. The next player please enter 'Roll' to start your turn or leave the input empty if the round has ended`
      }
    }
    */
    playerCount = 0;
    mode ='reset'
    if (diceRolls[0]>diceRolls[1]){
      player1Score=player1Score+1;
      return `Player 1 has won this round. The scores are Player 1: ${player1Score} and Player 2:${player2Score}`
    }
    if (diceRolls[1]>diceRolls[0]){
      player2Score=player2Score+1;
      return `Player 2 has won this round. The scores are Player 1: ${player1Score} and Player 2:${player2Score}`
    }
}
}
}