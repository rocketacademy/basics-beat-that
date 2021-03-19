// first initialise first player mode
var mode = 'dice roll Mode';

// tracking of players
var player = 1;

// player 1 array for dice roll storage
var rS1 = [];
var rS2 = [];

// player 2 array for dice roll storage
var rS3 = [];
var rS4 = [];

// player 1 and 2 number
var p1num = '';
var p2num = '';

// random dice generator for two dice
var generateDice1 = function () {
  var diceOne = Math.floor(Math.random() * 6) + 1;
  return diceOne;
};

var generateDice2 = function () {
  var diceTwo = Math.floor(Math.random() * 6) + 1;
  return diceTwo;
};

var main = function (input) {
  // push random dice rolls to each array

  // dice roll mode 1
  if (input == '') {
    rS1.push(generateDice1());
    rS2.push(generateDice2());
    mode = 'player 1';
    return 'Player 1' + '<br><br>' + 'Dice 1: You rolled ' + rS1[rS1.length - 1] + ' 🎲' + '<br><br>' + 'Dice 2: You rolled ' + rS2[rS2.length - 1] + ' 🎲' + '<br><br>' + 'Type either "dice1" or "dice2" to pick your first numeral of the combined number';
  }

  // user picks the dice
  if (input == 'dice1') {
    return 'Player 1 your number is ' + (rS1[rS1.length - 1]) + (rS2[rS2.length - 1]) + '<br>' + 'Please type "end" to switch to player 2';
  }

  if (input == 'dice2') {
    return 'Player 1 your number is ' + rS2[rS2.length - 1] + rS1[rS1.length - 1] + '<br>' + 'Please type "end" to switch to player 2';
  }

  if (mode == 'player 1') {
    if (input == '') {
      mode = 'player 2';
      rS3.push(generateDice1());
      rS4.push(generateDice2());
      return 'Player 2' + '<br><br>' + 'Dice 1: You rolled ' + rS3[rS3.length - 1] + ' 🎲' + '<br><br>' + 'Dice 2: You rolled ' + rS4[rS4.length - 1] + ' 🎲' + '<br><br>' + 'Type either "dice1" or "dice2" to pick your first numeral of the combined number';
    }
    var counter = 0;
    while (counter < (input == 'end')) {
      counter = counter + 1; }

    if (input == 'dice1') {
      mode = 'player 2 d1 pick mode';
      return 'Player 2 your number is ' + (rS3[rS3.length - 1]) + (rS4[rS4.length - 1]);
    }

    if (input == 'dice2') {
      mode = 'player 2 d2 pick mode';
      return 'Player 2 your number is ' + (rS4[rS4.length - 1]) + (rS3[rS3.length - 1]);
    }
  }
};

/*
var combineDice = function () {
// user picks the dice
  if (input == 'dice1') {
    mode = 'player 2 d1 pick mode';
    return 'Player 2 your number is ' + (rS3[rS3.length - 1]) + (rS4[rS4.length - 1]);
  }

  if (input == 'dice2') {
    mode = 'player 2 d2 pick mode';
    return 'Player 2 your number is ' + (rS4[rS4.length - 1]) + (rS3[rS3.length - 1]);
  }
}; */
