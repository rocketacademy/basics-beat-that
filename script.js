// there are 2 players, and players take turns
// when a player clicks submit, the game rolls 2 dice and shows the dice rolls
// player picks the order of the dice they want
// after both players have rolled and chosen dice order, the player with the higher combined number wins

var currentGameMode = "start of game";
var userName1 = "";
var userName2 = "";
var myOutputValue = "";
var p1Roll2 = "";
var p1Roll2 = "";
var p2Roll1 = "";
var p2Roll2 = "";
var p1Number = "";
var p2Number = "";

// separate out different game modes
// mode: start of game

var startOfGame = function () {
  currentGameMode = "waiting for player 1 name";
  return `Welcome! What is Player 1's name?`;
};

// mode: waiting for player 1's name

var checkPlayerOneName = function (input) {
  userName1 = input;
  if (userName1 == "") {
    return "Please enter your name!";
  } else {
    currentGameMode = "waiting for player 2 name";
    return `Welcome, ${userName1}! What is Player 2's Name?.`;
  }
};

// mode: waiting for player 2's name

var checkPlayerTwoName = function (input) {
  userName2 = input;
  if (userName2 == "") {
    return "Please enter your name!";
  } else {
    currentGameMode = "player 1 roll 1";
    return `Welcome, ${userName1} and ${userName2}. ${userName1} will go first. Click Submit to roll your first die, ${userName1}!`;
  }
};

// function to roll dice

var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  return randomInteger + 1;
};

// player one rolls dice

var playerOneRollOne = function () {
  currentGameMode = "player 1 roll 2";
  p1Roll1 = rollDice();
  return `${userName1} your first roll is ${p1Roll1}. Click Submit to roll again.`;
};

var playerOneRollTwo = function () {
  currentGameMode = "player 1 choose number";
  p1Roll2 = rollDice();
  return `${userName1} your second roll is ${p1Roll2}. Please input which number you'd like to place first!`;
};

// player one choose number

var playerOneChooseNumber = function (input) {
  if (input == p1Roll1) {
    currentGameMode = "player 2 roll 1";
    p1Number = p1Roll1.toString() + p1Roll2.toString();
    return `${userName1} chose ${p1Roll1} as your first number. Your final number is ${p1Number}. Now it's ${userName2}'s turn! Click Submit to roll your first number, ${userName2}!`;
  }
  if (input == p1Roll2) {
    currentGameMode = "player 2 roll 1";
    p1Number = p1Roll2.toString() + p1Roll1.toString();
    return `${userName1} chose ${p1Roll2} as your first number. Your final number is ${p1Number}. Now it's ${userName2}'s turn! Click Submit to roll your first number, ${userName2}!`;
  }
  return `Please input one of the two numbers you rolled.`;
};

// player two rolls dice

var playerTwoRollOne = function () {
  currentGameMode = "player 2 roll 2";
  p2Roll1 = rollDice();
  return `${userName2} your first roll is ${p2Roll1}. Click Submit to roll again.`;
};

var playerTwoRollTwo = function () {
  currentGameMode = "player 2 choose number";
  p2Roll2 = rollDice();
  return `${userName2} your second roll is ${p2Roll2}. Please input which number you'd like to place first!`;
};

// player two choose number

var playerTwoChooseNumber = function (input) {
  if (input == p2Roll1) {
    currentGameMode = "compare numbers";
    p2Number = p2Roll1.toString() + p2Roll2.toString();
    return `${userName2} chose ${p2Roll1} as your first number. Your final number is ${p2Number}. Click Submit again to see who won!`;
  }
  if (input == p2Roll2) {
    currentGameMode = "compare numbers";
    p2Number = p2Roll2.toString() + p2Roll1.toString();
    return `${userName2} chose ${p2Roll2} as your first number. Your final number is ${p2Number}. Click Submit again to see who won!`;
  }
  return `Please input one of the two numbers you rolled.`;
};

// compare numbers and declare winner!

var compareNumbers = function () {
  if (p1Number > p2Number) {
    return `${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName1}!`;
  }
  if (p2Number > p1Number) {
    return `${userName1} got ${p1Number} and ${userName2} got ${p2Number}. The winner is ${userName2}!`;
  }
};

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == "start of game") {
    myOutputValue = startOfGame();
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

  if (currentGameMode == "player 1 roll 1") {
    myOutputValue = playerOneRollOne();
    return myOutputValue;
  }

  if (currentGameMode == "player 1 roll 2") {
    myOutputValue = playerOneRollTwo();
    return myOutputValue;
  }

  if (currentGameMode == "player 1 choose number") {
    myOutputValue = playerOneChooseNumber(input);
    return myOutputValue;
  }

  if (currentGameMode == "player 2 roll 1") {
    myOutputValue = playerTwoRollOne();
    return myOutputValue;
  }

  if (currentGameMode == "player 2 roll 2") {
    myOutputValue = playerTwoRollTwo();
    return myOutputValue;
  }

  if (currentGameMode == "player 2 choose number") {
    myOutputValue = playerTwoChooseNumber(input);
    return myOutputValue;
  }

  if (currentGameMode == "compare numbers") {
    myOutputValue = compareNumbers();
    return myOutputValue;
  }
};
