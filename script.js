// ===================================================
// ===================================================
//  Global Variables
// ===================================================
// ===================================================

// game mode - use variables to represent different mode options
var howManyPlayers = 'choose how many players';
var howManyDice = 'choose how many dice';
var rollDice = 'roll dice';
var makeMaxVal = 'make max value';
var declareWinner = 'declare winner';
var gameMode = howManyPlayers;

// variables re: players
var whichPlayerMode = 1; // set default to start with player 1
var numOfPlayers = 2; // set default as 2 players in case user submits blank for no of players

// variables re: dice
var numOfDice = 2; // set default as 2 dice in case user submits blank for no of dice
var diceRollArray = [];

// variables re: game values
var scoreArray = []; // to store the scores for the entire game
var maxValArray = []; // to store the values created in each round

// ===================================================
// ===================================================
// Helper Functions
// ===================================================
// ===================================================

// at start of game, give each player a starting score of 0
var startScoreArray = function () {
  var counter = 0;

  while (counter < numOfPlayers) {
    scoreArray[counter] = 0;
    counter = counter + 1;
  }
};
// ===================================================

// create an array of random dice rolls
var getDiceRollArray = function () {
  var array = []; // starting with an empty array also ensures nil dice rolls by previous player(s)
  var counter = 0;

  while (counter < numOfDice) { // no of dice rolls == no of dice chosen for the game
    var diceRoll = 1 + Math.floor(Math.random() * 6); // generate random num from 1 to 6
    array.push(diceRoll);
    counter = counter + 1;
  }

  return array;
};
// ===================================================

// displays the elements in an array as a string
var displayAnyArray = function (array) {
  var display = '';
  var counter = 0;

  while (counter < array.length) {
    display = display + array[counter] + '  ';
    counter = counter + 1;
  }

  return display;
};
// ===================================================

// display a string of index positions in order
// this is for the array of dice rolls
var displayIndex = function () {
  var display = '';
  var counter = 0;

  while (counter < numOfDice) { // loop runs based on no of dice
    display = display + counter + '  ';
    counter = counter + 1;
  }

  return display;
};
// ===================================================

// find the index position of the highest value in an incoming array
var getWinIndex = function (array) {
  // start off with the 1st element in array
  var winIndex = 0; // start with index position of 1st element
  var winValue = array[0]; // start with value of 1st element

  var counter = 0;

  while (counter < array.length - 1) { // minus 1 bcos for x elements only need (x-1) comparisons
    var nextElement = array[counter + 1]; // this reads the next element in the array

    // compare current winning number with the next element
    // the higher number becomes the current winning number
    // store the corresponding index position in winIndex
    // above steps repeat until we are done with the last element in the array
    if (nextElement > winValue) {
      winValue = nextElement;
      winIndex = counter + 1;
    }
    counter = counter + 1;
  }

  return winIndex;
};
// ===================================================

// computer creates a string of positions to arrange dice rolls into a single highest number value
var getCompPositions = function () {
  // duplicate array of dice rolls so that we do not affect the original array of dice rolls
  var array = diceRollArray.slice();

  var string = '';

  var counter = 0;
  while (counter < array.length) {
    var index = getWinIndex(array); // get the index position of the highest number in array
    string = string + index; // add the above index position to a string
    array[index] = 0; // change highest num in array to 0 so that it is excluded in next loop run
    counter = counter + 1;
  }

  return string;
};
// ===================================================

// create a single highest value by ordering the dice rolls
// by looping over incoming array of positions order
// and reading the array of dice rolls accordingly
var getMaxVal = function (array) {
  var max = '';
  var counter = 0;

  while (counter < array.length) {
    // counter = index to read incoming array of positions order
    // so the array is read in order from the 1st to the last element
    // then, each value of the array is used as the index to read diceRollArray
    var value = array[counter];
    max = max + diceRollArray[value];

    counter = counter + 1;
  }

  return max;
};
// ===================================================

// for each round, update the scores in the array for scores
var updateScores = function () {
  var counter = 0;

  while (counter < numOfPlayers) {
    var value = Number(maxValArray[counter]); // read as a number from array of max values
    scoreArray[counter] = scoreArray[counter] + value; // add above to corresponding prev score
    counter = counter + 1;
  }
};
// ===================================================

// displays a string of player number in order
var displayPlayer = function () {
  var display = '';
  var counter = 1; // start at 1 for player 1

  while (counter <= numOfPlayers) { // loop runs based on no of players
    display = display + counter + ' ';
    counter = counter + 1;
  }

  return display;
};

// ===================================================
// ===================================================
// Key Functions under Different Game Modes
// ===================================================
// ===================================================

// this function is called under game mode == howManyPlayers
// user enter no of players
// for each player, add a zero value to the score array to start off the game
var runHowManyPlayers = function (input) {
  numOfPlayers = input; // update number of players
  startScoreArray(); // put an initial score of 0 for each player in the array for scores
  console.log('Game has started with these scores: ' + scoreArray);

  return 'Hello all ' + numOfPlayers + ' players! Please enter HOW MANY DICE you want to play with.';
};
// ===================================================

// this function is called under game mode == howManyDice
// user enter no of dice
var runHowManyDice = function (input) {
  numOfDice = input;

  return 'Each player will take turns to click submit. For each submit, we will roll ' + numOfDice + ' dice.'
    + '<br><br> Player 1 shall start first. Good luck!';
};
// ===================================================

