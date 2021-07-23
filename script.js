// DICE 1
var randomDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var currentGameMode = "Player 1";
console.log("current game mode", currentGameMode);

//Game
var main = function (input) {
  // Choosing Dice order function
  var diceOption = Number(input);
  console.log("dice option", diceOption);

  myOutputValue = "";
  if (currentGameMode == "Player 1") {
    // Dice's For Player 1
    var Dice1 = randomDiceRoll();
    console.log("dice 1", Dice1);

    var Dice2 = randomDiceRoll();
    console.log("dice 2", Dice2);

    var myOutputValue = `Welcome Player 1.
You rolled ${Dice1} for Dice 1 and ${Dice2} for Dice 2.
Choose the order of the dice.`;
    diceOption1 = input;
    console.log("dice option", diceOption1);

    currentGameMode = "Player 2";
  } else if (currentGameMode == "Player 2") {
    // Dice's For Player 2
    var Dice3 = randomDiceRoll();
    console.log("dice 3", Dice3);

    var Dice4 = randomDiceRoll();
    console.log("dice 4", Dice4);

    var myOutputValue = `Welcome Player 2.
You rolled ${Dice3} for Dice 1 and ${Dice4} for Dice 2.
Choose the order of the dice.`;
    diceOption2 = input;
    console.log("dice option", diceOption2);
    currentGameMode = "Comparing Dice Values";
  } else if (currentGameMode == "Comparing Dice Values") {
    if (diceOption1 > diceOption2) {
      myOutputValue = "Player 1 wins!";
    } else if (diceOption1 < diceOption2) {
      myOutputValue = "Player 2 wins!";
    }
    currentGameMode = "Player 1";
  }
  return myOutputValue;
};
