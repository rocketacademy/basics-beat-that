var main = function (input) {
  // console.log(`check game mode when clicking submit, ${gameMode}`);
  var myOutputMessage = "";

  if (gameMode == GAME_MODE_PLAYER_ROLL_DICE) {
    if (input != "") {
      return `ERROR. please click Submit to start`;
    } else {
      // console.log(`game mode is at, roll dice`);
      gameMode = GAME_MODE_PLAYER_CHOOSE_COMBINATION;
      return rollingDice();
    }
  }

  if (gameMode == GAME_MODE_PLAYER_CHOOSE_COMBINATION) {
    if (input != "1" && input != "2") {
      return `ERROR. <br><br>Player ${currentPlayer} enter either "1" or "2" for the order of your dice. <br>your dice roll were ${playerDiceRoll[0]} and ${playerDiceRoll[1]}`;
    } else {
      // console.log(`game mode is at, choosing dice combination`);

      myOutputMessage = getPlayerScore(input);
    }

    if (currentPlayer == 1) {
      // console.log(`game mode switch to player 2 to roll dice`);
      currentPlayer += 1;
      gameMode = GAME_MODE_PLAYER_ROLL_DICE;

      myOutputMessage += `<br><br>it is Player ${currentPlayer} turn to roll dice. click Submit to roll dice.`;
    } else if (currentPlayer == 2) {
      // console.log(`game mode switch to compare p1 and p2 scores`);
      gameMode = GAME_MODE_COMPARE_COMBINATION;

      myOutputMessage += `<br><br>click Submit to compare players combination.`;
    }
    return myOutputMessage;
  }

  if ((gameMode = GAME_MODE_COMPARE_COMBINATION)) {
    // console.log(`show result after comparing score`);
    myOutputMessage = compareScore();
    gameReset();
    // console.log(`game reset`);

    return myOutputMessage;
  }
};

var playerDiceRoll = [];

var currentPlayer = 1;
var playerDiceScore = [];

var timesPLayed = 0;
var timesTie = 0;
var timesP1Win = 0;
var timesP2Win = 0;

var GAME_MODE_PLAYER_ROLL_DICE = "GAME_MODE_PLAYER_ROLL_DICE";
var GAME_MODE_PLAYER_CHOOSE_COMBINATION = "GAME_MODE_PLAYER_CHOOSE_COMBINATION";
var GAME_MODE_COMPARE_COMBINATION = "GAME_MODE_COMPARE_COMBINATION";

var gameMode = GAME_MODE_PLAYER_ROLL_DICE;

var randomDiceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  // console.log(`roll dice function: ${randomNum}`);
  return randomNum;
};
// function for random number, roll dice
var rollingDice = function () {
  var counter = 0;

  while (counter < 2) {
    // console.log(`game mode player rolled dice`);
    playerDiceRoll.push(randomDiceRoll().toString());

    counter += 1;
  }
  return `Player ${currentPlayer} dices rolled are ${playerDiceRoll[0]} and ${playerDiceRoll[1]}. <br><br>please choose "1" or "2" for the order of your dice.`;
};

// function to combine player dice roll
var getPlayerScore = function (playerInput) {
  var playerScore;

  if (playerInput == "1") {
    console.log(`player choose combi 1`);
    playerScore = Number(playerDiceRoll[0] + playerDiceRoll[1]);
  }
  if (playerInput == "2") {
    console.log(`player choose combi 2`);
    playerScore = Number(playerDiceRoll[1] + playerDiceRoll[0]);
  }

  playerDiceScore.push(playerScore);
  playerDiceRoll = [];

  return `Player ${currentPlayer} you chose: ${playerScore}.`;
};

// function to compare players score
var compareScore = function () {
  timesPLayed += 1;
  var compareMessage = `Player 1's combination: ${playerDiceScore[0]} <br><br>Player 2's combination: ${playerDiceScore[1]}`;
  // if tie
  if (playerDiceScore[0] == playerDiceScore[1]) {
    timesTie += 1;
    compareMessage += `<br><br>Its a draw.${leaderBoard()}`;
  }
  // if p1 win
  else if (playerDiceScore[0] > playerDiceScore[1]) {
    timesP1Win += 1;
    compareMessage += `<br><br>Player 1 win.${leaderBoard()}`;
  }
  // if p2 win
  else if (playerDiceScore[0] < playerDiceScore[1]) {
    timesP2Win += 1;
    compareMessage += `<br><br>Player 2 win.${leaderBoard()}`;
  }
  return compareMessage;
};

