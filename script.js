//Get random dice function
var getRandomDiceNumber = function () {
  // return float between 0 to 5.9999
  var randomFloat = Math.random() * 6;
  // return integer between 0 to 1
  var randomDiceRoll = Math.floor(randomFloat) + 1;
  return randomDiceRoll;
};

//Global Variable for Game modes
var currentGameState = 'waiting to start game...';
//var player1Roll = 'Player 1 rolls twice';
//var player2Roll = 'Player 2 rolls twice';
var P1DiceNo = [];
var P2DiceNo = [];
var p1ChosenNumber = 0;
var p2ChosenNumber = 0;
//var gameMode = player1Roll;

//Allow the user to roll the dice twice and get a random number between 1 - 6

var main = function (input) {
  var myOutputValue = '';
  // introduction to start game

  if (currentGameState == 'waiting to start game...') {
    // Allow player 1 to start by typing in start
    // Change game mode to player 1 roll
    currentGameState = 'P1 StartGame';
    myOutputValue = 'Player 1 start rolling the dice by clicking enter';
  }

  else if (currentGameState == 'P1 StartGame') {
    var counter = 0;
    while (counter < 2) {
      P1DiceNo[counter] = getRandomDiceNumber();
      console.log(P1DiceNo);
      counter = counter + 1;
    }
    myOutputValue = 'Player 1: You have rolled <br> Dice #1: ' + P1DiceNo[0] + ' <br>Dice #2: ' + P1DiceNo[1] + '<br> Input your winning number';

    currentGameState = 'P1 Choose number';
  }

  else if (currentGameState == 'P1 Choose number') {
    //allow p1 to input their winning number
    p1ChosenNumber = input;
    myOutputValue = 'Player 2, Roll the dice by pressing enter'
    currentGameState = 'P2 StartGame';
  }

  else if (currentGameState == 'P2 StartGame') {
    var counter = 0;
    while (counter < 2) {
      P2DiceNo[counter] = getRandomDiceNumber();
      console.log(P2DiceNo);
      counter = counter + 1;
    }
    myOutputValue = 'Player 2: You have rolled <br> Dice #1: ' + P2DiceNo[0] + ' <br>Dice #2: ' + P2DiceNo[1] + '<br> Input your winning number';
    currentGameState = 'P2 Choose number';
  }

  else if (currentGameState == 'P2 Choose number') {
    //allow p2 to input their winning number
    p2ChosenNumber = input;
    myOutputValue = 'Lets calculate the results'
    currentGameState = 'calculating results';
  }

  else if (currentGameState == 'calculating results') {

    if (p1ChosenNumber == p2ChosenNumber) {
      myOutputValue == 'Its a draw';
    }
    if (p1ChosenNumber >= p2ChosenNumber) {
      myOutputValue = 'Player 1 Wins!';
    }
    if (p1ChosenNumber <= p2ChosenNumber) {
      myOutputValue = 'Player 2 Wins!';
    }
    currentGameState = 'waiting to start game...';

  }


  return myOutputValue;
};