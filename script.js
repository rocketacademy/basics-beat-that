// state variables
var highestNumberMode, knockoutMode, numDice, numPlayers;
var diceRolls = [];
var curPlayer = 1;
var playerScores = [];

// knockout mode state variables
var playerChoices = [];
var players = [];
var scores = [];
var playerIndex = 0;

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
  return Number(score);
};

var getWinningScore = function (scoresArr) {
  return highestNumberMode ? Math.max(...scoresArr) : Math.min(...scoresArr);
};

var generateEndTurnOutput = function () {
  // upon each player having rolled dice, output each player's number and the leader
  var output = "<br><br>";
  for (var j = 0; j < playerScores.length; j++) {
    output += `Player ${j + 1}'s number is ${playerScores[j]}.<br>`;
  }
  var winningScore = getWinningScore(playerScores);
  var winner = playerScores.indexOf(winningScore) + 1;
  output += `The current leader is Player ${winner}!`;
  return output;
};

var randomSelectTwoPlayers = function () {
  var playerOne;
  var playerTwo;
  // generate two random unique players from playerChoices and store them in players array
  playerOne = playerChoices[Math.floor(Math.random() * playerChoices.length)];
  do {
    playerTwo = playerChoices[Math.floor(Math.random() * playerChoices.length)];
  } while (playerOne == playerTwo);
  players = [playerOne, playerTwo];

  return `Player ${playerOne} and Player ${playerTwo} are selected to play. Player ${playerOne}, press submit to roll.`;
};

var generateEndKnockoutRoundOutput = function () {
  var output = `<br><br>`;
  for (var j = 0; j < players.length; j++) {
    output += `Player ${players[j]}'s number is ${scores[j]}.<br>`;
  }
  var winningScore = getWinningScore(scores);
  var winner = players[scores.indexOf(winningScore)];
  var loser = players[1 - scores.indexOf(winningScore)];
  output += `The winner is player ${winner}!`;
  playerChoices = playerChoices.filter((x) => x != loser); // remove loser from playerchoices
  playerIndex = 0;
  players = [];
  scores = [];

  if (playerChoices.length == 1) {
    // knockout game over, there is a winner
    output += `<br><br>After a long fought battle, the ultimate winner of the knockout round is player ${playerChoices[0]}! Congratulations!`;
    resetGame();
  } else {
    output += `<br><br>Remaining players: ${playerChoices}`;
  }
  return output;
};

var setGameState = function (players, dice, calcScore, gameMode) {
  numPlayers = Number(players);
  numDice = Number(dice);
  highestNumberMode = calcScore == "highest";
  knockoutMode = gameMode == "knockout";

  playerScores = new Array(numPlayers).fill(0); // create a playerScores array with numPlayers elements all set to 0

  if (knockoutMode) {
    // fill the playerChoices array with the player nums which will be used in gameplay later
    for (var i = 1; i <= numPlayers; i += 1) {
      playerChoices.push(i);
    }
  }

  return knockoutMode
    ? randomSelectTwoPlayers()
    : `Starting game. It is Player 1's turn. Press Submit to roll.`;
};

var resetGame = function () {
  diceRolls = [];
  curPlayer = 1;
  playerScores = [];
  playerChoices = [];
  players = [];
  scores = [];
  playerIndex = 0;

  document.querySelector("#start-game-button").disabled = false;
  document.querySelector("#continue-button").style.visibility = "hidden";
  document.querySelector("#quit-button").style.visibility = "hidden";
  document.querySelector("#num-player").disabled = false;
  document.querySelector("#num-dice").disabled = false;
  document.querySelector("#calc-score").disabled = false;
  document.querySelector("#game-mode").disabled = false;
};

var main = function () {
  if (knockoutMode && players.length == 0) return randomSelectTwoPlayers();

  curPlayer = knockoutMode ? players[playerIndex] : curPlayer;
  var output = `Welcome Player ${curPlayer}.<br>`;
  output += getDiceRolls();
  var score = getScore();
  diceRolls = [];
  output += `<br>Your number is ${score}.`;

  if (!knockoutMode) {
    // calculate score for cur player and add to playerScores array
    playerScores[curPlayer - 1] += score;

    curPlayer += 1; // next player
    if (curPlayer > numPlayers) curPlayer = 1; // go back to player 1
    output += `<br>It is now Player ${curPlayer}'s turn.`;
    output += generateEndTurnOutput();
  } else {
    // calculate score for cur player and add to scores array
    scores.push(score);

    if (playerIndex < players.length - 1) {
      playerIndex += 1; // next player
      output += `<br>It is now Player ${players[playerIndex]}'s turn.`;
    } else {
      output += generateEndKnockoutRoundOutput();
    }
  }
  return output;
};
