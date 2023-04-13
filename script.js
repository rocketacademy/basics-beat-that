// var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
// var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
// var GAME_STATE_CHOOSE_COMPARE_SCORES = "GAME_STATE_CHOOSE_COMPARE_SCORES";
// var gameState = GAME_STATE_DICE_ROLL;

// var currentPlayer = 1;
// var currentPlayerRolls = [];
// var allPlayersScore = [];

// var rollDice = function () {
//   var randomDecimal = Math.random() * 6;
//   var randomInteger = Math.floor(randomDecimal) + 1;
//   return randomInteger;
// };

// var rollDiceForPlayer = function () {
//   for (counter = 0; counter < 2; counter++) {
//     currentPlayerRolls.push(rollDice());
//   }
//   return `Welcome, Player ${currentPlayer} <br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]}  | Dice 2: ${currentPlayerRolls[1]}`;
// };

// var getPlayerScore = function (playerInput) {
//   var playerScore;
//   if (playerInput != 1 && playerInput != 2) {
//     return `Error! Please input 1 or 2 to choose which dice to use as the first digit.<br><br> Your dice are:<br>Dice 1: ${currentPlayerRolls[0]} | Dice 2: ${currentPlayerRolls[1]}.`;
//   }
//   if (playerInput == 1) {
//     playerScore = Number(
//       String(currentPlayerRolls[0] + String(currentPlayerRolls[1]))
//     );
//     return `Your chosen value is: ${playerScore}`;
//   }
//   if (playerInput == 2) {
//     playerScore = Number(
//       String(currentPlayerRolls[1] + String(currentPlayerRolls[0]))
//     );
//     return `Your chosen value is: ${playerScore}`;
//   }
//   allPlayersScore.push(playerScore);
//   currentPlayerRolls = [];
//   return `Player + ${currentPlayer}, your choosen value is ${playerScore}`;
// };

// var comparePlayersScores = function () {
//   compareMessage = `Player 1 score: ${allPlayersScore[0]}<br>Player 2 score: ${allPlayersScore[1]}`;
//   if (allPlayersScore[0] > allPlayersScore[1]) {
//     compareMessage = compareMessage + `<br><br> Player 1 wins!`;
//   }
//   if (allPlayersScore[1] > allPlayersScore[0]) {
//     compareMessage = compareMessage + `<br><br> Player 2 wins!`;
//   }
//   if (allPlayersScore[0] == allPlayersScore[1]) {
//     compareMessage = compareMessage + `<br><br> It's a tie!`;
//   }
//   return compareMessage;
// };

// var main = function (input) {
//   var myOutputValue = " ";
//   if (gameState == GAME_STATE_DICE_ROLL) {
//     gameState = GAME_STATE_CHOOSE_DICE_ORDER;
//     myOutputValue = rollDiceForPlayer();
//     return myOutputValue;
//   }
//   if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
//     myOutputValue = getPlayerScore();
//     if (currentPlayer == 1) {
//       currentPlayer = 2;
//       gameState = GAME_STATE_DICE_ROLL;
//       return myOutputValue + `<br><br>It is now Player 2's turn!`;
//     }
//     if (currentPlayer == 2) {
//       gameState = GAME_STATE_CHOOSE_COMPARE_SCORES;
//       return myOutputValue + `<br>Please click submit to calculate the scores`;
//     }
//   }
//   if (gameState == GAME_STATE_CHOOSE_COMPARE_SCORES) {
//     myOutputValue = comparePlayersScores();
//     return myOutputValue;
//   }
// };

/* 
Single player logic

var gameMode = "ROLL DICE"; // Other modes available: CHOOSE DICE, COMPARE SCORES

var playerRoll = [];
var finalScore = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  playerRoll.push(randomInteger);
  return randomInteger;
};

var chooseDice = function (diceSlot) {
  if (diceSlot == 1) {
    finalScore = Number(String(playerRoll[0]) + String(playerRoll[1]));
  }
  if (diceSlot == 2) {
    finalScore = Number(String(playerRoll[1]) + String(playerRoll[0]));
  }
  return `Your final number formed is ${finalScore}`;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "ROLL DICE") {
    gameMode = "CHOOSE DICE";
    for (i = 0; i < 2; i++) {
      rollDice();
    }
    myOutputValue = `You rolled the numbers ${playerRoll[0]} and ${playerRoll[1]}. Select 1 or 2 to place the number you want infront respectively`;
    return myOutputValue;
  }
  if (gameMode == "CHOOSE DICE") {
    myOutputValue = chooseDice(input);
    return myOutputValue;
  }
};
*/

