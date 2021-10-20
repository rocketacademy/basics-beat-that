//game modes
var rollMode = "rollMode";
var orderMode = "orderMode";
//starting game mode
var gameMode = rollMode;

//set first player
var currPlayer = 1;

//remb player rolls
var p1Dice = [];
var p2Dice = [];

//dice roll func
var rollDice = function () {
  return Math.ceil(Math.random() * 6);
};

var dice1 = rollDice();
var dice2 = rollDice();
var p1Result;
var p2Result;

//a bunch of concatenation possibilites
var concatP1Dice1 = function () {
  return Number(String(p1Dice[0]) + String(p1Dice[1]));
};
var concatP1Dice2 = function (dice1, dice2) {
  return Number(String(p1Dice[1]) + String(p1Dice[0]));
};
var concatP2Dice1 = function () {
  return Number(String(p2Dice[0]) + String(p2Dice[1]));
};
var concatP2Dice2 = function (dice1, dice2) {
  return Number(String(p2Dice[1]) + String(p2Dice[0]));
};

//main game
var main = function (input) {
  //player 1 roll dice
  if (gameMode == rollMode && currPlayer == 1) {
    var dice1 = rollDice();
    var dice2 = rollDice();
    p1Dice = [dice1, dice2];
    gameMode = orderMode;
    return `${dice1} & ${dice2}.<br>Select 1 or 2.`;
  }
  //player 1 choose 1 or 2 and get concat result, change to player 2
  else if (gameMode == orderMode && currPlayer == 1) {
    if (input == 1) {
      p1Result = concatP1Dice1();
      gameMode = rollMode;
      currPlayer = 2;
      return `P1's number is ${p1Result}, now P2 roll.`;
    } else if (input == 2) {
      p1Result = concatP1Dice2();
      gameMode = rollMode;
      currPlayer = 2;
      return `P1's number is ${p1Result}, now P2 roll.`;
    } else {
      return `P1's number is ${p1Result}.<br>Choose 1 or 2 pls.`;
    }
  }
  //player 2 start roll dice
  else if (gameMode == rollMode && currPlayer == 2) {
    var dice1 = rollDice();
    var dice2 = rollDice();
    p2Dice = [dice1, dice2];
    gameMode = orderMode;
    return `${dice1} & ${dice2}.<br>Select 1 or 2.`;
  }
  //player 2 choose 1 or 2,get result, get comparison with player 1
  else if (gameMode == orderMode && currPlayer == 2) {
    if (input == 1) {
      p2Result = concatP2Dice1();
      gameMode = rollMode;
      currPlayer = 1;
      if (Number(p1Result) > Number(p2Result)) {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so P1 wins. P1 roll again.`;
      } else if (Number(p1Result) < Number(p2Result)) {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so P2 wins. P1 roll again.`;
      } else {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so DRAW. P1 roll again.`;
      }
    } else if (input == 2) {
      p2Result = concatP2Dice2();
      gameMode = rollMode;
      currPlayer = 1;
      if (Number(p1Result) > Number(p2Result)) {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so P1 wins. P1 roll again.`;
      } else if (Number(p1Result) < Number(p2Result)) {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so P2 wins. P1 roll again.`;
      } else {
        return `P2's number is ${p2Result}.<br>P1:${p1Result} vs P2:${p2Result}, so DRAW. P1 roll again.`;
      }
    } else {
      return `P2's number is ${p2Result}.<br> Choose 1 or 2 pls.`;
    }
  }
};
