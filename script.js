// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

var diceGameMode = "X";
var gameMode = "X";
var diceChooseMode = "Y";
var diceCompareSCore = "Z";
var playerRolls = [];
var bothPlayersScore = [];
var currentPlayer = 1;
var player1Score = 0;
var player2Score = 0;

// Dice roll function
var rollDice = function () {
  var number = Math.ceil(Math.random() * 6);
  return number;
};

// Dice will roll twice and show the player the two dice rolls
var rollDiceGame = function () {
  var counter = 0;
  // limits roll to 2 times
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Hello Player ${currentPlayer} ! Dice results: <br> Dice 1: ${playerRolls[0]} <br> Dice 2: ${playerRolls[1]}`;
};

// Allow player to choose their number
var playerChoice = function (playerInput) {
  if (playerInput == 1) {
    // To link the two numbers as string then represent it as a number
    var playerScore = Number(String(playerRolls[0])) + String(playerRolls[1]);
  }
  if (playerInput == 2) {
    // To link the two numbers as string then represent it as a number
    var playerScore = Number(String(playerRolls[1])) + String(playerRolls[0]);
  }

  // Store players score and reset roll
  bothPlayersScore.push(playerScore);
  playerRolls = [];

  return `Player ${currentPlayer}, your number is ${playerScore}`;
};

var reset = function () {
  currentPlayer = 1;
  bothPlayersScore = [];
  gameMode = `X`;
};

var main = function (input) {
  var output = ``;
  // Step 1 : Allow player to choose their number
  if (gameMode == diceGameMode) {
    output = `${rollDiceGame()} <br> Please key in 1 or 2 to determine the first number.  `;
    gameMode = diceChooseMode;
    return output;
  }
  // Step 2 : Game Flow
  if (gameMode == diceChooseMode) {
    if (input != 1 && input != 2) {
      return `Please input either 1 or 2 in the selection for your Dice sequence.<br> Dice 1 : ${currentPlayerRolls[0]} <br> Dice 2 : ${currentPlayerRolls[1]}`;
    } else {
      output = playerChoice(input);
    }
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = diceGameMode;
      return `${output} <br> it is now player 2's turn <br>`;
    }
    if (currentPlayer == 2) {
      gameMode = diceCompareSCore;
    }
    return `${output} <br> Press submit to see the scores!`;
  }
  // Step 3 : Comparison and Winning Condition
  if (gameMode == diceCompareSCore) {
    // Tie Condition
    if (bothPlayersScore[0] == bothPlayersScore[1]) {
      output = " It is a TIE! No one wins!";
    }
    //Player 1 win
    if (bothPlayersScore[0] > bothPlayersScore[1]) {
      player1Score++;
      output = "Player 1 WINS!";
    }
    //Player 2 win
    if (bothPlayersScore[0] < bothPlayersScore[1]) {
      player2Score++;
      output = "Player 2 WINS!";
    }
    reset();
    return `<b> ${output}<b> <br>  <br> The score now is :<br> <b> Player 1 : ${player1Score} <b> <br> <b> Player 2 : ${player2Score} <b><br> <br>Click Submit to play again!`;
  }
};
