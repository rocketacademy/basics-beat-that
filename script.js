//**** Universal States for both Base & Variable Games ****//

// Modes for each player
var playerX = 1; // either player1 or  player2 or for a variable number of players
var gameInputMode = ''; // choose 'startBase','orderOfDice','evaluate' , // 'startRollingVariable','orderOfPositions','evaluateVariableGame'
var orderOfDice = ''; // either manual input or use autoChoose function
var gameVersion = ''; // either baseVersion or variableVersion
var gameRound = 1;


// **** Global States for Base Version Game Only ****//

// Track Dice 1 & 2 values:
var dice1;
var dice2;

// Track current base game's final numbers for each player. This is not the cumulative score:
var playerOneNumber;
var playerTwoNumber;

// Players cumulative scores over several games:
var playerOneScore = 0;
var playerTwoScore = 0;


// **** Global States for Variable Version Game Only ****//

//Track variable number of players' scores
var currentArrayDB = []; //currentArrayDB holds the final value of each player's into an array for the current round.
var cumulativeScoreArrayDB = [];// holds the cumulative score of each player in an array

// Arrays holds the transformed numbers input by each player in the variable game mode.:
var playerXInputArray = [];

//Track number of dices for variable game mode
var numOfDice = 0;

//Track number of players & player number in (variable num of players game mode:
var x = 0; // counter for x number of players
var totalNumOfPlayers = 0; //track total number of players
var playerXNumber; //e.g player 1's chosen number


//**** Functions that are used in both [Base] and [Variable] game modes ****//

var main = function (input) {
  if (input == 'b') {
    gameVersion = 'baseVersion';
  } else if (input == 'v') {
    gameVersion = 'variableVersion';
  }

  if (gameVersion == 'baseVersion') {
    if (gameInputMode == '') { //if gameInputMode is = blank, start game state to 'startBase'
      gameInputMode = 'startBase';
    }
    return playBaseVersion(input);

  } else if (gameVersion == 'variableVersion') {
    if (gameInputMode == '') { //if gameInputMode is = blank, start game state to 'startVariable'
      gameInputMode = 'startVariable';
    }
    return playVariableDice(input);
  }
};

// Function that generate random number from 1 - 6;
var diceRoll = function () {
  return randNum = Math.floor(Math.random() * 6) + 1;
};


// **** [Base] Version Only ****

// Function that plays the Base Version of the Dice Game
var playBaseVersion = function (input) {
  var myOutputValue;
  var whichDiceFirst; //user inputs either (dice) 1 or 2 as the FIRST numeral

  if (playerX == 2 && gameInputMode == 'evaluate') {
    return evaluateBaseGame(playerOneNumber, playerTwoNumber);

  } else if (gameInputMode == 'restart') {
    reinitializeBaseGame();
  };

  while (playerX <= 2) {
    if (gameInputMode == 'startBase') {
      dice1 = diceRoll();
      dice2 = diceRoll();
      myOutputValue = playerDiceRoll(dice1, dice2);

    } else if (gameInputMode == 'orderOfDice') {
      whichDiceFirst = input;

      if (whichDiceFirst == 1) {
        // concat dice 1 and dice 2 as strings before converting the new string into a number
        playerXNumber = Number(String(dice1) + String(dice2));

      } else {
        playerXNumber = Number(String(dice2) + String(dice1));
      }

      if (playerX == 1) {
        playerOneNumber = playerXNumber;
        myOutputValue = resultTemplate(playerX, whichDiceFirst, playerXNumber, 'startBase') + '<br><br> Press submit for player 2\'s turn.';
        playerX += 1;

      } else {
        playerTwoNumber = playerXNumber;
        myOutputValue = resultTemplate(playerX, whichDiceFirst, playerXNumber, 'evaluate') + '<br><br> Press submit to evaluate the results next.';
      }
    }
    return myOutputValue;
  }
};

// Function that generates the random dice roll for a player in base version and switches to gameInputMode to 'orderOfDice';
var playerDiceRoll = function (dice1, dice2) {
  var myOutputValue = `
      Welcome Player ${playerX}.
      <br> You rolled Dice 1: ${dice1} and Dice 2: ${dice2}.
    <br> Choose the order of the dice.`;
  gameInputMode = 'orderOfDice';

  return myOutputValue;
};

