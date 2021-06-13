var mode = "player1start";
var combinedDiceRoll1 = 0;
var combinedDiceRoll2 = 0;
var outcome1 = 0;
var outcome2 = 0;
var p1Choice = 0;
var p2Choice = 0;
var p1Score = 0;
var p2Score = 0;
var main = function (input) {
  var twoDiceRolls = dicerolltwice();
  var pickingprocess = pickprocess(twoDiceRolls, outcome1, outcome2);
  return pickingprocess;
};

var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomDiceNumber = Math.floor(randomDecimal) + 1;
  return randomDiceNumber;
};

var faceoff = function (p1Choice, p2Choice) {
  mode = "player1start";
  if (p1Choice > p2Choice) {
    return `Player 1 wins with a value of ${p1Choice} over ${p2Choice}!`;
  } else if (p2Choice > p1Choice) {
    return `Player 2 wins with a value of ${p2Choice} over ${p1Choice}!`;
  } else {
    return "There is no winner!";
  }
};

var dicerolltwice = function () {
  var rollDice1 = diceroll();
  var rollDice2 = diceroll();
  outcome1 = rollDice1 * 10 + rollDice2;
  outcome2 = rollDice2 * 10 + rollDice1;
  var myOutputValue =
    `You have rolled ${rollDice1} and ${rollDice2}!` +
    "<br>" +
    `1: ${outcome1}` +
    "<br>" +
    `2: ${outcome2}`;
  if (mode == "player1start") {
    myOutputValue = "Player 1:" + "<br>" + myOutputValue;
  } else {
    myOutputValue = "Player 2:" + "<br>" + myOutputValue;
  }
  return myOutputValue;
};

var pickprocess = function (myOutputValue, outcome1, outcome2) {
  if (outcome1 > outcome2) {
    if (mode == "player1start") {
      mode = "player2start";
      p1Choice = outcome1;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your highest roll is ${outcome1}. Now, player 2 will roll.`
      );
    } else {
      p2Choice = outcome1;
      p2Score = p2Score + p2Choice;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      var leaderboardScore = leaderboard(p1Score, p2Score);
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 2, your highest roll is ${outcome1}.` +
        "<br>" +
        winnerDecided +
        leaderboardScore
      );
    }
  } else {
    if (mode == "player1start") {
      mode = "player2start";
      p1Choice = outcome2;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your highest roll is ${outcome2}. Now, player 2 will roll.`
      );
    } else {
      p2Choice = outcome2;
      p2Score = p2Score + p2Choice;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      var leaderboardScore = leaderboard(p1Score, p2Score);
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 2, your highest roll is ${outcome2}.` +
        "<br>" +
        winnerDecided +
        leaderboardScore
      );
    }
  }
};

var leaderboard = function (p1Score, p2Score) {
  if (p1Score > p2Score) {
    return (
      "<br>" +
      `1st Place - Player 1 Total score: ${p1Score}` +
      "<br>" +
      `2nd Place - Player 2 Total score: ${p2Score}` +
      "<br> <br>" +
      "Player 1, click submit to roll again!"
    );
  } else if (p2Score > p1Score) {
    return (
      "<br>" +
      `1st Place - Player 2 Total score: ${p2Score}` +
      "<br>" +
      `2nd Place - Player 1 Total score: ${p1Score}` +
      "<br> <br>" +
      "Player 1, click submit to roll again!"
    );
  }
};

var leaderboard = function (p1Score, p2Score) {
  if (p1Score > p2Score) {
    return (
      "<br>" +
      `1st Place - Player 1 Total score: ${p1Score}` +
      "<br>" +
      `2nd Place - Player 2 Total score: ${p2Score}` +
      "<br> <br>" +
      "Player 1, click submit to roll again!"
    );
  } else if (p2Score > p1Score) {
    return (
      "<br>" +
      `1st Place - Player 2 Total score: ${p2Score}` +
      "<br>" +
      `2nd Place - Player 1 Total score: ${p1Score}` +
      "<br> <br>" +
      "Player 1, click submit to roll again!"
    );
  }
};
var inputDisplay = function () {
  if (mode == "player1start") {
    return "Player 1, please roll.";
  } else if (mode == "player1pick") {
    return "Player 1, please enter which dice you wish to put in front.";
  } else if (mode == "player2start") {
    return "Player 2, please roll.";
  } else if (mode == "player2pick") {
    return "Player 2, please enter which dice you wish to put in front.";
  }
};
