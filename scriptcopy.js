var firstPlayerNum = 0;
var secondPlayerNum = 0;
var storagePlayerNum = 0;
var playerNumbers = [];

var playerTurn = 1;
var decisionTurn = false;
var firstPlayerWins = 0;
var secondPlayerWins = 0;
var playerWins = [];

var gameMode = "firstTurn";
var firstNum = 0;
var secondNum = 0;
var playerNum = [];

var reverseGame = false;

var main = function (input) {
  var output = "";
  //reverse game
  if (input == "r") {
    reverseGame = !reverseGame;
    if (reverseGame) {
      return `reverse game started `;
    } else {
      return `game has be un-reversed`;
    }
  }

  if (!decisionTurn) {
    firstNum = diceRoll(6);
    secondNum = diceRoll(6);
    decisionTurn = true;
    return `Player ${playerTurn}, you have rolled ${firstNum} and ${secondNum}<br>Would you like the second number to go first?<br>Reply 'y' for yes, anything else for no`;
  } else {
    //if input is yes
    storagePlayerNum = swapNumbers(firstNum, secondNum, input);
    decisionTurn = false;

    if (playerTurn == 1) {
      firstPlayerNum = Number(storagePlayerNum);
      playerTurn = 2;
      return `first player number is ${firstPlayerNum}`;
    } else {
      secondPlayerNum = Number(storagePlayerNum);
      playerTurn = 1;
      output = `second player number is ${secondPlayerNum} <br>`;
      var winnerString = decideWinner(
        firstPlayerNum,
        secondPlayerNum,
        reverseGame
      );
      return output + winnerString;
    }
  }
};

var diceRoll = function (input) {
  return Math.floor(Math.random() * input + 1);
};

var largerNumberFromTwoRolls = function () {
  var firstNum = diceRoll(6);
  var secondNum = diceRoll(6);
  if (firstNum >= secondNum) {
    return `${firstNum}${secondNum}`;
  } else {
    return `${secondNum}${firstNum}`;
  }
};

var largestNumberFromRolls = function (numDice) {
  var diceRolls = [];
  var largestNumber = 0;
  for (var i = 0; i < numDice; i += 1) {
    diceRolls.push(diceRoll(6));
  }
  diceRolls.sort(function (a, b) {
    return a - b;
  });

  for (var i = 0; i < numDice; i += 1) {
    largestNumber += diceRolls[i] * Math.pow(10, i);
  }
  return largestNumber;
};
var swapNumbers = function (firstNum, secondNum, yes) {
  if (yes == "y") {
    return secondNum * 10 + firstNum;
  }

  return firstNum * 10 + secondNum;
};

var decideWinner = function (firstNum, secondNum, reverseGame) {
  var output = "";
  //swap inputs
  if (reverseGame) {
    if (firstNum > secondNum) {
      firstPlayerWins += 1;
      output = `player two wins with ${secondNum} against ${firstNum}`;
    } else if (secondNum > firstNum) {
      secondPlayerWins += 1;
      output = `player one wins with ${firstNum} against ${secondNum}`;
    } else {
      output = `both players are drawed with ${firstNum}`;
    }
  }
  //normal game
  else {
    if (firstNum > secondNum) {
      firstPlayerWins += 1;
      output = `player one wins with ${firstNum} against ${secondNum}`;
    } else if (secondNum > firstNum) {
      secondPlayerWins += 1;
      output = `player two wins with ${secondNum} against ${firstNum}`;
    } else {
      output = `both players are drawed with ${firstNum}`;
    }
  }
  //win tally
  if (firstPlayerWins == secondPlayerWins) {
    output += `<br>both players are tied with ${secondPlayerWins} wins`;
  } else if (firstPlayerWins > secondPlayerWins) {
    output += `<br>first player has ${firstPlayerWins} wins<br> second player has ${secondPlayerWins} wins`;
  } else {
    output += `<br>second player has ${secondPlayerWins} wins<br> first player has ${firstPlayerWins} wins`;
  }

  return output;
};
