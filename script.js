var gameMode_DiceRoll = "gameMode_DiceRoll";
var gameMode_DiceOrder = "gameMode_DiceOrder";
var gameMode = gameMode_DiceRoll;
var player = 1;
var dice = [];
var dice1 = [];
var dice2 = [];
var player1Num;
var player2Num;
var score1 = 0;
var score2 = 0;

var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomRoll = Math.floor(randomNumber) + 1;
  return randomRoll;
};

var diceRollTwice = function () {
  var diceRolls = [diceRoll(), diceRoll()];
  return diceRolls;
};

var joinNumber = function (digit1, digit2) {
  return Number(String(digit1) + String(digit2));
};

var numberOrder = function (firstDigit, dice1, dice2) {
  var array;
  if (player == 1) {
    array = dice1;
  } else {
    array = dice2;
  }
  var playerNum;
  if (firstDigit == 1) {
    playerNum = joinNumber(array[0], array[1]);
  } else {
    playerNum = joinNumber(array[1], array[0]);
  }
  if (player == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }

  return playerNum;
};

var chooseWinner = function (dice1, dice2) {
  if (dice1 > dice2) {
    return 1;
  }
  return 2;
};

var main = function (input) {
  var number;

  if (gameMode == gameMode_DiceRoll) {
    gameMode = gameMode_DiceOrder;
    dice = diceRollTwice();
    return `Player ${player}! <br><br> You rolled Dice 1: ${dice[0]} and Dice 2: ${dice[1]}. <br> Choose the order by entering 1 or 2 for the first digit.`;
  }

  if (gameMode == gameMode_DiceOrder) {
    var firstDigit = Number(input);
    if (input != 1 && input != 2) {
      return `Please ONLY enter 1 or 2!😡`;
    }

    if (player == 1) {
      dice1 = dice;
    } else {
      dice2 = dice;
    }

    number = numberOrder(firstDigit, dice1, dice2);
    var promptFinalNumber = `Player ${player} final number is ${number}.`;

    if (player == 1) {
      player = 2;
      dice1 = number;
      gameMode = gameMode_DiceRoll;
      return `${promptFinalNumber} <br> Player 2, please press submit to roll the dice.`;
    }
  }

  dice2 = number;
  console.log(dice1, dice2);
  var winner = chooseWinner(dice1, dice2);

  player = 1;
  gameMode = gameMode_DiceRoll;

  if (winner == 1) {
    score1 += 1;
  } else {
    score2 += 1;
  }

  return `Player 2, your final number is ${dice2}. <br><br> Player 1: ${dice1} | Player 2: ${dice2} <br> Good Job! Player ${winner} has won. <br> Player 1: ${score1} points <br> Player 2: ${score2} points. <br> Press submit to play again.`;
};