// function to reset game
var gameReset = function () {
  gameMode = GAME_MODE_PLAYER_ROLL_DICE;
  currentPlayer = 1;
  playerDiceScore = [];
};

var leaderBoard = function () {
  return `<br><br><br>click Submit to play again.<br><br>Score Board<br>Player 1 won : ${timesP1Win}<br>Player 2 won : ${timesP2Win}<br>ties: ${timesTie}<br>rounds played: ${timesPLayed}`;
};

// 1) there will be 2 players playing this game
// 2) when enter website. at Output box "click Submit to start". click submit
// 3) dice roll for player 1, return result dice 1 & dice 2. for example, 3 and 6
// 4) then player 1 choose dice combination order 1 or 2. for example, combi1 36 combi2 63
// 5) dice roll for player 2, return dice rolls result dice 1 & dice 2
// 6) then player 2 choose dice comindation order.
// 7) program will compare result for player 1 and player 2. the player with higher number wins.

// you need - global varibale for game modes, global varibale for current player, roll dice function for dice 1 and 2, global variable array for rolled dice to store player 1 roll, convert dice roll to string, after choose combination to be in number, global variable array for dice combination for player1. clear array for rolled dice. run for player 2. repart all steps from player 1. finally, compare global variable array for dice combination for player 1 vs. player 2.
// =====================================END=======================================

// Beat that v2 - in progress of working it out. Figuring out the COMPARE SCORE GAME MODE. then storing winning player and win scores.
// var numOfPlayers = 0;
// var playerDiceRoll = [];
// var allPlayerDiceRoll = [];
// var allPlayerScores = [];
// var currentPlayer = 1;

// var GAME_MODE_NUMBER_OF_PLAYERS = "GAME_MODE_NUMBER_OF_PLAYERS";
// var GAME_MODE_PLAYER_ROLL_DICE = "GAME_MODE_PLAYER_ROLL_DICE";
// var GAME_MODE_PLAYER_CHOOSE_COMBINATION = "GAME_MODE_PLAYER_CHOOSE_COMBINATION";
// var GAME_MODE_COMPARE_COMBINATION = "GAME_MODE_COMPARE_COMBINATION";

// var gameMode = GAME_MODE_NUMBER_OF_PLAYERS;

// // function for random dice number
// var randomDiceRoll = function () {
//   var randomNum = Math.floor(Math.random() * 6) + 1;
//   console.log(`roll dice function: ${randomNum}`);
//   return randomNum;
// };

// // function for rolling dice for all players
// var diceRollResult = function () {
//   for (var i = 0; i < numOfPlayers; i += 1) {
//     var dice1 = randomDiceRoll().toString();
//     var dice2 = randomDiceRoll().toString();
//     playerDiceRoll.push(dice1, dice2);

//     console.log(playerDiceRoll);
//     allPlayerDiceRoll.push(playerDiceRoll);

//     playerDiceRoll = [];
//     console.log(allPlayerDiceRoll);
//   }
//   return allPlayerDiceRoll;
// };

// // function to reset game
// var gameReset = function () {
//   gameMode = GAME_MODE_PLAYER_ROLL_DICE;
//   currentPlayer = 1;
//   allPlayerDiceRoll = [];
//   allPlayerScores = [];
// };

// var combineScore = function (inputOrder) {
//   var playerScore;
//   if (inputOrder == 1) {
//     var playerScore =
//       allPlayerDiceRoll[currentPlayer - 1][0] +
//       allPlayerDiceRoll[currentPlayer - 1][1];
//   } else {
//     inputOrder == 2;
//     var playerScore =
//       allPlayerDiceRoll[currentPlayer - 1][1] +
//       allPlayerDiceRoll[currentPlayer - 1][0];
//   }
//   return playerScore;
// };

