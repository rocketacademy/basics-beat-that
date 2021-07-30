var gameMode = "player1";
var player1Dice = [];
var player2Dice = [];
var player1Numb = [];
var player2Numb = [];
var player1Wins = 0;
var player2Wins = 0;

var main = function (input) {
  myOutputValue = " ";

  if (gameMode == "player1") {
    var dice1 = calDiceRoll();
    console.log(dice1);
    var dice2 = calDiceRoll();
    console.log(dice2);
    player1Dice.push(dice1);
    player1Dice.push(dice2);
    myOutputValue = `'Welcome player1 you rolled ${dice1} and ${dice2} <br> Now select a placement, 1 to place dice1 infront and 2 to place dice2 infront"`;
    gameMode = "chooseplacement1";
  } else if (gameMode == "chooseplacement1" && input == 1) {
    var numb1 = player1Dice[0] + "" + player1Dice[1];
    player1Numb.push(numb1);
    myOutputValue = "You got " + numb1;
    gameMode = "player2";
  } else if (gameMode == "chooseplacement1" && input == 2) {
    var numb2 = player1Dice[1] + "" + player1Dice[0];
    player1Numb.push(numb2);
    console.log(numb2);
    myOutputValue = "You got " + numb2;
    gameMode = "player2";
  }

  if (gameMode == "player2") {
    var dice1 = calDiceRoll();
    console.log(dice1);
    var dice2 = calDiceRoll();
    console.log(dice2);
    player2Dice.push(dice1);
    player2Dice.push(dice2);
    myOutputValue = `'Welcome player2 you rolled ${dice1} and ${dice2} <br> Now select a placement, 1 to place dice1 infront and 2 to place dice2 infront"`;
    gameMode = "chooseplacement2";
  } else if (gameMode == "chooseplacement2" && input == 1) {
    var numb3 = player2Dice[0] + "" + player2Dice[1];
    player2Numb.push(numb3);
    myOutputValue = "You got " + numb3 + " Decide the winner now";
    gameMode = "deciding";
  } else if (gameMode == "chooseplacement2" && input == 2) {
    var numb4 = player2Dice[1] + "" + player2Dice[0];
    player2Numb.push(numb4);
    myOutputValue = "You got " + numb4 + " Decide the winner now";
    gameMode = "deciding";
  }

  if (gameMode == "deciding") {
    var winner = calWinner(player1Numb, player2Numb);
    myOutputValue =
      "The winner is " +
      winner +
      "<br>" +
      " The scores are: " +
      "<br>" +
      "Player 1: " +
      player1Wins +
      "<br>" +
      " Player 2: " +
      player2Wins;
    player1Dice = [];
    player2Dice = [];
    player1Numb = [];
    player2Numb = [];
    gameMode = "player1";
  }
  return myOutputValue;
};

var calDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

var calWinner = function (player1Numb, player2Numb) {
  myOutputValue = " ";
  if (player1Numb < player2Numb) {
    myOutputValue = "Player 2";
    player2Wins += 1;
  } else if (player1Numb > player2Numb) {
    myOutputValue = "Player 1";
    player1Wins += 1;
  }
  return myOutputValue;
};
