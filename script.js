var gameState = 0;
var diceCombinedPlayerOneFirst = [];
var diceCombinedPlayerOneSecond = [];
var diceCombinedPlayerTwoFirst = [];
var diceCombinedPlayerTwoSecond = [];
var playerOneFinalResult = "";
var playerTwoFinalResult = "";

//START OF THE GAME//
var main = function (input) {
  var output = document.querySelector("#submit-button");
  if (gameState === 0 && input === "") {
    gameState = "start";
    output.innerHTML = "Roll";
    return "Welcome to the game of Beat That!<br><br>This is a 2-player game. You will roll 2 dice, and you can choose the order of the dice to form the largest number. The player with the largest number wins!<br><br>🎲 Player 1, please roll the dice. 🎲";
  }
  if (input != "1" && input != "2" && input != "") {
    return "Error, please only key '1' or '2' to choose your dice order.";
  }
  //PLAYER 1 STARTS GAME//
  if (gameState === "start" && input === "") {
    gameState = "player1";
    output.innerHTML = "Enter";
    return playerStartGame(
      diceCombinedPlayerOneFirst,
      diceCombinedPlayerOneSecond,
      "1"
    );
  }
  //PLAYER 1 TYPES '1' AS DICE OPTION 1//
  if (gameState === "player1") {
    if (input === "1") {
      output.innerHTML = "Roll";
      return getResultsPlayerOne(diceCombinedPlayerOneFirst);
    }
    //PLAYER 1 TYPES '2' AS DICE OPTION 2//
    if (input === "2") {
      output.innerHTML = "Roll";
      return getResultsPlayerOne(diceCombinedPlayerOneSecond);
    }
    //PLAYER 2 STARTS GAME//
    if (input === "" && output.innerHTML !== "Enter") {
      gameState = "player2";
      output.innerHTML = "Enter";
      return playerStartGame(
        diceCombinedPlayerTwoFirst,
        diceCombinedPlayerTwoSecond,
        "2"
      );
    } else {
      return "Error, please only key '1' or '2' to choose your dice order.";
    }
  }

  //PLAYER 2 TYPES '1' AS DICE OPTION 1//
  if (gameState === "player2") {
    if (input === "1") {
      output.innerHTML = "Restart";
      return getResultsPlayerTwo(diceCombinedPlayerTwoFirst);
    }
    //PLAYER 2 TYPES '2' AS DICE OPTION 2//
    if (input === "2") {
      output.innerHTML = "Restart";
      return getResultsPlayerTwo(diceCombinedPlayerTwoSecond);
    }
    //GAME RESTARTS//
    if (input === "" && output.innerHTML != "Enter") {
      gameState = "start";
      reset();

      output.innerHTML = "Roll";
      return "Welcome to the game of Beat That!<br><br>This is a 2-player game. You will roll 2 dice, and you can choose the order of the dice to form the largest number. The player with the largest number wins!<br><br>🎲 Player 1, please roll the dice. 🎲";
    } else {
      return "Error, please only key '1' or '2' to choose your dice order.";
    }
  }

  //INVALID INPUT//
  if ((gameState === 0 || gameState === start) && input != "") {
    return "Error, please roll the dice.";
  }
};

//==============HELPER FUNCTION=================//
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var getResultsPlayerTwo = function (diceResult) {
  playerTwoFinalResult = diceResult.join("");
  var winner;
  if (playerOneFinalResult > playerTwoFinalResult) {
    winner = "Player 1!";
  } else if (playerTwoFinalResult > playerOneFinalResult) {
    winner = "Player 2!";
  } else {
    winner = "It's a draw!";
  }
  return (
    "Player 2, your combined number is: " +
    diceResult.join("") +
    ".<br><br>Player 1 highest number: " +
    playerOneFinalResult +
    "<br>Player 2 highest number: " +
    playerTwoFinalResult +
    "<br>Winner: " +
    winner +
    "<br><br>Click 'restart' to play again."
  );
};

var getResultsPlayerOne = function (diceResult) {
  playerOneFinalResult = diceResult.join("");
  diceResult.join("");
  return (
    "Player 1, your combined number is: " +
    diceResult.join("") +
    ".<br><br>Player 2, roll the dice."
  );
};

var playerStartGame = function (combiOne, combiTwo, playerNum) {
  var randomDiceNumber1 = rollDice();
  var randomDiceNumber2 = rollDice();
  combiOne.push(randomDiceNumber1, randomDiceNumber2);
  combiTwo.push(randomDiceNumber2, randomDiceNumber1);
  return (
    "Welcome player " +
    playerNum +
    "!<br><br> You rolled:<br>" +
    "Dice 1: " +
    randomDiceNumber1 +
    "<br>Dice 2: " +
    randomDiceNumber2 +
    "<br><br>Choose the order of the dice:<br>Type '1' for Dice 1 order to go first or type '2' for Dice 2 to go first."
  );
};

var reset = function () {
  diceCombinedPlayerOneFirst = [];
  diceCombinedPlayerOneSecond = [];
  diceCombinedPlayerTwoFirst = [];
  diceCombinedPlayerTwoSecond = [];
};
