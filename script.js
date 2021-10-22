var gameMode = "RollDiceFirst";
var randomDiceNumber1 = [];
var randomDiceNumber2 = [];
var playersturn = "Player 1";
var Player1CombinedNumber = "";
var Player2CombinedNumber = "";
var player1score = 0;
var player2score = 0;
var winner = "";

var main = function (input) {
  if (gameMode == "RollDiceFirst") {
    randomDiceNumber1 = diceRoll();
    randomDiceNumber2 = diceRoll();

    var myOutputValue =
      "Welcome " +
      playersturn +
      ". <br>You rolled " +
      randomDiceNumber1 +
      " for Dice 1 and " +
      randomDiceNumber2 +
      " for Dice 2." +
      "<br> Choose the order of the dice.";

    gameMode = "ChooseOrder";

    return myOutputValue;
  }

  if (gameMode == "ChooseOrder") {
    var numberOrder = Number(input);
    if (numberOrder == 1) {
      if (playersturn == "Player 1") {
        Player1CombinedNumber =
          String(randomDiceNumber1) + String(randomDiceNumber2);
      } else {
        Player2CombinedNumber =
          String(randomDiceNumber1) + String(randomDiceNumber2);
      }
    } else if (numberOrder == 2) {
      if (playersturn == "Player 1") {
        Player1CombinedNumber =
          String(randomDiceNumber2) + String(randomDiceNumber1);
      } else {
        Player2CombinedNumber =
          String(randomDiceNumber2) + String(randomDiceNumber1);
      }
    }

    if (playersturn == "Player 1") {
      myOutputValue =
        playersturn +
        ", you chose Dice " +
        numberOrder +
        " first." +
        "<br> Your number is " +
        Player1CombinedNumber +
        "." +
        "<br>It is now Player 2's turn.";

      gameMode = "RollDiceFirst";
      playersturn = "Player 2";
    } else {
      if (Number(Player1CombinedNumber) > Number(Player2CombinedNumber)) {
        player1score = player1score + 1;
        winner = "Player 1 wins!";
      } else {
        player2score = player2score + 1;
        winner = "Player 2 wins!";
      }
      myOutputValue =
        playersturn +
        ", you chose Dice " +
        numberOrder +
        " first." +
        "<br> Your number is " +
        Player2CombinedNumber +
        "." +
        "<br>" +
        "<br> Player 1 earlier rolled " +
        Player1CombinedNumber +
        "<br>" +
        winner +
        "<br><br> Current Score: Player 1 (" +
        player1score +
        ") vs Player 2 (" +
        player2score +
        ")";

      gameMode = "RollDiceFirst";
      playersturn = "Player 1";
    }

    return myOutputValue;
  }
};

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
