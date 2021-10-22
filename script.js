//fixed variables
CHOOSENUM = "Choose Number";
ACTUALGAME = "Actual Game";

var player1num = 0;
var player2num = 0;
var player = 1;
var section = CHOOSENUM;
var roll1 = 0;
var roll2 = 0;

//variables
var main = function (input) {
  //input for player 1
  if (section == CHOOSENUM) {
    if (player == 1) {
      if (!input) {
        roll1 = randomNumber();
        console.log("Player 1", roll1);
        roll2 = randomNumber();
        console.log("Player 1", roll2);
        return `Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll1} before ${roll2} <br> 2: ${roll2} before ${roll1}`;
      }

      if (!(input == 1 || input == 2)) {
        return `Incorrect input!! <br> Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll1} before ${roll2} <br> 2: ${roll2} before ${roll1}`;
      }

      var playerChoice = input;
      player1num = chosennumber(playerChoice, roll1, roll2);
      console.log("Player1 number", player1num);
      player = 2;
      return `Player 1, Your number is ${player1num}! <br> Player 2, please press submit to start!`;
    }

    if (player == 2) {
      if (!input) {
        roll1 = randomNumber();
        console.log("Player 2", roll1);
        roll2 = randomNumber();
        console.log("Player 2", roll2);
        return `Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll1} before ${roll2} <br> 2: ${roll2} before ${roll1}`;
      }

      if (!(input == 1 || input == 2)) {
        return `Incorrect input!! <br> Player ${player}, please choose the order which order you want. Either <br><br> 1: ${roll1} before ${roll2} <br> 2: ${roll2} before ${roll1}`;
      }

      playerChoice = input;
      player2num = chosennumber(playerChoice, roll1, roll2);
      console.log("Player2 number", player2num);
      section = ACTUALGAME;
      return `Player 2, Your number is ${player2num}! <br> Player 2 please press submit to get results!`;
    }
  }

  if (section == ACTUALGAME) {
    var myOutputValue = `Player 1 you have lost! Please press submit to start again`;

    if (player1num > player2num) {
      myOutputValue = `Player 1, you have won! Please submit to play again`;
    }

    if (player1num == player2num) {
      myOutputValue = `Its a draw!`;
    }
  }
  section = CHOOSENUM;
  player = 1;
  myOutputValue =
    `Player 1 number: ${player1num} <br> Player 2 number: ${player2num} <br><br>` +
    myOutputValue;
  return myOutputValue;
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
