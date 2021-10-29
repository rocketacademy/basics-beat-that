// global variables
var currentGameMode = "awaiting player 1 name";
var player1Name = "";
var player2Name = "";

// arrays to store each player's dice rolls
var player1DiceRolls = [];
var player2DiceRolls = [];

// dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

function main(input) {
  if (currentGameMode == "awaiting player 1 name") {
    // if input is blank, prompt player 1 to enter a name
    if (input == "") {
      return "Please enter your name, Player 1!";
    } else if (input !== "") {
      player1Name = input;
      currentGameMode = "awaiting player 2 name";
      return `Welcome, Player 1 ${player1Name}! <br><br> Please enter your name, Player 2.`;
    }

    // start the game after both players enter their name
  } else if (currentGameMode == "awaiting player 2 name") {
    player2Name = input;
    currentGameMode = "player 1 dice roll";
    return `Welcome, Player 2 ${player2Name}! <br><br> Player 1 ${player1Name}, please click submit to roll the dice.`;
  }

  // player 1's turn to roll dice first
  if (currentGameMode == "player 1 dice roll") {
    while (player1DiceRolls.length < 2) {
      player1DiceRolls.push(rollDice());
    }
    currentGameMode = "player 1 order";
    return `${player1Name}, you rolled ${player1DiceRolls[0]} for Dice 1 and ${player1DiceRolls[1]} for Dice 2.<br><br>Now choose the order of the dice! Enter '1' or '2' to to choose the first digit.`;
  }

  // player 1 to choose order after rolling dice
  if (currentGameMode == "player 1 order") {
    // if player chooses 2, change position of first and second number rolled
    if (input == 2) {
      var firstNumberRolled = player1DiceRolls[0];
      player1DiceRolls[0] = player1DiceRolls[1];
      player1DiceRolls[1] = firstNumberRolled;
    }
    var firstDigit = player1DiceRolls[0].toString();
    var secondDigit = player1DiceRolls[1].toString();
    var player1Number = firstDigit + secondDigit;
    currentGameMode = "player 2 dice roll";
    return `Player 1 ${player1Name}'s number: ${player1Number} <br><br> 
      Player 2 ${player2Name}, please click submit to roll the dice.`;
  }

  // player 2 turn's to roll dice
  if (currentGameMode == "player 2 dice roll") {
    while (player2DiceRolls.length < 2) {
      player2DiceRolls.push(rollDice());
    }
    currentGameMode = "player 2 order";
    return `${player2Name}, you rolled ${player2DiceRolls[0]} for Dice 1 and ${player2DiceRolls[1]} for Dice 2.<br><br>Now choose the order of the dice! Enter '1' or '2' to to choose the first digit.`;
  }

  // player 2 to choose order after they have rolled dice
  if (currentGameMode == "player 2 order") {
    // if player chooses 2, change position of first and second number rolled
    if (input == 2) {
      var firstNumberRolled = player2DiceRolls[0];
      player2DiceRolls[0] = player2DiceRolls[1];
      player2DiceRolls[1] = firstNumberRolled;
    }
    var firstDigit = player2DiceRolls[0].toString();
    var secondDigit = player2DiceRolls[1].toString();
    var player2Number = firstDigit + secondDigit;
    currentGameMode = "compare numbers";
    return `Player 2 ${player2Name}'s number: ${player2Number} <br><br> 
      Click submit to see who wins!`;
  }

  // last step: compare numbers of player 1 and player 2
  if (currentGameMode == "compare numbers") {
    // reset the game
    currentGameMode = "player 1 dice roll";
    player1Number =
      player1DiceRolls[0].toString() + player1DiceRolls[1].toString();
    player2Number =
      player2DiceRolls[0].toString() + player2DiceRolls[1].toString();

    // empty the arrays
    player1DiceRolls = [];
    player2DiceRolls = [];

    // compare numbers
    if (Number(player1Number) > Number(player2Number)) {
      return `${player1Name}'s number is ${player1Number} and ${player2Name}'s number is ${player2Number}. ${player1Name} wins! <br><br> Let's play another round! Click submit to roll the dice again, Player 1 ${player1Name}!`;
    } else if (Number(player2Number) > Number(player1Number)) {
      return `${player1Name}'s number is ${player1Number} and ${player2Name}'s number is ${player2Number}. ${player2Name} wins! <br><br> Let's play another round! Click submit to roll the dice again, Player 1 ${player1Name}!`;
    }
  }
}
