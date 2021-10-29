// more comfortable features included:
// Score, Leaderboard, Lowest Combined Mode, Auto-Generate Mode, Variable Number of Dice
// Score and Leaderboard are generated for every game, BUT Leaderboard is not sorted
// v-Dice only works with auto, score calculation is broken if not flagged
// all modified modes are activated with modifier flags
// multiple flags can be used at a time (see below)
// v-Players framework exists, but is not implemented
// knockout is completely not implemented

// variables for MVP- 2 player manual
var activePlayer = 1;
var currentGameProgressMode = "initializing";
var currentPlayerArray = [0, 0];
var currentScore = 0;
var scoreArray = [[], []];
// ^this is meant to be a nested array - index 0 corresponds to player 1's scores, etc.
// initialize later in main
var progressNumber = 0; // incremented through player turns until a round is complete
const validCommands = ["start", "Roll", "dice 1", "dice 2", "next"];
// ^ modes must be applied with "--" modifiers, e.g. --lowestCombined
// a full command might look like start --auto

// variables for MC - modifiers
var scoringModeIsHighest = true;
var diceChoiceSelectionSkip = false;
var numberOfPlayers = 2; // default
var numberOfDice = 2; // default
const modifierMessages = [
  "You have applied the 'lowestCombined' modifier. For this game, the player with the smaller number wins each round.<br>",
  "You have applied the 'auto' modifier. The best combination for your chosen scoring rules will always be applied.<br>",
  "You have applied the 'vDice' modifier. Note that you MUST use this modifier with the 'auto' modifier.<br>",
  "You have entered an invalid modifier. Only --lowestCombined, --auto, and --vDiceN are accepted. Please try again.<br>",
];

var validateInput = function (input) {
  var parsedInput = "";
  if (input.includes("dice") || input.includes(" ") == false) {
    parsedInput = input;
  } else if (input.includes(" ") == true) {
    parsedInput = input.substr(0, input.indexOf(" "));
    // check only substring before the first space
  }
  // console.log(`parsedInput: ${parsedInput}`);
  if (validCommands.includes(parsedInput)) {
    return true;
  }
  // console.log(input);
  // console.log("Invalid Input.");
  return false;
};

var createArrayFromString = function (str) {
  var arr = str.split(" ");
  var removedElement = arr.shift(); // remove the first entry, which should ALWAYS be "start"
  console.log(`removed ${removedElement}`);
  return arr;
};

var parseVariableDiceModifier = function (vdicemdf) {
  // vdicemdf should take the form "--vdiceX", where X is an integer
  // the "--vdice" substring occupies the 0th position to the 6th position
  var customNumberOfDice = vdicemdf.substring(7); // remove "--vdice" and read remaining numbers
  customNumberOfDice = Number(customNumberOfDice);
  numberOfDice = customNumberOfDice;
};

var applyModifiers = function (mdf) {
  // cognitive complexity 7
  console.log(`Player entered: ${mdf}`);
  var startMessage = "Hello Player 1! <br><br>";
  var modifiersArray = createArrayFromString(mdf);
  if (modifiersArray.length == 0) {
    startMessage +=
      "No modifiers will be applied. The player with the larger number wins each round.<br>";
  }
  // loop over array of modifiers
  for (var mod = 0; mod < modifiersArray.length; mod += 1) {
    if (modifiersArray[mod] == "--lowestCombined") {
      // console.log("LC included");
      scoringModeIsHighest = false;
      startMessage += modifierMessages[0];
    } else if (modifiersArray[mod] == "--auto") {
      // console.log("auto included");
      diceChoiceSelectionSkip = true;
      startMessage += modifierMessages[1];
    } else if (modifiersArray[mod].includes("--vDice")) {
      parseVariableDiceModifier(modifiersArray[mod]);
      startMessage += modifierMessages[2];
    } else {
      currentGameProgressMode = "initializing";
      startMessage = modifierMessages[3];
      return startMessage;
    }
  }
  startMessage += "<br><br>Enter 'Roll' to start your turn!";
  return startMessage;
};

var initializeScoreArray = function () {
  scoreArray = [];
  for (var i = 1; i <= numberOfPlayers; i += 1) {
    scoreArray.push([]); // create new nested array for every player
  }
  return scoreArray;
};

var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var rollAllDice = function () {
  for (var i = 0; i <= numberOfDice; i += 1) {
    currentPlayerArray[i] = rollDice();
  }
};

var sortArray = function (arr) {
  if (scoringModeIsHighest == true) {
    arr.sort((a, b) => b - a);
  } else {
    arr.sort((a, b) => a - b); // ascending order for lowest possible
  }
  return arr;
};

var concatenateNumbersFromArray = function (arr) {
  var numString = "";
  for (var i = 0; i < arr.length; i += 1) {
    numString += arr[i];
  }
  numString = Number(numString);
  return numString;
};

var playerTurnRoll = function (playerNumber) {
  rollAllDice();
  var returnString = `It is now Player ${playerNumber}'s turn. <br>`;
  // console.log(`Rolled ${currentPlayerArray[0]} and ${currentPlayerArray[1]}`);
  if (diceChoiceSelectionSkip == false) {
    returnString += `
    You rolled ${currentPlayerArray[0]} for Dice 1, and  ${currentPlayerArray[1]} for Dice 2. <br>
    Choose the order of the dice - enter 'dice 1' or 'dice 2'`;
  } else {
    returnString +=
      "Auto Mode is enabled. Please enter 'dice 1' or 'dice 2' to continue.";
  }
  return returnString;
};

var concatenateTwoNumbers = function (num1, num2) {
  var combinedNumbers = num1.toString() + num2.toString();
  combinedNumbers = Number(combinedNumbers);
  return combinedNumbers;
};

