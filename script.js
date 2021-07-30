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

var winningPlayer = 1; // player number. assign winning player each round
var challenger = 2; // player number. assign challenger player each round (will +1)
var arrayCombined = []; // to store both current winner [0] & challenger [1] combined number for that round. Refreshes every round

var enterDiceAgainStatement = `Enter number of dice again!`;

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
  // loop TWICE only since knock out matches are only between two players
  while (playerCounter < 2) {
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
  return (
    `Player ` +
    winningPlayer +
    `🎲: ` +
    arrayCombined[0] +
    `<br>` +
    `Player ` +
    challenger +
    `🎲: ` +
    arrayCombined[1]
  );
};

// function to determine winner of combined number, either BIGGEST or SMALLEST
var generateCombinedNumWinner = function () {
  arrayCombined = arrayCombined.map(Number); // convert all element to NUMBER

  if (arrayCombined[0] == arrayCombined[1]) {
    playerStage = `choosedice`;
    return `It's a draw!! Choose your dice and roll again!`;
  } else if (arrayCombined[0] !== arrayCombined[1]) {
    if (parseInt(challenger) < parseInt(numberOfPlayers)) {
      if (normalOrReverse == `normal`) {
        if (arrayCombined[0] > arrayCombined[1]) {
          winningPlayer = winningPlayer;
          challenger = challenger + 1;
        } else if (arrayCombined[0] < arrayCombined[1]) {
          winningPlayer = challenger;
          challenger = challenger + 1;
        }
      } else if (normalOrReverse == `reverse`) {
        if (arrayCombined[0] < arrayCombined[1]) {
          winningPlayer = winningPlayer;
          challenger = challenger + 1;
        } else if (arrayCombined[0] > arrayCombined[1]) {
          winningPlayer = challenger;
          challenger = challenger + 1;
        }
      }
      playerStage = `choosedice`;
      return (
        `Player ` +
        winningPlayer +
        ` wins this round` +
        `<br>` +
        `Player ` +
        challenger +
        `, you're up next!` +
        `<br>` +
        `<br>` +
        enterDiceAgainStatement
      );
    } else if (parseInt(challenger) == parseInt(numberOfPlayers)) {
      if (normalOrReverse == `normal`) {
        if (arrayCombined[0] > arrayCombined[1]) {
          winningPlayer = winningPlayer;
          challenger = challenger + 1;
        } else if (arrayCombined[0] < arrayCombined[1]) {
          winningPlayer = challenger;
          challenger = challenger + 1;
        }
      } else if (normalOrReverse == `reverse`) {
        if (arrayCombined[0] < arrayCombined[1]) {
          winningPlayer = winningPlayer;
          challenger = challenger + 1;
        } else if (arrayCombined[0] > arrayCombined[1]) {
          winningPlayer = challenger;
          challenger = challenger + 1;
        }
      }
      playerStage = `numberOfPlayers`;
      challenger = 2;
      return (
        `Player ` +
        winningPlayer +
        ` wins this round so he/she won the game!` +
        `<br>` +
        `<br>` +
        `Congrats! 🎉🎊💯 ` +
        `<br>` +
        `<br>` +
        `Enter the number of players for the next game!`
      );
    }
  }
};

// function to determine stages of game :
// choose X players -> chooes X dice -> choose game type -> roll dice
var gameRound = function (input) {
  var message = ``;
  if (playerStage == `numberOfPlayers`) {
    winningPlayer = 1;
    if (input > 1) {
      numberOfPlayers = input;
      playerStage = `choosedice`;
      message = `${numberOfPlayers} players! <br> Enter number of dice! <br> <br> Playing next: Player ${winningPlayer} & ${challenger}`;
    } else {
      message = `Enter number of players (at least two) !`;
    }
  } else if (playerStage == `choosedice`) {
    if (input > 0) {
      numberOfDice = input;
      playerStage = `normalreverse`;
      message = `${numberOfPlayers} players! <br> ${numberOfDice} dice(s). <br> Now choose game mode "normal" or "reverse".<br> <br> Playing next: Player ${winningPlayer} & ${challenger}`;
    } else {
      message = `Please enter number of dice (at least one) ! <br> <br> Playing next: Player ${winningPlayer} & ${challenger}`;
    }
  } else if (playerStage == `normalreverse`) {
    message = `${numberOfPlayers} players! <br> ${numberOfDice} dice(s). <br> ${input.toUpperCase()} game! <br> <br> Click submit to roll your dice!<br> <br> Playing next: Player ${winningPlayer} & ${challenger}`;
    if (input == "normal" || input == "reverse") {
      normalOrReverse = input;
      playerStage = `playgame`;
    } else {
      message = `Please choose "normal" or "reverse".<br> <br> Playing next: Player ${winningPlayer} & ${challenger}`;
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
      `<br>` +
      winner;
    numberOfDice = ``;
    arrayCombined = [];
  }
  return message;
};

var main = function (input) {
  var game = gameRound(input);
  var myOutputValue = game;
  return myOutputValue;
};
