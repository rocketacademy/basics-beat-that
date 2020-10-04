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

var currentMode = CHOOSE_MODE;
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1Number;
var player2Number;

var chooseMode = function (mode) {
  var output;
  if (mode == DEFAULT) {
    currentMode = DEFAULT_PLAYER_1_ROLL_DICE;
    output = `You have chosen default mode. Please click "submit" to start ${PLAYER_1}'s turn.`;
  } else {
    output = `Please enter "${DEFAULT}" for default mode.`;
  }
  return output;
};

var rollDice = function (numberOfDice) {
  var diceRolls = [];
  var index = 0;
  while (index < numberOfDice) {
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
   and "${DEFAULT_DICE_2}" to choose Die 2 as first die;`;
  return output;
};

var chooseOrderOfDiceForDefault = function (player, order) {
  var output;
  if (order != DEFAULT_DICE_1 && order != DEFAULT_DICE_2) {
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
    }
    currentMode = DEFAULT_PLAYER_2_ROLL_DICE;
    output = `Click submit to start ${PLAYER_2}'s turn.`;
  } else if (player == PLAYER_2) {
    if (order == DEFAULT_DICE_1) {
      player2Number = player2DiceRolls[0] * 10 + player2DiceRolls[1];
    } else if (order == DEFAULT_DICE_2) {
      player2Number = player2DiceRolls[1] * 10 + player2DiceRolls[0];
    }
    currentMode = DEFAULT_RESULT;
    output = 'Click submit to show the result.';
  }
  return output;
};

var displayResultForDefault = function () {
  var output = `${PLAYER_1}'s number is ${player1Number} and ${PLAYER_2}'s number is ${player2Number}. <br>`;
  if (player2Number > player1Number) {
    output += `${PLAYER_2} won!`;
  } else if (player1Number > player2Number) {
    output += `${PLAYER_1} won!`;
  } else {
    output += 'It\'s a tie!';
  }
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
      myOutputValue = displayResultForDefault();
      break;
    default:
      break;
  }
  return myOutputValue;
};
