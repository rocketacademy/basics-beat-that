// ____________________  Global Variables ________________________

// L1 Game Mode variables to choose which game user wants to play
var L1_PICK_GAME_MODE = "Choose your game";
var L1_NORMAL_MODE = "Normal Mode";
var L1_LOWEST_MODE = "Lowest Win";
var L1_AUTO_MODE = "Computer chooses order";
var L1_VARIABLE_DICE_MODE = "Variable Dice";
var L1_VARIABLE_PLAYERS_MODE = "Variable Players";

// modes to faciliate running of games
var ROLL_DICE = "Roll Dice Mode";
var ROLL_DICE_AUTO = "Roll and Auto Pick";
var CHOOSE_ORDER = "Choose Order Mode";
var DECIDE_WINNER = "Decide Winner";
var CHOOSE_NUM_OF_DICE = "Choose number of dice";

// setting initial set up
var arrayRolls = [];
var playerOneNum = 0;
var playerTwoNum = 0;
var arrayForNums = [];
var currentPlayer = 1;
var numOfPlayers = 2;
var numofDice = 2;
var currentGameMode = ROLL_DICE;
var L1GameMode = L1_PICK_GAME_MODE;
var playerOneScore = 0;
var playerTwoScore = 0;

// ____________________________SUPPORTING FUNCTIONS_______________________________

// 2 functions for player to select their order
var selectAB = function () {
  number = Number(arrayRolls[0] * 10 + arrayRolls[1]);
  return number;
};
var selectBA = function () {
  number = Number(arrayRolls[1] * 10 + arrayRolls[0]);
  return number;
};

// standard dice roll functions
var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
};

// function to get the "scores" which is the sum of all the rolls
var getScores = function (player) {
  var myOutputValue = 0;
  var counter = player - 1;
  while (counter < arrayForNums.length) {
    myOutputValue = myOutputValue + arrayForNums[counter];
    counter += numOfPlayers;
  }
  return myOutputValue;
};

// function to generate the Leaderboard limited to 2 players for now
var getLeaderboard = function () {
  var myOutputValue = [
    `Player2 : ${playerTwoScore} `,
    `Player1 : ${playerOneScore}`,
  ];
  if (playerOneScore >= playerTwoScore) {
    myOutputValue = [
      `Player1 : ${playerOneScore} `,
      `Player2 : ${playerTwoScore}`,
    ];
  }
  return myOutputValue;
};

var refresh = function () {
  var myOutputValue = `Hello! Please choose the game mode you'll like to play. <br><br>Type in "Normal", "Lowest Win", "Auto", "Variable Dice", "Variable Player", "Knockout"`;
  arrayRolls = [];
  playerOneNum = 0;
  playerTwoNum = 0;
  arrayForNums = [];
  currentPlayer = 1;
  L1GameMode = L1_PICK_GAME_MODE;
  return myOutputValue;
};

// _______________________ MAIN GAME _________________________________

var main = function (input) {
  var myOutputValue = "";
  console.log("L1GameMode", L1GameMode);
  if (input == "refresh") {
    myOutputValue = refresh();
  } else if (L1GameMode == L1_PICK_GAME_MODE) {
    myOutputValue = startGame(input);
  } else if (L1GameMode == L1_NORMAL_MODE) {
    myOutputValue = normal(input);
  } else if (L1GameMode == L1_LOWEST_MODE) {
    myOutputValue = lowestWin(input);
  } else if (L1GameMode == L1_AUTO_MODE) {
    myOutputValue = auto(input);
  } else if (L1GameMode == L1_VARIABLE_DICE_MODE) {
    myOutputValue = variableDice(input);
  } else if (L1GameMode == L1_VARIABLE_PLAYERS_MODEE) {
    myOutputValue = variablePlayers(input);
  }
  // console log to track which game mode we are current in
  console.log("L1GameMode after", L1GameMode);
  console.log("arrayForNums", arrayForNums);
  return myOutputValue;
};

//____________________________ Mode to select which game to play________________

