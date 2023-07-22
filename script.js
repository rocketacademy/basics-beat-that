//player 1 wants to roll dice 1 and dice 2
//player 1 wants to choose dice 1 or dice 2
var player1Value = 0;
var player2Value = 0;
var dice1 = diceRoll();
var dice2 = diceRoll();
var mode = "player1 roll dice";

function diceRoll() {
  var integer = Math.floor(Math.random() * 6) + 1;
  return integer;
}

function display(dice1, roll2) {
  return `Current player roll ${dice1} for Dice 1 and ${roll2} for Dice 2.<br>Choose order of the dice.<br><br>Type '1' for Dice 1 or '2' for Dice 2`;
}

function playerSelectDice(playerSelect) {
  var outputNumber = 0;
  if (playerSelect == 1) {
    outputNumber = dice1 * 10 + dice2;
    return outputNumber;
  } else if (playerSelect == 2) {
    outputNumber = dice2 * 10 + dice1;
    console.log(outputNumber);
    return outputNumber;
  }
}
var main = function (input) {
  var myOutputValue = "";

  if (mode == "player1 roll dice") {
    myOutputValue = display(dice1, dice2);
    mode = "player1 enter 1 or 2";
    return myOutputValue;
  } else if (mode == "player1 enter 1 or 2") {
    if (input == 1 || input == 2) {
      player1Value = playerSelectDice(input);
      myOutputValue = `Player 1 roll ${player1Value}.<br><br>Player 2's turn, Player 2 click submit to roll.`;
      mode = "player2 roll dice";
      return myOutputValue;
    } else {
      var myOutputValue = "Enter '1' or '2'.";
      return myOutputValue;
    }
  } else if (mode == "player2 roll dice") {
    dice1 = diceRoll();
    dice2 = diceRoll();
    myOutputValue = display(dice1, dice2);
    mode = "player2 enter 1 or 2";
    return myOutputValue;
  } else if (mode == "player2 enter 1 or 2") {
    if (input == 1 || input == 2) {
      player2Value = playerSelectDice(input);
      mode = "determine winner";
      myOutputValue = `Player 2 roll ${player2Value}. Click Submit to determine winner.`;
      return myOutputValue;
    } else {
      var myOutputValue = "Enter '1' or '2'.";
      return myOutputValue;
    }
  } else if (mode == "determine winner") {
    if (player1Value > player2Value) {
      myOutputValue = `Player 1 Wins. Player 1 rolls ${player1Value} and Player 2 rolls ${player2Value}.`;
      return myOutputValue;
    } else if (player2Value < player1Value) {
      myOutputValue = `Player 2 Wins. Player 1 rolls ${player1Value} and Player 2 rolls${player2Value}.`;
      return myOutputValue;
    }
  }
};
