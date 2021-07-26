var playerStage = `One`; // One -> orderOne -> Two -> orderTwo -> result
var chooseDiceORder = `Choose the order of the dice. Type 12 or 21`;

// variables for player one
var playerOneDiceOne = 0;
var playerOneDiceTwo = 0;
var playerOneCombine = 0;
var arrayOne = [];

// variables for player two
var playerTwoDiceOne = 0;
var playerTwoDiceTwo = 0;
var playerTwoCombine = 0;
var arrayTwo = [];

var generateRandomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// generate function to roll dice and choose order
var gameRound = function (input) {
  if (playerStage == "One") {
    playerOneCombine = 0;
    playerTwoCombine = 0; // need to add these two lines for new every round to refresh as zero

    playerOneDiceOne = generateRandomDiceRoll();
    playerOneDiceTwo = generateRandomDiceRoll();
    playerStage = `orderOne`;

    var message =
      `Player One rolled <br>` +
      ` Dice 1: ` +
      playerOneDiceOne +
      `<br> Dice 2: ` +
      playerOneDiceTwo +
      `<br>` +
      chooseDiceORder;
  } else if (playerStage == `orderOne`) {
    if (input == 12) {
      playerOneCombine = playerOneDiceOne + `` + playerOneDiceTwo;
      arrayOne.push(parseInt(playerOneCombine));
      playerStage = `Two`;
      message =
        `Player One chose ` +
        playerOneCombine +
        `<br> Player Two, roll your dice!`;
    } else if (input == 21) {
      playerOneCombine = playerOneDiceTwo + `` + playerOneDiceOne;
      arrayOne.push(parseInt(playerOneCombine));
      playerStage = `Two`;
      message =
        `Player One chose ` +
        playerOneCombine +
        `<br> Player Two, roll your dice!`;
    } else if (input !== 12 && input !== 21) {
      message =
        chooseDiceORder +
        `<br>` +
        ` Dice 1: ` +
        playerOneDiceOne +
        `<br> Dice 2: ` +
        playerOneDiceTwo;
    }
  } else if (playerStage == `Two`) {
    playerTwoDiceOne = generateRandomDiceRoll();
    playerTwoDiceTwo = generateRandomDiceRoll();
    console.log(playerTwoDiceOne);
    console.log(playerTwoDiceTwo);
    playerStage = `orderTwo`;
    var message =
      `Player Two rolled <br>` +
      ` Dice 1: ` +
      playerTwoDiceOne +
      `<br> Dice 2: ` +
      playerTwoDiceTwo +
      `<br>` +
      chooseDiceORder;
  } else if (playerStage == `orderTwo`) {
    if (input == 12) {
      playerTwoCombine = playerTwoDiceOne + `` + playerTwoDiceTwo;
      arrayTwo.push(parseInt(playerTwoCombine));
      message = `Player Two chose ` + playerTwoCombine;
      playerStage = `result`;
    } else if (input == 21) {
      playerTwoCombine = playerTwoDiceTwo + `` + playerTwoDiceOne;
      arrayTwo.push(parseInt(playerTwoCombine));
      message = `Player Two chose ` + playerTwoCombine;
      playerStage = `result`;
    } else if (input !== 12 && input !== 21) {
      message =
        chooseDiceORder +
        `<br>` +
        ` Dice 1: ` +
        playerTwoDiceOne +
        `<br> Dice 2: ` +
        playerTwoDiceTwo;
    }
  }
  return message;
};

// generate function to determine who has bigger combine number
var whoWin = function () {
  var result = ``;
  if (playerStage == `result`) {
    if (playerOneCombine > playerTwoCombine) {
      result = `Player One wins this round! <br> Player One roll again!`;
    } else if (playerOneCombine < playerTwoCombine) {
      result = `Player Two wins this round! <br> Player One roll again!`;
    } else if (playerOneCombine == playerTwoCombine) {
      result = `Draw!`;
    } else {
      result = "bug";
    }
    playerStage = `One`;
  }

  return (
    `This round:` +
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
  if (sumOne > sumTwo) {
    outcome = `Player One has a bigger total sum so far!`;
  } else if (sumOne < sumTwo) {
    outcome = `Player Two has a bigger total sum so far!`;
  } else if (sumOne == sumTwo) {
    outcome = `Both players have the same total sum so far!`;
  } else {
    outcome = `bug 2`;
  }
  return (
    `Total sum:` +
    `<br>` +
    `Player One: ` +
    sumOne +
    `<br>` +
    `Player Two: ` +
    sumTwo +
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
