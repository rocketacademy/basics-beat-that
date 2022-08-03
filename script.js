// ==== REQUIREMENTS====/
//1. 2 players and players take turns.
//2. When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//3. The player picks the order of the dice they want.
//4. After both players have rolled and chosen dice order, the player with the higher combined number wins.

//===Problem Breakdown==
// v1. rolls 2 dice and turns the output for one player. player chooses dice order and get return output
// v2. refactored code to include player 2
//   - global variables for currentPlayer; allPlayersScore
//  -- refactor outputMessages to interact with each player, 1 and 2
//  --- write logic for player 1 to go first then player 2, and finally point towards comparing scores
// v3. implement comparing dice scores and declare winner
// v4. reset the game so players can play continually without refreshing page

//Global Variables
var STATE_DICE_ROLL = "STATE_DICE_ROLL";
var STATE_DICE_ORDER = "STATE_DICE_ORDER";
var STATE_COMPARE_SCORES = "STATE_COMPARE_SCORES";
var gameState = STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

//Helper function for game reset
var resetGame = function () {
  currentPlayer = 1;
  gameState = STATE_DICE_ROLL;
  allPlayersScore = [];
};

//Helper Function for dice roll
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  //random decimal between 0 and 6;
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger:", randomInteger);
  return randomInteger;
};
//Helper function for how many dice to roll
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
  return `Welcome, Player 
      ${currentPlayer}<br><br>You rolled: <br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}. <br><br>Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.`;
};
var getPlayerScore = function (playerInput) {
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input validation. input is NOT 1 and NOT 2");
    return (
      "Error! Please input only '1' or '2' to choose which dice to use as your first digit. <br><br> Your dice rolls are: <br> Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  }
  // input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  //Store playerScore in array
  allPlayersScore.push(playerScore);

  //clear current player rolls array
  currentPlayerRolls = [];
  return (
    "Hi, player " + currentPlayer + ". Your chosen value is " + playerScore
  );
};

var main = function (playerInput) {
  console.log("Check game state on submit click:", gameState);
  console.log("Checking currentPlayer on submit click: ", currentPlayer);
  var myOutputValue = "";
  if (gameState == STATE_DICE_ROLL) {
    console.log("Control flow: gameState == STATE_DICE_ROLL");
    //Display dice rolled as output message
    myOutputValue = rollDiceForPlayer();

    //Change the game state
    gameState = STATE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == STATE_DICE_ORDER) {
    console.log("Control flow: gameState = STATE_DICE_ORDER");
    //Call playerScore function
    myOutputValue = getPlayerScore(playerInput);

    if (currentPlayer == 1) {
      console.log("Control flow: end of player 1, now player 2 turn");
      currentPlayer = 2;
      gameState = STATE_DICE_ROLL;
      return myOutputValue + "<br><br> It is now player 2's turn!";
    }
    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, Next submit click will calculate score"
      );
      gameState = STATE_COMPARE_SCORES;
      return myOutputValue + "<br><br> Press submit to calculate scores!";
    }
  }

  if (gameState == STATE_COMPARE_SCORES) {
    console.log("Control Flow: gameState == STATE_COMPARE_SCORES");
    console.log(allPlayersScore);
    myOutputValue =
      "Player 1 score: " +
      allPlayersScore[0] +
      "<br>Player 2 Score: " +
      allPlayersScore[1];
    //player 1 wins
    if (allPlayersScore[0] > allPlayersScore[1]) {
      myOutputValue = myOutputValue + "<br>Player 1 wins~";
      //player 2 wins
    }
    if (allPlayersScore[1] > allPlayersScore[0]) {
      myOutputValue = myOutputValue + "<br>Player 2 wins~";
    }
    //tie
    if (allPlayersScore[1] == allPlayersScore[0]) {
      myOutputValue = myOutputValue + "<br>It's a tie!";
    }
    resetGame();

    return myOutputValue;
  }
};
