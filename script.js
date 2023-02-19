var playerOne = "Player 1";
var playerTwo = "Player 2";
var gameMode = "Player 1's no choice yet";
var p1DiceOne = "";
var p1DiceTwo = "";
var p2DiceOne = "";
var p2DiceTwo = "";
var pOneOrderA = [];
var pOneOrderB = [];
var pTwoOrderA = [];
var pTwoOrderB = [];
var conp1num = "";
var conp2num = "";
var p1num = "";
var p2num = "";

//Helper function : the Dice Rolls:
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//when player 1 click submit, the game rolls 2 dice
var main = function (input) {
  var OutputValue = "";

  var playerOneChoice = [];
  if (gameMode == "Player 1's no choice yet") {
    //roll the 2 dice
    var diceOne = diceRoll();
    var diceTwo = diceRoll();
    //and shows the 2 dice roll result
    var myOutputValue = `Welcome ${playerOne}. <br>You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. <br>Choose the order of the dice.`;

    //capture the dice rolls as variables and update them for global usage later
    p1DiceOne = diceOne;
    p1DiceTwo = diceTwo;

    //update the "game mode" to "player 1 going to make a choice"
    gameMode = "Player 1 makes choice";
  } else if (gameMode == "Player 1 makes choice") {
    var playerOneChoice = input;

    //Order of the dice - captured as an array:
    var pOneOrderA = [p1DiceOne, p1DiceTwo];
    var pOneOrderB = [p1DiceTwo, p1DiceOne];

    if (playerOneChoice == pOneOrderA) {
      myOutputValue = `${playerOne}, you chose Dice One first. <br> Your number is ${p1DiceOne}${p1DiceTwo}. <br> It is now ${playerTwo}'s turn`;

      //converting the choice array elements into actual numbers
      p1num = `${p1DiceOne}${p1DiceTwo}`;
      conp1num = Number(p1num);
      console.log(p1num);
      console.log(conp1num);
    } else {
      myOutputValue = `${playerOne}, you chose Dice Two first. <br> Your number is ${p1DiceTwo}${p1DiceOne}. <br> It is now ${playerTwo}'s turn`;

      //converting the choice array elements into actual numbers
      p1num = `${p1DiceTwo}${p1DiceOne}`;
      conp1num = Number(p1num);
      console.log(p1num);
      console.log(conp1num);
    }
    gameMode = "Player 2's turn"; // player 2's turn starts below
  } else if (gameMode == "Player 2's turn") {
    var playerTwoChoice = [];
    //roll the 2 dice
    var diceOne = diceRoll();
    var diceTwo = diceRoll();
    //and shows the 2 dice roll result
    var myOutputValue = `Welcome ${playerTwo}. <br>You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. <br>Choose the order of the dice.`;

    //capture the dice rolls as variables and update them for global usage later
    p2DiceOne = diceOne;
    p2DiceTwo = diceTwo;

    //update the "game mode" to "player 2 going to make a choice"
    gameMode = "Player 2 makes choice";
  } else if (gameMode == "Player 2 makes choice") {
    var playerTwoChoice = input;

    //Order of the dice - captured as an array:
    var pTwoOrderA = [p2DiceOne, p2DiceTwo];
    var pTwoOrderB = [p2DiceTwo, p2DiceOne];

    if (playerTwoChoice == pTwoOrderA) {
      myOutputValue = `${playerTwo}, you chose Dice One first. <br> Your number is ${p2DiceOne}${p2DiceTwo}. <br> Let's compare the results.`;

      //converting the choice array elements into actual numbers
      p2num = `${p2DiceOne}${p2DiceTwo}`;
      conp2num = Number(p2num);
      console.log(p2num);
      console.log(conp2num);
    } else {
      myOutputValue = `${playerTwo}, you chose Dice Two first. <br> Your number is ${p2DiceTwo}${p2DiceOne}. <br> Let's compare the results.`;

      //converting the choice array elements into actual numbers
      p2num = `${p2DiceTwo}${p2DiceOne}`;
      conp2num = Number(p2num);
      console.log(p2num);
      console.log(conp2num);
    }
    gameMode = "compare results";
  }
  //compare results
  else if (gameMode == "compare results") {
    if (conp1num > conp2num) {
      myOutputValue = `${playerOne}, you've won!`;
    } else {
      myOutputValue = `${playerTwo}, you've won!`;
    }
  }

  return myOutputValue;
};
