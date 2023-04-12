var rollDice = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6 + 1);
  return randomDiceNumber;
};

var player1Score = 0;
var player2Score = 0;
var diceNumber = 0;
var generatedPlayer1Number = [];
var generatedPlayer2Number = [];
var generatedHighest = [];
var generated2Highest = [];
var rollcombination1 = [];
var rollcombination2 = [];
var gameMode = "start";

var convertArrayToNumber = function (diceNumber, array) {
  var myOutputValue = "";
  for (var i = 0; i < diceNumber; i += 1) {
    var number = array[i];
    var myOutputValue = myOutputValue + number;
  }
  var convertToNumber = Number(myOutputValue);
  return convertToNumber;
};

var main = function (input) {
  if (gameMode == "start") {
    generatedPlayer1Number = [];
    generatedPlayer2Number = [];
    generatedHighest = [];
    generated2Highest = [];
    rollcombination1 = [];
    rollcombination2 = [];
    var myOutputValue = ` Enter the number of dice you want for the game.`;
    gameMode = "number of dice";
    return myOutputValue;
  }
  if (gameMode == "number of dice") {
    diceNumber = input;
    if (isNaN(input) || Number(input) <= 0) {
      var myOutputValue = `Please enter a valid input number.`;
    } else {
      gameMode = "player1roll";
      var myOutputValue = `There will be ${input} dice for each player in this game. Good luck.`;
    }
    return myOutputValue;
  }
  if (gameMode == "player1roll") {
    for (var n = diceNumber; n > 0; n -= 1) {
      var randomDice = rollDice();
      generatedPlayer1Number.push(randomDice);
      rollcombination1.push(randomDice);
    }
    console.log(generatedPlayer1Number);
    for (var n = diceNumber; n > 0; n -= 1) {
      var largestNumber = Number(Math.max(...generatedPlayer1Number));
      generatedPlayer1Number.splice(
        generatedPlayer1Number.indexOf(largestNumber),
        1
      );
      generatedHighest.push(largestNumber);
    }
    console.log(generatedHighest);
    var myOutputValue = `Welcome Player 1. <br>You rolled ${rollcombination1}. <br>Your auto-generated highest combination for the numbers is ${generatedHighest}`;
    gameMode = "player2roll";
    return myOutputValue;
  }

  if (gameMode == "player2roll") {
    for (var n = diceNumber; n > 0; n -= 1) {
      var randomDice = rollDice();
      generatedPlayer2Number.push(randomDice);
      rollcombination2.push(randomDice);
    }
    console.log(generatedPlayer2Number);
    for (var n = diceNumber; n > 0; n -= 1) {
      var largestNumber = Number(Math.max(...generatedPlayer2Number));
      generatedPlayer2Number.splice(
        generatedPlayer2Number.indexOf(largestNumber),
        1
      );
      generated2Highest.push(largestNumber);
    }
    console.log(generated2Highest);
    var myOutputValue = `Welcome Player 2. <br>You rolled ${rollcombination2}. <br>Your auto-generated highest combination for the numbers is ${generated2Highest}`;
    gameMode = "conclusion";
    return myOutputValue;
  }
  if (gameMode == "conclusion") {
    player1Score = convertArrayToNumber(diceNumber, generatedHighest);
    player2Score = convertArrayToNumber(diceNumber, generated2Highest);
    console.log(player1Score);
    console.log(player2Score);
    if (player2Score > player1Score) {
      var statement = `Since Player 1 Number is ${player1Score}, and Player 2 number is ${player2Score}. Player 2 wins. `;
    }
    if (player1Score > player2Score) {
      var statement = `Since Player 1 Number is ${player1Score}, and Player 2 number is ${player2Score}. Player 1 wins. `;
    }
    if (player1Score == player2Score) {
      var statement = `Since Player 1 Number is ${player1Score}, and Player 2 number is ${player2Score}. It's a draw. `;
    }
    gameMode = "start";
    return statement + `To restart the game, click submit to continue.`;
  }
};
