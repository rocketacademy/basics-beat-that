// set the first game mode with player one
var currGameMode = "Player 1";
console.log("curr game mode", currGameMode);
var dice1 = "";
var dice2 = "";
var dice3 = "";
var dice4 = "";

// lets start the game
var main = function (input) {
  var myOutputValue = "";
  // function to choose dice order
  var diceOrder = Number(input);
  console.log("dice order", diceOrder);

  if (currGameMode == "Player 1") {
    // player 1 two random dice
    dice1 = randomDiceRoll();
    console.log("dice 1", dice1);

    dice2 = randomDiceRoll();
    console.log("dice 2", dice2);

    myOutputValue = `Hello player 1.
You rolled ${dice1} for dice 1 and ${dice2} for dice 2.
Which dice do you want to be first?`;

    currGameMode = "Player 1 Input";
    return myOutputValue;
  } else if (currGameMode == "Player 1 Input") {
    diceOrder1 = input;
    console.log("dice Order", diceOrder1);
    if (input == dice1) {
      var finalNumber = dice1.toString() + dice2.toString();
    } else if (input == dice2) {
      var finalNumber = dice2.toString() + dice1.toString();
    }
    myOutputValue = `You selected ${input} as the first dice.
      Your final number is ${finalNumber}.`;
    console.log("final number", finalNumber);

    currGameMode = "Player 2";
    return myOutputValue;
  }

  if (currGameMode == "Player 2") {
    // player 1 two random dice
    dice3 = randomDiceRoll();
    console.log("dice 3", dice3);

    dice4 = randomDiceRoll();
    console.log("dice 4", dice4);

    myOutputValue = `Hello player 2.
You rolled ${dice3} for dice 1 and ${dice4} for dice 2.
Which dice do you want to be first?`;

    currGameMode = "Player 2 Input";
    return myOutputValue;
  } else if (currGameMode == "Player 2 Input") {
    diceOrder2 = input;
    console.log("dice Order", diceOrder2);
    if (input == dice3) {
      var finalNumber = dice3.toString() + dice4.toString();
    } else if (input == dice4) {
      var finalNumber = dice4.toString() + dice3.toString();
    }
    myOutputValue = `You selected ${input} as the first dice.
      Your final number is ${finalNumber}.`;
    console.log("final number", finalNumber);

    currGameMode = "Compare P1 & P2 dice";
    return myOutputValue;

    // game mode to compare player 1 & player 2 dice
  } else if (currGameMode == "Compare P1 & P2 dice") {
    if (diceOrder1 > diceOrder2) {
      myOutputValue = "Player 1 wins!";
    } else if (diceOrder1 < diceOrder2) {
      myOutputValue = "Player 2 wins!";
    }
    currGameMode = "Player 1";
  }
  return myOutputValue;
};

// dice roll function
var randomDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
