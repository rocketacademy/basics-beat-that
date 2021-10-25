//fixed variables
CHOOSENUM = "Choose Number";
ROLLNUM = "roll number";
NORMAL = "normal";
LOWESTWINS = "lowest wins";

//variables
var num = [];
var player1sum = 0;
var player2sum = 0;
var player = 1;
var section = ROLLNUM;
var gameMode = "";
var roll = [];

//message
var chooseOrderMessage = function (player, roll) {
  return `Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll[0]} before ${roll[1]} <br> 2: ${roll[1]} before ${roll[0]}`;
};

var main = function (input) {
  if (!gameMode) {
    if (!input) {
      return "Please input: 'normal' or 'lowest wins'";
    }

    if (!(input == NORMAL || input == LOWESTWINS)) {
      return "Incorrect input. <br> Please input: 'normal' or 'lowest wins'";
    }

    gameMode = input;
    return " Welcome players, press submit start the game";
  }

  //player1 choose the order
  if (section == ROLLNUM) {
    roll = [randomNumber(), randomNumber()];
    console.log("Roll", roll);
    section = CHOOSENUM;
  }

  if (section == CHOOSENUM) {
    if (!input || !(input == 1 || input == 2)) {
      return chooseOrderMessage(player, roll);
    }

    var playerChoice = input;
    console.log("Player's Choice", playerChoice);
    var position = player - 1;
    num[position] = chosennumber(playerChoice, roll);
    console.log("numbers", num);

    if (player == 1) {
      player = 2;
      section = ROLLNUM;
      return `Player 1, your number is ${num[0]}! <br> Player 2, Press submit to get rolls`;
    }

    if (player == 2) {
      player1sum += num[0];
      player2sum += num[1];
      var myOutputValue =
        leaderBoard(num, player1sum, player2sum) +
        "<br> Press submit to start a new game!";
      section = ROLLNUM;
      player = 1;
      return myOutputValue;
    }
  }
};

//generate numbers
var chosennumber = function (choice, roll) {
  if (choice == 1) {
    var chosennumber = concatenateNumber(roll[0], roll[1]);
  }
  if (choice == 2) {
    chosennumber = concatenateNumber(roll[1], roll[0]);
  }
  return chosennumber;
};

//concatenate numbers
var concatenateNumber = function (num1, num2) {
  var concatnum = Number(String(num1) + String(num2));
  return concatnum;
};

//random number generator
var randomNumber = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randNumber = randomInteger + 1;
  console.log(randNumber);
  return randNumber;
};

var leaderBoard = function (num, player1sum, player2sum) {
  if (gameMode == NORMAL) {
    if (player1sum > player2sum || player1sum == player2sum) {
      return `Player 1 is leading! <br> Player 1 number: ${num[0]} <br> Player 1 total: ${player1sum} <br> Player 2 number: ${num[1]} <br> Player 2 total: ${player2sum} <br><br>`;
    }
    if (player2sum > player1sum) {
      return `Player 2 is leading! <br> Player 2 number: ${num[1]} <br> Player 2 total: ${player2sum} <br>  Player 1 number: ${num[0]} <br> Player 1 total: ${player1sum} <br><br>`;
    }
  }

  if (gameMode == LOWESTWINS) {
    if (player1sum < player2sum || player1sum == player2sum) {
      return `Player 1 is leading! Player 1 number: ${num[0]} <br> Player 1 total: ${player1sum} <br> Player 2 number: ${num[1]} <br> Player 2 total: ${player2sum} <br><br>`;
    }
    if (player2sum < player1sum) {
      return `Player 2 is leading! Player 2 number: ${num[1]} <br> Player 2 total: ${player2sum} <br>  Player 1 number: ${num[0]} <br> Player 1 total: ${player1sum} <br><br>`;
    }
  }
};
