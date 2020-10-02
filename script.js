/* eslint-disable no-unused-vars */
// Global States

// Modes for each player
var playerX = 1; // either player1 or  player2
var gameInputMode = ''; // choose 'startBase','orderOfDice','evaluate' , // 'startRollingVariable','orderOfPositions','evaluateVariableGame'
var orderOfDice = ''; // either Dice 1 or 2;
var gameVersion = ''; // either baseVersion or variableVersion
// var autoChoose = 'no';

// Track Dice 1 & 2 values:
var dice1;
var dice2;

// Track numbers outside of (normal) & (variable) main function:
var playerOneNumber;
var playerTwoNumber;

// These arrays holds the transformed numbers input by each player in the (variable) main function.:
var playerOneInputArray = [];
var playerTwoInputArray = [];
var numOfDice = 0;

// players scores:
var playerOneScore = 0;
var playerTwoScore = 0;

var main = function (input) {
  if (input == 'b') {
    gameVersion = 'baseVersion';
  } else if (input == 'v') {
    gameVersion = 'variableVersion';
  }

  if (gameVersion == 'baseVersion') {
    if (gameInputMode == '') {
      gameInputMode = 'startBase';
      return playBaseVersion(input);
    }

    return playBaseVersion(input);
  } if (gameVersion == 'variableVersion') {
    if (gameInputMode == '') {
      gameInputMode = 'startVariable';
      return playVariableDice(input);
    }
    return playVariableDice(input);
  }
};

// Function that plays the Base Version of the Dice Game
var playBaseVersion = function (input) {
  var myOutputValue;
  var whichDiceFirst;

  if (playerX == 1 && gameInputMode == 'startBase') {
    dice1 = diceRoll();
    dice2 = diceRoll();
    return playerDiceRoll(dice1, dice2);
  } if (playerX == 2 && gameInputMode == 'startBase') {
    dice1 = diceRoll();
    dice2 = diceRoll();
    return playerDiceRoll(dice1, dice2);
  }

  if (playerX == 1 && gameInputMode == 'orderOfDice') {
    // player 1 will input either (dice) 1 or 2 as the FIRST numeral.
    whichDiceFirst = input;
    if (whichDiceFirst == 1) {
      // concat dice 1 and dice 2 as strings before converting the new string into a number
      playerOneNumber = Number(String(dice1) + String(dice2));
      myOutputValue = resultTemplate(playerX, whichDiceFirst, playerOneNumber, 'startBase') + '<br> It is now player 2\'s turn.';
      playerX = 2; // switch to playerNum 2 after this loop ends

      return myOutputValue;
    }
    // concat dice 1 and dice 2 as strings before converting the new string into a number
    playerOneNumber = Number(String(dice2) + String(dice1));
    myOutputValue = resultTemplate(playerX, whichDiceFirst, playerOneNumber, 'startBase') + '<br> It is now player 2\'s turn.';
    // switch to playerNum 2 after this loop ends
    playerX = 2;
    return myOutputValue;
  } if (playerX == 2 && gameInputMode == 'orderOfDice') {
    // player 1 will input either (dice) 1 or 2 as the FIRST numeral.
    whichDiceFirst = input;
    if (whichDiceFirst == 1) {
      // concat dice 1 and dice 2 as strings before converting the new string into a number
      playerTwoNumber = Number(String(dice1) + String(dice2));

      console.log(gameInputMode, 'gameInputMode');
      return resultTemplate(playerX, whichDiceFirst, playerTwoNumber, 'evaluate') + '<br> Press submit again to evaluate the winner.';
    }
    // concat dice 1 and dice 2 as strings before converting the new string into a number
    playerTwoNumber = Number(String(dice2) + String(dice1));

    console.log(gameInputMode, 'gameInputMode');
    return resultTemplate(playerX, whichDiceFirst, playerTwoNumber, 'evaluate') + '<br> Press submit again to evaluate the winner.';

    // Evaluate who is the winner below:
  } if (playerX == 2 && gameInputMode == 'evaluate') {
    gameInputMode = 'restartGame';
    return evaluateGameResult(playerOneNumber, playerTwoNumber);
  } if (gameInputMode == 'restartGame') {
    return reinitializeGame();
  }
  return myOutputValue;
};

