var player1DiceRoll1 = 0;
var player1DiceRoll2 = 0;
var player2DiceRoll1 = 0;
var player2DiceRoll2 = 0;
var player1FinalDiceRollResult = 0;
var player2FinalDiceRollResult = 0;
var myOutputValue = "";

var currentGameMode = "Submit";

var main = function (input) {
  if (currentGameMode == "Submit") {
    player1DiceRoll1 = rollDice();
    player1DiceRoll2 = rollDice();
    var player1Roll = play1();
    var player1chooseOrderMsg = chooseOrderMsg();
    myOutputValue = player1Roll + "<br>" + player1chooseOrderMsg;
    currentGameMode = "waiting for player1 to choose order of dices";
    return myOutputValue;
  } else if (
    currentGameMode == "waiting for player1 to choose order of dices"
  ) {
    var player1ChooseOrder = chooseOrderPlayer1(input);
    var myOutputValue =
      player1ChooseOrder +
      "<br> Player 2, please click on the submit button to begin!";
    currentGameMode = "waiting for player2 to roll dices";
    return myOutputValue;
  } else if (currentGameMode == "waiting for player2 to roll dices") {
    player2DiceRoll1 = rollDice();
    player2DiceRoll2 = rollDice();
    var player2Roll = play2();
    var player2chooseOrderMsg = chooseOrderMsg();
    myOutputValue = player2Roll + "<br>" + player2chooseOrderMsg;
    currentGameMode = "waiting for player2 to choose order of dices";
    return myOutputValue;
  } else if (
    currentGameMode == "waiting for player2 to choose order of dices"
  ) {
    var player2ChooseOrder = chooseOrderPlayer2(input);
    myOutputValue =
      player2ChooseOrder +
      "<br> Please click on the submit button to see winning msg!";
    currentGameMode = "see winning message";
    return myOutputValue;
  }
  if (currentGameMode == "see winning message") {
    if (player1FinalDiceRollResult > player2FinalDiceRollResult) {
      myOutputValue = "Player 1 wins!";
      return myOutputValue;
    }
    myOutputValue = "Player 2 wins!";
    return myOutputValue;
  }
};

//RandomNumber generator 1 to 6
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumberResult = randomInteger + 1;
  return randomNumberResult;
};

//Player 1 two dice rolls msgs
var play1 = function () {
  var diceRoll1 = player1DiceRoll1;
  var diceRoll2 = player1DiceRoll2;
  myOutputValue =
    "You have rolled " +
    diceRoll1 +
    " for Dice 1 and " +
    diceRoll2 +
    " for Dice 2!";
  return myOutputValue;
};

//Player 2 two dice rolls msgs
var play2 = function () {
  var diceRoll1 = player2DiceRoll1;
  var diceRoll2 = player2DiceRoll2;
  myOutputValue =
    "You have rolled " +
    diceRoll1 +
    " for Dice 1 and " +
    diceRoll2 +
    " for Dice 2!";
  return myOutputValue;
};

//Choose order Msg
var chooseOrderMsg = function () {
  myOutputValue = "Choose the order of your die by inputting either '1' or '2'";
  return myOutputValue;
};

//Choose order for Player 1
var chooseOrderPlayer1 = function (input) {
  if (input == "1") {
    var convertingPlayer1FinalResult =
      player1DiceRoll1.toString() + player1DiceRoll2.toString();
    var player1FinalResult = parseInt(convertingPlayer1FinalResult);
    myOutputValue = player1FinalResult + " is your final result!";
    player1FinalDiceRollResult = player1FinalResult;
    return myOutputValue;
  }
  var convertingPlayer1FinalResult =
    player1DiceRoll2.toString() + player1DiceRoll1.toString();
  var player1FinalResult = parseInt(convertingPlayer1FinalResult);
  myOutputValue = player1FinalResult + " is your final result!";
  player1FinalDiceRollResult = player1FinalResult;
  return myOutputValue;
};

//Choose order for Player 2
var chooseOrderPlayer2 = function (input) {
  if (input == "1") {
    var convertingPlayer2FinalResult =
      player2DiceRoll1.toString() + player2DiceRoll2.toString();
    var player2FinalResult = parseInt(convertingPlayer2FinalResult);
    myOutputValue = player2FinalResult + " is your final result!";
    player2FinalDiceRollResult = player2FinalResult;
    return myOutputValue;
  }
  var convertingPlayer2FinalResult =
    player2DiceRoll2.toString() + player2DiceRoll1.toString();
  var player2FinalResult = parseInt(convertingPlayer2FinalResult);
  myOutputValue = player2FinalResult + " is your final result!";
  player2FinalDiceRollResult = player2FinalResult;
  return myOutputValue;
};
