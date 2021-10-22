//fixed variables
CHOOSENUM = "Choose Number";
ACTUALGAME = "Actual Game";
NORMAL = "normal";
LOWESTWINS = "lowest wins";

//variables
var player1num = 0;
var player2num = 0;
var player1sum = 0;
var player2sum = 0;
var player = 1;
var section = CHOOSENUM;
var gameMode = "";
var roll1 = 0;
var roll2 = 0;

//message
var chooseOrderMessage = function (player, roll1, roll2) {
  return `Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll1} before ${roll2} <br> 2: ${roll2} before ${roll1}`;
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

  //input for player 1
  if (section == CHOOSENUM) {
    if (roll1 == 0) {
      roll1 = randomNumber();
      roll2 = randomNumber();
    }

    if (player == 1) {
      if (!input) {
        return chooseOrderMessage(player, roll1, roll2);
      }

      if (!(input == 1 || input == 2)) {
        return (
          "Incorrect input!! <br>" + chooseOrderMessage(player, roll1, roll2)
        );
      }

      var playerChoice = input;
      player1num = chosennumber(playerChoice, roll1, roll2);
      console.log("Player1 number", player1num);
      player = 2;
      roll1 = 0;
      return `Player 1, Your number is ${player1num}! <br> Player 2, please press submit to start!`;
    }

    if (player == 2) {
      if (!input) {
        return chooseOrderMessage(player, roll1, roll2);
      }

      if (!(input == 1 || input == 2)) {
        return (
          "Incorrect input!! <br>" + chooseOrderMessage(player, roll1, roll2)
        );
      }

      playerChoice = input;
      player2num = chosennumber(playerChoice, roll1, roll2);
      console.log("Player2 number", player2num);
      roll1 = 0;
      section = ACTUALGAME;
      return `Player 2, Your number is ${player2num}! <br> Player 2 please press submit to get results!`;
    }
  }

  if (section == ACTUALGAME) {
    player1sum += player1num;
    player2sum += player2num;

    if (gameMode == NORMAL) {
      var myOutputValue = `Player 2 is leading! Please press submit to start again`;

      if (player1sum > player2sum) {
        myOutputValue = `Player 1 is leading! Please submit to play again`;
      }

      if (player1sum == player2sum) {
        myOutputValue = `Its a draw! Please submit to play again`;
      }
    }

    if (gameMode == LOWESTWINS) {
      var myOutputValue = `Player 2 is leading! Please press submit to start again`;

      if (player1sum < player2sum) {
        myOutputValue = `Player 1 is leading! Please submit to play again`;
      }

      if (player1sum == player2sum) {
        myOutputValue = `Its a draw! Please submit to play again`;
      }
    }

    section = CHOOSENUM;
    player = 1;
    myOutputValue =
      `------${gameMode}------ <br><br>` +
      leaderBoard(player1num, player1sum, player2num, player2sum) +
      myOutputValue;
    return myOutputValue;
  }
};

//generate numbers
var chosennumber = function (choice, roll1, roll2) {
  if (choice == 1) {
    var chosennumber = concatenateNumber(roll1, roll2);
  }
  if (choice == 2) {
    chosennumber = concatenateNumber(roll2, roll1);
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

var leaderBoard = function (player1num, player1sum, player2num, player2sum) {
  if (player1sum > player2sum || player1sum == player2sum) {
    return `Player 1 number: ${player1num} <br> Player 1 total: ${player1sum} <br> Player 2 number: ${player2num} <br> Player 2 total: ${player2sum} <br><br>`;
  }
  if (player2sum > player1sum) {
    return `Player 2 number: ${player2num} <br> Player 2 total: ${player2sum} <br>  Player 1 number: ${player1num} <br> Player 1 total: ${player1sum} <br><br>`;
  }
};
