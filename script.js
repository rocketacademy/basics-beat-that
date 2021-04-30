var diceOne;
var diceTwo;
var playerOneRolls = [];
var playerTwoRolls = [];
var playerOneTurn = true;
var playerRolled = false;

var main = function (input) {
  var myOutputValue = "";

  // If player has not yet rolled dice, play a turn by rolling two dice
  if (playerRolled == false) {
    playerRolled = true;
    return playTurn();
  } else {
    // If player has already played turn,
    // Take in player's guess
    var diceChoice = `, you chose Dice ${input} first.<br>`;
    var finalNumber = "";

    // If player chose Dice 2 first
    if (input == 2) {
      if (playerOneTurn == true) {
        finalNumber = String(playerOneRolls[1]) + String(playerOneRolls[0]);
      } else {
        finalNumber = String(playerTwoRolls[1]) + String(playerTwoRolls[0]);
      }
    } else {
      if (playerOneTurn == true) {
        finalNumber = String(playerOneRolls[0]) + String(playerOneRolls[1]);
      } else {
        finalNumber = String(playerTwoRolls[0]) + String(playerTwoRolls[1]);
      }
    }

    // moving on to next player's turn, reverse playerRolled to be false
    playerRolled = false;

    // determining next player
    if (playerOneTurn == true) {
      playerOneTurn = false;
      myOutputValue =
        `Player 1` +
        diceChoice +
        `Your number is ${finalNumber}.<br>
        It is now Player 2's turn.`;
    } else {
      playerOneTurn = true;
      myOutputValue =
        `Player 2` +
        diceChoice +
        `Your number is ${finalNumber}.<br>
        It is now Player 1's turn.`;
    }
    return myOutputValue;
  }

  return myOutputValue;
};

var rollDice = function () {
  var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  return randomDiceNumber;
};

// Playing a turn means to roll two dice
var playTurn = function () {
  var outputMessage = "";
  diceOne = rollDice();
  diceTwo = rollDice();

  //determine player to welcome
  //as well as add their dice to their array
  if (playerOneTurn == true) {
    outputMessage = "Welcome Player 1.<br>";
    playerOneRolls.push(diceOne);
    playerOneRolls.push(diceTwo);
  } else {
    outputMessage = "Welcome Player 2.<br>";
    playerTwoRolls.push(diceOne);
    playerTwoRolls.push(diceTwo);
  }
  outputMessage =
    outputMessage +
    `You rolled '${diceOne}' for Dice 1 and '${diceTwo}' for Dice 2.<br>
  Choose the order of the dice, by specifying the number of the dice you want placed first. 
  <br><br>E.g. if you want your number to be [Dice 1][Dice 2], simply enter '1'.`;
  return outputMessage;
};
