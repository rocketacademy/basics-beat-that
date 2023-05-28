var main = function (input) {
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
