//GLOBAL VARIABLES
var GAMEMODE = `PLAYER1`;

// Arrays for players 1 and 2
var PLAYER1ARRAY = [];
var PLAYER2ARRAY = [];

//Rolled Dice numbers to lock in the random Dice numbers
var rolledDice01 = 0;
var rolledDice02 = 0;

var main = function (input) {
  var myOutputValue = "";

  //Game play for Player 1
  if (GAMEMODE === `PLAYER1`) {
    myOutputValue = whenPlayer1Rolls(input);
    return myOutputValue;
  }
  if (GAMEMODE === `PLAYER1 CHOICE`) {
    myOutputValue = whenPlayer1ChoosesTheOrder(input);
    return myOutputValue;
  }

  //Game play for Player 2
  if (GAMEMODE === `PLAYER2`) {
    myOutputValue = whenPlayer2Rolls(input);
    return myOutputValue;
  }
  if (GAMEMODE === `PLAYER2 CHOICE`) {
    myOutputValue = whenPlayer2ChoosesTheOrder(input);
  }

  //Score board
  if (GAMEMODE === `SCOREBOARD`) {
  }
  return myOutputValue;
};

// create random dice roll from 1-6
var rollDice = function () {
  // produces a decimal starting from 0 and ending BEFORE 6 (5.999999...)
  var randomDecimal = Math.random() * 6;

  // take off the decimal -> 0 to 5
  var randomInteger = Math.floor(randomDecimal);

  // it's a number from 0 - 5 ... add 1 -> 1 to 6
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

//Functions when it's player1s turn...

//When player1 rolls the dice...
var whenPlayer1Rolls = function (input) {
  //Random Dice rolls
  diceRoll01 = rollDice();
  diceRoll02 = rollDice();

  //rolled Dice imprints the random dice rolls...
  rolledDice01 = diceRoll01;
  rolledDice02 = diceRoll02;

  GAMEMODE = `PLAYER1 CHOICE`;
  myOutputValue = `Player1s' turn!<br>You've rolled ${rolledDice01} & ${rolledDice02}<br>Please choose which one goes first by typing "1" or "2" and press submit.`;
  return myOutputValue;
};

//When player1 chooses which the order...
var whenPlayer1ChoosesTheOrder = function (order) {
  if (order !== "1" && order !== "2") {
    myOutputValue = `Please choose which one goes first by typing "1" or "2" and press submit!!!`;
    return myOutputValue;
  }

  if (order === "1") {
    GAMEMODE = `PLAYER2`;

    // add value into PLAYER1 ARRAY for future scores...
    PLAYER1ARRAY.push(rolledDice01 + rolledDice02);
    console.log(PLAYER1ARRAY);
    return `Player1! You've choosen ${rolledDice01}${rolledDice02}!<br>Now it's Player2s' turn to roll the dice.<br>
  press submit to continue.`;
  }

  if (order === "2") {
    GAMEMODE = `PLAYER2`;

    // add value into PLAYER1 ARRAY for future scores...
    PLAYER1ARRAY.push(rolledDice02 + rolledDice01);
    console.log(PLAYER1ARRAY);

    return `Player1! You've choosen ${rolledDice02}${rolledDice01}!<br>Now it's Player2s' turn to roll the dice.<br>
  press submit to continue.`;
  }
};

//Functions when it's player2s turn...

//When player2 rolls the dice...
var whenPlayer2Rolls = function (input) {
  //Random Dice rolls
  diceRoll01 = rollDice();
  diceRoll02 = rollDice();

  //rolled Dice imprints the random dice rolls...
  rolledDice01 = diceRoll01;
  rolledDice02 = diceRoll02;

  GAMEMODE = `PLAYER2 CHOICE`;
  myOutputValue = `Player2s' turn!<br>You've rolled ${rolledDice01} & ${rolledDice02}<br>Please choose which one goes first by typing "1" or "2" and press submit.`;
  return myOutputValue;
};

//When player2 chooses which the order...
var whenPlayer2ChoosesTheOrder = function (order) {
  if (order !== "1" && order !== "2") {
    myOutputValue = `Please choose which one goes first by typing "1" or "2" and press submit!!!`;
    return myOutputValue;
  }
  if (order === "1") {
    GAMEMODE = `SCOREBOARD`;

    // add value into PLAYER1 ARRAY for future scores...
    PLAYER2ARRAY.push(rolledDice01 + rolledDice02);
    console.log(PLAYER1ARRAY);
    return `Player2! You've choosen ${rolledDice01}${rolledDice02}!<br>Now lets see who has won!<br>
  press submit to continue.`;
  }

  if (order === "2") {
    GAMEMODE = `SCOREBOARD`;

    // add value into PLAYER1 ARRAY for future scores...
    PLAYER2ARRAY.push(rolledDice02 + rolledDice01);
    console.log(PLAYER1ARRAY);

    return `Player2! You've choosen ${rolledDice02}${rolledDice01}!<br>Now lets see who has won!<br>
  press submit to continue.`;
  }
};

// //Input to only select 1 or 2...
// var invalidInputs = function (nonsense) {
//   if (nonsense !== "1" && nonsense !== "2") {
//     myOutputValue = `Please choose which one goes first by typing "1" or "2" and press submit!!!`;
//     return myOutputValue;
//   }
// };
