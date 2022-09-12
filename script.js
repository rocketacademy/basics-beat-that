// 2 players taking turns
//player clicks submit, the game rolls 2 dice.
//output is the 2 numbers of the dice rolls (random), example 3 and 6
// the player picks the order of the dice they want (or can we automatically choose from the player?)
// player 2 turns
// winner determined (the higher combined number)

// FIRST STEP -- input: submit. output: 2 numbers from random dice.

// SECOND STEP -- include player 2.
//   1. Global variables for currentPlayer; allPlayersScore
//   2. Refactor myOutputMessage to interact with each player,1 and 2
//   3. write logic for player 1 to go first then player 2
//   4. comparing score and final winner

// Global Variables
var diceRollStage = "ROLL THE DICE";
var chooseOrderStage = "CHOOSE THE DICE ORDER";
var compareScoresStage = "COMPARE THE SCORES STAGE";
var gameState = diceRollStage;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// Helper function
var rollDice = function () {
  console.log("start the rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;

  console.log("rollDice output: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("start of rollDiceForPlayer()");
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
    "Hi Ho " +
    currentPlayer +
    "...<br><br>Dice #1: " +
    currentPlayerRolls[0] +
    "<br><br>Dice #2: " +
    currentPlayerRolls[1] +
    "<br><br>Next, please type in '1' to choose the first dice as the first digit of your final value or '2' to choose the second dice."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("invalid input, NOT 1 or 2");
    return (
      "OOPSIE! <br><br>Please input ONLY '1' or '2'. <br><br> A gentle reminder, this will determine which dice to use as the first digit of your value. <br><br>Dice #1: " +
      currentPlayerRolls[0] +
      "<br><br>Dice #2: " +
      currentPlayerRolls[1] +
      "."
    );
  }
  // input == 1
  if (playerInput == 1) {
    console.log("input == 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return "Your chose value is: " + playerScore;
  }

  // input == 2
  if (playerInput == 2) {
    console.log("input == 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );

    //store playerScore  in array
    allPlayerScore.push(playerScore);

    // clear current player rolls array
    currentPlayerRolls = [];
    return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
  }
};
var main = function (input) {
  console.log("Checking game state on submit click", gameState);
  var myOutputMessage = "";
  console.log("checking currentPlayer on submit click: ", currentPlayerRolls);

  if (gameState == diceRollStage) {
    console.log("gameState == diceRollStage");

    // Display dice rolled as output message
    myOutputMessage = rollDiceForPlayer();

    //change the game state
    gameState = chooseOrderStage;
    return myOutputMessage;
  }

  if (gameState == chooseOrderStage) {
    console.log("gameState == chooseOrderStage");

    // call playerScore function
    myOutputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("gameState == diceRollStage");
      currentPlayer = 2;
      gameState = diceRollStage;
      return myOutputMessage + "<br><br>Let's take turn... Go, player 2!";
    }
    if (currentPlayer == 2) {
      console.log(
        "end of player 2's turn, next submit click will calculate score"
      );
      gameState = compareScoresStage;
    }
    return myOutputMessage + "<br><br> Click 'submit' to calculate the scores!";
  }
};
