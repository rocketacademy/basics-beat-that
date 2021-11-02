//fixed variables
var NORMAL = "normal";
var LOWESTWINS = "lowest wins";
var ROLLDICE = "roll dice";
var GENERATE = "generate";

//variables
var section = ROLLDICE;
var num = [];
var player1array = [];
var player2array = [];
var player1sum = 0;
var player2sum = 0;
var player = 1;
var gameMode = "";
var roll = 0;
var diceRolls = 0;

var main = function (input) {
  if (!gameMode) {
    if (!input) {
      return pickMode;
    }

    if (!(input == NORMAL || input == LOWESTWINS)) {
      return "Incorrect input. <br>" + pickMode;
    }

    gameMode = input;
    return " Welcome players, press submit start the game";
  }

  if (diceRolls == 0) {
    if (!input) {
      return "Please input how many times you want to roll the dice";
    }

    if (isNaN(input)) {
      return "Please input a number!";
    }

    diceRolls = input;
    return `We will be rolling the dice ${diceRolls} number of times <br> Press submit to continue!`;
  }

  if (section == ROLLDICE) {
    var currentRolls = 1;
    while (currentRolls <= diceRolls) {
      roll = randomNumber();
      console.log("Roll", roll);
      num.push(roll);
      console.log(num);
      currentRolls += 1;
    }

    if (player == 1) {
      player1array = num;
      num = [];
      player = 2;
      return `Player 1, you rolled ${diceRolls} times and your numbers is ${player1array}! <br> Press submit to continue `;
    }

    if (player == 2) {
      player2array = num;
      num = [];
      section = GENERATE;
      return `Player 2, you rolled ${diceRolls} times and your numbers is ${player2array} <br> Press submit to continue`;
    }
  }

  if (section == GENERATE) {
    player1array.sort(function (a, b) {
      return b - a;
    });
    player2array.sort(function (a, b) {
      return b - a;
    });
    var player1num = combineNumber(diceRolls, player1array);
    console.log("Player 1 numbers sorted", player1num);
    var player2num = combineNumber(diceRolls, player2array);
    console.log("Player 2 numbers sorted", player2num);
    player = 1;
    section = ROLLDICE;
    player1sum += player1num;
    player2sum += player2num;
    var myOutputValue =
      leaderBoard(player1num, player2num, player1sum, player2sum) +
      "<br> Press submit to start a new game!";
    return myOutputValue;
  }
};

//generate numbers and automatucally generate the highest
var combineNumber = function (diceRolls, array) {
  var pos = 1;
  var combinednumber = array[0];
  while (pos < diceRolls) {
    combinednumber = Number(String(combinednumber) + String(array[pos]));
    pos += 1;
  }
  return combinednumber;
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

//Messages
var pickMode = "Please input: 'normal' or 'lowest wins'";
var player1Message = function (num1, sum1) {
  return `Player 1 number: ${num1} <br> Player 1 total: ${sum1} <br>`;
};

var player2Message = function (num1, sum1) {
  return `Player 2 number: ${num1} <br> Player 2 total: ${sum1} <br> `;
};

var leaderBoard = function (num1, num2, sum1, sum2) {
  if (gameMode == NORMAL) {
    if (sum1 > sum2 || sum1 == sum2) {
      return (
        "Player 1 is leading! <br>" +
        player1Message(num1, sum1) +
        player2Message(num2, sum2)
      );
    }

    if (sum2 > sum1) {
      return (
        "Player 2 is leading! <br>" +
        player2Message(num2, sum2) +
        player1Message(num1, sum1)
      );
    }
  }

  if (gameMode == LOWESTWINS) {
    if (sum1 < sum2 || sum1 == sum2) {
      return (
        "Player 1 is leading! <br>" +
        player1Message(num1, sum1) +
        player2Message(num2, sum2)
      );
    }
    if (sum2 < sum1) {
      return (
        "Player 2 is leading! <br>" +
        player2Message(num2, sum2) +
        player1Message(num1, sum1)
      );
    }
  }
};