// Function that evaluates base game results and switches gameInputMode to restart
var evaluateBaseGame = function (playerOneNumber, playerTwoNumber) {
  if (playerOneNumber == playerTwoNumber) {
    myOutputValue = 'It is a draw!';

  } else if (playerOneNumber > playerTwoNumber) {
    myOutputValue = `Player 1 wins as ${playerOneNumber} is greater than Player 2's ${playerTwoNumber}. 
    <br><br> ${scoreTracker(playerOneNumber, playerTwoNumber)} <br><br>Please press submit to restart game.`;
    console.log(`playerOneScore is ${playerOneScore} and playerTwoScore is ${playerTwoScore}`);

  } else {
    myOutputValue = `Player 2 wins as ${playerTwoNumber} is greater than Player 1's ${playerOneNumber}. 
    <br><br> ${scoreTracker(playerOneNumber, playerTwoNumber)}<br><br>Please press submit to restart game.`;
    console.log(`playerOneScore is ${playerOneScore} and playerTwoScore is ${playerTwoScore}`);
  }
  gameInputMode = 'restart';
  return myOutputValue;
};


// Function that returns the standard output after player has chosen the order of their dice
var resultTemplate = function (playerX, whichDiceFirst, combNumber, gameMode) {

  var myOutputValue = `
  Player ${playerX}, you chose Dice ${whichDiceFirst} as the first digit.
  <br><br> Hence your number is ${combNumber}.`;
  gameInputMode = gameMode;

  return myOutputValue;
};

// Function that tracks the score of player1 and 2 only in base game
var scoreTracker = function (playerOneNumber, playerTwoNumber) {
  playerOneScore += playerOneNumber;
  playerTwoScore += playerTwoNumber;
  return `Player 1's total score is ${playerOneScore} and Player 2's total score is ${playerTwoScore}.`;
};

// Function that restarts the base game
var reinitializeBaseGame = function () {
  // Modes for each player
  playerX = 1; // either player1 or  player2 or for a variable number of players
  gameInputMode = 'startBase'; // choose 'startBase','orderOfDice','evaluate' , // 'startRollingVariable','orderOfPositions','evaluateVariableGame'
  orderOfDice = ''; // either manual input or use autoChoose function
  console.log(playerX, 'playerX', gameInputMode, 'gameinputmode ')
  //return `Game is restarting... Press Submit for Player 1 to begin the next round.`
};


// **** [Variable] Version Only ****

// Function that plays the Variable Dice Game
var playVariableDice = function (input) {
  var myOutputValue;

  if (gameInputMode == 'startVariable') {
    myOutputValue = 'Please input the number of players that are playing.';
    gameInputMode = 'numOfUsers';
    return myOutputValue;

  } else if (gameInputMode == 'numOfUsers') {
    totalNumOfPlayers = input;
    gameInputMode = 'getUserInput';
    myOutputValue = `You've chosen ${totalNumOfPlayers} Players to play. <br><br> Please input the number dices to be rolled per player.`;
    return myOutputValue;

  } else if (gameInputMode == 'getUserInput') {
    numOfDice = Number(input);
    gameInputMode = 'startRollingVariable';
    return `You entered ${numOfDice} dices for all players. <br><br> Press submit again for Player 1 to begin.`;

  } else if (gameInputMode == 'evaluateVariableGame') {
    myOutputValue = evaluateVariableGame(currentArrayDB);
    reinitializeVariableGame();
    return myOutputValue;

  }

  //Logic while each player rolls the dice(s) and chooses the order of their dices
  while (playerX <= totalNumOfPlayers) {
    if (gameInputMode == 'startRollingVariable') {
      myOutputValue = currentPlayerDiceRolls(numOfDice, playerX);

    } else if (gameInputMode == 'orderOfPositions') {
      myOutputValue = convertPositionToNum(input, playerX);
      if (playerX < totalNumOfPlayers) {
        playerX += 1;
      }
      console.log(playerX, 'playerX');
    }
    return myOutputValue;
  };
};

//Outputs each player's current dices rolled before positions are selected AND changes gameMode to 'orderOfPositions'
var currentPlayerDiceRolls = function (numOfDice, playerX) {

  var counter = 0;
  var counterArray = [];

  // input input-defined number of random dice rolls into each player's empty array
  while (counter < numOfDice) {
    playerXInputArray.push(diceRoll());
    counterArray.push(counter);
    counter += 1;
  }
  console.log(playerX, 'playerX in currentPlayerDiceRolls')
  myOutputValue = `
    Player ${playerX}, you rolled:
    <br>----dice: ${playerXInputArray}
    <br>position: ${counterArray}

    <br><br>Enter the order of the positions of the numbers you want.
    <br><br>Otherwise submit blank for best number.
    `;
  gameInputMode = 'orderOfPositions';
  console.log(gameInputMode, 'gameinputmode');
  return myOutputValue;

};

//Function that uses either 'manualConvertToSpecificNum' & 'autoChooseFunction' to output the final permutation of a player's numbers
var convertPositionToNum = function (input) {
  if (gameInputMode == 'orderOfPositions') {
    if (input == '') {
      myOutputValue = autoChooseFunction(playerX, playerXInputArray);
    } else {
      myOutputValue = manualConvertToSpecificNum(input, playerX, playerXInputArray);
    }
    playerXInputArray = []//reset playerXInputArray for each player

    if (playerX < totalNumOfPlayers) {
      myOutputValue += `<br><br> Press Submit for Player ${playerX + 1} to roll next.`
    } else {
      myOutputValue += `<br><br> Press Submit to evaluate the results next.`;
      gameInputMode = 'evaluateVariableGame';
    }
  }
  return myOutputValue;
};

