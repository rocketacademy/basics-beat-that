// ____________________  Global Variables ________________________

// L1 Game Mode variables to choose which game user wants to play
var L1_PICK_GAME_MODE = "Choose your game";
var L1_NORMAL_MODE = "Normal Mode";
var L1_LOWEST_MODE = "Lowest Win";
var L1_AUTO_MODE = "Auto";
var L1_VARIABLE_DICE_MODE = "Variable Dice";
var L1_VARIABLE_PLAYERS_MODE = "Variable Players";

// modes to faciliate running of games
var L2_ROLL_DICE = "Roll Dice Mode";
var L2_ROLL_DICE_AUTO = "Roll and Auto Pick";
var L2_CHOOSE_ORDER = "Choose Order Mode";
var L2_DECIDE_WINNER = "Decide Winner";
var L2_CHOOSE_NUM_DICE = "Choose number of dice";

// setting initial set up
var arrayRolls = [];
var playerOneNum = 0;
var playerTwoNum = 0;
var arrayForNums = [];
var currentPlayer = 1;
var numOfPlayers = 2;
var numofDice = 2;
var L2GameMode = L2_ROLL_DICE;
var L1GameMode = L1_PICK_GAME_MODE;
var playerOneScore = 0;
var playerTwoScore = 0;

// ____________________________SUPPORTING FUNCTIONS_______________________________

// 2 functions for player to select their order
var selectAB = function () {
  number = Number(`${arrayRolls[0]}` + `${arrayRolls[1]}`);
  return number;
};
var selectBA = function () {
  number = Number(`${arrayRolls[0]}` + `${arrayRolls[1]}`);
  return number;
};

// standard dice roll functions
var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
};

// function to get the "scores" which is the sum of all the rolls
// prepared code to be able to calculate for multiple players because the oder in which values are pushed into array is the same as order of player picking their numbers.

var getScores = function (player) {
  var myOutputValue = 0;
  // input will help determine whose scores to calculate
  var counter = player - 1;
  while (counter < arrayForNums.length) {
    myOutputValue = myOutputValue + arrayForNums[counter];
    // this counter will help to only pull the numbers of the specific player from the array
    counter += numOfPlayers;
  }
  return myOutputValue;
};

// function to generate the Leaderboard limited to 2 players for now
var getLeaderboard = function () {
  var myOutputValue = [
    `Player2 : ${playerTwoScore}`,
    ` Player1 : ${playerOneScore}`,
  ];
  if (playerOneScore >= playerTwoScore) {
    myOutputValue = [
      `Player1 : ${playerOneScore}`,
      ` Player2 : ${playerTwoScore}`,
    ];
  }
  return myOutputValue;
};

// function to refresh in order to go back to the main Choose Game mode
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

// this is the main function, where the L1 mode will determine which game to run

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
  } else if (L1GameMode == L1_VARIABLE_PLAYERS_MODE) {
    myOutputValue = variablePlayers(input);
  }
  // console log to track which L1 mode we are current in
  console.log("L1GameMode after", L1GameMode);
  console.log("arrayForNums", arrayForNums);
  return myOutputValue;
};

//____________________________ Mode to select which game to play________________

// Start game function where after user choose their game mode (Normal, Lowest Win, Variable Dice), we will set the L1 mode. L2 mode will prime the code to know which step to take.

