// == Basics of Beat That Project ==
// 2 players taking turn to press the submit button.
// the game then rolls 2 dices, and outputs the two number on the dice roll
// the player picks the order of the dice. the number on Dice 1 or Dice 2 as the first number, which will form the two digit number
// The 2 digit numbers from each player are then compared, and the higher number wins
// input1: player1 clicking submit to roll two dice randomly
// output1: outputs the numbers on the 2 dice
// input1.1: player 1 clicks on the which number as the first digit, the second digit will be the die not picked
// input2: player 2 clicking submit to roll two dice randomly
// input2.1: player 2 clicks on the which number as the first digit, the second digit will be the die not picked
// Global variables: playerOneDigit, playerTwoDigit, gameMode - playerOne, playerTwo
// functions: randomNumGenerator, numberComparer, concatenatingDigit

let round = 1;
let gameMode = "preGame";
let playerOneDigit = "";
let playerTwoDigit = "";
let number1 = "";
let number2 = "";
let myOutputValue = "";
let boardOne = [];
let boardTwo = [];
let sumOne = 0;
let sumTwo = 0;

let randomDiceNumGenerator = function () {
  let randomDec = Math.random() * 6;
  let randomInteger = Math.floor(randomDec);
  let randomDiceNum = randomInteger + 1;
  return randomDiceNum;
};

let concatenatingDigit = function (input) {
  if (input == number1) {
    let playerDigit = number1.toString() + number2.toString();
    return `${playerDigit}`;
  } else {
    let playerDigit = number2.toString() + number1.toString();
    return `${playerDigit}`;
  }
};

let numberComparer = function (playerOne, playerTwo) {
  playerOneDigit = Number(playerOne);
  playerTwoDigit = Number(playerTwo);

  if (playerOneDigit > playerTwoDigit) {
    return `Player 1 WON! <br><br>
    Player 1: ${playerOneDigit} <br>
    Player 2: ${playerTwoDigit}`;
  } else if (playerOneDigit < playerTwoDigit) {
    return `Player 2  WON! <br><br>
    Player 1: ${playerOneDigit} <br>
    Player 2: ${playerTwoDigit}`;
  } else {
    return `It is a DRAW  <br><br>
    Player 1: ${playerOneDigit} <br>
    Player 2: ${playerTwoDigit}`;
  }
};

let overallScoreComparer = function (one, two) {
  if (one > two) {
    return `Player 1 Won overall`;
  } else if (one < two) {
    return `Player 2 Won overall`;
  } else {
    return `Overall a draw`;
  }
};

let arraySum = function (array) {
  let sum = 0;
  for (let i = 0; i < round; i += 1) {
    sum += array[i];
  }
  return sum;
};

var main = function (input) {
  if (gameMode == "preGame") {
    myOutputValue = `== Beat That == <br><br> 
    Each player will take turns to generate a two-digit number. The player with the higher number wins <br><br> 
    Step 1: Click on the submit button to start the game! <br>
    Step 2: Click on the Submit button again to generate two random dice number. <br>
    Step 3: Input the number you want as the first digit. The second number will be defaulted as the second digit.`;
    gameMode = "playerOne";
  } else if (gameMode == "playerOne") {
    // player one's turn. Two dice numbers are generated. Player is asked to choose one of the number ask the first digit
    number1 = randomDiceNumGenerator();
    number2 = randomDiceNumGenerator();
    myOutputValue = `Round ${round} <br>
    Welcome Player 1! <br><br>
    You rolled ${number1} and ${number2}. Now, input one of the number as the first digit. The number not chosen will be the second digit.`;
    gameMode = "playerOneConcatenating";
  } else if (gameMode == "playerOneConcatenating") {
    // player one's choice is concatenated with the non-chosen number to form a 2-digit number. Outputs the 2-digit number.
    if (input != number1 && input != number2) {
      myOutputValue = `Please input either ${number1} or ${number2}`;
    } else {
      playerOneDigit = concatenatingDigit(input);
      gameMode = "playerTwo";
      myOutputValue = `Player 1, your concatenated number is ${playerOneDigit} <br><br>
      It is now Player 2's turn.`;
    }
  } else if (gameMode == "playerTwo") {
    // player two's turn. Two dice numbers are generated. Player is asked to choose one of the number ask the first digit
    number1 = randomDiceNumGenerator();
    number2 = randomDiceNumGenerator();
    myOutputValue = `Round ${round} <br>
    Welcome Player 2! <br><br>
    You rolled ${number1} and ${number2}. Now, input one of the number as the first digit. The number not chosen will be the second digit.`;
    gameMode = "playerTwoConcatenating";
  } else if (gameMode == "playerTwoConcatenating") {
    // player two's choice is concatenated with the non-chosen number to form a 2-digit number. Outputs the 2-digit number. gameMode is then changed to numberComparsion.
    if (input != number1 && input != number2) {
      myOutputValue = `Please input either ${number1} or ${number2}`;
    } else {
      playerTwoDigit = concatenatingDigit(input);
      gameMode = "numberComparison";
      myOutputValue = `Player 2, your concatenated number is ${playerTwoDigit} <br><br>
      Click Submit to compare the results`;
    }
  } else {
    // Outputs winner at the end of each round. When round reached 3, the game ends, and outputs the total score and overall winner. The game returns to the original state and game restarts.
    myOutputValue = numberComparer(playerOneDigit, playerTwoDigit);
    boardOne.push(playerOneDigit);
    boardTwo.push(playerTwoDigit);
    gameMode = "playerOne";
    sumOne = arraySum(boardOne);
    sumTwo = arraySum(boardTwo);
    overallWinner = overallScoreComparer(sumOne, sumTwo);
    myOutputValue += `<br><br> Total score of Player1: ${sumOne} <br> Total score of Player2: ${sumTwo}`;
    myOutputValue += `<br><br> End of round ${round}`;
    if (round == 3) {
      myOutputValue += `<br><br> ${overallWinner} <br><br> The game has ended. Click Submit to restart the game`;
      gameMode = "preGame";
      boardOne = [];
      boardTwo = [];
      sumOne = 0;
      sumTwo = 0;
      round = 1;
      return myOutputValue;
    }
    round += 1;
  }
  return myOutputValue;
};
