var gameMode = "player 1";
var myOutputValue = "";
var playerOneNumber = 0;
var diceRollOne = 0;
var diceRollTwo = 0;
var twoDigitP1Number = 0;
var twoDigitP2Number = 0;

var diceRoll = function () {
  var diceResult = Math.floor(Math.random() * 6) + 1;
  return diceResult;
};

var determineWinner = function (p1Number, p2Number) {
  var message;
  if (p1Number > p2Number) {
    message = `Player 1 wins.`;
  } else {
    message = `Player 2 wins.`;
  }
  return message;
};

var main = function (input) {
  if (gameMode == "player 1") {
    diceRollOne = diceRoll();
    console.log(`dice roll #1 is ${diceRollOne}`);
    diceRollTwo = diceRoll();
    console.log(`dice roll #2 is ${diceRollTwo}`);
    // changes gameMode variable to prepare for next game mode: player 1's choice
    gameMode = `player 1 choice`;
    myOutputValue = `Welcome Player 1. <br>You rolled ${diceRollOne} for Dice 1 and ${diceRollTwo} for Dice 2. <br>Choose the order of the dice by entering "1" or "2"`;
  } else if (gameMode == `player 1 choice`) {
    gameMode = `player 2`;
    if (input == "1") {
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP1Number = Number(`${diceRollOne}${diceRollTwo}`);
      console.log(`The two digit player one number is ${twoDigitP1Number}.`);
      myOutputValue = `Player 1, you chose Dice 1 first. <br>Your number is ${twoDigitP1Number}. <br>It is now Player 2's turn.`;
    } else if (input == "2") {
      twoDigitP1Number = Number(`${diceRollTwo}${diceRollOne}`);
      console.log(`Player One's number is ${twoDigitP1Number}`);
      myOutputValue = `Player 1, you chose Dice 2 first. <br>Your number is ${twoDigitP1Number}. <br>It is now Player 2's turn.`;
    }
  } else if (gameMode == `player 2`) {
    diceRollOne = diceRoll();
    console.log(`dice roll #1 is ${diceRollOne}`);
    diceRollTwo = diceRoll();
    console.log(`dice roll #2 is ${diceRollTwo}`);
    // changes gameMode variable to prepare for next game mode: player 2's choice
    gameMode = `player 2 choice`;
    myOutputValue = `Welcome Player 2. <br>You rolled ${diceRollOne} for Dice 1 and ${diceRollTwo} for Dice 2. <br>Choose the order of the dice by entering "1" or "2"`;
  } else if (gameMode == `player 2 choice`) {
    var winningMessage = ``;
    if (input == "1") {
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP2Number = Number(`${diceRollOne}${diceRollTwo}`);
      console.log(`Player 2's number is ${twoDigitP2Number}.`);
      winningMessage = determineWinner(twoDigitP1Number, twoDigitP2Number);
      myOutputValue = `Player 2, you chose Dice 1 first. <br>Your number is ${twoDigitP2Number}. <br>${winningMessage}`;
    } else if (input == "2") {
      twoDigitP2Number = Number(`${diceRollTwo}${diceRollOne}`);
      console.log(`Player 2's number is ${twoDigitP2Number}`);
      winningMessage = determineWinner(twoDigitP1Number, twoDigitP2Number);
      myOutputValue = `Player 2, you chose Dice 2 first. <br>Your number is ${twoDigitP2Number}. <br>${winningMessage}`;
    }
  }
  return myOutputValue;
};
