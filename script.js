// Project 2 - Beat That
// There are 2 players and players take turns.
/* When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.
*/
// input1: username; input 2: order of dice
// output: combined number and winner

// declaring global variables
let currentPlayer = "player 1";
let gameStatus = "roll dice";
let noOfPlayers = 2;
let player1dice = 0;
let player2dice = 0;
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
  if (currentPlayer == "player 1") {
    for (let diceNo = 0; diceNo < diceRollTimes; diceNo += 1) {
      diceRollResult1[diceNo] = rollDice();
    }
    gameStatus = "choose combi";
    return `Welcome Player 1. <br>You rolled ${diceRollResult1[0]} for Dice 1 and ${diceRollResult1[1]} for Dice 2. Enter the number of the dice you would like to put first.`;
  } else {
    for (let diceNo = 0; diceNo < diceRollTimes; diceNo += 1) {
      diceRollResult2[diceNo] = rollDice();
    }
    gameStatus = "choose combi";
    return `Welcome Player 2. <br>You rolled ${diceRollResult2[0]} for Dice 1 and ${diceRollResult2[1]} for Dice 2. Enter the number of the dice you would like to put first.`;
  }
};

let sumDice = function (input) {
  let outputValue = "";
  if (currentPlayer == "player 1") {
    if (input == 1) {
      player1dice = "" + diceRollResult1[0] + diceRollResult1[1];
    } else {
      player1dice = "" + diceRollResult1[1] + diceRollResult1[0];
    }
    outputValue = `Player 1 you have chosen to put Dice ${input} first, so your total number is ${player1dice}. Now click submit to roll the dice for Player 2.`;
    currentPlayer = "player 2";
    gameStatus = "roll dice";
  } else {
    if (input == 1) {
      player2dice = "" + diceRollResult2[0] + diceRollResult2[1];
    } else {
      player2dice = "" + diceRollResult2[1] + diceRollResult2[0];
    }

    if (player1dice == player2dice) {
      outputValue = `Player 2 you have chosen to put Dice ${input} first, so your total nunber is ${player2dice}. <br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> This round is a draw! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    } else if (player1dice > player2dice) {
      winner = "Player 1";
      outputValue = `Player 2 you have chosen to put Dice ${input} first, so your total nunber is ${player2dice}. <br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> The winner for this round is ${winner}! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    } else {
      winner = "Player 2";
      outputValue = `Player 2 you have chosen to put Dice ${input} first, so your total nunber is ${player2dice}. <br> Player 1's combined number: ${player1dice} <br> Player 2's combined number: ${player2dice} <br> The winner for this round is ${winner}! <br><br>Now click submit to start a new round and roll the dice for Player 1.`;
    }
    currentPlayer = "player 1";
    gameStatus = "roll dice";
  }
  return outputValue;
};

let main = function (input) {
  let myOutputValue = "";
  if (gameStatus == "roll dice") {
    myOutputValue = checkDiceOrder();
  } else if (gameStatus == "choose combi" && input != "1" && input != "2") {
    myOutputValue = `You have keyed in an invalid choice. Please key in "1" to put Dice 1 first or "2" to put Dice 2 first.`;
  } else if (gameStatus == "choose combi") {
    myOutputValue = sumDice(input);
  }
  return myOutputValue;
};
