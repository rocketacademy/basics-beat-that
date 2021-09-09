//player1 punya angka abis di combine ga muncul
//choose dice brpa gatau

var player1 = "player 1";
var player2 = "player 2";
var dicePlayer1 = [];
var dicePlayer2 = [];
var storeNumP1 = "";
var storeNumP2 = "";
var randomNumber1 = "";
var randomNumber2 = "";

var getIndex = "";
var currentNumber = ""; //harusnya dalam getCurrentCombinedNumber

var gameMode = player1;

//to randomize number
var getRandomRoll = function () {
  var randomNumber = Math.ceil(Math.random() * 6);
  return randomNumber;
};

var getDiceNumber = function () {
  randomNumber1 = getRandomRoll();
  randomNumber2 = getRandomRoll();
  if (gameMode == player1) {
    dicePlayer1 = [randomNumber1, randomNumber2];
    console.log("player1" + dicePlayer1[0] + dicePlayer1[1]);
    return dicePlayer1;
  } else {
    dicePlayer2 = [randomNumber1, randomNumber2];
    console.log("player2" + dicePlayer2[0] + dicePlayer2[1]);
    return dicePlayer2;
  }
};

//to combine two number between dice 1 and dice 2
var getCombineTwoNumber = function (input1, input2) {
  return "" + input1 + input2;
};

var getCurrentCombinedNumber = function (index) {
  if (index == 1) {
    if (gameMode == player1) {
      currentNumber = getCombineTwoNumber(dicePlayer1[1], dicePlayer1[0]);
      console.log(currentNumber);
      storeNumP1 = currentNumber;
      console.log(currentNumber);
      console.log(storeNumP1);
    } else {
      currentNumber = getCombineTwoNumber(dicePlayer2[0], dicePlayer2[1]);
      storeNumP2 = currentNumber;
      console.log(storeNumP2);
    }
  } else {
    if (gameMode == player1) {
      currentNumber = getCombineTwoNumber(dicePlayer1[0], dicePlayer1[1]);
      console.log(currentNumber);
      storeNumP1 = currentNumber;
      console.log(currentNumber);
      console.log(storeNumP1);
    } else {
      currentNumber = getCombineTwoNumber(dicePlayer2[1], dicePlayer2[0]);
      storeNumP2 = currentNumber;
      console.log(storeNumP2);
    }
  }

  if (gameMode == player1) return storeNumP1;
  else {
    return storeNumP2;
  }
};

//to determine who won the game
var getWhoseWon = function () {
  if (storeNumP1 > storeNumP2) return "Player 1 won !";
  return "Player 2 won !";
};

//to display message of every game mode
var getMessage = function (input) {
  var currentCombinedNumber = getCurrentCombinedNumber(input);
  var diceNumber = getDiceNumber();
  var whoseWon = getWhoseWon();
  if (gameMode == player1) {
    return `Welcome Player 1 ~
      <br><br>
      You rolled :
      <br>
      Dice 1 : ${dicePlayer1[0]}  ||  Dice 2 : ${dicePlayer1[1]}.
      <br><br>
      Choose the order of the dice by entering 1 or 2 as the first index.`;
  }
  if (gameMode == "time to enter index") {
    return `Player 1, you choose Dice ${getIndex} to be the first index.
      <br><br>
      Your number is ${storeNumP1}.
      <br>
      Now, it's time for Player 2 to roll the dice.
      <br>
      Press submit to roll the dice.`;
  }
  if (gameMode == player2) {
    return `Welcome Player 2 ~
      <br><br>
      You rolled :
      <br>
      Dice 1 : ${dicePlayer2[0]}  ||  Dice 2 : ${dicePlayer2[1]}.
      <br><br>
      Choose the order of the dice by entering 1 or 2 as the first index.`;
  }
  if (gameMode == "time to enter index 2") {
    return `Player 2, you choose Dice ${getIndex} to be the first index. 
      <br><br>
      Your number is ${storeNumP2}.
      <br>
      ${whoseWon}
      <br>
      combine number of Player 1 : ${storeNumP1}  || combine number of Player 2 : ${storeNumP2} 
      <br><br>
      Press submit to play again.`;
  }
};

var main = function (input) {
  var message = getMessage(input);
  if (gameMode == player1) {
    console.log("a");
    gameMode = "time to enter index";
    return message;
  }
  if (gameMode == "time to enter index") {
    console.log("b");
    gameMode = player2;
    getIndex = input;
    if (getIndex != 1 && getIndex != 2) {
      console.log("c");
      return `Please enter only 1 or 2`;
    }
    if (getIndex == 1) {
      console.log("d");
      // currentNumber = getCombineTwoNumber(dicePlayer1[1], dicePlayer1[0]);
      // storeNumP1 = currentNumber;
      return message;
    }
    if (getIndex == 2) {
      console.log("e");
      // currentNumber = getCombineTwoNumber(dicePlayer1[0], dicePlayer1[1]);
      // storeNumP1 = currentNumber;
      return message;
    }
  }
  if (gameMode == player2) {
    console.log("f");
    gameMode = "time to enter index 2";
    return message;
  }
  if (gameMode == "time to enter index 2") {
    console.log("g");
    gameMode = player1;
    getIndex = input;
    if (getIndex != 1 && getIndex != 2) {
      console.log("h");
      return `Please enter only 1 or 2`;
    }
    if (getIndex == 1) {
      console.log("i");
      // currentNumber = getCombineTwoNumber(dicePlayer2[0], dicePlayer2[1]);
      // storeNumP2 = currentNumber;
      return message;
    }
    if (getIndex == 2) {
      console.log("j");
      currentNumber = getCombineTwoNumber(dicePlayer2[1], dicePlayer2[0]);
      // storeNumP2 = currentNumber;
      // console.log('store num 2 : '+ storeNumP2);
      return message;
    }
  }
};
