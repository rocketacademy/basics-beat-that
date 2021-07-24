//Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

//Game state and player number
var gameMode = "playerSelection";
var playerNumber = 0;

//Global List for recording player rolls
var playerOneList = [];
var playerTwoList = [];

//Global Player Number sum
var playerScore = [Number(0), Number(0)];
var playerOneSum = 0;
var playerTwoSum = 0;

var main = function (input) {
  if (gameMode == "playerSelection") {
    var output = checkInput(input);
    playerNumber = input;

    if (playerNumber == 1) {
      playerOneList = [diceRoll(), diceRoll()];
      return playerRoll(playerNumber, playerOneList);
    }
    if (playerNumber == 2) {
      playerTwoList = [diceRoll(), diceRoll()];

      return playerRoll(playerNumber, playerTwoList);
    }
  }

  //If Dice rolled, add two numbers and return
  if (gameMode == "diceGuess") {
    output = checkInput(input);
    if (playerNumber == 1) {
      //Reset game to run for playerTwo
      gameMode = "playerSelection";
      playerOneSum = checkOrder(input, playerOneList);
      playerScore[0] += Number(playerOneSum);
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerOneSum}<br>Your current total is ${playerScore[0]}`;
    }
    if (playerNumber == 2) {
      //Set final gameMode to check winner
      gameMode = "checkWinner";
      playerTwoSum = checkOrder(input, playerTwoList);
      playerScore[1] += Number(playerTwoSum);
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerTwoSum}<br>Your current total is ${playerScore[1]}<br>Press submit again for the results!`;
    }
  }

  if (gameMode == "checkWinner") {
    var winner = checkWinner(playerScore[0], playerScore[1]);
    gameMode = "playerSelection";
    return `${winner}<br>Player 1 has ${playerScore[0]} while Player 2 has ${playerScore[1]}`;
  }
  return output;
};

//Check input
function checkInput(input) {
  if (input != 1 && input != 2) {
    return `Please enter 1 or 2 `;
  }
}
//Check Winner
function checkWinner(input1, input2) {
  if (input1 > input2) {
    return `Player 1 Wins!`;
  } else if (input2 > input1) {
    return `Player 2 Wins!`;
  } else {
    return `Draw!`;
  }
}

//Check Order input by user
function checkOrder(input, playerList) {
  if (input == "1") {
    return addTwoNumbers(playerList[0], playerList[1]);
  }
  if (input == "2") {
    return addTwoNumbers(playerList[1], playerList[0]);
  }
}

//Adding Function
function addTwoNumbers(numberOne, numberTwo) {
  return numberOne + "" + numberTwo;
}

function playerRoll(playerNumber, playerList) {
  gameMode = "diceGuess";
  return `Hi Player ${playerNumber}.<br>You rolled ${playerList[0]} for Dice 1 and ${playerList[1]} for Dice 2.<br>Please choose the order of the dice.`;
}

//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
