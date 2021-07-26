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
// global variable to store the quantity of dice each round
var diceQty = 0;

var main = function (input) {
  //welcome message
  if (gameState == "start game") {
    gameState = "input game mode";
    return `Welcome! Please choose the game mode: <br><br> 1. Highest Combined Number <br><br> 2. Lowest Combined Number <br><br> Enter the number choice.`;
  }
  //after user choose the game mode
  if (gameState == "input game mode") {
    gameState = "choose dice quantity";
    gameMode = input;
    return `You have chosen game mode ${gameMode}. Let's play! <br><br> `;
  }

  //prompt user to enter the quantity of dice for that round
  if (gameState == "choose dice quantity") {
    gameState = "after choose dice quantity";
    return `Please enter the quantity of dice each player will roll this round.`;
  }

  //after user choose the dice quantity for that round
  if (gameState == "after choose dice quantity") {
    gameState = "roll dice";
    diceQty = input;
    return `You have entered ${diceQty}, so ${diceQty} dice will be rolled this round.`;
  }

  //rolling the dice and output the result
  if (gameState == "roll dice") {
    var outputMessage = generateOutputMessage();
    return outputMessage;
  }
  //if reaches here, means user did not input correctly
  gameState = "start game";
  return `You did not enter correctly. Restarting the game...`;
};

//to output the result message
var generateOutputMessage = function () {
  //to store each dice values for that round
  var player1DiceValues = [];
  var player2DiceValues = [];

  if (currentPlayer == 1) {
    //to add the number rolled for each dice
    for (var count = 0; count < diceQty; count += 1) {
      var dice = diceRoll();
      console.log(dice);
      player1DiceValues.push(dice);
    }
    var finalNumber = combineDiceDigits(player1DiceValues);
    combineNum1 = finalNumber;
    sum1 += finalNumber;
    currentPlayer = 2;
    return `It is now Player 1's turn. <br><br> All your dice values are ${player1DiceValues}. <br><br> Your best combined number is ${finalNumber}.`;
  }
  if (currentPlayer == 2) {
    //to add the number rolled for each dice
    for (var count = 0; count < diceQty; count += 1) {
      var dice = diceRoll();
      console.log(dice);
      player2DiceValues.push(dice);
    }
    var finalNumber = combineDiceDigits(player2DiceValues);
    combineNum2 = finalNumber;
    sum2 += finalNumber;
    var currentLeader = evaluateWinner(sum1, sum2);
    var leaderBoard = formatLeaderBoard(currentLeader);
    currentPlayer = 1;
    gameState = "choose dice quantity";
    return `It is now Player 2's turn. <br><br> All your dice vlaues are ${player2DiceValues}. <br><br> Your best combined number is ${finalNumber}. <br><br> Player 1 current round number: ${combineNum1} and Player 2 current round number: ${combineNum2} <br><br> ${leaderBoard} <br><br> ${currentLeader}`;
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
var combineDiceDigits = function (diceAllValues) {
  var copiedArr = [...diceAllValues];
  if (gameMode == 1) {
    var combinedNum = 0;
    for (var count = 0; count < diceAllValues.length; count += 1) {
      combinedNum *= 10;
      combinedNum += Math.max(...copiedArr);
      var indexOfMaxNum = copiedArr.indexOf(Math.max(...copiedArr));
      copiedArr.splice(indexOfMaxNum, 1);
    }
    return combinedNum;
  }
  if (gameMode == 2) {
    var combinedNum = 0;
    for (var count = 0; count < diceAllValues.length; count += 1) {
      combinedNum *= 10;
      combinedNum += Math.min(...copiedArr);
      var indexOfMinNum = copiedArr.indexOf(Math.min(...copiedArr));
      copiedArr.splice(indexOfMinNum, 1);
    }
    return combinedNum;
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
