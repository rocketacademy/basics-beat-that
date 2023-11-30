var playerOneNumber = 0;
var playerTwoNumber = 0;

var currentPlayer = 'player one'
document.getElementById("myCustomText").innerHTML = `${currentPlayer}, please roll your dice.`

// HELPER FUNCTION
// function to roll a 6-sided dice and return a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
}

// HELPER FUNCTION
// function that helps to roll 2 dice and return the results in an array
var twoDiceRolls = function () {
  // defining an array for the dice roll results
  var diceResults = [];

  for (let i = 0; i < 2; i++) {
    // generating a random 6-sided dice result, and adding them to the results array
    var diceNumber = diceRoll();
    diceResults.push(diceNumber);
  }

  return diceResults;
}

var main = function (input) {

  if (currentPlayer == 'player one') {
    let diceRolls = twoDiceRolls();
    console.log(`player 1's dice rolls are ${diceRolls}`)

  }

  var myOutputValue = 'hello world';
  return myOutputValue;
};
