// Equipment:
// 2 dice (up to 7 dice for older players)
// Score Chart for win loss

// How to play

// Roll the dice and put them in order to make the highest number possible. If you roll a 4 and an 6, for example, your best answer would be 64. Using 3 dice, a roll of 3, 5 and 2 should give you 532, and so on. Write down your answer, pass the dice, and challenge the next player to Beat That!

// Play in rounds and assign a winner to each round.

// Base

// Requirements

// There are 2 players and players take turns.

// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.

// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.

// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// 1st mode => 1st User runs game clicks submit => diceRoll twice => display results.
// 2nd mode => chooses order of dice integer as strings? ex 6 and 3 would be 63. how? setting array numbers maybe.
// 3rd mode => 2nd player runs game clicks submit => diceRoll twice => display results.
// 4th mode => chooses order of dice integer as strings? ex 6 and 3 would be 63. how? setting array numbers maybe.
// 5th step => compare results, if player 1 > player 2 or vice versa, the player with the highest number wins.

// what do i need?

// Create 1st game mode
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// dice roll function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  console.log(rollDice, "dice roll");
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("Control flow : start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer Changes, playerRolls: ", currentPlayerRolls);
  return `Welcome Player ${currentPlayer}<br>You rolled ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2.<br>Choose the order of the dice.`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow : input validation, invalid out is not 1 and not 2"
    );
    return `Error Please only onput '1' or '' to choose which dice to use as the first digit.<br> Your dice rolls are :<br>Dice 1 : ${currentPlayerRolls[0]} Dice 2 : ${currentPlayerRolls[1]}.`;
  }
  // input == 1
  if (playerInput == 1) {
    console.log("Control flow : input == 1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return `Your chosen value is: ${playerScore}.`;
  }
  // input == 2
  if (playerInput == 2) {
    console.log("Control flow : input == 2");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    // Store playerScore rolls array
    allPlayerScore.push(playerScore);
    // clear current player rolls array
    currentPlayerRolls = [];
    return `Player ${currentPlayer}, your chosen value is ${playerScore}`;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click: ".gameState);
  console.log("Checking currentPlayer on submit click: ", currentPlayer);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow : gameState == GAME_STATE_DICE_ROLL");
    // Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    // change game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow : gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    // Call playerScore function
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log("Control flow : end of player 1, now player");
      currentPlayer == 2;
      gameState = GAME_STATE_DICE_ROLL;
      //return outputMessage`<br>It is now player 2's turn!`;
    }
    if (currentPlayer == 2) {
      console.log(
        "Control flow : end of player 2s turn, Next submit click of calculate the score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;
      return outputMessage`<br> Press submit to caluclate scores`;
    }
  }
  return outputMessage;
};
