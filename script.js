var main = function (input) {
  // console.log(`check game mode when clicking submit, ${gameMode}`);
  var myOutputMessage = "";

  if (gameMode == GAME_MODE_PLAYER_ROLL_DICE) {
    if (input != "") {
      return `ERROR. please click Submit to start`;
    } else {
      console.log(`game mode is at, roll dice`);
      gameMode = GAME_MODE_PLAYER_CHOOSE_COMBINATION;
      return rollingDice();
    }
  }

  if (gameMode == GAME_MODE_PLAYER_CHOOSE_COMBINATION) {
    if (input != "1" && input != "2") {
      return `ERROR. <br><br>Player ${currentPlayer} enter either "1" or "2" for the order of your dice. <br>your dice roll were ${playerDiceRoll[0]} and ${playerDiceRoll[1]}`;
    } else {
      console.log(`game mode is at, choosing dice combination`);

      myOutputMessage = getPlayerScore(input);
    }

    if (currentPlayer == 1) {
      console.log(`game mode switch to player 2 to roll dice`);
      currentPlayer += 1;

      gameMode = GAME_MODE_PLAYER_ROLL_DICE;

      myOutputMessage += `<br><br>it is Player ${currentPlayer} turn to roll dice. click Submit to roll dice.`;
      return myOutputMessage;
    }

    if (currentPlayer == 2) {
      console.log(`game mode switch to compare p1 and p2 scores`);
      gameMode = GAME_MODE_COMPARE_COMBINATION;

      myOutputMessage += `<br><br>click Submit to compare players combination.`;
      return myOutputMessage;
    }
  }

  if ((gameMode = GAME_MODE_COMPARE_COMBINATION)) {
    console.log(`show result after comparing score`);
    myOutputMessage = compareScore();
    gameReset();
    console.log(`game reset`);

    return myOutputMessage;
  }

  return myOutputMessage;
};

var playerDiceRoll = [];

var currentPlayer = 1;
var playerDiceScore = [];
var leaderBoardInfo = [0, 0, 0, 0];

var GAME_MODE_PLAYER_ROLL_DICE = "GAME_MODE_PLAYER_ROLL_DICE";
var GAME_MODE_PLAYER_CHOOSE_COMBINATION = "GAME_MODE_PLAYER_CHOOSE_COMBINATION";
var GAME_MODE_COMPARE_COMBINATION = "GAME_MODE_COMPARE_COMBINATION";

var gameMode = GAME_MODE_PLAYER_ROLL_DICE;

var randomDiceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  console.log(`roll dice function: ${randomNum}`);
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
  leaderBoardInfo[0] += 1;
  var compareMessage = `Player 1's combination: ${playerDiceScore[0]} <br><br>Player 2's combination: ${playerDiceScore[1]}`;
  // if tie
  if (playerDiceScore[0] == playerDiceScore[1]) {
    leaderBoardInfo[1] += 1;
    return compareMessage + `<br><br>Its a draw.${leaderBoard()}`;
  }
  // if p1 win
  if (playerDiceScore[0] > playerDiceScore[1]) {
    leaderBoardInfo[2] += 1;
    return compareMessage + `<br><br>Player 1 win.${leaderBoard()}`;
  }
  // if p2 win
  if (playerDiceScore[0] < playerDiceScore[1]) {
    leaderBoardInfo[3] += 1;
    return compareMessage + `<br><br>Player 2 win.${leaderBoard()}`;
  }
};

// function to reset game
var gameReset = function () {
  gameMode = GAME_MODE_PLAYER_ROLL_DICE;
  currentPlayer = 1;
  playerDiceScore = [];
};

var leaderBoard = function () {
  return `<br><br><br>click Submit to play again.<br><br>Score Board<br>Player 1 won : ${leaderBoardInfo[2]}<br>Player 2 won : ${leaderBoardInfo[3]}<br>ties: ${leaderBoardInfo[1]}<br>rounds played: ${leaderBoardInfo[0]}`;
};
// 1) there will be 2 players playing this game
// 2) when enter website. at Output box "click Submit to start". click submit
// 3) dice roll for player 1, return result dice 1 & dice 2. for example, 3 and 6
// 4) then player 1 choose dice combination order 1 or 2. for example, combi1 36 combi2 63
// 5) dice roll for player 2, return dice rolls result dice 1 & dice 2
// 6) then player 2 choose dice comindation order.
// 7) computer compare result for player 1 and player 2. the player with higher number wins.

// you need - global varibale for game modes, global varibale for current player, roll dice function for dice 1 and 2, global variable array for rolled dice to store player 1 roll, convert dice roll to string, after choose combination to be in number, global variable array for dice combination for player1. clear array for rolled dice. run for player 2. repart all steps from player 1. finally, compare global variable array for dice combination for player 1 vs. player 2.
