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
  return "Welcome Player " + currentPlayer + ". <br> You rolled " + currentPlayerRolls[0] + " for Dice 1 and " + currentPlayerRolls[1] + " for Dice 2. <br> Please choose which dice you would like to represent the first digit of your number."
};

var getPlayerResult = function (input) {
  var playerResult;
  if (input != 1 && input != 2) {
    gameMode = "waiting for user to press submit";
    return "Error! Please only enter 1 or 2, depending on which dice you would like to choose as the first digit of your final result. <br> You rolled " + currentPlayerRolls[0] + " for Dice 1 and " + currentPlayerRolls[1] + " for Dice 2.";
  } else if (input == 1) {
    playerResult = Number(String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]));
  } else if (input == 2) {
    playerResult = Number(String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]));
  }
  bothPlayersScores.push(playerResult);
  currentPlayerRolls = [];
  return "Your final result is: " + playerResult;
};

var comparePlayerScores = function () {
  var compareMessage = "Player 1's score: " + bothPlayersScores[0] + "<br> Player 2's score " + bothPlayersScores[1];
  if (bothPlayersScores[0] > bothPlayersScores[1]) {
    compareMessage = compareMessage + "<br> Player 1 wins!"
  }
  if (bothPlayersScores[0] < bothPlayersScores[1]) {
    compareMessage = compareMessage + "<br> Player 2 wins!"
  }
  if (bothPlayersScores[0] == bothPlayersScores[1]) {
    compareMessage = compareMessage + "<br> It's a tie!"
  }

  return compareMessage;
}

var resetGame = function () {
  currentPlayer = 1;
  bothPlayersScores = [];
  gameMode = 'waiting for user to press submit';
};

var main = function (input) {
  var myOutputValue = '';

  if (gameMode == 'waiting for user to press submit') {
    myOutputValue = rollDiceForPlayer();
    gameMode = 'user to choose dice order';
    return myOutputValue;
  } else if (gameMode == 'user to choose dice order') {
    myOutputValue = getPlayerResult(input)
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = 'waiting for user to press submit';
      return myOutputValue + "<br> It is now Player 2's turn!";
    } else if (currentPlayer == 2) {
      gameMode = 'comparing player scores';
      return myOutputValue + "<br> Click submit to compare your scores!";
    }
  } else if (gameMode == 'comparing player scores') {
    myOutputValue = comparePlayerScores();
    resetGame();

    return myOutputValue;
  }
};

// problems: 
// game continues even if input is invalid, though error message shows