var calcPlayerScore = function (firstNumeralSelection) {
  if (firstNumeralSelection == "dice 1") {
    currentScore = concatenateTwoNumbers(
      currentPlayerArray[0],

      currentPlayerArray[1]
    );
  } else if (firstNumeralSelection == "dice 2") {
    currentScore = concatenateTwoNumbers(
      currentPlayerArray[1],
      currentPlayerArray[0]
    );
  }
  return currentScore;
};

var writePlayerScore = function () {
  console.log(scoreArray);
  var index = activePlayer - 1;
  console.log(`currentScore: ${currentScore}`);
  scoreArray[index].push(currentScore);
  // console.log(`Score Array for Player ${activePlayer}: ${scoreArray[index]}`);
  // console.log("Score recorded.");
};

var generateBestScoreAutomatically = function () {
  sortArray(currentPlayerArray);
  var bestScore = concatenateNumbersFromArray(currentPlayerArray);
  return bestScore;
};

var playerTurnSelection = function (input) {
  var returnstring = `Player ${activePlayer}, `;
  if (diceChoiceSelectionSkip == true) {
    // auto mode still requires user input, but always makes the best choice for them
    currentScore = generateBestScoreAutomatically();
    returnstring +=
      "your score was generated automatically with the '--auto' modifier. <br>";
  } else if (diceChoiceSelectionSkip == false) {
    currentScore = calcPlayerScore(input);
    returnstring += `you chose ${input} to be the first numeral. <br>`;
  }
  returnstring += `The number you generated is ${currentScore}. <br><br>Please type 'next' to continue.`;
  writePlayerScore();
  return returnstring;
};

var indexofMinMax = function (arr) {
  // cognitive complexity 10
  // console.log(`scoringModeIsHighest: ${scoringModeIsHighest}`);
  var currentMinMax = arr[0];
  var currentMinMaxIndex = 0;
  for (var i = 1; i < arr.length; i += 1) {
    if (scoringModeIsHighest == true) {
      // normal mode
      // find maximum
      if (arr[i] > currentMinMax) {
        currentMinMax = arr[i];
        currentMinMaxIndex = i;
      }
    } else if (scoringModeIsHighest == false) {
      // LC mode
      // find minimum
      if (arr[i] < currentMinMax) {
        currentMinMax = arr[i];
        currentMinMaxIndex = i;
      }
    }
  }
  return currentMinMaxIndex;
};

var chooseWinner = function () {
  var currentRoundArray = [];
  var roundWinner = -1; // nonsensical
  var scoreArrayCopy = Array.from(scoreArray);
  // makes a shallow copy, because a simple = doesnt do it
  // this was originally a workaround for .pop(), not sure if still needed
  for (var iterator = 0; iterator < scoreArrayCopy.length; iterator += 1) {
    var lastElement =
      scoreArrayCopy[iterator][scoreArrayCopy[iterator].length - 1];
    // pls no pop
    // thank u nested lists very cool
    currentRoundArray.push(lastElement);
  }
  roundWinner = indexofMinMax(currentRoundArray) + 1;
  return roundWinner;
};

var calcCumulativeScore = function () {
  // this can probably be simplified
  var cumulativeScoreArray = [];
  for (let i = 0; i < scoreArray.length; i += 1) {
    // loop players
    var tempScore = 0;
    var subArray = scoreArray[i];
    for (let s = 0; s < subArray.length; s += 1) {
      // loop score records
      tempScore = tempScore + scoreArray[i][s];
    }
    cumulativeScoreArray.push(tempScore);
    // contains all
  }
  // console.log(`cumulativeScoreArray:`);
  // console.log(cumulativeScoreArray);
  return cumulativeScoreArray;
};

var generateLeaderboardMessage = function (arr) {
  var messageString = `Leaderboard: <br>`;
  var iterator = 0;
  while (iterator < arr.length) {
    var leaderboardPlayerNumber = iterator + 1;
    messageString += `Player ${leaderboardPlayerNumber}:   ${arr[iterator]} <br>`;
    iterator += 1;
  }
  return messageString;
};

var switchPlayer = function () {
  var previousPlayer = activePlayer;
  activePlayer += 1;
  activePlayer = ((activePlayer + 1) % 2) + 1;
  // ^toggles between 1 and 2, conveniently assumes 2 players
  return `Player ${previousPlayer}'s turn has ended. Moving to next player, type 'Roll' to continue.`;
};

var endRound = function () {
  // console.log(`Round Complete. scoreArray: ${scoreArray}`);
  // indicates 1 round is done
  var roundwinner = chooseWinner();
  progressNumber = 0;
  var leaderboardMessage = generateLeaderboardMessage(calcCumulativeScore());
  return `The winner for this round is Player ${roundwinner}. <br><br>
      ${leaderboardMessage}<br><br>
      Type 'Roll' to play again!`;
};

var main = function (input) {
  // cognitive complexity 12
  if (validateInput(input) == false) {
    return "Looks like you submitted something invalid.";
  }
  // if valid input
  if (currentGameProgressMode == "initializing" && input.includes("start")) {
    currentGameProgressMode = "playing";
    initializeScoreArray();
    return applyModifiers(input); //condense these 3 lines?
  }
  if (progressNumber < 3) {
    // too many returns, maybe change to while loop?
    if (input.includes("dice")) {
      //make some playgame(input) function?
      return playerTurnSelection(input);
    }
    if (input == "next") {
      progressNumber += 1;
      return switchPlayer();
    }
    // "Roll" must be entered to access the lines below
    if (progressNumber < 2) {
      return playerTurnRoll(activePlayer);
    }
    if (progressNumber == 2) {
      return endRound();
    }
  }
  return "Fatal Error. Please refresh the page.";
};
