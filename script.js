//Global variables
const GAME_STATE_ROLL_DICE = "game state roll dice";
const GAME_STATE_CHOOSE_DICE_ORDER = "game state choose order of dice";
const GAME_STATE_COMPARE_PLAYER_NUMBERS = "game state compare players numbers";
var gameState = GAME_STATE_ROLL_DICE;
var rollDiceOne;
var rollDiceTwo;

var currentPlayer = 1;
var allPlayersNumbers = [0, 0];

//To get dice number in general
var rollDice = function () {
  var randomeDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomeDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//To roll the dice for player
var rollDiceForPlayer = function () {
  rollDiceOne = rollDice();
  rollDiceTwo = rollDice();
  var player = "";
  if (currentPlayer == 1) {
    player = "Player 1";
  } else {
    player = "Player 2";
  }
  myOutputValue = `${player} You rolled ${rollDiceOne} for Dice 1 and ${rollDiceTwo} for Dice 2. <br><br>Which number do you want to put as the first number? Key in '1' for Dice 1 and '2' for Dice 2`;
  return myOutputValue;
};

//To choose dice order for player
var chooseDiceOrder = function (input) {
  //player does not input 1 or 2
  if (input !== "1" && input !== "2") {
    myOutputValue = `Try again. Please key in 1 for Dice 1 or 2 for Dice 2.<br>You rolled ${rollDiceOne} for Dice 1 and ${rollDiceTwo} for Dice 2.`;
    return myOutputValue;
  }

  if (currentPlayer == 1) {
    //player 1 chooses first dice as input
    if (input == "1") {
      allPlayersNumbers[0] = Number(String(rollDiceOne) + String(rollDiceTwo));
    }

    //player 1 chooses second dice as input
    if (input == "2") {
      allPlayersNumbers[0] = Number(String(rollDiceTwo) + String(rollDiceOne));
    }
    currentPlayer = 2;
    gameState = GAME_STATE_ROLL_DICE;
    return `Player 1, your combined number is ${allPlayersNumbers[0]}.<br>Player 2, please click 'Submit' to roll your dice.`;
  } else if (currentPlayer == 2) {
    //player 2 chooses first dice as input
    if (input == "1") {
      allPlayersNumbers[1] = Number(String(rollDiceOne) + String(rollDiceTwo));
    }

    //player 2 chooses second dice as input
    if (input == "2") {
      allPlayersNumbers[1] = Number(String(rollDiceTwo) + String(rollDiceOne));
    }
    gameState = GAME_STATE_COMPARE_PLAYER_NUMBERS;
    return `Player 2, your combined number is ${allPlayersNumbers[1]}.<br>Click submit to find out the winner.`;
  }
};

//To compare players' numbers
var comparePlayersNumbers = function () {
  var result = "";
  if (allPlayersNumbers[0] == allPlayersNumbers[1]) {
    result = `It is a tie! Try again.`;
  }

  if (allPlayersNumbers[0] > allPlayersNumbers[1]) {
    result = `Player 1 wins!`;
  }

  if (allPlayersNumbers[1] > allPlayersNumbers[0]) {
    result = `Player 2 wins!`;
  }
  return `${result} <br>Player 1's combined number is ${allPlayersNumbers[0]}. <br>Player 2's combined number is ${allPlayersNumbers[1]}.`;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameState == GAME_STATE_ROLL_DICE) {
    myOutputValue = rollDiceForPlayer();

    //change game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  } else if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputValue = chooseDiceOrder(input);
  } else if (gameState == GAME_STATE_COMPARE_PLAYER_NUMBERS) {
    myOutputValue = comparePlayersNumbers();
  }
  return myOutputValue;
};
