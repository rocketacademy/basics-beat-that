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
// Players' Numbers
var p1Num = "";
var p2Num = "";

// dice roll function
var generateNewDiceRoll = function () {
  var newDiceRoll = Math.floor(Math.random() * 6) + 1;
  return newDiceRoll;
};

var main = function () {
  // var myOutputValue = "";
  // myOutputValue = "You rolled: " + getNewDiceRoll()[0];

  if (gameMode == diceGame) {
    newDiceRoll = getNewDiceRoll();
    gameMode = ChooseOrder;
    return (
      "Hello Player " +
      currentPlayer +
      "<br> You rolled " +
      newDiceRoll[0] +
      " on dice 1 and " +
      newDiceRoll[1] +
      " on dice 2. <br> Please choose your order by inputting the number 1 or the number 2."
    );
  }
  // if (gameMode == ChooseOrder) {
  // diceRollOfP1.push();
  // var diceRollOfP1;
  // }

  // return myOutputValue;
};

// var numberChosen = "?";
// console.log(numberChosen);

// var retrievePlayerNumber = function () {
//   if (numberChosen == 1) {
//     console.log(numberChosen);
//     if (currentPlayer == 1) {
//       p1Num = newDiceRoll()[0] + newDiceRoll()[1];
//       console.log(p1Num);
//       return "Player " + currentPlayer + ", You have chosen" + p1Num;
//     } else if (currentPlayer == 2) {
//       p2Num = newDiceRoll()[0] + newDiceRoll()[1];
//       console.log(p2Num);
//       return "Player " + currentPlayer + ", You have chosen" + p2Num;
//     }
//   } else if (numberChosen == 2) {
//     if (currentPlayer == 1) {
//       p1Num = newDiceRoll()[1] + newDiceRoll()[0];
//       console.log(p1Num);
//       return "Player " + currentPlayer + ", You have chosen" + p1Num;
//     } else if (currentPlayer == 2) {
//       p2Num = newDiceRoll()[1] + newDiceRoll()[0];
//       console.log(p2Num);
//       return "Player " + currentPlayer + ", You have chosen" + p2Num;
//     }
//   }
// };

var getNewDiceRoll = function () {
  var newDiceRoll = [generateNewDiceRoll(), generateNewDiceRoll()];
  console.log(newDiceRoll);
  if (currentPlayer == 1) {
    diceRollOfP1 = newDiceRoll;
    diceRollOfP1.push(newDiceRoll);
    console.log(diceRollOfP1);
  }
  // if it is not P1's turn, then it is P2's turn
  else {
    diceRollOfP2 = newDiceRoll;
    diceRollOfP2.push(newDiceRoll);
    console.log(diceRollOfP2);
  }
  return newDiceRoll;
};

// store the diceroll then check results

// Instructions:-
// 2 players, 2 rolls each
// P1 click submit, rolls 2 dice. Dice 1 = ? , Dice 2 = ?
// P1 inputs number with the numbers shown on the dice.
// P2 click submit, rolls 2 dice. Dice = ?, Dice 2 = ?
// P2 inputs number with the numbers shown on the dice.
// Player with the higher combined number wins.
// win-loss record