var startGame = function (input) {
  var myOutputValue = `Please type in "Normal", "Lowest Win", "Auto", "Variable Dice", "Variable Player", "Knockout" `;
  if (input == "Normal") {
    L1GameMode = L1_NORMAL_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, each player may choose the order to form their number.<br><br>Player with the highest number wins.<br><br>Click Submit to start rolling!`;
    L2GameMode = L2_ROLL_DICE;
  }
  if (input == "Lowest Win") {
    L1GameMode = L1_LOWEST_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, each player may choose the order to form their number.<br><br>Player with the lowest number wins.<br><br>Click Submit to start rolling!`;
    L2GameMode = L2_ROLL_DICE;
  }
  if (input == "Auto") {
    L1GameMode = L1_AUTO_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br>2 Players will take turns to roll the dice 🎲.<br><br>After the roll, Computer will choose the best order for player.<br><br>Player with the highest number wins.<br><br>Click Submit to start rolling!`;
    L2GameMode = L2_ROLL_DICE_AUTO;
  }
  if (input == "Variable Dice") {
    L1GameMode = L1_VARIABLE_DICE_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br> Start by choosing the number of 🎲.`;
    L2GameMode = L2_CHOOSE_NUM_DICE;
  }
  if (input == "Variable Players") {
    L1GameMode = L1_VARIABLE_PLAYERS_MODE;
    myOutputValue = `You have selected ${input} as your game of choice! <br><br> Start by choosing the number of players ⛹🏻‍♀️⛹🏻‍♂️.`;
    L2GameMode = L2_CHOOSE_NUM_DICE;
  }
  return myOutputValue;
};

//_______________________________ Normal Beat That Mode _____________________

// this is the basic Beat That Game

// main function to determine which step to take

var normal = function (input) {
  var myOutputValue = "";
  if (L2GameMode == L2_ROLL_DICE) {
    myOutputValue = roll(input);
  } else if (L2GameMode == L2_CHOOSE_ORDER) {
    myOutputValue = pickOrder(input);
  } else if (L2GameMode == L2_DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  return myOutputValue;
};

// this is to roll the number of dice to and give the output to user to pick. while loop was done to prepare for multiple dice game.

var roll = function () {
  var myOutputValue = "";
  var counter = 0;
  while (counter < numofDice) {
    arrayRolls.push(diceRoll());
    counter += 1;
  }
  myOutputValue = `Player ${currentPlayer}, your two dice rolls are A: ${arrayRolls[0]} and B: ${arrayRolls[1]}. <br><br> Please pick the order of the number AB or BA `;
  L2GameMode = L2_CHOOSE_ORDER;
  return myOutputValue;
};

// function in order to take the input, and display the final number for player. If it is player 1, then go into roll dice for player 2. If it is already player 2, go into decide winner.

var pickOrder = function (input) {
  var myOutputValue = "";
  if ((input == "AB") & (currentPlayer == 1)) {
    // after play selects their order, will form the order and push this Number into an array to track
    playerOneNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}.<br><br>It is now Player 2's turn.<br><br> Press submit to roll`;
    L2GameMode = L2_ROLL_DICE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "AB") & (currentPlayer == 2)) {
    playerTwoNum = selectAB();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    L2GameMode = L2_DECIDE_WINNER;
  } else if ((input == "BA") & (currentPlayer == 1)) {
    playerOneNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerOneNum}<br><br>It is now Player 2's turn.<br><br>Press submit to roll`;
    L2GameMode = L2_ROLL_DICE;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((input == "BA") & (currentPlayer == 2)) {
    playerTwoNum = selectBA();
    myOutputValue = `Player ${currentPlayer} choose ${input}, your number is ${playerTwoNum}.<br><br>Press submit to see who won!`;
    arrayForNums.push(playerTwoNum);
    L2GameMode = L2_DECIDE_WINNER;
  }
  arrayRolls = [];
  return myOutputValue;
};

// after both players have rolled dice, then we go into deciding the winner.
// code also has the score and leaderboard functionality

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
  L2GameMode = L2_ROLL_DICE;
  currentPlayer = 1;
  return myOutputValue;
};

//_____________________________ Lowest score wins Mode __________________________

// will only call out the differences between this mode and Base Normal mode.

var lowestWin = function (input) {
  var myOutputValue = "";
  if (L2GameMode == L2_ROLL_DICE) {
    myOutputValue = roll(input);
  } else if (L2GameMode == L2_CHOOSE_ORDER) {
    myOutputValue = pickOrder(input);
  } else if (L2GameMode == L2_DECIDE_WINNER) {
    myOutputValue = decideWinnerLowest(input);
  }
  // console log to track which game mode we are current in
  return myOutputValue;
};

// created new function to determine the winner by lowest number.

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
  L2GameMode = L2_ROLL_DICE;
  currentPlayer = 1;
  return myOutputValue;
};

//_________________________  Auto generate combined number Mode __________________

