// Variable Number of Dice
// Create a new version of Beat That that rolls two or more dice per player.
// At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
// Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
// Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.

/* Variable Number of Players
Allow more than 2 players at a time to play Beat That. At the beginning of the game, ask how many players would like to play. For a variable number of players, feel free to output the leaderboard in any order, because implementing the leaderboard in decreasing order requires advanced logic.

Current beat that is:
- ask for normal or lowest game mode
- how many dice to roll
- then auto-generate the numbers 
- and compare who wins

- input is the numOfPlayers
- for each player, roll the number of dice selected
- need a way to refer back to each player's rolls

- use double for loop
- inner for loop is to roll the number of dices specified
- outer for loop will then do the inner loop for how many players specified

Flow of program will be:
0. chooseGameMode
1. selectNumOfPlayers
2. rollDice
3. generateNums
4. checkResult

0. change ending gameState to "selectNumOfPlayers"

1. selectNumOfPlayers
- create global var numOfPlayers so we can access it in rollDice game state
- user validation use the same one as rollDice cos we only want numbers min. value 2
- numOfPlayers = input;
- output how many players selected. Next, input the number of dice to roll

2. rollDice
- change the code in the else block
- create global var everyPlayersRolls array to store every player's rolls
- double for loop below can make into a helper function
storeEveryPlayerRolls (howManyPlayers, howManyDice)
for (var i = 0; i < numOfPlayers; i++) {
	var onePlayerRoll = [];
  for (var j = 0; j < numOfDice; j++) {
    onePlayerRoll[j] = rollDice();
  }
  allPlayersRolls[i] = onePlayerRoll;
}
return allPlayersRolls;
- everyPlayersRolls = storeEveryPlayerRolls(numOfPlayers, numOfDice);
- for output
for (var i = 0; i < numOfPlayers; i++) {
	output = output + "Player ${i+1} rolled ${everyPlayersRolls[i]}<br>";
}
output = output + "Press Submit to generate the numbers"
gameState = "generateNums"

3. generateNums
- global array everyPlayersFinalNum
- reassign each array inside everyPlayersRolls to the sorted one
- need to add if (gameMode = "normal") to differentiate the two codes
for (var i = 0; i < numOfPlayers; i++) {
	everyPlayersRolls[i] = everyPlayersRolls[i].sort(compare);
	everyPlayersFinalNum[i] = Number(everyPlayersRolls[i].join(""));
	output = output + "Player ${i+1} final number is ${everyPlayersFinalNum[i]}<br>";
}
- else the lowest game mode, just reverse() and reassign
for (var i = 0; i < numOfPlayers; i++) {
	everyPlayersRolls[i] = everyPlayersRolls[i].reverse();
	everyPlayersFinalNum[i] = Number(everyPlayersRolls[i].join(""));
	output = output + "Player ${i+1} final number is ${everyPlayersFinalNum[i]}<br>";
}
output = output + `Restart the game by choosing game mode "normal" or "lowest"`
gameState = "chooseGameMode"

4. checkResult
- need to use objects which we haven't learned
- can come back to this when i've got the knowledge and time

*/

// initialise the initial gameState
var gameState = "chooseGameMode";
var chosenGameMode = "";

// global arrays
var numOfPlayers;

