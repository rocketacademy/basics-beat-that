// this is the code for Project 2: Dice - Beat That! with all the More Comfortable logic
// includes vaiable number of dice, scores, auto-choose, and variable number of players

// get random roll from 1 to 6
var getRandomDice = function () {
  var randomFloat = Math.random() * 6;
  var randomInteger = Math.floor(randomFloat) + 1;
  return randomInteger;
};

// game modes
var enterNumberOfPlayers = 'enter number of players';
var enterNumberOfDice = 'enter number of dice';
var rollDice = 'roll dice';
var continueGame = 'continue game';
var endGame = 'end game';

// initialise game mode
var gameMode = enterNumberOfPlayers;

// variables for dice array
var numberOfDice;
var diceArray = [];

// variables for players and scores
var scores = [];
var players = [];
var playerNumber = 0;
var numberExponential;
var highestNumber = 6;
var numberOfPlayers = 0;
var currentPlayerIndex = 0;

// variable to count the number of rounds
var roundCounter = 1;

// variables for end game
var highestScore = 0;
var winner;

// get dice array for a set of dice
var getDiceArray = function (diceCount) {
  // reset global values
  diceArray.length = 0;

  var index = 0;
  while (index < diceCount) {
    diceArray.push(getRandomDice());
    index = index + 1;
  }
  console.log(`dice Array is ${diceArray}`);
  return diceArray;
};

// get highest possible player's number based on dice array
var getPlayerNumber = function (array) {
  // reset player number to 0
  playerNumber = 0;

  // set highest number as 6
  highestNumber = 6;

  // set exponential as number of dice - 1 (ones place does not need to multiply by 10)
  numberExponential = numberOfDice - 1;

  // check if dice is highest number then reduce by 1 each loop
  while (highestNumber > 0) {
    var index = 0;
    // check for each dice in the array
    while (index < numberOfDice) {
      // if the dice is the current highest, add to player number and reduce exponential by 1
      if (array[index] == highestNumber) {
        playerNumber = playerNumber + (array[index] * 10 ** numberExponential);
        // console.log(`current player number is ${playerNumber}`);
        numberExponential = numberExponential - 1;
      }
      index = index + 1;
      // console.log(`current index is ${index}`);
    }
    highestNumber = highestNumber - 1;
    // console.log(`current highest number is ${highestNumber}`);
  }
  console.log(`player number is ${playerNumber}`);
  return playerNumber;
};

var main = function (input) {
  console.log(`the game mode is now ${gameMode}`);
  console.log(`current player index is ${currentPlayerIndex}`);
  var myOutputValue = '';
  var index = 0;

  // game mode: initialise game by asking user for number of players
  if (gameMode == enterNumberOfPlayers) {
    // input validation
    if (Number.isNaN(Number(input)) || (input == '')) {
      myOutputValue = 'Please enter a number.';
    } else {
      // input is number of players
      numberOfPlayers = input;
      // create player names and scores array based on number of players
      index = 0;
      while (index < numberOfPlayers) {
        scores.push(0);
        index = index + 1;
        players.push(`Player ${index}`);
      }
      console.log(`current scores: ${scores}`);
      console.log(`players: ${players}`);
      // change game mode to enter number of dice
      gameMode = enterNumberOfDice;
      // prompt user to submit number of dice
      myOutputValue = `You have selected ${numberOfPlayers} players. Enter the number of dice to play with.`;
    }

  // game mode: enter number of dice
  } else if (gameMode == enterNumberOfDice) {
  // input validation
    if (Number.isNaN(Number(input)) || (input == '')) {
      myOutputValue = 'Please enter a number.';
    } else {
      // input is number of dice
      numberOfDice = input;
      // change game mode to start rolling dice
      gameMode = rollDice;
      // prompt user to click submit to roll
      myOutputValue = 'You have selected ' + numberOfDice + ' dice. Click Submit to roll.';
    }

  // game mode: roll dice for each player
  } else if (gameMode == rollDice) {
    // if there are still players left to play
    if (currentPlayerIndex < numberOfPlayers - 1) {
      // get player number from dice array
      diceArray = getDiceArray(numberOfDice);
      playerNumber = getPlayerNumber(diceArray);
      // add player number to current player
      scores[currentPlayerIndex] = scores[currentPlayerIndex] + playerNumber;
      console.log(`current scores: ${scores}`);
      // show result and prompt user to roll for next player
      myOutputValue = `${players[currentPlayerIndex]}, your roll was ${diceArray} and your number is ${playerNumber}. <br><br>Your score is ${scores[currentPlayerIndex]}.`;
      // set next player
      currentPlayerIndex = currentPlayerIndex + 1;
      // for last player, reset player index and go to continue game mode
    } else {
      // get player number from dice array
      diceArray = getDiceArray(numberOfDice);
      playerNumber = getPlayerNumber(diceArray);
      // add player number to current player
      scores[currentPlayerIndex] = scores[currentPlayerIndex] + playerNumber;
      console.log(`current scores: ${scores}`);
      // reset values for last player, show result and prompt user to continue or end game
      gameMode = continueGame;
      myOutputValue = `${players[currentPlayerIndex]}, your roll was ${diceArray} and your number is ${playerNumber}. <br><br>Your score is ${scores[currentPlayerIndex]}. <br><br>That's the end of Round ${roundCounter}. Click submit to continue or type end to end the game.`;
      currentPlayerIndex = 0;
      roundCounter = roundCounter + 1;
    }

    // game mode: get user input to continue or end
  } else if (gameMode == continueGame) {
    if (input == 'end') {
      // go to end game mode
      myOutputValue = 'Calculating results... <br><br>Click submit to see the final scores.';
      gameMode = endGame;
    } else {
      myOutputValue = `Starting Round ${roundCounter}, click submit to roll.`;
      gameMode = rollDice;
    }

    // game mode: end game and show results
  } else if (gameMode == endGame) {
    // get the winning player
    index = 0;
    while (index < scores.length) {
      console.log(`scores[${index}] is ${scores[index]}`);
      console.log(`is score highest: ${scores[index] > highestScore}`);
      if (scores[index] > highestScore) {
        highestScore = scores[index];
        winner = players[index];
      }
      index = index + 1;
    }
    myOutputValue = `The final winner is ${winner}!<br><br>The scores were:<br><br>`;
    // for each player, print out the scores
    index = 0;
    while (index < players.length) {
      myOutputValue = myOutputValue + `${players[index]}: ${scores[index]}<br>`;
      index = index + 1;
    }
    myOutputValue = myOutputValue + '<br>To restart the game, type the number of players and submit.';
    gameMode = enterNumberOfPlayers;
    // reset global values for game restart
    roundCounter = 1;
    numberOfPlayers = 0;
    numberOfDice = 0;
  }
  return myOutputValue;
};
