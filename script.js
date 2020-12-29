// Declare Game Modes
var PICK_MULTIPLAYER_MODE = 'PICK_MULTIPLAYER_MODE';
var CHOOSE_NUM_OF_DICE_AND_ROLL_MODE = 'CHOOSE_NUM_OF_DICE_AND_ROLL_MODE';
var START_MULTIPLAYER_MODE = 'START_MULTIPLAYER_MODE';
var RESTART_MODE = 'RESTART_MODE';
// Set Initial Game Mode
var gameMode = PICK_MULTIPLAYER_MODE;

// Trackers
var numOfPlayersInGame = 0;
var currentPlayer = 0;

/* ------------------PLAYER FUNCTIONS---------------------------- */
// FUNCTION: Create x number of players
var playerObjectArray = [];
// Function that creates a PlayerObject
var makePlayerObject = function (numberOfPlayers) {
  var playerObject = {
    playerNumber: numberOfPlayers,
    diceRoll: [],
    combinedNum: 'waiting',
    position: [],
  };
  return playerObject;
};
// Function that creates a multiple PlayerObjects and adds them to a playerObjectArray
var createNumOfPlayers = function (playerInput) {
  for (var i = 0; i < playerInput; i += 1) {
    // push a new player object into playerObjectArray
    playerObjectArray.push(makePlayerObject(i + 1));
  }
  console.log(playerObjectArray);
};

/* ------------------DICE FUNCTIONS---------------------------- */
// Function that rolls a 6 sided dice
var rollDice = function () {
  // generate a random number from min to max
  var diceRollOutput = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  return diceRollOutput;
};
// Function that stores the dice rolls into the playerObject.diceRoll
// Also updates the postion
var rollDiceForEveryPlayer = function (numOfDice) {
  // Number of players
  var numOfPlayers = playerObjectArray.length;
  for (var i = 0; i < numOfPlayers; i += 1) {
    // roll x amount of 6 sided dice
    var counter = 0;
    var playerDiceRoll = [];
    var playerDiceRollPosition = [];
    while (counter < numOfDice) {
      playerDiceRoll.push(rollDice());
      playerDiceRollPosition.push(counter);
      counter += 1;
    }
    // update current players dice roll
    playerObjectArray[i].diceRoll = playerDiceRoll;
    // update current players position
    playerObjectArray[i].position = playerDiceRollPosition;
  }
  console.log(playerObjectArray);
};

/* ------------------POSITION OF NUMBERS FUNCTION---------------------------- */
// FUNCTION: Manually Generate combined number
var generateCombinedNumber = function (currentPlayer, playerReorderChoice) {
  // TEST
  // var playerDiceRoll = [1,2,3,4];
  // var playerReorderChoice = "3333"
  var playerReorderChoice = playerReorderChoice.split(''); // turns playerInput into an array
  playerReorderChoice = playerReorderChoice.map(Number); // turns each of the index into a number
  // make container to put in reordered num
  var reorderedNumArray = [];
  var currentPlayerCombineNum = 0;
  var currentPlayerDiceRolls = playerObjectArray[currentPlayer].diceRoll;
  // push the relavant number into the new array
  // turn the array into a combined number
  for (var index = 0; index < currentPlayerDiceRolls.length; index += 1) {
    var newNum = currentPlayerDiceRolls[playerReorderChoice[index]];
    reorderedNumArray.push(newNum);
    currentPlayerCombineNum = currentPlayerCombineNum * 10 + newNum;
  }
  // update current players combined num
  playerObjectArray[currentPlayer].combinedNum = currentPlayerCombineNum;
  console.log(playerObjectArray[currentPlayer].combinedNum);
};

/* ------------------SENTENCE CONSTRUCTORS---------------------------- */
var statementPlayerRoll = function (playerTurn) {
  // if all players have played
  if (playerTurn > numOfPlayersInGame) {
    statementPlayerRollOutput = 'ALL PLAYERS HAVE PLAYED. SEE RESULTS BELOW!';
  } else {
    var playerNumber = playerObjectArray[playerTurn].playerNumber;
    var playerDiceRoll = playerObjectArray[playerTurn].diceRoll;
    var playerDicePosition = playerObjectArray[playerTurn].position;
    var statementPlayerRollOutput = '';
    // if last player
    if (playerTurn == numOfPlayersInGame) {
      statementPlayerRollOutput = 'FINAL PLAYER' + '<br><br>' + `Welcome player ${playerNumber}, you rolled` + '<br><br>' + `----dice: ${playerDiceRoll}` + '<br>' + `position: ${playerDicePosition}` + '<br><br>' + 'Enter the order of the positions of the numbers you want';
    }
    // from player 1 to before last player
    if (playerTurn < numOfPlayersInGame) {
      statementPlayerRollOutput = `Welcome player ${playerNumber}, you rolled` + '<br><br>' + `----dice: ${playerDiceRoll}` + '<br>' + `position: ${playerDicePosition}` + '<br><br>' + 'Enter the order of the positions of the numbers you want';
    }
  }
  // Add leader board statement
  var leaderBoardObjectArray = statementLeaderBoard();
  statementPlayerRollOutput = statementPlayerRollOutput + '<br><br>' + 'LEADERBOARD' + '<br>' + leaderBoardObjectArray;
  return statementPlayerRollOutput;
};

