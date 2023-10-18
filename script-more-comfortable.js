// Basics - Beat That Rules and Brief Flow
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// Two game states
// First game state is for Player 1 to roll dice.
// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 1 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 1's final number

// Game state will change to roll Player 2's dice
//// The dice will roll twice and be stored in an array
// Change to next game state to ask Player 2 for which dice number should be in the tens position
// input is player's choice
// program will then store Player 2's final number

// Game state will change to compare the two Player's numbers
// final output is to compare Player 1 and Player 2's final number to see whose one is bigger

// Score
// Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.
// example, first run Player 1 41, Player 2 62, then the game needs to restart and take in the new numbers again and add them up. Then show who is the winner

// need to define two global variables to store the running scores
// after the returnFinalNumber function returns the final number, need to add it to the running score
// checkResult compares running scores now instead of final number.
// It will also output who is the current leader instead of a single winner

// Leaderboard
// input is the running scores
// program needs to compare the running scores
// after comparing, need to manipulate the output value to have the higher one on top
// return this
// output will be the higher running score on top of the lower one

// Lowest Combined Number Mode
// Add a game mode such that the player with the lowest combined number is the winner.
/* gameStates:
- rollPlayerOneDice
- askPlayerOneChoice
- rollPlayerTwoDice
- askPlayerTwoChoice
- checkResult */
// need to have use an input to change the gameState from checkResult to a checkResultLowest
// output will be the reverse of checkResult i.e. lowest combined number wins instead of highest
// insert an intermediate gameState to ask user to input which gameState they want: checkResultNormal or checkResultLowest
// insert another gameState for checkResultLowest which outputs winner based on lowest combined score instead
// then we switch the gameState accordingly

// Auto-Generate Combined Number
/* Update the game to auto-generate the highest (or lowest) combined number from dice rolls. For example, for dice rolls [6, 3] in Lowest Combined Number mode, the game would auto-generate the combined number 36. */
// means i dont even need the askPlayerOneChoice and askPlayerTwoChoice game states already?

// HTML code to tell user to input "normal" or "lowest" to start the game
// need to have a starting gameState = "start"
// 1. starting gameState will ask userChoice = input for "normal" or "lowest" game mode
// user validation
// helper function to return the next gameState = "normalRollDice" or "lowestRollDice"
// output will be `You chose ${userChoice} game mode. Press Submit to roll the dice.`

// 2. gameState both "normalRollDice" and "lowestRollDice" will then roll two dices using for loop
// the dice value will store in playerXDiceRolls
// based on the game mode, use Math.max or Math.min(...array) first, then the other second to get the 1st and 2nd numbers spread operator to spread the array in the Math method.
// Store 1st number in playerXFirstNum, 2nd number in playerXSecondNum
// Concatenate and convert to the final number using helper function. Store in playerXFinalNumber
// update the running score using helper function
// output will be `Player 1 rolled X for Dice 1 and Y for Dice 2. <br> Player 1 auto-gen number is XY.<br> Player 1 running score is XXX. <br> <br> Player 2 rolled A for Dice 1 and B for Dice 2 <br> Player 2 auto-gen number is AB. <br> Player 2 running score is YYY <br> <br> Press Submit to find winner based on "normal"/"lowest" game state`
// change gameState to "checkResultNormal" or "checkResultLowest"

// 3. can take the already used checkResult code
// output the leader and the leaderboard

// initialise the initial gameState
// var gameState = "rollPlayerOneDice";
var gameState = "start";
var userChoice; // global userChoice so we can access in all the code blocks

// global playerOne variables so we can access them throughout the different gameStates
var playerOneDiceRolls = [];
var playerOneFinalNumber;
var playerOneRunningScore = 0;

// global playerTwo variables to access throughout the different gameStates
var playerTwoDiceRolls = [];
var playerTwoFinalNumber;
var playerTwoRunningScore = 0;

