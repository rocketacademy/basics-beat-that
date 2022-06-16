// Base & comfortable only

//global variables
var gameMode = "inputUsername";
var player1Name = "";
var player2Name = "";
var user1Choice = 0;
var user2Choice = 0;
var userDice1 = 0;
var userDice2 = 0;

// Greet user before games starts
var greetUser = function (userNameInput) {
  greetMessage = `Hi ${userNameInput}, welcome to a game of Beat That! <br> Please click the submit Button to roll your dices`;
  return greetMessage;
};

// Let User know Dices & let them choose
var userChooseSequence = function (dice1, dice2) {
  string1 = dice1.toString();
  string2 = dice2.toString();
  choice1 = `${string1}${string2}`;
  choice2 = `${string2}${string1}`;
  message = `You have rolled <br>First Dice: ${dice1} <br>Second Dice: ${dice2} <br> Please type in your choice of either '${choice1}' or '${choice2}' and click submit to lock in your choice!`;
  return message;
};

// Roll Dice Function
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Compare Player 1 & 2 choices and output
var tabulateResults = function (
  player1Name,
  player2Name,
  player1score,
  player2score
) {
  if (player1score > player2score) {
    results = `${player1Name}'s score is ${player1score} <br>${player2Name}'s score is ${player2score} <br> ${player1Name} wins! Congratulations! <br> Please click Submit to play again!`;
  } else {
    results = `${player1Name}'s score is ${player1score} <br>${player2Name}'s score is ${player2score} <br> ${player2Name} wins! Congratulations! <br> Please click Submit to play again!`;
  }

  return results;
};

// // input validation
// var inputValidation = function (input, dice1, dice2) {
//   string1 = dice1.toString();
//   string2 = dice2.toString();
//   choice1 = `${string1}${string2}`;
//   choice2 = `${string2}${string1}`;
//   if (input == choice1 || input == choice2) {
//     input = Number(input);
//   } else {
//     myOutputValue = `ERROR! Only type in the choices given man`;
//     console.log(myOutputValue);
//     return myOutputValue;
//   }
// };

var main = function (input) {
  var myOutputValue = "";
  //to input username
  if (gameMode == "inputUsername") {
    myOutputValue =
      "Please enter your name and click the submit button to continue!";
    gameMode = "greetings";
    //to greet user
  } else if (gameMode == "greetings") {
    if (user1Choice == 0) {
      player1Name = input;
    } else {
      player2Name = input;
    }
    myOutputValue = greetUser(input);
    gameMode = "rollDices";
    //to roll 2 dices and show user choice of 12 or 21
  } else if (gameMode == "rollDices") {
    userDice1 = rollDice();
    userDice2 = rollDice();
    var userConsideration = userChooseSequence(userDice1, userDice2);
    myOutputValue = userConsideration;
    gameMode = "lockInChoice";
    //to store user's choice
  } else if (gameMode == "lockInChoice") {
    if (user1Choice == 0) {
      user1Choice = input;
      myOutputValue = `You have chosen ${user1Choice}, it is now Player 2's turn. Click submit button to start`;
      gameMode = "inputUsername";
    }
    //tabulate results
    else if (user1Choice != 0) {
      user2Choice = input;
      myOutputValue = tabulateResults(
        player1Name,
        player2Name,
        user1Choice,
        user2Choice
      );
      gameMode = "inputUsername";
      user1Choice = 0;
    }
  }

  return myOutputValue;
};

/* To be improved
1. Make it such that when they play again, won't have to input name
    - game straight away remembers player1 and player2 name 
2. proper reset 
3. input validation
4. more comfortable exercises */
