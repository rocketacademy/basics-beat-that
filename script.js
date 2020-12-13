// Variable declaration
var gameMode = 'select dice number'
var numberOfDice = 0;
var p1Rolls = [];
var p2Rolls = [];
var p1combinedNumber = 0;
var p2combinedNumber = 0;

// Function 1: randomizer between 1-6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Function 2: rolls dice X number of times
var rollsInArray = function(diceCount){
  var counter = 0;
  var thisArray = [];
  while (counter < diceCount){
    thisArray.push(diceRoll());
    counter = counter + 1;
  }
  return thisArray;
}

// Function 3: print the roll result
var printRollResult = function(playerArray){
  var msgResult = '';
  var lengthArray = playerArray.length;
  var firstLine = 'You rolled:';
  var secondLine = '<br> ----dice:'
  var thirdLine = '<br> position:'
  var fourthLine = '<br> Enter the order of the positions of the numbers you want'
  var counter = 0;
  while (counter < lengthArray){
    secondLine = secondLine + ' ' + playerArray[counter] ;
    thirdLine = thirdLine + ' ' +counter;
    counter = counter + 1;
  }
  msgResult = firstLine + secondLine + thirdLine + fourthLine
  return msgResult; 
}

// Function 4: Creates number from number input
var numberOrdered = function (userInputOrder, userDice){
  var positions = userInputOrder.toString(10).split("").map(Number);
  var lengthPositions = positions.length;
  var orderedResult = '';
  
  counter = 0;
  while (counter < lengthPositions){
    orderedResult = orderedResult + userDice[positions[counter]];
    counter = counter + 1;
  }
  console.log('positions: ' + userInputOrder);
  console.log('rolls: ' + userDice);
  console.log('p1Combined: ' + orderedResult);
  return orderedResult;
}

// MAIN FUNCTION: What happens when you click submit
var main = function (input) {
  var myOutputValue = '';
  console.log('Game Mode: ' + gameMode);

  // Game Mode 1: User selects number of dice
  if (gameMode == 'select dice number'){
    console.log(input);
    console.log(isNaN(Number(input)));
    if (isNaN(Number(input)) || input == "" ){
      myOutputValue = 'Please input a valid number';
      return myOutputValue;
    }
    numberOfDice = Number(input);
    myOutputValue = 'You have selected ' + numberOfDice + ' rolls per player. <br> Player 1, click submit.';
    gameMode = 'p1 roll';
    return myOutputValue;
  }
  // Game Mode 2: Player 1 rolls
  else if (gameMode == 'p1 roll'){
    gameMode = 'p1 choose';
    p1Rolls = rollsInArray(numberOfDice);
    myOutputValue = 'Welcome Player 1. <br>' + printRollResult(p1Rolls);
  }
  // Game Mode 3: Player 1 chooses order
  else if (gameMode == 'p1 choose'){
    gameMode = 'p2 roll';
    if (isNaN(Number(input)) || input == "" || p1Rolls.length != input.toString(10).split("").map(Number).length) {
      myOutputValue = 'Player 1, please input a valid number'
      gameMode = 'p1 choose';
      return myOutputValue;
    }
    p1combinedNumber = numberOrdered(input, p1Rolls);
    myOutputValue = 'Player 1, you chose order ' + input + '. <br> Your number is ' + p1combinedNumber + '.<br> It is now player 2\'s turn <br><br> Player 2, click submit.';
  }
  // Game Mode 4: Player 2 rolls
  else if (gameMode == 'p2 roll'){
    gameMode = 'p2 choose';
    p2Rolls = rollsInArray(numberOfDice);
    myOutputValue = 'Welcome Player 2. <br>' + printRollResult(p1Rolls);
  }
  // Game Mode 5: Player 2 chooses order
  else if (gameMode == 'p2 choose'){
    gameMode = 'decide winner';
    if (isNaN(Number(input)) || input == "" || p1Rolls.length != input.toString(10).split("").map(Number).length) {
      myOutputValue = 'Player 2, please input a valid number'
      gameMode = 'p2 choose';
      return myOutputValue;
    }
    p2combinedNumber = numberOrdered(input, p2Rolls);
    myOutputValue = 'Player 1, you chose order ' + input + '. <br> Your number is ' + p2combinedNumber + '. <br><br> Click submit for results.';
  }
  // Game Mode 6: Print result page
  else if (gameMode == "decide winner"){
    gameMode = 'select dice number'
    if (p1combinedNumber > p2combinedNumber){
      myOutputValue = 'Player 1 won!';
    } 
    else{
      myOutputValue = 'Player 2 won!';
    }
    myOutputValue = myOutputValue + '<br><br> Player 1: ' + p1combinedNumber + '<br> Player 2: ' + p2combinedNumber;
    myOutputValue = myOutputValue + '<br><br> Input the number of dice rolls and click submit.';
  }

  return myOutputValue;
};
