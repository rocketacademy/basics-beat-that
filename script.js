var myOutputValue = " ";
var gameMode = "Get player 1 dice roll";

// roll a random number between 1-6
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  if (gameMode == "Get player 1 dice roll") {
    player1Dice = [];
    player2Dice = [];
    currPlayer = 1;
    myOutputValue = getRandomDiceRoll();
    gameMode = "Choose dice order";
  } else if (gameMode == "Choose dice order") {
    myOutputValue = chooseDiceOrder(input);
    gameMode = "Get player 2 dice roll";
  } else if (gameMode == "Get player 2 dice roll") {
    currPlayer = 2;
    myOutputValue = getRandomDiceRoll();
    gameMode = "Choose dice order 2";
  } else if (gameMode == "Choose dice order 2") {
    myOutputValue = chooseDiceOrder(input);
    gameMode = "Get player 1 dice roll";
  }

  console.log(gameMode);
  console.log(`Player ${currPlayer}`);
  return myOutputValue;
};

var getRandomDiceRoll = function () {
  if (currPlayer == 1) {
    player1Dice.push(diceRoll(), diceRoll());
    console.log(player1Dice);
    return `Welcome Player ${currPlayer}. <br>
  The 2 dice rolls are: ${player1Dice}. <br>
  Choose the order of the dice (Enter 1 or 2)`;
  } else if (currPlayer == 2) {
    player2Dice.push(diceRoll(), diceRoll());
    console.log(player2Dice);
    return `Welcome Player ${currPlayer}. <br>
      The 2 dice rolls are: ${player2Dice}. <br>
      Choose the order of the dice (Enter 1 or 2)`;
  }
};

var chooseDiceOrder = function (input) {
  if (currPlayer == 1 && input == 1) {
    player1Num = `${player1Dice[0]}${player1Dice[1]}`;
    return `Player ${currPlayer}, you chose Dice 1 first. <br>
    Your number is ${player1Num}. <br>
    It is now Player 2's turn. `;
  } else if (currPlayer == 1 && input == 2) {
    player1Num = `${player1Dice[1]}${player1Dice[0]}`;
    return `Player ${currPlayer}, you chose Dice 2 first. <br>
    Your number is ${player1Num}.<br>
    It is now Player 2's turn. `;
  } else if (currPlayer == 2 && input == 1) {
    player2Num = `${player2Dice[0]}${player2Dice[1]}`;
    return `Player ${currPlayer}, you chose Dice 1 first. <br>
    Your number is ${player2Num}. <br>
    ${results()} `;
  } else if (currPlayer == 2 && input == 2) {
    player2Num = `${player2Dice[1]}${player2Dice[0]}`;
    return `Player ${currPlayer}, you chose Dice 2 first. <br>
    Your number is ${player2Num}.<br>
    ${results()} `;
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
