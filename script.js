var playerStage = `One`; // One -> orderOne -> Two -> orderTwo -> result
var welcomeMessage = `Welcome Player One`;
var welcomeMessage2 = `Welcome Player Two`;
var chooseDiceORder = `Choose the order of the dice. Type 12 or 21`;
var playerOneDiceOne = ``;
var playerOneDiceTwo = ``;
var playerOneCombine = ``;
var playerTwoDiceOne = ``;
var playerTwoDiceTwo = ``;
var playerTwoCombine = ``;
var result = ``;

var generateRandomDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var gameRound = function (input) {
  if (playerStage == "One") {
    console.log(playerStage);
    playerOneDiceOne = generateRandomDiceRoll();
    playerOneDiceTwo = generateRandomDiceRoll();
    console.log(playerOneDiceOne);
    console.log(playerOneDiceTwo);
    playerStage = `orderOne`;
    console.log(playerStage);
    var message =
      welcomeMessage +
      `<br>` +
      `You rolled <br>` +
      ` Dice 1: ` +
      playerOneDiceOne +
      `<br> Dice 2: ` +
      playerOneDiceTwo +
      `<br>` +
      chooseDiceORder;
    console.log(playerStage);
  } else if (playerStage == `orderOne` && input == 1 + `` + 2) {
    playerOneCombine = playerOneDiceOne + `` + playerOneDiceTwo;
    playerStage = `Two`;
    message =
      `Player One chose ` +
      playerOneCombine +
      `<br> Player Two, roll your dice!`;
    console.log(playerStage);
  } else if (playerStage == `orderOne` && input == 2 + `` + 1) {
    playerOneCombine = playerOneDiceTwo + `` + playerOneDiceOne;
    playerStage = `Two`;
    message =
      `Player One chose ` +
      playerOneCombine +
      `<br> Player Two, roll your dice!`;
    console.log(playerStage);
  } else if (playerStage == `Two`) {
    playerTwoDiceOne = generateRandomDiceRoll();
    playerTwoDiceTwo = generateRandomDiceRoll();
    console.log(playerTwoDiceOne);
    console.log(playerTwoDiceTwo);
    playerStage = `orderTwo`;
    console.log(playerStage);
    var message =
      welcomeMessage2 +
      `<br>` +
      `You rolled <br>` +
      ` Dice 1: ` +
      playerTwoDiceOne +
      `<br> Dice 2: ` +
      playerTwoDiceTwo +
      `<br>` +
      chooseDiceORder;
  } else if (playerStage == `orderTwo` && input == 1 + `` + 2) {
    playerTwoCombine = playerTwoDiceOne + `` + playerTwoDiceTwo;
    playerStage = `result`;
    message = `Player Two chose ` + playerTwoCombine;
    console.log(playerStage);
  } else if (playerStage == `orderTwo` && input == 2 + `` + 1) {
    playerTwoCombine = playerTwoDiceTwo + `` + playerTwoDiceOne;
    playerStage = `result`;
    message = `Player Two chose ` + playerTwoCombine;
    console.log(playerStage);
  } else if (
    (playerStage == `orderTwo` || playerStage == `orderOne`) &&
    input !== 1 + `` + 2 &&
    input !== 2 + `` + 1
  ) {
    message = chooseDiceORder;
    console.log(playerStage);
  }
  return message;
};

var whoWin = function () {
  if (playerStage == `result`) {
    if (playerOneCombine > playerTwoCombine) {
      result = `Player One wins!`;
    } else if (playerOneCombine < playerTwoCombine) {
      result = `Player Two wins!`;
    } else if ((playerOneCombine = playerTwoCombine)) {
      result = `Draw!`;
    } else {
      result = "bug";
    }
  }
  return (
    `Player One: ` +
    playerOneCombine +
    `<br>` +
    `Player Two: ` +
    playerTwoCombine +
    `<br>` +
    result
  );
};

var main = function (userChoice) {
  var game = gameRound(userChoice);
  var resultMessage = whoWin();
  var myOutputValue = game + `<br>` + `<br>` + resultMessage;
  return myOutputValue;
};
