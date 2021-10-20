var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var messageToChoose = function (player, dice1, dice2) {
  return `${player} please decide the order of the dice you'd like to go with. Input either ${
    String(dice1) + String(dice2)
  } or ${String(dice2) + String(dice1)}.`;
};

var rollBothDie = function (player) {
  dice1 = rollDice();
  dice2 = rollDice();
  return `${player}, you rolled ${dice1} and ${dice2}. ${messageToChoose(
    player,
    dice1,
    dice2
  )}`;
};

var turn = "player 1";
var state = "beginning of game";
var myOutputValue = "";

var main = function (input) {
  if (state == "beginning of game") {
    myOutputValue = rollBothDie("player 1");
    state = "player 1 to decide number";
  } else if (state == "player 1 to decide number") {
    // Somehow inputting the right options does not allow me to move on to the next state. Something is breaking within the input validation
    if (
      input != String(dice1) + String(dice2) ||
      input != String(dice2) + String(dice1)
    ) {
      myOutputValue = `Player 1, please choose a valid input. Input either ${
        String(dice1) + String(dice2)
      } or ${String(dice2) + String(dice1)}.`;
    } else {
      state = "player 2 to roll die";
      var player1Choice = input;
      myOutputValue = `Player 1's choice is ${player1Choice}. It is your turn now player 2, click submit to roll your die.`;
    }
  } else if (state == "player 2 to roll die") {
    state = "player 2 to decide number";
    myOutputValue = rollBothDie("player 2");
  } else if (state == "player 2 to decide number") {
    if (
      input != String(dice1) + String(dice2) ||
      input != String(dice2) + String(dice1)
    ) {
      myOutputValue = `Player 2, please choose a valid input. Input either ${
        String(dice1) + String(dice2)
      } or ${String(dice2) + String(dice1)} `;
    } else {
      turn = "player 1";
      var player2Choice = input;
      state = "beginning of game";
      if (player1Choice == player2Choice) {
        myOutputValue =
          "It is a draw. Click submit for player 1 to roll his dice";
      } else if (player1Choice > player2Choice) {
        myOutputValue =
          "Player 1 won. Click submit for player 1 to roll his die";
      } else {
        myOutputValue =
          "Player 2 won. Click submit for player 1 to roll his die";
      }
    }
  }
  return myOutputValue;
};
