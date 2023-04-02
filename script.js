var mode = "waiting for click";
var isANewRound = true;
var player1Num1 = [];
var player1Num2 = [];

var getRandomInteger = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var main = function (input) {
  if (mode == "waiting for click") {
    if (input) {
      myOutputValue = 'Please hit the "Submit" button to continue.';
    } else {
      mode = "player1 roll";
    }
  }
  if (mode == "player1 roll") {
    if (isANewRound) {
      player1Num1.push(getRandomInteger());
      player1Num2.push(getRandomInteger());
      myOutputValue = `Player 1's turn: <br> 
    You rolled ${player1Num1} for Dice 1 and ${player1Num2} for Dice 2. <br>
    You are about to concatenate the two digits rolled to create the largest possible number. <br>
    Enter '1' if you would like the digit in Dice 1 to be in the tens place. <br>
    Enter '2' if you would like the digit in Dice 2 to be in the tens place. <br>`;
      mode = "player1 choose dice";
      isANewRound = false;
    }
  } else if (mode == "player1 choose dice") {
    var player1Choice = input;
    if (player1Choice == 1) {
      myOutputValue = `You choose Dice 1. <br>
      Your number is ${player1Num1}${player1Num2}.`;
    } else if (player1Choice == 2) {
      myOutputValue = `You choose Dice 2. <br>
      Your number is ${player1Num2}${player1Num1}.`;
    } else {
      myOutputValue = `Please enter '1' if you want ${player1Num1} or enter '2' if you want ${player1Num2} to be in the tens place.`;
    }
  }
  return myOutputValue;
};
