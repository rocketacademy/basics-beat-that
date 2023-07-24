// List down global variables
var GAME_MODE_ROLL_DICES = "GAME_MODE_ROLL_DICES";
var GAME_MODE_PLAYER_CHOOSE_ORDER = "GAME_MODE_PLAYER_CHOOSE_ORDER";
var gameMode = "intro";

var currentPlayer = 1;
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1ChosenNumber = "";
var player2ChosenNumber = "";

//List global helper functions
// Create function for random dice roll.
function getRandomDiceRoll() {
  var maximumPossibleOptions = 6;
  var randomDiceRoll = Math.floor(Math.random() * maximumPossibleOptions) + 1;
  return randomDiceRoll;
}

// Create function to roll dices and assign to that player's dice array.
function getNewDiceRollNumbers() {
  var newDiceRollNumbers = [getRandomDiceRoll(), getRandomDiceRoll()];
  if (currentPlayer == 1) {
    player1DiceRolls = newDiceRollNumbers;
  } else if (currentPlayer == 2) {
    player2DiceRolls = newDiceRollNumbers;
  }
  return newDiceRollNumbers;
}

// Create function to concatenate 2 numbers in an array.
function concatenate2Numbers(number1, number2) {
  return Number(String(number1) + String(number2));
}

// Create function to get and store player's number (roll dices, choose order, store numbers).
function getPlayerNumber(orderChosenByPlayer) {
  var diceRollsArray = "";
  if (currentPlayer == 1) {
    diceRollsArray = player1DiceRolls;
  } else if (currentPlayer == 2) {
    diceRollsArray = player2DiceRolls;
  }
  var playerNumber = "";
  if (orderChosenByPlayer == 1) {
    playerNumber = concatenate2Numbers(diceRollsArray[0], diceRollsArray[1]);
  } else {
    playerNumber = concatenate2Numbers(diceRollsArray[1], diceRollsArray[0]);
  }
  if (currentPlayer == 1) {
    player1ChosenNumber = playerNumber;
  } else {
    player2ChosenNumber = playerNumber;
  }
  return playerNumber;
}

// Create function to determine winner based on their chosen number.
function determineWinner() {
  if (player1ChosenNumber > player2ChosenNumber) {
    return "1";
  } else {
    return "2";
  }
}

// Run main function.
function main(input) {
  // Start game. If no input, invalid message. If click 'Submit', show intro message.
  if (gameMode == "intro") {
    if (input != "") {
      return "Please click <b>'Submit'</b> to start the game.";
    }
    if (input == "") {
      gameMode = GAME_MODE_ROLL_DICES;
      var introMessage =
        "Hello! Welcome to 🎲🎲 Beat That 🎲🎲.<br><br>Here is how you play:<br> 1. There are 2 players in this game.<br> 2. On your turn, click 'Submit' to roll two dices.<br> 3. Choose the order of your dice rolls to create the largest two-digit number (e.g., if you roll a '1' and '5', and if your chosen order is '2', then your largest number is '51'.)<br> 4. If your number is larger than your opponent's number, you win!<br><br> Ready to play? Click <b>'Submit'</b> to roll your dices. Good luck!";
      return introMessage;
    }
  }
  // Dice rolled, show dice roll numbers, ask player to choose order.
  if (gameMode == GAME_MODE_ROLL_DICES) {
    var newDiceRollNumbers = getNewDiceRollNumbers();
    gameMode = GAME_MODE_PLAYER_CHOOSE_ORDER;
    return `Hi <b>Player ${currentPlayer}</b>!<br><br> Your dice rolls are:<br> 1st dice roll: ${newDiceRollNumbers[0]} <br> 2nd dice roll: ${newDiceRollNumbers[1]}<br><br> Please choose the order of the dice by <b>entering '1' or '2'</b>.`;
  }
  if (gameMode == GAME_MODE_PLAYER_CHOOSE_ORDER) {
    var orderChosenByPlayer = input;
    // Validate input. If input is not '1' or '2', show invalid message.
    if (orderChosenByPlayer != 1 && orderChosenByPlayer != 2) {
      return "Oops that is an invalid input. Please choose the order of the dice by <b>entering '1' or '2'</b>.";
    }
    var playerNumber = getPlayerNumber(orderChosenByPlayer);
    if (currentPlayer == 1) {
      var message_TellNumber = `Hi Player ${currentPlayer}.<br> The order you chose is ${orderChosenByPlayer}, therefore <b>your number is ${playerNumber}.</b>.<br><br> It is now Player 2's turn.<br> Player 2: please click <b>'Submit'</b> to roll your dices.`;
      currentPlayer = 2;
      gameMode = GAME_MODE_ROLL_DICES;
      return message_TellNumber;
    }
    var winningPlayer = determineWinner();
    currentPlayer = 1;
    gameMode = GAME_MODE_ROLL_DICES;
    return `Hi Player 2.<br> The order you chose is ${orderChosenByPlayer}, therefore your number is ${playerNumber}.<br><br><hr> Here are the results:<br>Player 1's number: ${player1ChosenNumber} vs Player 2's number: ${player2ChosenNumber}<br><br> <b>The winner is Player ${winningPlayer}! Congrats!</b><br><br> Thanks for playing. Please click <b>'Submit'</b> to play again.`;
  }
}