// var main = function (input) {
//   myOutputMessage = "";

//   if (gameMode == GAME_MODE_NUMBER_OF_PLAYERS) {
//     if (!Number(input)) {
//       // console.log(`there is error when entering number of players.`);
//       return `Error. please enter the number of players`;
//     } else {
//       numOfPlayers = input;
//       // console.log(`entered number of players. no of players: ${numOfPlayers}`);
//       gameMode = GAME_MODE_PLAYER_ROLL_DICE;

//       return `there will be ${numOfPlayers} for this game. <br><br>click submit to roll dice for all players.`;
//     }
//   }

//   if (gameMode == GAME_MODE_PLAYER_ROLL_DICE) {
//     if (input != "") {
//       // console.log(`there is error when rolling dice.`);

//       return `Error. just click Submit to start.`;
//     } else {
//       // console.log(`dice roll completed.`);
//       diceRollResult().toString();
//       gameMode = GAME_MODE_PLAYER_CHOOSE_COMBINATION;

//       return `all players have rolled 2 dice. <br><br>Player ${currentPlayer} your dice roll are ${allPlayerDiceRoll[0]} <br>enter 1 or 2 to choose dice order to determine each your score.`;
//     }
//   }

//   if (gameMode == GAME_MODE_PLAYER_CHOOSE_COMBINATION) {
//     // how to relate numOfPlyers to allPlayerDiceRoll
//     // after each player select order then push to array allPlayerScores

//     if (input != 1 && input != 2) {
//       // console.log(`there is error when choosing order.`);
//       return `Error. choose either 1 or 2 to determine each your score. <br>your roll were ${
//         allPlayerDiceRoll[currentPlayer - 1]
//       }`;
//     } else {
//       // console.log(`${currentPlayer} selected order.`);
//       myOutputMessage = `Player ${currentPlayer} score is ${combineScore()}`;
//       allPlayerScores.push(Number(combineScore()));
//       currentPlayer += 1;
//     }

//     if (currentPlayer <= numOfPlayers) {
//       // console.log(`${currentPlayer} selecting order`);
//       return (
//         myOutputMessage +
//         `<br><br>Player ${currentPlayer} your dice roll are ${
//           allPlayerDiceRoll[currentPlayer - 1]
//         } <br>enter 1 or 2 to choose dice order to determine each your score.`
//       );
//     } else {
//       // console.log(`all players selected order. moving to compare scores`);
//       gameMode = GAME_MODE_COMPARE_COMBINATION;
//       return (
//         myOutputMessage +
//         `<br><br>all players have selected their scores.<br>click sumbit to compare scores.`
//       );
//     }
//   }

//   if ((gameMode = GAME_MODE_COMPARE_COMBINATION)) {
//     //comparing score mode not complete, working in progress
//     var highScore = 0;
//     var winningIndex = 0;
//     // var tiePlayers = [];
//     for (var i = 0, len = allPlayerScores.length; i < len; i += 1) {
//       if (allPlayerScores[i] > highScore) {
//         highScore = allPlayerScores[i];
//         winningIndex = i;
//         // } else if (allPlayerScores[i] == highScore) {
//         //   // the tie function cannot work yet.
//         //   var tieIndex = i;
//         //   tiePlayers.push(tieIndex + 1);
//         // }
//       }
//       myOutputMessage = `Player ${winningIndex + 1} won.`;
//       // <br><br>players that tie ${tiePlayers}`;

//       gameReset();
//     }
//   }
//   // return `Player ${i + 1} is the winner.`;

//   // if (Math.max(allPlayerScores)) {
//   // console.log(`its a tie`);
//   // return Math.max(allPlayerScores);
//   // allPlayerScores.indexOf(Math.max(allPlayerScores));
//   // }
//   // how to relate allPlayerScores to numOfPlayers
//   // compare max value in array allPlayerScores
//   // who tie (give 1 point each), who win (give 2 to only winner)
//   // output Winner
//   // update array winRate

//   return myOutputMessage;
// };
