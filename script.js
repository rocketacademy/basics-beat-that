var player1 = "Player 1";
var player2 = "Player 2";

// To store
var playerNum1;
var playerNum2;

// To store the player's dice in an array
var diceRollPlayer1 = [];
var diceRollPlayer2 = [];

//game modes
var diceRollMode = "Dice Roll Mode";
var diceOrderMode = "Dice Order Mode";
var gameMode = diceRollMode;

var currentPlayer = player1;

// Randomize the dice
var randomDiceRoll = function () {
  var random = Math.ceil(Math.random() * 6);
  return random;
};

// there are 2 playes and players take turns
// When a player clicks Submit, the game rolls two dice
var playerDiceRoll = function () {
  var diceRoll = [randomDiceRoll(), randomDiceRoll()];
  if (currentPlayer == player1) {
    diceRollPlayer1 = diceRoll;
    console.log(diceRollPlayer1);
  } else if (currentPlayer == player2) {
    diceRollPlayer2 = diceRoll;
  }
  return diceRoll;
};

// Change order of the dice
var alterDiceOrder = function (diceNumber) {
  var diceResult;

  // If current player is player1 then return true else false
  var diceRollPlayer =
    currentPlayer == player1 ? diceRollPlayer1 : diceRollPlayer2;

  // Changer the order
  if (diceNumber == 1) {
    diceResult = diceRollPlayer.join("");
  } else {
    temp = diceRollPlayer[0];
    diceRollPlayer[0] = diceRollPlayer[1];
    diceRollPlayer[1] = temp;
    diceResult = diceRollPlayer.join("");
  }

  if (currentPlayer == player1) {
    playerNum1 = diceResult;
  } else {
    playerNum2 = diceResult;
  }

  return diceResult;
};

// Compares player's scores
var compareNum = function () {
  if (playerNum1 > playerNum2) {
    return player1 + " won";
  } else if (playerNum1 == playerNum2) {
    return "It's a tie.";
  } else {
    return player2 + " won";
  }
};

var main = function (input) {
  // Start the game with new dice roll and move to dice order mode
  if (gameMode == diceRollMode) {
    var newDice = playerDiceRoll();
    gameMode = diceOrderMode;
    return `Welcome ${currentPlayer}, <br> You rolled [Dice 1]: ${newDice[0]} and [Dice 2]: ${newDice[1]}. <br> Please choose the order of the dice, which Dice do you want to be the first index? (1/2)`;
  }

  // Move to dice order mode
  if (gameMode == diceOrderMode) {
    var diceIndexNum = Number(input);

    // Check if the input number is NaN
    if (diceIndexNum != 1 && diceIndexNum != 2) {
      return "Please enter 1 or 2";
    }

    // Change the order according to the user input
    var combinedNum = alterDiceOrder(diceIndexNum);

    //message ouput after changing the dice order
    var message = `${currentPlayer}, you chose Dice ${input} first. <br> Your number is ${combinedNum}`;

    // Check if current player is player 1 add message for next player
    if (currentPlayer === player1) {
      currentPlayer = player2;
      gameMode = diceRollMode;
      return `${message}. Click submit for player 2's turn. `;
    }

    // reset the game
    currentPlayer = player1;
    gameMode = diceRollMode;

    // check who won the game
    var determineWinner = compareNum();
    return `${message}. <br><br> ${determineWinner}.
     <br> Player 1's number is ${playerNum1} || Player 2's number is ${playerNum2}. <br><br> Click submit to play again.`;
  }
  return "Error. Please refresh the page.";
};
