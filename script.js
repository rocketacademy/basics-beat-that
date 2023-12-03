// 2 players and players take tunrs
// when a player clicks submit, the game rolls two dice nad shows them
// the player picks the order of dice they want
// the player with the higher combine number wins

//Global Variables
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

//Helper Function
var rollDice = function () {
  console.log("Control flow: start of rolldice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInterger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: ",
    currentPlayerRolls
  );
  return (
    "Welcome, Player " +
    currentPlayer +
    " <br><br>You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value"
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation, invlaid input... NOT 1 AND NOT 2"
    );
    return (
      "Error! Please only input '1' or '' to choose which dice to use as the first digit.<br><br>Your dice rolls are: <br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  }
  // input ==1
  if (playerInput == 1) {
    console.log("Control flow: input ==1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  // input ==2
  if (playerInput == 2) {
    console.log("Control flow: input ==2");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  //Store playerScore in array
  allPlayerScore.push(playerScore);
  //clear current player rolls array
  currentPlayerRolls = [];
  return "Player " + currentPlayer + " your chosen value is: " + playerScore;
};

var comparePlayerScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    "<br>Player 2 score: " +
    allPlayerScore[1];
  //player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  }
  //player 2 wins
  if (allPlayerScore[1] > allPlayerScore[0]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  }
  //tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>It's a tie!";
  }
  return compareMessage;
};

var main = function (input) {
  console.log("Checking game state on submit click: ", gameState);
  console.log("Checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Contol flow: gameState == GAME_STATE_CHOOSE_DEICE_ORDER");

    //call playscore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("Control flow : end of player 1's turn, now player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }

    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, Next submit click will calculate scores"
      );
      gameState = GAME_STATE_COMPARE_SCORES;

      return outputMessage + "<br><br>Press submit to calcuate scores!";
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState == GAME_STATE_COMPARE_SCORES");
    outputMessage = comparePlayerScores();
    return outputMessage;
  }
};
