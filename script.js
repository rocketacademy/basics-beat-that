// Global variables
let currentPlayer = 1;
let numOfPlayers = 3;
var numOfDice = 2;

// declare 2 game modes so that the submit button will call main function 2 different ways
var currGameMode = "roll dice"; // second game mode will be "choose order". Use if statements for this!

var dice1 = "";
var dice2 = "";

var playerNumbers = [];
var winnersArr = [];

// Helper Functions
var generateRandomNumber = function () {
  var dicevalue = Math.floor(Math.random() * 6) + 1;
  return dicevalue.toString(); // to combine the values via two options. Number data types don't work like that
};

var areDicesSame = function () {
  if (dice1 == dice2) {
    return true;
  }
  return false;
};

// reset game
var resetGame = function () {
  currGameMode = "roll dice";
  currentPlayer = 1;
  playerNumbers = [];
  winnersArr = [];
};

// Remember to add a reset function here to reset the game after it ends

// main function
var main = function (input) {
  var myOutputValue = "";

  if (currentPlayer > numOfPlayers) {
    var highScore = Math.max(...playerNumbers);
    console.log(highScore);

    for (let i = 0; i < playerNumbers.length; i += 1) {
      if (playerNumbers[i] == highScore) {
        winnersArr.push("" + (i + 1));
      }
    }

    if (winnersArr.length == 1) {
      myOutputValue = `The winner is Player ${winnersArr}. Press submit to play again!`;
    } else if (winnersArr.length < numOfPlayers) {
      myOutputValue = `The winners are Player ${winnersArr[0]} and Player ${winnersArr[1]}. Press submit to play again!`;
    } else if (winnersArr.length == numOfPlayers) {
      myOutputValue = `Everyone drew. What were the chances of that happening! Press submit to play again!`;
    }

    resetGame();

    return myOutputValue;
  }

  // if current game mode is roll dice
  if (currGameMode == "roll dice") {
    if (input != "") {
      return `Please roll dice by clicking Submit`;
    }
    dice1 = generateRandomNumber();
    dice2 = generateRandomNumber();
    console.log("dice 1: " + dice1);
    console.log("dice 2: " + dice2);

    // check if dices are the same. If so, add both of them together
    if (areDicesSame()) {
      if (currentPlayer < numOfPlayers) {
        playerNumbers.push(dice1 + dice2);
        myOutputValue = `Your number is ${
          playerNumbers[currentPlayer - 1]
        }. It is now Player ${currentPlayer + 1}'s turn`;
        currentPlayer += 1;
      } else if ((currentPlayer = numOfPlayers)) {
        playerNumbers.push(dice1 + dice2);
        myOutputValue = `Your number is ${
          playerNumbers[currentPlayer - 1]
        }. It is now time to see the results`;
        currentPlayer += 1;
      }
    } else {
      currGameMode = "choose order";
      console.log(currGameMode);
      myOutputValue = `<strong> 🎲 WELCOME PLAYER ${currentPlayer} 🎲 </strong> <br>
      You rolled ${dice1} for dice one and ${dice2} for dice two. </br> 
      <br> Choose the order of the dice by entering "1" or "2" </br>
    `;
    }

    return myOutputValue;
  }

  if (currGameMode == "choose order") {
    if (input == 1) {
      if (currentPlayer < numOfPlayers) {
        var lol = dice1 + dice2;
        playerNumbers.push(lol);
        myOutputValue = `Player ${currentPlayer}, you chose Dice ${input} first
      <br> Your number is ${lol} </br>
      <br> It is now Player ${currentPlayer + 1}'s turn </br>
      `;
        currentPlayer += 1;
        currGameMode = "roll dice";
      } else if ((currentPlayer = numOfPlayers)) {
        var lol = dice1 + dice2;
        playerNumbers.push(lol);
        myOutputValue = `Player ${currentPlayer}, you chose Dice ${input} first
      <br> Your number is ${lol} </br> <br> Press submit to see who won! </br>
      `;
        currentPlayer += 1;
        currGameMode = "roll dice";
      }
    }
    if (input == 2) {
      if (currentPlayer < numOfPlayers) {
        var lol = dice2 + dice1;
        playerNumbers.push(lol);
        myOutputValue = `Player ${currentPlayer}, you chose Dice ${input} first
      <br> Your number is ${lol} </br>
      <br> It is now Player ${currentPlayer + 1}'s turn </br>
      `;
        currentPlayer += 1;
        currGameMode = "roll dice";
      } else if ((currentPlayer = numOfPlayers)) {
        var lol = dice1 + dice2;
        playerNumbers.push(lol);
        myOutputValue = `Player ${currentPlayer}, you chose Dice ${input} first
      <br> Your number is ${lol} </br> <br> Press submit to see who won! </br>
      `;
        currentPlayer += 1;
        currGameMode = "roll dice";
      }
    }
  }

  return myOutputValue;
};
