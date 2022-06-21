// BEAT THAT - VARIABLE PLAYERS VERSION
// Done by: Yiu Han Kit, Basics 15-2
// Allow more than 2 players at a time to play Beat That. At the beginning of the game, ask how many players would like to play. For a variable number of players, feel free to output the leaderboard in any order, because implementing the leaderboard in decreasing order requires advanced logic.

// gameState 0 = Blockscreen/ Welcome screen, take no of players
// gameState 1 = username input
// gameState 2 = [MAIN GAME] diceroll state
// gameState 3 = [MAIN GAME] user choose order of dice
// gameState 4 = compilation of results

var gameState = 0; // Refer to gameState list above
var noOfPlayers = 0; // User input to determine number of players
var playerCount = 0; // Related to gameState 2 and 3, while loop function
var playerNames = []; // To store player names
var playerDiceResult = []; // To store player results

// diceRoll function for game
var diceRoll = function () {
  var diceNumber = Math.ceil(Math.random() * 6);
  return diceNumber;
};

var main = function (input) {
  var gameOutcome = fullGame(input);
  var myOutputValue = gameOutcome;
  return myOutputValue;
};

// Main Game
var fullGame = function (userInput) {
  var gameOutput = ``;
  var randomRoll1 = diceRoll();
  var randomRoll2 = diceRoll();
  var playerRoll1 = "";
  var playerRoll2 = "";
  var diceResult = 0;

  // gameState 0 : Blockscreen / welcome screen. Force input to be a number
  if (gameState == 0) {
    if (isNaN(userInput) || userInput == "") {
      gameOutput = `Hello, welcome to Beat That! To start off, how many players are playing? <br><br>Please input a number. `;
    } else {
      // gameState 0 : Take no. of players and proceed to next gameState = 1
      noOfPlayers = userInput;
      gameState = 1;
      return `OK, ${noOfPlayers} players are playing Beat That!<br><br>What is Player 1's name?`;
    }
  }

  // gameState 1: username input
  if (gameState == 1) {
    while (playerCount < noOfPlayers) {
      playerNames.push(userInput);

      playerCount += 1;

      // This function appends the output to change as the loop passes into the last count. The output should not ask what is (noOfPlayers + 1)'s name as it is not required. It should go into the next state of the game
      var appendReturn = function (playerCount, noOfPlayers) {
        if (playerCount == noOfPlayers) {
          return `Alright. Let's play! 
          <br><br>============= G  A  M  E      S  T  A  R  T ================<br><br>
          ${playerNames[0]}, you're up. Click 'Submit' to roll your dice.`;
        } else {
          return `What is player ${playerCount + 1}'s name?`;
        }
      };

      return `${noOfPlayers} players are playing Beat That! <br><br>
      Hi ${
        playerNames[playerCount - 1]
      }, you are Player ${playerCount}! ${appendReturn(
        playerCount,
        noOfPlayers
      )}`;
    }

    gameState = 2;
    playerCount = 0; // Reset playerCount to 0 for the next loop function in gameState 2
  }

  // Main diceRoll game - Toggle between gameState 2 and 3 for each player
  // gameState 2:  for each player, rollDice and toggle to gameState 3
  if (gameState == 2) {
    while (playerCount < noOfPlayers) {
      playerroll1 = randomRoll1;
      playerroll2 = randomRoll2;
      gameState = 3;
      return `${playerNames[playerCount]} your first roll is a ${randomRoll1} and your second roll is a ${randomRoll2}! <br><br>Please input 1 if you want to maintain the current number order, and 2 if you want to switch the number order.`;
    }
    gameState = 4; // After looping over every player, change gameState to 4 to tabulate results
    playerCount = 0; // Reset playerCount for gameState = 4 loop
  }

  // gameState 3: store rollDice into array, toggle back to gameState 2
  if (gameState == 3) {
    if (userInput == 1) {
      diceResult = "" + playerroll1 + playerroll2;
      playerDiceResult.push(diceResult);
    } else if (userInput == 2) {
      diceResult = "" + playerroll2 + playerroll1;
      playerDiceResult.push(diceResult);
    } else {
      return `You've not input a valid choice! Please input 1 if you want to maintain the current number order, and 2 if you want to switch the number order.`;
    }

    playerCount += 1;
    gameState = 2;

    var appendReturn2 = function (playerCount, noOfPlayers, playerNames) {
      if (playerCount == noOfPlayers) {
        return `<br><br>Game over! Let's calculate the results to see who's the winner!`;
      } else {
        return `${playerNames[playerCount]} you're up next! Click 'Submit' to roll your dice.`;
      }
    };

    console.log(`gamestate:`, gameState);
    return `${
      playerNames[playerCount - 1]
    }, your result is ${diceResult}. ${appendReturn2(
      playerCount,
      noOfPlayers,
      playerNames
    )}`;
  }

  // gameState 4 : compilation of results and reset
  if (gameState == 4) {
    currentMaxScore = 0;
    winningPlayer = "";
    while (playerCount < noOfPlayers) {
      if (playerDiceResult[playerCount] > currentMaxScore) {
        // 1 clear winner
        currentMaxScore = playerDiceResult[playerCount];
        winningPlayer = playerNames[playerCount];
      } else if (playerDiceResult[playerCount] == currentMaxScore) {
        // 2 or more winnners/draw case
        winningPlayer += `, ${playerNames[playerCount]}`;
      }
      gameOutput += `${playerNames[playerCount]} scored ${playerDiceResult[playerCount]} <br>`;
      playerCount += 1;
    }
    gameOutput += `<br> 🏆 WINNER 🏆 → → → ✨<b>${winningPlayer}</b>✨ <br><br> Click 'Submit' to play again!`;

    // Resets game to original state for another round
    gameState = 0;
    noOfPlayers = 0;
    playerCount = 0;
    playerNames = [];
    playerDiceResult = [];
  }
  return gameOutput;
};
