// -- Beat That! -- //

// 1. Two players take turn
// -> change of 'mode' for different players

// 2. After clicking submit, the game rolls 2 dice and display the dice rolls
// -> global variables needed to store the dice values for each player

// 3. The player can choose the order they want to display the dice (e.g. specific 2nd dice go first)
// -> conditional statements (i.e. if choose 1...)

// 4. Players with the higher number between 2 players win the game
// -> needs a comparison function, to compare the absolute value (number)

//-----------------------------------
//       Global Variables
//-----------------------------------

var player1diceRoll1 = "";
var player1diceRoll2 = "";
var player2diceRoll1 = "";
var player2diceRoll2 = "";
var playerOneChoice = [];
var playerTwoChoice = [];
var typeOneCombinedForPlayer1 = "";
var typeTwoCombinedForPlayer1 = "";
var typeOneCombinedForPlayer2 = "";
var typeTwoCombinedForPlayer2 = "";
var numOfPlayer1Wins = 0;
var numOfPlayer2Wins = 0;
var currentGameMode = "waiting for player 1";
var myOutputValue = "";

//-----------------------------------
//       Helper Functions
//-----------------------------------

// Dice Roll functions
var getDiceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
};

// Concatenate the two dice roll numbers
var combineTwoDiceRolls = function (diceRoll1, diceRoll2) {
  var combinedDiceRolls = Number(String(diceRoll1) + String(diceRoll2));
  return combinedDiceRolls;
};

// Compare functions
var compareCombinedNumber = function (firstNum, secondNum) {
  // var outcome = `No. of P1 wins:${numOfPlayer1Wins}; No.of P2 wins: ${numOfPlayer2Wins}.<br><br>`;
  if (firstNum > secondNum) {
    numOfPlayer1Wins += 1;
    outcome = `No. of P1 wins: ${numOfPlayer1Wins} <br> No. of P2 wins: ${numOfPlayer2Wins}<br><br> Player 1 wins! His number of ${firstNum} is bigger!`;
  } else if (firstNum < secondNum) {
    numOfPlayer2Wins += 1;
    outcome = `No. of P1 wins: ${numOfPlayer1Wins} <br> No. of P2 wins: ${numOfPlayer2Wins}<br><br> Player 2 wins! His number of ${secondNum} is bigger!`;
  }
  return outcome;
};

// Waiting for Player one mode
var playerOneMode = function () {
  // player 1 roll dice
  player1diceRoll1 = getDiceRoll();
  console.log(`Roll 1:${player1diceRoll1}`);
  player1diceRoll2 = getDiceRoll();
  console.log(`Roll 2:${player1diceRoll2}`);
  return (myOutputValue = `🎲 WELCOME PLAYER 1 🎲 <br><br> You rolled ${player1diceRoll1} for dice one, ${player1diceRoll2} for dice two. <br><br> Choose the order of the dice by entering "1" or "2"`);
};

// Player one mode
var playerOneChooseMode = function (input) {
  if (input === "1") {
    currentGameMode = "player 2 mode";
    typeOneCombinedForPlayer1 = combineTwoDiceRolls(
      player1diceRoll1,
      player1diceRoll2
    );
    console.log(typeOneCombinedForPlayer1);
    playerOneChoice.push(typeOneCombinedForPlayer1);

    return (myOutputValue = `🎲 PLAYER 1 🎲 <br><br> You chose Dice 1 first. Your number is ${typeOneCombinedForPlayer1}. <br><br> It is now Player 2's turn.`);
  } else if (input === "2") {
    typeTwoCombinedForPlayer1 = combineTwoDiceRolls(
      player1diceRoll2,
      player1diceRoll1
    );
    console.log(typeTwoCombinedForPlayer1);
    playerOneChoice.push(typeTwoCombinedForPlayer1);

    return (myOutputValue = `🎲 PLAYER 1 🎲 <br><br> You chose Dice 2 first. Your number is ${typeTwoCombinedForPlayer1}. <br><br> It is now Player 2's turn.`);
  }
};

// Player two mode
var playerTwoMode = function (input) {
  //  player 2 roll dice
  player2diceRoll1 = getDiceRoll();
  console.log(`Roll 1:${player2diceRoll1}`);
  player2diceRoll2 = getDiceRoll();
  console.log(`Roll 2:${player2diceRoll2}`);

  return (myOutputValue = `🎲 WELCOME PLAYER 2 🎲 <br><br> You rolled ${player2diceRoll1} for dice one, ${player2diceRoll2} for dice two. <br><br> Choose the order of the dice by entering "1" or "2"`);
};

// Player two choose mode
var playerTwoChooseMode = function (input) {
  if (input === "1") {
    typeOneCombinedForPlayer2 = combineTwoDiceRolls(
      player2diceRoll1,
      player2diceRoll2
    );
    console.log(typeOneCombinedForPlayer2);

    playerTwoChoice.push(typeOneCombinedForPlayer2);

    return (myOutputValue = `🎲 PLAYER 2 🎲 <br><br> You chose Dice 1 first. Your number is ${typeOneCombinedForPlayer2}. <br><br> Let's compare  who has the bigger number!`);
  } else if (input === "2") {
    typeTwoCombinedForPlayer2 = combineTwoDiceRolls(
      player2diceRoll2,
      player2diceRoll1
    );
    console.log(typeTwoCombinedForPlayer2);
    playerTwoChoice.push(typeTwoCombinedForPlayer2);

    return (myOutputValue = `🎲 PLAYER 2 🎲 <br><br> You chose Dice 2 first. Your number is ${typeTwoCombinedForPlayer2}. <br><br> Let's compare  who has the bigger number!`);
  }
};

//-----------------------------------
//       Main Functions
//-----------------------------------

var main = function (input) {
  // Start with player one mode
  if (currentGameMode === "waiting for player 1") {
    currentGameMode = "player 1 choose mode";
    myOutputValue = playerOneMode(input);
  } else if (currentGameMode === "player 1 choose mode") {
    currentGameMode = "player 2 mode";
    return playerOneChooseMode(input);
  }
  // Switch to player two mode
  if (currentGameMode === "player 2 mode") {
    currentGameMode = "player 2 choose mode";
    myOutputValue = playerTwoMode(input);
  } else if (currentGameMode === "player 2 choose mode") {
    currentGameMode = "compare mode";
    return playerTwoChooseMode(input);
  }
  // Compare the numbers now!
  if (currentGameMode === "compare mode") {
    currentGameMode = "waiting for player 1";
    myOutputValue = compareCombinedNumber(playerOneChoice, playerTwoChoice);
  }
  return myOutputValue;
};
