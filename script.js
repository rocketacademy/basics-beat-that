//to have a global variable that controls the game progress
var gameState = "post dice roll";
//to have a global variable that controls the players
var playerNumber = 1;
//global variables to save the dice numbers rolled
var num1 = 0;
var num2 = 0;
//global variables to save the combined dice numbers
var combineNum1 = 0;
var combineNum2 = 0;

var main = function (input) {
  var myOutputValue = "";

  if (gameState == "post dice roll") {
    var dice1 = diceRoll();
    console.log(dice1);
    var dice2 = diceRoll();
    console.log(dice2);
    num1 = dice1;
    num2 = dice2;
    myOutputValue = `Welcome Player ${playerNumber}. <br><br> You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br> Choose the order of the dice.`;
    gameState = "player choose order";
    return myOutputValue;
  }

  if (gameState == "player choose order") {
    var finalNumber = combineDiceDigits(input, num1, num2);
    if (playerNumber == 1) {
      combineNum1 = finalNumber;
      gameState = "post dice roll";
      playerNumber = 2;
      myOutputValue = `Player 1, you chose Dice ${input} first. <br><br> Your number is ${finalNumber}. <br><br> It is now Player 2's turn.`;
      return myOutputValue;
    }
    if (playerNumber == 2) {
      combineNum2 = finalNumber;
      var winningPlayer = evaluateWinner(combineNum1, combineNum2);
      myOutputValue = `Player 2, you chose Dice ${input} first. <br><br> Your number is ${finalNumber}. <br><br> ${winningPlayer} <br><br> Player 1 number: ${combineNum1} and Player 2 number: ${combineNum2}`;
      return myOutputValue;
    }
  }

  return myOutputValue;
};

//to determine the bigger number out of the two numbers that players obtained
var evaluateWinner = function (player1Num, player2Num) {
  if (player1Num > player2Num) {
    return `Player 1 won!`;
  }
  if (player2Num > player1Num) {
    return `Player 2 won!`;
  }
  if (player1Num == player2Num) {
    return `It was a draw!`;
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
