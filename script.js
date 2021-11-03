var player1 = "player1";
var player2 = "player2";
var index1 = "index1";
var index2 = "index2";
var dicePlayer1 = [];
var dicePlayer2 = [];
var storeNumP1 = "";
var storeNumP2 = "";
var randomNumber1 = "";
var randomNumber2 = "";

var getIndex = "";

var gameMode = player1;

// to randomize number
var getRandomRoll = function () {
  var randomNumber = Math.ceil(Math.random() * 6);
  return randomNumber;
};

// to store and log result of dice roll
var getDiceNumber = function () {
  randomNumber1 = getRandomRoll();
  randomNumber2 = getRandomRoll();
  if (gameMode == player1) {
    dicePlayer1 = [randomNumber1, randomNumber2];
    return dicePlayer1;
  } else {
    dicePlayer2 = [randomNumber1, randomNumber2];
    return dicePlayer2;
  }
};

// get combination number based on the input index and store it
var getCurrentCombinedNumber = function (index) {
  getIndex = index;
  // player 1's turn
  if (gameMode == index1) {
    if (index == 1) {
      storeNumP1 = "" + dicePlayer1[0] + dicePlayer1[1];
      console.log("storeNumP1 :" + storeNumP1);
    }
    if (index == 2) {
      storeNumP1 = "" + dicePlayer1[1] + dicePlayer1[0];
      console.log("storeNumP1 :" + storeNumP1);
    }
    return storeNumP1;
  }
  // player 2's turn
  if (gameMode == index2) {
    if (index == 1) {
      storeNumP2 = "" + dicePlayer2[0] + dicePlayer2[1];
      console.log("storeNumP2 :" + storeNumP2);
    }
    if (index == 2) {
      storeNumP2 = "" + dicePlayer2[1] + dicePlayer2[0];
      console.log("storeNumP2 :" + storeNumP2);
    }
    return storeNumP2;
  }
};

// to determine who won the game
var getWhoseWon = function () {
  if (storeNumP1 > storeNumP2) return "Player 1 won !";
  return "Player 2 won !";
};

// to display message of every game mode
var getMessage = function (input) {
  if (gameMode == player1) {
    var diceNumber = getDiceNumber();
    return `Welcome Player 1 ~
      <br><br>
      You rolled :
      <br>
      Dice 1 : ${dicePlayer1[0]}  ||  Dice 2 : ${dicePlayer1[1]}.
      <br><br>
      Choose the order of the dice by entering 1 or 2 as the first index.`;
  }
  if (gameMode == index1) {
    var currentCombinedNumber = getCurrentCombinedNumber(input);
    return `Player 1, you choose Dice ${getIndex} to be the first index.
      <br><br>
      Your number is ${storeNumP1}.
      <br>
      Now, it's time for Player 2 to roll the dice.
      <br>
      Press submit to roll the dice.`;
  }
  if (gameMode == player2) {
    var diceNumber = getDiceNumber();
    return `Welcome Player 2 ~
      <br><br>
      You rolled :
      <br>
      Dice 1 : ${dicePlayer2[0]}  ||  Dice 2 : ${dicePlayer2[1]}.
      <br><br>
      Choose the order of the dice by entering 1 or 2 as the first index.`;
  }
  if (gameMode == index2) {
    var currentCombinedNumber = getCurrentCombinedNumber(input);
    var whoseWon = getWhoseWon();
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
  // player 1 rolls dice
  if (gameMode == player1) {
    gameMode = index1;
    return message;
  }
  // player 1 enter index and result of combination
  if (gameMode == index1) {
    getIndex = input;
    if (getIndex != 1 && getIndex != 2) {
      return `Please enter only 1 or 2`;
    }
    if (getIndex == 1) {
      gameMode = player2;
      return message;
    }
    if (getIndex == 2) {
      gameMode = player2;
      return message;
    }
  }
  // player 2 rolls dice
  if (gameMode == player2) {
    gameMode = index2;
    return message;
  }
  // player 2 enter index and get who is the winner
  if (gameMode == index2) {
    getIndex = input;
    if (getIndex != 1 && getIndex != 2) {
      return `Please enter only 1 or 2`;
    }
    if (getIndex == 1) {
      gameMode = player1;
      return message;
    }
    if (getIndex == 2) {
      gameMode = player1;
      return message;
    }
  }
};
