// https://github.com/rocketacademy/basics-beat-that

// 1. There are TWO players and players take turns.
// 2. Each player roll TWO dice

const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
const LAST_PLAYER = PLAYER_TWO;
const PLAYERS = 2;
var CURRENT_PLAYER = 0;

/**
 * playerRolls
 * An example outcome when both players throw dice
 * playerRolls =  [
 *                   [[1, 3]],
 *                  [[6, 6]]
 *                ];
 */
var playerRolls = [[], []];

/**
 * playerRollsOrderings
 * An example outcome when both players throw dice
 * playerRollsOrderings =   [
 *                            [[1, 3],[3, 1]],
 *                            [[6, 6]]
 *                          ];
 */
var playerRollsOrderings = [[], []];

/**
 * playerOrderingChoice
 * A example outcome when both players had chosen their ordering
 * playerOrderingChoice =   [
 *                            [[3, 1]],
 *                            [[6, 6]]
 *                          ];
 */
var playerOrderingChoice = [[], []];

const ACTION_ROLL = 0;
const ACTION_ORDER = 1;
const ACTION_GAME_SET = 2;

var CURRENT_ACTION = ACTION_ROLL;

var PREV_ROUND_RESULT_DESCRIPTION = "";

/** State Transition Functions */
const resetGame = function () {
  CURRENT_PLAYER = PLAYER_ONE;
  playerRolls = [[], []];
  playerRollsOrderings = [[], []];
  playerOrderingChoice = [[], []];
  PREV_ROUND_RESULT_DESCRIPTION = "";
  return "Game reset";
};
const changeAction = function (ACTION) {
  CURRENT_ACTION = ACTION;
};
const changePlayer = function () {
  CURRENT_PLAYER = (CURRENT_PLAYER + 1) % PLAYERS;
};

/* --- Helper Functions --- */

/* Dice motions */

const rollDice = function () {
  var face = 6;
  return Math.floor(Math.random() * face) + 1;
};

const generateOrderings = function (player, twoDiceValue) {
  const [val1, val2] = twoDiceValue;
  playerRollsOrderings[player].push([val1, val2]);
  if (val2 !== val1) {
    playerRollsOrderings[player].push([val2, val1]);
  }
};

const getOrderingChoiceCount = function (player) {
  return playerRollsOrderings[player].length;
};

// Check if index is in the orderings array of current player
const isValidRollOrdering = function (PLAYER, index) {
  if (!index || index == " ") {
    return false;
  }
  index = Number(index);
  if (Number.isNaN(index)) {
    return false;
  }

  let maxIndex = playerRollsOrderings[PLAYER].length;
  return 0 <= index && index < maxIndex;
};

// result number is joint list of numbers
// [1,6] => 16
const concatenatedVal = function (ordering) {
  var str = ``;
  for (let i = 0; i < ordering.length; i += 1) {
    str += `${ordering[i]}`;
  }

  var concatVal = Number(str);
  return Number(concatVal);
};

// This function should be called when all player had chosen their ordering.
const decideRoundWinner = function () {
  var max = 0;
  var PLAYER_WINNER = [];
  for (
    let playerIndex = 0;
    playerIndex < playerOrderingChoice.length;
    playerIndex++
  ) {
    var val = concatenatedVal(playerOrderingChoice[playerIndex]);
    if (val > max) {
      PLAYER_WINNER = [];
      max = val;
      PLAYER_WINNER.push(playerIndex);
    } else if (val == max) {
      PLAYER_WINNER.push(playerIndex);
    }
  }
  return PLAYER_WINNER;
};

/* Helpers to get display */
const getDisplayPrevRoundResult = function () {
  return PREV_ROUND_RESULT_DESCRIPTION;
};

const getDisplayOrdering = function (ordering) {
  var line = "";
  for (var j = 0; j < ordering.length; j++) {
    line += ordering[j];
  }
  return line;
};

const getDisplayOrderingsOfPlayer = function (playerIndex) {
  var orderings = playerRollsOrderings[playerIndex];
  var lines = "";
  for (let i = 0; i < orderings.length; i += 1) {
    var line = `[${i}]: `;
    var ordering = orderings[i];
    line += getDisplayOrdering(ordering);
    lines += line + "<br />";
  }
  return lines;
};

const displayCurrentPlayer = function (PLAYER) {
  if (PLAYER_ONE == PLAYER) {
    return "PLAYER 1";
  } else if (PLAYER_TWO == PLAYER) {
    return "PLAYER 2";
  }
};

/* Helpers to set innerHTML */
const setInputDescription = function (text) {
  HTML_G_INPUT_DESC.innerHTML = text;
};
const setButtonValue = function (text) {
  HTML_G_BUTTON.innerHTML = text;
};

