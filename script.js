// get random roll from 1 to 6
var getRandomDice = function () {
  var randomFloat = Math.random() * 6;
  var randomInteger = Math.floor(randomFloat) + 1;
  return randomInteger;
};

// game modes
var chooseNumberOfDice = 'choose number of dice';
var player1Roll = 'player 1 roll';
var player2Roll = 'player 2 roll';
var player1Choice = 'player 1 choice';
var player2Choice = 'player 2 choice';
var endGame = 'end';

// initialise game mode
var gameMode = chooseNumberOfDice;

var dices = [];
var positions = [];
var numberOfDice;
var diceArray = [];
var dicePosition = [];
var selectedPosition = [];
var playerNumber = 0;
var player1Number;
var player2Number;

var getNumberOfDiceAndRoll = function (diceCount) {
  var index = 0;
  while (index < diceCount) {
    dices.push(getRandomDice());
    index = index + 1;
  }
  return dices;
};

var getDicePosition = function (diceCount) {
  var index = 0;
  while (index < diceCount) {
    positions.push(index);
    index = index + 1;
  }
  return positions;
};

var main = function (input) {
  var myOutputValue = 'hello world';
  var numberExponential;
  var index;
  if (gameMode == chooseNumberOfDice) {
    numberOfDice = input;
    gameMode = player1Roll;
    myOutputValue = 'You have selected ' + numberOfDice + ' dice. Click Submit to roll.';
  } else if (gameMode == player1Roll) {
    // get dice array and positions
    diceArray.length = 0;
    dicePosition.length = 0;
    diceArray = getNumberOfDiceAndRoll(numberOfDice);
    dicePosition = getDicePosition(numberOfDice);
    // go to player 1 choice
    myOutputValue = 'Welcome Player 1. <br><br> You rolled: <br>------dice: ' + diceArray + '<br>positions: ' + dicePosition + '<br><br>Enter the order of dice you want by entering the dice position.';
    gameMode = player1Choice;
  } else if (gameMode == player1Choice) {
    // for each number in user input, create player number
    selectedPosition = input.split('');
    console.log('selected position ' + selectedPosition);
    console.log('dice array ' + diceArray);

    numberExponential = numberOfDice - 1;
    // player number is 0 + selected dice multiplied by 10^numberofdice -1
    // for each loop the power value decreases
    index = 0;
    playerNumber = 0;
    while (index < numberOfDice) {
      playerNumber = playerNumber + (diceArray[selectedPosition[index]]) * 10 ** numberExponential;
      console.log('dice number ' + playerNumber);
      index = index + 1;
      numberExponential = numberExponential - 1;
    }
    // set player 1 number as this number
    player1Number = playerNumber;
    myOutputValue = 'Player 1, you chose the positions' + selectedPosition + '. <br>Your number is ' + player1Number + '. <br> It is now player 2\'s turn. <br><br>Click Submit to roll.';
    // go to player 2 mode
    gameMode = player2Roll;
  } else if (gameMode == player2Roll) {
    // get dice array and positions
    diceArray.length = 0;
    dicePosition.length = 0;
    console.log(diceArray);
    diceArray = getNumberOfDiceAndRoll(numberOfDice);
    dicePosition = getDicePosition(numberOfDice);
    console.log(diceArray);
    // go to player 2 choice
    myOutputValue = 'Welcome Player 2. <br><br> You rolled: <br>------dice: ' + diceArray + '<br>positions: ' + dicePosition + '<br><br>Enter the order of dice you want by entering the dice position.';
    gameMode = player2Choice;
  } else if (gameMode == player2Choice) {
    // for each number in user input, create player number
    selectedPosition = input.split('');
    console.log('selected position ' + selectedPosition);
    console.log('dice array ' + diceArray);

    numberExponential = numberOfDice - 1;
    // player number is 0 + selected dice multiplied by 10^numberofdice -1
    // for each loop the power value decreases
    index = 0;
    playerNumber = 0;
    while (index < numberOfDice) {
      playerNumber = playerNumber + (diceArray[selectedPosition[index]]) * 10 ** numberExponential;
      console.log('dice number ' + playerNumber);
      index = index + 1;
      numberExponential = numberExponential - 1;
    }
    // set player 2 number as this number
    player2Number = playerNumber;
    myOutputValue = 'Player 2, you chose the positions' + selectedPosition + '. <br>Your number is ' + player2Number + '. <br> It is the end of the game. <br><br>Click Submit to see the results.';
    // go to end game mode
    gameMode = endGame;
  } else if (gameMode == endGame) {
    if (player1Number > player2Number) {
      myOutputValue = 'Player 1 won! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    } else if (player1Number < player2Number) {
      myOutputValue = 'Player 2 won! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    } else if (player1Number == player2Number) {
      myOutputValue = 'It was a draw! Player 1\'s number was ' + player1Number + ' and Player 2\'s number was ' + player2Number;
    }
  }
  return myOutputValue;
};
