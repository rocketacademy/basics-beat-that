// 2 plqyers and 2 game modes- Dice Throw & Dice Selection

var currentGameMode = "Dice-Throw";
var currentPlayer = "Player1";
var dice1 = 0;
var dice2 = 0;
var diceOrder = 0;
var player1_Number = 0;
var player2_Number = 0;
var round_Number = 0;
var round_Winner = "";
var total_Score_Winner = "";
var player1_score = 0;
var player2_score = 0;

var maxNumber = function (input) {
  numberValue = 10 * dice2 + dice1;
  if (input == 1) {
    numberValue = 10 * dice1 + dice2;
  }
  return numberValue;
};

// dicerolling function
var diceRoll = function () {
  var randomNo = Math.random() * 6;
  var diceThrow = Math.ceil(randomNo);
  return diceThrow;
};

// number game winner function

var number_Game_Winner = function (player1_Number, player2_Number) {
  if (player1_Number > player2_Number) {
    return "Player 1 won";
  } else if (player1_Number < player2_Number) {
    return "Player 2 won";
  } else if (player1_Number == player2_Number) {
    return "It's a draw ";
  }
};

// total score game winner function

var score_Winner = function (player1_score, player2_score) {
  if (player1_score > player2_score) {
    return "Player 1 won";
  } else if (player1_score < player2_score) {
    return "Player 2 won";
  } else if (player1_score == player2_score) {
    return " It's a Draw";
  }
};

var main = function (input) {
  if (currentGameMode == "Dice-Throw") {
    dice1 = diceRoll();
    dice2 = diceRoll();
    console.log(dice1, dice2);
    currentGameMode = "Dice-Selection";

    myOutputValue =
      "Welcome " +
      currentPlayer +
      "<br>" +
      "You rolled " +
      dice1 +
      " for Dice 1 and " +
      dice2 +
      " for Dice 2." +
      "<br>" +
      " Choose the order of the dice '1' or '2'.";
  } else if (currentGameMode == "Dice-Selection") {
    if (currentPlayer == "Player1") {
      currentPlayer = "Player2";
      currentGameMode = "Dice-Throw";
      player1_Number = maxNumber(input);
      myOutputValue =
        "Player1, you chose dice " +
        input +
        " first" +
        "<br>" +
        "Your number is " +
        player1_Number +
        "<br>" +
        " It's now Player 2's turn.";
    } else if (currentPlayer == "Player2") {
      round_Number = round_Number + 1;

      currentPlayer = "Player1";
      currentGameMode = "Dice-Throw";

      player2_Number = maxNumber(input);

      player1_score = player1_score + player1_Number;
      player2_score = player2_score + player2_Number;

      round_Winner = number_Game_Winner(player1_Number, player2_Number);
      total_Score_Winner = score_Winner(player1_score, player2_score);

      myOutputValue =
        "Player2, you chose dice" +
        input +
        " first" +
        "<br>" +
        "Your number is " +
        player2_Number +
        "<br>" +
        "Player1 number was " +
        player1_Number +
        "<br>" +
        "Round" +
        round_Number +
        " result is " +
        round_Winner +
        "<br>" +
        "Player 1, total score till now is " +
        player1_score +
        " and Player 2, total score till now is " +
        player2_score +
        "<br>" +
        "Total score game result is " +
        total_Score_Winner;
    }
  }

  return myOutputValue;
};
