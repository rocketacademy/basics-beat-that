/* Gameplay for 2 players
Player 1 will roll 2 dice once click submit
Player 1 to select dice order either 1 or 2
Player 2 will roll 2 dice once click submit
Player 2 to select dice order either 1 or 2
Return the result of the winner bettwen 2 players */

var playerOneChoice = "";
var playerOneDiceRoll = "";
var playerOneDice1 = "";
var playerOneDice2 = "";

var playerTwoChoice = "";
var playerTwoDiceRoll = "";
var playerTwoDice1 = "";
var playerTwoDice2 = "";

// Get random dice rolls
var rollDices = function () {
  // Generate a decimal inclusive of 0 and exclusive of 6
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation to get an integer from 1 to 6 inclusive
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var main = function (input) {
  // To refresh all variables to restart the game
  if (playerTwoChoice !== "") {
    playerOneChoice = "";
    playerOneDiceRoll = "";
    playerOneDice1 = "";
    playerOneDice2 = "";

    playerTwoChoice = "";
    playerTwoDiceRoll = "";
    playerTwoDice1 = "";
    playerTwoDice2 = "";
  }

  // player one has not rolled the dice
  if (playerOneDiceRoll == "") {
    playerOneDice1 = rollDices();
    playerOneDice2 = rollDices();
    playerOneDiceRoll = "rolled";
    return `Welcome Player 1! 🎉 <br><br>
    You rolled...<br>
    🎲 Dice One: ${playerOneDice1}<br>
    🎲 Dice Two: ${playerOneDice2} <br><br>
    You have 2 choices, please enter '1' or '2' to select the options below: <br>
    1️⃣ Option 1: ${playerOneDice1}${playerOneDice2} <br>
    2️⃣ Option 2: ${playerOneDice2}${playerOneDice1}`;
  }

  // if player one has rolled the dice, ask player one to choose the dice order

  // if player one chooses option 1
  if (playerOneDiceRoll == "rolled" && playerOneChoice == "" && input == "1") {
    playerOneChoice = Number(String(playerOneDice1) + String(playerOneDice2));
    return `Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 2, please roll the dices 🎲🎲`;
  }

  // if player one chooses option 2
  if (playerOneDiceRoll == "rolled" && playerOneChoice == "" && input == "2") {
    playerOneChoice = Number(String(playerOneDice2) + String(playerOneDice1));
    return `Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 2, please roll the dices 🎲🎲`;
  }

  // Invalidation if player one does not choose any of the options
  if (playerOneChoice == "") {
    return `Oops, Player 1 have not selected, please select either:<br>
      1️⃣ Option 1: ${playerOneDice1}${playerOneDice2} <br>
      2️⃣ Option 2: ${playerOneDice2}${playerOneDice1}`;
  }

  // if player two has not rolled the dice, let player two roll dice
  if (playerTwoDiceRoll == "") {
    playerTwoDice1 = rollDices();
    playerTwoDice2 = rollDices();
    playerTwoDiceRoll = "rolled";
    return `Welcome Player 2!🎉 <br><br>
    You rolled...<br>
    🎲 Dice One: ${playerTwoDice1}<br>
    🎲 Dice Two: ${playerTwoDice2} <br><br>
    You have 2 choices, please enter '1' or '2' to select the options below: <br>
    1️⃣ Option 1: ${playerTwoDice1}${playerTwoDice2} <br>
    2️⃣ Option 2: ${playerTwoDice2}${playerTwoDice1}`;
  }

  // if player two has rolled the dice, ask player two to choose arrangement

  // if player two chooses option 1
  if (playerTwoDiceRoll == "rolled" && playerTwoChoice == "" && input == "1") {
    playerTwoChoice = Number(String(playerTwoDice1) + String(playerTwoDice2));

    // if player two loses
    if (playerTwoChoice < playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 1 wins, Player 2 lost! 🏆<br><br> Hit play to restart the game.`;
    }

    // if player two wins
    if (playerTwoChoice > playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 1 lost, Player 2 wins! 🏆<br><br> Hit play to restart the game.`;
    }

    // if both players draw
    if (playerTwoChoice == playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1, your choice is ${playerOneChoice}. <br><br>
      It's a draw! 🤞<br><br> Hit play to restart the game.`;
    }
  }

  // if player two chooses option 2
  if (playerTwoDiceRoll == "rolled" && playerTwoChoice == "" && input == "2") {
    playerTwoChoice = Number(String(playerTwoDice2) + String(playerTwoDice1));

    // if player two loses
    if (playerTwoChoice < playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
      Player 1, your choice is ${playerOneChoice}. <br><br>
      Player 1 wins, Player 2 lost! 🏆<br><br> Hit play to restart the game.`;
    }

    // if player two wins
    if (playerTwoChoice > playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
     Player 1, your choice is ${playerOneChoice}. <br><br>
     Player 1 lost, Player 2 wins! 🏆<br><br> Hit play to restart the game.`;
    }

    // if both players draw
    if (playerTwoChoice == playerOneChoice) {
      return `Player 2, your choice is ${playerTwoChoice}. <br>
    Player 1, your choice is ${playerOneChoice}. <br><br>
    It's a draw! No winners! 🤞<br><br> Hit play to restart the game.`;
    }
  }

  // if player two does not choose any of the options
  if (playerTwoChoice == "") {
    return `Oops, Player 2 have not selected, please select either:<br>
      1️⃣ Option 1: ${playerTwoDice1}${playerTwoDice2} <br>
      2️⃣ Option 2: ${playerTwoDice2}${playerTwoDice1}`;
  }
};
