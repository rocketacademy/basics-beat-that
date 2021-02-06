// create modes for different gamemodes
var diceGame = 'random dice roll';
var players = 'player rolls dice';
var combination1 = 'player 1 chooses combination choice';
var combination2 = 'player 2 chooses combination choice';
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
  }
  return player1Roll;
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
  }
  return player2Roll;
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
      console.log(player1Roll);
      myOutputValue = 'Player 1 has rolled ' + player1Random() + ' <br> please choose ur combination';
      gameMode = combination1;
    }
    return myOutputValue;
  }
  // player 1 enters his choice of combination
  // input has to be numbers in player1Roll
  if (gameMode == combination1 && input <= 66) {
    if ((input == player1Roll[0] + '' + player1Roll[1]) || (input == player1Roll[1] + '' + player1Roll[0])) {
      console.log(player1Roll + 'player 1 dice roll');
      beatThat.push(input);
      console.log(beatThat);
      myOutputValue = 'player 1 has chosen ' + beatThat[0] + ' as his combination <br> Player 2 may now type roll to begin his turn';
      gameMode = diceGame;
      return myOutputValue;
    }

    myOutputValue = 'invalid option, choose either ' + player1Roll;
    return myOutputValue;
  }
  // player 2 turn
  if (gameMode == diceGame && input == 'roll') {
    myOutputValue = 'Player 2 has rolled ' + player2Random() + ' <br> please choose ur combination';
    console.log(player2Roll);
    gameMode = combination2;
    return myOutputValue;
  }
  if (gameMode == combination2 && input <= 66) {
    if (input == player2Roll[0] + '' + player2Roll[1] || input == player2Roll[1] + '' + player2Roll[0]) {
      beatThat.push(input);
      myOutputValue = 'Player 2 has chosen ' + beatThat[1] + ' <br> click submit to view the final winner!';
      gameMode = finalResult;
      return myOutputValue;
    }

    myOutputValue = 'invalid option, choose either ' + player2Roll;
    return myOutputValue;
  }

  // player 2 combination and final resultss
  if (gameMode == finalResult && input.trim() == '') {
    console.log(beatThat);
    // final winner
    if (beatThat[0] > beatThat[1]) {
      myOutputValue = 'Player 1 has selected ' + beatThat[0] + ' while Player 2 has selected ' + beatThat[1] + '<br> the winner is Player 1!';
      return myOutputValue;
    }
    if (beatThat[1] > beatThat[0]) {
      myOutputValue = 'Player 1 has selected ' + beatThat[0] + ' while Player 2 has selected ' + beatThat[1] + '<br> the winner is Player 2!'; }
    return myOutputValue;
  }
  if (gameMode == finalResult && input.trim() != '') {
    myOutputValue = 'dont type anything you baka!';
    return myOutputValue;
  }
};

// player chooses higher possible combination and stores it in array
// displays both players number and determine who wins
