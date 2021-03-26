// intialise mode in the begining
var mode = 'player 1 mode';

// create two arrays for each dice
var player1sChanged = [];
var player2sChanged = [];
// this 'changed' name for this variable just denotes that i am gonna change this variable
// create an array for the dice concat numbers
var player1KeptDaSame = [];
var player2KeptDaSame = [];

// both players names are blank, i will clone the 'changed' array using the concat fucntion in line 32, this denotes the unchanged rolls.
// while the 'changed' variable(that is in the name in lines 5 & 6) contains the changed rolls should they want

// generate random dice roll will use this singular function to roll the dice
var randomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var main = function (input) {
  if (input == '') {
    mode = 'rolling dice mode for player 1';
    console.log(mode);
    // if in player 1 mode output randomly generated dice roll
    player1sChanged.push(randomDiceRoll(), randomDiceRoll());

    mode = 'dice concat mode for player 1';
    console.log(mode);
    console.log('type ok after you say yes or no');
    // user interface
    return 'player 1 your rolls are ' + player1sChanged + ' do you want to change the configuration of your numbers?';
  }

  var player1KeptDaSame = player1sChanged.concat(player1KeptDaSame);

  if (input == 'no' && mode == 'dice concat mode for player 1') {
    return 'your dice arrangement is the same, at' + player1KeptDaSame;
  }
  if (input == 'yes' && mode == 'dice concat mode for player 1') {
    var temp = this.player1sChanged[0];
    this.player1sChanged[0] = this.player1sChanged[1];
    this.player1sChanged[1] = temp;
    // this is a way to switch the arrangement of the members of the array when the user types 'yes'
    mode = 'now it is player 2s turn! player 1s dice configuration has been completed!';
    console.log('PLAYER 1s TURN IS OVER');
    console.log(mode);

    return 'your configuration has been changed to ' + player1sChanged;
  }
  // exact flow for player 2
  // PLAYER 1s TURN IS OVER
  if (input == 'ok') {
    mode = 'rolling dice mode for player 2';
    console.log(mode);
    // if in player 1 mode output randomly generated dice roll
    player2sChanged.push(randomDiceRoll(), randomDiceRoll());

    mode = 'dice concat mode for player 2';
    console.log(mode);
    console.log('type next after you say yes or no');
    return 'player 2 your rolls are ' + player2sChanged + ' do you want to change the configuration of your numbers?';
  }

  var player2KeptDaSame = player2sChanged.concat(player2KeptDaSame);

  if (input == 'no' && mode == 'dice concat mode for player 2') {
    return 'your dice arrangement is the same, at' + player2KeptDaSame;
  }
  if (input == 'yes' && mode == 'dice concat mode for player 2') {
    var temp = this.player2sChanged[0];
    this.player2sChanged[0] = this.player2sChanged[1];
    this.player2sChanged[1] = temp;

    mode = 'player 2s coniguration has been changed.';
    console.log('PLAYER 2S TURN IS OVER');
    return 'player 2,your configuration has been changed to ' + player2sChanged;
  }

  // PLAYER 2'S TURN IS OVER

  if (player1sChanged > player2sChanged || player1KeptDaSame > player2KeptDaSame || player1KeptDaSame > player2sChanged || player1sChanged > player2KeptDaSame && input == 'next') {
    // if  player 2 inputs next after their turn finishes we will reach this part of the game
    // i put all the possible variations of variables in all the if statements, like whether both players say yes or no respectively, i put all those situations here
    console.log('decision time');
    mode = 'player 1 wins';
    return 'congrats player 1! you win!';
  }
  if (player1sChanged == player2sChanged || player1sChanged == player2KeptDaSame || player2sChanged == player1KeptDaSame || player2KeptDaSame == player2sChanged) {
    mode = 'tie';
    return 'its a tie!!';
  }
  if (player2sChanged > player1sChanged || player2KeptDaSame > player1KeptDaSame || player2KeptDaSame > player1sChanged || player2sChanged > player1KeptDaSame) {
    mode = 'player 2 wins';
    return 'congrats player 2! you win!';
  }
  // game is now over
};
