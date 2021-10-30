//GLOBAL VARIABLES
var gameState = "preGame";
var playerTurn = 1;
var roundNumber = 0;

var numberOfDice = 0;

var numberOfPlayers = 0;

//only works up to 4 players - because idk how to execute the loop without creating a fixed number of existing array variables
var p1DiceCombo = 0;
var p2DiceCombo = 0;
var p3DiceCombo = 0;
var p4DiceCombo = 0;

//player score totals
var player1Score = 0;
var player2Score = 0;
var player3Score = 0;
var player4Score = 0;

//ROLL DICE FUNCTION
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var displayNewResultsMessage = function () {
  myOutputValue =
    roundCombinationMessage() + overallScoreboardMessage() + leaderMessage();
  return myOutputValue;
};

//Message functions:
var roundCombinationMessage = function () {
  var message = `ROUND ${roundNumber} RESULTS<br><br>
    Player 1's Combo: ${p1DiceCombo}<br>
    Player 2's Combo: ${p2DiceCombo}<br>`;

  if (numberOfPlayers == 3) {
    message = message + `Player 3's Combo: ${p3DiceCombo} <br>`;
  } else if (numberOfPlayers == 4) {
    message =
      message +
      `Player 3's Combo: ${p3DiceCombo} <br>Player 4's Combo: ${p4DiceCombo} <br>`;
  }
  return message;
};

var overallScoreboardMessage = function () {
  //total up scores - not sure if should be placed here or elsewhere.
  player1Score = player1Score + p1DiceCombo;
  player2Score = player2Score + p2DiceCombo;
  player3Score = player3Score + p3DiceCombo;
  player4Score = player4Score + p4DiceCombo;

  var message = `<br><br>OVERALL SCORES<br><br>
  Player 1: ${player1Score}<br>
  Player 2: ${player2Score}<br>`;

  if (numberOfPlayers == 3) {
    message = message + `Player 3: ${player3Score} <br>`;
  } else if (numberOfPlayers == 4) {
    message =
      message + `Player 3: ${player3Score} <br>Player 4: ${player4Score} <br>`;
  }
  return message;
};

var leaderMessage = function () {
  if (
    player1Score == player2Score ||
    player1Score == player3Score ||
    player1Score == player4Score ||
    player2Score == player3Score ||
    player2Score == player4Score ||
    player3Score == player4Score
  ) {
    message = `<br><br>nice draw sia`;
  } else if (
    player1Score >= player2Score &&
    player1Score >= player3Score &&
    player1Score >= player4Score
  ) {
    message = `<br><br>Player 1 is in the lead! <br>Professional gambler siol`;
  } else if (
    player2Score >= player1Score &&
    player2Score >= player3Score &&
    player2Score >= player4Score
  ) {
    message = `<br><br>Player 2 is in the lead! <br>Stonksss`;
  } else if (
    player3Score >= player1Score &&
    player3Score >= player2Score &&
    player3Score >= player4Score
  ) {
    message = `<br><br>Player 3 is in the lead! <br>gg ez`;
  } else if (
    player4Score >= player1Score &&
    player4Score >= player2Score &&
    player4Score >= player3Score
  ) {
    message = `<br><br>Player 4 is in the lead! <br>4D master `;
  }
  return message;
};

//EXECUTE GAME MODE FUNCTIONS

//PRE-GAME
var executePreGame = function (input) {
  if (input == "") {
    myOutputValue = `How many players are playing? (2 to 4)`;
    gameState = "chooseNumberOfPlayers";
  } else {
    myOutputValue = "u not rdy aH, just clicc onli";
  }
  return myOutputValue;
};

//EXECUTE THE 'CHOOSE NUMBER OF PLAYERS' FUNCTION
var chooseNumberOfPlayers = function (input) {
  if (input >= 2 && input <= 4) {
    numberOfPlayers = Number(input);
    gameState = "chooseDiceNumber";
    myOutputValue = `How many dice are you playing with? (1-30)`;
  } else {
    myOutputValue = "dun b stuip, enter a proper number 2to4 la";
  }
  return myOutputValue;
};

