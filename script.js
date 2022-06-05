/*Create a version of the Beat That dice game, where players create the largest number they can by concatenating random dice roll digits:

There are 2 players and players take turns.
When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
After both players have rolled and chosen dice order, the player with the higher combined number wins.*/

var currentPlayer = "";
var currentGameStatus = "player 1 turn";
var player1Roll = [];
var player2Roll = [];
var totalGames = 0;
var player1Win = 0;
var player2Win = 0;
var player1Numbers = [];
var player2Numbers = [];

// create a function that stores both player's roll and outputs them
var generatePlayerRoll = function () {
  var allPlayerRoll = [];

  for (var counter = 0; counter < 2; counter += 1) {
    var playerRoll = [];

    var diceRoll = rollDice();
    playerRoll.push(diceRoll);

    // ensure second roll is not the same as the first roll
    diceRoll = rollDice();
    while (diceRoll == playerRoll[0]) {
      diceRoll = rollDice();
    }
    playerRoll.push(diceRoll);

    allPlayerRoll.push(playerRoll);
  }

  player1Roll = allPlayerRoll[0];
  player2Roll = allPlayerRoll[1];
};

// create a function that takes in user input on which dice to go first and then outputs the concatenated number
var concatenateDiceRoll = function (playerInput, playerRoll) {
  var finalNumber = String(playerRoll[0]) + String(playerRoll[1]);

  if (playerInput == "2") {
    finalNumber = String(playerRoll[1]) + String(playerRoll[0]);
  }

  return finalNumber;
};

// include input validation
var validateInput = function (playerInput) {
  var validInput = "";

  if (playerInput == 1 || playerInput == 2) {
    validInput = true;
  } else {
    validInput = false;
  }

  return validInput;
};

// create a function that compares player 1 and player 2 numbers and outputs winner

var comparePlayerRolls = function (player1Number, player2Number) {
  if (player1Number > player2Number) {
    result = `Player 1: ${player1Number} > Player 2: ${player2Number}<br>
    Player 1 wins!`;
    player1Win += 1;
  } else if (player1Number < player2Number) {
    result = `Player 2: ${player2Number} > Player 1: ${player1Number}<br>
    Player 2 wins!`;
    player2Win += 1;
  } else {
    result = `Both players rolled ${player1Number}.<br>
    It's a draw!`;
  }
  return result;
};

// create a function for dice rolling
var rollDice = function () {
  var diceNumber = Math.floor(Math.random() * 6 + 1);
  return diceNumber;
};

var showRollOutcome = function (player, dice1Roll, dice2Roll) {
  var message = `${player}'s Dice Roll<br>
  *********************** <br>
  🎲 1 : [${dice1Roll}] <br>
  🎲 2 : [${dice2Roll}] <br><br>
  Pick the dice to be ordered first.<br>
  Enter 1 for Dice 1 and 2 for Dice 2.`;
  return message;
};

// scoreboard

var generateScoreboard = function () {
  var scoreboard = `Leaderboard of ${totalGames} Games: <br><br>
  Player 1's Wins: ${player1Win} <br>
  Player 1's Numbers: ${player1Numbers} <br><br>
  Player 2's Wins: ${player2Win} <br>
  Player 2's Numbers: ${player2Numbers}
  `;
  return scoreboard;
};

var main = function (input) {
  var gameMessage = "";
  console.log(currentGameStatus);

  if (currentGameStatus == "player 1 turn") {
    // roll the dice for both players
    totalGames += 1;
    generatePlayerRoll();
    console.log(player1Roll, player2Roll);
    player1dice1 = player1Roll[0];
    player1dice2 = player1Roll[1];
    gameMessage = showRollOutcome("Player 1", player1dice1, player1dice2);
    currentGameStatus = "player 1 choose";
  } else if (currentGameStatus == "player 1 choose") {
    if (!validateInput(input)) {
      gameMessage = `Invalid input. Enter 1 for Dice 1 to be ordered first or 2 for Dice 2 only.<br><br>
        Player 1's Dice Roll: [${player1dice1}] [${player1dice2}]`;
    } else {
      player1Number = concatenateDiceRoll(input, player1Roll);
      player1Numbers.push(player1Number);
      gameMessage = `Player 1's number is ${player1Number}.<br><br>
      ****************************<br><br>
      Hit submit for Player 2's dice roll!`;
      currentGameStatus = "player 2 turn";
    }
  } else if (currentGameStatus == "player 2 turn") {
    player2dice1 = player2Roll[0];
    player2dice2 = player2Roll[1];
    gameMessage = showRollOutcome("Player 2", player2dice1, player2dice2);
    currentGameStatus = "player 2 choose";
  } else if (currentGameStatus == "player 2 choose") {
    if (!validateInput(input)) {
      gameMessage = `Invalid input. Enter 1 for Dice 1 to be ordered first or 2 for Dice 2 only.<br><br>
        Player 2's Dice Roll: [${player2dice1}] [${player2dice2}]`;
    } else {
      player2Number = concatenateDiceRoll(input, player2Roll);
      player2Numbers.push(player2Number);
      gameResult = comparePlayerRolls(player1Number, player2Number);
      gameMessage = `Player 2's number is ${player2Number}.<br><br>
      ****************************<br><br>
      ${gameResult}<br><br>
      ****************************<br>
      ${generateScoreboard()}<br>
      ****************************<br><br>
      Hit submit to play again!<br><br>
      `;
      currentGameStatus = "player 1 turn";
    }
  }
  return gameMessage;
};
