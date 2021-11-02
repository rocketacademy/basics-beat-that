//roll dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger + 1;
};

//2 modes in which player roll the dice, then select the order
var gameMode1 = "roll two dices";
var gameMode2 = "select the order of the dice number";

//Global variable
var gameCurrentPlayer = 1;
var gameCurrentMode = gameMode1;

//array variables
var diceArrayPlayerOne = [];
var diceArrayPlayerTwo = [];

//two global variable for both usernames
var userNameOne = "";
var userNameTwo = "";

//two global variable for playerOneNumber and playerTwoNumber
var playerOneNumber = 0;
var playerTwoNumber = 0;

//number store in array function
var playerDiceRolls = function () {
  var playerNewNumber = [rollDice(), rollDice()];
  if (gameCurrentPlayer == 1) {
    diceArrayPlayerOne = playerNewNumber;
  } else {
    diceArrayPlayerTwo = playerNewNumber;
  }
  return playerDiceRolls;
};

//merging dice function
var mergeDiceNumber = function (input) {
  if (gameCurrentPlayer == 1) {
    var playerMerge = diceArrayPlayerOne;
  } else {
    var playerMerge = diceArrayPlayerTwo;
  }
  if (input == 1) {
    var mergedNumber = String(playerMerge[0]) + String(playerMerge[1]);
  } else {
    var mergedNumber = String(playerMerge[1]) + String(playerMerge[0]);
  }
  if (gameCurrentPlayer == 1) {
    playerOneNumber = mergedNumber;
    return playerOneNumber;
  } else {
    playerTwoNumber = mergedNumber;
    return playerTwoNumber;
  }
};

//compare merge number to find the winner. winning function
function winningPlayer(playerOne, playerTwo) {
  var userName1 = playerOne;
  var userName2 = playerTwo;
  console.log(userName1);
  console.log(userName2);
  console.log(playerOneNumber);
  console.log(playerTwoNumber);
  var myOutputValue = "";
  if (playerOneNumber > playerTwoNumber) {
    myOutputValue = `${userName1}, you Win`;
  } else {
    myOutputValue = `${userName2}, you Win`;
  }
  return myOutputValue;
}

//----------main function-----------

var main = function (input) {
  if (gameCurrentMode == gameMode1) {
    // Check if player 1 or player 2
    // If player 1, then assign input to userNameOne
    // If player 2, then assign input to userNameTwo
    if (gameCurrentPlayer == 1) {
      userNameOne = input;
      // roll 2 dice
      // push the 2 dice to diceArrayPlayerOne
      var rollDice1 = rollDice();
      var rollDice2 = rollDice();

      diceArrayPlayerOne.push(rollDice1, rollDice2);
      console.log(rollDice1, rollDice2);
      console.log(diceArrayPlayerOne);

      gameCurrentMode = gameMode2;
      return `Hello ${userNameOne}, you rolled ${rollDice1} for Dice 1 and ${rollDice2} for Dice 2. Choose the order of the dice by typing 1 (for dice 1) or 2 (for dice 2)`;
    } else if (gameCurrentPlayer == 2) {
      userNameTwo = input;
      // roll 2 dice
      // push the 2 dice to diceArrayPlayerTwo
      var rollDice1 = rollDice();
      var rollDice2 = rollDice();

      diceArrayPlayerTwo.push(rollDice1, rollDice2);
      console.log(rollDice1, rollDice2);
      console.log(diceArrayPlayerTwo);
      gameCurrentMode = gameMode2;
      return `Hello ${userNameTwo}, you rolled ${rollDice1} for Dice 1 and ${rollDice2} for Dice 2. Choose the order of the dice by typing 1 (for dice 1) or 2 (for dice 2)`;
    }
  }

  //now player will input the order; game mode change to secondMode

  if (gameCurrentMode == gameMode2) {
    var orderOfdice = mergeDiceNumber(input);
    gameCurrentMode = gameMode1;
    if (gameCurrentPlayer == 1) {
      gameCurrentPlayer = 2;
      return `${userNameOne}, you have choosen ${orderOfdice}.`;
    } else {
      //winning condition need to be added here
      var winner = winningPlayer(userNameOne, userNameTwo);
      gameCurrentPlayer = 1;
      return winner;
    }
  }
};
