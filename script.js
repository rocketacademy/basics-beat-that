//let's define the game modes
var rolldicemode = "Roll the dice";
var chooseordermode = "Choose order of dice";
var currentGameMode = rolldicemode;
// let's set a counter for the number of times each player rolled
var counter = 0;
// let's create a database to record the dice numbers rolled.
var diceNumbersRolled = [];
var diceRoll1 = "";
var diceRoll2 = "";

//
//
//
//
//
//let's define the main function
var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == rolldicemode) {
    // First we need to make sure the dice is rolled twice.
    while (counter < 2) {
      counter = counter + 1;
      //01 Activate the game by rolling the dice
      var diceNumber = diceRoll();
      console.log("dicenumber: " + diceNumber);
      //Store the dice numbers rolled
      diceNumbersRolled.push(diceNumber);
    }
    console.log("dice number data store: " + diceNumbersRolled);

    // Let's assign the dice numbers rolled to the global variables we created above.
    diceRoll1 = diceNumbersRolled[0];
    diceRoll2 = diceNumbersRolled[1];
    console.log("1st dice number: " + diceRoll1);
    console.log("2nd dice number: " + diceRoll2);

    //02 Let's tell the player what his dice roll is
    myOutputValue =
      "You rolled " +
      diceRoll1 +
      " and " +
      diceRoll2 +
      ". Choose which number you want as the first numeral of your combined number.";
    console.log("output: " + myOutputValue);
    // 03 We need to change the game mode to choosing the dice order
    currentGameMode = chooseordermode;
  }
  //
  //
  // Now let's choose the order of your dice rolled
  else if (currentGameMode == chooseordermode) {
    // If player chooses 1st dice number as first numberal
    myOutputValue = "Your combined number is " + diceRoll1 + diceRoll2;
    // If player chooses 2nd dice number as first numeral
    if (input == diceRoll2) {
      myOutputValue = "Your combined number is " + diceRoll2 + diceRoll1;
    }
    console.log("output: " + myOutputValue);
  }
};

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
