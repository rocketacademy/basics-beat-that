var gameMode = "rolling dice";

var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomRoll = Math.floor(randomNumber) + 1;
  return randomRoll;
};

var main = function (input) {
  var dice1;
  var dice2;
  var player1Choice;
  var player2Choice;
  if (gameMode == "rolling dice") {
    if (!input) {
      dice1 = diceRoll();
      dice2 = diceRoll();
      gamemode = "choose order 1";
      return `you rolled ${dice1} and ${dice2}`;
    }
  }

  if (gameMode == "choose order 1") {
    if (!input && input != 1 && input != 2) {
      return `Please ONLY enter 1 or 2!😡`;
    }
    player1Choice = input;
  }
};

//global: game mode, player1/2 scores

//dice roll function