// this function is called under game mode == rollDice
// roll dice and store in an array
var runRollDice = function () {
  diceRollArray = getDiceRollArray(); // roll dice and put into an array
  console.log('Player ' + whichPlayerMode + ' rolled: ' + diceRollArray);

  var showDiceRollArray = displayAnyArray(diceRollArray); // display dice rolls as a string
  var showIndex = displayIndex(); // display index positions as a string

  return 'Player ' + whichPlayerMode + ', <br><br>You rolled: <br>dice rolls : ' + showDiceRollArray + '<br>-position : ' + showIndex
    + '<br><br> Enter IN ORDER the positions of the dice rolls to create the HIGHEST POSSIBLE VALUE.'
    + '<br><br> OR JUST HIT SUBMIT and we will help you create the highest possible value!';
};
// ===================================================

// this function is called under game mode == makeMaxVal
// create a single highest number value by ordering the dice rolls
var runMakeMaxVal = function (input) {
  var positionsString = '';
  var message = '';

  // obtain position order from player or from computer
  if (input == '') {
    // if user does not enter anything, computer takes over
    positionsString = getCompPositions(); // computer creates an order of positions in string format
    message = 'Player ' + whichPlayerMode + ', <br>We selected this order: ';
  } else {
    // otherwise use the order of positions entered by user
    positionsString = input; // use the positions order submitted by player
    message = 'Player ' + whichPlayerMode + ', <br>You entered this order: ';
  }

  // create a single highest number value by arranging the dice rolls using above positions order
  var positionsArray = positionsString.split(''); // convert positions order from string to array
  console.log('Order of Positions: ' + positionsArray);
  var maxValue = getMaxVal(positionsArray); // create a value by ordering the dice rolls
  console.log('--------> Max value created: ' + maxValue);
  maxValArray.push(maxValue); // store above value in array for max values in the same round

  return message + displayAnyArray(positionsArray)
    + '<br><br>Since your original dice is : <br>' + displayAnyArray(diceRollArray)
    + '<br><br>Therefore this creates the number : <br>' + maxValue;
};
// ===================================================

// this function is called under game mode == declareWinner
// decide on winner of the round based on the highest among the created values
// also update the scores and use this to decide on winner of the game up until that point
var runDeclareWinner = function () {
  var winRoundIndex = getWinIndex(maxValArray); // get winning index for this ROUND's created values
  updateScores(); // update the scores
  var winGameIndex = getWinIndex(scoreArray); // get winning index for the GAME's scores

  // winIndex corresponds to index position of array so it has a min val of 0
  // therefore need to increment winIndex by 1 to get player number
  return 'For THIS ROUND:<br> Player ' + (winRoundIndex + 1) + ' wins with ' + maxValArray[winRoundIndex] + '! Congrats!'
    + '<br><br>Here are your latest scores....<br> Player:<br>' + displayPlayer()
    + '<br>Numbers created:<br>' + displayAnyArray(maxValArray)
    + '<br>Latest scores:<br>' + displayAnyArray(scoreArray)
    + '<br><br>So for the WHOLE GAME so far:<br> Player ' + (winGameIndex + 1) + ' wins with ' + scoreArray[winGameIndex] + '! Congrats!'
    + '<br><br> Click \'submit\' to start another round. Remember, player 1 goes first. Good luck!';
};

// ===================================================
// ===================================================
// Main Function
// ===================================================
// ===================================================

var main = function (input) {
  var output = '';

  if (gameMode == howManyPlayers) {
    // player enters total number of players for the game
    output = runHowManyPlayers(input);
    gameMode = howManyDice;
  } else if (gameMode == howManyDice) {
    // player chooses number of dice
    output = runHowManyDice(input);
    gameMode = rollDice;
  } else if (gameMode == rollDice) {
    // player rolls dice
    output = runRollDice();
    gameMode = makeMaxVal;
  } else if (gameMode == makeMaxVal) {
    // player submits a position order for the dice rolls
    // but if player clicks submit without entering choice, computer will create the position order
    // position order is used to arrange the dice rolls to create a single highest number value

    output = runMakeMaxVal(input);

    if (whichPlayerMode < numOfPlayers) {
      // if it is not the last player, ask the next player to roll dice
      // update mode for player
      whichPlayerMode = whichPlayerMode + 1;
      output = output + '<br><br>It is now Player ' + whichPlayerMode + '\'s turn.';
      gameMode = rollDice;
    } else if (whichPlayerMode == numOfPlayers) {
      // otherwise, end this round by asking player to click to show results of this round
      output = output + '<br><br>All players have taken their turns. Click \'submit\' to reveal the outcome!';
      gameMode = declareWinner;
    }
  } else if (gameMode == declareWinner) {
    // declare a winner for the round based on who has created the highest number value
    // also update score for each player by summing up all the player's created values so far
    // then declare a winner for the game up until this point, based on who has the highest score
    output = runDeclareWinner();
    maxValArray = []; // clear array for the next round
    whichPlayerMode = 1; // reset player mode for the next round
    gameMode = rollDice;
    console.log('**********End of Round**********');
  }

  return output;
};
