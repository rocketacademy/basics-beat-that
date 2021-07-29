// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

var playerNo = 1;
var player1Dice = [];
var player2Dice = [];
var player1CombinedNo;
var player2CombinedNo;
var rolledDice = false;
//var playerDice = [];

var main = function (input) {
  if (playerNo == 1 && !rolledDice) {
    var diceRoll1 = diceRoll();
    var diceRoll2 = diceRoll();
    player1Dice[0] = diceRoll1;
    player1Dice[1] = diceRoll2;

    rolledDice = true;
    return (
      "player " +
      playerNo +
      " rolled " +
      player1Dice[0] +
      " and " +
      player1Dice[1]
    );
  }

  if (playerNo == 1 && rolledDice) {
    var playerInputNumber = getPlayerNumber(input, player1Dice);
    player1CombinedNo = playerInputNumber;

    playerNo = 2;
    rolledDice = false;

    return (
      "Player 1 combined number is " +
      player1CombinedNo +
      ". It is Player 2 turn now."
    );
  }

  if (playerNo == 2 && !rolledDice) {
    var diceRoll1 = diceRoll();
    var diceRoll2 = diceRoll();
    player2Dice[0] = diceRoll1;
    player2Dice[1] = diceRoll2;
    rolledDice = true;

    return (
      "player " +
      playerNo +
      " rolled " +
      player2Dice[0] +
      " and " +
      player2Dice[1]
    );
  }
  if (playerNo == 2 && rolledDice) {
    var playerInputNumber = getPlayerNumber(input, player2Dice);
    player2CombinedNo = playerInputNumber;
    // var outputwinningmessage =

    //reset
    rolledDice = false;
    playerNo = 1;

    return (
      "Player 1 combined number is " +
      player1CombinedNo +
      ". Player 2 combined number is " +
      player2CombinedNo
    );
  }
  //wining conditionb
  if (player1CombinedNo > player2CombinedNo) {
    return;
  }
};

function getPlayerNumber(diceOrder, playerDice) {
  if (diceOrder == 1) {
    return parseInt(String(playerDice[0]) + String(playerDice[1]));
  } else {
    return parseInt(String(playerDice[1]) + String(playerDice[0]));
  }
}

// function rollTheDice() {
//   var diceRoll1 = diceRoll();
//   var diceRoll2 = diceRoll();
//   if (playerNo == 1) {
// player1Dice[0] = diceRoll1;
// player1Dice[1] = diceRoll2;
//     return " Player 1 rolled " + diceRoll1 + " and " + diceRoll2;
//   } else {
//     if (playerNo == 2) {
//       player2Dice[0] = diceRoll();
//       player2Dice[1] = diceRoll();
//       return " Player 2 rolled " + diceRoll1 + " and " + diceRoll2;
//     }
//   }
// }

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
