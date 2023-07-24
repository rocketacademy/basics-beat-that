//Global Variable
// Initialize variables for player names, dice rolls, and orders
var userName1 = "";
var userName2 = "";
var diceRoll1a = 0;
var diceRoll1b = 0;
var diceRoll2a = 0;
var diceRoll2b = 0;
var player1Order = "";
var player2Order = "";

// Function to generate a random dice roll
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to check if input is a valid order choice (1 or 2)
function isValidOrderChoice(input) {
  return input === "1" || input === "2";
}

// Function to reset the game
function resetGame() {
  diceRoll1a = 0;
  diceRoll1b = 0;
  diceRoll2a = 0;
  diceRoll2b = 0;
  player1Order = "";
  player2Order = "";
}

// Function to play the game
var main = function (input) {
  // Get player names
  if (userName1 === "" && input !== "") {
    userName1 = input;
    return `Welcome Player 1: ${userName1}, please enter the username for Player 2.`;
  }

  if (userName2 === "" && input !== "") {
    userName2 = input;
    return `Welcome Player 2: ${userName2}, click submit to start the dice roll game.`;
  }

  // Check if both players have names and if dice rolls need to be performed
  if (
    userName1 !== "" &&
    userName2 !== "" &&
    diceRoll1a === 0 &&
    diceRoll2a === 0
  ) {
    // Roll the dice for each player
    diceRoll1a = rollDice();
    diceRoll1b = rollDice();
    diceRoll2a = rollDice();
    diceRoll2b = rollDice();

    // Prompt players to choose the order of their dice rolls
    return `${userName1}, you rolled ${diceRoll1a} and ${diceRoll1b}.<br>${userName2}, you rolled ${diceRoll2a} and ${diceRoll2b}.<br>Now, both players choose the order for your dice rolls (1 or 2).`;
  }

  // Check if both players have chosen the order for their dice rolls
  if (
    userName1 !== "" &&
    userName2 !== "" &&
    diceRoll1a !== 0 &&
    diceRoll2a !== 0 &&
    player1Order === ""
  ) {
    // Player 1 chooses the order of dice rolls
    if (isValidOrderChoice(input)) {
      player1Order = input;
      return `${userName2}, choose the order for your dice rolls (1 or 2).`;
    }
    return `${userName1}, please choose the order for your dice rolls (1 or 2).`;
  }

  // Check if both players have chosen the order for their dice rolls
  if (
    userName1 !== "" &&
    userName2 !== "" &&
    diceRoll1a !== 0 &&
    diceRoll2a !== 0 &&
    player2Order === ""
  ) {
    // Player 2 chooses the order of dice rolls
    if (isValidOrderChoice(input)) {
      player2Order = input;

      // Combine dice rolls based on chosen order for each player
      var player1Roll =
        player1Order === "1"
          ? "" + diceRoll1a + diceRoll1b
          : "" + diceRoll1b + diceRoll1a;
      var player2Roll =
        player2Order === "1"
          ? "" + diceRoll2a + diceRoll2b
          : "" + diceRoll2b + diceRoll2a;

      // Compare the combined dice rolls to determine the winner
      var result =
        player1Roll > player2Roll
          ? `${userName1} WINS!`
          : player1Roll < player2Roll
          ? `${userName2} WINS!`
          : "It's a TIE!";

      var output = `${userName1}, you chose ${player1Roll} as the order for your dice roll.<br>${userName2}, you chose ${player2Roll} as the order for your dice roll.<br>${result}.<br>Click submit to play again.`;

      // Reset the game for a new round
      resetGame();

      return output;
    }

    return `${userName2}, please choose the order for your dice rolls (1 or 2).`;
  }

  return "Please enter the usernames for both players.";
};
