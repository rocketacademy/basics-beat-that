var randomDice = function () {
  var randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
};

var turn = [
  "player1Roll",
  "player1Choose",
  "player2Roll",
  "player2Choose",
  "end",
];
var currentTurn = 0;
var player1Roll1 = 0;
var player1Roll2 = 0;
var player1Final = 0;
var player2Roll1 = 0;
var player2Roll2 = 0;

var main = function (input) {
  if (turn[currentTurn] == "player1Roll" && currentTurn <= turn.length) {
    var roll1 = randomDice();
    var roll2 = randomDice();
    player1Roll1 = roll1;
    console.log(roll1);
    player1Roll2 = roll2;
    console.log(roll2);
    var player1RollResult = `Welcome Player 1.<br>You rolled ${player1Roll1} for Dice 1 and ${player1Roll2} for Dice 2.<br>Choose the order of the dice.`;
    currentTurn += 1;
    return player1RollResult;
  } else if (
    turn[currentTurn] == "player1Choose" &&
    currentTurn <= turn.length
  ) {
    if (input == 1) {
      var player1Combined = player1Roll1 * 10 + player1Roll2;
    } else if (input == 2) {
      var player1Combined = player1Roll2 * 10 + player1Roll1;
    } else {
      return `Please choose 1 or 2 ONLY to proceed`;
    }
    player1Final = player1Combined;
    console.log(player1Final);
    console.log(player1Combined);
    var player1CombinedResult = `Player 1, you chose Dice ${input} first.<br>Your number is ${player1Combined}.
  It is now Player 2's turn.`;
    currentTurn += 1;
    return player1CombinedResult;
  } else if (turn[currentTurn] == "player2Roll" && currentTurn <= turn.length) {
    var roll3 = randomDice();
    var roll4 = randomDice();
    player2Roll1 = roll3;
    console.log(roll3);
    player2Roll2 = roll4;
    console.log(roll4);
    var player2RollResult = `Welcome Player 2.<br>You rolled ${player2Roll1} for Dice 1 and ${player2Roll2} for Dice 2.<br>Choose the order of the dice.`;
    currentTurn += 1;
    return player2RollResult;
  } else if (
    turn[currentTurn] == "player2Choose" &&
    currentTurn <= turn.length
  ) {
    if (input == 1) {
      var player2Combined = player2Roll1 * 10 + player2Roll2;
    } else if (input == 2) {
      var player2Combined = player2Roll2 * 10 + player2Roll1;
    } else {
      return `Please choose 1 or 2 ONLY to proceed`;
    }

    if (player1Final > player2Combined) {
      var overallResult = `Player 2, you chose Dice ${input} first.<br>Your number is ${player2Combined}. <br>Player 1's number is ${player1Final} <br> Therefore Player 1 won!`;
    } else if (player1Final < player2Combined) {
      var overallResult = `Player 2, you chose Dice ${input} first.<br>Your number is ${player2Combined}. <br>Player 1's number is ${player1Final} <br> Therefore Player 2 won!`;
    } else if ((player1Final = player2Combined)) {
      var overallResult = `Player 2, you chose Dice ${input} first.<br>Your number is ${player2Combined}. <br>Player 1's number is ${player1Final} <br> Therefore it is a draw!`;
    }
    currentTurn += 1;
    return overallResult;
  } else if (turn[currentTurn] == "end") {
    player1Roll1 = 0;
    player1Roll2 = 0;
    player2Roll1 = 0;
    player2Roll2 = 0;
    currentTurn = 0;
    return 'Hi Players, this round is over. Press "Submit" to restart the game!';
  }
};
