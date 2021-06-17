// Project 2: Beat That!

// ---players----
var PLAYER1 = 1;
var PLAYER2 = 2;
var currentPlayer = PLAYER1;
var numDice = 0;
var Dice1 = "";
var Dice2 = "";
var player1Number = "";
var player2Number = "";
var currentArray = [];
var bestNumber = 0;
var player1DiceRolls = [];
var player2DiceRolls = [];
var currPlayerNum = 0;
var player1Score = 0;
var player2Score = 0;
var hasGameCompleted = false;
var winner = "";

// ---stages for normal mode---
var INPUT_NUM_PLAYERS_STAGE = "PLAYER NUMBER";
var INPUT_NUM_DICE_STAGE = "DICE NUMBER";
var ROLL_DICE_STAGE = "ROLL DICE";
var GET_NUMBER_STAGE = "GET NUMBER";
var CHOOSE_ORDER_STAGE = "CHOOSE ORDER";
var gameStage = INPUT_NUM_DICE_STAGE;

// ---possible modes---
var NORMAL_MODE = "NORMAL";
var LOWEST_NUMBER_MODE = "LOWEST NUMBER";
var gameMode = NORMAL_MODE;

// The game always starts with Player 1

var main = function (input) {
  if (gameMode == NORMAL_MODE) {
    return basicGame(input);
  } else if (gameMode == LOWEST_NUMBER_MODE) {
    return lowestCombinedGame(input);
  }
};

// Basic game logic
var basicGame = function (input) {
  var myOutputValue = "";
  hasGameCompleted = false;

  if (input == "lowest") {
    gameMode = LOWEST_NUMBER_MODE;
    return `The player with the lowest number now wins! Input number of dice you would like to play with.`;
  }

  // User has to input number of dice first
  if (gameStage == INPUT_NUM_DICE_STAGE) {
    // resets arrays so that they do not contain previous rolls
    currentArray = [];
    player1DiceRolls = [];
    player2DiceRolls = [];
    numDice = input;
    gameStage = ROLL_DICE_STAGE;
    // if (numDice == "2") {
    //   gameStage = CHOOSE_ORDER_STAGE;
    // }
    return `You have chosen to roll ${numDice} dice.`;
    // } else if (gameStage == CHOOSE_ORDER_STAGE) {
    //   gameStage = GET_NUMBER_STAGE;
    //   return generate2DiceRolls();
  } else if (gameStage == ROLL_DICE_STAGE) {
    gameStage = GET_NUMBER_STAGE;
    return generateDiceRolls(numDice);
  } else if (gameStage == GET_NUMBER_STAGE) {
    generatePlayerCombinedNumber(input);
    myOutputValue = generateResults(currentPlayer);
    // Switches to other player and restarts game
    gameStage = ROLL_DICE_STAGE;
    currentPlayer = generateNextPlayer(currentPlayer);
  }

  if (hasGameCompleted == true) {
    gameStage = INPUT_NUM_DICE_STAGE;
  }

  return myOutputValue;
};

//
var lowestCombinedGame = function (input) {
  hasGameCompleted = false;
  var myOutputValue = "";

  if (input == "normal") {
    gameMode = NORMAL_MODE;
    gameStage = INPUT_NUM_DICE_STAGE;
    return `The normal Beat That dice game has been selected! Input number of dice you would like to play with.`;
  }

  if (gameStage == INPUT_NUM_DICE_STAGE) {
    currentArray = [];
    player1DiceRolls = [];
    player2DiceRolls = [];
    numDice = input;
    gameStage = ROLL_DICE_STAGE;
    return `You have chosen to roll ${numDice} dice.`;
  } else if (gameStage == ROLL_DICE_STAGE) {
    gameStage = GET_NUMBER_STAGE;
    return generateDiceRolls(numDice);
  } else if (gameStage == GET_NUMBER_STAGE) {
    generatePlayerCombinedNumber(input);
    myOutputValue = generateResultsForLowestGame(currentPlayer);
    gameStage = ROLL_DICE_STAGE;
    currentPlayer = generateNextPlayer(currentPlayer);
  }

  if (hasGameCompleted == true) {
    gameStage = INPUT_NUM_DICE_STAGE;
  }

  return myOutputValue;
};

// Higher number wins
var generateWinner = function (player1Number, player2Number) {
  var myOutputValue = "";
  if (player1Number > player2Number) {
    myOutputValue = `Player ${PLAYER1} wins!`;
  } else myOutputValue = `Player ${PLAYER2} wins!`;
  hasGameCompleted = true;
  console.log("a");
  return myOutputValue;
};

// Lower number wins
var generateLowestNumberWinner = function (player2Number, player1Number) {
  var myOutputValue = "";
  if (player2Number < player1Number) {
    myOutputValue = `Player ${PLAYER2} wins!`;
  } else myOutputValue = `Player ${PLAYER1} wins!`;
  return myOutputValue;
};

// Lists the 2 players and their scores in decreasing order; assumes winner according to normal rules
var generateLeaderboard = function (player1Score, player2Score) {
  if (player1Score >= player2Score) {
    return `LEADERBOARD <br> Player 1: ${player1Score} <br> 
    Player 2: ${player2Score}`;
  } else {
    return `LEADERBOARD <br> Player 2: ${player2Score} <br> 
    Player 1: ${player1Score}`;
  }
};