var main = function (input) {
  // "refresh" myOutputValue everytime we restart the app i.e. pressing submit
  var myOutputValue = "";
  // gameState "start" which gets user to choose their "normal" or "lowest" game
  if (gameState == "start") {
    // "resets" userChoice to be either "normal" or "input" when we switch gameState to "start"
    userChoice = input;
    // user validation
    if (userChoice != "normal" && userChoice != "lowest")
      myOutputValue = `Please enter only "normal" or "lowest"`;
    else {
      // use fixed gameState getNumbers so we can avoid repeating codes from playerOneFinalNumber to playerTwoRunningScore
      gameState = "getNumbers";
      myOutputValue = `You chose ${userChoice} game mode. Press Submit to roll the dice for both players`;
      for (var i = 0; i < 2; i += 1) {
        playerOneDiceRolls[i] = rollDice();
        playerTwoDiceRolls[i] = rollDice();
      }
    }
  }
  // gameState "normal" for normal mode
  else if (gameState == "getNumbers") {
    // for userChoice == "normal", the first number will be the larger one in the respective array
    if (userChoice == "normal") {
      // find the max number and store in playerXFirstNum
      playerOneFirstNum = Math.max(...playerOneDiceRolls);
      playerTwoFirstNum = Math.max(...playerTwoDiceRolls);
      // find the min number and store in playerXSecondNum
      playerOneSecondNum = Math.min(...playerOneDiceRolls);
      playerTwoSecondNum = Math.min(...playerTwoDiceRolls);
    } // for userChoice == "lowest", do the opposite
    else {
      // find the min number and store in playerXFirstNum
      playerOneFirstNum = Math.min(...playerOneDiceRolls);
      playerTwoFirstNum = Math.min(...playerTwoDiceRolls);
      // find the max number and store in playerXSecondNum
      playerOneSecondNum = Math.max(...playerOneDiceRolls);
      playerTwoSecondNum = Math.max(...playerTwoDiceRolls);
    }
    // use returnFinalNumber(firstNum, secondNum) to concatenate and return as a number
    playerOneFinalNumber = returnFinalNumber(
      playerOneFirstNum,
      playerOneSecondNum
    );
    playerTwoFinalNumber = returnFinalNumber(
      playerTwoFirstNum,
      playerTwoSecondNum
    );
    // update running scores using updateRunningScore
    playerOneRunningScore = updateRunningScore(
      playerOneRunningScore,
      playerOneFinalNumber
    );
    playerTwoRunningScore = updateRunningScore(
      playerTwoRunningScore,
      playerTwoFinalNumber
    );
    myOutputValue = `Player 1 rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two. <br> Player 1 auto-gen number is ${playerOneFinalNumber}.<br> Player 1 running score is ${playerOneRunningScore}. <br> <br> Player 2 rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two <br> Player 2 auto-gen number is ${playerTwoFinalNumber}. <br> Player 2 running score is ${playerTwoRunningScore} <br> <br> Press Submit to find winner based on ${userChoice} game state`;
    // helper function to decide the. If "normal", returns checkResultNormal, else checkResultLowest
    gameState = chooseNextGameState(userChoice);
  } else if (gameState == "checkResultNormal") {
    // function to check who is the leader in terms of running score
    leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    leaderboard = displayLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on normal game state is ${leader}.<br><br>${leaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start";
  } else if (gameState == "checkResultLowest") {
    // function to check who is the "winner" in terms of lowest running score
    lowestLeader = checkLowest(playerOneRunningScore, playerTwoRunningScore);
    // function to display leaderboard
    lowestLeaderboard = displayLowestLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );
    myOutputValue = `Current Leader based on lowest combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
    gameState = "start";
  }
  return myOutputValue;
};

// old main up till Lowest Combined Number Mode
// var main = function (input) {
//   // "refresh" myOutputValue everytime we restart the app i.e. pressing submit
//   var myOutputValue = "";
//   if (gameState == "rollPlayerOneDice") {
//     // for loop to roll two dices and store the dice rolls in playerOneDiceRolls array
//     for (var i = 0; i < 2; i += 1) playerOneDiceRolls[i] = rollDice();
//     // reassign myOutputValue to show Player 1 their rolls and ask them to choose which dice to be first
//     myOutputValue = `Welcome Player 1.<br>You rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two.<br>Choose the order of your dice by inputting 1 for Dice One first or 2 for Dice Two first`;
//     gameState = "askPlayerOneChoice";
//   } else if (gameState == "askPlayerOneChoice") {
//     // assign input to the diceNumberChosen
//     var diceNumberChosen = input;
//     // input validation - if user inputs a valid diceNumberChosen
//     if (diceNumberChosen == 1 || diceNumberChosen == 2) {
//       // function to return the number in the tens position
//       var playerOneNumberInTens = returnNumberInTensPosition(
//         diceNumberChosen,
//         playerOneDiceRolls
//       );
//       // function to return the number in the ones position
//       var playerOneNumberInOnes = returnNumberInOnesPosition(
//         diceNumberChosen,
//         playerOneDiceRolls
//       );
//       // function to concatenate the numbers and then return it as a Number type
//       playerOneFinalNumber = returnFinalNumber(
//         playerOneNumberInTens,
//         playerOneNumberInOnes
//       );
//       // function to update playerOneRunningScore
//       playerOneRunningScore = updateRunningScore(
//         playerOneRunningScore,
//         playerOneFinalNumber
//       );
//       // reassign myOutputValue to tell playerOne the final number and their running score. And tell Player 2 to resubmit to roll the dice
//       myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number this round is ${playerOneFinalNumber}.<br>Your running score is ${playerOneRunningScore}.<br> Press submit to roll Player 2's dice`;
//       gameState = "rollPlayerTwoDice";
//     } else {
//       // user validation if the user inputs wrong diceNumberChosen
//       myOutputValue = `Please enter a valid input of either 1 or 2 only. <br>You rolled ${playerOneDiceRolls[0]} for Dice One and ${playerOneDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
//     }
//   } else if (gameState == "rollPlayerTwoDice") {
//     for (var i = 0; i < 2; i += 1) playerTwoDiceRolls[i] = rollDice();
//     myOutputValue = `Player 2,<br>You rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
//     gameState = "askPlayerTwoChoice";
//   } else if (gameState == "askPlayerTwoChoice") {
//     var diceNumberChosen = input;
//     // input validation
//     if (diceNumberChosen == 1 || diceNumberChosen == 2) {
//       var playerTwoNumberInTens = returnNumberInTensPosition(
//         diceNumberChosen,
//         playerTwoDiceRolls
//       );
//       var playerTwoNumberInOnes = returnNumberInOnesPosition(
//         diceNumberChosen,
//         playerTwoDiceRolls
//       );
//       playerTwoFinalNumber = returnFinalNumber(
//         playerTwoNumberInTens,
//         playerTwoNumberInOnes
//       );
//       playerTwoRunningScore = updateRunningScore(
//         playerTwoRunningScore,
//         playerTwoFinalNumber
//       );
//       myOutputValue = `You chose Dice ${diceNumberChosen} first. <br> Your final number this round is ${playerTwoFinalNumber}.<br>Your running score is ${playerTwoRunningScore}.<br> Now, choose the game state. Enter "normal" for the normal game state or "lowest" for lowest combined number game state.`;
//       // change this to the intermediate step to ask user for which checkResult they want
//       gameState = "askUserChoiceForGameState";
//     } else {
//       myOutputValue = `Please enter a valid input of either 1 or 2 only.<br> You rolled ${playerTwoDiceRolls[0]} for Dice One and ${playerTwoDiceRolls[1]} for Dice Two.<br>Choose the order of your dice`;
//     }
//     // intermediate gameState to ask user to switch
//   } else if (gameState == "askUserChoiceForGameState") {
//     var userChoice = input;
//     // user validation
//     if (userChoice == "normal" || userChoice == "lowest") {
//       gameState = chooseNextGameState(userChoice);
//       myOutputValue = `You have chosen ${userChoice} as the next game state.<br> Press "Submit" once more to see the results based on your choice`;
//     } else
//       myOutputValue = `Please enter a valid choice of "normal" or "lowest" only`;
//   }
//   // normal gameState
//   else if (gameState == "checkResultNormal") {
//     // function to check who is the leader in terms of running score
//     leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
//     // function to display leaderboard
//     leaderboard = displayLeaderboard(
//       playerOneRunningScore,
//       playerTwoRunningScore
//     );
//     myOutputValue = `Player 1's number this round is ${playerOneFinalNumber}.<br>
//     Player 2's final number this round is ${playerTwoFinalNumber}<br>
//     Current Leader based on normal game state is ${leader}.<br><br>${leaderboard}<br><br>Press Submit again to reroll from Player 1`;
//     gameState = "rollPlayerOneDice";
//   }
//   // lowest gameState
//   else if (gameState == "checkResultLowest") {
//     // function to check who is the "winner" in terms of lowest running score
//     lowestLeader = checkLowest(playerOneRunningScore, playerTwoRunningScore);
//     // function to display leaderboard
//     lowestLeaderboard = displayLowestLeaderboard(
//       playerOneRunningScore,
//       playerTwoRunningScore
//     );
//     myOutputValue = `Player 1's number this round is ${playerOneFinalNumber}.<br>
//     Player 2's final number this round is ${playerTwoFinalNumber}<br>
//     Current Leader based on lowest combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Press Submit again to reroll from Player 1`;
//     gameState = "rollPlayerOneDice";
//   }
//   return myOutputValue;
// };

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
};

// Return number in the tens position
var returnNumberInTensPosition = function (
  selectedDiceNumber,
  playerDiceRollArray
) {
  var diceNumberInTensPosition = selectedDiceNumber;
  var indexNumberInTensPosition = diceNumberInTensPosition - 1;
  var numberInTensPosition = playerDiceRollArray[indexNumberInTensPosition];
  return numberInTensPosition;
};

var returnNumberInOnesPosition = function (
  selectedDiceNumber,
  playerDiceRollArray
) {
  var indexNumberInTensPosition = selectedDiceNumber - 1;
  var indexNumberInOnesPosition;
  if (indexNumberInTensPosition == 0) {
    indexNumberInOnesPosition = 1;
  } else {
    indexNumberInOnesPosition = 0;
  }
  numberInOnesPosition = playerDiceRollArray[indexNumberInOnesPosition];
  return numberInOnesPosition;
};

// Return the two numbers concatenated
var returnFinalNumber = function (tensPositionNumber, onesPositionNumber) {
  concatenatedString = "" + tensPositionNumber + onesPositionNumber;
  convertedNumber = Number(concatenatedString);
  return convertedNumber;
};

// checkWinner
var checkResult = function (playerOneNumber, playerTwoNumber) {
  result = "";
  if (playerOneNumber > playerTwoNumber) result = "Player 1 wins";
  else if (playerTwoNumber > playerOneNumber) result = "Player 2 wins";
  else result = "draw";
  return result;
};

// updateRunningScore
var updateRunningScore = function (runningScore, finalNumber) {
  runningScore = runningScore + finalNumber;
  return runningScore;
};

// checkLeader
var checkLeader = function (runningScoreOne, runningScoreTwo) {
  var result = "";
  if (runningScoreOne > runningScoreTwo) result = "Player 1";
  else if (runningScoreTwo > runningScoreOne) result = "Player 2";
  else result = "none, scores are tied!";
  return result;
};

// checkLowest
var checkLowest = function (runningScoreOne, runningScoreTwo) {
  var lowest = "";
  if (runningScoreOne < runningScoreTwo) lowest = "Player 1";
  else if (runningScoreTwo < runningScoreOne) lowest = "Player 2";
  else lowest = "none, scores are tied!";
  return lowest;
};

// displayLeaderboard
var displayLeaderboard = function (runningScoreOne, runningScoreTwo) {
  var leaderboard = "";
  if (runningScoreOne > runningScoreTwo) {
    leaderboard = `1st Place. Player 1 --- ${runningScoreOne}<br>
    2nd Place. Player 2 --- ${runningScoreTwo}`;
  } else if (runningScoreTwo > runningScoreOne) {
    leaderboard = `1st Place. Player 2 --- ${runningScoreTwo}<br>
    2nd Place. Player 1 --- ${runningScoreOne}`;
  } else {
    leaderboard = `Tied. Player 1 --- ${runningScoreOne}<br>
    Tied. Player 2 --- ${runningScoreTwo}`;
  }
  return leaderboard;
};

// displayLowestLeaderboard
var displayLowestLeaderboard = function (runningScoreOne, runningScoreTwo) {
  var leaderboard = "";
  if (runningScoreOne < runningScoreTwo) {
    leaderboard = `1st Place. Player 1 --- ${runningScoreOne}<br>
    2nd Place. Player 2 --- ${runningScoreTwo}`;
  } else if (runningScoreTwo < runningScoreOne) {
    leaderboard = `1st Place. Player 2 --- ${runningScoreTwo}<br>
    2nd Place. Player 1 --- ${runningScoreOne}`;
  } else {
    leaderboard = `Tied. Player 1 --- ${runningScoreOne}<br>
    Tied. Player 2 --- ${runningScoreTwo}`;
  }
  return leaderboard;
};

// function to return the chosen gameState
var chooseNextGameState = function (choice) {
  if (choice == "normal") var nextGameState = "checkResultNormal";
  else nextGameState = "checkResultLowest";
  return nextGameState;
};
