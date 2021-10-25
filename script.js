//  FLOW OF THE GAME

// game state: pre-game. Click submit to start
// game state : player 1's roll'. player 1 rolls a pair of dice
// game state: player 1 dice selection. Player 1 picks either dice 1 or 2 to be the first digit
// game state: player 2's roll'. player 2 rolls a pair of dice
// game state: player 2 dice selection. Player 2 picks either dice 1 or 2 to be the first digit
// game state: compare and collate score. The player whose dice pair is greater wins the round. Scores for each player are totalled and carried forward via global variables

//example output message:

//Ready to play? click the button.

//player 1's roll
//player 1's turn!
//you rolled 3 for dice 1, and 5 for dice 2.
//pick the dice to be in front. (enter 1 or 2)

// player 1's dice selection
//Player 1:  you picked dice 2 to be the first digit.
//your number is 53.
//It is player 2's turn. Player 2, click the submit button to roll your dice.

//player 2's turn!
//you rolled 6 for dice 1, and 1 for dice 2.
//pick the dice to be in front. (enter 1 or 2)

// player 2's dice selection
//Player 2:  you picked dice 6 to be the first digit.
//your number is 61.
//Player 2 wins!
//Player 2 is now in the lead.
//Player 1 - 53
//player 2 - 61

//GLOBAL VARIABLES

var gameState = "preGame";
var playerTurn = 1;

var player1Score = 0;
var player2Score = 0;

var die1 = 0;
var die2 = 0;

var diceCombo = 0;
var diceComboP1 = 0;
var diceComboP2 = 0;

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

//EXECUTE GAME MODE FUNCTIONS

//PRE-GAME
var executePreGame = function (input) {
  if (input == "") {
    myOutputValue = `Player ${playerTurn}, click the button to begin.`;
    gameState = "roll";
  } else {
    myOutputValue = "u not rdy aH";
  }
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

//EXECUTE SELECT
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

//EXECUTE SELECT AUTO
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

  return displayResultsMessage();
};

var main = function (input) {
  var myOutputValue = "";

  if (gameState == "preGame") {
    console.log("pre-game");
    return executePreGame(input);
  } else if (gameState == "roll") {
    console.log("roll");
    return executeRoll(input);
  } else if (gameState == "select") {
    console.log("select");
    return executeSelectAuto(input);
  } else if (gameState == "displayResults") {
    console.log("display results");
    return executeDisplayResults(input);
  }

  return myOutputValue;
};
