// Variable number of dice rolls and players
// Game modes:
// 'highest: Highest combined number
// 'lowest': Lowest combined  number
// Players can change game mode anytime by Submit 'highest' / 'lowest'
// When game mode is changed, the scores will reset and game state will be 0
// Game states
// 0: waiting for user to input number of players
// 1: waiting for user to input number of dice rolls
// 2: waiting for current player to click Submit and roll n dice
// Depending on the game mode in state 2 auto-generate and show the lowest / highest combined number
// Game version:
// 'normal': player with highest / lowest running score is winner, game can continue infinitely
// 'knockout': player outlasting other players win
// Leaderboard:
// In 'normal' leaderboard tracks running score of every player
// In 'knockout' leaderboard tracks the number of games each player wins (games end when only 1 player remains)
// Knockout terminology:
// 'match': duel between 2 players
// 'round': a set of matches
// 'game': a set of rounds

// Outstanding issues:
// 'lowest' mode for knockout

var gameVer = "normal";
var gameMode = "highest";
var gameState = 0;
var leaderboard = []; // tracks running total of numbers created
var diceRolls = [];
var numOfRolls;
var numOfPlayers;
var turnNum; // tracks the number of turns (1 - numOfPlayers)
var matchups = []; // tracks which players are against other for knockout version
var advancingPlayers = []; // tracks the players who advance to next round in 'knockout' version
var prevNum;
var prevPlayerNum;
var newMatch = true; // true if player is 2nd player of duel, false if 1st player
var newGame = true; // true if new game, before any round has been played

// Function for random match up
// Returns randomly sorted player numbers, the first pair play against each other
// the next pair and so on
var randomMatchup = function (arrPlayers) {
  var arrMatchups = arrPlayers.slice();
  arrMatchups.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  return arrMatchups;
};

// Function for dice roll
var randomDice = function () {
  return Math.ceil(Math.random() * 6);
};

// Function for auto-generate dice number
var autoGenerate = function (numOfRolls, gameMode) {
  diceRolls = [];
  for (var counter = 0; counter < numOfRolls; counter += 1) {
    diceRolls.push(randomDice());
  }

  // sort the dice numbers in ascending order (default)
  var diceRollsSorted = diceRolls.slice().sort();

  // if game mode is 'highest' then sort in descending order
  if (gameMode == "highest") {
    diceRollsSorted = diceRollsSorted.reverse();
  }

  // auto-generate the highest / lowest number
  // 'normal' version: compute the running score for the current player
  // 'knockout' version: += 1 if player wins the round
  var autoNumber = Number(diceRollsSorted.join(""));
  return autoNumber;
};

// function to return sorted leaderboard given unsorted leaderboard and gameMode
var leaderboardRanked = function (leaderboard, gameMode) {
  var leaderboardSorted = leaderboard.slice();

  if (gameMode == "highest") {
    leaderboardSorted.sort(function (a, b) {
      return b[1] - a[1];
    });
  } else if (gameMode == "lowest") {
    leaderboardSorted.sort(function (a, b) {
      return a[1] - b[1];
    });
  }
  return leaderboardSorted;
};

