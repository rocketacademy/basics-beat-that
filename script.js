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
var typeOneCombinedForPlayer1 = "";
var typeTwoCombinedForPlayer1 = "";
var typeOneCombinedForPlayer2 = "";
var typeTwoCombinedForPlayer2 = "";
var playerOneChoice = [];
var playerTwoChoice = [];
var currentGameMode = "waiting for player 1";
var myOutputValue = "";

//-----------------------------------
//       Helper Functions
//-----------------------------------

// Dice Roll functions
var getDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var actualNum = randomInteger + 1;
  return actualNum;
};

// Concatenate the two dice roll numbers
var combineTwoDiceRolls = function (diceRoll1, diceRoll2) {
  var combinedDiceRolls = Number(String(diceRoll1) + String(diceRoll2));
  return combinedDiceRolls;
};

// Compare functions
var compareCombinedNumber = function (firstNum, secondNum) {
  if (firstNum > secondNum) {
    outcome = `Player 1 wins! His number of ${firstNum} is bigger!`;
  } else {
    outcome = `Player 2 wins! His number of ${secondNum} is bigger!`;
  }
  return outcome;
};

var playerOneMode = function (input) {
  if (input === "1") {
    currentGameMode = "player two mode";
    typeOneCombinedForPlayer1 = combineTwoDiceRolls(
      player1diceRoll1,
      player1diceRoll2
    );
    console.log(typeOneCombinedForPlayer1);
    playerOneChoice.push(typeOneCombinedForPlayer1);

    // only use the return method when encountering problems!!
    return (myOutputValue = `🎲 PLAYER 1 🎲 <br><br> You chose Dice 1 first. Your number is ${typeOneCombinedForPlayer1}. <br><br> It is now Player 2's turn.`);
  } else if (input === "2") {
    currentGameMode = "player two mode";
    typeTwoCombinedForPlayer1 = combineTwoDiceRolls(
      player1diceRoll2,
      player1diceRoll1
    );
    console.log(typeTwoCombinedForPlayer1);
    playerOneChoice.push(typeTwoCombinedForPlayer1);

    return (myOutputValue = `🎲 PLAYER 1 🎲 <br><br> You chose Dice 2 first. Your number is ${typeTwoCombinedForPlayer1}. <br><br> It is now Player 2's turn.`);
  }
};

var playTwoMode = function (input) {
  if (input === "1") {
    typeOneCombinedForPlayer2 = combineTwoDiceRolls(
      player2diceRoll1,
      player2diceRoll2
    );
    console.log(typeOneCombinedForPlayer2);

    //Switch the game mode to compare mode
    currentGameMode = "compare mode";
    playerTwoChoice.push(typeOneCombinedForPlayer2);

    return (myOutputValue = `🎲 PLAYER 2 🎲 <br><br> You chose Dice 1 first. Your number is ${typeOneCombinedForPlayer2}. <br><br> Let's compare  who has the bigger number!`);
  } else if (input === "2") {
    typeTwoCombinedForPlayer2 = combineTwoDiceRolls(
      player2diceRoll2,
      player2diceRoll1
    );
    console.log(typeTwoCombinedForPlayer2);
    //Switch the game mode to compare mode
    currentGameMode = "compare mode";
    playerTwoChoice.push(typeTwoCombinedForPlayer2);

    return (myOutputValue = `🎲 PLAYER 2 🎲 <br><br> You chose Dice 2 first. Your number is ${typeTwoCombinedForPlayer2}. <br><br> Let's compare  who has the bigger number!`);
  }
};

//-----------------------------------
//       Main Functions
//-----------------------------------

var main = function (input) {
  if (currentGameMode === "waiting for player 1") {
    // player 1 roll dice
    player1diceRoll1 = getDiceRoll();
    console.log(`Roll 1:${player1diceRoll1}`);
    player1diceRoll2 = getDiceRoll();
    console.log(`Roll 2:${player1diceRoll2}`);

    // switch gamemode to player one RollDice mode after 'submit'
    currentGameMode = "player one mode";
    myOutputValue = `🎲 WELCOME PLAYER 1 🎲 <br><br> You rolled ${player1diceRoll1} for dice one, ${player1diceRoll2} for dice two. <br><br> Choose the order of the dice by entering "1" or "2"`;
  } else if (currentGameMode === "player one mode") {
    return playerOneMode(input);
  }

  // switch gamemode to player two
  if (currentGameMode === "player two mode") {
    //  player 2 roll dice
    player2diceRoll1 = getDiceRoll();
    console.log(`Roll 1:${player2diceRoll1}`);
    player2diceRoll2 = getDiceRoll();
    console.log(`Roll 2:${player2diceRoll2}`);

    currentGameMode = "player 2 choose mode";
    myOutputValue = `🎲 WELCOME PLAYER 2 🎲 <br><br> You rolled ${player2diceRoll1} for dice one, ${player2diceRoll2} for dice two. <br><br> Choose the order of the dice by entering "1" or "2"`;
  } else if (currentGameMode === "player 2 choose mode") {
    return playTwoMode(input);
  }
  // Compare the numbers now!
  if (currentGameMode === "compare mode") {
    return compareCombinedNumber(playerOneChoice, playerTwoChoice);
  }
  return myOutputValue;
};
