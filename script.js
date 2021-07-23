// there are 2 players, and players take turns
// when a player clicks submit, the game rolls 2 dice and shows the dice rolls
// player picks the order of the dice they want
// after both players have rolled and chosen dice order, the player with the higher combined number wins

var currentGameMode = "welcome message";
var overallGameMode = "";
var userName1 = "";
var userName2 = "";
var myOutputValue = "";
var p1Roll1 = "";
var p1Roll2 = "";
var p2Roll1 = "";
var p2Roll2 = "";
var p1Number = "";
var p2Number = "";
var p1NumberLow = "";
var p2NumberLow = "";
var p1WinCount = 0;
var p2WinCount = 0;

// separate out different game modes

// welcome message

var welcomeMessage = function () {
  currentGameMode = "waiting for player 1 name";
  return "Welcome! Please enter Player 1's name.";
};

// get player names first

var checkPlayerOneName = function (input) {
  userName1 = input;
  if (userName1 == "") {
    return "Please enter your name!";
  } else {
    currentGameMode = "waiting for player 2 name";
    return `Welcome, ${userName1}! What is Player 2's Name?.`;
  }
};

var checkPlayerTwoName = function (input) {
  userName2 = input;
  if (userName2 == "") {
    return "Please enter your name!";
  } else {
    currentGameMode = "explain game modes";
    return `Welcome, ${userName1} and ${userName2}. <br>
    Please click Submit to continue.`;
  }
};

// tell players about diff game modes

var explainGameModes = function () {
  currentGameMode = "select game mode";
  return `There are two modes of the game:<br>
  Highest number mode and Lowest number mode.<br>
  Please input "low" or "high" to select mode.`;
};

// get players to choose game mode

var selectGameMode = function (input) {
  if (input == "high") {
    overallGameMode = "high";
    currentGameMode = "player 1 roll dice";
    return `You have selected ${overallGameMode} mode. <br>
  ${userName1} will go first.<br>
  Click Submit to roll your dice, ${userName1}!`;
  }
  if (input == "low") {
    overallGameMode = "low";
    currentGameMode = "player 1 roll dice";
    return `You have selected ${overallGameMode} mode. <br>
  ${userName1} will go first.<br>
  Click Submit to roll your dice, ${userName1}!`;
  }
  return `Please enter a valid game mode`;
};

// function to roll dice

var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  return randomInteger + 1;
};

// player one rolls dice

var playerOneDiceRolls = function () {
  currentGameMode = "player 1 number";
  p1Roll1 = rollDice();
  p1Roll2 = rollDice();
  return `Game Mode: ${overallGameMode}.<br>
  ${userName1} your first roll is ${p1Roll1} and your second roll is ${p1Roll2}.`;
};

// automatically generate number based on game mode

var playerOneNumber = function () {
  currentGameMode = "player 2 roll dice";

  if (overallGameMode == "high") {
    if (p1Roll1 > p1Roll2) {
      p1Number = p1Roll1.toString() + p1Roll2.toString();
    }
    if (p1Roll2 > p1Roll1) {
      p1Number = p1Roll2.toString() + p1Roll1.toString();
    }
    if (p1Roll1 == p1Roll2) {
      p2Number = p1Roll2.toString() + p1Roll1.toString();
    }
  }

  if (overallGameMode == "low") {
    if (p1Roll1 < p1Roll2) {
      p1Number = p1Roll1.toString() + p1Roll2.toString();
    }
    if (p1Roll2 < p1Roll1) {
      p1Number = p1Roll2.toString() + p1Roll1.toString();
    }
    if (p1Roll1 == p1Roll2) {
      p1Number = p1Roll2.toString() + p1Roll1.toString();
    }
  }
  return `Game Mode: ${overallGameMode}.<br>
  ${userName1}, your final number is ${p1Number}. Now it's ${userName2}'s turn. Click Submit to roll your dice, ${userName2}!`;
};

// player two rolls dice

