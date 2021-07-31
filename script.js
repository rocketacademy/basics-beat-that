// DICE 1
// Math.floor(Math.random() * 6 +1);
var randomDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var currentGameMode = "Player 1 choose order";
console.log("current game mode", currentGameMode);

// initialize player dice values as global variables
var diceOption1 = 0;
var diceOption2 = 0;

//Game
var main = function (input) {
  // Choosing Dice order function
  myOutputValue = "";
  // var diceOption = Number(input);
  // console.log("dice option", diceOption);

  if (currentGameMode == "Player 1 choose order") {
    // Dice's For Player 1
    var Dice1 = randomDiceRoll();
    console.log("dice 1", Dice1);

    var Dice2 = randomDiceRoll();
    console.log("dice 2", Dice2);

    var myOutputValue = `Welcome Player 1. <br><br>
You rolled ${Dice1} for Dice 1 and ${Dice2} for Dice 2.
Choose the order of the dice.`;

    currentGameMode = "Player 1";
  } else if (currentGameMode == "Player 1") {
    diceOption1 = Number(input);
    console.log("dice option 1", diceOption1);
    currentGameMode = "Player 2";
    // Dice's For Player 2
    var Dice3 = randomDiceRoll();
    console.log("dice 3", Dice3);

    var Dice4 = randomDiceRoll();
    console.log("dice 4", Dice4);

    var myOutputValue = `Welcome Player 2.
  You rolled ${Dice3} for Dice 1 and ${Dice4} for Dice 2.
  Choose the order of the dice.`;
  } else if (currentGameMode == "Player 2") {
    diceOption2 = Number(input);
    console.log("dice option 2", diceOption2);
    console.log("dice option 1", diceOption1);
    myOutputValue = "rest station";
    //comparing dice values
    currentGameMode = "Comparing Dice Values";
  } else if (currentGameMode == "Comparing Dice Values")
    if (diceOption1 > diceOption2) {
      myOutputValue = `Congratulations! Player 1 wins. Player 1 chose ${diceOption1}. Player 2 chose ${diceOption2}. Play again`;
    } else if (diceOption1 < diceOption2) {
      myOutputValue = `Congratulations! Player 2 wins. Player 1 chose ${diceOption1}. Player 2 chose ${diceOption2}`;
    }

  return myOutputValue;
};
