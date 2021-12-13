// Project 2: Beat That!
// Base
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// Pseudocode
// 1. Prompt the user to click "submit" to roll dice
// 2. Automatically goes to player 1.
// 3. There are 2 random dices which rolls different random number from 1 ~ 6.
// 4. Show the dices number to the player 1 and wait for the player 1 to choose how to arrange the dice to form numbers.
// 5. Once the player 1 choose, the program will form the new number for player 1.
// 6. Switch to player 2.
// 7. Repeat step 3 to 5.
// 8. Compare which player has the higher final dice number.
// 9. Declare winner.
// 10. Program repeat from 1.

// Global variables
var playerOne;
var playerOneFirstDice;
var playerOneSecondDice;
var playerOneFinalDice;
var playerTwo;
var playerTwoFirstDice;
var playerTwoSecondDice;
var playerTwoFinalDice;
var currentGameMode = "playerOneMode1";

// 2 random dices
var rollDice1 = function () {
  // 0 ~ 5.99 -> 0 ~ 5 -> 1 ~ 6
  return Math.floor(Math.random() * 6) + 1;
};

var rollDice2 = function () {
  // 0 ~ 5.99 -> 0 ~ 5 -> 1 ~ 6
  return Math.floor(Math.random() * 6) + 1;
};

// Main function
var main = function (input) {
  // Default output
  var outputValue = "";

  // Game mode
  if (currentGameMode == "playerOneMode1") {
    // Loop 1
    // User cannot key in anything except pressing submit button
    if (input != "") {
      outputValue = "Please roll the dice by clicking 'Submit'.";
    } else {
      // Player 1 mode 1: Roll 2 dices
      playerOneFirstDice = rollDice1();
      playerOneSecondDice = rollDice2();
      console.log(playerOneFirstDice);
      console.log(playerOneSecondDice);
      outputValue = `Welcome Player 1. <br><br> You rolled ${playerOneFirstDice} for Dice 1 and ${playerOneSecondDice} for Dice 2. <br><br> Choose the order of the dice by entering "1" or "2" ONLY.`;
      // Player 1 mode 1 -> mode 2
      currentGameMode = "playerOneMode2";
    }
    // Loop 2
    // Player 1 mode 2: Choose which dice as first
  } else if (currentGameMode == "playerOneMode2") {
    // if (input != "1" || input != "2") {
    //   outputValue = `Please choose the order of the dice by entering "1" or "2" ONLY.`;
    // }
    // Player 1 choose 1st dice
    if (input == "1") {
      playerOneFinalDice = `${playerOneFirstDice}${playerOneSecondDice}`;
      console.log(playerOneFinalDice);
      outputValue = `Player 1, you chose Dice ${input} first. <br><br> Your number is ${playerOneFinalDice}. <br><br> It is now Player 2's turn. <br><br> Please press "Submit" to continue!`;
      // Player 1 choose 2nd dice
    } else if (input == "2") {
      playerOneFinalDice = `${playerOneSecondDice}${playerOneFirstDice}`;
      console.log(playerOneFinalDice);
      outputValue = `Player 1, you chose Dice ${input} first. <br><br> Your number is ${playerOneFinalDice}. <br><br> It is now Player 2's turn. <br><br> Please press "Submit" to continue!`;
    } else {
      return `Please input 1 or 2 only.`;
    }

    currentGameMode = "playerTwoMode1";
    // Loop 3
    // Player 1 mode ended. Start Player 2 mode 1
  } else if (currentGameMode == "playerTwoMode1") {
    // User cannot key in anything except pressing submit button
    if (input != "") {
      outputValue = "Please roll the dice by clicking 'Submit'.";
    } else {
      // Player 2 mode 1: Roll 2 dices
      playerTwoFirstDice = rollDice1();
      playerTwoSecondDice = rollDice2();
      console.log(playerTwoFirstDice);
      console.log(playerTwoSecondDice);
      outputValue = `Welcome Player 2. <br><br> You rolled ${playerTwoFirstDice} for Dice 1 and ${playerTwoSecondDice} for Dice 2. <br><br> Choose the order of the dice by entering "1" or "2" ONLY.`;
      // Player 2 mode 1 -> mode 2
      currentGameMode = "playerTwoMode2";
    }
    // Loop 4
    // Player 2 mode 2: Choose which dice as first
  } else if (currentGameMode == "playerTwoMode2") {
    // Player 2 choose 1st dice
    if (input == "1") {
      playerTwoFinalDice = `${playerTwoFirstDice}${playerTwoSecondDice}`;
      console.log(playerTwoFinalDice);
      outputValue = `Player 2, you chose Dice ${input} first. <br><br> Your number is ${playerTwoFinalDice}. <br><br> Press "Submit" to see who win!`;
      // Player 1 choose 2nd dice
    } else if (input == "2") {
      playerTwoFinalDice = `${playerTwoSecondDice}${playerTwoFirstDice}`;
      console.log(playerTwoFinalDice);
      outputValue = `Player 2, you chose Dice ${input} first. <br><br> Your number is ${playerTwoFinalDice}. <br><br> Press "Submit" to see who win!`;
    } else {
      return `Please input 1 or 2 only.`;
    }
    currentGameMode = "winnerMode";
    // Loop 5
    // Winner mode
  } else if (currentGameMode == "winnerMode") {
    if (playerOneFinalDice > playerTwoFinalDice) {
      outputValue = `Player 1: ${playerOneFinalDice} <br><br> Player 2: ${playerTwoFinalDice} <br><br> Congratulation player 1, you win! <br><br> Please press "Submit" to play again!`;
    } else if (playerTwoFinalDice > playerOneFinalDice) {
      outputValue = `Player 1: ${playerOneFinalDice} <br><br> Player 2: ${playerTwoFinalDice} <br><br> Congratulation player 2, you win! <br><br> Please press "Submit" to play again!`;
    } else {
      outputValue = `Player 1: ${playerOneFinalDice} <br><br> Player 2: ${playerTwoFinalDice} <br><br> It's a draw! <br><br> Please press "Submit" to play again!`;
    }
    currentGameMode = "playerOneMode1";
  }
  return outputValue;
};
