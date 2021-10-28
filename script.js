var dice1 = 0;
var dice2 = 0;
var player1Dice = ``;
var player2Dice = ``;
var p1Array = [];
var p2Array = [];
var gameMode = `Player 1`;
var msg = `Welcome ${gameMode}.`;

var main = function (input) {
  // force start the game with player 1
  if (gameMode == `Player 1` || gameMode == `Player 2`) {
    if (gameMode == `Player 1`) {
      gameMode = `p1Choice`;
      console.log(`current game mode is ${gameMode}`);
    } else if (gameMode == `Player 2`) {
      gameMode = `p2Choice`;
      console.log(`current game mode is ${gameMode}`);
    }
    return playerDiceRoll();
  }

  if (gameMode == `p1Choice`) {
    if (input == dice1) {
      console.log(`choose order block code here`);
      player1Dice = `${dice1}${dice2}`;
      gameMode = `Player 2`;
      return (msg = `Player 1, you chose Dice 1 first.<br>Your number is ${player1Dice}.<br>It is now Player 2's turn.`);
    } else if (input == dice2) {
      player1Dice = `${dice2}${dice1}`;
      gameMode = `Player 2`;
      return (msg = `Player 1, you chose Dice 2 first.<br>Your number is ${player1Dice}.<br>It is now Player 2's turn.`);
    } else {
      msg = `Please input a valid dice number`;
      return msg;
    }
  } else if (gameMode == `p2Choice`) {
    console.log(gameMode);
    if (input == dice1) {
      console.log(`choose order block code for player 2 here`);
      player2Dice = `${dice1}${dice2}`;
      gameMode = `Compare results`;
      return (msg = `Player 2, you chose Dice 1 first.<br>Your number is ${player2Dice}.`);
    } else if (input == dice2) {
      player2Dice = `${dice2}${dice1}`;
      gameMode = `Compare results`;
      return (msg = `Player 2, you chose Dice 2 first.<br>Your number is ${player2Dice}.`);
    } else {
      msg = `Please input a valid dice number`;
      return msg;
    }
  }
  // add players scores to arrays
  p1Array.push(player1Dice);
  p2Array.push(player2Dice);

  // compare the result of the rolls from both players
  if (gameMode == `Compare results`) {
    console.log(gameMode);
    if (Number(player1Dice) > Number(player2Dice)) {
      msg = `Player 1 won this round. `;
      return msg;
    } else if (Number(player1Dice) < Number(player2Dice)) {
      msg = `Player 2 won this round.`;
      return msg;
    } else if (Number(player1Dice) < Number(player2Dice)) {
      msg = `It's a draw!`;
      return msg;
    }

    return msg;
  }
  gameMode = `Player 1`;
};

var playerDiceRoll = function () {
  dice1 = rollDice();
  dice2 = rollDice();
  console.log(dice1, dice2);
  return (msg += `<br>You rolled ${dice1} and ${dice2}. Please input a valid dice number to determine your score`);
};

var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;

  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);

  // it's a number from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;

  return diceNumber;
};
