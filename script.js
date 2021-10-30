var playerNumber = 1;
var currentGameMode = `waiting for Player 1 roll`;
var myOutputValue = "";
var P1randomDiceNumber1 = "";
var P1randomDiceNumber2 = "";
var P1results = "";
var P2randomDiceNumber1 = "";
var P2randomDiceNumber2 = "";
var P2results = "";

var main = function (input) {
  // Player 1
  if (currentGameMode == `waiting for Player 1 roll`) {
    P1randomDiceNumber1 = rollDice();
    P1randomDiceNumber2 = rollDice();
    myOutputValue = `Welcome Player 1. <br>
    You rolled ${P1randomDiceNumber1} for Dice 1 and ${P1randomDiceNumber2} for Dice 2. <br>
    Choose the order of the dice.`;
    currentGameMode = `choose order of dice`;
  } else if (currentGameMode == `choose order of dice`) {
    if (input == `Dice 1`) {
      P1results = P1randomDiceNumber1 * 10 + P1randomDiceNumber2;
      currentGameMode = `waiting for Player 2 roll`;
      myOutputValue = `Player 1, you chose Dice 1 first.<br>
      Your number is ${P1results}.<br>
      It is now Player 2's turn.`;
    } else if (input == `Dice 2`) {
      // store Dice 2 before Dice 1
      P1results = P1randomDiceNumber2 * 10 + P1randomDiceNumber1;
      currentGameMode = `waiting for Player 2 roll`;
      myOutputValue = `Player 1, you chose Dice 2 first.<br>
      Your number is ${P1results}.<br>
      It is now Player 2's turn.`;
    }
  } else if (currentGameMode == `waiting for Player 2 roll`) {
    P2randomDiceNumber1 = rollDice();
    P2randomDiceNumber2 = rollDice();
    myOutputValue = `Welcome Player 2. <br>
    You rolled ${P2randomDiceNumber1} for Dice 1 and ${P2randomDiceNumber2} for Dice 2. <br>
    Choose the order of the dice.`;
    currentGameMode = `P2 choose order of dice`;
  } else if (currentGameMode == `P2 choose order of dice`) {
    if (input == `Dice 1`) {
      P2results = P2randomDiceNumber1 * 10 + P2randomDiceNumber2;
      // store Dice 1 before Dice 2
      myOutputValue = `Player 2, you chose Dice 1 first.<br>
      Your number is ${P2results}.<br>
      Here are the results!`;
      currentGameMode = `results`;
    } else if (input == `Dice 2`) {
      // store Dice 2 before Dice 1
      P2results = P2randomDiceNumber2 * 10 + P2randomDiceNumber1;
      myOutputValue = `Player 2, you chose Dice 2 first.<br>
      Your number is ${P2results}.<br>
      Here are the results!`;
      currentGameMode = `results`;
    }
  } else if (currentGameMode == `results`) {
    if (P1results > P2results) {
      myOutputValue = `Player 1 wins!<br>
      Player 1 rolled ${P1results}.<br>
      Player 2 rolled ${P2results}`;
    }
    if (P2results > P1results) {
      myOutputValue = `Player 2 wins! <br>
      Player 1 rolled ${P1results}.<br>
      Player 2 rolled ${P2results}`;
    }
  }
  return myOutputValue;
};

var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  // it's anumber from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;

  return diceNumber;
};
