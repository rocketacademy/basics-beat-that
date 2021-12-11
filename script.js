// play game, start with player 1, then player 2
// player one rolls dice and choose number then player two do the same
// end should tell who got higher

var gameStateDiceRoll = "game state dice roll";
var gameStateDiceOrder = "game state dice order";
var gameState = gameStateDiceRoll;
var gameStateCompareScores = "game state compare scores";

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

// make dice
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `welcome player ${currentPlayer} <br><br> you rolled ${currentPlayerRolls[0]} for dice one and ${currentPlayerRolls[1]} for dice two <br><br> please choose either dice one or dice two to be used as the first digit`;
};
var getPlayerScore = function (playerInput) {
  var playerScore;
  if (playerInput != 1 && playerInput != 2) {
    return `Invalid response. Please enter either 1 or 2 to choose dice number.`;
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
  }
  if (playerInput == 2) {
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
  }
  allPlayerScore.push(playerScore);
  currentPlayerRolls = [];

  return ` player ${currentPlayer} , your number is ${playerScore}`;
};

var main = function (input) {
  var outputMessage = "";
  if (gameState == gameStateDiceRoll) {
    outputMessage = rollDiceForPlayer();
    gameState = gameStateDiceOrder;
    return outputMessage;
  }
  // changing to player 2
  if (gameState == gameStateDiceOrder) {
    outputMessage = getPlayerScore(input);
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return outputMessage + "<br><br> it is player 2's turn";
    }
    if ((currentPlayer = 2)) {
      gameState = gameStateCompareScores;
      return outputMessage + "<br><br> click submit to compare scores";
    }
  }
  // player 1 wins,
  // player 2 wins
  // draw
  if ((gameState = gameStateCompareScores)) {
    outputMessage = `player one score is ${allPlayerScore[0]} while player two score is ${allPlayerScore[1]}`;
    // player 1 wins,
    if (allPlayerScore[0] > allPlayerScore[1]) {
      outputMessage = outputMessage + `<br><br> player 1 wins `;
    }
    // player 2 wins
    if (allPlayerScore[0] < allPlayerScore[1]) {
      outputMessage = outputMessage + `<br><br> player 2 wins `;
    }
    // draw
    if (allPlayerScore[0] == allPlayerScore[1]) {
      outputMessage = outputMessage + `<br><br> it's a draw `;
    }
    return outputMessage;
  }
};
