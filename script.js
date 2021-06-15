// Constants
const CHOOSE_NUM_PLAYERS = "choose number of players";
const CHOOSE_WIN_CNDTN = "choose the win condition";
const CHOOSE_KNOCKOUT = "choose knockout mode";
const CHOOSE_NUM_DICE = "choose number of dice for round";
const HIGHEST = "highest"; // to be used in winCndtn
const LOWEST = "lowest"; // to be used in winCndtn
const ON = "on"; // to be used in koSetting
const OFF = "off"; // to be used in koSetting

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS; // Initialise game in this mode
var numPlayers;
var numDice;
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
  // Input validation: need minimum 2 players to play. Limit number of players to 10 for performance reasons.
  if (!(Number(chosenNumber) >= 2 && Number(chosenNumber) <= 10)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 2 and 10. All decimals will be rounded up.`;
    return resultMessage;
  }
  // Valid input, so we update numPlayers based on input rounded up
  numPlayers = Math.ceil(Number(chosenNumber));
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
  gameMode = CHOOSE_NUM_DICE;
  resultMessage = `You have selected Knockout Mode to be turned ${koSetting}.<br><br>These are the settings that you have chosen:<br>Number of players: ${numPlayers}<br>Win condition: ${winCndtn} number wins<br>Knockout Mode: ${koSetting}<br><br>You are now ready to start the first round of Beat That!<br>Enter the number of dice that will be rolled for each player in this round.`;
  return resultMessage;
};

var stage4 = function (numDiceInput) {
  var resultMessage;
  // Input validation: need at least 1 die to be rolled. Limit number of dice to 8 for performance reasons.
  if (!(Number(numDiceInput) >= 1 && Number(numDiceInput) <= 8)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 1 and 8. All decimals will be rounded up.`;
    return resultMessage;
  }
  // Valid input, so we update numDice based on input rounded up
  numDice = Math.ceil(Number(numDiceInput));
  return playRound(numDice, numPlayers);
};

var playRound = function (numDice, numPlayers) {
  for (var p = 0; p < numPlayers; p++) {
    var diceRolls = [];
    for (var i = 0; i < numDice; i++) {
      diceRolls.push(rollDice());
    }
    console.log(`Player ${p + 1} rolled ${diceRolls}`);
    var roundScore = calcNumber(diceRolls);
    players[p].playerScore += roundScore;
  }
  return createLeaderboard(players);
};

var calcNumber = function (diceRolls) {
  var sortedRolls;
  if (winCndtn == HIGHEST) {
    sortedRolls = diceRolls.sort(function (a, b) {
      return b - a;
    });
  } else if (winCndtn == LOWEST) {
    sortedRolls = diceRolls.sort(function (a, b) {
      return a - b;
    });
  }
  var concatRolls = sortedRolls.join("");
  var finalNum = Number(concatRolls);
  return finalNum;
};

var createLeaderboard = function (players) {
  // Create a (deep) copy of the players array
  var sortedPlayers = JSON.parse(JSON.stringify(players));
  // Sort the array depending on win condition
  if (winCndtn == HIGHEST) {
    sortedPlayers.sort(function (a, b) {
      return b.playerScore - a.playerScore;
    });
  } else if (winCndtn == LOWEST) {
    sortedPlayers.sort(function (a, b) {
      return a.playerScore - b.playerScore;
    });
  }
  var playerNumArray = sortedPlayers.map((x) => x.playerNum);
  var scoreArray = sortedPlayers.map((x) => x.playerScore);
  var leaderboard = `Here are the current player scores:<br><br>Player Number: ${playerNumArray.join(
    " | "
  )}<br>Score: ${scoreArray.join(" | ")}`;
  return leaderboard;
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
  if (gameMode == CHOOSE_NUM_DICE) {
    myOutputValue = stage4(input);
    return myOutputValue;
  }
};
