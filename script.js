// Create game states
var playerToRollDice = "rollDice";
var playerChooseDiceOrder = "chooseDiceOrder";

var player2ToRollDice = "rollDice2";
var player2ChooseDiceOrder = "chooseDiceOrder2";

var compareScores = "compareScores";

// Default game state
var currentGameMode = playerToRollDice;

var player1DiceRoll1, player1DiceRoll2;
var player2DiceRoll1, player2DiceRoll2;

var player1DiceOrder, player2DiceOrder;

var randomRollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  // player 1 roll dice
  if (currentGameMode == playerToRollDice) {
    player1DiceRoll1 = randomRollDice();
    player1DiceRoll2 = randomRollDice();
    currentGameMode = playerChooseDiceOrder;
    return `Player 1, here's what you rolled! 🎲<br><br> Dice 1: ${player1DiceRoll1} <br> Dice 2: ${player1DiceRoll2} <br><br> Choose your dice order by entering '1' or '2' in the input field.`;
  }

  // player 1 choose dice order
  if (currentGameMode == playerChooseDiceOrder) {
    if (input == "1") {
      player1DiceOrder = "" + player1DiceRoll1 + player1DiceRoll2;
    } else {
      player1DiceOrder = "" + player1DiceRoll2 + player1DiceRoll1;
    }
    currentGameMode = player2ToRollDice;
    return `Player 1, your number is ${player1DiceOrder}. <br><br>Now it's Player 2's turn!`;
  }

  // player 2 roll dice
  if (currentGameMode == player2ToRollDice) {
    player2DiceRoll1 = randomRollDice();
    player2DiceRoll2 = randomRollDice();
    currentGameMode = player2ChooseDiceOrder;
    return `Player 2, here's what you rolled! 🎲<br><br> Dice 1: ${player2DiceRoll1} <br> Dice 2: ${player2DiceRoll2} <br><br> Choose your dice order by entering '1' or '2' in the input field.`;
  }

  // player 2 choose dice order
  if (currentGameMode == player2ChooseDiceOrder) {
    if (input == "1") {
      player2DiceOrder = "" + player2DiceRoll1 + player2DiceRoll2;
    } else {
      player2DiceOrder = "" + player2DiceRoll2 + player2DiceRoll1;
    }
    currentGameMode = compareScores;
    return `Player 2, your number is ${player2DiceOrder}. <br><br>Let's see who wins!`;
  }

  // compare player 1 score with player 2 score and define winner
  if (currentGameMode == compareScores) {
    var player1Score = parseInt(player1DiceOrder);
    var player2Score = parseInt(player2DiceOrder);
    var resultMessage = "";

    if (player1Score > player2Score) {
      resultMessage = `🏆 Player 1 wins! 🎉 <br><br> Player 1: ${player1Score} <br>Player 2: ${player2Score} <br><br> Click on the button to play again!`;
    } else if (player1Score < player2Score) {
      resultMessage = `🏆 Player 2 wins! 🎉<br><br> Player 1: ${player1Score} <br>Player 2: ${player2Score} <br><br> Click on the button to play again!`;
    } else {
      resultMessage = `It's a tie! 🤝<br><br> Player 1: ${player1Score} <br>Player 2: ${player2Score} <br><br> Click on the button to play again!`;
    }

    currentGameMode = playerToRollDice;
    return resultMessage;
  }
};
