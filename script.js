var rollDice = function () {
  var numberRolled = Math.floor(Math.random() * 6) + 1;
  return numberRolled;
};
var player1Scores = [];
var player2Scores = [];
var player1Dice1 = 0;
var player1Dice2 = 0;
var player2Dice1 = 0;
var player2Dice2 = 0;
var player1Total = 0;
var player2Total = 0;

var main = function (input) {
  //player 1 starts a turn if these conditions are met
  if (
    player1Scores.length == player2Scores.length &&
    player1Dice1 == 0 &&
    player2Dice1 == 0
  ) {
    player1Dice1 = rollDice();
    player1Dice2 = rollDice();
    return `Player 1 has rolled ${player1Dice1} and ${player1Dice2}. <br><br>Please select the dice that comes first by submitting '1' or '2'`;
  } //if player 1 chooses order
  else if (
    player1Scores.length == player2Scores.length &&
    player1Dice1 != 0 &&
    player2Dice1 == 0
  ) {
    if (input != "1" && input != "2") {
      return 'Please enter "1" or "2"';
    } else if (input == "1") {
      var currentPlayerScore = player1Dice1 * 10 + player1Dice2;
      player1Scores.push(currentPlayerScore);
      player1Total += currentPlayerScore;
      return `Player 1 has rolled ${currentPlayerScore}. Please press submit for player 2 to roll`;
    } else {
      var currentPlayerScore = player1Dice2 * 10 + player1Dice1;
      player1Scores.push(currentPlayerScore);
      player1Total += currentPlayerScore;
      return `Player 1 has rolled ${currentPlayerScore}. Please press submit for player 2 to roll`;
    }
    console.log("list of player 1 Scores", player1Scores);
  } // player 2 plays after player 1 rolls
  else if (
    player1Scores.length != player2Scores.length &&
    player1Dice1 != 0 &&
    player2Dice1 == 0
  ) {
    player2Dice1 = rollDice();
    player2Dice2 = rollDice();
    return `Player 2 has rolled ${player2Dice1} and ${player2Dice2}. <br><br>Please select the dice that comes first by submitting '1' or '2'`;
  } //player 2 chooses order
  else if (
    player1Scores.length != player2Scores.length &&
    player1Dice1 != 0 &&
    player2Dice1 != 0
  ) {
    if (input != "1" && input != "2") {
      return 'Please enter "1" or "2"';
    } else if (input == "1") {
      var currentPlayerScore = player2Dice1 * 10 + player2Dice2;
      player2Scores.push(currentPlayerScore);
      player2Total += currentPlayerScore;
      return `Player 2 has rolled ${currentPlayerScore}. Please press submit to see who won!`;
    } else {
      var currentPlayerScore = player2Dice2 * 10 + player2Dice1;
      player2Scores.push(currentPlayerScore);
      player2Total += currentPlayerScore;
      return `Player 2 has rolled ${currentPlayerScore}. Please press submit to see who won!`;
    }
  } else if (
    player1Scores.length == player2Scores.length &&
    player1Dice1 != 0 &&
    player2Dice1 != 0
  ) {
    console.log("comparing rolls");
    player1Dice1 = 0;
    player1Dice2 = 0;
    player2Dice1 = 0;
    player2Dice2 = 0;
    if (player1Total > player2Total) {
      return `Player 1 is winning. <br><br> Player 1 has a score of ${player1Total} <br><br> Player 2 has a score of ${player2Total}. <br><br> Press submit to play another game`;
    } else if (player2Total > player1Total) {
      return `Player 2 is winning. <br><br> Player 2 has a score of ${player2Total} <br><br> Player 1 has a score of ${player1Total}. <br><br> Press submit to play another game`;
    }
  }
};
