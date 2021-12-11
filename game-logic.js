// https://github.com/rocketacademy/basics-beat-that

// 1. There are TWO players and players take turns.
// 2. Each player roll TWO dice

const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
const LAST_PLAYER = PLAYER_TWO;
const PLAYERS = 2;
var CURRENT_PLAYER = 0;

const PLAYER_WIN_COUNT = [0, 0];
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
 * playersRollsOrderings
 * An example outcome when both players throw dice
 * playersRollsOrderings =   [
 *                            [[1, 3],[3, 1]],
 *                            [[6, 6]]
 *                          ];
 */
var playersRollsOrderings = [[], []];

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
  playersRollsOrderings = [[], []];
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

const rollDie = function () {
  var face = 6;
  return Math.floor(Math.random() * face) + 1;
};

// Permutations
const generateOrderings = function (player, twoDiceValue) {
  const [val1, val2] = twoDiceValue;
  playersRollsOrderings[player].push([val1, val2]);
  if (val2 !== val1) {
    playersRollsOrderings[player].push([val2, val1]);
  }
};

// How many choices does the player have?
const getOrderingChoiceCount = function (player) {
  return playersRollsOrderings[player].length;
};

// Check if index is in the orderings array of current player
const isValidRollOrdering = function (PLAYER, index) {
  if (
    index === undefined ||
    index === null ||
    playersRollsOrderings[index] == undefined
  ) {
    return false;
  }
  index = Number(index);
  if (Number.isNaN(index)) {
    return false;
  }

  let maxIndex = playersRollsOrderings[PLAYER].length;
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
  PLAYER_WIN_COUNT[PLAYER_WINNER] += 1;
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
  var orderings = playersRollsOrderings[playerIndex];
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

/**
 *          Player 1    Player 2
 *  Roll     3            2
 *  Choice    1           1
 */

const generateRoundStatisticsTable = function () {
  var table = document.createElement("table");
  table.className += ` flex-table`;
  var headerRow = table.insertRow();
  headerRow.insertCell().innerHTML = "#(Total Wins W): ";
  for (let playerIndex = 0; playerIndex < PLAYERS; playerIndex++) {
    headerRow.insertCell().innerHTML = `${displayCurrentPlayer(
      playerIndex
    )}  (${PLAYER_WIN_COUNT[playerIndex]})`;
  }

  var rollRow = table.insertRow();
  rollRow.insertCell().innerHTML = "Roll: ";
  for (let playerIndex = 0; playerIndex < PLAYERS; playerIndex++) {
    rollRow.insertCell().innerHTML = playerRolls[playerIndex];
  }

  var choiceOfOrderingRow = table.insertRow();
  choiceOfOrderingRow.insertCell().innerHTML = "Choice: ";
  for (let playerIndex = 0; playerIndex < PLAYERS; playerIndex++) {
    choiceOfOrderingRow.insertCell().innerHTML =
      playerOrderingChoice[playerIndex];
  }

  return table;
};

/* Helpers to set innerHTML */
const setInputDescription = function (text) {
  HTML_G_INPUT_DESC.innerHTML = text;
};
const setButtonValue = function (text) {
  HTML_G_BUTTON.innerHTML = text;
};

/* Main Action */

var actionRoll = function () {
  playerRoll = [rollDie(), rollDie()]; // roll two dice
  playerRolls[CURRENT_PLAYER] = playerRoll; // record playerRoll in playerRolls
  generateOrderings(CURRENT_PLAYER, playerRoll); // record permutations

  changeAction(ACTION_ORDER); // next action is to choose ordering

  return (
    displayCurrentPlayer(CURRENT_PLAYER) +
    " rolled " +
    playerRolls[CURRENT_PLAYER]
  );
};

// user to supply index to the orderings of player roll
var actionOrder = function (index) {
  if (!isValidRollOrdering(CURRENT_PLAYER, index)) {
    return `Invalid choice "${index}". Please re-enter`;
  }
  index = Number(index);
  playerOrderingChoice[CURRENT_PLAYER] =
    playersRollsOrderings[CURRENT_PLAYER][index]; // record the player choice of ordering

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
  resetGame();
  CURRENT_ACTION = ACTION_ROLL; // change the next action to ROLL.
  return "";
};
/**
 *  Main - On Button Click
 *
 *  Does some action based on current action state. actionXX(...) will execute
 *  its logic and determine the next action state (remain or change, if any).
 *
 *  nextRenderParagraphXX(...) render output elements of paragraph to the webpage for the next action state (waiting for next click)
 *
 * */
var main = function () {
  var result = ``;
  if (CURRENT_ACTION == ACTION_ROLL) {
    result += `Previous activity: ${actionRoll()}`;
  } else if (CURRENT_ACTION == ACTION_ORDER) {
    var orderingChoiceCount = getOrderingChoiceCount(CURRENT_PLAYER);
    var firstElementIndex = 0;
    var value =
      orderingChoiceCount === 1 ? firstElementIndex : HTML_G_INPUT_FIELD.value; // if there isn't a real choice, ignore user input and set value to first index
    result += `Previous activity: ${actionOrder(value)}`;
  } else if (CURRENT_ACTION == ACTION_GAME_SET) {
    result += actionGameSet();
  }
  nextRenderParagraphMain(result);
  nextRenderParagraphRound();
};

// nextRenderParagraphMain should be called AFTER the next action state has been updated.
var nextRenderParagraphMain = function (result) {
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
        "<br /> Choose ORDER [index] <br />" +
        getDisplayOrderingsOfPlayer(CURRENT_PLAYER)
    );
    if (orderingChoiceCount === 1) {
      // one choice only
      setButtonValue("ORDER [0]");
      appendToParagraph(
        HTML_G_INPUT_DESC,
        HTML_G_BUTTON,
        HTML_G_OUTPUT_DESCRIPTION
      );
    } else {
      setButtonValue("ORDER");
      appendToParagraph(
        HTML_G_INPUT_DESC,
        wrapInDiv(HTML_G_BUTTON, HTML_G_INPUT_FIELD),
        HTML_G_OUTPUT_DESCRIPTION
      );
    }
  } else if (CURRENT_ACTION == ACTION_GAME_SET) {
    setInputDescription(getDisplayPrevRoundResult());
    setButtonValue("PLAY AGAIN");
    appendToParagraph(
      HTML_G_INPUT_DESC,
      HTML_G_BUTTON,
      HTML_G_OUTPUT_DESCRIPTION
    );
  }
  console.groupEnd();
};

const nextRenderParagraphRound = function () {
  appendToParagraphStatisticsRound(wrapInDiv(generateRoundStatisticsTable()));
};
var initializeDisplay = function () {
  nextRenderParagraphMain("");
  nextRenderParagraphRound();
};
initializeDisplay();
