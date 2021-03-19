// initialise first mode asking input
var mode = 'need input';

// two dice array for ramdom dice roll
var diceOne = [];
var diceTwo = [];

// player 1 and 2 number
var player1Dice = [];
var player2Dice = [];

// random dice generator for two dice
var generateDiceNum = function () {
  return Math.ceil(Math.random() * 6);
};

// function to concat first dice number
function concatDiceNum1() {
  return (diceOne[diceOne.length - 1]).toString() + (diceTwo[diceTwo.length - 1]).toString();
}
// function to concat second dice number
function concatDiceNum2() {
  return (diceTwo[diceTwo.length - 1]).toString() + (diceOne[diceOne.length - 1]).toString();
}

var main = function (input) {
  // if input is empty, goto need input mode
  if (input == '') {
    mode = 'need input';
    return 'To play the game: input "p1" for player 1 to roll or "p2" for player 2 to roll' + '<br>' + 'you can change to player 2 after player 1 picks the dice number.';
  }
  // if input is "p1" goto player1 mode
  if (input == 'p1') {
    mode = 'player1';
    diceOne.push(generateDiceNum());
    diceTwo.push(generateDiceNum());
    return 'Player 1' + '<br><br>' + 'Dice 1: You rolled ' + diceOne[diceOne.length - 1] + ' 🎲' + '<br><br>' + 'Dice 2: You rolled ' + diceTwo[diceTwo.length - 1] + ' 🎲' + '<br><br>' + 'Type either "dice1" or "dice2" to pick your first numeral of the combined number';
  }
  // if input is "p2" goto player2 mode
  if (input == 'p2') {
    mode = 'player2';
    diceOne.push(generateDiceNum());
    diceTwo.push(generateDiceNum());
    return 'Player 2' + '<br><br>' + 'Dice 1: You rolled ' + diceOne[diceOne.length - 1] + ' 🎲' + '<br><br>' + 'Dice 2: You rolled ' + diceTwo[diceTwo.length - 1] + ' 🎲' + '<br><br>' + 'Type either "dice1" or "dice2" to pick your first numeral of the combined number';
  }
  // if user input "dice1" goto dice1 concat mode
  if (input == 'dice1') {
    mode = 'dice1 concat mode';
    player1Dice.push(concatDiceNum1());
    return 'Your number is ' + concatDiceNum1() + '<br>' + "Input 'beat-that' to compare your number with the other player!";
  }
  // if user input "dice2" goto dice2 concat mode
  if (input == 'dice2') {
    mode = 'dice2 concat mode';
    player2Dice.push(concatDiceNum2());
    return 'Your number is ' + concatDiceNum2() + '<br>' + "Input 'beat-that' to compare your number with the other player!";
  }
  // if input is "beat-that" goto dice comparison mode
  if (input == 'beat-that') {
    mode = 'comparison mode';
    if (player1Dice.slice(-1) > player2Dice.slice(-1)) {
      return 'Player 1 dice number is: ' + player1Dice.slice(-1) + '<br>' + 'Player 2 dice number is: ' + player2Dice.slice(-1) + '<br>' + 'Player 1 Wins!';
    }
    if (player2Dice.slice(-1) > player1Dice.slice(-1)) {
      return 'Player 1 dice number is: ' + player1Dice.slice(-1) + '<br>' + 'Player 2 dice number is: ' + player2Dice.slice(-1) + '<br>' + 'Player 2 Wins!';
    }
  }
};
