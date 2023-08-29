// generate a random integer between 1 to 6
var randomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var main = function (input) {
  var myOutputValue = "hello world";
  console.log(randomDiceRoll());
  return myOutputValue;
};
