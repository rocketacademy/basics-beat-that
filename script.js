const CHOOSE_MODE = 'choose mode';
const DEFAULT = 'd';
const DEFAULT_PLAYER_1_ROLL_DICE = 'dp1rd';
const DEFAULT_PLAYER1_CHOOSE_ORDER = 'dp1co';
const DEFAULT_PLAYER_2_ROLL_DICE = 'dp2rd';
const DEFAULT_PLAYER2_CHOOSE_ORDER = 'dp2co';
const DEFAULT_RESULT = 'dr';
const DEFAULT_NUMBER_OF_DICE = 2;
const PLAYER_1 = 'Player 1';
const PLAYER_2 = 'Player 2';
const DEFAULT_DICE_1 = '1';
const DEFAULT_DICE_2 = '2';

const VARIABLE = 'v';
const VARIABLE_CHOOSE_NUMBER_OF_PLAYERS = 'variable choose number of players';
const VARIABLE_CHOOSE_NUMBER_OF_DICE = 'variable choose number of dice';
const VARIABLE_START = 'variable start';
const VARIABLE_RESULT = 'variable result';
const VARIABLE_CHOOSE_ORDER = 'variable choose order';
const RESTART = 'r';

var numberOfPlayers;
var numberOfDice;
var currentPlayer = 0;
var listOfPlayers = [];
var playersDiceRolls = [];
var playersNumbers = [];
var gameMode;
var playersScores = [];
var currentResult;

var currentMode = CHOOSE_MODE;
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1Number;
var player2Number;
var player1Score = 0;
var player2Score = 0;

var chooseMode = function (mode) {
  var output;
  switch (mode) {
    case DEFAULT:
      currentMode = DEFAULT_PLAYER_1_ROLL_DICE;
      gameMode = DEFAULT;
      output = `You have chosen default mode. Please click "submit" to start ${PLAYER_1}'s turn.`;
      break;
    case VARIABLE:
      currentMode = VARIABLE_CHOOSE_NUMBER_OF_PLAYERS;
      gameMode = VARIABLE;
      output = 'You have chosen variable mode. Please enter number of players.';
      break;
    default:
      output = `Please enter "${DEFAULT}" for default mode or "${VARIABLE}" for variable mode.`;
      break;
  }
  return output;
};

var calculateHighestNumber = function (diceRolls) {
  var diceRollsSorted = diceRolls.slice().sort((a, b) => b - a);
  var number = parseInt(diceRollsSorted.join(''));
  return number;
};

var rollDice = function (noOfDice) {
  var diceRolls = [];
  var index = 0;
  while (index < noOfDice) {
    var randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    diceRolls.push(randomDiceNumber);
    index += 1;
  }
  return diceRolls;
};

var displayOutputForDefault = function (player, diceRolls) {
  var output = `Welcome ${player}.<br>
   You rolled Die 1: ${diceRolls[0]} and Die 2: ${diceRolls[1]}. <br>
   Choose the order of the dice. <br>
   Enter "${DEFAULT_DICE_1}" to choose Die 1 as the first die <br>
   and "${DEFAULT_DICE_2}" to choose Die 2 as first die <br><br>
   Leave it blank to let <br> the computer calculate the best<br> order automatically.`;
  return output;
};

var displayOutputForVariable = function (player, diceRolls) {
  var output = `Welcome ${player}.<br>
   You rolled Die 1: ${diceRolls[0]} <br>`;
  var index = 1;
  while (index < diceRolls.length) {
    output += `and Die ${index + 1}: ${diceRolls[index]}. <br>`;
    index += 1;
  }
  output += 'Choose the order of the dice. <br><br> Leave it blank to let <br> the computer calculate the best<br> order automatically.';
  return output;
};

var chooseOrderOfDiceForDefault = function (player, order) {
  var output;
  if (order != DEFAULT_DICE_1 && order != DEFAULT_DICE_2 && order != '') {
    if (player == PLAYER_1) {
      output = displayOutputForDefault(PLAYER_1, player1DiceRolls);
    } else if (player == PLAYER_2) {
      output = displayOutputForDefault(PLAYER_2, player2DiceRolls);
    }
  } else if (player == PLAYER_1) {
    if (order == DEFAULT_DICE_1) {
      player1Number = player1DiceRolls[0] * 10 + player1DiceRolls[1];
    } else if (order == DEFAULT_DICE_2) {
      player1Number = player1DiceRolls[1] * 10 + player1DiceRolls[0];
    } else if (order == '') {
      player1Number = calculateHighestNumber(player1DiceRolls);
    }
    currentMode = DEFAULT_PLAYER_2_ROLL_DICE;
    output = `${PLAYER_1}'s number is ${player1Number}. Click submit to start ${PLAYER_2}'s turn.`;
  } else if (player == PLAYER_2) {
    if (order == DEFAULT_DICE_1) {
      player2Number = player2DiceRolls[0] * 10 + player2DiceRolls[1];
    } else if (order == DEFAULT_DICE_2) {
      player2Number = player2DiceRolls[1] * 10 + player2DiceRolls[0];
    } else if (order == '') {
      player2Number = calculateHighestNumber(player2DiceRolls);
    }
    currentMode = DEFAULT_RESULT;
    output = `${PLAYER_2}'s number is ${player2Number}. Click submit to show the result.`;
  }
  return output;
};

