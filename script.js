// Constants
const CHOOSE_NUM_PLAYERS = "choose number of players";
const CHOOSE_WIN_CNDTN = "choose the win condition";
const CHOOSE_KNOCKOUT = "choose knockout mode";
const SETTINGS_CHOSEN = "all settings chosen";
const HIGHEST = "highest"; // to be used in winCndtn
const LOWEST = "lowest"; // to be used in winCndtn
const ON = "on"; // to be used in koSetting
const OFF = "off"; // to be used in koSetting

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS; // Initialise game in this mode
var numPlayers;
var numDices;
var winCndtn;
var koSetting; // Knockout Mode on or off?
var players = []; // Array of player objects that will be updated as the game progresses

// Generate a number between 1-6
var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var randomRoll = Math.floor(randomInteger) + 1;
  return randomRoll;
};

var stage1 = function (chosenNumber) {
  var resultMessage;
  // Input validation: if user does not enter a number that is greater than 1, as we need min 2 players to play
  if (!(Number(chosenNumber) > 1)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number greater than 1.`;
    return resultMessage;
  }
  // Valid input, so we update numPlayers based on input
  numPlayers = Number(chosenNumber);
  // Create object for each player and update players array
  for (var i = 0; i < numPlayers; i++) {
    var player = { playerNum: i + 1, playerScore: 0 };
    players.push(player);
  }
  // Output the result message
  resultMessage = `You have selected to play the game with ${numPlayers} players.<br><br>Now enter "${HIGHEST}" to have the the win condition be ${"lowest number wins".italics()}, or enter "${LOWEST}" to have the win condition be ${"lowest number wins".italics()}.`;
  gameMode = CHOOSE_WIN_CNDTN; // Update game mode to next stage
  return resultMessage;
};

var stage2 = function (chosenCndtn) {
  var resultMessage;
  // Input validation: if user does not enter the number 1 or 2
  if (chosenCndtn != HIGHEST && chosenCndtn != LOWEST) {
    resultMessage = `You have entered an invalid input.<br><br>Please enter "${HIGHEST}" to have the the win condition be ${"lowest number wins".italics()}, or enter "${LOWEST}" to have the win condition be ${"lowest number wins".italics()}.`;
    return resultMessage;
  }
  // Valid input, so we update winCndtn based on input
  winCndtn = chosenCndtn;
  resultMessage = `You have selected the win condition as ${(
    winCndtn + " number wins"
  ).italics()}.<br><br>Now enter "${ON}" to have Knockout Mode turned on, or enter "${OFF}" to have Knockout Mode turned off.`;
  gameMode = CHOOSE_KNOCKOUT; // Update game mode to next stage
  return resultMessage;
};

var stage3 = function (onOrOff) {
  var resultMessage;
  // Input validation: if user does not enter "on" or "off"
  if (onOrOff != ON && onOrOff != OFF) {
    resultMessage = `You have entered an invalid input.<br><br>Please enter "${ON}" to have Knockout Mode turned on, or enter "${OFF}" to have Knockout Mode turned off.`;
    return resultMessage;
  }
  // Valid input, so we update koSetting based on input
  koSetting = onOrOff;
  gameMode = SETTINGS_CHOSEN;
  resultMessage = `You have selected Knockout Mode to be turned ${koSetting}.<br><br>These are the settings that you have chosen:<br>Number of players: ${numPlayers}<br>Win condition: ${winCndtn} number wins<br>Knockout Mode: ${koSetting}<br><br>You are now ready to start the first round of Beat That!<br>Enter the number of dice that will be rolled for each player in this round.`;
  return resultMessage;
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = stage1(input);
    return myOutputValue;
  }
  if (gameMode == CHOOSE_WIN_CNDTN) {
    myOutputValue = stage2(input);
    return myOutputValue;
  }
  if (gameMode == CHOOSE_KNOCKOUT) {
    myOutputValue = stage3(input);
    return myOutputValue;
  }
  if (gameMode == SETTINGS_CHOSEN) {
    myOutputValue = stage4(input);
    return myOutputValue;
  }
};
