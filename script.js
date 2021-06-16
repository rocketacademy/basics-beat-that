// Variable to store players' scores
var player1_score = [];
var player2_score = [];
// Variable for game modes
var gameMode = "player 1";
// Variable for default output value
var myOutputValue = "Hello, this game is for 2 players. Player 1 and 2 will take turns. Player 1 goes first - click submit to roll 2 dice.";


var rollDice = function(i) {
  var randNum = Math.random() * (i+1);
  var randNumber = Math.floor(randNum);
  return randNumber;
}

var main = function (input) {
  // Variable to store player's dice rolls
  var dice1 = 0;
  var dice2 = 0;
  var diceArray1 = [];

  //Mode 1: player 1 
    //roll dice twice and store both dicerolls in an array
  if (gameMode == "player 1") {
    var index = 0;
    while (index < 2) {
      diceArray1.push(rollDice(6));
      index += 1;
    }
    
    gameMode = "dice order";

    myOutputValue = `Welcome Player 1.<br>You rolled ${diceArray1[0]} for Dice 1 and ${diceArray1[1]} for Dice 2.<br>Choose the order of the dice by entering which dice goes first - 1 or 2. For example, by entering 2, you are choosing to place the second dice roll first, followed by the first dice roll.`;
    return myOutputValue;
  }

  if (gameMode == "dice order") {
    // Input validation
    if (Number(input) == 1 || Number(input) == 2 || Number(input) == NaN) {
      console.log("Invalid input. Prompt user to reenter 1 or 2")
      myOutputValue = "Please enter either 1 or 2";
      return myOutputValue;
    }

    // Set the number of the chosen dice as the first order
    var firstNum = diceArray1[input - 1];

    // Remove it from the temporary array
    diceArray1.remove(input - 1); //not working...

    // Set the number of the remaining dice as the second order
    var secondNum = diceArray1[0];

    // Concatenate the numbers into a string
    var numbersAsString = "" + firstNum + secondNum;
    console.log("Concatenated numbers to string");
    console.log(numbersAsString);

    //Convert the string to a number and push it to score board
    var numberResult = Number(numbersAsString);
    player1_score.push(numberResult);
    console.log("String to number");
    console.log(numberResult);

    // Update gamemode
    gameMode = "player 2";
    console.log("** Next game mode: player 2 **");
    console.log(gameMode);

    myOutputValue = `Player 1's result: ${numberResult}.<br> Next, it's Player 2's turn! Player 2, hit the submit button to roll 2 dices.`;
    return myOutputValue;
  }

  //Mode 2: player 2
    //roll 2 dices


    //Output
      //myOutputValue = `You rolled __ for Dice 1 and __ for Dice 2`

    //input order of dice
  
  //If player 1's dice numbers > player 2's dice numbers, player 1 wins.

  //If player 2's dice numbers > player 1's dice numbers, player 2 wins.

  //Else, it's a draw.

  return myOutputValue;
};
