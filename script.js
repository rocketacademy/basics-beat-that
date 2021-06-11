// common var
var PLAYER1 = `Player 1`;
var PLAYER2 = `Player 2`;
var PLAYER1_CHOOSE_DICE_ORDER = `Player 1 choose dice order`;
var PLAYER2_CHOOSE_DICE_ORDER = `Player 2 choose dice order`;
var COMPARE_SCORE = `Compare Score`;

// set initial stage to player 1
var gameMode = PLAYER1;
// global var to store players' dicerolls and assigned to array
var player1DiceNums = [];
var player2DiceNums = [];

// store players' score
var player1Score = ``;
var player2Score = ``;

// default messages for output
var selectDiceOrderMessage = `Select which dice number to go first by entering 1 for Dice 1 or 2 for Dice 2.`;
var submitToRestartGameMessage = `<br><br>Click Submit for Player 1 to roll again`;

// create diceRoll function
var rollDice = function () {
  // create random dice roll from 1 to 6
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
};

// create function for players' 2 dice rolls
var playerDiceRolls = function () {
  var myOutputValue = ``;
  var dice1 = rollDice();
  var dice2 = rollDice();
  console.log(`dice 1:` + dice1);
  console.log(`dice 2:` + dice2);
  var diceNums = [dice1, dice2];
  console.log(`p1 dice nums` + diceNums);
  if (gameMode == PLAYER1) {
    player1DiceNums = diceNums;
    console.log(`p1globalnums ` + player1DiceNums);
    return `Hi ${gameMode}, you rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br>${selectDiceOrderMessage}`;
  }
  if (gameMode == PLAYER2) {
    player2DiceNums = diceNums;
    console.log(`p2globalnums ` + player2DiceNums);
    return `Hi ${gameMode}, you rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br>${selectDiceOrderMessage}`;
  }
  return myOutputValue;
};

// calculating players' score from the 2 dice rolls
var getPlayersScore = function (input) {
  if (gameMode == PLAYER1_CHOOSE_DICE_ORDER) {
    if (input == 1) {
      player1Score = Number(
        String(player1DiceNums[0]) + String(player1DiceNums[1])
      );
      console.log(`p1 player score 1 ` + player1Score);
    }
    if (input == 2) {
      player1Score = Number(
        String(player1DiceNums[1]) + String(player1DiceNums[0])
      );
      console.log(`P1 player score 2 ` + player1Score);
    }
    return `Player 1, your score is ${player1Score}. <br><br>Click Submit for Player 2 to roll the dices!`;
  }
  if (gameMode == PLAYER2_CHOOSE_DICE_ORDER) {
    if (input == 1) {
      player2Score = Number(
        String(player2DiceNums[0]) + String(player2DiceNums[1])
      );
      console.log(`P2 player score 1 ` + player2Score);
    }
    if (input == 2) {
      player2Score = Number(
        String(player2DiceNums[1]) + String(player2DiceNums[0])
      );
      console.log(`P2 player score 2 ` + player2Score);
    }
    return `Player 2, your score is ${player2Score}. <br><br>Click Submit to see who won the game!`;
  }
};

var compareScore = function () {
  if (player1Score > player2Score) {
    return `Congrats Player 1, you Won. <br><br> Your score of ${player1Score} is higher than Player 2 score of ${player2Score}${submitToRestartGameMessage}`;
  }
  if (player1Score < player2Score) {
    return `Congrats Player 2, you Won. <br><br>Your score of ${player2Score} is higher than Player 1 score of ${player1Score}${submitToRestartGameMessage}`;
  }
  if (player1Score == player2Score) {
    return `Oops its a draw! <br><br>Both of you have the same score of ${player1Score}!${submitToRestartGameMessage}`;
  }
};

var main = function (input) {
  var myOutputValue = ``;

  // set initial stage for player 1 to roll dice
  if (gameMode == PLAYER1) {
    myOutputValue = playerDiceRolls();
    gameMode = PLAYER1_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameMode == PLAYER1_CHOOSE_DICE_ORDER) {
    if (!(input == 1 || input == 2)) {
      return `Pls enter 1 or 2 to choose dice order!`;
    }
    myOutputValue = getPlayersScore(input);
    gameMode = PLAYER2;
    return myOutputValue;
  }

  if (gameMode == PLAYER2) {
    myOutputValue = playerDiceRolls();
    gameMode = PLAYER2_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameMode == PLAYER2_CHOOSE_DICE_ORDER) {
    if (!(input == 1 || input == 2)) {
      return `Pls enter 1 or 2 to choose dice order!`;
    }
    myOutputValue = getPlayersScore(input);
    gameMode = COMPARE_SCORE;
    return myOutputValue;
  }

  if (gameMode == COMPARE_SCORE) {
    myOutputValue = compareScore();
    gameMode = PLAYER1;
    return myOutputValue;
  }
};