// Function that takes the manual user input to permutate the final desired number based on the position entered
/**
 *
 * @param {array} playerInputArray
 * @param {number} playerNumToPlayNext
 */
var manualConvertToSpecificNum = function (input, playerX, playerInputArray) {
  var position = input.split('').map(Number);
  console.log(position);
  var playerNumNewArray = []; // Array of the final permutation of digits selected by a Player

  var counter = 0;
  while (counter < playerInputArray.length) {
    playerNumNewArray.push(playerInputArray[position[counter]]);
    console.log(playerNumNewArray);
    counter += 1;
  }
  //output player X's number
  playerXNumber = Number(playerNumNewArray.join(''));
  myOutputValue = `${playerXNumber} is Player ${playerX}'s number.`;
  currentArrayDB.push(playerXNumber); //record Xth player's score into an array;

  // switch game mode to variable and player X+1 to play next
  gameInputMode = 'startRollingVariable';
  return myOutputValue;
};

// Auto-Choose the highest permutation of number possible given dices rolled
var autoChooseFunction = function (playerX, playerInputArray) {

  var highestNumberArray = playerInputArray;
  console.log(highestNumberArray, 'highestNumberArray');

  var highestNumber = 0;
  playerInputArray = []; //reset each player's input array;
  console.log(playerInputArray, 'playerInputArray');

  var i = 0;
  while (i < highestNumberArray.length) {  //n-1 times comparison on the overall array
    var j = 0;
    while (j < highestNumberArray.length) {
      if (highestNumberArray[j + 1] > highestNumberArray[j]) {  //n-1 times comparison within an array
        var temp = highestNumberArray[j];
        highestNumberArray[j] = highestNumberArray[j + 1]; //perform the (bubble) swap
        highestNumberArray[j + 1] = temp;
      }
      j += 1;
    }
    i += 1;
  }

  highestNumber = Number(highestNumberArray.join('')); //hence returns the best value
  playerXNumber = highestNumber;
  myOutputValue = `${playerXNumber} is Player ${playerX}'s number.`;

  currentArrayDB.push(playerXNumber); //record Xth player's score into an array;
  highestNumberArray = []; //rest intermediate placeholder array;

  // switch game mode to variable and player X+1 to play next
  gameInputMode = 'startRollingVariable';

  return myOutputValue;

  // Commentary on autoChoose Function [1,2,3,4]
  //end of first iteration : [2,3,4,1] --> need to loop a total of 3 times to bring 4 forward in the worst case scenario = O(n^2);

};

//Evaluate Variable Game Results
var evaluateVariableGame = function (currentArrayDB) {
  maxValueinArray = Math.max(...currentArrayDB); //generates the largest number in the array 
  playerWinner = currentArrayDB.indexOf(maxValueinArray) + 1; //Position in the array is the same as PlayerX

  myOutputValue = `The winner is Player ${playerWinner}, with a value of ${maxValueinArray}. <br>`

  //Insert currentArrayDB values into cumulativeScoreArrayDB
  var i = 0;
  console.log(currentArrayDB, 'Current Player Scores')


  if (gameRound == 1) {
    while (i < currentArrayDB.length) {
      cumulativeScoreArrayDB[i] = 0; //create a number in each pos of the array to prevent NaN
      cumulativeScoreArrayDB[i] += currentArrayDB[i]; //Add into each array
      console.log(cumulativeScoreArrayDB, 'cumulativeScores');
      i += 1;
    }
  } else {
    while (i < currentArrayDB.length) {
      cumulativeScoreArrayDB[i] += currentArrayDB[i]; //sum up the cumulative rounds scores for each player
      console.log(cumulativeScoreArrayDB, 'cumulativeScores');
      i += 1;
    }
  };

  var j = 0;
  while (j < playerX) {
    console.log(playerX, 'playerX');
    myOutputValue += `<br> Player ${j + 1} score is  ${cumulativeScoreArrayDB[j]}.`;
    j += 1;
  }

  myOutputValue += `<br><br> This is the end of Game Round ${gameRound}. <br><br> Press submit to start the next round.`;

  return myOutputValue;
}

// Function that restarts the variable game
var reinitializeVariableGame = function () {
  // Modes for each player
  playerX = 1; // either player1 or  player2
  gameInputMode = 'startRollingVariable'; // choose 'startBase','orderOfDice','evaluate' , // 'startRollingVariable','orderOfPositions','evaluateVariableGame'
  gameRound += 1;
  currentArrayDB = [];
};
