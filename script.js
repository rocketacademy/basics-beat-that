var turnCount = 0;
var gameMode = "roll";
var diceA = 0;
var diceB = 0;
var myOutputValue = "";
var playerOneNum = 0;
var scoreA = 0;
var scoreB = 0;

// ROLL DICE
var rollDice = function () {
  diceNum = Math.ceil(Math.random() * 6);
  return diceNum;
};

// PUT DICE IN ORDER
var arrangeDice = function (a, b, choice) {
  var newNumber;
  if (choice == 1) {
    newNumber = diceA.toString() + diceB.toString();
  } else if (choice == 2) {
    newNumber = diceB.toString() + diceA.toString();
  }
  return newNumber;
};

// COMPARE NUMBERS
var compareNum = function (one, two) {
  var winner;
  if (one > two) {
    winner = `<br><br> Player 1's ${one} was bigger than Player 2's ${two}. <br> Player 1 wins!`;
  } else if (one < two) {
    winner = `<br><br> Player 2's ${two} is bigger than Player 1's ${one}. <br> Player 2 wins!`;
  } else {
    winner = `<br><br> Both players tied with ${one}. <br> It's a draw!`;
  }
  return winner;
};

// COMPARE SCORES
var compareScores = function (one, two) {
  var firstPlace = "Player 1";
  var firstPlaceScore = one;
  var secondPlace = "Player 2";
  var secondPlaceScore = two;
  if (two > one) {
    firstPlace = "Player 2";
    secondPlace = "Player 1";
    firstPlaceScore = two;
    secondPlaceScore = one;
  } else if (one == two) {
    return `<br><br> LEADERBOARD: <br> =1. ${firstPlace} - ${firstPlaceScore} <br> =1. ${secondPlace} - ${secondPlaceScore}`;
  }
  return `<br><br> LEADERBOARD: <br> 1. ${firstPlace} - ${firstPlaceScore} <br> 2. ${secondPlace} - ${secondPlaceScore}`;
};

var main = function (input) {
  var currentPlayer = 1 + (turnCount % 2);

  if (gameMode == "roll") {
    diceA = rollDice();
    diceB = rollDice();
    myOutputValue = `Welcome Player ${currentPlayer}. <br> You rolled ${diceA} for Dice 1 and ${diceB} for Dice 2. <br> Choose the order for the dice.`;
    gameMode = "arrange";
  } else if ((gameMode = "arrange")) {
    if (input != 1 && input != 2) {
      myOutputValue = `Player ${currentPlayer}, You rolled ${diceA} for Dice 1 and ${diceB} for Dice 2. <br> Please choose the order for the dice.`;
    } else {
      var diceNumber = arrangeDice(diceA, diceB, input);
      myOutputValue = `Player ${currentPlayer}, you chose Dice ${input} first. <br> Your number is ${diceNumber}.`;
      if (currentPlayer == 1) {
        playerOneNum = diceNumber;
        scoreA += Number(diceNumber);
      } else if (currentPlayer == 2) {
        scoreB += Number(diceNumber);
        var endResult = compareNum(playerOneNum, diceNumber);
        myOutputValue += endResult;
        var leaderboard = compareScores(scoreA, scoreB);
        myOutputValue += leaderboard;
      }
      gameMode = "roll";
      turnCount += 1;
    }
  }

  return myOutputValue;
};
