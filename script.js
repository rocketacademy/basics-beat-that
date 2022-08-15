/* project 2 beat that */
var mode = 0;
var player1Score = 0;
var player2Score = 0;
var player1Dice = [];
var player2Dice = [];
var chooseOrderMsg =
  '<br><br>Choose the order of the dice. <br> Choose "1" to let Dice 1 be the first digit or choose "2" to let Dice 2 be the first digit.';

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var resultInteger = Math.floor(randomDecimal + 1);
  return resultInteger;
};

var generateDiceForPlayer = function () {
  mode += 1;
  return [rollDice(), rollDice()];
}; // with input of current player, return the random digits generated for the player

var chooseDiceOrderForPlayer = function (playerDice, order) {
  mode += 1;
  if (order == 1) {
    return playerDice[0] * 10 + playerDice[1];
  } else return playerDice[1] * 10 + playerDice[0];
}; // with input of 1 or 2, return the final number

var whoIsWinner = function () {
  mode = 0;
  player1Score += player1Dice[2];
  player2Score += player2Dice[2];

  var leaderboardMsg = `<br><br> Leaderborad <br> Player 1:${player1Score} <br> Player 2:${player2Score} <br> Press submit to continue playing`;

  player1Dice = [];
  player2Dice = [];
  if (player1Score == player2Score) {
    return "A draw for now!" + leaderboardMsg;
  } else if (player1Score > player2Score) {
    return "Player 1 is leading!" + leaderboardMsg;
  } else return "Player 2 is leading!" + leaderboardMsg;
};

/* 
mode 0: submit to generate 2 digits for player 1
mode 1: display the 2 digits generated, enter 1 or 2 to generate the final number for player 1
mode 2: display player 1's number, submit to generate 2 digits for player 2
mode 3: display the 2 digits generated, enter 1 or 2 to generate the final number for player 2
mode 4: show the winner and leaderboard

*/
var main = function (input) {
  if (mode == 0) {
    player1Dice = generateDiceForPlayer();
    return (
      `Player 1, you rolled ${player1Dice[0]} for Dice 1 and ${player1Dice[1]} for Dice 2` +
      chooseOrderMsg
    );
  } else if (mode == 1) {
    player1Dice[2] = chooseDiceOrderForPlayer(player1Dice, input);
    return `Player 1, your number is ${player1Dice[2]}. <br><br> Player 2, please submit to roll your dice.`;
  } else if (mode == 2) {
    player2Dice = generateDiceForPlayer();
    return (
      `Player 2, you rolled ${player2Dice[0]} for Dice 1 and ${player2Dice[1]} for Dice 2` +
      chooseOrderMsg
    );
  } else if (mode == 3) {
    player2Dice[2] = chooseDiceOrderForPlayer(player2Dice, input);
    return `Player 2, your number is ${player2Dice[2]}. <br><br> Please submit to see who's leading.`;
  } else if (mode == 4) {
    return whoIsWinner();
  }
};
