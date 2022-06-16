//There is player 1
//There is player 2,
//Diceroll code
//There is an addition of numbers
//

var gamemode = "Yellow";
var player1 = [0, 0];
var player2 = [0, 0];

var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

//when game mode is in player 1,
//dice automatically rolls twice and tells player 1 what is their outcome for dice 1 and dice 2
var player1Diceroll = function () {
  player1.push(diceroll[0]);
  player1.push(diceroll[1]);
};

var main = function (input) {
  //The user types R the mode switches to red
  if (input == "r") {
    gamemode = "Please click on submit button to start";
  }
  //The user types G the mode switches to green
  if (input == "g") {
    gamemode = "green";
  }
  var myOutputValue = "Hello";
  return myOutputValue;
};
