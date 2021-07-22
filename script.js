//to have a global variable that controls the game progress
var gameState = "";
//to have a global variable that controls the players
var playerNumber = 1;
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
  var myOutputValue = "";

  if (gameState == "") {
    myOutputValue = `Please choose the game mode: <br><br> 1. Highest Combined Number <br><br> 2. Lowest Combined Number <br><br> Enter the number choice.`;
    gameState = "input game mode";

    return myOutputValue;
  }

  if (gameState == "input game mode") {
    gameState = "post dice roll";
    gameMode = input;
    myOutputValue = `You have chosen game mode ${gameMode}. Let's play!`;
    return myOutputValue;
  }

  if (gameState == "post dice roll") {
    var dice1 = diceRoll();
    console.log(dice1);
    var dice2 = diceRoll();
    console.log(dice2);
    num1 = dice1;
    num2 = dice2;
    myOutputValue = `It is now Player ${playerNumber}'s turn. <br><br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br> Choose the order of the dice.`;
    gameState = "player choose order";
    return myOutputValue;
  }

  if (gameState == "player choose order") {
    var finalNumber = combineDiceDigits(input, num1, num2);
    if (playerNumber == 1) {
      combineNum1 = finalNumber;
      sum1 += finalNumber;
      gameState = "post dice roll";
      playerNumber = 2;
      myOutputValue = `Player 1, you chose Dice ${input} first. <br><br> Your number is ${finalNumber}, and total sum of all your numbers is ${sum1}. <br><br> It is now Player 2's turn.`;
      return myOutputValue;
    }
    if (playerNumber == 2) {
      combineNum2 = finalNumber;
      sum2 += finalNumber;
      var currentLeader = evaluateWinner(sum1, sum2);
      var leaderBoard = formatLeaderBoard(currentLeader);
      playerNumber = 1;
      gameState = "post dice roll";
      myOutputValue = `Player 2, you chose Dice ${input} first. <br><br> Your number is ${finalNumber}, and total sum of all your numbers is ${sum2}. <br><br> Player 1 current round number: ${combineNum1} and Player 2 current round number: ${combineNum2} <br><br> ${leaderBoard} <br><br> ${currentLeader}`;
      return myOutputValue;
    }
  }

  return myOutputValue;
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
  if (player1Num > player2Num && gameMode == 1) {
    return `Player 1 is currently leading!`;
  }
  if (player2Num > player1Num && gameMode == 1) {
    return `Player 2 is currently leading!`;
  }
  if (player2Num > player1Num && gameMode == 2) {
    return `Player 1 is currently leading!`;
  }
  if (player1Num > player2Num && gameMode == 2) {
    return `Player 2 is currently leading!`;
  }
  if (player1Num == player2Num) {
    return `Both players have the same total sum!`;
  }
};

//to combine the numbers of dice rolled to a single 2 digit
var combineDiceDigits = function (chosenDice, digit1, digit2) {
  if (chosenDice == 1) {
    var finalNumber = digit1 * 10 + digit2;
    return finalNumber;
  }
  if (chosenDice == 2) {
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
