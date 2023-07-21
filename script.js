// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

///Global Variables
//Define Game States
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
//Set initial game state as dice roll
var gameState = GAME_STATE_DICE_ROLL;
//Variables to capture Player 1 and 2 scores
var player1Rolls = [];
var player1Score;
var player2Rolls = [];
var player2Score;
var playerScores = [];
var playerTurn = 1;

//Helper Functions
///Function to Roll Dice
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var randomDiceNumber = randomInteger + 1;
  return randomDiceNumber;
};
///Function to Roll 2 Dices for Player 1 and 2
var rollTwoDiceForPlayer = function () {
  if (playerTurn === 1) {
    player1Rolls[0] = rollDice();
    player1Rolls[1] = rollDice();
    return `Hi Player 1, Dice 1 has rolled ${player1Rolls[0]} and Dice 2 has rolled ${player1Rolls[1]} <br><br> Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.`;
  }
  if (playerTurn === 2) {
    player2Rolls[0] = rollDice();
    player2Rolls[1] = rollDice();
    return `Hi Player 2, Dice 1 has rolled ${player2Rolls[0]} and Dice 2 has rolled ${player2Rolls[1]} <br><br> Now, please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.`;
  }
};

//Main Function
main = function (input) {
  console.log(`Current Game State: ${gameState}`);
  var outputMessage = ``;
  //Roll Dice for Player 1
  if (gameState === GAME_STATE_DICE_ROLL && playerTurn === 1) {
    outputMessage = rollTwoDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  //Select dice order for Player 1
  if (gameState === GAME_STATE_CHOOSE_DICE_ORDER && playerTurn === 1) {
    console.log(`choosing dice order.....`);
    // If player inputs 1
    if (input === "1") {
      var player1Score = Number(
        String(player1Rolls[0]) + String(player1Rolls[1])
      );
      playerScores.push([player1Score]);
      playerTurn = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `Your chosen value is ${player1Score}. Player 2, please click the submit button to roll your dice!`;
    }
    // If player inputs 2
    if (input === "2") {
      player1Score = Number(String(player1Rolls[1]) + String(player1Rolls[0]));
      playerScores.push([player1Score]);
      playerTurn = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return `Your chosen value is ${player1Score}. Player 2, please click the submit button to roll your dice!`;
    }
    //Ensure input is valid
    if (input !== "1" && input !== "2") {
      return `Error! Please input 1 or 2!`;
    }
  }

  // Roll Dice for Player 2
  if (gameState === GAME_STATE_DICE_ROLL && playerTurn === 2) {
    outputMessage = rollTwoDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  //Select dice order for Player 2
  if (gameState === GAME_STATE_CHOOSE_DICE_ORDER && playerTurn === 2) {
    console.log(`choosing dice order.....`);
    // If player inputs 1
    if (input === "1") {
      var player2Score = Number(
        String(player2Rolls[0]) + String(player2Rolls[1])
      );
      playerScores.push([player2Score]);
      gameState = GAME_STATE_COMPARE_SCORES;
      return `Your chosen value is ${player2Score}. Now click the submit button to check who wins!`;
    }
    // If player inputs 2
    if (input === "2") {
      player2Score = Number(String(player2Rolls[1]) + String(player2Rolls[0]));
      playerScores.push([player2Score]);
      gameState = GAME_STATE_COMPARE_SCORES;
      return `Your chosen value is ${player2Score}. Now click the submit button to check who wins!`;
    }
    //Ensure input is valid
    if (input !== "1" && input !== "2") {
      return `Error! Please input 1 or 2!`;
    }
  }

  //Compare Scores and output winner
  if ((gameState = GAME_STATE_COMPARE_SCORES)) {
    console.log(
      `Player 1 Score is ${playerScores[0]} and Player 2 Score is ${playerScores[1]}`
    );
    if (playerScores[0] === playerScores[1]) {
      return `WOW WHAT LUCK! Both Player 1 and 2 have the same score of ${playerScores[0]}!!!!!`;
    }
    if (playerScores[0] > playerScores[1]) {
      return `Player 1 Wins with a score of ${playerScores[0]}! Player 2 got ${playerScores[1]}:(`;
    }
    if (playerScores[0] < playerScores[1]) {
      return `Player 2 Wins with a score of ${playerScores[1]}! Player 1 got ${playerScores[0]}:(`;
    }
  }
};