var main = function (input) {
  // "refresh" output everytime we restart the app i.e. pressing submit
  var output = "";
  // 0. asks user for what gameMode they want: "normal" or "lowest"
  if (gameState == "chooseGameMode") {
    chosenGameMode = input;
    // user validation
    if (chosenGameMode != "normal" && chosenGameMode != "lowest")
      output = `Please enter only "normal" or "lowest".`;
    else {
      output = `You have chosen ${chosenGameMode} game mode. Next, enter the number of players and press Submit.`;
      gameState = "selectNumOfPlayers";
    }
  }
  // 1. selectNumOfPlayers
  else if (gameState == "selectNumOfPlayers") {
    numOfPlayers = Number(input);
    // user validation; isNaN takes care of strings because Number will conver them to NaN. The rest is for 0 and 1 because we those values do not help us generate useful numbers
    if (isNaN(numOfPlayers) || numOfPlayers == 0 || numOfPlayers == 1)
      output = `Please enter only a number that of minimum value 2.`;
    else {
      output = `You have selected ${numOfPlayers} number of players. Enter the number of dice to roll`;
    }
  }
  // 1. gameState "rollDice" which gets user to choose the amount of dice they want to roll
  else if (gameState == "rollDice") {
    var numOfDice = Number(input);
    // user validation; isNaN takes care of strings because Number will conver them to NaN. The rest is for 0 and 1 because we those values do not help us generate useful numbers
    if (isNaN(numOfDice) || numOfDice == 0 || numOfDice == 1)
      output = `Please enter only a number that of minimum value 2.`;
    else {
      for (var i = 0; i < numOfDice; i++) {
        playerOneDiceRolls[i] = rollDice();
        playerTwoDiceRolls[i] = rollDice();
      }
      output = `Player One rolled ${playerOneDiceRolls} <br> Player Two rolled ${playerTwoDiceRolls} <br> Press Submit to generate the numbers`;
      gameState = "generateNums";
    }
  }
  // 2. gameState to generate the final numbers based on the chosenGameMode
  else if (gameState == "generateNums") {
    // sort the two arrays in descending order first
    var sortedPlayerOne = playerOneDiceRolls.sort(compare);
    var sortedPlayerTwo = playerTwoDiceRolls.sort(compare);
    // if block to reverse the order to ascending if chosenGameMode == "lowest". reassign the sorted arrays
    if (chosenGameMode == "lowest") {
      var sortedPlayerOne = sortedPlayerOne.reverse();
      var sortedPlayerTwo = sortedPlayerTwo.reverse();
    }
    playerOneFinalNumber = Number(sortedPlayerOne.join(""));
    playerTwoFinalNumber = Number(sortedPlayerTwo.join(""));
    output = `Player One final number based on ${chosenGameMode} is ${playerOneFinalNumber} <br>
    Player Two final number based on ${chosenGameMode} is ${playerTwoFinalNumber} <br>
    Press Submit to view the winner based on running score`;
    // update the running scores of both Players
    playerOneRunningScore = updateRunningScore(
      playerOneRunningScore,
      playerOneFinalNumber
    );
    playerTwoRunningScore = updateRunningScore(
      playerTwoRunningScore,
      playerTwoFinalNumber
    );
    gameState = "checkResult";
  }
  // 3. gameState to checkResult
  else if (gameState == "checkResult") {
    if (chosenGameMode == "normal") {
      // function to check who is the leader in terms of running score
      var leader = checkLeader(playerOneRunningScore, playerTwoRunningScore);
      // function to display leaderboard
      var leaderboard = displayLeaderboard(
        playerOneRunningScore,
        playerTwoRunningScore
      );
      output = `Current Leader based on ${chosenGameMode} game state is ${leader}.<br><br>${leaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
      gameState = "chooseGameMode";
    } else {
      // function to check who is the "winner" in terms of lowest running score
      var lowestLeader = checkLowest(
        playerOneRunningScore,
        playerTwoRunningScore
      );
      // function to display leaderboard
      var lowestLeaderboard = displayLowestLeaderboard(
        playerOneRunningScore,
        playerTwoRunningScore
      );
      output = `Current Leader based on ${chosenGameMode} combined number game state is ${lowestLeader}.<br><br>${lowestLeaderboard}<br><br>Enter "normal" or "lowest" again to enter your game choice`;
      gameState = "chooseGameMode";
    }
  }
  return output;
};

// Dice Roll Helper Function - returns a random number between 1 to 6
var rollDice = function () {
  var randomDecimalLessThanSix = Math.random() * 6;
  var diceRollNumber = Math.floor(randomDecimalLessThanSix) + 1; // +1 because when we floor, we will get min 0 and max 5
  return diceRollNumber;
};

// Compare Function to help sort the array in descending order
var compare = function (a, b) {
  return b - a;
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
