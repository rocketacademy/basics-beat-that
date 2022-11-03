// go in = player 1
// straight aawy 2 roll dice
// input dice 1 or 2
// output what p1 chose
// p2 roll
// 2 dice
// input dice 1 2
// output p2 choice
//show results --- who wins

// create empty array
var combinedDice = [];
var dice1;
var dice2;

//generate dice roll
var diceroll = function () {
  var generateDice = Math.floor(Math.random() * 6) + 1;
  return generateDice;
};

//create combined dice

var main = function (input) {
  if (input == "") {
    dice1 = diceroll();
    dice2 = diceroll();
    console.log(dice1, dice2);
    combinedDice.push(dice1, dice2);
    console.log(combinedDice);
    return `Hi Player 1, Dice 1's value is ${dice1}. Dice 2's value is ${dice2}. Please choose 1 or 2.`;
  }
  if (input == 1) {
    return `Your value is ${dice1}${dice2}`;
  }
};
