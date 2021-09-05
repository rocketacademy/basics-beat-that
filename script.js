var player1Dice = [];
var player2Dice = [];
var player1Num;
var player2Num;
var myOutputValue = " ";
var gameMode = "Get player 1 dice roll";

// roll a random number
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  if (gameMode == "Get player 1 dice roll") {
    myOutputValue = getRandomDiceRoll();
    gameMode = "Choose dice order";
  } else if (gameMode == "Choose dice order") {
    myOutputValue = chooseDiceOrder(input);
    gameMode = "Get player 2 dice roll";
  } else if (gameMode == "Get player 2 dice roll") {
    myOutputValue = getRandomDiceRoll2();
    gameMode = "Choose dice order 2";
  } else if (gameMode == "Choose dice order 2") {
    gameMode = "Results";
    myOutputValue = chooseDiceOrder2(input);
  } else if (gameMode == "Results") {
    console.log("hi");
    myOutputValue = results();
  }

  console.log(gameMode);
  return myOutputValue;
};

var getRandomDiceRoll = function () {
  player1Dice.push(diceRoll(), diceRoll());
  console.log(player1Dice);
  return `Welcome Player 1. <br>
  The 2 dice rolls are: ${player1Dice}. <br>
  Choose the order of the dice (Enter 1 or 2)`;
};

var getRandomDiceRoll2 = function () {
  player2Dice.push(diceRoll(), diceRoll());
  console.log(player2Dice);
  return `Welcome Player 2. <br>
  The 2 dice rolls are: ${player2Dice}. <br>
  Choose the order of the dice (Enter 1 or 2)`;
};

var chooseDiceOrder = function (input) {
  if (input == 1) {
    player1Num = Number(`${player1Dice[0]}${player1Dice[1]}`);
    return `Player 1, you chose Dice 1 first. <br>
    Your number is ${player1Num}. <br>
    It is now Player 2's turn. `;
  } else {
    player1Num = Number(`${player1Dice[1]}${player1Dice[0]}`);

    return `Player 1, you chose Dice 2 first. <br>
    Your number is ${player1Num}.<br>
    It is now Player 2's turn. `;
  }
};

var chooseDiceOrder2 = function (input) {
  if (input == 1) {
    console.log(player2Dice[0]);
    console.log(player2Dice[1]);
    player2Num = Number(`${player2Dice[0]}${player2Dice[1]}`);
    return `Player 2, you chose Dice 1 first. <br>
    Your number is ${player2Num}. <br>
    Click 'Submit' to see results.`;
  } else {
    player2Num = Number(`${player2Dice[1]}${player2Dice[0]}`);
    console.log(player2Dice[1]);
    console.log(player2Dice[0]);
    return `Player 2, you chose Dice 2 first. <br>
    Your number is ${player2Num}.<br>
    Click 'Submit' to see results.`;
  }
};

var results = function () {
  console.log(player1Num);
  console.log(player2Num);
  if (player1Num > player2Num) {
    return `Player 1 number is ${player1Num} and Player 2 number is ${player2Num}.<br>
    Player 1 Wins!`;
  } else if (player1Num < player2Num) {
    return `Player 1 number is ${player1Num} and Player 2 number is ${player2Num}.<br>
    Player 2 Wins!`;
  }
};
