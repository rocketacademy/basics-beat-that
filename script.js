var activePlayer = 1;
var currentGameProgressMode = "initializing";
var currentPlayerArray = [0, 0];
var currentScore = 0;
var scoreArray = [[], []];
// ^this is meant to be a nested array - index 0 corresponds to player 1's scores, etc.
// initialize later in main
var progressNumber = 0;

var scoringModeIsHighest = true;
var diceChoiceSelectionSkip = false;
var numberOfPlayers = 2; // default
// var numberOfDice = 2; // default
const validCommands = ["start", "Roll", "dice 1", "dice 2", "next"];
// const validModifiers = ["--lowestCombined", "--auto"];
// ^ modes must be applied with "--" modifiers, e.g. --lowestCombined
// a full command might look like start --auto

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

var applyModifiers = function (mdf) {
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
      console.log("LC included");
      scoringModeIsHighest = false;
      startMessage +=
        "You have applied the 'lowestCombined' modifier. For this game, the player with the smaller number wins each round.<br>";
    } else if (modifiersArray[mod] == "--auto") {
      console.log("auto included");
      diceChoiceSelectionSkip = true;
      startMessage +=
        "You have applied the 'auto' modifier. The best combination for your chosen scoring rules will always be applied.<br>";
    } else {
      currentGameProgressMode = "initializing";
      startMessage =
        "You have entered an invalid modifier. Only --lowestCombined and --auto are accepted. Please try again.";
      return startMessage;
    }
  }
  startMessage += "<br>Enter 'Roll' to start your turn!";
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

var playerTurnRoll = function (playerNumber) {
  currentPlayerArray[0] = rollDice();
  currentPlayerArray[1] = rollDice();
  // console.log(`Rolled ${currentPlayerArray[0]} and ${currentPlayerArray[1]}`);
  var returnstring = `It is now Player ${playerNumber}'s turn. <br>
    You rolled ${currentPlayerArray[0]} for Dice 1, and  ${currentPlayerArray[1]} for Dice 2. <br>
    Choose the order of the dice - enter 'dice 1' or 'dice 2'`;
  return returnstring;
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
  var index = activePlayer - 1;
  scoreArray[index].push(currentScore);
  // console.log(`Score Array for Player ${activePlayer}: ${scoreArray[index]}`);
  // console.log("Score recorded.");
};

var playerTurnSelection = function (input) {
  // console.log("playerTurnSelection is now running.");
  var score = calcPlayerScore(input);
  var returnstring = `Player ${activePlayer}, you chose ${input} to be the first numeral. <br>
    The number you generated is ${score}. <br><br>
    Please type 'next' to continue.`;
  // console.log(`Score Generated: ${score}`);
  writePlayerScore();
  return returnstring;
};

var indexofMinMax = function (arr) {
  // combine this later
  console.log(`scoringModeIsHighest: ${scoringModeIsHighest}`);
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
  console.log(arr);
  console.log(`currentMinMax: ${currentMinMax}`);
  return currentMinMaxIndex;
};

var chooseWinner = function () {
  var currentRoundArray = [];
  var roundWinner = -1; // nonsensical
  var scoreArrayCopy = Array.from(scoreArray);
  // makes a shallow copy, because a simple = doesnt do it
  // this was originally a workaround for .pop(), not sure if still needed
  for (let iterator = 0; iterator < scoreArrayCopy.length; iterator += 1) {
    var lastElement =
      scoreArrayCopy[iterator][scoreArrayCopy[iterator].length - 1];
    // pls no pop
    // thank u nested lists very cool
    currentRoundArray.push(lastElement);
  }
  roundWinner = indexofMinMax(currentRoundArray) + 1;
  console.log(scoreArray);
  console.log(`Player ${roundWinner} wins this round.`);
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

// var generateLeaderboardObject = function (arr) {
//   // takes cumulativeScoreArray and maps into dictionary/object thing
//   console.log("Now generating leaderboardObject.");
//   var leaderboardObject = {};
//   for (let entry = 0; entry < arr.length; entry += 1) {
//     leaderboardObject[entry] = arr[entry];
//     console.log(`item added to object: ${leaderboardObject[entry]}`);
//   }
//   console.log(`unsorted: ${leaderboardObject}`);
//   const sortedLeaderboardObject = Object.fromEntries(
//     Object.entries(leaderboardObject).sort(([, a], [, b]) => a - b) //magic
//     // ^ takes entries of an object
//     // then sorts them
//     // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
//   );
//   console.log(`sorted: ${sortedLeaderboardObject}`);
//   return sortedLeaderboardObject;
// };

var generateLeaderboardMessage = function (arr) {
  var messageString = `Leaderboard: <br>`;
  var iterator = 0;
  while (iterator < arr.length) {
    var leaderboardPlayerNumber = iterator + 1;
    // console.log(`iterator: ${iterator}
    // score: ${arr[iterator]}`);
    messageString += `Player ${leaderboardPlayerNumber}:   ${arr[iterator]} <br>`;
    iterator += 1;
  }
  // console.log(`messageString for LeaderboardMessage: <br>
  // ${messageString}`);
  return messageString;
};

var switchPlayer = function () {
  var previousPlayer = activePlayer;
  activePlayer += 1;
  activePlayer = ((activePlayer + 1) % 2) + 1;
  // ^toggles between 1 and 2, conveniently assumes 2 players
  // console.log(`New Player Turn: ${activePlayer}`);
  return `Player ${previousPlayer}'s turn has ended. Moving to next player, type 'Roll' to continue.`;
};

var endRound = function () {
  // console.log(`Round Complete. scoreArray: ${scoreArray}`);
  // indicates 1 round is done
  var roundwinner = chooseWinner();
  progressNumber = 0;
  var leaderboardMessage = generateLeaderboardMessage(calcCumulativeScore());
  // console.log(`leaderboardMessage: ${leaderboardMessage}`);
  // console.log(calcCumulativeScore());
  // console.log(generateLeaderboardMessage(calcCumulativeScore()));
  return `The winner for this round is Player ${roundwinner}. <br><br>
      ${leaderboardMessage}<br><br>
      Type 'Roll' to play again!`;
};

var main = function (input) {
  // this whole thing is too long
  // and apparently has too many returns
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
    // maybe change to while loop?
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
  return "You're not supposed to be able to reach this line";
};