var actionRoll = function () {
  playerRoll = [rollDice(), rollDice()]; // roll two dice
  playerRolls[CURRENT_PLAYER] = playerRoll; // record playerRoll in playerRolls
  generateOrderings(CURRENT_PLAYER, playerRoll); // record permutations

  changeAction(ACTION_ORDER); // next action is to choose ordering

  return (
    displayCurrentPlayer(CURRENT_PLAYER) +
    " rolled " +
    playerRolls[CURRENT_PLAYER]
  );
};

// user to supply index to the ordering of player roll
var actionOrder = function (index) {
  if (!isValidRollOrdering(CURRENT_PLAYER, index)) {
    return "Invalid choice. Please re enter";
  }

  playerOrderingChoice[CURRENT_PLAYER] =
    playerRollsOrderings[CURRENT_PLAYER][index]; // record the player choice of ordering

  var desc = `${displayCurrentPlayer(
    CURRENT_PLAYER
  )} chose ${getDisplayOrdering(playerOrderingChoice[CURRENT_PLAYER])}. `;

  if (CURRENT_PLAYER == LAST_PLAYER) {
    // A round decision can be made. Decide the winner, reset game and change the next action to RESET
    var PLAYER_WINNER = decideRoundWinner();
    var currentDisplayWinner = displayCurrentPlayer(PLAYER_WINNER);
    var resultDescription = `Winner: ${currentDisplayWinner}`;
    PREV_ROUND_RESULT_DESCRIPTION = resultDescription;

    var activityDescription = `Winner decided: ${currentDisplayWinner}`;

    desc += activityDescription;
    resetGame();
    changeAction(ACTION_GAME_SET);
  } else {
    // A round decision cannot be made. Change the next action state to ROLL and player to next player
    changeAction(ACTION_ROLL);
    changePlayer();
  }
  return desc;
};

const actionGameSet = function () {
  // game is set (winner decided) and button clicked
  CURRENT_ACTION = ACTION_ROLL; // change the next action to ROLL.
  return "";
};
/**
 *  Main - On Button Click
 *
 *  Does some action based on current action state. actionXX(...) will execute
 *  its logic and determine the next action state (remain or change, if any).
 *
 *  nextRender(...) render the output elements to the webpage for the next action state (waiting for next click)
 *
 * */
var main = function () {
  var result = "";
  if (CURRENT_ACTION == ACTION_ROLL) {
    result += actionRoll();
  } else if (CURRENT_ACTION == ACTION_ORDER) {
    result += actionOrder(HTML_G_INPUT_FIELD.value);
  } else if (CURRENT_ACTION == ACTION_GAME_SET) {
    result += actionGameSet();
  }
  nextRender(result);
};

// nextRender should be called AFTER the next action state has been updated.
var nextRender = function (result) {
  console.group();
  HTML_G_INPUT_FIELD.value = "";
  HTML_G_OUTPUT_DESCRIPTION.innerHTML = result;

  if (CURRENT_ACTION == ACTION_ROLL) {
    setInputDescription(
      displayCurrentPlayer(CURRENT_PLAYER) + "<br />" + "Roll your dice!"
    );
    setButtonValue("ROLL");
    appendToParagraph(
      HTML_G_INPUT_DESC,
      HTML_G_BUTTON,
      HTML_G_OUTPUT_DESCRIPTION
    );
  } else if (CURRENT_ACTION == ACTION_ORDER) {
    const orderingChoiceCount = getOrderingChoiceCount(CURRENT_PLAYER);
    setInputDescription(
      displayCurrentPlayer(CURRENT_PLAYER) +
        "<br />" +
        "You've rolled: " +
        playerRolls[CURRENT_PLAYER] +
        "<br /> Choose order [index] <br />" +
        getDisplayOrderingsOfPlayer(CURRENT_PLAYER)
    );
    if (orderingChoiceCount === 1) {
      appendToParagraph(
        HTML_G_INPUT_DESC,
        HTML_G_BUTTON,
        HTML_G_OUTPUT_DESCRIPTION
      );
      setButtonValue("SELECT ORDER [0]");
    } else {
      appendToParagraph(
        HTML_G_INPUT_DESC,
        HTML_G_INPUT_FIELD,
        HTML_G_BUTTON,
        HTML_G_OUTPUT_DESCRIPTION
      );
      setButtonValue("SELECT ORDER");
    }
  } else if (CURRENT_ACTION == ACTION_GAME_SET) {
    setInputDescription(getDisplayPrevRoundResult());
    appendToParagraph(
      HTML_G_INPUT_DESC,
      HTML_G_BUTTON,
      HTML_G_OUTPUT_DESCRIPTION
    );
    setButtonValue("PLAY AGAIN");
  }
  console.groupEnd();
};

var initializeDisplay = function () {
  nextRender("");
};
initializeDisplay();
