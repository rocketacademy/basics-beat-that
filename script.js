var playerStage = `normalreverse`; // normalreverse -> One -> orderOne -> Two -> orderTwo -> result
var normalOrReverse = `normal`; // normal or reverse

// variables for player one
var playerOneDiceOne = 0;
var playerOneDiceTwo = 0;
var playerOneCombine = 0;
var arrayOne = []; // array to keep all the combined numbers chosen for summation
var playerOneWinSum = ``; // statement for output which will be pushed into arrayWhoWinSum
var maxCombinedOne = ``;
var minCombinedOne = ``;

// variables for player two
var playerTwoDiceOne = 0;
var playerTwoDiceTwo = 0;
var playerTwoCombine = 0;
var arrayTwo = [];
var playerTwoWinSum = ``;
var maxCombinedTwo = ``;
var minCombinedTwo = ``;

// array to toggle between which result is shown on top first
var arrayWhoWinSum = [];

var generateRandomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// generate function to choose game type, roll dice and choose order
var gameRound = function (input) {
  var message = ``;
  if (playerStage == `normalreverse`) {
    message = `You chose ${input} game! Player One, click submit to roll your dice!`;
    if (input == "normal") {
      normalOrReverse = `normal`;
      playerStage = `One`;
    } else if (input == "reverse") {
      normalOrReverse = `reverse`;
      playerStage = `One`;
    } else {
      message = `Please choose "normal" or "reverse".`;
    }
  } else if (playerStage == "One") {
    playerOneCombine = 0;
    playerTwoCombine = 0; // need to add these two lines for new every round to refresh as zero

    playerOneDiceOne = generateRandomDiceRoll();
    playerOneDiceTwo = generateRandomDiceRoll();
    playerStage = `orderOne`;
    maxCombinedOne = Math.max(
      playerOneDiceOne + `` + playerOneDiceTwo,
      playerOneDiceTwo + `` + playerOneDiceOne
    );
    minCombinedOne = Math.min(
      playerOneDiceOne + `` + playerOneDiceTwo,
      playerOneDiceTwo + `` + playerOneDiceOne
    );
    playerStage = `Two`;
    message =
      `Player One rolled <br>` +
      ` Dice 1: ` +
      playerOneDiceOne +
      `<br> Dice 2: ` +
      playerOneDiceTwo +
      `<br>` +
      `Max: ` +
      maxCombinedOne +
      `<br>` +
      `Min: ` +
      minCombinedOne +
      `<br>` +
      `Player Two, roll your dice!`;
  } else if (playerStage == `Two`) {
    playerTwoDiceOne = generateRandomDiceRoll();
    playerTwoDiceTwo = generateRandomDiceRoll();
    playerStage = `orderTwo`;
    maxCombinedTwo = Math.max(
      playerTwoDiceOne + `` + playerTwoDiceTwo,
      playerTwoDiceTwo + `` + playerTwoDiceOne
    );
    minCombinedTwo = Math.min(
      playerTwoDiceOne + `` + playerTwoDiceTwo,
      playerTwoDiceTwo + `` + playerTwoDiceOne
    );
    playerStage = `result`;
    message =
      `Player Two rolled <br>` +
      ` Dice 1: ` +
      playerTwoDiceOne +
      `<br> Dice 2: ` +
      playerTwoDiceTwo +
      `<br>` +
      `Max: ` +
      maxCombinedTwo +
      `<br>` +
      `Min: ` +
      minCombinedTwo;
  }
  return message;
};

// generate function to determine who has bigger combine number
var whoWin = function () {
  var result = ``;
  if (playerStage == `result`) {
    if (normalOrReverse == `normal`) {
      arrayOne.push(parseInt(maxCombinedOne));
      arrayTwo.push(parseInt(maxCombinedTwo));
      playerOneCombine = maxCombinedOne;
      playerTwoCombine = maxCombinedTwo;
      if (maxCombinedOne > maxCombinedTwo) {
        result = `Player One wins this round! <br> Enter "normal" or "reverse" to choose your mode again!`;
      } else if (maxCombinedOne < maxCombinedTwo) {
        result = `Player Two wins this round! <br> Enter "normal" or "reverse" to choose your mode again!`;
      } else if (maxCombinedOne == maxCombinedTwo) {
        result = `Draw!`;
      }
    } else if (normalOrReverse == `reverse`) {
      arrayOne.push(parseInt(minCombinedOne));
      arrayTwo.push(parseInt(minCombinedTwo));
      playerOneCombine = minCombinedOne;
      playerTwoCombine = minCombinedTwo;
      if (minCombinedOne > minCombinedTwo) {
        result = `Player Two wins this round! <br> Enter "normal" or "reverse" to choose your mode again!`;
      } else if (minCombinedOne < minCombinedTwo) {
        result = `Player One wins this round! <br> Enter "normal" or "reverse" to choose your mode again!`;
      } else if (minCombinedOne == minCombinedTwo) {
        result = `Draw!`;
      }
    } else {
      result = "bug";
    }
    playerStage = `normalreverse`;
  }

  return (
    `This is a ` +
    normalOrReverse +
    ` round:` +
    `<br>` +
    `Player One: ` +
    playerOneCombine +
    `<br>` +
    `Player Two: ` +
    playerTwoCombine +
    `<br>` +
    result
  );
};

// generate function to sum up all combined numbers
var whoHasBiggerSum = function () {
  var outcome = ``;
  var sumOne = arrayOne.reduce(function (a, b) {
    return a + b;
  }, 0);

  var sumTwo = arrayTwo.reduce(function (a, b) {
    return a + b;
  }, 0);

  playerOneWinSum = `Player One: ` + sumOne;
  playerTwoWinSum = `Player Two: ` + sumTwo;

  arrayWhoWinSum[0] = playerOneWinSum;
  arrayWhoWinSum[1] = playerTwoWinSum;

  if (sumOne > sumTwo) {
    outcome = `Player One has a bigger total sum so far!`;
  } else if (sumOne < sumTwo) {
    arrayWhoWinSum[0] = playerTwoWinSum;
    arrayWhoWinSum[1] = playerOneWinSum;
    outcome = `Player Two has a bigger total sum so far!`;
  } else if (sumOne == sumTwo) {
    outcome = `Both players have the same total sum so far!`;
  } else {
    outcome = `bug 2`;
  }
  return (
    `Total sum:` +
    `<br>` +
    arrayWhoWinSum[0] +
    `<br>` +
    arrayWhoWinSum[1] +
    `<br>` +
    outcome
  );
};

var main = function (userChoice) {
  var game = gameRound(userChoice);
  console.log(playerStage);
  console.log("here");
  var resultMessage = whoWin();
  console.log(playerStage);
  console.log("here2");
  var sumGame = whoHasBiggerSum();
  console.log(playerStage);
  console.log("here3");
  var myOutputValue =
    game + `<br>` + `<br>` + resultMessage + `<br>` + `<br>` + sumGame;
  console.log(playerStage);
  console.log("here4");
  return myOutputValue;
};
