// https://basics.rocketacademy.co/6-arrays-and-iteration/9.3-loops-with-arrays

// 1. There are TWO players and players take turns.
// 2. Each player roll TWO dice

const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
const LAST_PLAYER = PLAYER_TWO;
const PLAYERS = 2;
var CURRENT_PLAYER = 0;

var playerRolls = [[], []]; // initialize for player one and two
var playerRollsOrdering = [[], []];
var playerRollChoice = [[], []];

const ACTION_ROLL = 0;
const ACTION_ORDER = 1;
const ACTION_GAME_TALLY = 2;

var CURRENT_ACTION = ACTION_ROLL;

const displayResult = function () {
  return RESULT_DESCRIPTION;
};

var RESULT_DESCRIPTION = "";
const resetGame = function () {
  CURRENT_PLAYER = 0;
  playerRolls = [[], []];
  playerRollsOrdering = [[], []];
  playerRollChoice = [[], []];
  CURRENT_ACTION = ACTION_ROLL;
  RESULT_DESCRIPTION = "";
  return "Game reset";
};
const generateOrderings = function (PLAYER, twoDiceValue) {
  const [val1, val2] = twoDiceValue;
  playerRollsOrdering[PLAYER].push([val1, val2]);
  playerRollsOrdering[PLAYER].push([val2, val1]);
};

const displayOrderings = function (orderings) {
  var lines = "";

  for (let i = 0; i < orderings.length; i += 1) {
    var line = `[${i}]: `;

    var ordering = orderings[i];
    line += displayOrdering(ordering);

    lines += line + "<br />";
  }
  return lines;
};

const displayOrdering = function (ordering) {
  var line = "";
  for (var j = 0; j < ordering.length; j++) {
    line += ordering[j];
  }
  return line;
};

const rollDice = function () {
  var face = 6;
  return Math.floor(Math.random() * face) + 1;
};
const changeAction = function (ACTION) {
  console.log("changing action");
  CURRENT_ACTION = ACTION;
};

const displayCurrentPlayer = function (PLAYER) {
  if (PLAYER_ONE == PLAYER) {
    return "PLAYER 1";
  } else if (PLAYER_TWO == PLAYER) {
    return "PLAYER 2";
  }
};
const setInputDescription = function (text) {
  HTML_G_INPUT_DESC.innerHTML = text;
};
const setButtonValue = function (text) {
  HTML_G_BUTTON.innerHTML = text;
};
var roll = function () {
  playerRoll = [rollDice(), rollDice()];
  playerRolls[CURRENT_PLAYER] = playerRoll;
  generateOrderings(CURRENT_PLAYER, playerRoll);
  changeAction(ACTION_ORDER);

  return (
    displayCurrentPlayer(CURRENT_PLAYER) +
    " rolled " +
    playerRolls[CURRENT_PLAYER]
  );
};

const changePlayer = function () {
  CURRENT_PLAYER = (CURRENT_PLAYER + 1) % PLAYERS;
};

const isValidRollOrdering = function (PLAYER, index) {
  index = Number(index);
  if (Number.isNaN(index)) {
    return false;
  }

  let maxIndex = playerRollsOrdering[PLAYER].length;

  return 0 <= index && index < maxIndex;
};

const concatenatedVal = function (ordering) {
  var str = ``;
  for (let i = 0; i < ordering.length; i += 1) {
    str += `${ordering[i]}`;
  }

  var concatVal = Number(str);
  return Number(concatVal);
};
const decide = function () {
  var max = 0;
  var PLAYER_WINNER = [];
  for (
    let playerIndex = 0;
    playerIndex < playerRollChoice.length;
    playerIndex++
  ) {
    var val = concatenatedVal(playerRollChoice[playerIndex]);
    if (val > max) {
      PLAYER_WINNER = [];
      max = val;
      PLAYER_WINNER.push(playerIndex);
      console.log("deciding ... > " + PLAYER_WINNER);
    } else if (val == max) {
      PLAYER_WINNER.push(playerIndex);
      console.log(max + "deciding ... == " + PLAYER_WINNER);
    }
  }

  return PLAYER_WINNER;
};
var order = function (index) {
  if (!index || index == " " || !isValidRollOrdering(CURRENT_PLAYER, index)) {
    return "Invalid choice. Please re enter";
  }
  playerRollChoice[CURRENT_PLAYER] = playerRollsOrdering[CURRENT_PLAYER][index];

  var desc = `${displayCurrentPlayer(CURRENT_PLAYER)} chose ${displayOrdering(
    playerRollChoice[CURRENT_PLAYER]
  )}. `;
  if (CURRENT_PLAYER == LAST_PLAYER) {
    var PLAYER_WINNER = decide();
    console.log(playerRollChoice);
    var currentDisplayWinner = displayCurrentPlayer(PLAYER_WINNER);
    var resultDescription = `Winner: ${currentDisplayWinner}`;

    RESULT_DESCRIPTION = resultDescription;

    var activityDescription = `Winner decided: ${currentDisplayWinner}`;

    desc += activityDescription;
    changeAction(ACTION_GAME_TALLY);
    changePlayer();
  } else {
    changeAction(ACTION_ROLL);
    changePlayer();
  }
  return desc;
};

var main = function () {
  console.log(CURRENT_ACTION + "CURRENT_ACTION");

  var desc = "";
  if (CURRENT_ACTION == ACTION_ROLL) {
    desc = roll();
  } else if (CURRENT_ACTION == ACTION_ORDER) {
    desc = order(HTML_G_INPUT_FIELD.value);
  } else if (CURRENT_ACTION == ACTION_GAME_TALLY) {
    desc = resetGame();
  }

  nextRender(desc);
  return `Previous activity: ` + desc;
};

var nextRender = function (result = "") {
  console.log("rendering action" + CURRENT_ACTION);
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
    setInputDescription(
      displayCurrentPlayer(CURRENT_PLAYER) +
        "<br />" +
        "You've rolled: " +
        playerRolls[CURRENT_PLAYER] +
        "<br /> Choose order <br />" +
        displayOrderings(playerRollsOrdering[CURRENT_PLAYER])
    );

    appendToParagraph(
      HTML_G_INPUT_DESC,
      HTML_G_INPUT_FIELD,
      HTML_G_BUTTON,
      HTML_G_OUTPUT_DESCRIPTION
    );

    setButtonValue("SELECT ORDER");
  } else if (CURRENT_ACTION == ACTION_GAME_TALLY) {
    setInputDescription(displayResult());
    appendToParagraph(
      HTML_G_INPUT_DESC,
      HTML_G_BUTTON,
      HTML_G_OUTPUT_DESCRIPTION
    );
    setButtonValue("RESET");
  }
};

var initializeDisplay = function () {
  nextRender();
};

initializeDisplay();
