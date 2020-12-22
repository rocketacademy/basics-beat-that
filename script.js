// Declare Game Modes
var ROLL_DICE_MODE = 'ROLL_DICE_MODE';
var SHOW_DICE_MODE = 'SHOW_DICE_MODE';
var PICK_DICE_ORDER_MODE = 'PICK_DICE_ORDER_MODE';
// Set Initial Game Mode
var gameMode = ROLL_DICE_MODE;

// Store Dice Rolls
var playerDiceRoll = [];
// Player Re-order
var playerReorder = [];

// Player Score
var playerScore = [];

// Player Turn
var playerTurnSwitch = 1;
var maxPlayers = 2;

/* ------------------STATEMENTS---------------------------- */
var statementOne = function (playerTurn, diceOne, diceTwo) {
  var statementOneOuputValue = `Welcome player ${playerTurn}` + '<br>' + `You rolled Dice 1: ${diceOne} & Dice 2: ${diceTwo}.` + '<br>' + 'Choose the order of the dice';
  return statementOneOuputValue;
};

var statmentTwo = function (playerTurn, chosenDice, beatItNum) {
  if (playerTurn < maxPlayers) {
    var statementTwo = `Welcome player ${playerTurn}, you chose dice ${chosenDice} first.` + '<br>' + `Your number is ${beatItNum}` + '<br>' + 'It is now player 2\'s turn';
  } else {
    var statementTwo = `Welcome player ${playerTurn}, you chose dice ${chosenDice} first.` + '<br>' + `Your number is ${beatItNum}`;
  }
  return statementTwo;
};

var statementThree = function () {
  var statementThree = [];
  var arrayLength = playerScore.length;
  for (var i = 0; i < arrayLength; i++) {
    var player = Number([i]) + 1;
    statementThree.push(`player ${player}'s number ${playerScore[i]}` + '<br>');
  }
  return statementThree;
};
/* ------------------DICE FUNCTIONS---------------------------- */
var rollDice = function (min, max) {
  // generate a random number from min to max
  var diceRollOutput = Math.floor(Math.random() * (max - min + 1)) + min;
  return diceRollOutput;
};

var rollDiceMode = function () {
  var counter = 0;
  // roll 2 dice
  while (counter < 2) {
    playerDiceRoll.push(rollDice(1, 6));
    counter += 1;
  }
  return playerDiceRoll;
};

var showDiceMode = function (playerTurn) {
  var diceOne = playerDiceRoll[0];
  var diceTwo = playerDiceRoll[1];
  var showDiceModeOuput = statementOne(playerTurn, diceOne, diceTwo);
  return showDiceModeOuput;
};

/* ------------------USER CHOICE FUNCTIONS---------------------------- */
var pickDiceMode = function (playerTurn, playerInput) {
  var returnStatment = '';
  var playerChoice = playerInput - 1;
  var index = 0;
  while (index < playerDiceRoll.length) {
    var currentRoll = playerDiceRoll[index];
    if (playerChoice == index) {
      playerReorder.push(currentRoll);
      playerDiceRoll.splice(playerChoice, 1);
    }
    index += 1;
  }
  // add remaining number to Reordered array
  playerReorder.push(playerDiceRoll[0]);
  // store player number
  var playerBeatItNum = Number(`${playerReorder[0]}${playerReorder[1]}`);
  playerScore.push(playerBeatItNum);
  // return statment
  returnStatment = statmentTwo(playerTurn, playerInput, playerBeatItNum);
  // purge
  playerDiceRoll = [];
  playerReorder = [];
  return returnStatment;
};

/* ----------------------------------------------------------- */
/* ------------------MAIN FUNCTION---------------------------- */
/* ----------------------------------------------------------- */
var main = function (input) {
  // Call input playerInput to make game logic clearer
  var playerInput = input;
  var myOutputValue = '';
  if (gameMode == ROLL_DICE_MODE && playerTurnSwitch <= maxPlayers) {
    rollDiceMode();
    gameMode = SHOW_DICE_MODE;
  }
  if (gameMode == SHOW_DICE_MODE && playerTurnSwitch <= maxPlayers) {
    myOutputValue = showDiceMode(playerTurnSwitch);
    console.log(myOutputValue);
    gameMode = PICK_DICE_ORDER_MODE;
    console.log('GAME-MODE ' + gameMode);
    return myOutputValue;
  }
  if (gameMode == PICK_DICE_ORDER_MODE && playerTurnSwitch <= maxPlayers) {
    myOutputValue = pickDiceMode(playerTurnSwitch, playerInput);
    playerTurnSwitch += 1;
    gameMode = ROLL_DICE_MODE;
    console.log('GAME-MODE ' + gameMode);
    return myOutputValue;
  }
  if (playerTurnSwitch > maxPlayers) {
    myOutputValue = statementThree();
    return myOutputValue;
  }
  myOutputValue = 'Seems to have been an error. Refresh page';
  return myOutputValue;
};
