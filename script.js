var gameMode = 'p1 roll'
var rolledDiceOne = 0;
var rolledDiceTwo = 0;
var p1combinedNumber = 0;
var p2combinedNumber = 0;

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};


var main = function (input) {

  var myOutputValue = '';
  console.log('Game Mode: ' + gameMode);
  

  if (gameMode == 'p1 roll'){
    gameMode = 'p1 choose';
    rolledDiceOne = diceRoll();
    rolledDiceTwo = diceRoll();
    myOutputValue = 'Welcome Player 1. <br> You rolled... <br> Dice 1: ' + rolledDiceOne + '<br> Dice 2: ' + rolledDiceTwo + '<br> Choose the order of the dice (1/2)';
  }
  else if (gameMode == 'p1 choose'){
    gameMode = 'p2 roll';
    if ((input != 1 && input != 2) || input == "") {
      console.log(input);
      myOutputValue = 'Player 1, please input a valid case (1/2)'
      gameMode = 'p1 choose';
      return myOutputValue;
    }
    else if (input == 1){
      p1combinedNumber = rolledDiceOne * 10 + rolledDiceTwo;
    }
    else if (input == 2){
      p1combinedNumber = rolledDiceTwo * 10 + rolledDiceOne;
    }
    myOutputValue = 'Player 1, you chose dice ' + input + ' first. <br> Your number is ' + p1combinedNumber + '.<br> It is now player 2\'s turn <br><br> Player 2, click submit.';
  }
  else if (gameMode == 'p2 roll'){
    gameMode = 'p2 choose';
    rolledDiceOne = diceRoll();
    rolledDiceTwo = diceRoll();
    myOutputValue = 'Welcome Player 2. <br> You rolled... <br> Dice 1: ' + rolledDiceOne + '<br> Dice 2: ' + rolledDiceTwo + '<br> Choose the order of the dice (1/2)';
  }
  else if (gameMode == 'p2 choose'){
    gameMode = 'decide winner';
    if ((input != 1 && input != 2) || input == "") {
      myOutputValue = 'Player 2, please input a valid case (1/2)'
      gameMode = 'p2 choose';
      return myOutputValue;
    }
    else if (input == 1){
      p2combinedNumber = rolledDiceOne * 10 + rolledDiceTwo;
    }
    else if (input == 2){
      p2combinedNumber = rolledDiceTwo * 10 + rolledDiceOne;
    }
    myOutputValue = 'Player 2, you chose dice ' + input + ' first. <br> Your number is ' + p2combinedNumber + '.<br> Click submit again to find out who won!';
  }
  else if (gameMode == "decide winner"){
    gameMode = 'p1 roll'
    if (p1combinedNumber > p2combinedNumber){
      myOutputValue = 'Player 1 won!';
    } 
    else{
      myOutputValue = 'Player 2 won!';
    }
    myOutputValue = myOutputValue + '<br><br> Player 1: ' + p1combinedNumber + '<br> Player 2: ' + p2combinedNumber;
    myOutputValue = myOutputValue + '<br><br> Click submit again to roll';
  }

  return myOutputValue;
};
