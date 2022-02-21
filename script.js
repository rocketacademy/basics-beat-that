//glabal variables
//gameSettings: Number of players, Number of dice, Game mode, Settings complete
var gameSettingsStatus = "Number of players";
//gameStatus: Playing, Announce winners, End game
var gameStatus = "Playing";
var numOfDice;
var numOfPlayers;
// gameMode: Highest combined, Lowest combined
var gameMode = "Lowest combined";
//playerTurn: 1,2,3,4
var playerTurn = 1;
var playerDiceNum = [];
var getRanking = [];
var diceResult = "";

//output display
var defaultOutput = function () {
  var outputElement = document.getElementById("output-div");
  var greetings = `Hi, welcome to Rocket Academy Beat That!  <br><br>Please enter number of players.<br><br> Minimum 2 players, maximum 10 players.`;
  return (outputElement.innerHTML = greetings);
};
defaultOutput();

//helper functions for game settings
var playersSettings = function (input) {
  var nextSettings =
    "Please enter number of dice per players.<br><br>Minimum 2 dice, maximum 7 dice.";
  var invalidInput = "Please enter '2' to '10' only for number of players.";

  if (input >= 2 && input <= 10) {
    //update global variables
    numOfPlayers = input;
    gameSettingsStatus = "Number of dice";
    return nextSettings;
  } else {
    return invalidInput;
  }
};

var diceSettings = function (input) {
  var nextSettings =
    "Please enter 1 or 2 to select game mode: <br><br> 1) Highest combined <br>- Player with the highest combined number is the winner. <br><br>2) Lowest combined<br>- Player with the lowest combined number is the winner";
  var invalidInput = "Please enter '2' to '7' only for number of dice.";

  if (input >= 2 && input <= 7) {
    //update global variables
    numOfDice = input;
    gameSettingsStatus = "Game mode";
    return nextSettings;
  } else {
    return invalidInput;
  }
};

var gameModeSettings = function (input) {
  var invalidInput =
    "Please enter '1' for highest combined or '2' for lowest combined.";

  if (input === "1") {
    gameMode = "Highest combined";
  } else if (input === "2") {
    gameMode = "Lowest combined";
  } else {
    return invalidInput;
  }

  var settingsConfirmation = `<b>Game settings:</b><br>No. of players: ${numOfPlayers}<br>No. of dice: ${numOfDice}<br>Game mode: ${gameMode} <br><br>Let's start the game!<br><br>Roll the dice by clicking the 'Submit' button.`;
  gameSettingsStatus = "Settings complete";

  return settingsConfirmation;
};

// call each game settings helper function based on gameSettingsStatus
var gameSettings = function (input) {
  if (gameSettingsStatus === "Number of players") {
    return playersSettings(input);
  } else if (gameSettingsStatus === "Number of dice") {
    return diceSettings(input);
  } else if (gameSettingsStatus === "Game mode") {
    return gameModeSettings(input);
  }
};

//start game helper function
var playGame = function (index) {
  var playerDiceRoll = [];
  var sortedNum = [];
  //loop according to no. of dice
  for (let i = 0; i < numOfDice; i++) {
    var randomDice = Math.ceil(Math.random() * 6);
    playerDiceRoll.push(randomDice);
  }
  //sort order
  var sortedNum = playerDiceRoll.sort(function (a, b) {
    if (gameMode === "Highest combined") {
      return b - a;
    } else {
      return a - b;
    }
  });
  playerDiceNum.push(sortedNum.join(""));
  getRanking.push(sortedNum.join(""));
  diceResult =
    diceResult +
    `${playerTurn}) Player ${playerTurn} rolled ${playerDiceNum[index]}.<br>`;
};

var getWinner = function () {
  var scoreRank;
  var playerRank = [];
  var output = "";
  // rank according to dice rolled
  var scoreRank = getRanking.sort(function (a, b) {
    if (gameMode === "Highest combined") {
      return b - a;
    } else {
      return a - b;
    }
  });
  //to find out the player of the dice
  for (let i = 0; i < scoreRank.length; i++) {
    var diceNum = scoreRank[i];
    var index = playerDiceNum.findIndex((x) => x === diceNum);
    playerRank.push(index + 1);
    playerDiceNum[index] = 0;
    output = output + `${i + 1}) Player ${playerRank[i]}: ${scoreRank[i]}<br>`;
  }
  return output;
};

//other helper function
//input validation
var inputIsNaturalNumber = function (input) {
  if (input >= 1) {
    return true;
  }
};

var main = function (input) {
  var myOutputValue = "";
  //run game settings helper functions
  if (gameSettingsStatus !== "Settings complete") {
    var inputCheck = inputIsNaturalNumber(input);
    var invalidInput = "Please enter valid number.";

    if (inputCheck) {
      return gameSettings(input);
    } else {
      return invalidInput;
    }
  }
  if (gameStatus === "Playing") {
    var index = playerTurn - 1;
    if (playerTurn < numOfPlayers) {
      playGame(index);
      playerTurn = playerTurn + 1;
      myOutputValue =
        diceResult + `<br>Player ${playerTurn}'s turn. Press submit to roll.`;
    } else if ((playerTurn = numOfPlayers)) {
      playGame(index);
      myOutputValue = diceResult + `<br>Press submit to view result.`;
      gameStatus = "Announce winners";
    }
  } else if (gameStatus === "Announce winners") {
    myOutputValue = `<b>Score:</b><br><br>` + getWinner();
    gameStatus = "End game";
  } else if (gameStatus === "End game") {
    myOutputValue = "End game! Refresh to play again.";
  }
  return myOutputValue;
};
