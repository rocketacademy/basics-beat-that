// Game Rules
// Roll dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64.

var gameMode = "p1 roll";

var p1Dice = [];
var p2Dice = [];

var p1BeatThat = "";
var p2BeatThat = "";

var userScore = 0;

var main = function (input) {
  if (gameMode == "p1 roll") {
    for (var arrayCounter = 0; arrayCounter < 2; arrayCounter++) {
      p1Dice.push(diceRoll());
      console.log("input:" + input);
    }
    console.log(p1Dice);
    // console.log(arrayCounter);

    var myOutputValue = `Welcome Player 1.<br>You rolled ${p1Dice[0]} for Dice 1 and ${p1Dice[1]} for Dice 2.<br>Choose the order of dice.`;

    gameMode = "p1 choose";
    return myOutputValue;
  } else if (gameMode == "p1 choose") {
    if (input == 1) {
      p1BeatThat = `${p1Dice[0]}${p1Dice[1]}`;
      myOutputValue = `Player 1, you chose Dice 1 first.<br>Your number is ${p1BeatThat}.<br>It is now Player 2's turn.`;
    } else if (input == 2) {
      p1BeatThat = `${p1Dice[1]}${p1Dice[0]}`;
      myOutputValue = `Player 1, you chose Dice 2 first.<br>Your number is ${p1BeatThat}.<br>It is now Player 2's turn.`;
    }
    gameMode = "p2 roll";
    return myOutputValue;
  }
  // Player 2
  if (gameMode == "p2 roll") {
    for (var arrayCounter = 0; arrayCounter < 2; arrayCounter++) {
      p2Dice.push(diceRoll());
    }
    console.log(p2Dice);

    var myOutputValue = `Welcome Player 2.<br>You rolled ${p2Dice[0]} for Dice 1 and ${p2Dice[1]} for Dice 2.<br>Choose the order of dice.`;

    gameMode = "p2 choose";
    return myOutputValue;
  } else if (gameMode == "p2 choose") {
    if (input == 1) {
      p2BeatThat = `${p2Dice[0]}${p2Dice[1]}`;
      myOutputValue = `Player 2, you chose Dice 1 first.<br>Your number is ${p2BeatThat}.<br>Let's find out who wins.`;
    } else if (input == 2) {
      p2BeatThat = `${p2Dice[1]}${p2Dice[0]}`;
      myOutputValue = `Player 2, you chose Dice 2 first.<br>Your number is ${p2BeatThat}.<br>Let's find out who wins.`;
    }
    gameMode = "result";
    return myOutputValue;
  }
  // Winner Winner Chicken Dinner

  if (gameMode == "result") {
    var p1Score = parseInt(p1BeatThat);
    var p2Score = parseInt(p2BeatThat);

    if (p1Score > p2Score) {
      myOutputValue = `Player 1: ${p1Score}<br>Player 2: ${p2Score}<br> Player 1 Wins!`;
      return myOutputValue;
    } else if (p2Score > p1Score) {
      myOutputValue = `Player 1: ${p1Score}<br>Player 2: ${p2Score}<br>Player 2 Wins!`;
      return myOutputValue;
    } else {
      myOutputValue = `Player 1: ${p1Score}<br>Player 2: ${p2Score}<br>It's a Tie!`;
      return myOutputValue;
    }
  }
};

var diceRoll = function () {
  var randomDiceNumer = Math.floor(Math.random() * 6) + 1;
  return randomDiceNumer;
};
