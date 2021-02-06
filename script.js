//initialize game mode constants
var SELECT_NUMBER_OF_PLAYERS = 'select number of players';
var SELECT_NUMBER_OF_DICES = 'select number of dices'; 

// initialize variables 
// random computer rolls (unordered)
var playerOneRoll = []; 
var playerTwoRoll = [];

var playerOneChoice = 0;
var playerTwoChoice = 0;

var playerOneLog = 0;
var playerTwoLog = 0;
var totalLog = 0;

var mode = SELECT_NUMBER_OF_PLAYERS;
var message = '';
var winner = '';

var numPlayers = 0;


// generates dice roll in number  
var rollDice = function () {
  // avoid rolling 0
  var randomDecimal = 1 + Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
}

// takes number of dice that user wants to play with, and returns numbers in an array
var playerOptions = [];
var rollMultipleDice = function (diceNumber, playerOptions) {

  for (var i = 0; i < diceNumber; i += 1) {
    playerOptions.push(rollDice());
  }
  return playerOptions;
} 

// input: array of numbers [2,1,6] 
// output: largest number out of an array of numbers = 621
var createLargestCombination = function (diceRollArray) {

  // input: array of numbers 
  // return array in from highest to lowest [6,2,1]
  var sortedArray = diceRollArray.sort ( (currentItem, nextItem) => nextItem - currentItem);

  //'6' + '2' + '1' = '621' = 621

  // join the items in the array together into a string
  var stringifiedArray = sortedArray.join('');

  // turn the string back into a number
  var stringToNum = Number(stringifiedArray);

  return stringToNum;

}

var main = function (input) {

  // (1) save the number of players throughout the game
  if (mode == SELECT_NUMBER_OF_PLAYERS) {
    numPlayers = input;

  }

  // (2) save the number of dice throughout game


  // (3) roll dice –> for each player, roll multiple dice + store the largest combination in an array 


  // determineWinner helper function (compare all the players rolls), highest number will be the winner 






  // default mode: player 1 starts
  // output: rauto generate highest combined number from dice rolls
  if (mode == 'Player 1 turn') {

    diceNumber = input; 

    // player 1 rolls unordered dice -> [6,2,1]
    // generate highest combination -> 621 
    playerOneChoice = createLargestCombination (rollMultipleDice (diceNumber, playerOneRoll));

    console.log('player one choice ' + playerOneChoice);
    console.log('player one roll ' + playerOneRoll);

    mode = 'Player 2 turn';

    return 'Player 1: you rolled ' + playerOneRoll + '<br>Your largest combination is ' + playerOneChoice + ' which is the number that Player 2 must beat. Player 2 roll!';
  }

  // player 2 clicks to roll 
  // output: auto generate highest combined number from dice rolls
  else if (mode == 'Player 2 turn') {

    // player 2 rolls unordered dice -> [6,2,1]
    // generate highest combination -> 621 
    playerTwoChoice = createLargestCombination (rollMultipleDice (diceNumber, playerTwoRoll)); 

    console.log ('player 2 choice' + playerTwoChoice);
    console.log('player 2 roll ' + playerTwoRoll);

    // after both players have rolled, then total games will +1 
    totalLog += 1; 
    
    // decides who win
    if (playerOneChoice > playerTwoChoice) {
      playerOneLog += 1;
      winner = 'Player 1, you win! '
    }
    else {
      playerTwoLog += 1;
      winner = 'Player 2, you win! '
    }

    return 'Player 2, you rolled ' + playerTwoRoll +  '<br>Your largest combination is ' + playerTwoChoice +'. <br>'+ winner + '<br> Player 1: ' + playerOneLog + '/' + totalLog + '<br>Player 2: ' + playerTwoLog + '/' + totalLog; 

  } 
  mode = 'Player 1 turn';
}
  
