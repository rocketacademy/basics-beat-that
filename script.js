// two different modes
var diceGame = "diceroll";
var ChooseOrder = "choose order";
// start with diceroll game first
var gameMode = diceGame;
// who's turn is it?
var currentPlayer = 1;
// to keep track of the players' dice rolls
var diceRollOfP1 = [];
var diceRollOfP2 = [];
// Players' Chosen Numbers
var p1Num;
var p2Num;

// dice roll function
var generateNewDiceRoll = function () {
  var newDiceRoll = Math.floor(Math.random() * 6) + 1;
  return newDiceRoll;
};

var getNewDiceRoll = function () {
  var newDiceRoll = [generateNewDiceRoll(), generateNewDiceRoll()];
  console.log(newDiceRoll);
  if (currentPlayer == 1) {
    diceRollOfP1 = newDiceRoll;
  } else {
    // currentPlayer++;
    diceRollOfP2 = newDiceRoll;
  }
  return newDiceRoll;
};

// To get the player's number
var retrievePlayerNumber = function (numberChosen) {
  var playerNum;
  // link to the getNewRoll() function
  var newDiceRoll = getNewDiceRoll();

  // if (currentPlayer == 1) {
  //   playerNum = p1Num;
  // } else {
  //   playerNum = p2Num;
  // }

  if (numberChosen == 1) {
    // console.log(numberChosen, ", option 1 chosen");
    if (currentPlayer == 1) {
      p1Num = "" + newDiceRoll[0] + newDiceRoll[1];
      // console.log(p1Num, "p1num1");
      return p1Num;
    } else if (currentPlayer == 2) {
      p2Num = "" + newDiceRoll[0] + newDiceRoll[1];
      // console.log(p2Num, "p2num2");
      return p2Num;
    }
  } else if (numberChosen == 2) {
    // console.log(numberChosen, ", option 2 chosen");
    if (currentPlayer == 1) {
      p1Num = "" + newDiceRoll[1] + newDiceRoll[0];
      // console.log(p1Num, "p1num3");
      return p1Num;
    } else if (currentPlayer == 2) {
      p2Num = "" + newDiceRoll[1] + newDiceRoll[0];
      // console.log(p2Num, "p2num4");
      return p2Num;
    }
  }
  return playerNum;
};

// To figure out who is the winner
var getWinner = function () {
  if (p1Num > p2Num) {
    return 1;
  } else {
    return 2;
  }
};

var main = function (input) {
  if (gameMode == diceGame) {
    var newDiceRoll = getNewDiceRoll();
    gameMode = ChooseOrder;
    return (
      "Hello Player " +
      currentPlayer +
      "<br> You rolled " +
      newDiceRoll[0] +
      " on dice 1 and " +
      newDiceRoll[1] +
      " on dice 2. <br><br> Please choose your order by inputting the number 1 or the number 2."
    );
  }

  if (gameMode == ChooseOrder) {
    gameMode = ChooseOrder;
    var numberChosen = Number(input);
    if (numberChosen != 1 && numberChosen != 2) {
      return "Please only input the number 1 or 2 as your chosen order.";
    }

    var playerNum = retrievePlayerNumber(numberChosen);
    var playerNumResponse =
      "Player " +
      currentPlayer +
      "You chose Dice " +
      numberChosen +
      " first. <br> Your number is " +
      playerNum;

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = diceGame;
      return (
        playerNumResponse +
        "<br> It is now player 2's turn. Press submit to roll player 2's dice."
      );
    }
    var winingPlayer = getWinner();

    currentPlayer = 1;
    gameMode = diceGame;

    return (
      playerNumResponse +
      "<br> Player " +
      winingPlayer +
      "has won. <br> Player 1's number: " +
      p1Num +
      " | " +
      " Player 2's number: " +
      p2Num +
      " <br><br> Press submit to play again."
    );
  }
};
