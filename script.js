// Global variables
var currentMode = "start";
var reversedMode = false; // adding reversed mode
var myOutputValue = "";
var player = "";
var player1Score = 0;
var player2Score = 0;
var player1DiceOrder = [];
var player2DiceOrder = [];
var player1FinalNumb = 0;
var player2FinalNumb = 0;

// Generate dices
var diceRollGenerator = function () {
  return Math.floor(Math.random() * 6) + 1;
};
// Specifying the 2 dices for each player
var diceRoll1Player1 = diceRollGenerator();
var diceRoll2Player1 = diceRollGenerator();
var diceRoll1Player2 = diceRollGenerator();
var diceRoll2Player2 = diceRollGenerator();

// Rolling the dice for player 1
var player1RollDice = function () {
  return `Player 1: Dice 1 rolled ${diceRoll1Player1} and Dice 2 rolled ${diceRoll2Player1}. <br><br> Please input 1 or 2 to choose the order of your dice roll.`;
};

// Order of the dices for player 1
var userDiceOrderPlayer1 = [];
var diceOrder1Player1 = function () {
  userDiceOrderPlayer1.push(diceRoll1Player1, diceRoll2Player1);
  return `Player 1: Your number is ${(player1FinalNumb = userDiceOrderPlayer1
    .join("")
    .trim())}.<br><br> Player 2 press Enter to roll your dice.`; // to combine the 0 and 1 index together
};
var diceOrder2Player1 = function () {
  userDiceOrderPlayer1.push(diceRoll2Player1, diceRoll1Player1);
  return `Player 1: Your number is ${(player1FinalNumb = userDiceOrderPlayer1
    .join("")
    .trim())}. <br><br> Player 2 press Enter to roll your dice.`; // to combine the 0 and 1 index together
};

// Rolling the dice for player 2
var player2RollDice = function () {
  return `Player 2: Dice 1 rolled ${diceRoll1Player2} and Dice 2 rolled ${diceRoll2Player2}. <br><br> Please input 1 or 2 to choose the order of your dice roll.`;
};

// Order of dices for player 2
var userDiceOrderPlayer2 = [];
var diceOrder1Player2 = function () {
  userDiceOrderPlayer2.push(diceRoll1Player2, diceRoll2Player2);
  return `Player 2: Your number is ${(player2FinalNumb = userDiceOrderPlayer2
    .join("")
    .trim())}.<br><br> Press Enter to view results.`; // to combine the 0 and 1 index together
};

var diceOrder2Player2 = function () {
  userDiceOrderPlayer2.push(diceRoll2Player2, diceRoll1Player2);
  return `Player 2: Your number is ${(player2FinalNumb = userDiceOrderPlayer2
    .join("")
    .trim())}. <br><br> Press Enter to view results.`; // to combine the 0 and 1 index together
};

// Leaderboard display
var displayLBoard = function () {
  if (player1Score > player2Score || player1Score == player2Score) {
    return `LEADERBOARD <br><br> Player 1 Score: ${player1Score} <br><br> Player 2 Score: ${player2Score}<br><br> Press Enter to start another round.`;
  } else {
    return `LEADERBOARD <br><br> Player 2 Score: ${player2Score} <br><br> Player 1 Score: ${player1Score}<br><br> Press Enter to start another round.`;
  }
};

var main = function (input) {
  if (currentMode == "start") {
    myOutputValue = `Choose normal or reversed mode to begin 🎲`;
  }
  if (currentMode == "start" && input == "normal") {
    myOutputValue = `You have chosen NORMAL mode. <br><br> Press enter to start rolling the dice 🎲`;
    currentMode = "normal mode";
  } else if (currentMode == "start" && input == "reversed") {
    myOutputValue = `You have chosen REVERSED mode. <br><br> Press enter to start rolling the dice 🎲`;
    currentMode = "normal mode";
    reversedMode = true;
    // normal mode will roll the dice
  } else if (currentMode == "normal mode") {
    diceRoll1Player1 = diceRollGenerator();
    diceRoll2Player1 = diceRollGenerator();
    myOutputValue = player1RollDice();
    currentMode = "player 1 rolled";
    // input the order
  } else if (currentMode == "player 1 rolled" && input == 1) {
    var player1Order = diceOrder1Player1();
    currentMode = "player 2 start";
    return player1Order;
  } else if (currentMode == "player 1 rolled" && input == 2) {
    var player1Order = diceOrder2Player1();
    currentMode = "player 2 start";
    return player1Order;

    // player 2 roll the dice
  } else if (currentMode == "player 2 start") {
    diceRoll1Player2 = diceRollGenerator();
    diceRoll2Player2 = diceRollGenerator();
    myOutputValue = player2RollDice();
    currentMode = "player 2 rolled";
  } else if (currentMode == "player 2 rolled" && input == 1) {
    var player2Order = diceOrder1Player2();
    currentMode = "results";
    return player2Order;
  } else if (currentMode == "player 2 rolled" && input == 2) {
    var player2Order = diceOrder2Player2();
    currentMode = "results";
    return player2Order;

    // shows result
  } else if (currentMode == "results" && player1FinalNumb == player2FinalNumb) {
    myOutputValue = `Its a draw. <br><br> Player 1: ${player1FinalNumb} <br><br> Player 2: ${player2FinalNumb}`;
    currentMode = "leaderboard";
  } else if (
    currentMode == "results" &&
    player1FinalNumb > player2FinalNumb &&
    reversedMode == false
  ) {
    player1Score++;
    currentMode = "leaderboard";
    myOutputValue = `Player 1 wins!<br><br> Player 1: ${player1FinalNumb} <br><br> Player 2: ${player2FinalNumb}`;
  } else if (
    currentMode == "results" &&
    player1FinalNumb < player2FinalNumb &&
    reversedMode == false
  ) {
    player2Score++;
    myOutputValue = `Player 2 wins!<br><br> Player 1: ${player1FinalNumb} <br><br> Player 2: ${player2FinalNumb}`;
    currentMode = "leaderboard";
  } else if (
    currentMode == "results" &&
    reversedMode == true &&
    player1FinalNumb < player2FinalNumb
  ) {
    player1Score++;
    currentMode = "leaderboard";
    myOutputValue = `Player 1 wins!<br><br> Player 1: ${player1FinalNumb} <br><br> Player 2: ${player2FinalNumb}`;
  } else if (
    currentMode == "results" &&
    reversedMode == true &&
    player1FinalNumb > player2FinalNumb
  ) {
    player2Score++;
    myOutputValue = `Player 2 wins!<br><br> Player 1: ${player1FinalNumb} <br><br> Player 2: ${player2FinalNumb}`;
    currentMode = "leaderboard";
  }
  // shows leaderboard
  else if (currentMode == "leaderboard") {
    myOutputValue = displayLBoard();
    currentMode = "start";
    userDiceOrderPlayer1.length = 0; // reset values back to zero
    userDiceOrderPlayer2.length = 0;
  }
  return myOutputValue;
};
