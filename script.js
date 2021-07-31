var turnCount = 0;
var gameMode = "roll";
var diceA = 0;
var diceB = 0;
var turnCount = 0; // used to calculate which player's turn, increment by 1 after every "combine"
var gameMode = ["start", 0, 0, "", ""]; // [mode, players, dice, high/low, normal/knockout]
var playerNamesArray = [];
var diceArray = []; // stores n rolls of dice for one player (reset after each player's turn)
var numArray = []; // stores this round's numbers for n players (reset after each round)
var scoreArray = []; // stores accumulated score
var header = "";
var myOutputValue = "";
var playerOneNum = 0;
var scoreA = 0;
var scoreB = 0;
var currentPlayer = 0;

var koTurnCount = 0;
var koPlayerNamesArray = [];
var koWinnersArray = [];
var koCurrentPlayer = 0;

// SET KNOCKOUT ARRAYS
var setKnockoutArrays = function () {
  koWinnersArray = [];
  koPlayerNamesArray = duplicateArray(playerNamesArray);
  koPlayerNamesArray.shift();
  koWinnersArray.push(koPlayerNamesArray.shift());
  koWinnersArray.push(koPlayerNamesArray.shift());
};

// SET MODES
var setPlayers = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for number of players! Please input a number larger or equal to 2 OR at least 2 names ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input a number larger or equal to 2 OR at least 2 names ⚠️`;
  } else if (isNaN(userInput)) {
    // if input by player name - put length into gameMode[1]
    playerNamesArray = userInput.split(" ");
    if (playerNamesArray.length > 2) {
      gameMode[1] = playerNamesArray.length;
      myOutputValue = `There will be ${gameMode[1]} players. <br> Please input number of dice (min. 2). 🎲`;
    } else {
      playerNamesArray = [];
    }
  } else if (userInput >= 2) {
    // if input by no. of players - make array of player names
    gameMode[1] = userInput;
    var j = 1;
    while (j <= gameMode[1]) {
      playerNamesArray.push(`Player ${j}`);
      j += 1;
    }
    myOutputValue = `There will be ${gameMode[1]} players. <br> Please input number of dice (min. 2). 🎲`;
  }
  playerNamesArray.unshift("blank");
  // create a blank score array with i elements (i = no. of players)
  var i = 0;
  while (i < gameMode[1]) {
    scoreArray.push(0);
    i += 1;
  }
};

var setDice = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for number of dice! Please input a number larger or equal to 2 ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input a number larger or equal to 2 for number of dice ⚠️`;
  } else if (userInput >= 2) {
    // if input number
    gameMode[2] = userInput;
    myOutputValue = `There will be ${gameMode[2]} dice. <br> Please select mode (high/low). ⬆️⬇️ <br><br> ※ High - Highest combined number wins; Low - Lowest combined number wins`;
  }
};

var setMode = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input for mode! Please input 'high' or 'low' for mode ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input 'high' or 'low' for mode ⚠️`;
  } else if (userInput == "high" || userInput == "low") {
    // if input high/low
    gameMode[3] = userInput;
    myOutputValue = `You have selected '${gameMode[3]}'. The ${gameMode[3]}est combined number will win. <br> Please choose your game mode (normal/knockout). 🥊`;
  }
};

var setKnockout = function (userInput) {
  myOutputValue = `⚠️ ${userInput} is not a valid input! Please input 'normal' or 'knockout' ⚠️`;
  if (userInput == "") {
    // if blank input
    myOutputValue = `⚠️ Please input 'normal' or 'knockout' for mode ⚠️`;
  } else if (userInput == "normal" || userInput == "knockout") {
    // if input normal/knockout
    if (userInput == "knockout") {
      setKnockoutArrays();
    }
    gameMode[4] = userInput;
    myOutputValue = `You have selected '${gameMode[4]}'. <br><br> Please check your settings below: <br> `;
    myOutputValue += `👤 No. of Players: ${gameMode[1]} <br> 🎲 No. of Dice: ${gameMode[2]} <br> ⬆️⬇️ Winning Mode: ${gameMode[3]} <br> 🥊 Game Mode: ${gameMode[4]} <br><br> Click 'Submit' to start the game.`;
  }
};

// ROLL DICE
var rollDice = function () {
  diceNum = Math.ceil(Math.random() * 6);
  return diceNum;
  var rollNDice = function () {
  var i = 0;
  while (i < gameMode[2]) {
    var diceNum = Math.ceil(Math.random() * 6);
    diceArray.push(diceNum);
    i += 1;
  }
};
