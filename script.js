/* Two-player game
Player 1 will press submit and 2 dice are rolled
Player 1 to select dice order
Player 2 will press submit and 2 dice are rolled
Player 2 to select dice order
To determine who the winner is */

var playerOneChoice = "";
var playerOneDiceRoll = "";
var playerOneDiceOne = "";
var playerOneDiceTwo = "";

var playerTwoChoice = "";
var playerTwoDiceRoll = "";
var playerTwoDiceOne = "";

var main = function (input) {
  // refresh all variables to play again
  if (playerTwoChoice !== "") {
    resetGame();
  }

  // player one has not rolled the dice
  if (playerOneDiceRoll == "") {
    playerOneDiceOne = rollDices();
    playerOneDiceTwo = rollDices();
    playerOneDiceRoll = "rolled";
    return `Welcome Player 1! <br><br>
    You rolled...<br>
    # Dice One: ${playerOneDiceOne}<br>
    # Dice Two: ${playerOneDiceTwo} <br><br>
    Please type in either '1' or '2' to continue... <br>
    # Option 1: ${playerOneDiceOne}${playerOneDiceTwo} <br>
    # Option 2: ${playerOneDiceTwo}${playerOneDiceOne}`;
  }

  // if player one has rolled the dice, ask player one to choose arrangement

  // if player one chooses option 1 (arrangement of dice 1+2)
  if (playerOneDiceRoll == "rolled" && playerOneChoice == "" && input == "1") {
    playerOneChoice = Number(
      String(playerOneDiceOne) + String(playerOneDiceTwo)
    );
    return `Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 2, please roll the dices.`;
  }

  // if player one chooses option 2 (arrangement of dice 2+1)
  if (playerOneDiceRoll == "rolled" && playerOneChoice == "" && input == "2") {
    playerOneChoice = Number(
      String(playerOneDiceTwo) + String(playerOneDiceOne)
    );
    return `Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 2, please roll the dices.`;
  }

  // if player one does not choose any of the options
  if (playerOneChoice == "") {
    return `Player 1, please type in either '1' or '2' to continue... <br><br>
      # Option 1: ${playerOneDiceOne}${playerOneDiceTwo} <br>
      # Option 2: ${playerOneDiceTwo}${playerOneDiceOne}`;
  }

  // if player two has not rolled the dice, let player two roll dice
  if (playerTwoDiceRoll == "") {
    playerTwoDiceOne = rollDices();
    playerTwoDiceTwo = rollDices();
    playerTwoDiceRoll = "rolled";
    return `Welcome Player 2! <br><br>
    You rolled...<br>
    # Dice One: ${playerTwoDiceOne}<br>
    # Dice Two: ${playerTwoDiceTwo} <br><br>
    Please type in either '1' or '2' to continue... <br>
    # Option 1: ${playerTwoDiceOne}${playerTwoDiceTwo} <br>
    # Option 2: ${playerTwoDiceTwo}${playerTwoDiceOne}`;
  }

  // if player two has rolled the dice, ask player two to choose arrangement

  // if player two chooses option 1 (arrangement of dice 1+2)
  if (playerTwoDiceRoll == "rolled" && playerTwoChoice == "" && input == "1") {
    playerTwoChoice = Number(
      String(playerTwoDiceOne) + String(playerTwoDiceTwo)
    );

    // if player two loses
    if (playerTwoChoice < playerOneChoice) {
      var returnMessage = playerTwoLoses();
      return returnMessage;
    }

    // if player two wins
    if (playerTwoChoice > playerOneChoice) {
      var returnMessage = playerTwoWins();
      return returnMessage;
    }

    // if draw
    if (playerTwoChoice == playerOneChoice) {
      var returnMessage = playersDraw();
      return returnMessage;
    }
  }

  // if player two chooses option 2 (arrangement of dice 2+1)
  if (playerTwoDiceRoll == "rolled" && playerTwoChoice == "" && input == "2") {
    playerTwoChoice = Number(
      String(playerTwoDiceTwo) + String(playerTwoDiceOne)
    );

    // if player two loses
    if (playerTwoChoice < playerOneChoice) {
      var returnMessage = playerTwoLoses();
      return returnMessage;
    }

    // if player two wins
    if (playerTwoChoice > playerOneChoice) {
      var returnMessage = playerTwoWins();
      return returnMessage;
    }

    // if draw
    if (playerTwoChoice == playerOneChoice) {
      var returnMessage = playersDraw();
      return returnMessage;
    }
  }

  // if player two does not choose any of the options
  if (playerTwoChoice == "") {
    return `Player 2, please type in either '1' or '2' to continue... <br><br>
      # Option 1: ${playerTwoDiceOne}${playerTwoDiceTwo} <br>
      # Option 2: ${playerTwoDiceTwo}${playerTwoDiceOne}`;
  }
};

// function to roll dices
var rollDices = function () {
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  return randomInteger;
};

// function to reset game
var resetGame = function () {
  playerOneChoice = "";
  playerOneDiceRoll = "";
  playerOneDiceOne = "";
  playerOneDiceTwo = "";

  playerTwoChoice = "";
  playerTwoDiceRoll = "";
  playerTwoDiceOne = "";
  playerTwoDiceTwo = "";
};

//function for msg where player 2 wins
var playerTwoWins = function () {
  return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1's choice is ${playerOneChoice}. <br><br>
      Player 1 loses, Player 2 wins!`;
};

//function for msg where player 2 loses
var playerTwoLoses = function () {
  return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1's choice is ${playerOneChoice}. <br><br>
      Player 1 wins, Player 2 loses!`;
};

//function for msg where players draw
var playersDraw = function () {
  return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1's choice is ${playerOneChoice}. <br><br>
      It's a draw!`;
};
