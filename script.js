var playerNumber = 0;
var playerNumbers = [];
var playerWins = [0, 0];

var rollDice = function () {
  var randomDecimal = Math.random() * 7;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var gameMode = 'rollDice';
var playerTurn = 1;
var currentTurnDiceNumber1 = 0;
var currentTurnDiceNumber2 = 0;

var main = function (input) {
  if (gameMode == 'rollDice') {
    var diceNumber1 = rollDice();
    var diceNumber2 = rollDice();
    currentTurnDiceNumber1 = diceNumber1;
    currentTurnDiceNumber2 = diceNumber2;
    var myOutputValue = 'Current Player Turn: ' + playerTurn + '<br><br> Your first number is ' + diceNumber1 + ' and your second number is ' + diceNumber2 + '<br> Please enter which number comes first - "first" or "second"';
    gameMode = 'enterOrder';
    return myOutputValue;
  }

  if (gameMode == 'enterOrder') {
    if (input == 'first') {
      playerNumber = Number(String(currentTurnDiceNumber1) + String(currentTurnDiceNumber2));
      console.log('playerNumber is ' + playerNumber);
      myOutputValue = 'Your number is ' + currentTurnDiceNumber1 + currentTurnDiceNumber2;
    }
    else if (input == 'second') {
      playerNumber = Number(String(currentTurnDiceNumber2) + String(currentTurnDiceNumber1));
      console.log('playerNumber is ' + playerNumber);
      myOutputValue = 'Your number is ' + currentTurnDiceNumber2 + currentTurnDiceNumber1;
    }
    else {
      myOutputValue = 'Error';
    }

    gameMode = 'rollDice';
    playerNumbers[playerTurn - 1] = playerNumber;
    console.log('playernumbers array is ' + playerNumbers);

    if (playerNumbers.length > 1 && playerNumbers[0] > playerNumbers[1]) {
      playerWins[0] = playerWins[0] + 1;
    }

    else if (playerNumbers.length > 1 && playerNumbers[1] > playerNumbers[0]) {
      playerWins[1] = playerWins[1] + 1;
    }
    console.log('playerwins array ' + playerWins);

    if (playerTurn == 1) {
      playerTurn = 2;
    }
    else if (playerTurn == 2) {
      playerTurn = 1;
    }
    return myOutputValue;
  }
};
