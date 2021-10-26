// global variables

var state = "state1";
var diceOne = 0;
var diceTwo = 0;
var playerNumber = 1;
var numbers = [];

/*

state1: Player rolls (Input: (anything))
state2: Player picks which is the first dice (Input: "first") and which is the second (Input: "second")
state3: Proceed to results (Input: "show results") or add a player (Input: "next player")
state4: Results is shown and reset initial variables

*/

// random dice number

var generateRandomDiceInteger = function () {
  var randomDec = Math.random() * 6;
  var randomNum = Math.ceil(randomDec);
  return randomNum;
};

// state1

var playerRolls = function () {
  // reset variables
  console.log(state);
  diceOne = 0;
  diceTwo = 0;

  diceOne = generateRandomDiceInteger();
  diceTwo = generateRandomDiceInteger();
  state = "state2";

  console.log(diceOne);
  console.log(diceTwo);

  return (
    "Welcome player " +
    playerNumber +
    ".<br> You rolled " +
    diceOne +
    " for Dice 1 " +
    "and " +
    diceTwo +
    " for Dice 2.<br>" +
    "Choose your first Dice ('1' or '2')."
  );
};

// state2

var playerSelects = function (diceNumber) {
  console.log(state);
  var output = "Please reenter Dice '1' or '2'";
  if (diceNumber == "1") {
    combinedNumber = String(diceOne) + String(diceTwo);
    output =
      "Player " +
      playerNumber +
      ", you chose Dice " +
      diceNumber +
      " first.<br>" +
      "Your number is " +
      combinedNumber +
      ".<br>" +
      "Enter 'add player' to add new players or 'results' to show results.";
    numbers.push(Number(combinedNumber));
    state = "state3";
  } else if (diceNumber == "2") {
    combinedNumber = String(diceTwo) + String(diceOne);
    output =
      "Player " +
      playerNumber +
      ", you chose Dice " +
      diceNumber +
      " first.<br>" +
      "Your number is " +
      combinedNumber +
      ".<br>" +
      "Enter 'add player' to add new players or 'show result' for results.";
    numbers.push(Number(combinedNumber));
    state = "state3";
  }

  console.log(numbers);

  return output;
};
// state3

var playerOption = function (condition) {
  console.log(state);
  var output = "Please reenter 'add player' or 'show result'";
  if (condition == "add player") {
    playerNumber += 1;

    // reset variables
    diceOne = 0;
    diceTwo = 0;

    diceOne = generateRandomDiceInteger();
    diceTwo = generateRandomDiceInteger();

    var output =
      "Welcome player " +
      playerNumber +
      ".<br> You rolled " +
      diceOne +
      " for Dice 1 " +
      "and " +
      diceTwo +
      " for Dice 2.<br>" +
      "Choose your first Dice ('1' or '2').";

    state = "state2";
  } else if (condition == "show result") {
    var highestNumber = 0;

    numbers.forEach((element) => {
      if (highestNumber < element) {
        highestNumber = element;
      }
    });

    var position = numbers.indexOf(highestNumber) + 1;
    var output =
      "The highest number is " +
      highestNumber +
      ". Player " +
      position +
      " wins. <br>" +
      "Enter anything to continue.";
    console.log("Position:" + position);
    console.log("Position:" + highestNumber);

    // reset initial variables
    state = "state1";
    diceOne = 0;
    diceTwo = 0;
    playerNumber = 1;
    score = [];
  }

  return output;
};

// main fucntion
var main = function (input) {
  var myOutputValue = "There is an error in the states.";

  if (state == "state1") {
    myOutputValue = playerRolls();
  } else if (state == "state2") {
    myOutputValue = playerSelects(input);
  } else if (state == "state3") {
    myOutputValue = playerOption(input);
  }

  return myOutputValue;
};