var displayResultForDefault = function () {
  var output = `${PLAYER_1}'s number is ${player1Number} and ${PLAYER_2}'s number is ${player2Number}. <br>`;
  if (player2Number > player1Number) {
    player2Score += 1;
    output += `${PLAYER_2} won!`;
  } else if (player1Number > player2Number) {
    player1Score += 1;
    output += `${PLAYER_1} won!`;
  } else {
    output += 'It\'s a tie!';
  }
  output += `<br> The current score: <br> ${PLAYER_1}: ${player1Score}<br>${PLAYER_2}: ${player2Score}<br> 
  Enter "${RESTART}" to restart the game.`;
  currentMode = RESTART;
  return output;
};

var setupScore = function (noOfPlayers) {
  var index = 0;
  while (index < noOfPlayers) {
    playersScores.push(0);
    index += 1;
  }
};

var increaseScore = function (player) {
  playersScores[player] += 1;
};

var chooseNumberOfPlayers = function (noOfPlayers) {
  var output;
  if (!isNaN(noOfPlayers) && noOfPlayers > 1) {
    setupScore(noOfPlayers);
    numberOfPlayers = noOfPlayers;
    output = `There will be ${numberOfPlayers} players in this game. Please enter number of dice to use for the game.`;
    var index = 0;
    var player = 'Player ';
    while (index < numberOfPlayers) {
      var playerName = player + index;
      listOfPlayers.push(playerName);
      index += 1;
    }
    currentMode = VARIABLE_CHOOSE_NUMBER_OF_DICE;
  } else {
    output = 'Please enter a valid number of players';
  }

  return output;
};

var chooseNumberOfDice = function (noOfDice) {
  var output;
  if (!isNaN(noOfDice) && noOfDice > 1) {
    output = `There will be ${noOfDice} dice used in this game. Click submit to start ${PLAYER_1}'s turn.`;
    numberOfDice = noOfDice;
    currentMode = VARIABLE_START;
  } else {
    output = 'Please enter a valid number of dice';
  }
  return output;
};

var isDiceOrderCorrect = function (orderArray) {
  var isDiceOrderCorrectBoolean = true;
  if (orderArray.length > numberOfDice || orderArray.length == 0
    || orderArray.length < numberOfDice) {
    isDiceOrderCorrectBoolean = false;
  }
  var index = 0;
  while (index < orderArray.length) {
    if (orderArray[index] > numberOfDice || orderArray[index] < 0 || isNaN(orderArray[index])) {
      isDiceOrderCorrectBoolean = false;
    }
    index += 1;
  }
  var orderSet = new Set();
  var i = 0;
  while (i < orderArray.length - 1) {
    orderSet.add(orderArray[i]);
    if (orderSet.has(orderArray[i + 1])) {
      isDiceOrderCorrectBoolean = false;
      break;
    }
    i += 1;
  }
  return isDiceOrderCorrectBoolean;
};

var calcuateNumberForPlayer = function (player, orderArray) {
  var number = 0;
  var diceRoll = playersDiceRolls[player];
  var index = orderArray.length - 1;
  while (index > 0) {
    var i = 0;
    while (i < orderArray.length) {
      number += diceRoll[orderArray[i] - 1] * 10 ** index;
      i += 1;
      index -= 1;
    }
  }
  console.log('Dice Roll', diceRoll);
  console.log('Number', number);
  return number;
};

var chooseOrderOfDice = function (player, order) {
  var orderArray = order.split('');
  var output;
  var isDOCorrect = isDiceOrderCorrect(orderArray);
  if (order == '') {
    isDOCorrect = true;
  }
  if (isDOCorrect) {
    // calcuateNumber
    var number;
    if (order == '') {
      number = calculateHighestNumber(playersDiceRolls[player]);
    } else {
      number = calcuateNumberForPlayer(player, orderArray);
    }
    playersNumbers.push(number);
    output = `You are player ${currentPlayer + 1} and your number is ${number}`;
    if (currentPlayer + 1 < numberOfPlayers) {
      output += `<br> Click submit to start player ${currentPlayer + 2}'s turn.`;
      currentPlayer += 1;
      currentMode = VARIABLE_START;
    } else {
      currentMode = VARIABLE_RESULT;
      output += '<br> The game has ended. Click submit to see the results';
    }
  } else {
    var playerName = `Player ${player + 1}`;
    output = displayOutputForVariable(playerName, playersDiceRolls[player]) + '<br><br>Please enter correct order of dice or leave it blank.';
  }
  return output;
};