/* 
Double  player logic
// */

// var gameMode = "ROLL DICE"; // Other modes available: CHOOSE DICE, COMPARE SCORES

// var playerNumber = 1;
// var playerRoll = [];
// var finalScore = [];

// var rollDice = function () {
//   var randomDecimal = Math.random() * 6;
//   var randomInteger = Math.floor(randomDecimal) + 1;
//   playerRoll.push(randomInteger);
//   return randomInteger;
// };

// var chooseDice = function (diceSlot) {
//   if ((playerNumber = 1)) {
//     if (diceSlot == 1) {
//       finalScore = Number(String(playerRoll[0]) + String(playerRoll[1]));
//     }
//     if (diceSlot == 2) {
//       finalScore = Number(String(playerRoll[1]) + String(playerRoll[0]));
//     }
//     return `Your final number formed is ${finalScore}`;
//   }
//   if ((playerNumber = 2)) {
//     if (diceSlot == 1) {
//       finalScore = Number(String(playerRoll[2]) + String(playerRoll[3]));
//     }
//     if (diceSlot == 2) {
//       finalScore = Number(String(playerRoll[3]) + String(playerRoll[2]));
//     }
//     return `Your final number formed is ${finalScore}`;
//   }
// };

// var main = function (input) {
//   var myOutputValue = "";
//   if (gameMode == "ROLL DICE") {
//     gameMode = "CHOOSE DICE";
//     for (i = 0; i < 4; i++) {
//       rollDice();
//     }
//     myOutputValue = `You rolled the numbers ${playerRoll[0]} and ${playerRoll[1]}. Select 1 or 2 to place the number you want infront respectively`;
//     return myOutputValue;
//   }
//   if (gameMode == "CHOOSE DICE") {
//     myOutputValue = chooseDice(input);
//     return myOutputValue;
//   }
// };

var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_CHOOSE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayersScore = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome, Player ${currentPlayer}. <br><br>You rolled:<br>Dice 1: ${currentPlayerRolls[0]}| Dice 2: ${currentPlayerRolls[1]}.<br><br>Now, please input '1' or '2'`;
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    console.log("Invalid enter for changing order");
    return `Error! Please enter only '1' or '2' to choose your order.<br>Your dice rolls are<br>Dice 1: ${currentPlayerRolls[0]}| Dice 2: ${currentPlayerRolls[1]}.`;
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    allPlayersScore.push(playerScore); // This line was missing
    currentPlayerRolls = [];
    return `Player ${currentPlayer}, your chosen value is : ${playerScore}`;
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayersScore.push(playerScore);
    currentPlayerRolls = [];
    return `Player ${currentPlayer}, your chosen value is : ${playerScore}`;
  }
};

var comparePlayersScores = function () {
  var compareMessage = `Player 1 score: ${allPlayersScore[0]}<br>Player 2 score: ${allPlayersScore[1]}`;
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + `<br><br>Player 1 wins!`;
  }
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + `<br><br>Player 2 wins!`;
  }
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + `<br><br>It's a draw!`;
  }
  return compareMessage;
};
var main = function (input) {
  console.log(`Current Player = ${currentPlayer}`);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("game state changed to dice roll");
    outputMessage = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Game state change to choosing dice order");
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log(`End of P1 turn, P2 turn now`);
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + `<br><br>It is now player 2's turn`;
    }
    if (currentPlayer == 2) {
      console.log(`End of P2 turn. Submit will now calculate scores`);
      gameState = GAME_STATE_CHOOSE_COMPARE_SCORES;
      return outputMessage + `<br><br>Press submit to calculate scores!`;
    }
  }
  if (gameState == GAME_STATE_CHOOSE_COMPARE_SCORES) {
    console.log(`Game mode is comparing scores now `);
    outputMessage = comparePlayersScores();
    return outputMessage;
  }
};
