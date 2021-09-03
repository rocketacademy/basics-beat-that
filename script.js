var player1Choice = 0;
var player2Choice = 0;
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var userName1 = "";
var userName2 = "";

var main = function (input) {
  var myOutputValue = "Come on... read the instructions!! Refresh to restart.";
  if (userName1 == "") {
    var typeUserName1 = setUserName1(input);
    return typeUserName1;
  }
  if (userName2 == "") {
    var typeUserName2 = setUserName2(input);
    return typeUserName2;
  }
  if (player1Choice == 0) {
    var player1GameTurn = player1Game(input);
    return player1GameTurn;
  }
  if (player2Choice == 0) {
    var player2GameTurn = player2Game(input);
    return player2GameTurn;
  }
  if (player1Choice > player2Choice) {
    myOutputValue = `${userName1} won with a score of ${player1Choice} while ${userName2} lose with a score of ${player2Choice}! Congrats lucky winner ${userName1}!!`;
    return myOutputValue;
  }
  if (player2Choice > player1Choice) {
    myOutputValue = `${userName2} won with a score of ${player2Choice} while ${userName1} lose with a score of ${player1Choice}! Congrats lucky winner ${userName2}!!`;
    player1Choice = 0;
    player2Choice = 0;
    player1Dice1 = 0;
    player1Dice2 = 0;
    player2Dice1 = 0;
    player2Dice2 = 0;
    userName1 = "";
    userName2 = "";
    return myOutputValue;
  }
  return myOutputValue;
};

var player1Game = function (input) {
  if (player1Dice1 == 0 && player1Dice2 == 0) {
    var player1Throw = player1Turn();
    return player1Throw;
  }
  if (
    input == "Dice 1" ||
    input == "dice 1" ||
    input == "Dice1" ||
    input == "dice1" ||
    input == 1
  ) {
    console.log("player1Dice1");
    console.log(player1Dice1);
    console.log("player1Dice2");
    console.log(player1Dice2);
    player1Choice = `${player1Dice1}${player1Dice2}`;
    player1Choice = Number(player1Choice);
    console.log("player1Choice");
    console.log(player1Choice);
    myOutputValue = `${userName1} chose Dice 1 to be the first number! Your score is now ${player1Choice}. <br><br> Now click 'Submit' while looking away because it's ${userName2}'s turn.`;
    return myOutputValue;
  }
  if (
    input == "Dice 2" ||
    input == "dice 2" ||
    input == "Dice2" ||
    input == "dice2" ||
    input == 2
  ) {
    console.log("player1Dice1");
    console.log(player1Dice1);
    console.log("player1Dice2");
    console.log(player1Dice2);
    player1Choice = `${player1Dice2}${player1Dice1}`;
    player1Choice = Number(player1Choice);
    console.log("player1Choice");
    console.log(player1Choice);
    myOutputValue = `${userName1} chose Dice 2 to be the first number! Your score is now ${player1Choice}. <br><br> Now click 'Submit' while looking away because it's ${userName2}'s turn.`;
    return myOutputValue;
  }
  return `Come on! Pay attention man, please key in either '1' or '2'!`;
};

var player2Game = function (input) {
  if (player2Dice1 == 0 && player2Dice2 == 0) {
    var player2Throw = player2Turn();
    return player2Throw;
  }
  if (
    input == "Dice 1" ||
    input == "dice 1" ||
    input == "Dice1" ||
    input == "dice1" ||
    input == 1
  ) {
    console.log("player2Dice1");
    console.log(player2Dice1);
    console.log("player2Dice2");
    console.log(player2Dice2);
    player2Choice = `${player2Dice1}${player2Dice2}`;
    player2Choice = Number(player2Choice);
    console.log("player2Choice");
    console.log(player2Choice);
    myOutputValue = `${userName2} chose Dice 1 to be the first number! Your score is now ${player2Choice}. <br><br> Now, let's click 'Submit' and compare the scores!`;
    return myOutputValue;
  }
  if (
    input == "Dice 2" ||
    input == "dice 2" ||
    input == "Dice2" ||
    input == "dice2" ||
    input == 2
  ) {
    console.log("player2Dice1");
    console.log(player2Dice1);
    console.log("player2Dice2");
    console.log(player2Dice2);
    player2Choice = `${player2Dice2}${player2Dice1}`;
    player2Choice = Number(player2Choice);
    console.log("player2Choice");
    console.log(player2Choice);
    myOutputValue = `${userName2} chose Dice 2 to be the first number! Your score is now ${player2Choice}. <br><br> Now, let's click 'Submit' and compare the scores!`;
    return myOutputValue;
  }
  return `Come on! Pay attention man, please key in either '1' or '2'!`;
};

// setting of the player 1 username. assumption is user cannot not type or key in 1 space
var setUserName1 = function (input) {
  if (input == "" || input == " ") {
    myOutputValue = `Player 1 please set a username first by typing your username in the input box.`;
    return myOutputValue;
  }
  userName1 = input.bold();
  myOutputValue = `Player 1 name is ${userName1}. Player 2 please set a username now.`;
  return myOutputValue;
};

// setting of the player 2 username. assumption is user cannot not type or key in 1 space
var setUserName2 = function (input) {
  if (input == "" || input == " ") {
    myOutputValue = `Player 2 please set a username first by typing your username in the input box.`;
    return myOutputValue;
  }
  userName2 = input.bold();
  myOutputValue = `Player 2 name is ${userName2}. <br><br> Are you ${userName1} (player 1) and ${userName2} (player 2) ready because we are going to ... Beat That!! <br><br> ${userName1} please click 'Submit' to start the game BUT FIRST, ${userName2} scoot away, no peeking!!`;
  return myOutputValue;
};

//player 1 dice throw numbers
var player1Turn = function () {
  var throwDice1 = dice1();
  var throwDice2 = dice2();
  player1Dice1 = throwDice1;
  player1Dice2 = throwDice2;
  console.log("Player 1 DiceRoll 1");
  console.log(player1Dice1);
  console.log("Player 1 DiceRoll 2");
  console.log(player1Dice2);
  myOutputValue = `Alrighty ${userName1}! <br> You rolled '${player1Dice1}' for Dice 1 and '${player1Dice2}' for Dice 2. <br> Now, choose the order of the dice. <br><br>Do you want 'Dice 1' or 'Dice 2' to be the first number?`;
  return myOutputValue;
};

//player 2 dice throw numbers
var player2Turn = function () {
  var throwDice1 = dice1();
  var throwDice2 = dice2();
  player2Dice1 = throwDice1;
  player2Dice2 = throwDice2;
  console.log("Player 2 DiceRoll 1");
  console.log(player2Dice1);
  console.log("Player 2 DiceRoll 2");
  console.log(player2Dice2);
  myOutputValue = `Alrighty ${userName2}! <br> You rolled '${player2Dice1}' for Dice 1 and '${player2Dice2}' for Dice 2. <br> Now, choose the order of the dice. <br><br>Do you want 'Dice 1' or 'Dice 2' to be the first number?`;
  return myOutputValue;
};

// dice1 throw
var dice1 = function () {
  var diceRoll1 = randomThrow();
  return diceRoll1;
};

//dice2 throw
var dice2 = function () {
  var diceRoll2 = randomThrow();
  return diceRoll2;
};

// dice throw of values 1-6
var randomThrow = function () {
  // random number between 0-1 then multiple by 3
  var randomDecimal = Math.random() * 6;
  // rounding down the value to the nearest integer
  var randomInteger = Math.floor(randomDecimal);
  // creating a range from 1-3
  var finalThrow = randomInteger + 1;
  return finalThrow;
};
