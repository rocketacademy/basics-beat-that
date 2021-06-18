var randomNum = function () {
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  return randomInteger;
};
var gameMode1 = "waiting for player 1";
var gameMode2 = "waiting for player 2";
var gameMode3 = "compare outcomes";
var userName1 = "";
var userName2 = "";
var player1DiceRoll1 = "";
var player1DiceRoll2 = "";
var player2DiceRoll1 = "";
var player2DiceRoll2 = "";
var finalNum1 = [];
var finalNum2 = [];

var getSum = function (list) {
  var index = 0;
  var currentSum = 0;
  while (index < list.length) {
    currentSum = currentSum + list[index];
    index = index + 1;
  }
  return currentSum;
};

var main = function (input) {
  if (gameMode1 == "waiting for player 1") {
    userName1 = input;
    gameMode1 = "player 1 turn";
    console.log(userName1);
    return `Welcome ${userName1}, please roll the dice`;
  }

  if (gameMode1 == "player 1 turn") {
    player1DiceRoll1 = randomNum();
    player1DiceRoll2 = randomNum();
    gameMode1 = "player 1 select your dice order";
    return ` ${userName1}, Dice 1: You rolled  ${player1DiceRoll1}. Dice 2: You rolled  ${player1DiceRoll2} <br> Please select your dice order "1" or "2" to display your outcome`;
  }

  if (gameMode1 == "player 1 select your dice order") {
    if (input == 1) {
      finalNum1.push(Number(`${player1DiceRoll1}${player1DiceRoll2}`));
      gameMode1 = "player 1 done";
      return `${userName1}, you chose dice 1 first. Your number: ${
        finalNum1[finalNum1.length - 1]
      }`;
    } else if (input == 2) {
      finalNum1.push(Number(`${player1DiceRoll2}${player1DiceRoll1}`));
      gameMode1 = "player 1 done";
      return `${userName1}, you chose dice 2 first. Your number: ${
        finalNum1[finalNum1.length - 1]
      }`;
    }
  }
  if (gameMode2 == "waiting for player 2") {
    console.log(gameMode2);
    userName2 = input;
    gameMode2 = "player 2 turn";
    return `Welcome ${userName2}, please roll the dice`;
  }
  if (gameMode2 == "player 2 turn") {
    userName2;
    player2DiceRoll1 = randomNum();
    player2DiceRoll2 = randomNum();
    gameMode2 = "player 2 select your dice order";
    return `${userName2}, Dice 1: You rolled  ${player2DiceRoll1}. Dice 2: You rolled  ${player2DiceRoll2}.<br> Please select your dice order "1" or "2" to display your outcome`;
  }
  if (gameMode2 == "player 2 select your dice order") {
    if (input == 1) {
      finalNum2.push(Number(`${player2DiceRoll1}${player2DiceRoll2}`));
      gameMode2 = "player 2 done";
      gameMode3 = "compare outcomes";
      return `${userName2}, you chose dice 1 first. Your number: ${
        finalNum2[finalNum2.length - 1]
      }`;
    } else if (input == 2) {
      finalNum2.push(Number(`${player2DiceRoll2}${player2DiceRoll1}`));
      gameMode2 = "player 2 done";
      gameMode3 = "compare outcomes";
      return `${userName2}, you chose dice 2 first. Your number: ${
        finalNum2[finalNum2.length - 1]
      }`;
    }
  }
  if (gameMode3 == "compare outcomes") {
    if (getSum(finalNum1) > getSum(finalNum2)) {
      gameMode1 = "player 1 turn";
      gameMode2 = "player 2 turn";
      return `${userName1} wins🙌🙌. ${userName1}: ${getSum(
        finalNum1
      )}. ${userName2}: ${getSum(finalNum2)}`;
    } else if (getSum(finalNum2) > getSum(finalNum1)) {
      gameMode1 = "player 1 turn";
      gameMode2 = "player 2 turn";
      return `${userName2} wins🙌🙌. ${userName2}: ${getSum(
        finalNum2
      )}. ${userName1}: ${getSum(finalNum1)}`;
    }
  }
};
