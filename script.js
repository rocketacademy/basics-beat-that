//GLOBAL VARIABLES
var gameState = "preGame";
var playerTurn = 1;
var roundNumber = 0;

var player1Score = 0;
var player2Score = 0;

var die1 = 0;
var die2 = 0;

var diceCombo = 0;
var diceComboP1 = 0;
var diceComboP2 = 0;

var numberOfDice = 0;

var numberOfPlayers = 0;

//only works up to 4 players because idk how to execute the loop without creating a fixed number of existing array variables
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

//WHO WINS FUNCTION
var whoWins = function (diceComboP1, diceComboP2) {
  if (diceComboP1 > diceComboP2) {
    return `${diceComboP1} beats ${diceComboP2}. Player 1 wins this round!`;
  }
  if (diceComboP2 > diceComboP1) {
    return `${diceComboP2} beats ${diceComboP1}. Player 2 wins this round!`;
  }
  if (diceComboP1 == diceComboP2) {
    return `It's a draw!`;
  }
};

var globalScoreResults = function (player1Score, player2Score) {
  var overallScore = `OVERALL SCORES <br><br> Player 1 : ${player1Score} <br> Player 2 : ${player2Score}`;
  if (player2Score > player1Score) {
    overallScore = `OVERALL SCORES <br><br> Player 2 : ${player2Score} <br> Player 1 : ${player1Score}`;
  }
  var whosInTheLead = "";
  if (player1Score > player2Score) {
    whosInTheLead = "Player 1 is in the lead!!";
  }
  if (player2Score > player1Score) {
    whosInTheLead = "Player 2 is in the lead!!";
  }
  if (player2Score == player1Score) {
    whosInTheLead = "It's a tie!";
  }
  return `${overallScore} <br><br> ${whosInTheLead}`;
};

//MESSAGE FUNCTIONS
var rollMessage = function () {
  if (playerTurn == 1) {
    var whoseTurn = "It's Player 1's turn!";
  } else if (playerTurn == 2) {
    var whoseTurn = "It's Player 2's turn!";
  }
  var displayDiceRolls = `You rolled ${die1} on Die 1 and ${die2} on Die 2.`;
  return `${whoseTurn} <br> <br> ${displayDiceRolls}.`;
};

var selectMessage = function () {
  return `Your dice value is ${diceCombo}. <br><br> Click the button to continue.`;
};

var displayResultsMessage = function () {
  return `Player 1's selection: ${diceComboP1} <br> Player 2's selection: ${diceComboP2} 
  <br><br> 
  ${whoWins(diceComboP1, diceComboP2)} <br><br> 
  ${globalScoreResults(player1Score, player2Score)}
  <br><br> 
  Player 1, click the button to start the next round.`;
};

var displayNewResultsMessage = function () {
  //example text:
  //Player 1's selection: 0
  //Player 2's selection: 0
  //    (roundCombinationMessage)

  //OVERALL SCORES
  //Player 1 : 0
  //Player 2 : 0
  //    (overallScoreboardMessage)

  //Player 2 is in the lead!
  //    (leaderMessage)

  //Player 1, click the button to start the next round.

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
    myOutputValue = `How many players are playing?`;
    gameState = "chooseNumberOfPlayers";
  } else {
    myOutputValue = "u not rdy aH";
  }
  return myOutputValue;
};

//EXECUTE THE 'CHOOSE NUMBER OF PLAYERS' FUNCTION
var chooseNumberOfPlayers = function (input) {
  if (input >= 2 && input <= 4) {
    numberOfPlayers = Number(input);
    gameState = "chooseDiceNumber";
    myOutputValue = `How many dice are you playing with?`;
  } else {
    myOutputValue = "dun b stuip, enter a proper number 2to4 la";
  }
  return myOutputValue;
};

//EXECUTE THE 'CHOOSE NUMBER OF DICE' FUNCTION
var chooseDiceNumber = function (input) {
  myOutputValue = "dun b stuip, enter a proper number 1-10 la";
  if (input >= 1 && input <= 10) {
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

  while (counter < numberOfDice) {
    diceListRollResults.push(`Die ${counter + 1}: ${diceArray[counter]}`);
    counter = counter + 1;
  }

  //Create an array with the dice sorted in descending order.
  diceComboArray = diceArray.sort(function (a, b) {
    return b - a;
  });

  //converts the sorted array into an integer and place into a variable for retriving later
  if (playerTurn == 1) {
    p1DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 2) {
    p2DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 3) {
    p3DiceCombo = Number(diceComboArray.join(""));
  } else if (playerTurn == 4) {
    p4DiceCombo = Number(diceComboArray.join(""));
  }

  //at the last player's roll, change to display results mode.
  if (playerTurn == numberOfPlayers) {
    gameState = "displayResults";
  }

  myOutputValue = `PLAYER ${playerTurn}'S ROLLS <br><br> ${diceListRollResults.join(
    "<br>"
  )} <br><br> Your number is ${diceComboArray.join("")} <br> <br> Player ${
    playerTurn + 1
  }, click the button to roll.`;

  if (playerTurn == numberOfPlayers) {
    myOutputValue = `PLAYER ${playerTurn}'S ROLLS <br><br> ${diceListRollResults.join(
      "<br>"
    )} <br><br> Your number is ${diceComboArray.join(
      ""
    )} <br> <br>  Click the button to see the results for the round.`;
  }

  playerTurn = playerTurn + 1;
  return myOutputValue;
};

//EXECUTE ROLL
var executeRoll = function (input) {
  myOutputValue = "u not rdy aH";
  if (input == "") {
    die1 = rollDice();
    die2 = rollDice();
    myOutputValue = `${rollMessage()}`;
    gameState = "select";
  }
  return myOutputValue;
};

//EXECUTE SELECT - no need to select after implementing auto-select
/*
var executeSelect = function (input) {
  //input validation
  if (input != 1 && input != 2) {
    console.log("a");
    myOutputValue = "wut u doin, choose 1 or 2";
    return myOutputValue;
  }

  //conditions for choosing which die goes first
  if (input == 1) {
    diceCombo = Number(`${die1}` + `${die2}`);
  }
  if (input == 2) {
    diceCombo = Number(`${die2}` + `${die1}`);
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
};
*/

//EXECUTE SELECT AUTO -  used in the 'auto-generate combined number' section
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
};

//EXECUTE DISPLAY RESULTS
var executeDisplayResults = function (input) {
  gameState = "roll";
  playerTurn = 1;
  roundNumber = roundNumber + 1;

  return displayNewResultsMessage();
};

var main = function (input) {
  var myOutputValue = "";

  if (gameState == "preGame") {
    console.log("pre-game");
    return executePreGame(input);
  } else if (gameState == "chooseNumberOfPlayers") {
    console.log("choose number of players");
    return chooseNumberOfPlayers(input);
  } else if (gameState == "chooseDiceNumber") {
    console.log("choose dice number");
    return chooseDiceNumber(input);
  } else if (gameState == "roll") {
    console.log("roll");
    return executeNewRoll(input);
  } else if (gameState == "select") {
    console.log("select");
    return executeSelectAuto(input);
  } else if (gameState == "displayResults") {
    console.log("display results");
    return executeDisplayResults(input);
  }

  return myOutputValue;
};