//EXECUTE THE 'CHOOSE NUMBER OF DICE' FUNCTION
var chooseDiceNumber = function (input) {
  myOutputValue = "dun b stuip, enter a proper number 1-30 la";
  if (input >= 1 && input <= 30) {
    numberOfDice = Number(input);
    gameState = "roll";
    myOutputValue = `Player ${playerTurn}, click the button to roll!`;
  }
  return myOutputValue;
};

//NEW EXECUTE ROLL - rolls into an array and reorders with loops
var executeNewRoll = function () {
  //put the dice in an array
  var diceArray = [];
  var counter = 0;
  while (counter < numberOfDice) {
    //console.log("counter" + counter);
    diceArray.push(rollDice());
    counter = counter + 1;
  }

  //Create a list of dice as a string before sorting them
  counter = 0;
  var diceListRollResults = [];

  //loop to create array of strings in order to display the dice inside the array nicely.
  while (counter < numberOfDice) {
    diceListRollResults.push(`Die ${counter + 1}: ${diceArray[counter]}`);
    counter = counter + 1;
  }

  //Sorts the dice array in descending order to create the player's optimal dice combo.
  diceComboArray = diceArray.sort(function (a, b) {
    return b - a;
  });

  //converts the dice combo number into an integer, then places it into the respective player's variable for retriving later
  if (playerTurn == 1) {
    p1DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 2) {
    p2DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 3) {
    p3DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 4) {
    p4DiceCombo = Number(diceComboArray.join(""));
  }

  myOutputValue = `PLAYER ${playerTurn}'S ROLLS <br><br> ${diceListRollResults.join(
    "<br>"
  )} <br><br> Your number is ${diceComboArray.join("")} <br> <br> Player ${
    playerTurn + 1
  }, click the button to roll.`;

  if (playerTurn == numberOfPlayers) {
    //at the last player's roll, change to display results mode.
    gameState = "displayResults";

    myOutputValue = `PLAYER ${playerTurn}'S ROLLS <br><br> ${diceListRollResults.join(
      "<br>"
    )} <br><br> Your number is ${diceComboArray.join(
      ""
    )} <br> <br>  Click the button to see the results for the round.`;
  }

  playerTurn = playerTurn + 1;
  return myOutputValue;
};

//EXECUTE SELECT AUTO -  used in the 'auto-generate combined number' section
/*
var executeSelectAuto = function (input) {
  if (die1 > die2) {
    diceCombo = Number(`${die1}` + `${die2}`);
  }
  if (die2 > die1) {
    diceCombo = Number(`${die2}` + `${die1}`);
  }
  if (die1 == die2) {
    diceCombo = Number(`${die1}` + `${die2}`);
  }

  //assign the results to respective players
  if (playerTurn == 2) {
    diceComboP2 = diceCombo;
    gameState = "displayResults";
    playerTurn = 1;
    player2Score = player2Score + diceCombo;
  } else if (playerTurn == 1) {
    diceComboP1 = diceCombo;
    gameState = "roll";
    playerTurn = 2;
    player1Score = player1Score + diceCombo;
  }

  return selectMessage();
}; */

//EXECUTE DISPLAY RESULTS
var executeDisplayResults = function (input) {
  //resets the game state to "roll" and starts again from player 1.
  gameState = "roll";
  playerTurn = 1;
  roundNumber = roundNumber + 1;

  return displayNewResultsMessage();
};

var main = function (input) {
  if (gameState == "preGame") {
    return executePreGame(input);
  } else if (gameState == "chooseNumberOfPlayers") {
    return chooseNumberOfPlayers(input);
  } else if (gameState == "chooseDiceNumber") {
    return chooseDiceNumber(input);
  } else if (gameState == "roll") {
    return executeNewRoll(input);
  } else if (gameState == "displayResults") {
    return executeDisplayResults(input);
  }
};