// will only call out the differences between this mode and Base Normal mode.

var auto = function (input) {
  var myOutputValue = "";
  if (L2GameMode == L2_ROLL_DICE_AUTO) {
    myOutputValue = rollAndDecide(input);
  } else if (L2GameMode == L2_DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
    L2GameMode = L2_ROLL_DICE_AUTO;
  }
  return myOutputValue;
};

// combined both the normal roll and pickorder function into one function for this mode.
// function will first roll dice, then decide for player the best combination.

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
    L2GameMode = L2_ROLL_DICE_AUTO;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((currentPlayer == 1) & (arrayRolls[0] < arrayRolls[1])) {
    playerOneNum = selectBA();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerOneNum} for you.`;
    L2GameMode = L2_ROLL_DICE_AUTO;
    arrayForNums.push(playerOneNum);
    currentPlayer = 2;
  } else if ((currentPlayer == 2) & (arrayRolls[0] >= arrayRolls[1])) {
    playerTwoNum = selectAB();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerTwoNum} for you.`;
    L2GameMode = L2_DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  } else if ((currentPlayer == 2) & (arrayRolls[0] < arrayRolls[1])) {
    playerTwoNum = selectBA();
    myOutputValue = `Player ${currentPlayer}, your two dice rolls are: ${arrayRolls[0]} and ${arrayRolls[1]}. <br><br>Computer picked ${playerTwoNum} for you.`;
    L2GameMode = L2_DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  arrayRolls = [];
  return myOutputValue;
};

//_____________________________ Variable number of Dice Mode_________________

// will only call out the differences between this mode and Base Normal mode.

var variableDice = function (input) {
  var myOutputValue = "";
  if (L2GameMode == L2_CHOOSE_NUM_DICE) {
    myOutputValue = diceNum(input);
  } else if (L2GameMode == L2_ROLL_DICE) {
    myOutputValue = rollMultipleDice(input);
  } else if (L2GameMode == L2_DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  return myOutputValue;
};

// create new function for user to select number of dice.

var diceNum = function (input) {
  numofDice = input;
  var myOutputValue = `You have choosen to play with ${input} dice 🎲. Hit Submit to start rolling!`;
  console.log("numofDice", numofDice);
  L2GameMode = L2_ROLL_DICE;
  return myOutputValue;
};

// adapted from rollAndDecide function, but not it catered for multiple dice scenarios.
// used sort array to get the best order.

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
    L2GameMode = L2_ROLL_DICE;
    currentPlayer = 2;
    arrayForNums.push(playerOneNum);
  } else if (currentPlayer == 2) {
    playerTwoNum = Number(bestNumber);
    line2 = `Computer picked ${playerTwoNum} for you.`;
    L2GameMode = L2_DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  myOutputValue = line1 + line2;
  arrayRolls = [];
  return myOutputValue;
};

// _________________ Variable number of players ____________________

// this part is not fully completed yet

var variablePlayers = function (input) {
  var myOutputValue = "";
  if (L2GameMode == L2_CHOOSE_NUM_DICE) {
    myOutputValue = diceNum(input);
  } else if (L2GameMode == L2_ROLL_DICE) {
    myOutputValue = rollMultipleDice(input);
  } else if (L2GameMode == L2_DECIDE_WINNER) {
    myOutputValue = decideWinner(input);
  }
  return myOutputValue;
};
var chooseNumOfPlayers = function (input) {
  numOfPlayers = input;
  var myOutputValue = `You have choosen to play with ${input} dice 🎲. Hit Submit to start rolling!`;
  console.log("numofDice", numofDice);
  L2GameMode = ROLL_DICE;
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
    L2GameMode = ROLL_DICE;
    currentPlayer = 2;
    arrayForNums.push(playerOneNum);
  } else if (currentPlayer == 2) {
    playerTwoNum = Number(bestNumber);
    line2 = `Computer picked ${playerTwoNum} for you.`;
    L2GameMode = L2_DECIDE_WINNER;
    arrayForNums.push(playerTwoNum);
  }
  myOutputValue = line1 + line2;
  arrayRolls = [];
  return myOutputValue;
};
