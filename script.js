// main function
// arrays of players die
var main = function (input) {
  const player1RanRolls = [];
  const player2RanRolls = [];
  // creating the largest value of the 2 dice that was rolled
  player1RanRolls.sort((a, b) => a - b);
  player2RanRolls.sort((a, b) => a - b);

  // if player 1 is going to start, player1's dice will roll
  if (input == 'Player1') {
    var player1Dice1 = Math.floor(Math.random() * 6) + 1;
    var player1Dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(player1Dice1);
    console.log(player1Dice2);
    player1RanRolls.push(player1Dice1);
    player1RanRolls.push(player1Dice2);
    console.log(player1RanRolls);
    return player1RanRolls;
  }

  // if player 2 is going to start, player2's dice will roll
  if (input == 'Player2') {
    var player2Dice1 = Math.floor(Math.random() * 6) + 1;
    var player2Dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(player2Dice1);
    console.log(player2Dice2);
    player2RanRolls.push(player2Dice1);
    player2RanRolls.push(player2Dice2);
    console.log(player2RanRolls);
    return player2RanRolls;
  }

  // this is to determine which player will win
  if (input == 'vs') {
    if (player1Dice1 > player2Dice1 || player1Dice1 == player2Dice1 && player1Dice2 > player2Dice2) {
      return 'player1 wins';
    }

    if (player1Dice1 < player2Dice1 || player1Dice1 == player2Dice1 && player1Dice2 < player2Dice2) {
      return 'player2 wins';
    }

    if (player1Dice1 == player2Dice1 && player1Dice2 == player2Dice2) {
      return 'draw';
    }
  }
};

// Dice roll
var diceRoll = function () {
  var randRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
};

// Arrays of players' rolls
const player1DiceList = [];
const player2DiceList = [];

// default number of dice rolls before game starts
var player1BaseRoll = 0;
var player2BaseRoll = 0;
