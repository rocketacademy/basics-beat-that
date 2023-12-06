/*
---Requirements---
1. There are 2 players and players take turns.
2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
3. The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

---Problem breakdown---

1. Roll 2 dice and show output for player. Player 1 choose dice order and get his number.
2. Refactor code to include player 2.
   - global variables for current player; allPlayerScore
   -refactor outputMessages to interact with each player, 1 and 2
   -write logic for player 1 to go first, then player 2, and compare score 
3. Compare dice scores and declare a winner. 
4. Reset the game so that player can play continually without refreshing the browser page. 
*/

//---GLOBAL VARIABLE---
//game state 1
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
//game state 2
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
//set to compare scores
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
//Set first state of the game
var gameState = GAME_STATE_DICE_ROLL;
//Create an array <currentPlayerRolls>
var currentPlayerRolls = [];
//Player 1 start first
var currentPlayer = 1;
//To store both player score
var allPlayerScore = [];

//---HELPER FUNCTION #1 <DICE ROLL>---
var rollDice = function () {
  console.log("Control flow: Start of rollDice()");
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output", randomInteger);
  return randomInteger;
};

//---HELPER FUNCTION #2 <ROLL DICE FOR PLAYER> ---
var rollDiceForPlayer = function () {
  console.log("Control flow: Start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log(
    "rollDiceForPlayer changes, currentPlayerRolls: " + currentPlayerRolls
  );

  return `Welcome, player
   ${currentPlayer}<br> You rolled:<br>Dice 1:${currentPlayerRolls[0]} <br> Dice 2:
  ${currentPlayerRolls[1]}<br> Please enter '1' or '2' to choose the corresponding dice to be set as your first digit of your final value`;
};

//---HELPER FUNCTION #3 <PLAYER SCORE> ---
var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input validation, invalid input NOT1 NOR2");
    return `Error! Please only input '1' or '2' to choose which dice to use as the fisrt digit.<br>Your dice rolls are: <br>Dice 1: ${currentPlayerRolls[0]} Dice 2: ${currentPlayerRolls[1]}.`;
  }
  //input == 1
  if (playerInput == 1) {
    console.log("control flow: input == 1");
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    // return `Your chosen value is; ${playerScore}`;
  }

  //input == 2
  if (playerInput == 2) {
    console.log("control flow: input == 2");
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    // return `Your chosen value is; ${playerScore}`;
  }

  // store playerScore in array (Use this to compare user scores)
  allPlayerScore.push(playerScore);
  //clear current player rolls array
  currentPlayerRolls = [];
  return `Player ${currentPlayer}, your chosen value is: ${playerScore}`;
};

//---HELPER FUNCTION #4 <COMPARE PLAYER SCORE> ---
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
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  }
  //tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "<br><br>It's a tie";
  }
  return compareMessage;
};

//---MAIN FUNCTION----

var main = function (input) {
  console.log("Checking game state on submit click", gameState);
  console.log("Checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";

  if (gameState === GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gamestate = GAME_STATE_DICE_ROLL");

    // var rollDice = randomChoice();

    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    //Display dice rolled as output message (Show in grey box)
    outputMessage = rollDiceForPlayer();
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ORDER");

    //Call playerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("Control flow: end of player 1, next player 2's turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br> It's your turn players 2! ";
    }

    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn. Next submit will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage + "<br><br> Press submit to calculate scores";
    }
  }
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState == GAME_STATE_COMPARE_SCORES");
    outputMessage = comparePlayerScores();
    return outputMessage;
  }
};
