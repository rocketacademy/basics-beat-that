//Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

//Game state
var gameState = 0;
var playerNumber = 0;

//NumberList
var playerList = [];

//Player Number sum
var playerOneSum = 0;
var playerTwoSum = 0;

var main = function (input) {
  if (gameState == 0) {
    playerNumber = input;
    playerList = [diceRoll(), diceRoll()];
    gameState = 1;
    return `Hi Player ${playerNumber}.<br>You rolled ${playerList[0]} for Dice 1 and ${playerList[1]} for Dice 2.<br>Please choose the order of the dice.`;
  }

  //If Dice rolled, add two numbers and return
  if (gameState == 1) {
    if (playerNumber == 1) {
      //Reset game to run for playerTwo
      gameState = 0;
      playerOneSum = checkOrder(input);
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerOneSum}`;
    }
    if (playerNumber == 2) {
      //Set final gameState to check winner
      gameState = 2;
      playerTwoSum = checkOrder(input);
      return `Player ${playerNumber}, you chose Dice ${input} first.<br>Your number is ${playerTwoSum}`;
    }
  }

  if (gameState == 2) {
    var winner = checkWinner(playerOneSum, playerTwoSum);
    return `Player ${winner} wins!<br>Player One has ${playerOneSum} while Player Two has ${playerTwoSum}`;
  }
};

//Check Winner
function checkWinner(input1, input2) {
  if (input1 >= input2) {
    return 1;
  } else {
    return 2;
  }
}

//Check Order input by user
function checkOrder(input) {
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

//Dice roll function
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
