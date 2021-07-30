diceOneNumbers = [1, 2, 3, 4, 5, 6];
diceTwoNumbers = [1, 2, 3, 4, 5, 6];

playerOneRolls = [];
playerOneNumber = [];

playerTwoRolls = [];
playerTwoNumber = [];

winCounterPone = 0;
winCounterPtwo = 0;

currentMode = 1;

/*Modes:
1 - Number rolling
2 - Display results. Player one Swaps if needed
3 - Player two Swaps if needed
4 - Converting array into actual numbers, then choosing winner
*/

//Generate a pair of numbers for player one. Push into playerOneRolls[] array
//Generate a pair of numbers for player two. Push into playerTwoRolls[] array

var main = function (input) {
  console.log(`>>>>Running game.`);
  console.log(`- Current mode: ${currentMode}.`);
  if (input == "") {
    var myOutputValue = `Hi! You get two dice each. After rolling, we will put both dice side-by-side to see who comes up with the biggest numerical combination!<br/>Each player can choose the order in which the dice are placed.<br/>To roll, please enter "Roll"!`;
  }
  if (currentMode == 4 && input == "") {
    var myOutputValue = comparingNumbers();
  }
  if (currentMode == 3) {
    var myOutputValue = playerTwoShifting(input); //Mode changed to 4 in this function
  }
  if (currentMode == 2) {
    var myOutputValue = playerOneShifting(input); //Mode changed to 3 in this function
  }
  if (input == "Go again" || (input == "Roll" && currentMode == 1)) {
    currentMode == 1;
    playerOneRolls = [];
    playerTwoRolls = [];
    rollingPlayerOne();
    rollingPlayerTwo();
    currentMode = 2;
    var myOutputValue = `Player one's numbers: ${playerOneRolls}<br/>Player two's numbers: ${playerTwoRolls}<br/><br/>Now, decide whether you wish to Swap the numbers, or wish to keep them as is!<br/><br/>Player one, please decide first.<br/>Type in "Swap" and click submit to swap the numbers, or click the submit button to keep the number order.`;
    console.log(`- Current mode: ${currentMode}.`);
  }
  return myOutputValue;
};

//P1 numbers rolling
var rollingPlayerOne = function () {
  counter = 0;
  while (counter < 2) {
    var rNG = randomNumberGenerator();
    playerOneRolls.push(rNG); //Stores numbers
    console.log(`Rolling P1 number. P1 number(s) pushed: ${playerOneRolls}`);
    counter += 1;
  }
  playerOneNumber = playerOneRolls.join(""); //Joins the two numbers, pushes into playerOneNumber[] array
};

//P2 numbers rolling
var rollingPlayerTwo = function () {
  counter = 0;
  while (counter < 2) {
    var rNG = randomNumberGenerator();
    playerTwoRolls.push(rNG); //Stores numbers
    console.log(`Rolling P2 number. P2 number(s) pushed: ${playerTwoRolls}`);
    counter += 1;
  }
  playerTwoNumber = playerTwoRolls.join(""); //Joins the two numbers, pushes into playerOneNumber[] array
};

//RNG function.
var randomNumberGenerator = function () {
  var randomNumber = Math.random() * 6;
  console.log(`Initial number: ${randomNumber}.`);
  var numberCleanedUp = Math.floor(randomNumber) + 1; //+1 to ensure that '0' isn't rolled
  console.log(`RNG working. Number generated: ${numberCleanedUp}`);
  return numberCleanedUp;
};

//P1 Changing dice order function
var playerOneShifting = function (input) {
  console.log(
    `P1 original order: ${playerOneRolls}. Current mode: ${currentMode}.`
  );
  //Player 1 keeps order
  if (currentMode == 2 && input == "") {
    var myOutputValue = `Player one has chosen to keep the order of ${playerOneNumber}.<br/><br/>Player two, please enter "Swap" or leave the field blank and click submit to proceed.`;
    console.log(`P1 keeping ${playerOneNumber}.`);
  }
  //Player 1 switches order
  if (currentMode == 2 && input == "Swap") {
    swapArray = [playerOneRolls[0], playerOneRolls[1]] = [
      playerOneRolls[1],
      playerOneRolls[0],
    ];
    playerOneNumber = swapArray.join("");

    console.log(`P1 numbers changed to ${playerOneNumber}.`);
    var myOutputValue = `Player one has swapped to make ${playerOneNumber}.<br/><br/>Player two, please enter "Swap" or leave the field blank and click submit to proceed.`;
  }
  currentMode = 3; //Mode change - 3
  console.log(`- Current mode: ${currentMode}.`);
  return myOutputValue;
};

//P2 Changing dice order function
var playerTwoShifting = function (input) {
  console.log(
    `P2 original order: ${playerTwoRolls}. Current mode: ${currentMode}.`
  );
  //Player 2 keeps order
  if (currentMode == 3 && input == "") {
    var myOutputValue = `Player two has chosen to keep the order of ${playerTwoNumber}.<br/><br/>Now, click the submit button to determine the winner!`;
    console.log(`P2 keeping ${playerTwoNumber}.`);
  }
  //Player 2 switches order
  if (currentMode == 3 && input == "Swap") {
    currentMode = 4;
    swapArray = [playerTwoRolls[0], playerTwoRolls[1]] = [
      playerTwoRolls[1],
      playerTwoRolls[0],
    ];
    playerTwoNumber = swapArray.join("");
    console.log(`P2 numbers changed to ${playerTwoNumber}.`);
    var myOutputValue = `Player two has swapped to make ${playerTwoNumber}..<br/><br/>Now, click the submit button to determine the winner!`;
  }
  currentMode = 4; //Mode change - 4
  console.log(`- Current mode: ${currentMode}.`);
  return myOutputValue;
};

var comparingNumbers = function (input) {
  console.log(`Comparing numbers...`);
  if (playerOneNumber > playerTwoNumber) {
    winCounterPone += 1;
    var myOutputValue = `The results are ${playerOneNumber} vs. ${playerTwoNumber}. Player One wins! The score is:<br/>Player One wins: ${winCounterPone}<br/>Player Two wins: ${winCounterPtwo}<br/><br/>Type "Roll" to try again!`;
  }
  if (playerOneNumber < playerTwoNumber) {
    winCounterPtwo += 1;
    var myOutputValue = `The results are ${playerOneNumber} vs. ${playerTwoNumber}. Player Two wins! The score is:<br/>Player One wins: ${winCounterPone}<br/>Player Two wins: ${winCounterPtwo}<br/><br/>Type "Go again" to try again!`;
  }
  console.log(`P1 vs. P2: ${playerOneNumber} vs ${playerTwoNumber}.`);
  console.log(`<<<<Round ended.`);
  return myOutputValue;
};
