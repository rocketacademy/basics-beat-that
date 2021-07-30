var playerStage = `numberOfPlayers`; // numberOfPlayers -> choosedice -> normalreverse -> playgame
var normalOrReverse = `normal`; // normal or reverse

var generateRandomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var numberOfPlayers = ``;
var numberOfDice = ``;
var arrayEachDice = []; // to store all dice roll of a single player. Refreshes every player
var maxNumber = ``; // to find single max number among the dice rolls of a single player. Refreshes every player
var minNumber = ``; // to find single min number among the dice rolls of a single player. Refreshes every player
var maxCombined = ``; // to find max combined number among the dice rolls of a single player. Refreshes every player
var minCombined = ``; // to find min combined number among the dice rolls of a single player. Refreshes every player
var arrayCombined = []; // to store all players combined number for that round. Refreshes every round

// function to roll X dices
var generateXDiceRoll = function () {
  var diceCounter = 0;
  while (diceCounter < numberOfDice) {
    arrayEachDice.push(generateRandomDiceRoll());
    diceCounter += 1;
  }
};

// function to generate BIGGEST combined number from dice rolls
// 1. to loop through the arrayEachDice[] to find biggest number
// 2. remove this biggest number from arrayEachDice[]
// 3. find next biggest number from remaining elements in arrayEachDice[] and combine it the back of the previous biggest number -> maxCombined
// 4. loop till arrayEachDice[] is empty
// 5. push maxCombined into arrayCombined[]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
var generateBiggestCombined = function () {
  var filterCounter = 0;
  while (filterCounter < numberOfDice) {
    maxNumber = arrayEachDice.reduce(function (a, b) {
      return Math.max(a, b);
    }, 0);
    maxCombined = maxCombined + `` + maxNumber;
    arrayEachDice.splice(arrayEachDice.indexOf(maxNumber), 1);
    filterCounter += 1;
  }
  arrayCombined.push(maxCombined);
};

// function to generate SMALLEST combined number from dice rolls
// works the same as generateBiggestCombined() but to find min combined
// https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa
var generateSmallestCombined = function () {
  var filterCounter = 0;
  while (filterCounter < numberOfDice) {
    minNumber = Math.min.apply(Math, arrayEachDice);
    minCombined = minCombined + `` + minNumber;
    arrayEachDice.splice(arrayEachDice.indexOf(minNumber), 1);
    filterCounter += 1;
  }
  arrayCombined.push(minCombined);
};

// function to generate one game for X number of players
var rollXDiceXPlayer = function () {
  var playerCounter = 0;
  var message = ``;

  // every playerCounter is one player's round
  // loop till all players finsih their round = one game
  while (playerCounter < numberOfPlayers) {
    var xDiceRoll = generateXDiceRoll();
    if (normalOrReverse == `normal`) {
      var biggestCombined = generateBiggestCombined();
    } else if (normalOrReverse == `reverse`) {
      var smallestCombined = generateSmallestCombined();
    }
    maxCombined = ``;
    minCombined = ``;
    message =
      message +
      `Player ${playerCounter + 1} 🎲: ` +
      arrayCombined[playerCounter] +
      `<br>`;
    playerCounter += 1;
  }
  return message;
};

// function to determine winner of combined number, either BIGGEST or SMALLEST
var generateCombinedNumWinner = function () {
  arrayCombined = arrayCombined.map(Number); // convert all element to NUMBER
  var winningPlayer = ``;
  var drawRound = new Set(arrayCombined).size == 1; // determine is all elements are the same = draw (https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal)

  if (drawRound == true) {
    return `It's a draw!!`;
  } else {
    if (normalOrReverse == `normal`) {
      var biggestCombinedWinner = arrayCombined.reduce(function (a, b) {
        return Math.max(a, b);
      }, 0);
      winningPlayer = arrayCombined.indexOf(biggestCombinedWinner) + 1;
    } else if (normalOrReverse == `reverse`) {
      var smallestCombinedWinner = Math.min.apply(Math, arrayCombined);
      winningPlayer = arrayCombined.indexOf(smallestCombinedWinner) + 1;
    }
    return `Player ` + winningPlayer + ` wins this round`;
  }
};

// function to determine stages of game :
// choose X players -> chooes X dice -> choose game type -> roll dice
var gameRound = function (input) {
  var message = ``;
  if (playerStage == `numberOfPlayers`) {
    if (input > 1) {
      numberOfPlayers = input;
      playerStage = `choosedice`;
      message = `${numberOfPlayers} players! <br> Enter number of dice!`;
    } else {
      message = `Enter number of players (at least two) !`;
    }
  } else if (playerStage == `choosedice`) {
    if (input > 0) {
      numberOfDice = input;
      playerStage = `normalreverse`;
      message = `${numberOfPlayers} players! <br> ${numberOfDice} dice(s). <br> Now choose game mode "normal" or "reverse".`;
    } else {
      message = `Please enter number of dice.`;
    }
  } else if (playerStage == `normalreverse`) {
    message = `${numberOfPlayers} players! <br> ${numberOfDice} dice(s). <br> ${input.toUpperCase()} game! <br> <br> Click submit to roll your dice!`;
    if (input == "normal" || input == "reverse") {
      normalOrReverse = input;
      playerStage = `playgame`; ////////////////// can i combine it here??
    } else {
      message = `Please choose "normal" or "reverse".`;
    }
  } else if (playerStage == "playgame") {
    var playgame = rollXDiceXPlayer();
    var winner = generateCombinedNumWinner();
    message =
      normalOrReverse.toUpperCase() +
      ` round!` +
      `<br>` +
      `<br>` +
      playgame +
      `<br>` +
      winner +
      `<br>` +
      `<br>` +
      `Enter number of dice again!`;
    numberOfDice = ``;
    playerStage = `choosedice`;
    arrayCombined = [];
  }
  return message;
};

var main = function (input) {
  var game = gameRound(input);
  var myOutputValue = game;
  return myOutputValue;
};
