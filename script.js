// var GAME_MODE_DICE_ROLL = 'GAME MODE DICE ROLL';
// var GAME_MODE_DICE_ORDER = 'GAME MODE DICE ORDER';
var gameMode = 'waiting for user to press submit';
var currentPlayer = 1;
var currentPlayerRolls = [];
var bothPlayersScores = [];

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var rollDiceForPlayer = function () {
  var counter = 0
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return "Welcome Player " + currentPlayer + ". <br> You rolled " + currentPlayerRolls[0] + " for Dice 1 and" + currentPlayerRolls[1] + " for Dice 2. <br> Please choose the order of the dice."
};

var getPlayerResult = function (input) {
  var playerResult; // why don't need ""
  if (input != 1 && input != 2) {
    return "Error! Please only enter 1 or 2, depending on which dice you would like to choose as the first digit of your final result. <br> You rolled " + currentPlayerRolls[0] + " for Dice 1 and " + currentPlayerRolls[1] + " for Dice 2.";
  } else if (input == 1) {
    playerResult = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
    return "Your chosen value is: " + playerResult
  } else if (input == 2) {
    playerResult = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
    return "Your chosen value is: " + playerResult
  }
  bothPlayersScores.push(playerResult);
  // clear current player rolls array for next player
  currentPlayerRolls = [];
  return "Your final result is: " + playerResult;
};

var main = function (input) {
  var myOutputValue = '';

  if (gameMode == 'waiting for user to press submit') {
    myOutputValue = rollDiceForPlayer();
    gameMode = 'user to choose dice order';
    return myOutputValue;
  }

  if (gameMode == 'user to choose dice order') {
    myOutputValue = getPlayerResult(input)
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = 'waiting for user to press submit';
      return myOutputValue + "<br> It is now Player 2's turn!";
    }
    if (currentPlayer == 2) {
      gameMode = 'comparing player scores';
      return myOutputValue + "<br> Click submit to compare your scores!";
    }
  }

};
