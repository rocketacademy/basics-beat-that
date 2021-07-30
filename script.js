// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.

var playerNo = 1;
var player1Dice = [];
var player2Dice = [];
var player1CombinedNo;
var player2CombinedNo;
var rolledDice = false;
var player1Score = 0;
var player2Score = 0;

var playerRollDice = function (playerNum, playerDice) {
  var diceRoll1 = diceRoll();
  var diceRoll2 = diceRoll();
  playerDice[0] = diceRoll1;
  playerDice[1] = diceRoll2;

  rolledDice = true;
  return (
    "player " +
    playerNum +
    " rolled " +
    playerDice[0] +
    " and " +
    playerDice[1] +
    ", please pick the dice order. "
  );
};

var main = function (input) {
  if (playerNo == 1 && !rolledDice) {
    return playerRollDice(playerNo, player1Dice);
  }

  if (playerNo == 1 && rolledDice) {
    var playerInputNumber = getPlayerNumber(input, player1Dice);
    player1CombinedNo = playerInputNumber;

    player1Score = player1Score + playerInputNumber;

    playerNo = 2;
    rolledDice = false;

    return (
      "Player 1 combined number is " +
      player1CombinedNo +
      ". It is Player 2 turn now."
    );
  }

  if (playerNo == 2 && !rolledDice) {
    return playerRollDice(playerNo, player2Dice);
  }
  if (playerNo == 2 && rolledDice) {
    var playerInputNumber = getPlayerNumber(input, player2Dice);
    player2CombinedNo = playerInputNumber;
    var winningOutput = winningCondition();

    player2Score = player2Score + playerInputNumber;

    //reset
    rolledDice = false;
    playerNo = 1;

    outputValue =
      "Player 1 combined number is " +
      player1CombinedNo +
      ". Player 2 combined number is " +
      player2CombinedNo +
      "." +
      winningOutput +
      ". <br> Player 1 score is " +
      player1Score +
      ", Player 2 score is " +
      player2Score;
    return outputValue;
  }
};

//wining condition
function winningCondition() {
  if (player1CombinedNo > player2CombinedNo) {
    return " player 1 Win, you can play again.";
  } else if (player1CombinedNo < player2CombinedNo) {
    return " player 2 Win, you can play again.";
  } else if ((player1CombinedNo = player2CombinedNo)) {
    return " the score is draw, you can play again.";
  }
}

function getPlayerNumber(diceOrder, playerDice) {
  if (diceOrder == 1) {
    return parseInt(String(playerDice[0]) + String(playerDice[1]));
  } else {
    return parseInt(String(playerDice[1]) + String(playerDice[0]));
  }
}

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
