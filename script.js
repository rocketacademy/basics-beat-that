//dice roll function -- VALID
var diceRoll = function () {
  // generate random number between 1 and 6, representative of the faces of the dice.
  var setRandomNumRange = Math.floor(Math.random() * 6) + 1;
  return setRandomNumRange;
};

// PLAYER 1 roll dice when submit button is clicked with empty input -- VALID
var user1AutoRoll = function (input) {
  // when input box is left blank and submit button is clicked
  if (input == "") {
    // assign random value to dice 1 for player 1
    diceRoll1 = diceRoll();
    // assign random value to dice 2 for player 1
    diceRoll2 = diceRoll();
    // assign the two dices to an array
    player1diceRoll = [diceRoll1, diceRoll2];
    // set return message in output box
    return `Welcome Player 1.<br> You rolled:<br> Dice 1:  ${player1diceRoll[0]}<br>Dice 2:  ${player1diceRoll[1]}<br>Now, choose the order of the dice.`;
  }
};

// PLAYER 2 roll dice when submit button is clicked with empty input -- VALID
var user2AutoRoll = function (input) {
  // when input box is left blank and submit button is clicked
  if (input == "") {
    // assign random value to dice 2 for player 2
    p2diceRoll1 = diceRoll();
    // assign random value to dice 2 for player 2
    p2diceRoll2 = diceRoll();
    // assign the two dices to an array
    player2diceRoll = [p2diceRoll1, p2diceRoll2];
    // set return message in output box
    return `Welcome Player 2.<br> You rolled:<br> Dice 1:  ${player2diceRoll[0]}<br>
  Dice 2:  ${player2diceRoll[1]}<br>Now, choose the order of the dice.`;
  }
};

// player 1 concatenate final value according to dice order selected -- VALID
var concatenatePlayer1 = function (input) {
  //convert input value to number data type
  var order1 = Number(input);
  // pull diceRoll array index as specified in input/order selected (minus one as array index starts at zero)
  var firstDigit1 = player1diceRoll[order1 - 1];
  // remove the value from the array that has been assigned to the first digit
  player1diceRoll.splice(order1 - 1, 1);
  // assign remaining value in array as the subsequent digit
  var secondDigit1 = player1diceRoll;
  // assign and store the final number sequence for player 1
  player1 = `${firstDigit1}${secondDigit1}`;
  // set return message
  return `Player 1, you chose Dice ${input} first.<br>Your number is ${player1}.<br>It is now Player 2's turn.<br>Click 'Submit' to start.`;
};
console.log(concatenatePlayer1);

// player 2 concatenate final value according to dice order selected -- VALID
var concatenatePlayer2 = function (input) {
  //convert input value to number data type
  var order2 = Number(input);
  // pull diceRoll array index as specified in input/order selected (minus one as array index starts at zero)
  var firstDigit2 = player2diceRoll[order2 - 1];
  // remove the value from the array that has been assigned to the first digit
  player2diceRoll.splice(order2 - 1, 1);
  // assign remaining value in array as the subsequent digit
  var secondDigit2 = player2diceRoll;
  // assign and store the final number sequence for player 1
  player2 = `${firstDigit2}${secondDigit2}`;
  // set return message
  return `${getWinMessage()}`;
};
console.log(concatenatePlayer2);

// compare the 2 numbers and decide who won -- VALID
var getWinMessage = function () {
  // if player 1 number was higher than player 2
  if (player1 > player2) {
    // winning message for player 1
    return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 1, you won!`;
  }
  // winning message for player 2
  return `Player 1's number was ${player1}.<br>Player 2's number was ${player2}.<br>
    Congratulations Player 2, you won!`;
};

// main function -- VALID
var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == "player 1 diceroll") {
    currentGameMode = "player 1 waiting for input on order of dice";
    return user1AutoRoll(input);
  }

  if (currentGameMode == "player 1 waiting for input on order of dice") {
    currentGameMode = "player 2 diceroll";
    return `${concatenatePlayer1(input)}`;
  }

  if (currentGameMode == "player 2 diceroll") {
    currentGameMode = "player 2 waiting for input on order of dice";
    return user2AutoRoll(input);
  }

  if (currentGameMode == "player 2 waiting for input on order of dice") {
    currentGameMode = "player 1 diceroll";
    return `${concatenatePlayer2(input)}`;
  }
};

var player1 = 0;
var player2 = 0;
var player1score = 0;
var player2score = 0;
var player1Name = "";
var player2Name = "";
var dice1 = 0;
var dice2 = 0;
var player1diceRoll = [];
var player2diceRoll = [];
var numOfDice = 0;
var currentGameMode = "player 1 diceroll";
// [
//   "waiting for player 1 username",
//   "waiting for player 2 username",
//   "waiting for number of dice to play",
//   "diceroll",
//   "waiting for input on order of dice",
// ];

// function for random dice
// global variable for 2 dices
// global variable for 2 player modes
//default mode is player 1
// after number is finalised, mode changes to player 2
// dice roll is auto upon submission
// input is for player to decide which dice to put in front
// convert input to number
// concantate 2 dice rolls together
// allow user to input which dice goes first
// store final concantated dice number
// compare the 2 stored dice numbers between each modes
// output message on who won.

// global variable for score
// add concantate values to each player score

// output leaderboard for each message for both players in decreasing order

// add new game mode for lowest combined number

// add function to auto generate combined number
