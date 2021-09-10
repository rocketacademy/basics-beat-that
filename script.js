// state variables
var highestNumberMode;
var knockoutMode;
var numDice;
var numPlayers;
var diceRolls = [];
var curPlayer = 1;
var players = [];

// knockout mode state variables
var roundPlayers = [];

var resetGame = function () {
  // reset game by resetting relevant variables and changing state of ui
  diceRolls = [];
  curPlayer = 1;
  players = [];
  roundPlayers = [];

  document.querySelector("#start-game-button").disabled = false;
  document.querySelector("#continue-button").style.visibility = "hidden";
  document.querySelector("#quit-button").style.visibility = "hidden";
  document.querySelector("#num-player").disabled = false;
  document.querySelector("#num-dice").disabled = false;
  document.querySelector("#calc-score").disabled = false;
  document.querySelector("#game-mode").disabled = false;
};

var getDiceRolls = function () {
  // generate a player's dice rolls and store it in diceRolls array, output msg for each roll
  var rollsMsg = "";
  for (var i = 0; i < numDice; i += 1) {
    var diceRoll = Math.ceil(Math.random() * 6);
    diceRolls.push(diceRoll);
    rollsMsg += `You rolled ${diceRoll} for Dice ${i + 1}.<br>`;
  }
  return rollsMsg;
};

var getScore = function () {
  // auto calculate score
  // sort by ascending or descending depending on the number mode
  if (highestNumberMode) diceRolls.sort((a, b) => b - a);
  else diceRolls.sort((a, b) => a - b);

  var score = "";
  for (var i = 0; i < diceRolls.length; i += 1) {
    // use the sorted dicerolls array to concatenate each roll to a string
    score += diceRolls[i];
  }
  diceRolls = [];
  return Number(score);
};

var generateLeaderboard = function () {
  // upon each player having rolled dice, output leaderboard

  // sort players array by score
  if (highestNumberMode) players.sort((a, b) => b.score - a.score);
  else players.sort((a, b) => a.score - b.score);

  // output scores
  var output = "<br><br><b>💪 Leaderboard: 💪</b><br>";
  for (var j = 0; j < players.length; j += 1) {
    output += `${j + 1}. Player ${players[j].playerNum}: ${
      players[j].score
    }<br>`;
  }

  // output winner
  var winner = players[0].playerNum;
  var tied = [winner];
  var i = 1;
  while (i < players.length && players[i].score == players[0].score) {
    tied.push(players[i].playerNum);
    i += 1;
  }

  if (tied.length > 1) output += `<br>Players ${tied} are currently tied!`;
  else output += `<br>The current leader is Player ${winner}! 🎉🎉🎉`;

  players.sort((a, b) => a.playerNum - b.playerNum); //resort players by playernum
  return output;
};

var randomSelectTwoPlayers = function () {
  var playerOne;
  var playerTwo;
  // generate two random unique players and store them in roundPlayers array
  playerOne = players[Math.floor(Math.random() * players.length)];
  do {
    playerTwo = players[Math.floor(Math.random() * players.length)];
  } while (playerOne == playerTwo);
  roundPlayers = [playerOne, playerTwo];

  return `Player ${playerOne.playerNum} and Player ${playerTwo.playerNum} are selected to play. Player ${playerOne.playerNum}, press Continue to roll.`;
};

var generateEndKnockoutRoundOutput = function () {
  // upon end of every knockout round, generate output

  // sort scores
  if (highestNumberMode) roundPlayers.sort((a, b) => b.score - a.score);
  else roundPlayers.sort((a, b) => a.score - b.score);

  // output the scores of the players who played the recent round
  var output = `<br><br>Player ${roundPlayers[0].playerNum}'s number is ${roundPlayers[0].score}.`;
  output += `<br>Player ${roundPlayers[1].playerNum}'s number is ${roundPlayers[1].score}.<br>`;

  // output winner/tie and reset relevant variables
  curPlayer = 1;
  if (roundPlayers[0].score == roundPlayers[1].score) {
    roundPlayers[0].score = 0;
    roundPlayers[1].score = 0;
    output += `There's a tie! Player ${roundPlayers[0].playerNum}, press Continue to roll again.`;
  } else {
    output += `The winner is Player ${roundPlayers[0].playerNum}! Player ${roundPlayers[1].playerNum} is eliminated. ❌`;
    players = players.filter((p) => p.playerNum != roundPlayers[1].playerNum); // remove loser from players
    roundPlayers = [];

    if (players.length == 1) {
      // knockout game over, there is a winner
      output += `<br><br>After a long fought battle, the ultimate winner of the knockout is Player ${players[0].playerNum}! 🎉🎉🎉<br>Congratulations!`;
      resetGame();
    } else {
      output += `<br><br>Remaining players: `;
      for (let i = 0; i < players.length; i += 1) {
        players[i].score = 0;
        output += `${players[i].playerNum} `;
      }
    }
  }
  return output;
};

var setGameState = function (playerNum, diceNum, calcScore, gameMode) {
  // input from user, this function is called from the script in index.html
  numPlayers = Number(playerNum);
  numDice = Number(diceNum);
  highestNumberMode = calcScore == "highest";
  knockoutMode = gameMode == "knockout";

  // initalise players to be an array with numPlayers elements
  // each element is an object with playerNum and score
  players = new Array(numPlayers);
  for (var i = 0; i < players.length; i += 1) {
    players[i] = { playerNum: i + 1, score: 0 };
  }

  return knockoutMode
    ? randomSelectTwoPlayers()
    : `Starting game. It is Player 1's turn. Press Continue to roll.`;
};

var main = function () {
  // knockout mode but no players chosen to play the next round
  if (knockoutMode && roundPlayers.length == 0) return randomSelectTwoPlayers();

  // initialise output
  var playerNum = knockoutMode
    ? roundPlayers[curPlayer - 1].playerNum
    : curPlayer;
  var output = `Welcome Player ${playerNum}.<br>`;
  output += getDiceRolls();
  var score = getScore();
  output += `<br>Your number is <b>${score}</b>.`;

  if (!knockoutMode) {
    // calculate score for cur player and increment score
    players[curPlayer - 1].score += score;

    curPlayer += 1; // next player
    if (curPlayer > numPlayers) curPlayer = 1; // go back to player 1

    output += `<br>It is now Player ${curPlayer}'s turn.`;
    output += generateLeaderboard();
  } else {
    // calculate score for cur player and increment score
    roundPlayers[curPlayer - 1].score += score;

    if (curPlayer < roundPlayers.length) {
      curPlayer += 1; // next player
      playerNum = roundPlayers[curPlayer - 1].playerNum;
      output += `<br>It is now Player ${playerNum}'s turn.`;
    } else {
      output += generateEndKnockoutRoundOutput();
    }
  }
  return output;
};
