//Statuses
var FIRST = 1;
var SECOND = 2;
var PLAYERONETURN = 1;
var PLAYERTWOTURN = 2;
var ROLLPHASE = 1;
var ORDERINGPHASE = 2;

//Flow Control: Current game states and player turn.
var currentGameState = ROLLPHASE;
var currentTurn = 0;

//Stored Values
var currentDiceOne = 0;
var currentDiceTwo = 0;
var currentPlayerOneNum = 0;
var currentPlayerTwoNum = 0;

var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var rollDiceNum = Math.floor(randomInteger);
  var finalNum = rollDiceNum + 1;
  return finalNum;
};

var currentPlayer = function (currentTurn) {
  return (currentTurn % 2) + 1;
};

var playerRoll = function (input) {
  currentDiceOne = rollDice();
  currentDiceTwo = rollDice();
  return `Player ${input} has rolled:<br>Dice 1: ${currentDiceOne}<br>Dice 2: ${currentDiceTwo}<br><br>Now, select the dice number to be placed first.`;
};

var selectOrderInputValidator = function (input) {
  if (input == FIRST || input == SECOND) {
    return true;
  } else {
    return false;
  }
};

var selectOrder = function (player, input) {
  var output = 0;
  if (input == FIRST) {
    output = Number(String(currentDiceOne) + String(currentDiceTwo));
  } else {
    output = Number(String(currentDiceTwo) + String(currentDiceOne));
  }

  if (player == PLAYERONETURN) {
    currentPlayerOneNum = output;
  } else if (player == PLAYERTWOTURN) {
    currentPlayerTwoNum = output;
  }
  return `Player ${player} has selected ${output}.`;
};

var winCheck = function (num1, num2) {
  if (num1 > num2) {
    return `<br>Player 1's value was ${currentPlayerOneNum}.<br>Player ${PLAYERONETURN} wins!`;
  } else if (num2 > num1) {
    return `<br>Player 1's value was ${currentPlayerOneNum}.<br>Player ${PLAYERTWOTURN} wins!`;
  } else {
    return `<br>Player 1's value was ${currentPlayerOneNum}.<br>It's a draw.`;
  }
};

var main = function (input) {
  currentPlayerValue = currentPlayer(currentTurn);
  if (currentGameState == ROLLPHASE) {
    currentGameState = ORDERINGPHASE;
    return playerRoll(currentPlayerValue);
  } else if (currentGameState == ORDERINGPHASE) {
    if (selectOrderInputValidator(input) == false) {
      return "Please choose dice 1 or 2 to be placed first.";
    }

    closeStatement = selectOrder(currentPlayerValue, input);

    if (currentPlayer(currentTurn) == PLAYERTWOTURN) {
      winStatement = winCheck(currentPlayerOneNum, currentPlayerTwoNum);
    } else {
      winStatement = "";
    }

    currentGameState = ROLLPHASE;
    currentTurn += 1;
    return closeStatement + winStatement;
  }
};