// Function that plays the Variable Dice Game
var playVariableDice = function (input) {
  var myOutputValue;

  if (gameInputMode == 'startVariable') {
    myOutputValue = 'Please input the number of dices to be rolled per player.';
    gameInputMode = 'getUserInput';
    playerX = 1; // set player 1 to go first
    return myOutputValue;

  } if (gameInputMode == 'getUserInput') {
    numOfDice = Number(input);
    console.log(numOfDice);
    console.log(playerX, 'playerX');
    gameInputMode = 'startRollingVariable';
    return `You entered ${numOfDice} dices for all players. <br><br> Press submit again for Player 1 to begin.`;

    //******//
    //can abstract the following into a sub-function of variable game for multiple looping
  } if (playerX == 1 && gameInputMode == 'startRollingVariable') {
    var counter = 0;
    var counterArray = [];

    // input input defined number of random dice rolls into playerOne's empty array
    while (counter < numOfDice) {
      playerOneInputArray.push(diceRoll());
      counterArray.push(counter);
      counter += 1;
    }

    myOutputValue = `
    Player ${playerX}, you rolled:
    <br>----dice: ${playerOneInputArray}
    <br>position: ${counterArray}

    <br><br>Enter the order of the positions of the numbers you want.
    <br><br>Otherwise submit blank for best number.
    `;
    gameInputMode = 'orderOfPositions';
    console.log(playerOneInputArray.length, 'playerOneInputArray length');
    return myOutputValue;

  } if (playerX == 1 && gameInputMode == 'orderOfPositions') {
    if (input == '') {
      return myOutputValue = autoChooseFunction(playerX, playerOneInputArray, 2, 'startRollingVariable') + '<br><br> Player 2 will roll next.'

    } else {
      return myOutputValue = convertUserInputToSpecificNum(input, playerX, playerOneInputArray, 2, 'startRollingVariable') + '<br><br> Player 2 will roll next.';
    }

    // Player 2 rolls numOfDice
  } if (playerX == 2 && gameInputMode == 'startRollingVariable') {
    var counter = 0;
    var counterArray = [];

    // Insert input-defined number of random dicerolls into playerTwo's empty array
    while (counter < numOfDice) {
      playerTwoInputArray.push(diceRoll());
      counterArray.push(counter);
      counter += 1;
    }

    myOutputValue = `
    Player ${playerX}, you rolled:
    <br>----dice: ${playerTwoInputArray}
    <br>position: ${counterArray}

    <br><br>Enter the order of the positions of the numbers you want.
    <br><br>Otherwise submit blank for best number.
    `;
    gameInputMode = 'orderOfPositions';
    return myOutputValue;

  } if (playerX == 2 && gameInputMode == 'orderOfPositions') {
    if (input == '') {
      return myOutputValue = autoChooseFunction(playerX, playerTwoInputArray, null, 'evaluateVariableGame') + '<br>Press submit again to evaluate the results.';
    } else {
      return myOutputValue = convertUserInputToSpecificNum(input, playerX, playerTwoInputArray, null, 'evaluateVariableGame') + '<br>Press submit again to evaluate the results.';
    }

  } else if (gameInputMode == 'evaluateVariableGame') {
    gameInputMode = 'restartGame';
    return evaluateGameResult(playerOneNumber, playerTwoNumber);
  } else if (gameInputMode == 'restartGame') {
    return reinitializeGame();
  }
  return myOutputValue;
};

// Function that generate random number from 1 - 6;
var diceRoll = function () {
  return randNum = Math.floor(Math.random() * 6) + 1;
};

// Function that generates the random dice roll for a player;
var playerDiceRoll = function (dice1, dice2) {
  var myOutputValue = `
      Welcome Player ${playerX}.
      <br> You rolled Dice 1: ${dice1} and Dice 2: ${dice2}.
    <br> Choose the order of the dice.`;
  gameInputMode = 'orderOfDice';

  return myOutputValue;
};

// [For Base Version of the game] Function that returns the standard output after player has chosen the order of their dice
/**
 *
 * @param {number} playerNum
 * @param {number} whichDiceFirst
 * @param {number} combNumber
 * @param {string} gameMode
 */
var resultTemplate = function (playerX, whichDiceFirst, combNumber, gameMode) {
  var myOutputValue = `
  Player ${playerX}, you chose Dice ${whichDiceFirst} as the first digit.
  <br> Hence your number is ${combNumber}.`;
  gameInputMode = gameMode;

  return myOutputValue;
};

// [For Variable Dice] Function that produces the final desired number based on the position entered and random dices rolled prev
/**
 *
 * @param {array} playerInputArray
 * @param {number} playerNumToPlayNext
 */
var convertUserInputToSpecificNum = function (input, currentPlayerX, playerInputArray, playerXToPlayNext, gameMode) {
  var position = input.split('').map(Number);
  console.log(position);
  var playerNumNewArray = []; // Array of the final permutation of digits selected by a Player

  i = 0;
  while (i < playerInputArray.length) {
    playerNumNewArray.push(playerInputArray[position[i]]);
    console.log(playerNumNewArray);
    i += 1;
  }

  if (currentPlayerX == 1) {
    playerOneNumber = Number(playerNumNewArray.join(''));
    myOutputValue = `${playerOneNumber} is Player ${playerX}'s number.`;
  } else if (currentPlayerX == 2) {
    playerTwoNumber = Number(playerNumNewArray.join(''));
    myOutputValue = `${playerTwoNumber} is Player ${playerX}'s number.`;
  }

  // switch game mode to variable and player 2 to play next
  gameInputMode = gameMode;
  playerX = playerXToPlayNext;

  return myOutputValue;
};

