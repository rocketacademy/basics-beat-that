//Global Variable to control game modes
stateManager = "instructions";

var main = function (input) {
  //if block to give instruction to player and change the mode to player one
  if (stateManager == "instructions") {
    stateManager == "playerOne";
    return `Please click submit to roll the dice`;
  }

  var myOutputValue = "hello world";
  return myOutputValue;
};

//Function to simulate dice rolling
//Input not required
var diceRoll = function () {
  //Library command to generate random decimal from 0 to 5.999999
  var randomDec = Math.random() * 6;
  //Library command to round down the decimal to an integer
  var randomInt = Math.floor(randomDec);
  //For random result to be min 1 and max 6
  var diceNum = randomInt + 1;
  return diceNum;
};
