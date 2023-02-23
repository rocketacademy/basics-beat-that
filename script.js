var gamemode = 1;
var player1Dice = [];
var player2Dice = [];
var player1Wc = "";
var player2Wc = "";

var diceRoller = function () {
  var roll = Math.random() * 6;
  var roundDown = Math.floor(roll) + 1;
  return roundDown;
};
var newDice = function () {
  var newDices = [diceRoller(), diceRoller()];
  if (gamemode == 1) {
    player1Dice = newDices;
  } else if (gamemode == 3) {
    player2Dice = newDices;
  }
  console.log(newDices);
  return newDices;
};

var concatenateNumbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

var playerChoice = function (input) {
  if (gamemode == 2) {
    if (input == `a`) {
      player1Num = concatenateNumbers(player1Dice[0], player1Dice[1]);
    } else if (input == `b`) {
      player1Num = concatenateNumbers(player1Dice[1], player1Dice[0]);
    }
    player1Wc = player1Num;
    return player1Num;
  }
};
var playerChoice2 = function (input) {
  if (gamemode == 4) {
    if (input == `a`) {
      player2Num = concatenateNumbers(player2Dice[0], player2Dice[1]);
    } else if (input == `b`) {
      player2Num = concatenateNumbers(player2Dice[1], player2Dice[0]);
    }
    player2Wc = player2Num;
    return player2Num;
  }
};

var decider = function (input) {
  if (player1Wc > player2Wc) {
    return 1;
  } else return 2;
};
var main = function (input) {
  var dice = newDice();
  if (gamemode == 1) {
    var msg = `Hi player 1!<br/> The dices rolled ${player1Dice[0]} (a) and ${player1Dice[1]} (b) <br/> <br/> please choose which number will be the first digit to the combined number <br/><br/> you can do so by inputting a or b`;
    gamemode = 2;
  } else if (gamemode == 2) {
    msg = `player 1's number is ${playerChoice(input)}`;
    gamemode = 3;
  } else if (gamemode == 3) {
    msg = `Hi player 2, now it's your turn!<br/>The dices rolled ${player2Dice[0]} (a) and ${player2Dice[1]} (b) <br/> <br/> please choose which number will be the first digit to the combined number <br/><br/> you can do so by inputting a or b`;
    gamemode = 4;
  } else if (gamemode == 4) {
    msg = `player 2's number is ${playerChoice2(input)}`;
    gamemode = 5;
  } else if (gamemode == 5) {
    var winner = decider();
    msg = `player ${winner} wins!`;
    gamemode = 0;
  } else if (gamemode == 0) {
    player1Dice = [];
    player2Dice = [];
    gamemode = 1;
    msg = `press submit to play again!`;
  }

  return msg;
  ``;
};
