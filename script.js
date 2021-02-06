// gamemode welcomes P1 and asks P1 to click submit to start random dice roll

var currentGameMode = 'waiting for P1 to roll';
var myOutputValue = 'Welcome Player 1, please click Submit to roll two dice.';
var storePlayerOneNumber = [];
var playerOneNumberCounter = 0;
var storePlayerTwoNumber = [];
var playerTwoNumberCounter = 0;
var playerOneRollDiceOne;
var playerOneRollDiceTwo;
var playerTwoRollDiceOne;
var playerTwoRollDiceTwo;
var playP1Number;
var playP2Number;
var printMessage;
var countWinP1 = 0;
var countWinP2 = 0;

var main = function (input) {
// P1 clicks submit. App rolls 2 dice, prints dice rolls and asks P1 to use them to make a number
  if (currentGameMode == 'waiting for P1 to roll') {
    playerOneRollDiceOne = Math.floor((Math.random() * 6) + 1);
    console.log('playerOneRollDiceOne ' + playerOneRollDiceOne);
    playerOneRollDiceTwo = Math.floor((Math.random() * 6) + 1);
    console.log('playerTwoRollDiceTwo ' + playerOneRollDiceTwo);
    myOutputValue = 'Hello Player 1, your first die rolled ' + playerOneRollDiceOne + ' and your second die rolled ' + playerOneRollDiceTwo + '. <br>Please compose a number using these digits, type them into the input field and click Submit.';
    currentGameMode = 'P1 inputs number';
  }
  // P1 types chosen number and clicks submit
  // Chosen number is stored/pushed into P1 array. Game mode change into waiting for P2 to dice roll
  else if (currentGameMode == 'P1 inputs number') {
    storePlayerOneNumber.push(input);
    playerOneNumberCounter = playerOneNumberCounter + 1;
    myOutputValue = 'Player 1 has chosen to store the number ' + input + '.<br><br>Welcome Player 2, please click Submit to roll two dice.';
    currentGameMode = 'waiting for P2 to roll';
  }

  // P2 clicks submit. App rolls 2 dice, prints dice rolls and asks P2 to use them to make a number
  else if (currentGameMode == 'waiting for P2 to roll') {
    playerTwoRollDiceOne = Math.floor((Math.random() * 6) + 1);
    console.log('playerTwoRollDiceOne ' + playerTwoRollDiceOne);
    playerTwoRollDiceTwo = Math.floor((Math.random() * 6) + 1);
    console.log('playerTwoRollDiceTwo ' + playerTwoRollDiceTwo);
    myOutputValue = 'Hello Player 2, your first die rolled ' + playerTwoRollDiceOne + ' and your second die rolled ' + playerTwoRollDiceTwo + '. <br>Please compose a number using these digits, type them into the input field and click Submit.';
    currentGameMode = 'P2 inputs number';
  }

  // P2 types chosen number and clicks submit
  // Chosen number is stored/pushed into P2 array.
  else if (currentGameMode == 'P2 inputs number') {
    storePlayerTwoNumber.push(input);
    playerTwoNumberCounter = playerTwoNumberCounter + 1;
    playP1Number = storePlayerOneNumber.slice(-1);
    playP2Number = storePlayerTwoNumber.slice(-1);
    // game logic compares which number in two array is higher, prints out winner
    if (playP1Number < playP2Number) {
      printMessage = 'Player 2 wins!';
      countWinP2 = countWinP2 + 1;
    }
    if (playP1Number > playP2Number) {
      printMessage = 'Player 1 wins!';
      countWinP1 = countWinP1 + 1;
    }
    else printMessage = 'you have a draw';

    myOutputValue = 'Player 2 has chosen to store the number ' + input + '.<br><br>Let us compare the numbers!<br>Player 1 has stored the number ' + playP1Number + ' while Player 2 has stored the number ' + playP2Number + '. ' + printMessage + '<br><br>Click Submit to play the game again.';
    console.log('P1 win count ' + countWinP1);
    console.log('P2 win count ' + countWinP2);
    currentGameMode = 'waiting for P1 to roll';
  }
  return myOutputValue;
};
// OPTIONAL - check that numbers only use random digits given - if numbers pass then go to next step
// OPTIONAL - check that numbers only use random digits given - if numbers pass then go to next step
