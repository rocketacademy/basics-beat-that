// create modes for different gamemodes
var diceGame = 'random dice roll';
var players = 'player rolls dice';
var combination = 'player chooses combination choice';
var finalResult = 'final results for both players';
var gameMode = players;

// create other variables
var randomDiceNumber = '';
var player1Roll = [];
var player2Roll = [];
var beatThat = [];

// create dice roll function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// create individual player roll function
var player1Random = function () {
  var counter = 0;
  while (counter < 2) {
    console.log(randomDiceNumber);
    console.log('randomDiceNumber');
    player1Roll.push(rollDice());
    console.log(counter);
    counter = counter + 1;
    console.log(counter + ' counter2');
    return player1Roll;
  }
};

var player2Random = function () {
  var counter = 0;
  while (counter < 2) {
    console.log(randomDiceNumber);
    console.log('randomDiceNumber');
    player2Roll.push(rollDice());
    console.log(counter);
    counter = counter + 1;
    console.log(counter + ' counter2');
    return player2Roll;
  }
};

var main = function (input) {
  if (gameMode == players) {
    // input validation: no empty strings, or strings with just spaces
    if (input.trim() == '' || input != 'roll') {
      var myOutputValue = 'Please type in roll to continue';
      return myOutputValue;
    }

    // player 1 types in roll and the game mode changes to dice game
    if (input == 'roll') {
      gameMode = diceGame;
      player1Random();
      console.log(player1Roll);
      myOutputValue = 'Player 1 has rolled ' + player1Random() + ' <br> please choose ur combination';
      gameMode = combination;
    }
    return myOutputValue;
  }
  // player 1 enters his choice of combination
  if (gameMode == combination && input <= 67) {
    beatThat.push(input);
    console.log(beatThat);
    myOutputValue = 'player 1 has chosen ' + beatThat[0] + ' as his combination <br> Player 2 may now begin his turn';
    gameMode = diceGame;
    return myOutputValue;
  }
  // player 2 turn
  if (input == 'roll') {
    player2Random();
    console.log(player2Roll);
    myOutputValue = 'Player 2 has rolled ' + player2Random() + ' <br> please choose ur combination';
    gameMode = finalResult;
    return myOutputValue;
  }
  // player 2 combination and final results
  if (gameMode == finalResult && input <= 67) {
    beatThat.push(input);
    console.log(beatThat);
    // final winner
    if (beatThat[0] >= beatThat[1]) {
      myOutputValue = 'Player 1 has selected ' + beatThat[0] + ' while Player 2 has selected ' + beatThat[1] + '<br> the winner is Player 1!';
    }
    else {
      myOutputValue = 'Player 1 has selected ' + beatThat[0] + ' while Player 2 has selected ' + beatThat[1] + '<br> the winner is Player 2!'; }
  }
  return myOutputValue;
};

// };
// player chooses higher possible combination and stores it in array
// displays both players number and determine who wins