var startGame = function (input) {
  var myOutputValue = `Please type in "Normal", "Lowest Win", "Auto", "Variable Dice", "Variable Player", "Knockout" `;
  if (input == "Normal") {
    L1GameMode = L1_NORMAL_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, each player may choose the order to form their number.<br><br>Player with the highest number wins.<br><br>Click Submit to start rolling!`;
    currentGameMode = ROLL_DICE;
  }
  if (input == "Lowest Win") {
    L1GameMode = L1_LOWEST_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, each player may choose the order to form their number.<br><br>Player with the lowest number wins.<br><br>Click Submit to start rolling!`;
    currentGameMode = ROLL_DICE;
  }
  if (input == "Auto") {
    L1GameMode = L1_AUTO_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, Computer will choose the best order for player.<br><br>Player with the highest number wins.<br><br>Click Submit to start rolling!`;
    currentGameMode = ROLL_DICE_AUTO;
  }
  if (input == "Variable Dice") {
    L1GameMode = L1_VARIABLE_DICE_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br> Start by choosing the number of 🎲.`;
    currentGameMode = CHOOSE_NUM_OF_DICE;
  }
  if (input == "Variable Players") {
    L1GameMode = L1_VARIABLE_PLAYERS_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br> Start by choosing the number of players ⛹🏻‍♀️⛹🏻‍♂️.`;
    currentGameMode = CHOOSE_NUM_OF_DICE;
  }
  return myOutputValue;
};

//_______________________________ Normal Beat That Mode _____________________

var normal = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == ROLL_DICE) {
    myOutputValue = roll(input);
  } else if (currentGameMode == CHOOSE_ORDER) {
    myOutputValue = pickOrder(input);
  } else if (currentGameMode == DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};

var roll = function () {
  var myOutputValue = "";
  var counter = 0;
  while (counter < numofDice) {
    arrayRolls.push(diceRoll());
    counter += 1;
  }
  myOutputValue = `Player ${currentPlayer}, your two dice rolls are: A: ${arrayRolls[0]} and B: ${arrayRolls[1]}. <br><br> Please pick the order of the number AB or BA `;
  console.log("arrayRolls", arrayRolls);
  currentGameMode = CHOOSE_ORDER;
  return myOutputValue;
};

var pickOrder = function (input) {
  var myOutputValue = "";
  console.log("arrayRolls", arrayRolls);
  if ((input == "AB") & (currentPlayer == 1)) {
    playerOneNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}.<br><br>It is now Player 2's turn.<br><br> Press submit to roll`;
    currentGameMode = ROLL_DICE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "AB") & (currentPlayer == 2)) {
    playerTwoNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    currentGameMode = DECIDE_WINNER;
  } else if ((input == "BA") & (currentPlayer == 1)) {
    playerOneNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}<br><br>It is now Player 2's turn.<br><br>Press submit to roll`;
    currentGameMode = ROLL_DICE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "BA") & (currentPlayer == 2)) {
    playerTwoNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    currentGameMode = DECIDE_WINNER;
  }
  console.log("playerOneNum", playerOneNum);
  console.log("playerTwoNum", playerTwoNum);
  console.log("currentGameMode", currentGameMode);
  console.log("arrayForNums", arrayForNums);
  arrayRolls = [];
  return myOutputValue;
};

var decideWinner = function () {
  var myOutputValue = "None";
  playerOneScore = getScores(1);
  playerTwoScore = getScores(2);
  var leaderBoard = getLeaderboard();
  if (playerOneNum > playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 1 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum < playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 2 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum == playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>It is a draw, let's play again<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  currentGameMode = ROLL_DICE;
  currentPlayer = 1;
  return myOutputValue;
};

//_____________________________ Lowest score wins Mode __________________________

var lowestWin = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == ROLL_DICE) {
    myOutputValue = roll(input);
  } else if (currentGameMode == CHOOSE_ORDER) {
    myOutputValue = pickOrder(input);
  } else if (currentGameMode == DECIDE_WINNER) {
    myOutputValue = decideWinnerLowest(input);
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};

var decideWinnerLowest = function () {
  var myOutputValue = "None";
  playerOneScore = getScores(1);
  playerTwoScore = getScores(2);
  var leaderBoard = getLeaderboard();
  if (playerOneNum < playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 1 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum > playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>Player 2 Wins!<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  if (playerOneNum == playerTwoNum) {
    myOutputValue = `Player 1's number is ${playerOneNum}.<br><br>Player 2's number is ${playerTwoNum}.<br><br>It is a draw, let's play again<br><br>Player 1's score is ${playerOneScore}<br><br>Player 2' score is ${playerTwoScore}<br><br>The current leaderboard is ${leaderBoard}`;
  }
  currentGameMode = ROLL_DICE;
  currentPlayer = 1;
  return myOutputValue;
};

//_________________________  Auto generate combined number Mode __________________

var auto = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == ROLL_DICE_AUTO) {
    myOutputValue = rollAndDecide(input);
  } else if (currentGameMode == DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
    currentGameMode = ROLL_DICE_AUTO;
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};