var playerTwoDiceRolls = function () {
  currentGameMode = "player 2 number";
  p2Roll1 = rollDice();
  p2Roll2 = rollDice();
  return `Game Mode: ${overallGameMode}.<br>
  ${userName2} your first roll is ${p2Roll1} and your second roll is ${p2Roll2}.`;
};

// player two rolls dice again and automatically generate player two final number

var playerTwoNumber = function () {
  currentGameMode = "compare numbers";

  if (overallGameMode == "high") {
    if (p2Roll1 > p2Roll2) {
      p2Number = p2Roll1.toString() + p2Roll2.toString();
    }
    if (p2Roll2 > p2Roll1) {
      p2Number = p2Roll2.toString() + p2Roll1.toString();
    }
    if (p2Roll1 == p2Roll2) {
      p2Number = p2Roll2.toString() + p2Roll1.toString();
    }
  }

  if (overallGameMode == "low") {
    if (p2Roll1 < p2Roll2) {
      p2Number = p2Roll1.toString() + p2Roll2.toString();
    }
    if (p2Roll2 < p2Roll1) {
      p2Number = p2Roll2.toString() + p2Roll1.toString();
    }
    if (p2Roll1 == p2Roll2) {
      p2Number = p2Roll2.toString() + p2Roll1.toString();
    }
  }
  return `Game Mode: ${overallGameMode}.<br>
  ${userName1}, your final number is ${p2Number}. Click Submit to see who won!`;
};

// compare numbers and declare winner!

var compareNumbers = function () {
  currentGameMode = "show leaderboard";

  if (overallGameMode == "high") {
    if (p1Number > p2Number) {
      p1WinCount = p1WinCount + 1;
      return `Game Mode: ${overallGameMode}.<br>
    ${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName1}!`;
    }
    if (p2Number > p1Number) {
      p2WinCount = p2WinCount + 1;
      return `Game Mode: ${overallGameMode}.<br>
    ${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName2}!`;
    }
  }
  if (overallGameMode == "low") {
    if (p1Number < p2Number) {
      p1WinCount = p1WinCount + 1;
      return `Game Mode: ${overallGameMode}.<br>
    ${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName1}!`;
    }
    if (p2Number < p1Number) {
      p2WinCount = p2WinCount + 1;
      return `Game Mode: ${overallGameMode}.<br>
    ${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName2}!`;
    }
  }
};

// show win counts so far and enable players to replay!

var showLeaderboard = function () {
  currentGameMode = "explain game modes";
  return `${userName1} has won ${p1WinCount} number of times and<br>
  ${userName2} has won ${p2WinCount} number of times so far!<br>
  Click Submit to play again!`;
};

// main function

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "welcome message") {
    myOutputValue = welcomeMessage();
    return myOutputValue;
  }

  if (currentGameMode == "waiting for player 1 name") {
    myOutputValue = checkPlayerOneName(input);
    return myOutputValue;
  }

  if (currentGameMode == "waiting for player 2 name") {
    myOutputValue = checkPlayerTwoName(input);
    return myOutputValue;
  }

  if (currentGameMode == "explain game modes") {
    myOutputValue = explainGameModes();
    return myOutputValue;
  }

  if (currentGameMode == "select game mode") {
    myOutputValue = selectGameMode(input);
    return myOutputValue;
  }

  if (currentGameMode == "player 1 roll dice") {
    myOutputValue = playerOneDiceRolls();
    return myOutputValue;
  }

  if (currentGameMode == "player 1 number") {
    myOutputValue = playerOneNumber();
    return myOutputValue;
  }

  if (currentGameMode == "player 2 roll dice") {
    myOutputValue = playerTwoDiceRolls();
    return myOutputValue;
  }

  if (currentGameMode == "player 2 number") {
    myOutputValue = playerTwoNumber();
    return myOutputValue;
  }

  if (currentGameMode == "compare numbers") {
    myOutputValue = compareNumbers();
    return myOutputValue;
  }

  if (currentGameMode == "show leaderboard") {
    myOutputValue = showLeaderboard();
    return myOutputValue;
  }
};
