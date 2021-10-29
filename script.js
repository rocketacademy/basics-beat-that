//let's define player modes
var currentplayer = 1;
// let's create a database to store the players' numbers. Don't forget to reset this to 0 whenever you restart the game.
var playernumber = [];
var player1number = playernumber[0];
var player2number = playernumber[1];
//let's define the game modes
var rolldicemode = "Roll the dice";
var chooseordermode = "Choose order of dice";
var currentGameMode = rolldicemode;
// let's create a database to record the dice numbers rolled.
var diceNumbersRolled = [];
var diceRoll1 = "";
var diceRoll2 = "";
// set output value as a global variable.
var myOutputValue = "";

//
//
//
//
//
//let's define the main function
var main = function (input) {
  var gamecounter = 0;
  if (currentGameMode == rolldicemode) {
    // We will execute the roll dice game. We need gamecounter as a parameter as the rollDiceGame function uses this variable.
    myOutputValue = rollDiceGame(gamecounter);
    currentGameMode = chooseordermode;
  }

  // Next, let's choose the order of your dice rolled.
  else if (currentGameMode == chooseordermode) {
    // If player chooses 1st dice number as first numeral
    myOutputValue =
      "Your combined number is " +
      diceRoll1 +
      diceRoll2 +
      ".<br> <br> Click submit to continue.";
    var combinednumber = String(diceRoll1) + String(diceRoll2);

    // If player chooses 2nd dice number as first numeral
    if (input == diceRoll2) {
      myOutputValue =
        "Your combined number is " +
        diceRoll2 +
        diceRoll1 +
        ".<br> <br> Click submit to continue.";
      combinednumber = String(diceRoll2) + String(diceRoll1);
    }

    // let's push the combined number of the player into our database
    playernumber.push(combinednumber);
    console.log("player numbers array: " + playernumber);
    console.log("output: " + myOutputValue);
    console.log("combined number: " + combinednumber);
    // let's return the game mode to roll dice mode.
    currentGameMode = rolldicemode;
    // don't forget to reset the database of diceNumberRolled, because this will affect the value of the combined number which is made of up DiceRoll1 and DiceRoll2.
    diceNumbersRolled = [];

    // This is how we restart the round for player 2
    if (currentplayer == 2) {
      // change game mode to decide which is winner
      currentGameMode = "Announce Winner";
    } else {
      currentplayer = currentplayer + 1;
    }
  } else if ((currentGameMode = "Announce Winner")) {
    myOutputValue = announceWinner();
  }
  return myOutputValue;
};
//
//
//
//
//
//
var rollDiceGame = function (gamecounter) {
  console.log("player switch" + currentplayer);
  // First we need to make sure the dice is rolled twice.
  while (gamecounter < 2) {
    gamecounter = gamecounter + 1;
    //Execute the roll dice function
    var diceNumber = diceRoll();
    //Store the dice numbers rolled
    diceNumbersRolled.push(diceNumber);
    console.log("push " + diceNumber);
  }
  console.log("dice number data store: " + diceNumbersRolled);

  // Let's assign the dice numbers rolled to the global variables we created above.
  diceRoll1 = diceNumbersRolled[0];
  diceRoll2 = diceNumbersRolled[1];
  console.log("1st dice number: " + diceRoll1);
  console.log("2nd dice number: " + diceRoll2);
  return (
    "Alright Player " +
    currentplayer +
    "! <br> <br> You rolled " +
    diceRoll1 +
    " and " +
    diceRoll2 +
    ". <br> <br> Choose which number you want as the first numeral of your combined number."
  );
};
//
//
//
//
//
//
var announceWinner = function () {
  myOutputValue = "Player 1 wins! To play again, click submit.";
  if (playernumber[1] > playernumber[0]) {
    myOutputValue = "Player 2 wins! To play again, click submit.";
  }
  currentGameMode = rolldicemode;
  currentplayer = 1;
  playernumber = [];
  return myOutputValue;
};
//
//
//
//
//
//
//let's define the dice roll function
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// To-dos 1) refactor 2) create game mode for deciding winner
// Double check parameters for each function
