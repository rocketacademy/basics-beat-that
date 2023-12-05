//global variables
const ROLL_DICE_MODE = "roll dice mode";
const CHOOSE_ORDER_OF_Player_VALUE = "choose player value";

var currentDiceRollsArray = [];
//game mode 1 is dice roll
//game mode 2 is choose dice order to get the score
var gameMode = ROLL_DICE_MODE;
var playerNumber = 0;
var numOfPlayers = 2;
var currentPlayer = 1;
var allPlayersNumberArr = [];

function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function gameModeRollDice() {
  for (var i = 0; i < 2; i++) {
    currentDiceRollsArray.push(diceRoll());
  }
  var dice1 = currentDiceRollsArray[0];
  var dice2 = currentDiceRollsArray[1];
  console.log("dice array", currentDiceRollsArray);
  gameMode = CHOOSE_ORDER_OF_Player_VALUE;

  return `Hello there Player ${currentPlayer}!<br><br>
          1.First dice: ${dice1}<br><br>
          2.Second dice: ${dice2}<br><br>
          Choose the order of dice for your score by entering "1" or "2"`;
}

function gameModeChooseOrder(diceOrder) {
  var playerNumber;
  console.log("dice arr [0]", currentDiceRollsArray[0]);
  console.log("Dice arr [1]:", currentDiceRollsArray[1]);
  var dice1 = currentDiceRollsArray[0].toString();
  var dice2 = currentDiceRollsArray[1].toString();

  if (diceOrder == 1) {
    var number = dice1 + dice2;
    playerNumber = Number(number);
  } else {
    var number = dice2 + dice1;
    playerNumber = Number(number);
  }
  console.log("player number is: ", number);
  allPlayersNumberArr.push(playerNumber);
  currentDiceRollsArray = [];

  return `You have chosen dice ${diceOrder}. Your number is ${playerNumber}`;
}

function getWinner() {
  var highestScore = 0;
  var winner;
  console.log("get winner method is called.");
  var playerOneScore = allPlayersNumberArr[0].toString();
  var playerTwoScore = allPlayersNumberArr[1].toString();
  if (playerOneScore > playerTwoScore) {
    winner = 1;
  } else {
    winner = 2;
  }
  gameMode = ROLL_DICE_MODE;
  currentPlayer = 1;
  allPlayersNumberArr = [];
  return `==== SCOREBOARD ====<br><br>
          Player 1: ${playerOneScore}<br><br>
          player 2: ${playerTwoScore}<br><br>
          ==================== <br><br>
          The winner of the game is Player ${winner}!!!<br><br>
          Click on submit to play again!`;
}
var main = function (input) {
  if (gameMode == ROLL_DICE_MODE) {
    return gameModeRollDice();
  }

  if (gameMode == CHOOSE_ORDER_OF_Player_VALUE) {
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = ROLL_DICE_MODE;

      return ` ${gameModeChooseOrder(input)} <br><br>
                It is now player 2's turn. Please click on submit!`;
    }
    if (allPlayersNumberArr.length == 2) {
      return getWinner();
    }

    return gameModeChooseOrder(input);
  }
};
