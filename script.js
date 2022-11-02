var gameState = "roll";
var player = 1;
var playerScore = [];
var leaderboard = [];

// dice roll helper function
var diceRollGenerator = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// two dice roll results
var getDiceRoll = function () {
  return [diceRollGenerator(), diceRollGenerator()];
};

// for combining the order of numbers
var combine = function (diceRoll, input) {
  if (input == "1") {
    return Number(String(diceRoll[0]) + String(diceRoll[1]));
  } else return Number(String(diceRoll[1]) + String(diceRoll[0]));
};

// for comparing player 1 vs player 2
var generateWinner = function () {
  if (playerScore[0] > playerScore[1]) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
};

// pushing into scoreboard
var getCombinedScore = function () {
  if (leaderboard.length > 0) {
    leaderboard[0] = String(Number(leaderboard[0]) + Number(playerScore[0]));
    leaderboard[1] = String(Number(leaderboard[1]) + Number(playerScore[1]));
  } else {
    leaderboard.push(playerScore[0]);
    leaderboard.push(playerScore[1]);
    console.log(leaderboard);
  }
};

// clocking scoreboard
var scoreboard = function () {
  var inOrder = "<br><br>Leaderboard<br>";
  if (Number(leaderboard[0]) > Number(leaderboard[1])) {
    inOrder += `1. Player 1 with a total score of ${leaderboard[0]} <br>
    2. Player 2 with a total score of ${leaderboard[1]}`;
  } else {
    inOrder += `1. Player 2 with a total score of ${leaderboard[1]} <br>
    2. Player 1 with a total score of ${leaderboard[0]}`;
  }
  return inOrder;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameState == "roll") {
    playerDiceRoll = getDiceRoll();
    gameState = "select";
    return `Welcome Player ${player}.<br> You rolled ${playerDiceRoll[0]} & ${playerDiceRoll[1]} for dice 1 and 2 respectively.<br>Please input "1" or "2' to choose the order of the dice.`;
  } else if (gameState == "select") {
    if (input == 1 || input == 2) {
      playerCombination = combine(playerDiceRoll, input);
      playerScore.push(playerCombination);
      gameState = "roll";
      myOutputValue = `Player ${player}, you chose Dice ${input} first.<br>Your number is ${playerCombination}.`;
      player++;
    } else {
      return "Invalid Input. Please select 1 or 2 for dice combination";
    }
    if (player < 3) {
      myOutputValue += `<br>It is now Player ${player} turn.`;
    } else {
      myOutputValue = `<br>Click submit to see the winner.`;
      gameState = "find winner";
    }
  } else if (gameState == "find winner") {
    myOutputValue += generateWinner();
    myOutputValue += `<br><br>Player 1 scored ${playerScore[0]}.<br>Player 2 scored ${playerScore[1]}.`;
    gameState = "roll";
    getCombinedScore();
    myOutputValue += scoreboard();
    player = 1;
    playerScore = [];
  }
  return myOutputValue;
};
