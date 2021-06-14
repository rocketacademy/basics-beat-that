var die1;
var die2;
var playersResultingNumbers = [];
var playerNumber = 0;
var mode = "dice roll";

var main = function (input) {
  if (mode == "dice roll") {
    var diceResult = roll2Dice();
    mode = "choose dice order";
    playerNumber = playerNumber + 1;
    console.log(die1 + die2);
    return `Welcome Player ${playerNumber}. <br>
     ${diceResult}`;
  } else if (mode == "choose dice order") {
    var resultingNumber;
    if (Number(input) == 1) {
      concatDiceResult = `${die1}`.concat(`${die2}`);
    } else if (Number(input) == 2) {
      concatDiceResult = `${die2}`.concat(`${die1}`);
    }
    playersResultingNumbers.push(concatDiceResult);
    mode = "dice roll";
    return `Player ${playerNumber}, you chose Dice ${input} first. <br>Your number is ${concatDiceResult}. <br>It is now Player 2's turn.`;
  }

  if (mode == "player2 dice roll") {
  }
  var myOutputValue = diceOutput;
  return myOutputValue;
};

// roll both dice
function roll2Dice() {
  die1 = rollDie();
  die2 = rollDie();
  var diceOutput = `You rolled ${die1} for Dice 1 and ${die2} for Dice 2. <br>Choose the order of the dice.`;
  return diceOutput;
}

// die rolling function setup
function getRandomInteger(max) {
  var randomDecimal = Math.random();
  var randomInteger = Math.floor(randomDecimal * max);
  return randomInteger;
}

function rollDie() {
  var randomDieFace = getRandomInteger(6) + 1;
  return randomDieFace;
}
