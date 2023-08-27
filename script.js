//global variables
var playerOneName = "";
var playerTwoName = "";

//game mechanics
var playGame = function (diceChoice) {
  //player rolls 2 dice and shows the dice roll and convert it to string to concatenate later
  var diceRollOne = rollDice().toString();
  console.log(`dice one = ${diceRollOne}`);
  var diceRollTwo = rollDice().toString();
  console.log(`dice two = ${diceRollTwo}`);
  var combinedDice = "";
  //player pick the order to concatenate
  if (diceChoice == 1) {
    combinedDice = diceRollOne + diceRollTwo;
    return combinedDice;
  }
  combinedDice = diceRollTwo + diceRollOne;
  return combinedDice;
};

//roll dice function
var rollDice = function () {
  var randomValue = Math.random() * 6;
  var randomInteger = Math.floor(randomValue);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var playerOnePlay = playGame(input);
  return playerOnePlay;
};