var main = function (input) {
  if (input == "highest" || input == "lowest") {
    gameMode = input;
    return `Game mode has been set to ${gameMode} combined number. Scores have been reset.`;
  }

  if (input == "normal" || input == "knockout") {
    gameVer = input;
    gameState = 0;
    return `Game has switched to ${gameVer} version. Enter number of players to continue.`;
  }

  switch (gameState) {
    case 0:
      // input validation
      if (!Number(input)) {
        return "Enter a number to continue";
      }

      numOfPlayers = input;
      gameState = 1;
      leaderboard = [];
      for (var user = 1; user <= numOfPlayers; user += 1) {
        leaderboard.push([user, 0]);
      }
      var msg = `There are ${numOfPlayers} players for this game. `;
      return msg;

    case 1:
      // input validation
      if (!Number(input)) {
        return "Enter a number to continue";
      }
      numOfRolls = input;
      gameState = 2;
      turnNum = 1;
      var msg = "";

      // for 'knockout' game release the match-ups between players
      if (gameVer == "knockout") {
        // all players advance to the first match of a round
        if (newGame) {
          advancingPlayers = [];
          for (var i = 1; i <= numOfPlayers; i += 1) {
            advancingPlayers.push(i);
          }
          newGame = false;
        }

        // randomly sort advancingPlayers to randomly match players against each other
        matchups = randomMatchup(advancingPlayers);
        advancingPlayers = [];
        msg += "<b>The matchups are: <br><br></b>";

        // display the matchups to players
        numOfPlayers = matchups.length;
        for (var i = 0; i < numOfPlayers; i += 1) {
          msg += `${matchups[i]} `;
          if (i % 2 == 1) {
            msg += "<br>";
          }
        }

        // when number of players advancing is odd, 1 player gets to advance w/o duel
        if (numOfPlayers % 2 != 0) {
          advancingPlayers.push(matchups[numOfPlayers - 1]);
          numOfPlayers -= 1;
          msg += `<br><br>Player ${advancingPlayers[0]} advances to the next round without competition.<br><br>`;
        }
      }

      return (
        msg +
        `Each player rolls dice ${numOfRolls} times. Now each player clicks Submit to generate a number.`
      );

    case 2:
      var autoNumber = autoGenerate(numOfRolls, gameMode);
      var matchResult = "";
      var leaderboardMsg = "";

      switch (gameVer) {
        case "knockout":
          var playerNum = matchups[turnNum - 1];

          // knockout
          if (newMatch) {
            prevPlayerNum = playerNum;
            prevNum = autoNumber;
            newMatch = false;
          } else {
            var matchWinner;
            if (autoNumber > prevNum) {
              advancingPlayers.push(playerNum);
              matchWinner = playerNum;
            } else {
              advancingPlayers.push(prevPlayerNum);
              matchWinner = prevPlayerNum;
            }
            newMatch = true;
            matchResult = `<br><br>Player ${matchWinner} won this match and will advance to the next round.`;
          }
          break;

        case "normal":
          leaderboard[turnNum - 1][1] += autoNumber;
          var leaderboardSorted = leaderboardRanked(leaderboard, gameMode);
          for (var counter = 0; counter < numOfPlayers; counter += 1) {
            leaderboardMsg += `${leaderboardSorted[counter][0]} : ${leaderboardSorted[counter][1]} <br>`;
          }
      }

      // if player to click is last player, then:
      // switch game state to 1
      if (turnNum == numOfPlayers) {
        gameState = 1;

        // for knockout game ends when only 1 player advances, then player is winner
        // leaderboard tracks the wins of the game
        if (gameVer == "knockout" && advancingPlayers.length == 1) {
          newGame = true;
          var winnerNum = advancingPlayers[0];
          matchResult = `<br><br>Player ${winnerNum} wins this game.`;
          leaderboard[winnerNum - 1][1] += 1;
          var leaderboardSorted = leaderboardRanked(leaderboard, gameMode);
          for (
            var counter = 0;
            counter < leaderboardSorted.length;
            counter += 1
          ) {
            leaderboardMsg += `${leaderboardSorted[counter][0]} : ${leaderboardSorted[counter][1]} <br>`;
          }
        }
        leaderboardMsg +=
          "<br> Entering new round... Enter the number of dice to roll.";
      }
      var playerMsg = `Player ${turnNum}`;
      if (gameVer == "knockout") {
        playerMsg = `Player ${playerNum}`;
      }
      turnNum += 1;

      return (
        `${playerMsg} rolled ${diceRolls}. The ${gameMode} number from ${playerMsg} dice rolls is ${autoNumber}. <br><br> ${leaderboardMsg}` +
        matchResult
      );
  }
};
