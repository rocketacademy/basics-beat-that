var diceOne;
var diceTwo;
var playerOneRolls = [];
var playerTwoRolls = [];
var playerOneTurn = true;
var playerRolled = false;
// scores are a running sum of all the numbers that player has generated so far
var playerOneScore = 0;
var playerTwoScore = 0;

// Function to roll a dice with a random result
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

var main = function (input) {
  var myOutputValue = "";

  // If player has not yet rolled dice, play a turn by rolling two dice
  if (playerRolled == false) {
    playerRolled = true;
    return playTurn();
  } else {
    // If player has already played turn,
    // Take in player's choice
    var diceChoice = `, you chose Dice ${input} first.<br>`;

    // reset finalNumber at start of each player choice
    var finalNumber = "";

    // If player chose Dice 2 first
    if (input == 2) {
      if (playerOneTurn == true) {
        finalNumber = String(playerOneRolls[1]) + String(playerOneRolls[0]);
        playerOneScore += Number(finalNumber);
      } else {
        finalNumber = String(playerTwoRolls[1]) + String(playerTwoRolls[0]);
        playerTwoScore += Number(finalNumber);
      }
      // Make sure this new roll gets added to the player's running score
    } else {
      if (playerOneTurn == true) {
        finalNumber = String(playerOneRolls[0]) + String(playerOneRolls[1]);
        playerOneScore += Number(finalNumber);
      } else {
        finalNumber = String(playerTwoRolls[0]) + String(playerTwoRolls[1]);
        playerTwoScore += Number(finalNumber);
      }
    }

    // moving on to next player's turn, reverse playerRolled to be false
    playerRolled = false;

    var scoreMessage = function (playerOneScore, playerTwoScore) {
      if (playerOneScore > playerTwoScore) {
        return `Player 1 is the current leader!<br><br>
        The current scores are as follows:<br>
        Player 1: ${playerOneScore}<br>
        Player 2: ${playerTwoScore}`;
      } else if (playerTwoScore > playerOneScore) {
        return `Player 2 is the current leader!<br><br>
        The current scores are as follows:<br>
        Player 1: ${playerOneScore}<br>
        Player 2: ${playerTwoScore}`;
      } else {
        // this means it's a tie:
        return `It's a tie!<br><br>
        The current scores are as follows:<br>
        Player 1: ${playerOneScore}<br>
        Player 2: ${playerTwoScore}`;
      }
    };

    // determining next player
    // display scores
    if (playerOneTurn == true) {
      playerOneTurn = false;
      myOutputValue =
        `Player 1` +
        diceChoice +
        `Your number is ${finalNumber}.<br>
        It is now Player 2's turn.<br><br>` +
        scoreMessage(playerOneScore, playerTwoScore);
      // reset player arrays
      playerOneRolls = [];
    } else {
      playerOneTurn = true;
      myOutputValue =
        `Player 2` +
        diceChoice +
        `Your number is ${finalNumber}.<br>
        It is now Player 1's turn.<br><br>` +
        scoreMessage(playerOneScore, playerTwoScore);
      // reset player arrays
      playerTwoRolls = [];
    }
    return myOutputValue;
  }
};
