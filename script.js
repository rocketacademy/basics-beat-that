// Steps
// 1) Generate Random Number of two dices max 6, return output for player 1
// 2) Player choose which number to go first, return order output for player 1
// 3) Generate Random Number of two dices max 6, return output for player 2
// 4) Player choose which number to go first, return order output for player 2
// 5) Compare two order outputs, return output which player wins
// 6) Reset the Game without refreshing the browser page

var gameMode = "startGame";
var myOutputValue = "";
var getDiceNumber1;
var getDiceNumber2;
var getDiceNumber3;
var getDiceNumber4;
var playerNumberCombination1;
var playerNumberCombination2;

//generate random number
var generateRandomNumber = function () {
  var randomDecimal = Math.random() * 6;
  var randomNumber = Math.ceil(randomDecimal);
  return randomNumber;
};

//get dice number
var getDiceNumber = function () {
  var diceNumber = generateRandomNumber();
  return diceNumber;
};

//player 1 get two dice numbers
var getTwoDiceRollResult1 = function () {
  getDiceNumber1 = getDiceNumber();
  getDiceNumber2 = getDiceNumber();
  var twoDiceRollResult = `The dice rolls are ${getDiceNumber1} and ${getDiceNumber2} respectively. <br><br> 
  You now pick the order of the dice you want so as to make a higher combination to win. <br>
  Insert <b>'1'</b> to go with the first number first and <b>'2'</b> to go the the second number first.`;
  return twoDiceRollResult;
};

//player 1 pick which number goes first
var pickNumberToGoFirst1 = function (input) {
  var oneToGoFirst = getDiceNumber1 * 10 + getDiceNumber2;
  console.log("oneToGoFirst:", oneToGoFirst);
  var secondToGoFirst = getDiceNumber2 * 10 + getDiceNumber1;
  console.log("secondToGoFirst:", secondToGoFirst);
  if (input == 1) {
    playerNumberCombination1 = oneToGoFirst;
  } else if (input == 2) {
    playerNumberCombination1 = secondToGoFirst;
  } else {
    `please insert '1' to go with the first number first and '2' to go the the second number first.`;
  }
  console.log("playerNumberCombination:", playerNumberCombination1);
  return playerNumberCombination1;
};

//player 2 get two dice numbers
var getTwoDiceRollResult2 = function () {
  getDiceNumber3 = getDiceNumber();
  getDiceNumber4 = getDiceNumber();
  var twoDiceRollResult = `The dice rolls are ${getDiceNumber3} and ${getDiceNumber4} respectively. <br><br> 
  You now pick the order of the dice you want so as to make a higher combination to win. <br>
  Insert <b>'1'</b> to go with the first number first and <b>'2'</b> to go the the second number first.`;
  return twoDiceRollResult;
};

//player 2 pick which number goes first
var pickNumberToGoFirst2 = function (input) {
  var oneToGoFirst = getDiceNumber3 * 10 + getDiceNumber4;
  console.log("oneToGoFirst:", oneToGoFirst);
  var secondToGoFirst = getDiceNumber4 * 10 + getDiceNumber3;
  console.log("secondToGoFirst:", secondToGoFirst);
  if (input == 1) {
    playerNumberCombination2 = oneToGoFirst;
  } else if (input == 2) {
    playerNumberCombination2 = secondToGoFirst;
  } else {
    `please insert '1' to go with the first number first and '2' to go the the second number first.`;
  }
  console.log("playerNumberCombination2:", playerNumberCombination2);
  return playerNumberCombination2;
};

