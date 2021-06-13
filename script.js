var mode = "player1start";
var combinedDiceRoll1 = 0;
var combinedDiceRoll2 = 0;
var outcome1 = 0;
var outcome2 = 0;
var p1Choice = 0;
var p2Choice = 0;
var main = function (input) {
  var myOutputValue = "";
  if (mode == "player1start" || mode == "player2start") {
    return dicerolltwice();
  } else if (mode == "player1pick" || mode == "player2pick") {
    if (input == 1 || input == 2) {
      return pickprocess(input, outcome1, outcome2);
    }
    return myOutputValue;
  }
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
  console.log(outcome1);
  console.log(outcome2);
  var myOutputValue =
    `You have rolled ${rollDice1} and ${rollDice2}! Type either 1 or 2 to pick your combined number: ` +
    "<br>" +
    `1: ${outcome1}` +
    "<br>" +
    `2: ${outcome2}`;
  if (mode == "player1start") {
    mode = "player1pick";
  } else {
    mode = "player2pick";
  }
  return myOutputValue;
};

var pickprocess = function (input, outcome1, outcome2) {
  if (input == 1) {
    if (mode == "player1pick") {
      mode = "player2start";
      p1Choice = outcome1;
      return `Player 1, you have picked ${p1Choice}. Now, player 2 will roll.`;
    } else {
      p2Choice = outcome1;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      return (myOutputValue =
        `Player 2, you have picked ${p2Choice}.` + "<br>" + winnerDecided);
    }
  } else if (input == 2) {
    if (mode == "player1pick") {
      mode = "player2start";
      p1Choice = outcome2;
      return `Player 1, you have picked ${p1Choice}. Now, player 2 will roll.`;
    } else {
      p2Choice = outcome2;
      var winnerDecided = faceoff(p1Choice, p2Choice);
      return (myOutputValue =
        `Player 2, you have picked ${p2Choice}.` + "<br>" + winnerDecided);
    }
  } else {
    myOutputValue = "Please only enter either 1 or 2 to pick!";
  }
  return myOutputValue;
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
