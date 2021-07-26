//to have a global variable that controls the game progress
var gameState = "start game";
//to have a global variable that controls the players
var currentPlayer = 1;
//global variables to save the dice numbers rolled
var num1 = 0;
var num2 = 0;
//global variables to save the combined dice numbers
var combineNum1 = 0;
var combineNum2 = 0;
//global variables to generate the total sum
var sum1 = 0;
var sum2 = 0;
//to keep track of the game mode
var gameMode = 0;

var main = function (input) {
  //welcome message
  if (gameState == "start game") {
    gameState = "input game mode";
    return `Welcome! Please choose the game mode: <br><br> 1. Highest Combined Number <br><br> 2. Lowest Combined Number <br><br> Enter the number choice.`;
  }
  //after user choose the game mode
  if (gameState == "input game mode") {
    gameState = "roll dice";
    gameMode = input;
    return `You have chosen game mode ${gameMode}. Let's play!`;
  }

  //rolling the dice and output the result
  if (gameState == "roll dice") {
    var outputMessage = generateOutputMessage();
    return outputMessage;
  }
  //if reaches here, means user did not input correctly
  gameMode = "start game";
  return `You did not enter correctly. Restarting the game...`;
};

//to roll dice and output the result message
var generateOutputMessage = function () {
  var dice1 = diceRoll();
  console.log(dice1);
  var dice2 = diceRoll();
  console.log(dice2);
  num1 = dice1;
  num2 = dice2;
  var finalNumber = combineDiceDigits(num1, num2);
  if (currentPlayer == 1) {
    combineNum1 = finalNumber;
    sum1 += finalNumber;
    currentPlayer = 2;
    return `It is now Player 1's turn. <br><br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br> Your best combined number is ${finalNumber}.`;
  }
  if (currentPlayer == 2) {
    combineNum2 = finalNumber;
    sum2 += finalNumber;
    var currentLeader = evaluateWinner(sum1, sum2);
    var leaderBoard = formatLeaderBoard(currentLeader);
    currentPlayer = 1;
    return `It is now Player 2's turn. <br><br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br> Your best combined number is ${finalNumber}. <br><br> Player 1 current round number: ${combineNum1} and Player 2 current round number: ${combineNum2} <br><br> ${leaderBoard} <br><br> ${currentLeader}`;
  }
};

//to format the leaderboard
var formatLeaderBoard = function (currentLeader) {
  if (currentLeader == `Player 1 is currently leading!`) {
    return `1st in place: Player 1 (total sum: ${sum1}) <br><br> 2nd in place: Player 2 (total sum: ${sum2}).`;
  }
  if (currentLeader == `Player 2 is currently leading!`) {
    return `1st in place: Player 2 (total sum: ${sum2}) <br><br> 2nd in place: Player 1 (total sum: ${sum1}).`;
  }
  if (currentLeader == `Both players have the same total sum!`) {
    return `Player 1 total sum: ${sum1} and Player 2 total sum: ${sum2}.`;
  }
};

//to determine the bigger number out of the two numbers that players obtained
var evaluateWinner = function (player1Num, player2Num) {
  if (
    (player1Num > player2Num && gameMode == 1) ||
    (player2Num > player1Num && gameMode == 2)
  ) {
    return `Player 1 is currently leading!`;
  }
  if (
    (player2Num > player1Num && gameMode == 1) ||
    (player1Num > player2Num && gameMode == 2)
  ) {
    return `Player 2 is currently leading!`;
  }
  if (player1Num == player2Num) {
    return `Both players have the same total sum!`;
  }
};

//to combine the numbers of dice rolled to a single 2 digit
var combineDiceDigits = function (digit1, digit2) {
  if (
    (gameMode == 1 && digit1 >= digit2) ||
    (gameMode == 2 && digit2 >= digit1)
  ) {
    var finalNumber = digit1 * 10 + digit2;
    return finalNumber;
  }

  if (
    (gameMode == 1 && digit2 > digit1) ||
    (gameMode == 2 && digit1 >= digit2)
  ) {
    var finalNumber = digit2 * 10 + digit1;
    return finalNumber;
  }
};

var diceRoll = function () {
  //Math.random generate a decimal from 0 to 1
  var randomDecimal = Math.random() * 6;
  //Math.floor round the number down to an integer
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
