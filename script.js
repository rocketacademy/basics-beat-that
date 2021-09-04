var gameMode = "game intro";
var player1RollDiceResult = [];
var player1ConcatenateNum = "";
var player2RollDiceResult = [];
var player2ConcatenateNum = "";
var concatenateNum = "";
var rollDiceResult = [];
var numOfDice = 2;
var winResults = "";

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "game intro") {
    gameMode = "player 1 selection";
    player1RollDiceResult = generateDiceResult();
    console.log(`This is player 1 roll dice result ${player1RollDiceResult}`);
    console.log(`Current game mode is ${gameMode}`);
    myOutputValue = `Welcome Player 1.<br><br>You rolled ${player1RollDiceResult[0]} for Dice 1 and ${player1RollDiceResult[1]} for Dice 2.<br><br>Choose the order of the dice.`;
    return myOutputValue;
  } else if (gameMode == "player 1 selection") {
    player1ConcatenateNum = concatenateDiceNum(input);
    myOutputValue = `Player 1, you chose ${input} first.<br><br>Your number is ${player1ConcatenateNum}.<br><br>It is now Player 2's turn. Click Submit to roll dice`;
    gameMode = "player 2 roll dice";
    return myOutputValue;
  } else if (gameMode == "player 2 roll dice") {
    gameMode = "player 2 selection";
    player2RollDiceResult = generateDiceResult();
    myOutputValue = `Welcome Player 2.<br><br>You rolled ${player2RollDiceResult[0]} for Dice 1 and ${player2RollDiceResult[1]} for Dice 2.<br><br>Choose the order of the dice.`;
    return myOutputValue;
  } else if (gameMode == "player 2 selection") {
    player2ConcatenateNum = concatenateDiceNum(input);
    winResults = checkWhoWins(player1ConcatenateNum, player2ConcatenateNum);
    myOutputValue = `Player 2, you chose ${input} first.<br><br>Your number is ${player2ConcatenateNum}.<br><br>${winResults}`;
    return myOutputValue;
  }
  return myOutputValue;
};

// Function to generate random dice number
var rollDice = function () {
  var randomDiceNum = Math.floor(Math.random() * 6) + 1;
  return randomDiceNum;
};

// Function to add random dice number to array
var generateDiceResult = function () {
  var counter = 0;
  rollDiceResult = [];
  while (counter < numOfDice) {
    rollDiceResult.push(rollDice());
    counter += 1;
  }
  return rollDiceResult;
};

// Function to concatenate dice numbers

var concatenateDiceNum = function (input) {
  var dicePosition1 = "";
  var dicePosition2 = "";
  if (input == "Dice 1") {
    dicePosition1 = rollDiceResult[0];
    console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[1];
    console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  } else {
    dicePosition1 = rollDiceResult[1];
    console.log(`Number in Dice Position 1 is ${dicePosition1}`);
    dicePosition2 = rollDiceResult[0];
    console.log(`Number in Dice Position 2 is ${dicePosition2}`);
    concatenateNum = Number(
      dicePosition1.toString() + dicePosition2.toString()
    );
    return concatenateNum;
  }
};

// Function to check who wins

var checkWhoWins = function (player1Num, player2Num) {
  var results = "";
  var resultStatement = "";
  gameMode = "game intro";

  if (player1Num == player2Num) {
    results = "draw";
    resultStatement = `It's a draw! Click submit to try again.`;
    return resultStatement;
  } else if (player1Num > player2Num) {
    results = "player1";
    resultStatement = `Player 1 won! Click submit to play again.`;
    return resultStatement;
  } else {
    results = "player2";
    resultStatement = `Player 2 won! Click submit to play again.`;
    return resultStatement;
  }
};

// Player 1 clicks submit then run rollDice function 2 times and store the results into player 1 array
// Ask player 1 to select which the order of the result
// Concatenage the selected order
// Inform player 1 his selected result
// Ask player 2 to start rolling dice
