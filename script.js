// Project 2 - Beat That
// There are 2 players and players take turns.
/* At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.*/
// input : no of dice -> rollDice -> output : dice roll values and optimal combined no for each player -> shows winner of that round + leaderboard

// declaring global variables
let currentPlayer = "Player 1";
let gameStatus = "numPlayers";
let gameCtr = 0;
let noOfPlayers = 2;
let player1dice = [];
let player2dice = [];
let numDice = 2;
let diceRollTimes = 2;
let diceRollResult1 = [];
let diceRollResult2 = [];

let rollDice = function () {
  let randomDecimal = Math.random() * 6;
  let randomInteger = Math.floor(randomDecimal) + 1;
  console.log(randomInteger);
  return randomInteger;
};

let checkDiceOrder = function () {
  if (currentPlayer == "Player 1") {
    for (let diceNo = 0; diceNo < diceRollTimes; diceNo += 1) {
      diceRollResult1[diceNo] = rollDice();
    }
    gameStatus = "choose combi";
    return `Welcome Player 1.<br><br>You rolled ${diceRollResult1[0]} for Dice 1 and ${diceRollResult1[1]} for Dice 2. Enter the number of the dice you would like to put first.`;
  } else {
    for (let diceNo = 0; diceNo < diceRollTimes; diceNo += 1) {
      diceRollResult2[diceNo] = rollDice();
    }
    gameStatus = "choose combi";
    return `Welcome Player 2. <br><br>You rolled ${diceRollResult2[0]} for Dice 1 and ${diceRollResult2[1]} for Dice 2. Enter the number of the dice you would like to put first.`;
  }
};

let sumDice = function (input) {
  let outputValue = "";
  if (currentPlayer == "Player 1") {
    if (diceRollResult1[0] > diceRollResult1[1]) {
      player1dice = "" + diceRollResult1[0] + diceRollResult1[1];
    } else {
      player1dice = "" + diceRollResult1[1] + diceRollResult1[0];
    }
    outputValue = `Player 1 you have chosen to put Dice ${input} first, so your total number is ${player1dice}. Now click submit to roll the dice for Player 2.`;
    currentPlayer = "Player 2";
    gameStatus = "rollDice";
  } else {
    if (input == 1) {
      player2dice = "" + diceRollResult2[0] + diceRollResult2[1];
    } else {
      player2dice = "" + diceRollResult2[1] + diceRollResult2[0];
    }

    if (player1dice == player2dice) {
      outputValue = `<b>Player 2</b><br>You have chosen to put Dice ${input} first, so your total number is ${player2dice}. <br><br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> This round is a draw! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    } else if (player1dice > player2dice) {
      winner = "Player 1";
      outputValue = `Player 2 you have chosen to put Dice ${input} first, so your total number is ${player2dice}. <br><br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> The winner for this round is ${winner}! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    } else {
      winner = "Player 2";
      outputValue = `Player 2 you have chosen to put Dice ${input} first, so your total number is ${player2dice}. <br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> The winner for this round is ${winner}! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    }
    currentPlayer = "Player 1";
    gameStatus = "rollDice";
  }
  return outputValue;
};

let main = function (input) {
  let myOutputValue = "";
  if (gameStatus == "numPlayers" && input == isNaN(input)) {
    console.log(isNaN(input));
    myOutputValue = `You have keyed in an invalid choice. Please key in the number of dice you wish to use. Then click submit to roll the dice.`;
  } else if (gameStatus == "numPlayers" && input != isNaN(input)) {
    console.log(isNaN(input));
    numPlayers = input;
    gameStatus = "rollDice";
  }
  /*} else if (gameStatus == "numDice" && input != Number.isNaN(input)) {
    numDice = input;
    gameStatus = "rollDice";
  } */
  if (gameStatus == "rollDice") {
    myOutputValue = checkDiceOrder();
  } else if (gameStatus == "choose combi" && input != "1" && input != "2") {
    myOutputValue = `You have keyed in an invalid choice. Please key in "1" to put Dice 1 first or "2" to put Dice 2 first.`;
  } else if (gameStatus == "choose combi") {
    myOutputValue = sumDice(input);
  }
  return myOutputValue;
};
