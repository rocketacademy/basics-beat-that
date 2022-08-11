// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// ver 1. build a simple ver that rolls 2 dice and turns output for 1 player. That player chooses the dice order and get the correct return output
// ver 2. refactor code to include player 2
//        - set global variables for currentPlayer; allPlayersScore
//        - refactor outputMessages to interact with each player, 1 and 3
//        - write logic for player 1 to go first then player 2, and finally compare score
// ver 3. implement comparing dice scores and declare winner
// ver 4. reset the game so that the players can play continually without refreshing the browser page

// Global variables
var GAME_STATE_DICE_ROLL = `GAME_STATE_DICE_ROLL`;
var GAME_STATE_CHOOSE_DICE_ORDER = `GAME_STATE_CHOOSE_DICE_ORDER`;
var gameState = GAME_STATE_DICE_ROLL;
var GAME_STATE_COMPARE_SCORES = `GAME_STATE_COMPARE_SCORES`;
var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

// helper function - Random dice roll
var rollDice = function () {
  console.log(`control flow: start of rollDice()`);
  var randomDecimal = Math.random() * 6;
  var randomIntegar = Math.floor(randomDecimal) + 1;
  console.log(`roll dice output: `, randomIntegar);
  return randomIntegar;
};

var rollDiceForPlayer = function () {
  console.log(`Control flow: start of rollDiceForPlayer()`);
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }

  console.log(
    `rollDiceForPlayer changes, currentPlayerRolls:`,
    currentPlayerRolls
  );
  return (
    `Hi Player ` +
    currentPlayer +
    `, <br> You rolled DICE 1: ` +
    currentPlayerRolls[0] +
    `| Dice 2 : ` +
    currentPlayerRolls[1] +
    ` <br> Now, pls input either '1' or '2' to choose the corresponding dice to be the first digit of your final value.`
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    return (
      `Error! Please only input '1' or '2' to choose which dice to use as your first digit. You rolled DICE 1: ` +
      currentPlayerRolls[0] +
      `| Dice 2 : ` +
      currentPlayerRolls[1] +
      `.`
    );
  }
  // input = 1
  if (playerInput == 1) {
    console.log(`Control flow: input == 1)`);
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }

  // input = 2
  if (playerInput == 2) {
    console.log(`Control flow: input == 2)`);
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }

  // store playerScore in array
  allPlayersScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRolls = [];
  return ` Player` + currentPlayer + ` Your chosen value is: ` + playerScore;
};

var comparePlayerScores = function () {
  compareMessage =
    ` Player 1 score: ` +
    allPlayersScore[0] +
    `<br> Player 2 score: ` +
    allPlayersScore[1];
  // Player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + `<br> Player 1 wins`;
  }

  // Player 2 wins
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + `<br> Player 2 wins`;
  }

  // Tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + `<br> It's a tie`;
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayersScore = [];
};

var main = function (input) {
  console.log(`Checking game state on submit click: `, gameState);
  console.log(`Checking currentPlayer on submit click:`, currentPlayer);
  var outputMessage = ``;
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log(`Control flow: gameState == GAME_STATE_DICE_ROLL`);

    // display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log(`Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER`);

    // Call playerScore function
    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      console.log("Control flow: end of player's 1 turn, now player's 2 turn");
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + `<br> It is now player 2's turn.`;
    }

    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, next Submit click will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
    }
    return outputMessage + `<br>Click on 'OK' to calculate scores.`;
  }

  if ((gameState = GAME_STATE_COMPARE_SCORES)) {
    console.log(`Control flow: gameState == GMAE_STATE_COMPARE_SCORES`);
    outputMessage = comparePlayerScores();

    resetGame();
    console.log("Current player after reset:" + currentPlayer);
    console.log("game state after reset", +gameState);
    console.log("allPlayersScore array:", +allPlayersScore);

    return outputMessage;
  }

  var myOutputValue = rollDice();
  // return myOutputValue;
};