//compare two players combination numbers, higher numbers win
var compareNumbers = function () {
  var compareNumberResult;
  if (playerNumberCombination1 > playerNumberCombination2) {
    compareNumberResult = `Player ONE final number: ${playerNumberCombination1} is larger than Player TWO final number: ${playerNumberCombination2}. Player ONE wins!`;
  } else if (playerNumberCombination2 > playerNumberCombination1) {
    compareNumberResult = `Player TWO final number: ${playerNumberCombination2} is larger than Player ONE final number: ${playerNumberCombination1}. Player TWO wins!`;
  } else if (playerNumberCombination1 == playerNumberCombination2) {
    compareNumberResult = `Player ONE final number is equal to Player TWO final number: ${playerNumberCombination1}. It's a draw!`;
  }
  return compareNumberResult;
};

//main function
var main = function (input) {
  // if two dice rolls result hasnt shown, output two dice rolls result
  if (gameMode == "startGame") {
    myOutputValue = getTwoDiceRollResult1();
    gameMode = "pickNumberToGoFirst";
  }
  // if two dice rolls has generated, pick which number to go first
  else if (gameMode == "pickNumberToGoFirst") {
    if (input == 1) {myOutputValue = `Your number is ${pickNumberToGoFirst1(input)}.
        Press <b>'Submit'</b> to generate Player TWO's number.`;
      gameMode = "getSecondPlayerTwoDiceRoll";}
    else if (input == 2) {myOutputValue = `Your number is ${pickNumberToGoFirst1(input)}.
        Press <b>'Submit'</b> to generate Player TWO's number.`;
      gameMode = "getSecondPlayerTwoDiceRoll";
    }
    else {gameMode = "pickNumberToGoFirst"};
  }
  // if first player number is picked, generate second player two dice results
  else if (gameMode == "getSecondPlayerTwoDiceRoll") {
    myOutputValue = getTwoDiceRollResult2();
    gameMode = "pickSecondPlayerNumberToGoFirst";
  }
  // if second player two dice results has generated, second player pick which number to go first
  else if (gameMode == "pickSecondPlayerNumberToGoFirst") {
    if (input == 1) {myOutputValue = `Your number is ${pickNumberToGoFirst2(input)}.<br>
      Press <b>'Submit'</b> to compare result.`;
      gameMode = "compareNumbers";
    }
    else if (input == 2) {myOutputValue = `Your number is ${pickNumberToGoFirst2(input)}.<br>
      Press <b>'Submit'</b> to compare result.`;
      gameMode = "compareNumbers";
    }
    else {gameMode = "pickSecondPlayerNumberToGoFirst"};
  }
  // if both players final number is set, compare both numbers
  else if (gameMode == "compareNumbers") {
    myOutputValue = `${compareNumbers()} <br><br>
      Past Numbers of Player ONE is ${addPastNumbers1()}.<br>
      Past Numbers of Player TWO is ${addPastNumbers2()}.<br><br>
      ${showLeaderBoard()} <br><br>
      Click "Submit" to continue the game.`;
    gameMode = "startGame";
  }
  return myOutputValue;
}



// Add steps
// 7) Add up scores of each player
// 8) Show score in decreasing order

var arrayOfPastNumbers1 = [];
var arrayOfPastNumbers2 = [];
var sumOfPastNumbers1;
var sumOfPastNumbers2;

// array of player ONE past numbers
var addPastNumbers1 = function () {
  arrayOfPastNumbers1.push(playerNumberCombination1);
  return arrayOfPastNumbers1;
};

// array of player TWO past numbers
var addPastNumbers2 = function () {
  arrayOfPastNumbers2.push(playerNumberCombination2);
  return arrayOfPastNumbers2;
};

// sum of array of player ONE past numbers
var getSumOfPastNumbers1 = function () {
  var counter;
  for (counter = 0; counter < arrayOfPastNumbers1.length; counter += 1) {
    sumOfPastNumbers1 = sumOfPastNumbers1 + arrayOfPastNumbers1[counter];
    console.log("sum of part numbers 1: " + sumOfPastNumbers1)
    // problem: sum of past numbers not showing
    return sumOfPastNumbers1;
  }
};