/* ------------------LEADERBOARD---------------------------- */
// Function that loops through the players and makes a leaderboard
// Function that loops through the objects and sorts it based on the property
var dynamicsort = function (property, order) {
  var sort_order = 1;
  if (order === 'descending') {
    sort_order = -1;
  }
  return function (a, b) {
    // if string put it at the top
    if (typeof a[property] === 'string') {
      return -1 * sort_order;
    }
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    }
    return 0 * sort_order;
  };
};
var statementLeaderBoard = function () {
  var statementLeaderBoardOutput = [];
  // clone playerObjectArray
  var leaderBoardObjectArray = [...playerObjectArray];
  // sort based on combineNum
  leaderBoardObjectArray = leaderBoardObjectArray.sort(dynamicsort('combinedNum', 'descending'));
  for (var i = 0; i < leaderBoardObjectArray.length; i += 1) {
    var getPlayerNum = leaderBoardObjectArray[i].playerNumber;
    var getComNum = leaderBoardObjectArray[i].combinedNum;
    console.log(getComNum);
    var combineSentence = `Player ${getPlayerNum} Score: ${getComNum}` + '<br>';
    statementLeaderBoardOutput.push(combineSentence);
  }
  return statementLeaderBoardOutput;
};

// Function that resets all global variables
var restartGame = function () {
  playerObjectArray = [];
  numOfPlayersInGame = 0;
  currentPlayer = 0;
  gameMode = PICK_MULTIPLAYER_MODE;
};

/* ----------------------------------------------------------- */
/* ------------------MAIN FUNCTION---------------------------- */
/* ----------------------------------------------------------- */
var main = function (input) {
  // Call input playerInput to make game logic clearer
  var playerInput = input;
  var myOutputValue = '';
  // Start game by asking player to choose number of players
  if (gameMode == PICK_MULTIPLAYER_MODE) {
    // Edit global variable numOfPlayersInGame
    numOfPlayersInGame = Number(playerInput - 1); // minus 1 to match array index that starts from 0
    // Create number of players
    createNumOfPlayers(playerInput);
    // Switch gameMode
    gameMode = CHOOSE_NUM_OF_DICE_AND_ROLL_MODE;
    myOutputValue = `We have ${playerInput} players in this game` + '<br><br>' + 'Step One:' + '<br>' + 'Choose the number of dice you want to roll';
    return myOutputValue;
  }
  if (gameMode == CHOOSE_NUM_OF_DICE_AND_ROLL_MODE) {
    // Declare how many dice to roll each round
    var numOfDice = playerInput;
    // Roll Dice for all players
    rollDiceForEveryPlayer(numOfDice);
    // Switch game mode
    gameMode = START_MULTIPLAYER_MODE;
    // ouput statement for player 1
    myOutputValue = `Everyone will be rolling ${playerInput} dice/dices` + '<br><br>' + statementPlayerRoll(currentPlayer);
    return myOutputValue;
  }
  // cycle through all players bfore moving on
  if (gameMode == START_MULTIPLAYER_MODE) {
    var playerReorder = playerInput;
    // for all players
    if (currentPlayer < numOfPlayersInGame) {
      // Ask user to enter the order of the positions of the numbers & update the object
      generateCombinedNumber(currentPlayer, playerReorder);
      // move to next player
      currentPlayer += 1;
      // print instructios for next player
      myOutputValue = statementPlayerRoll(currentPlayer);
      return myOutputValue;
    }
    // if last player
    if (currentPlayer == numOfPlayersInGame) {
      generateCombinedNumber(currentPlayer, playerReorder);
      // move to next player
      currentPlayer += 1;
      myOutputValue = statementPlayerRoll(currentPlayer) + '<br><br>' + 'Click Submit to restart!';
      // switch gameMode
      gameMode = RESTART_MODE;
      return myOutputValue;
    }
  }
  if (gameMode == RESTART_MODE) {
    // restart game
    restartGame();
    myOutputValue = 'Lets Play! Please enter number of players';
    return myOutputValue;
  }
  return myOutputValue;
};
