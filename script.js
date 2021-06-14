var mode = "start";
var combinedDiceRoll1 = 0;
var combinedDiceRoll2 = 0;
var outcome1 = 0;
var outcome2 = 0;
var p1Choice = 0;
var p2Choice = 0;
var p1Score = 0;
var p2Score = 0;
var noOfPlayers = 0;
var main = function (input) {
  if (mode == "start") {
    if (input == "normal") {
      mode = "player1startnormal";
    } else if (input == "lowest") {
      mode = "player1startlowest";
    } else {
      return "please only enter normal or lowest!";
    }
  }
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
  if (mode == "player2startnormal") {
    mode = "start";
    if (p1Choice > p2Choice) {
      return `Player 1 wins with a value of ${p1Choice} over ${p2Choice}!`;
    } else if (p2Choice > p1Choice) {
      return `Player 2 wins with a value of ${p2Choice} over ${p1Choice}!`;
    } else {
      return "There is no winner!";
    }
  } else if ("player2startlowest") {
    mode = "start";
    if (p2Choice > p1Choice) {
      return `Player 1 wins as the value of ${p1Choice} is lower than ${p2Choice}!`;
    } else if (p1Choice > p2Choice) {
      return `Player 2 wins as the value of ${p2Choice} is lower than ${p1Choice}!`;
    } else {
      return "There is no winner!";
    }
  }
};

var dicerolltwice = function () {
  var rollDice1 = diceroll();
  var rollDice2 = diceroll();
  outcome1 = rollDice1 * 10 + rollDice2;
  outcome2 = rollDice2 * 10 + rollDice1;
  console.log(outcome1);
  console.log(outcome2);
  var myOutputValue =
    `You have rolled ${rollDice1} and ${rollDice2}!` +
    "<br>" +
    `1: ${outcome1}` +
    "<br>" +
    `2: ${outcome2}`;
  if (mode == "player1startnormal" || mode == "player1startlowest") {
    myOutputValue = "Player 1:" + "<br>" + myOutputValue;
  } else {
    myOutputValue = "Player 2:" + "<br>" + myOutputValue;
  }
  return myOutputValue;
};

var pickprocess = function (myOutputValue, outcome1, outcome2) {
  if (outcome1 > outcome2) {
    if (mode == "player1startnormal") {
      mode = "player2startnormal";
      p1Choice = outcome1;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your highest roll is ${outcome1}. Now, player 2 will roll.`
      );
    }
    if (mode == "player2startnormal") {
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
    if (mode == "player1startlowest") {
      mode = "player2startlowest";
      p1Choice = outcome2;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your lowest roll is ${outcome2}. Now, player 2 will roll.`
      );
    }
    if (mode == "player2startlowest") {
      p2Choice = outcome2;
      p2Score = p2Score + p2Choice;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      var leaderboardScore = leaderboard(p1Score, p2Score);
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 2, your lowest roll is ${outcome2}.` +
        "<br>" +
        winnerDecided +
        leaderboardScore
      );
    }
  } else {
    if (mode == "player1startnormal") {
      mode = "player2startnormal";
      p1Choice = outcome2;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your highest roll is ${outcome2}. Now, player 2 will roll.`
      );
    }
    if (mode == "player2startnormal") {
      p2Choice = outcome2;
      p2Score = p2Score + p2Choice;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      var leaderboardScore = leaderboard(p1Score, p2Score);
      console.log(leaderboardScore);
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 2, your highest roll is ${outcome2}.` +
        "<br>" +
        winnerDecided +
        leaderboardScore
      );
    }
    if (mode == "player1startlowest") {
      mode = "player2startlowest";
      p1Choice = outcome1;
      p1Score = p1Score + p1Choice;
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 1, your lowest roll is ${outcome1}. Now, player 2 will roll.`
      );
    }
    if (mode == "player2startlowest") {
      p2Choice = outcome1;
      console.log(p2Choice);
      p2Score = p2Score + p2Choice;
      console.log(p2Score);
      var winnerDecided = faceoff(p1Choice, p2Choice);
      var leaderboardScore = leaderboard(p1Score, p2Score);
      console.log(leaderboardScore);
      return (
        `${myOutputValue}` +
        "<br>" +
        `Player 2, your lowest roll is ${outcome1}.` +
        "<br>" +
        winnerDecided +
        leaderboardScore
      );
    }
  }
};

var leaderboard = function (p1Score, p2Score) {
  var myOutputValue = "";
  if (mode == "player1startnormal") {
    if (p1Score > p2Score) {
      myOutputValue =
        "<br>" +
        `1st Place - Player 1 Total score: ${p1Score}` +
        "<br>" +
        `2nd Place - Player 2 Total score: ${p2Score}` +
        "<br> <br>" +
        "Player 1, type normal to play Normal mode again or type lowest to play reverse!";
    } else if (p2Score > p1Score) {
      myOutputValue =
        "<br>" +
        `1st Place - Player 2 Total score: ${p2Score}` +
        "<br>" +
        `2nd Place - Player 1 Total score: ${p1Score}` +
        "<br> <br>" +
        "Player 1, type normal to play Normal mode again or type lowest to play reverse!";
    }
  } else if (mode == "player1startlowest") {
    if (p1Score > p2Score) {
      myOutputValue =
        "<br>" +
        `1st Place - Player 2 Total score: ${p2Score}` +
        "<br>" +
        `2nd Place - Player 1 Total score: ${p1Score}` +
        "<br> <br>" +
        "Player 1, type lowest to play Reverse mode again or type normal to play normal dice!";
    } else if (p2Score > p1Score) {
      myOutputValue =
        "<br>" +
        `1st Place - Player 1 Total score: ${p1Score}` +
        "<br>" +
        `2nd Place - Player 2 Total score: ${p2Score}` +
        "<br> <br>" +
        "Player 1, type lowest to play Reverse mode again or type normal to play normal dice!";
    }
  }
  return myOutputValue;
};

var inputDisplay = function () {
  // change to new lowest and normal modes
  if (mode == "start") {
    return "Please input whether you would like to play lowest or normal mode.";
  } else if (mode == "player1startnormal" || mode == "player1startlowest") {
    return "It is Player 1's turn.";
  } else if (mode == "player2startnormal" || mode == "player2startlowest") {
    return "It is Player 2's turn.";
  }
};
