// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//Keep score for each player. The score is the running sum of all numbers that player has generated so far. This means there is no permanent winner, only a temporary leader.

//When outputting game results in the output box, also output a leaderboard that lists the 2 players and their scores in decreasing order.

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

    player1Score += playerInputNumber;

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

    player2Score += playerInputNumber;
    var playerLeader = leaderboard();

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
      "<br>" +
      playerLeader;
    return outputValue;
  }
};
//leaderboard condition
function leaderboard() {
  if (player1Score > player2Score) {
    outputMessage =
      "player 1 is leading the game with score of : " +
      player1Score +
      " & player 2 score of : " +
      player2Score;
    return outputMessage;
  } else if (player2Score > player1Score) {
    outputMessage =
      "player 2 is leading the game with score of : " +
      player2Score +
      " & player 1 score of : " +
      player1Score;
    return outputMessage;
  }
}
//wining condition
function winningCondition() {
  if (player1CombinedNo > player2CombinedNo) {
    return " Player 1 Win.";
  } else if (player1CombinedNo < player2CombinedNo) {
    return " Player 2 Win.";
  } else if ((player1CombinedNo = player2CombinedNo)) {
    return " Its a draw.";
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