var rollAndDecide = function () {
  var myOutputValue;
  var counter = 0;
  while (counter < numofDice) {
    arrayRolls.push(diceRoll());
    counter += 1;
  }
  if ((currentPlayer == 1) & (arrayRolls[0] >= arrayRolls[1])) {
    playerOneNum = selectAB();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerOneNum} for you.`;
    currentGameMode = ROLL_DICE_AUTO;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((currentPlayer == 1) & (arrayRolls[0] < arrayRolls[1])) {
    playerOneNum = selectBA();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerOneNum} for you.`;
    currentGameMode = ROLL_DICE_AUTO;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((currentPlayer == 2) & (arrayRolls[0] >= arrayRolls[1])) {
    playerTwoNum = selectAB();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerTwoNum} for you.`;
    currentGameMode = DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  } else if ((currentPlayer == 2) & (arrayRolls[0] < arrayRolls[1])) {
    playerTwoNum = selectBA();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerTwoNum} for you.`;
    currentGameMode = DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  arrayRolls = [];
  return myOutputValue;
};

//_____________________________ Variable number of Dice Mode_________________

var variableDice = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == CHOOSE_NUM_OF_DICE) {
    myOutputValue = diceNum(input);
  } else if (currentGameMode == ROLL_DICE) {
    myOutputValue = rollMultipleDice(input);
  } else if (currentGameMode == DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};
var diceNum = function (input) {
  numofDice = input;
  var myOutputValue = `You have choosen to play with ${input} dice 🎲. Hit Submit to start rolling!`;
  console.log("numofDice", numofDice);
  currentGameMode = ROLL_DICE;
  return myOutputValue;
};

var rollMultipleDice = function () {
  var myOutputValue = "";
  var counterA = 0;
  var line1 = "";
  var line2 = "";
  while (counterA < numofDice) {
    arrayRolls.push(diceRoll());
    counterA += 1;
  }
  line1 = `Player ${currentPlayer}, your dice rolls are: ${arrayRolls}.<br><br>`;
  arrayRolls = arrayRolls.sort((a, b) => b - a);
  var bestNumber = "";
  var counterB = 0;
  while (counterB < arrayRolls.length) {
    bestNumber = bestNumber + `${arrayRolls[counterB]}`;
    counterB += 1;
  }
  if (currentPlayer == 1) {
    playerOneNum = Number(bestNumber);
    line2 = `Computer picked ${playerOneNum} for you.`;
    currentGameMode = ROLL_DICE;
    currentPlayer = 2;
    arrayForNums.push(playerOneNum);
  } else if (currentPlayer == 2) {
    playerTwoNum = Number(bestNumber);
    line2 = `Computer picked ${playerTwoNum} for you.`;
    currentGameMode = DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  myOutputValue = line1 + line2;
  arrayRolls = [];
  return myOutputValue;
};

// _________________ Variable number of players ____________________

var variablePlayers = function (input) {
  var myOutputValue = "";
  console.log("Game Mode Before", currentGameMode);
  if (currentGameMode == CHOOSE_NUM_OF_DICE) {
    myOutputValue = diceNum(input);
  } else if (currentGameMode == ROLL_DICE) {
    myOutputValue = rollMultipleDice(input);
  } else if (currentGameMode == DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  // console log to track which game mode we are current in
  console.log("Game Mode After", currentGameMode);
  return myOutputValue;
};
var chooseNumOfPlayers = function (input) {
  numOfPlayers = input;
  var myOutputValue = `You have choosen to play with ${input} dice 🎲. Hit Submit to start rolling!`;
  console.log("numofDice", numofDice);
  currentGameMode = ROLL_DICE;
  return myOutputValue;
};

var rollMultipleDice = function () {
  var myOutputValue = "";
  var counterA = 0;
  var line1 = "";
  var line2 = "";
  while (counterA < numofDice) {
    arrayRolls.push(diceRoll());
    counterA += 1;
  }
  line1 = `Player ${currentPlayer}, your dice rolls are: ${arrayRolls}.<br><br>`;
  arrayRolls = arrayRolls.sort((a, b) => b - a);
  var bestNumber = "";
  var counterB = 0;
  while (counterB < arrayRolls.length) {
    bestNumber = bestNumber + `${arrayRolls[counterB]}`;
    counterB += 1;
  }
  if (currentPlayer == 1) {
    playerOneNum = Number(bestNumber);
    line2 = `Computer picked ${playerOneNum} for you.`;
    currentGameMode = ROLL_DICE;
    currentPlayer = 2;
    arrayForNums.push(playerOneNum);
  } else if (currentPlayer == 2) {
    playerTwoNum = Number(bestNumber);
    line2 = `Computer picked ${playerTwoNum} for you.`;
    currentGameMode = DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  myOutputValue = line1 + line2;
  arrayRolls = [];
  return myOutputValue;
};