// sum of array of player TWO past numbers
var getSumOfPastNumbers2 = function () {
  var counter;
  for (counter = 0; counter < arrayOfPastNumbers2.length; counter += 1) {
    sumOfPastNumbers2 = sumOfPastNumbers2 + arrayOfPastNumbers2[counter];
    console.log("sum of part numbers 2: " + sumOfPastNumbers2)
    // problem: sum of past numbers not showing
    return sumOfPastNumbers2;
  }
};

// show leader board larger sum of array will show first
var showLeaderBoard = function () {
  var myOutputValue;
  if (!getSumOfPastNumbers1()) {
    if (playerNumberCombination1 > playerNumberCombination2) {
      myOutputValue = `LEADER BOARD <br> Sum of Player ONE is ${playerNumberCombination1}. <br> Sum of Player TWO is ${playerNumberCombination2}.`
    }
    else if (playerNumberCombination2 > playerNumberCombination1){
      myOutputValue = `LEADER BOARD <br> Sum of Player ONE is ${playerNumberCombination2}. <br> Sum of Player TWO is ${playerNumberCombination1}.`
    }
  }
  if (getSumOfPastNumbers1() > getSumOfPastNumbers2()) {
    myOutputValue = `LEADER BOARD <br> Sum of Player ONE is ${getSumOfPastNumbers1()}. <br> Sum of Player TWO is ${getSumOfPastNumbers2()}. <br> Player ONE is leading.`
  }
  else if (getSumOfPastNumbers2() > getSumOfPastNumbers1()) { 
    myOutputValue = `LEADER BOARD <br> Sum of Player TWO is ${getSumOfPastNumbers2()}. <br> Sum of Player ONE is ${getSumOfPastNumbers1()}. <br> Player TWO is leading.`
  }
  console.log(getSumOfPastNumbers1(), getSumOfPastNumbers2())
  // problem: sum of past numbers not showing
  return myOutputValue;
};



// HAVENT ADDED INTO MAIN CODE 215 - 254
// Add steps
// 9) compare two players combination numbers, lower numbers win
// 10) Autogenerate lower number

// compare two players combination numbers, lower numbers win
var compareNumbersLowerWins = function () {
  var compareNumberResult;
  if (playerNumberCombination1 < playerNumberCombination2) {
    compareNumberResult = `Player ONE final number: ${playerNumberCombination1} is smaller than Player TWO final number: ${playerNumberCombination2}. Player TWO wins!`;
  } else if (playerNumberCombination2 < playerNumberCombination1) {
    compareNumberResult = `Player TWO final number: ${playerNumberCombination2} is smaller than Player ONE final number: ${playerNumberCombination1}. Player ONE wins!`;
  } else if (playerNumberCombination1 == playerNumberCombination2) {
    compareNumberResult = `Player ONE final number is equal to Player TWO final number: ${playerTwoFinalNumber}. It's a draw!`;
  }
  return compareNumberResult;
};

//player 1 Lower Number go first
var pickLowerNumberToGoFirst1 = function () {
  if (getDiceNumber1 < getDiceNumber2) {
    var playerNumberCombination1 = getDiceNumber1 * 10 + getDiceNumber2;
  }
  if (getDiceNumber2 < getDiceNumber1) {
  playerNumberCombination1 = getDiceNumber2 * 10 + getDiceNumber1;
  console.log("playerNumberCombination1: ", playerNumberCombination1);
  }
  return playerNumberCombination1;
};

//player 2 Lower Number go first
var pickLowerNumberToGoFirst2 = function () {
  if (getDiceNumber3 < getDiceNumber4) {
    var playerNumberCombination2 = getDiceNumber3 * 10 + getDiceNumber4;
  }
  if (getDiceNumber4 < getDiceNumber3) {
  playerNumberCombination2 = getDiceNumber4 * 10 + getDiceNumber3;
  console.log("playerNumberCombination2: ", playerNumberCombination2);
  }
  return playerNumberCombination2;
};