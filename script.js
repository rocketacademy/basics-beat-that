//global variable
var player1 = `Player 1`;
var player2 = `Player 2`;
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var currentPlayer = player1;
var player1Num = 0;
var player2Num = 0;
var winner = ``;
var compareResult = ``;

// Initial game prompt
{
  var color = "green";
  document.write(
    `<CENTER><FONT FACE=ARIAdL,VERDANA COLOR=${color} SIZE=5>Welcome! ${player1} and ${player2}.<br>Click Submit to Start Playing.</FONT><HR NOSHADE WIDTH=450></CENTER><P>`
  );
}

// generate random dice number from 1 to 6
var generateRandomDiceNumber = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`randomDiceNumber =${randomDiceNumber}`);
  return randomDiceNumber;
};

// Player rolls Dice
var playerRollDice = function () {
  if (currentPlayer == player1) {
    player1Dice1 = generateRandomDiceNumber();
    player1Dice2 = generateRandomDiceNumber();
    return `${player1}.<br>Your 1st Dice = ${player1Dice1}<br> Your 2nd Dice = ${player1Dice2}.<br><br>Enter '1' or '2' to choose the 1st or 2nd Dice  as your 1st Number respectively.`;
  }
  if (currentPlayer == player2) {
    player2Dice1 = generateRandomDiceNumber();
    player2Dice2 = generateRandomDiceNumber();
    return `${player2}.<br>Your 1st Dice = ${player2Dice1}<br> Your 2nd Dice = ${player2Dice2}.<br><br>Enter '1' or '2' to choose the 1st or 2nd Dice  as your 1st Number respectively.`;
  }
};

// Player choose Dice Order
var chooseDiceOrder = function (input) {
  if (currentPlayer == player1 && input == 1) {
    player1Num = Number("" + player1Dice1 + player1Dice2);
    console.log(player1Num);
    return player1Num;
  } else if (currentPlayer == player1 && input == 2) {
    player1Num = Number("" + player1Dice2 + player1Dice1);
    console.log(player2Num);
    return player1Num;
  }
  if (currentPlayer == player2 && input == 1) {
    player2Num = Number("" + player2Dice1 + player2Dice2);
    console.log(player2Num);
    return player2Num;
  } else if (currentPlayer == player2 && input == 2) {
    player2Num = Number("" + player2Dice2 + player2Dice1);
    console.log(player2Num);
    return player2Num;
  }
};

// Compare Player 1 and Player 2 Num
var comparePlayerNum = function () {
  if (player1Num > player2Num) {
    winner = player1;
  } else if (player1Num < player2Num) {
    winner = player2;
  }
  return winner;
};

var main = function (input) {
  if (currentPlayer == player1 && player1Dice1 == 0 && player1Dice2 == 0) {
    return playerRollDice();
  } else if (
    currentPlayer == player1 &&
    player1Dice1 != 0 &&
    player1Dice2 != 0
  ) {
    player1Num = chooseDiceOrder(input);
    console.log(`player 1 number is ${player1Num}`);
    // switch player
    currentPlayer = player2;
    return `Player 1 number is ${player1Num}.<br>Player 2 click submit to play.`;
  } else if (
    currentPlayer == player2 &&
    player2Dice1 == 0 &&
    player2Dice2 == 0
  ) {
    return playerRollDice();
  } else if (
    currentPlayer == player2 &&
    player2Dice1 != 0 &&
    player2Dice2 != 0
  ) {
    player2Num = chooseDiceOrder(input);
    console.log(`player 2 number is ${player2Num}`);
    // switch mode
    currentPlayer = compareResult;
    return `Player 2 number is ${player2Num}.<br>Player 2 click submit to find the winner.`;
  } else if (player1Num != 0 && player2Num != 0) {
    winner = comparePlayerNum();
    return `Winner is ${winner}<br>Player 1 number is ${player1Num}<br>Player 2 number is ${player2Num}<br><br>click submit to start playing again`;
  } else if (player1Num == player2Num) {
    return `It's a draw!<br>Player 1 number is ${player1Num}<br>Player 2 number is ${player2Num}<br><br>click submit to start playing again`;
  }
  return myOutputValue;
};
