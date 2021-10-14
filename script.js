var player1Score = 0;
var player2Score = 0;
var player1DiceArray = [];
var player2DiceArray = [];
var diceOrder1 = "";
var diceOrder2 = "";
var currentPlayer = 1;

var diceRoll = function (num) {
  var randomDecimal = Math.random() * num;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var whoWins = function () {
  var diceOrderPlayer1 = Number(diceOrder1);
  var diceOrderPlayer2 = Number(diceOrder2);

  if (diceOrderPlayer1 > diceOrderPlayer2) {
    return `Player 1 order is ${diceOrderPlayer1}. <br/>Player 1 wins.<br/>Next up is Player 1, please press submit to roll`;
  }
  if (diceOrderPlayer2 > diceOrderPlayer1) {
    return `Player 1 order is ${diceOrderPlayer1}. <br/>Player 2 wins.<br/> Next up is Player 1, please press submit to roll`;
  }
};

var main = function (input) {
  console.log(currentPlayer);

  // players roll 2 dices and outputs to player to decide diceRoll1 to be 1st or 2nd in combination.
  if (currentPlayer == 1 && input == "") {
    var myOutputValue;
    var diceRoll1 = diceRoll(6);
    player1DiceArray.push(diceRoll1);
    var diceRoll2 = diceRoll(6);
    player1DiceArray.push(diceRoll2);
    myOutputValue = `Player 1, you rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br> Choose Dice 1 or Dice 2 to be first order.`;
    return myOutputValue;
  }

  if (currentPlayer == 2 && input == "") {
    var myOutputValue;
    diceRoll1 = diceRoll(6);
    player2DiceArray.push(diceRoll1);
    diceRoll2 = diceRoll(6);
    player2DiceArray.push(diceRoll2);
    myOutputValue = `Player 2, you rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br> Choose Dice 1 or Dice 2 to be first order.`;
    return myOutputValue;
  }

  // player 1 to choose order
  if (currentPlayer == 1 && (input == "Dice 1" || input == "Dice 2")) {
    myOutputValue = player1Check(input, diceRoll1, diceRoll2);
    currentPlayer = 2;
    return myOutputValue;
  }

  // player 2 to choose order
  if (currentPlayer == 2 && (input == "Dice 1" || input == "Dice 2")) {
    console.log(currentPlayer);
    myOutputValue = player2Check(input, diceRoll1, diceRoll2);
    currentPlayer = 1;
    var winningPlayer = whoWins();
    return myOutputValue + " " + winningPlayer;
  }
};

//Player 1
var player1Check = function (input) {
  if (input == "Dice 1") {
    diceOrder1 = "".concat(player1DiceArray[0], player1DiceArray[1]);

    var outputValue = `Player 1 has chosen the order of ${diceOrder1}. <br/>Now next up is Player 2.<br/> Player 2, please click submit to roll`;

    console.log(outputValue);
  } else {
    diceOrder1 = "".concat(player1DiceArray[1], player1DiceArray[0]);
    outputValue = `Player 1 has chosen the order of ${diceOrder1}.<br/> Now next up is Player 2.<br/> Player 2, please click submit to roll`;
  }
  console.log(outputValue);
  return outputValue;
};

var player2Check = function (input) {
  if (input == "Dice 1") {
    diceOrder2 = "".concat(player2DiceArray[0], player2DiceArray[1]);

    myOutputValue = `Player 2 has chosen the order of ${diceOrder2}.`;
  } else {
    diceOrder2 = "".concat(player2DiceArray[1], player2DiceArray[0]);

    myOutputValue = `Player 2 has chosen the order of ${diceOrder2}.`;
  }
  return myOutputValue;
};
