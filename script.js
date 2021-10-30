var main = function (input) {
  var myOutputValue = "";
  // first player rolls
  if (input == "1") userName = input;
  myOutputValue = `Welcome player ${userName}, click to start the game!`;
  console.log(`player: ${userName}`);

  // HOW TO SEPARATE BOTH PLAYERS TURNS?

  //second player rolls
  userName = input;
  if ((input = "2"))
    myOutputValue = `Welcome player ${userName}, you are the second player, click to start the game!`;
  console.log(`player: ${userName}`);

  // Part 4, choosing who wins
};

//rolls 2 dice
var twoRolls = function () {
  var firstDiceroll = diceRoll();
  var secondDiceroll = diceRoll();
  var myOutputValue = "";
  myOutputValue = `You rolled ${firstDiceroll} for Dice 1 and ${secondDiceroll} for Dice 2`;
};
//dice order
var diceOrder = function () {
  myOutputValue = `Please enter which dice, first or second, to go first.`;
  if ((input = "first"))
    myOutputValue = `your number is now ${firstDiceroll} ${secondDiceroll}`;
  else if ((input = "second"))
    myOutputValue = `your number is now ${secondDiceroll} ${firstDiceroll}`;
};

// diceroll variable
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
