var Game_State_Dice_Roll = "Game State Dice Roll";
var Game_State_Choose_Dice_Order = "Game State Choose Dice Order";
var Game_State_Compare_Players_Score = "Game State Compare Players Score";
var gameState = Game_State_Dice_Roll;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceForPlayer = function () {
  counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return (
    "WELCOME " +
    currentPlayer +
    " You rolled Dice 1: " +
    currentPlayerRolls[0] +
    " and Dice 2: " +
    currentPlayerRolls[1] +
    ". <br> Please choose 1 or 2 to determine the order of the dice"
  );
};

var getPlayerScore = function (input) {
  var playerScore;
  if (input != 1 && input != 2) {
    return (
      "ERROR please input either 1 or 2 to determine the order of dice rolled. <br> <br> Your dice rolls were " +
      currentPlayerRolls[0] +
      " and " +
      currentPlayerRolls[1]
    );
  }
  if (input == 1) {
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (input == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayerScore.push(playerScore);
  currentPlayerRolls = [];
  return "Player " + currentPlayer + "Your chosen value is " + playerScore;
};

var comparePlayerScore = function () {
  var compareMessage =
    "Player 1 score " +
    allPlayerScore[0] +
    "Player 2 score " +
    allPlayerScore[1];

  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "Player 1 wins";
  }
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + " Player 2 wins";
  }
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + " Its a Draw";
  }
  return compareMessage;
};

var restartGame = function () {
  currentPlayer = 1;
  gameState = Game_State_Dice_Roll;
  allPlayerScore = [];
};

var main = function (input) {
  var myOutPutMessage = "";

  if (gameState == Game_State_Dice_Roll) {
    myOutPutMessage = rollDiceForPlayer();

    gameState = Game_State_Choose_Dice_Order;
    return myOutPutMessage;
  }

  if (gameState == Game_State_Choose_Dice_Order) {
    myOutPutMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = Game_State_Dice_Roll;
      return myOutPutMessage + " It is now player 2's turn";
    }

    if (currentPlayer == 2) {
      gameState = Game_State_Compare_Players_Score;
      return myOutPutMessage + "Press submit to calculate score";
    }
  }

  if (gameState == Game_State_Compare_Players_Score) {
    myOutPutMessage = comparePlayerScore();

    restartGame();
    return myOutPutMessage;
  }
};