// Output number for player dependent on choice
var generatePlayerCombinedNumber = function (input) {
  var chosenOrder = Number(input);
  // Concatenate dice rolls based on user choice
  console.log(chosenOrder);
  if (chosenOrder == 1) {
    bestNumber = Number(`${Dice1}${Dice2}`);
  } else {
    bestNumber = Number(`${Dice2}${Dice1}`);
  }
  console.log(bestNumber);
};

var generateDiceRolls = function (numDice) {
  if (currentPlayer == PLAYER1) {
    currentArray = player1DiceRolls;
  } else {
    currentArray = player2DiceRolls;
  }
  var counter = 0;
  while (counter < numDice) {
    var diceRoll = rollDice();
    currentArray.push(diceRoll);
    counter = counter + 1;
  }
  console.log(currentPlayer);
  return `Player ${currentPlayer}: You have rolled ${currentArray} <br><br>`;
};

// don't really know what is happening here googled a way to sort elements in an array
// the while loop sort the elements by descending order and then the join function concatenates to give the largest number?
var autoGenerateNumber = function (gameMode, currentArray) {
  var temp;
  var bestNumber;
  console.log(currentArray);
  if (gameMode == NORMAL_MODE) {
    var outerCounter = 0;
    while (outerCounter < currentArray.length) {
      var innerCounter = 0;
      while (innerCounter < currentArray.length) {
        if (currentArray[outerCounter] > currentArray[innerCounter]) {
          temp = currentArray[outerCounter];
          currentArray[outerCounter] = currentArray[innerCounter];
          currentArray[innerCounter] = temp;
        }
        innerCounter += 1;
      }
      outerCounter += 1;
    }
    bestNumber = currentArray.join("");
    console.log(bestNumber);
    return bestNumber;
  }

  if (gameMode == LOWEST_NUMBER_MODE) {
    var outerCounter = 0;
    while (outerCounter < currentArray.length) {
      var innerCounter = 0;
      while (innerCounter < currentArray.length) {
        if (currentArray[outerCounter] < currentArray[innerCounter]) {
          temp = currentArray[outerCounter];
          currentArray[outerCounter] = currentArray[innerCounter];
          currentArray[innerCounter] = temp;
        }
        innerCounter += 1;
      }
      outerCounter += 1;
    }
    bestNumber = currentArray.join("");
    console.log(bestNumber);
    return bestNumber;
  }
};

var generateNextPlayer = function (currentPlayer) {
  var nextPlayer = (currentPlayer % 2) + 1;
  return nextPlayer;
};

// Results for normal game
var generateResults = function (currentPlayer) {
  bestNumber = autoGenerateNumber(gameMode, currentArray);
  var chosenOutputMessage = `Player ${currentPlayer}, your auto-generated number is ${bestNumber}.`;

  if (currentPlayer == PLAYER1) {
    player1Number = bestNumber;
    player1Score += Number(bestNumber);
    // currentPlayer = generateNextPlayer();
    myOutputValue = `${chosenOutputMessage} <br><br> It is now Player 2's turn. Please click submit to see Player 2's dice rolls.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = bestNumber;
    player2Score += Number(bestNumber);
    winner = generateWinner(player1Number, player2Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage} <br> ${winner} <br> <br> ${leader} <br><br> Input number of dice to play again or "lowest" to play lowest combined number mode.`;
  }
  return myOutputValue;
};

// Results for lowest combined mode
// not sure how to simplify or combine it further cos it is quite repetitive as above function except for the way to determine the winner
var generateResultsForLowestGame = function (currentPlayer) {
  bestNumber = autoGenerateNumber(gameMode, currentArray);
  var chosenOutputMessage = `Player ${currentPlayer}, your auto-generated number is ${bestNumber}.`;

  if (currentPlayer == PLAYER1) {
    player1Number = bestNumber;
    player1Score += Number(bestNumber);
    myOutputValue = `${chosenOutputMessage} <br><br> It is now Player 2's turn. Please click submit to see Player 2's dice rolls.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = bestNumber;
    player2Score += Number(bestNumber);
    winner = generateLowestNumberWinner(player2Number, player1Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage} <br> ${winner} <br> <br> ${leader} <br> Input number of dice to play again. <br><br> Input "normal" to play lowest combined number mode`;
  }
  return myOutputValue;
};

// Simple dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// var generate2DiceRolls = function () {
//   Dice1 = rollDice();
//   Dice2 = rollDice();
//   currentArray.push(Dice1);
//   currentArray.push(Dice2);
//   return `Player ${currentPlayer}: You have rolled ${Dice1} and ${Dice2}. <br><br> Please choose the order of the dice: "1" for ${Dice1}${Dice2} and "2" for ${Dice2}${Dice1}.`;
// };

// ---Variable number of dice ---
// Input number of dice (possible stage)
// Both players roll same chosen number of dice
// Store dice rolls in array using loop
// Output dice roll values
// Auto-generate optimal combined number to determine winner
