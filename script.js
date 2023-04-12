// Project 2 - Beat That
// There are 2 players and players take turns.
/* At the beginning of each round, ask the players how many dice they would like to play with. Both players will roll the same number of dice each round.
Store each player's dice rolls in an array. When each player rolls dice, use a loop to place n dice roll values in that player's array, where n is the number of dice the players specified at the beginning of the round. Output each player's dice roll values.
Auto-generate the optimal combined number based on each player's dice rolls to determine the winner of that round.*/
// input : no of dice -> rollDice -> output : dice roll values and optimal combined no for each player -> shows winner of that round + leaderboard

// declaring global variables
let gameStatus = "numDice";
let gameCtr = 0;
let noOfPlayers = 2;
let currentPlayer = "Player ";
let PlayerCtr = 0;
let player1dice = [];
let player2dice = [];
let numDice = 2;
let diceRollResult = [];
let player1total = 0;
let player2total = 0;

// rolling one dice
let rollOneDice = function () {
  let randomDecimal = Math.random() * 6;
  let randomInteger = Math.floor(randomDecimal) + 1;
  console.log(randomInteger);
  return randomInteger;
};

// to find winner of each round
let findWinner = function () {
  let winner = "";
  if (player1dice[gameCtr] == player2dice[gameCtr]) {
    winner = "Draw";
  } else if (player1dice[gameCtr] < player2dice[gameCtr]) {
    winner = "Player 2";
  } else {
    winner = "Player 1";
  }
  return winner;
};

// to find winner for Leaderboard
let findGrandWinner = function () {
  let grandWinner = "";
  if (player1total == player2total) {
    grandWinner = "Draw";
  } else if (player1total < player2total) {
    grandWinner = "Player 2";
  } else {
    grandWinner = "Player 1";
  }
  return grandWinner;
};

// roll no of Dice specified by user
let rollTotalDice = function () {
  let outputValue = "";
  let winner = "";
  if (gameCtr == 0) {
    outputValue = `Welcome ${currentPlayer}. 🤩 <br><br> You have rolled`;
  } else {
    outputValue = `${currentPlayer}, you have rolled`;
  }
  for (let diceNo = 0; diceNo < numDice; diceNo += 1) {
    diceRollResult[diceNo] = rollOneDice();
    console.log(`Dice ${diceNo}: ${diceRollResult[diceNo]}<br>`);
  }
  for (let arrayPos = 0; arrayPos < numDice; arrayPos += 1) {
    if (arrayPos < numDice - 1) {
      outputValue = outputValue + ` ${diceRollResult[arrayPos]},`;
    } else {
      outputValue = outputValue + ` ${diceRollResult[arrayPos]}. `;
    }
  }

  diceRollResult.sort();
  diceRollResult.reverse();

  if (currentPlayer == "Player 1") {
    player1dice.push(diceRollResult.join(""));
    player1total = player1total + Number(player1dice[gameCtr]);
    outputValue =
      outputValue +
      `Your optimal combination is ${player1dice[gameCtr]}. 💪 <br>Click "Submit" to roll the dice for the next player.`;
  } else {
    player2dice.push(diceRollResult.join(""));
    player2total = player2total + Number(player2dice[gameCtr]);
    winner = findWinner();
    grandWinner = findGrandWinner();
    outputValue =
      outputValue +
      `Your optimal combination is ${player2dice[gameCtr]}. 💪 <br><br>The winner for this round is ${winner}! 🎉
      <br>Click "Submit" to start a new round! <br><br> `;
    gameCtr += 1;
    outputValue = outputValue + displayScoreBoard();
  }
  return outputValue;
};

// to display the Scoreboard
let displayScoreBoard = function () {
  if (grandWinner == "Draw") {
    return `<div id="scoreboard"><center>
      <hr style="width:50%">
        <br>🏆 Scoreboard 🏆
        <br>
        <br>There are currently no grand winners. It is a draw! 🤗
        <br><br>Player 1 Grand Total: ${player1total}<br>Player 2 Grand Total: ${player2total}<br>Total Rounds: ${gameCtr}</center></div>`;
  } else {
    return `<div id="scoreboard"><center>
      <hr style="width:50%">
        <br>🏆 Leaderboard 🏆
        <br>
        <br>${grandWinner} is leading! 🎊
        <br><br>Player 1 Grand Total: ${player1total}<br>Player 2 Grand Total: ${player2total}<br>Total Rounds: ${gameCtr}</center></div>`;
  }
};

let main = function (input) {
  let myOutputValue = "";
  if (Number.isNaN(Number(input)) && gameStatus == "numDice") {
    myOutputValue = `You have keyed in an invalid choice. Please key in the number of dice you wish to use. Then click submit to roll the dice.`;
  } else if (gameStatus == "rollDice" && input != "") {
    myOutputValue = `You don't need to key in anything. Please click 'Submit' to roll the dice.`;
  } else if (gameStatus == "numDice") {
    PlayerCtr += 1;
    currentPlayer = `Player ${PlayerCtr}`;
    numDice = input;
    gameStatus = "rollDice";
    myOutputValue = rollTotalDice();
  } else if (gameStatus == "rollDice" && currentPlayer == "Player 1") {
    PlayerCtr += 1;
    currentPlayer = `Player ${PlayerCtr}`;
    myOutputValue = rollTotalDice();
  } else {
    PlayerCtr -= 1;
    currentPlayer = `Player ${PlayerCtr}`;
    myOutputValue = rollTotalDice();
  }
  return myOutputValue;
};
