/*Base
clg clg 
Requirements
There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

// -1: Introduction and game mode selection
// 0 : Before player 1 roll dice
// 1 : After player 1 roll dice
// 2 : Before player 2 roll dice
// 3 : After player 2 roll dice
var turnOrOrder = -1;

// 1: Normal mode
// 2: Reversed Mode
var gameMode = 0;

// 0 : No action needed
// 1 : Action needed
var whichDiceOrder = 0;

// to track overall results
var pOneStats = 0;
var pTwoStats = 0;
var leaderboard = "";
var myOutputValue;

var playerThrow = [0, 0];
var pOneResult = 0;
var pTwoResult = 0;

// Dice roll function to get random dice number
var diceRollResult = function () {
  var rollResult = Math.floor(Math.random() * 6) + 1;
  return rollResult;
};

// Evaluate results
var evaluateResults = function (input) {
  //For both player first roll
  if ((turnOrOrder == 0 || turnOrOrder == 2) && whichDiceOrder == 0) {
    whichDiceOrder = 1;
    turnOrOrder += 1;
    playerThrow[0] = diceRollResult();
    playerThrow[1] = diceRollResult();
    myOutputValue = `You rolled ${playerThrow[0]} and ${playerThrow[1]}.`;
    console.log(turnOrOrder);

    //If both die result is the same, skip order selection
    if (playerThrow[0] == playerThrow[1]) {
      whichDiceOrder = 0;
      turnOrOrder += 1;
      //result for P1
      if (turnOrOrder == 2) {
        pOneResult = "" + playerThrow[0] + playerThrow[1];
        //result for P2
        myOutputValue =
          myOutputValue +
          `<br><br>Your hand is ${playerThrow[0]}${playerThrow[1]}.`;
        return myOutputValue;
      } else if (turnOrOrder == 4) {
        pTwoResult = "" + playerThrow[0] + playerThrow[1];
        myOutputValue =
          myOutputValue +
          `<br><br>Your hand is ${playerThrow[0]}${playerThrow[1]}.`;
        return myOutputValue;
      }
    }

    //Else ask player which order they want to choose
    myOutputValue =
      myOutputValue +
      ` <br><br>Which order would you like to put them?<br> 1) die 1 first : ${playerThrow[0]}${playerThrow[1]} <br> 2) die 2 first : ${playerThrow[1]}${playerThrow[0]}`;
    return myOutputValue;
  } // Player to choose order of die:
  else if (turnOrOrder == 1 && whichDiceOrder == 1) {
    // Player 1 return message (die 1 first)
    if (input == 1) {
      turnOrOrder += 1;
      whichDiceOrder = 0;
      pOneResult = "" + playerThrow[0] + playerThrow[1];
      return `Ok, your hand is ${pOneResult}. <br><br>It is now Player 2's turn.`;
    } // player 1 return message (die 2 first)
    else if (input == 2) {
      turnOrOrder += 1;
      whichDiceOrder = 0;
      pOneResult = "" + playerThrow[1] + playerThrow[0];
      return `Ok, your hand is ${pOneResult}. <br><br>It is now Player 2's turn.`;
    } else {
      return `Please select a valid number.<br><br>${myOutputValue}`;
    }
  } // Player 2 choose order of die
  else if (turnOrOrder == 3 && whichDiceOrder == 1) {
    if (input == 1) {
      console.log("p2 1");
      turnOrOrder = 4;
      whichDiceOrder = 0;
      pTwoResult = "" + playerThrow[0] + playerThrow[1];
      myOutputValue = `Ok, your hand is ${pTwoResult}.`;
      return myOutputValue;
    } else if (input == 2) {
      console.log("p2 2");
      turnOrOrder = 4;
      whichDiceOrder = 0;
      pTwoResult = "" + playerThrow[1] + playerThrow[0];
      myOutputValue = `Ok, your hand is ${pTwoResult}`;
      return myOutputValue;
    } else {
      return `Please select a valid number.<br><br>${myOutputValue}`;
    }
  }

  // Evaluate results for winner
  else if (turnOrOrder == 4 && whichDiceOrder == 0) {
    turnOrOrder = 0;
    pOneStats = Math.floor(pOneStats) + Math.floor(pOneResult);
    pTwoStats = Math.floor(pTwoStats) + Math.floor(pTwoResult);
    gameStats();
    //P2 results bigger
    // add in game mode condition
    if (
      (pOneResult > pTwoResult && gameMode == 1) ||
      (pOneResult < pTwoResult && gameMode == 2)
    ) {
      myOutputValue =
        myOutputValue +
        ` but Player 1's hand is ${pOneResult}. You lost :(<br><br>The game will now restart!` +
        leaderboard;
      return myOutputValue;
      //P2 results smaller
    } else if (
      (pTwoResult > pOneResult && gameMode == 1) ||
      (pTwoResult < pOneResult && gameMode == 2)
    ) {
      myOutputValue =
        myOutputValue +
        ` and Player 1's hand is ${pOneResult}. You won! :)<br><br>The game will now restart!` +
        leaderboard;
      return myOutputValue;
      //P2 results smame
    } else if (pTwoResult == pOneResult) {
      myOutputValue =
        myOutputValue +
        ` and Player 1's hand is ${pOneResult}. It's a draw! :)<br><br>The game will now restart!` +
        leaderboard;
      return myOutputValue;
    }
  } else if (turnOrOrder == -1 && input == 0) {
    return `Welcome players, lets play a game of Beat That! <br><br>Rules:<br>Each player will take turn to roll 2 dice and choose the order they want to arrange the dice. <br><br> In normal mode, the player with the bigger hand wins while in reversed mode, the player with the smaller hand wins!<br><br> Please indicate whether you would like to play normal or reversed mode:<br>1) Normal Mode<br>2) Reversed Mode`;
  } else if (turnOrOrder == -1 && (input == 1 || input == 2)) {
    turnOrOrder += 1;
    if (input == 1) {
      gameMode = 1;
      return `All right, lets start with the Normal game mode! Player 1 please click to roll.`;
    } else {
      gameMode = 2;
      return `All right, lets start with the Reversed game mode! Player 1 please click to roll.`;
    }
  }
};

// updating the leader board
var gameStats = function () {
  if (
    (pOneStats > pTwoStats && gameMode == 1) ||
    (pOneStats < pTwoStats && gameMode == 2)
  ) {
    leaderboard = `<br><br><br> Player 1 is only leading for now, dont give up Player 2!<br><br> Player 1 Score: ${pOneStats}<br>Player 2 Score: ${pTwoStats} `;
  } else if (
    (pTwoStats > pOneStats && gameMode == 1) ||
    (pTwoStats < pOneStats && gameMode == 2)
  ) {
    leaderboard = `<br><br><br> Player 2 is leading! I'm sure you can catch up Player 1!<br><br> Player 2 Score: ${pTwoStats} <br>Player 1 Score: ${pOneStats} `;
  } else if (pOneStats == 0 && pTwoStats == 0) {
    leaderboard = "";
  } else if (pOneStats == pTwoStats) {
    leaderboard = `<br><br><br>It's a draw!<br><br> Player 1 Score: ${pOneStats}<br>Player 2 Score: ${pTwoStats} `;
  }
};

var main = function (input) {
  return evaluateResults(input);
};
