//create required variables

var mode = "roll dice";
var playerNumber = 1;
var diceRoll1 = 0;
var diceRoll2 = 0;

var player1Dice = [];
var player2Dice = [];
var player1Output = [];
var player2Output = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

var determineWinner = function () {
  if (player1Output > player2Output) {
    return "Player 1 won";
  } else if (player1Output < player2Output) {
    return "Player 2 won";
  }
  return "A tie";
};

var concatenate2Num = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

function main(input) {
  if (mode == "roll dice" && playerNumber == 1 && input == "") {
    diceRoll1 = getRandomNumber();
    diceRoll2 = getRandomNumber();
    player1Dice = [diceRoll1, diceRoll2];
    mode = "enter order";
    return `You are Player number 1. You rolled ${diceRoll1} and ${diceRoll2}. Now, please pick Dice 1 or 2 as the first numerical of the combined number e.g. 2`;
  } else if ((mode = "roll dice" && playerNumber == 2 && input == "")) {
    diceRoll1 = getRandomNumber();
    diceRoll2 = getRandomNumber();
    player2Dice = [diceRoll1, diceRoll2];
    mode = "enter order";
    return `You are Player number 2. You rolled ${diceRoll1} and ${diceRoll2}. Now, please pick Dice 1 or 2 as the first numerical of the combined number e.g. 2`;
  }

  if ((mode = "enter order" && playerNumber == 1 && input == 1)) {
    player1Output = concatenate2Num(player1Dice[0], player1Dice[1]);
    playerNumber = 2;
    console.log(playerNumber);
    mode = "roll dice";
    console.log(mode);
    return `You picked Dice 1 as the first numerical of the combined number. Your result: ${player1Output}. It's player 2's turn now. Click Submit to roll dice`;
  } else if ((mode = "enter order" && playerNumber == 1 && input == 2)) {
    player1Output = concatenate2Num(player1Dice[1], player1Dice[0]);
    playerNumber = 2;
    console.log(playerNumber);
    mode = "roll dice";
    console.log(mode);
    return `You picked Dice 2 as the first numerical of the combined number. Your result: ${player1Output}. It's player 2's turn now. Click Submit to roll dice`;
  } else if ((mode = "enter order" && playerNumber == 2 && input == 1)) {
    player2Output = concatenate2Num(player2Dice[0], player2Dice[1]);
    playerNumber = 1;
    console.log(playerNumber);
    mode = "roll dice";
    console.log(mode);
    var winningPlayer = determineWinner();
    return `You picked Dice 1 as the first numerical of the combined number. Player 2: ${player2Output} & Player 1: ${player1Output}. ${winningPlayer} won`;
  } else if ((mode = "enter order" && playerNumber == 2 && input == 2)) {
    player2Output = concatenate2Num(player2Dice[1], player2Dice[0]);
    playerNumber = 1;
    console.log(playerNumber);
    mode = "roll dice";
    console.log(mode);
    var winningPlayer = determineWinner();
    return `You picked Dice 2 as the first numerical of the combined number. Player 2: ${player2Output} & Player 1: ${player1Output}. ${winningPlayer} won`;
  }
}
