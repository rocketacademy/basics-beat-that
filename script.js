//global variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_DICE_ORDER = "GAME_STATE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORE = "GAME_STATE_COMPARE_SCORE";
var gameState = GAME_STATE_DICE_ROLL;
var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayerScores = [];
//helper function

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("player 1 starts to roll");
  index = 0;
  while (index < 2) {
    currentPlayerRolls.push(rollDice());
    index = index + 1;
  }
  console.log("player rolls completed and it is: " + currentPlayerRolls);

  var outputMessage =
    "welcome, player " +
    currentPlayer +
    "<br> you have rolled, <br> Dice 1: " +
    currentPlayerRolls[0] +
    "<br> Dice 2: " +
    currentPlayerRolls[1] +
    "." +
    " <br> Now, please input 1 or 2 to select the number combination for the 2 dice chosen. ";

  // currentPlayerRolls = [];
  return outputMessage;
};

var getPlayerScore = function (playerInput) {
  var playerScore;

  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("This means the not 1/2 number function is working");
    return (outputMessage =
      "Please select 1 or 2 only!, you currect dice roll are, <br> Dice 1: " +
      currentPlayerRolls[0] +
      " <br> Dice 2: " +
      currentPlayerRolls[1]);
  }

  //input 1
  if (playerInput == 1) {
    console.log("if input is 1: ");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );

    allPlayerScores.push(playerScore);
    return " Your chosen value is: " + playerScore;
  }

  //input 2
  if (playerInput == 2) {
    console.log("if input is 2: ");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayerScores.push(playerScore);

    //clear player 1 array
    currentPlayerRolls = [];
    return (
      " Hi, player " + currentPlayer + "Your chosen value is: " + playerScore
    );
  }
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScores = [];
  currentPlayerRolls = [];
};

var comparePlayerScores = function () {
  var compareMessage =
    " Player 1 score is : " +
    allPlayerScores[0] +
    " and player 2 score is " +
    allPlayerScores[1];

  //player 1 win
  if (allPlayerScores[0] > allPlayerScores[1]) {
    compareMessage = compareMessage + "player 1 wins!";
  }

  //player 2 win
  if (allPlayerScores[0] < allPlayerScores[1]) {
    compareMessage = compareMessage + "player 2 wins";
  }

  //tie
  if (allPlayerScores[0] == allPlayerScores[1]) {
    compareMessage = compareMessage + " Its a tie !";
  }
  return compareMessage;
};

var main = function (input) {
  console.log(" current game state is: " + gameState);
  console.log("current player is: " + currentPlayer);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Yes, dice roll function is working");

    //display roll dice as output
    outputMessage = rollDiceForPlayer();

    //change game state to dice order
    gameState = GAME_STATE_DICE_ORDER;

    return outputMessage;
  }

  if (gameState == GAME_STATE_DICE_ORDER) {
    console.log("yes, the order function is working");

    //call the score function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("player 1 ends here");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      currentPlayerRolls = [];

      return outputMessage + "It is now player 2's turn! ";
    }

    if (currentPlayer == 2) {
      console.log("player 2 ends here");

      gameState = GAME_STATE_COMPARE_SCORE;

      return outputMessage + " Click submit to calculate the scores ";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORE) {
    console.log("current gamestate is " + gameState);

    outputMessage = comparePlayerScores();

    resetGame();
    console.log("current player: " + currentPlayer);
    console.log("current gamestate: " + gameState);
    console.log("current player scores: " + allPlayerScores);
    console.log("current player roll is: " + currentPlayerRolls);

    return outputMessage;
  }
};
