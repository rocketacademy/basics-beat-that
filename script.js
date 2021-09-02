var currentPlayer = 1;
var gameMode = "order";

var main = function (input) {};

// select order function
var selectOrder = function (input, diceOne, diceTwo) {
  if (input == "one") {
    var str = String(diceOne) + String(diceTwo);
    return str;
  } else if (input == "two") {
    var str = String(diceTwo) + String(diceOne);
    return str;
  } else {
    return "invalid input";
  }
};

// dice function
var rollDice = function () {
  randomDecimal = Math.random() * 6;
  randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

// player turn function
var selectPlayer = function () {
  if (currentPlayer == 1) {
    return (currentPlayer = 2);
  } else {
    return (currentPlayer = 1);
  }
};

/*

After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/