var displayResultForVariable = function () {
  var output = 'These are the players\' numbers:<br>';
  var index = 0;
  while (index < numberOfPlayers) {
    output += `Player ${index + 1}: ${playersNumbers[index]}<br>`;
    index += 1;
  }
  // TODO: check for tie
  var maxValuePlayer = playersNumbers.indexOf(Math.max(...playersNumbers));
  output += `Player ${maxValuePlayer + 1} won the game!<br>`;
  increaseScore(maxValuePlayer);
  output += 'The current score is as follows: <br>';
  var i = 0;
  while (i < numberOfPlayers) {
    output += `Player ${i + 1}: ${playersScores[i]}<br>`;
    i += 1;
  }
  output += `Enter "${RESTART}" to restart the game`;
  currentMode = RESTART;
  return output;
};

var restartGame = function () {
  var output;
  if (gameMode == VARIABLE) {
    playersDiceRolls = [];
    playersNumbers = [];
    currentPlayer = 0;
    currentMode = VARIABLE_START;
  } else if (gameMode == DEFAULT) {
    numberOfPlayers = 2;
    numberOfDice = 2;
    player1DiceRolls = [];
    player2DiceRolls = [];
    player1Number = 0;
    player2Number = 0;
    currentMode = DEFAULT_PLAYER_1_ROLL_DICE;
  }
  output = `The number of players is ${numberOfPlayers} and the number of dice is ${numberOfDice}. Click sumbit to start the game.`;
  return output;
};

var main = function (input) {
  var myOutputValue;
  switch (currentMode) {
    case CHOOSE_MODE:
      myOutputValue = chooseMode(input);
      break;
    case DEFAULT_PLAYER_1_ROLL_DICE:
      // roll dice and store rolls
      player1DiceRolls = rollDice(DEFAULT_NUMBER_OF_DICE);
      myOutputValue = displayOutputForDefault(PLAYER_1, player1DiceRolls);
      currentMode = DEFAULT_PLAYER1_CHOOSE_ORDER;
      break;
    case DEFAULT_PLAYER1_CHOOSE_ORDER:
      // choose order and store number
      myOutputValue = chooseOrderOfDiceForDefault(PLAYER_1, input);
      break;
    case DEFAULT_PLAYER_2_ROLL_DICE:
      // roll dice and store rolls
      player2DiceRolls = rollDice(DEFAULT_NUMBER_OF_DICE);
      myOutputValue = displayOutputForDefault(PLAYER_2, player2DiceRolls);
      currentMode = DEFAULT_PLAYER2_CHOOSE_ORDER;
      break;
    case DEFAULT_PLAYER2_CHOOSE_ORDER:
      // choose order and store number
      myOutputValue = chooseOrderOfDiceForDefault(PLAYER_2, input);
      break;
    case DEFAULT_RESULT:
      // compare values and show result
      currentResult = displayResultForDefault();
      myOutputValue = currentResult;
      break;
    case VARIABLE_CHOOSE_NUMBER_OF_PLAYERS:
      // choose number of players
      myOutputValue = chooseNumberOfPlayers(input);
      break;
    case VARIABLE_CHOOSE_NUMBER_OF_DICE:
      // choose number of dice
      myOutputValue = chooseNumberOfDice(input);
      break;
    case VARIABLE_START:
      // roll dice for player and store result
      playersDiceRolls.push(rollDice(numberOfDice));
      myOutputValue = displayOutputForVariable(`Player ${currentPlayer + 1}`,
        playersDiceRolls[currentPlayer]);
      currentMode = VARIABLE_CHOOSE_ORDER;
      break;
    case VARIABLE_CHOOSE_ORDER:
      // choose order and store number
      myOutputValue = chooseOrderOfDice(currentPlayer, input);
      break;
    case VARIABLE_RESULT:
      // compare values and show result
      currentResult = displayResultForVariable();
      myOutputValue = currentResult;
      break;
    case RESTART:
      if (input == RESTART) {
        currentResult = '';
        myOutputValue = restartGame();
      } else {
        myOutputValue = currentResult;
      }
      break;
    default:
      break;
  }
  return myOutputValue;
};