// Function that evaluates game results
var evaluateGameResult = function (playerOneNumber, playerTwoNumber) {
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
  return myOutputValue;
};

// Function that restarts the game
var reinitializeGame = function () {
  // Modes for each player
  playerX = 1; // either player1 or  player2
  gameInputMode = ''; // choose 'startBase','orderOfDice','evaluate' , // 'startRollingVariable','orderOfPositions','evaluateVariableGame'
  orderOfDice = ''; // either Dice 1 or 2;
  gameVersion = ''; // either baseVersion or variableVersion

  // Track Dice 1 & 2 values:
  dice1;
  dice2;

  // Track numbers outside of (normal) & (variable) main function:
  playerOneNumber;
  playerTwoNumber;

  // Track numbers outside of (variable) main function:
  playerOneInputArray = [];
  playerTwoInputArray = [];
  numOfDice = 0;

  return 'Hi, please type \'b\' for base version and \'v\' for variable game mode.';
};

// Score Function
var scoreTracker = function (playerOneNumber, playerTwoNumber) {
  playerOneScore += playerOneNumber;
  playerTwoScore += playerTwoNumber;
  return `Player 1's score is ${playerOneScore} and Player 2's score is ${playerTwoScore}.`;
};

// Auto-Choose function
/**
 * 
 * @param {number} currentPlayerX 
 * @param {array} playerInputArray 
 * @param {number} nextPlayerX 
 * @param {string} gameMode 
 */
var autoChooseFunction = function (currentPlayerX, playerInputArray, nextPlayerX, gameMode) {
  i = 0;
  var highestNumberArray = playerInputArray;
  var highestNumber = 0;
  console.log(playerInputArray, 'playerInputArray');

  while (i < highestNumberArray.length) {  //n-1 times comparison on the overall array
    j = 0;
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

  highestNumber = Number(highestNumberArray.join('')); //hence returns not a user Input but the result

  if (currentPlayerX == 1) {
    playerOneNumber = highestNumber;
    myOutputValue = `${playerOneNumber} is Player ${playerX}'s number.`;
  } else if (currentPlayerX == 2) {
    playerTwoNumber = highestNumber;
    myOutputValue = `${playerTwoNumber} is Player ${playerX}'s number.`;
  }

  gameInputMode = gameMode;
  playerX = nextPlayerX;

  console.log(playerOneNumber, 'P1Num');
  console.log(playerTwoNumber, 'P2Num');

  return myOutputValue;

};

//[1,2,3,4]
//end of first iteration : [2,3,4,1] --> need to loop a total of 3 times to bring 4 forward in the worst case scenario = O(n^2);


// // Variable Number of Players Function

// var numOfPlayers = function (input) {

//   var player = {
//     playerNumber: playerX,
//     playerInputArray: inputArray,
//     playerNumber: number
//   }
// ]

// }

// //Global State - 1 player has 1 array in the arrayDB;

// arrayDB = [];


// while (i < totalNumOfPlayers) {
// //if gameInputMode == 'startRollingVariable' then...

// var outputPlayerArray = function (numOfDice) { 
//     var i = 0;
//     playerX = i + 1;

//     var playerXInputArray = [];
//     var counter = 0;
//     var counterArray = [];

//     // input input defined number of random dice rolls into each player's empty array
//     while (counter < numOfDice) {
//       playerXInputArray.push(diceRoll());
//       counterArray.push(counter);
//       counter += 1;
//     }
//     //arrayDB.push(playerXInputArray); //input the Xth player's into arrayDB, zero-indexed

//     myOutputValue = `
//     Player ${playerX}, you rolled:
//     <br>----dice: ${arrayDB[i]}
//     <br>position: ${counterArray}

//     <br><br>Enter the order of the positions of the numbers you want.
//     <br><br>Otherwise submit blank for best number.
//     `;
//     gameInputMode = 'orderOfPositions';
//     //console.log(playerOneInputArray.length, 'playerOneInputArray length');
//     return myOutputValue;

//   } 


//   var convertPositionToNum = function(){
//   if (gameInputMode == 'orderOfPositions') {
//     if (input == '') {
//       return myOutputValue = autoChooseFunction(playerX, playerOneInputArray, 2, 'startRollingVariable') + '<br><br> Player 2 will roll next.'

//     } else {
//       return myOutputValue = convertUserInputToSpecificNum(input, playerX, playerOneInputArray, 2, 'startRollingVariable') + '<br><br> Player 2 will roll next.';
//     }
//   }

// }